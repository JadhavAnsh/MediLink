const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  age: {
    type: Number,
    min: 0,
    required: [true, "Age is required"]
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: [true, "Gender is required"]
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
    maxlength: 255
  },
  specialization: {
    type: String,
    maxlength: 500
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minlength: 2,
    maxlength: 50,
    index: true // Indexed for faster search
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    index: true // Indexed for faster search
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 5,
  },
  role: {
    type: String,
    enum: ["doctor", "patient"],
    default: "patient",
    required: true,
    index: true // Indexed for faster search
  },
  profile: {
    type: profileSchema,
  },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
