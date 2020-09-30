const mongoose = require('mongoose');
const UserSchema=require('./user.schema');
const User=mongoose.model("User", UserSchema);
module.exports = User;