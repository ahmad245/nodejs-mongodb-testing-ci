const User = require("../models/user/user.model");
const Dao = require("./dao");
class UserDao extends Dao {
  
}
module.exports = new UserDao(User);