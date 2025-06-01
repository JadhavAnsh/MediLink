const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

module.exports = mongoose.model("EmailVerification", schema);
