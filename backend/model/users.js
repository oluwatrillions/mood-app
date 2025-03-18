const mongoose = require("mongoose");
const userSchema = mongoose.Schema;
const crypto = require("crypto");

const Users = new userSchema({
  name: {
    type: String,
    minlength: 4,
    maxlength: 255,
    required: true,
  },
  username: {
    type: String,
    minlength: 4,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 4,
    maxlength: 255,
  },
  scope: {
    type: String,
    enum: ["local", "google"],
  },
  roles: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profileImage: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: Date.now(),
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  refreshToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

Users.methods.generateVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verificationTokenExpiry = Date.now() + 10 * 60 * 1000;
  return verificationToken;
};

module.exports = mongoose.model("Users", Users);
