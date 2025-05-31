const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
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

  mongoose.startSession()
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

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
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
   res.status(200).json({
    success: true,
    message: 'User signed out successfully'
  });
};

const emailverifyRequest = (req, res, next) => {
  // Implementation for email verification request
};

const emailverifySubmit = (req, res, next) => {
  // Implementation for email verification submission
};

const getProfile = (req, res, next) => {
  // Implementation for getting user profile
};
const updateProfile = (req, res, next) => {
  // Implementation for updating user profile
};
const deleteProfile = (req, res, next) => {
  // Implementation for deleting user profile
};

module.exports = {
  signUp,
  logIn,
  logOut,
  emailverifyRequest,
  emailverifySubmit,
  getProfile,
  updateProfile,
  deleteProfile
};