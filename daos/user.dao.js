const User = require("../models/user/user.model");
const Dao = require("./dao");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UserDao extends Dao {
  // Sign JWT and return
  getSignedJwtToken(user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }
  // Match user entered password to hashed password in database
  async matchPassword(enteredPassword,user) {
      
    return await bcrypt.compare(enteredPassword, user.password);
  }

  // Generate and hash password token
  getResetPasswordToken(user) {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
  }
  drobIndexes(){
    User.collection.dropIndexes();
  }
}
module.exports = new UserDao(User);
