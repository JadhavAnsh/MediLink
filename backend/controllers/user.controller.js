const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const otpModel = require("../models/otp_verification.model.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { sendMail } = require("../helpers/sendMail.helper.js");

dotenv.config();

const signUp = (req, res, next) => {
  const { name, email, password } = req.body;

  let session;
  let newUser;

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
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      return User.create([{ name, email, password: hashedPassword }], {
        session,
      });
    })
    .then((createdUsers) => {
      newUser = createdUsers[0];

      const token = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

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

      const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

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

const emailverifyRequest = (req, res, next) => {
  const otp = Math.ceil(Math.random() * 999999).toString();

  User.findOne({ email: req.userEmail, role: req.userRole })
    .then((document) => {
      if (!document) throw "User not found";
      if (document.verifiedEmail) throw "Email already verified";

      return otpModel.findOne({ email: req.userEmail });
    })
    .then((existingOtp) => {
      if (existingOtp) {
        const now = new Date();
        const secondsSinceLastOtp = (now - existingOtp.createdAt) / 1000;

        if (secondsSinceLastOtp < 60) {
          throw `You can request a new OTP after ${60 - Math.floor(secondsSinceLastOtp)} seconds.`;
        }
      }

      return otpModel.findOneAndUpdate(
        { email: req.userEmail },
        { otp, createdAt: new Date() },
        { new: true, upsert: true }
      );
    })
    .then((otpDoc) => {
      return sendMail(
        req.userEmail,
        "Email Verification",
        `Your OTP is: ${otpDoc.otp}`
      ).then(() => {
        return res.status(200).json({
          message: "OTP sent successfully",
          error: null,
          data: { otp: otpDoc.otp },
        });
      });
    })
    .catch((error) => {
      console.error("error:", error);
      return res.status(403).json({
        message: "OTP request failed",
        error: error.toString(),
        data: null,
      });
    });
};

const emailverifySubmit = (req, res, next) => {
  return User.findOne({ email: req.userEmail, role: req.userRole })
    .then((doc) => {
      console.log("doc: ", doc);
      if (!doc) throw "User not found";
      if (doc.verifiedEmail) throw "Email already verified";

      return otpModel.findOne({ email: req.userEmail });
    })
    .then((otpDoc) => {
      console.log("otpDoc: ", otpDoc);
      if (!otpDoc) throw "OTP not found or expired";
      if (otpDoc.otp !== req.body.otp) throw "Invalid OTP";

      return User.findOneAndUpdate(
        { email: req.userEmail, role: req.userRole },
        { verifiedEmail: true },
        { new: true }
      );
    })
    .then((userDoc) => {
      delete userDoc._doc.password;

      return otpModel.deleteOne({ email: req.userEmail })
        .then(() => {
          return res.status(200).json({
            message: "Verification successful",
            error: null,
            data: userDoc,
          });
        });
    })
    .catch((error) => {
      console.log("error: ", error);
      return res.status(403).json({
        message: "Verification failed",
        error: error.toString(),
        data: null,
      });
    });
};


module.exports = {
  signUp,
  logIn,
  logOut,
  emailverifyRequest,
  emailverifySubmit,
};
