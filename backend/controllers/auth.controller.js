const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const otpModel = require("../models/otp_verification.model.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { sendMail } = require("../helpers/sendMail.helper.js");

dotenv.config();

const signUp = (req, res, next) => {
  const { name, email, password, role = "patient", profile } = req.body;

  let session;
  let newUser;

  // Ensure profile is an object and sanitize it
  const normalizedProfile = {
    age: profile?.age || null,
    gender: profile?.gender || "",
    address: profile?.address || "",
    specialization: profile?.specialization || "",
    profile_img: profile?.profile_img || "", // should be a base64 string or image URL
  };

  mongoose
    .startSession()
    .then((_session) => {
      session = _session;
      session.startTransaction();

      return User.findOne({ email });
    })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
      }

      return bcrypt.genSalt(10);
    })
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create(
        [
          {
            name,
            email,
            password: hashedPassword,
            role,
            profile: normalizedProfile,
          },
        ],
        { session }
      );
    })
    .then((createdUsers) => {
      newUser = createdUsers[0];

      const token = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
          role: newUser.role,
          profile: newUser.profile,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      return session.commitTransaction().then(() => {
        session.endSession();
        res.status(201).json({
          success: true,
          message: "User created successfully",
          data: {
            token,
            user: newUser,
          },
        });
      });
    })
    .catch((error) => {
      if (session) {
        session.abortTransaction().then(() => session.endSession());
      }
      next(error);
    });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;
  let session;
  let user;

  mongoose
    .startSession()
    .then((_session) => {
      session = _session;
      session.startTransaction();

      return User.findOne({ email }).session(session);
    })
    .then((foundUser) => {
      if (!foundUser) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      user = foundUser;

      return bcrypt.compare(password, user.password);
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      return session.commitTransaction().then(() => {
        session.endSession();
        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          data: {
            token,
            user,
          },
        });
      });
    })
    .catch((error) => {
      if (session) {
        session.abortTransaction().then(() => session.endSession());
      }
      next(error);
    });
};

const logOut = (req, res, next) => {
  // Implementation for user logout
  try {
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    return res.status(403).json({
      message: "logout failed",
      error: error,
    });
  }
};

const emailverifyRequest = async (req, res) => {
  try {
    const { email, role } = req.query;

    if (!email || !role) {
      return res.status(400).json({
        message: "Email and role are required",
        error: "MissingFields",
        data: null,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await User.findOne({ email, role });
    if (!user) throw new Error("User not found");
    if (user.verifiedEmail) throw new Error("Email already verified");

    const existingOtp = await otpModel.findOne({ email });
    if (existingOtp) {
      const now = new Date();
      const secondsSinceLastOtp = (now - existingOtp.createdAt) / 1000;

      if (secondsSinceLastOtp < 60) {
        throw new Error(
          `You can request a new OTP after ${
            60 - Math.floor(secondsSinceLastOtp)
          } seconds.`
        );
      }
    }

    const otpDoc = await otpModel.findOneAndUpdate(
      { email },
      { otp, createdAt: new Date() },
      { new: true, upsert: true }
    );

    await sendMail(email, "Email Verification", `Your OTP is: ${otp}`);

    return res.status(200).json({
      message: "OTP sent successfully",
      error: null,
      data: { otp },
    });
  } catch (error) {
    console.error("error:", error);
    return res.status(403).json({
      message: "OTP request failed",
      error: error.message || error.toString(),
      data: null,
    });
  }
};


const emailverifySubmit = (req, res) => {
  const { email, role, otp } = req.body;

  if (!email || !role || !otp) {
    return res.status(400).json({
      message: "Missing email, role, or OTP",
      error: "Invalid input",
      data: null,
    });
  }

  return User.findOne({ email, role })
    .then((doc) => {
      if (!doc) throw "User not found";
      if (doc.verifiedEmail) throw "Email already verified";

      return otpModel.findOne({ email });
    })
    .then((otpDoc) => {
      if (!otpDoc) throw "OTP not found or expired";
      if (otpDoc.otp !== otp) throw "Invalid OTP";

      return User.findOneAndUpdate(
        { email, role },
        { verifiedEmail: true },
        { new: true }
      );
    })
    .then((userDoc) => {
      delete userDoc._doc.password;

      return otpModel.deleteOne({ email }).then(() => {
        return res.status(200).json({
          message: "Verification successful",
          error: null,
          data: userDoc,
        });
      });
    })
    .catch((error) => {
      console.log("Verification error:", error);
      return res.status(403).json({
        message: "Verification failed",
        error: error.toString(),
        data: null,
      });
    });
};

const getProfile = (req, res) => {
  const userId = req.userId;

  User.findById(userId)
    .select("-password") // exclude sensitive fields
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    })
    .catch((err) => {
      console.error("getProfile error:", err);
      res.status(500).json({ message: "Server error" });
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(400).json({ message: "User ID missing" });
  }

  const { name, age, gender, role, address, specialization } = req.body;

  const updateFields = {};

  if (name !== undefined) updateFields["name"] = name;
  if (age !== undefined) updateFields["profile.age"] = age;
  if (gender !== undefined) updateFields["profile.gender"] = gender;
  if (role !== undefined) updateFields["role"] = role;
  if (address !== undefined) updateFields["profile.address"] = address;

  if (req.userRole === "doctor" && specialization !== undefined) {
    updateFields["profile.specialization"] = specialization;
  }

  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json({ message: "No valid fields provided to update" });
  }

  User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    })
    .catch(next);
};

const deleteProfile = (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({
      message: "User ID missing from request",
      error: "Bad request",
      data: null,
    });
  }

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        success: true,
        message: "Profile deleted successfully",
        data: deletedUser,
      });
    })
    .catch((err) => {
      console.error("deleteProfile error:", err);
      res.status(500).json({ message: "Server error" });
    });
};

module.exports = {
  signUp,
  logIn,
  logOut,
  emailverifyRequest,
  emailverifySubmit,
  getProfile,
  updateProfile,
  deleteProfile,
};
