const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      min: 0,
      required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxlength: 255,
    },
    specialization: {
      type: String,
      maxlength: 500,
    },
    profile_img: {
      type: String,
      validate: {

        validator: function (v) {
          return (
            /^data:image\/(png|jpg|jpeg|gif|webp);base64,/.test(v) || // base64
            /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/.test(v) // image URL
          );
        },
        message: (props) => `${props.value} is not a valid image!`,
      },
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
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
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: profileSchema,
    },
  },
  { timestamps: true }
);

userSchema.index({ email: 1, role: 1 });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
