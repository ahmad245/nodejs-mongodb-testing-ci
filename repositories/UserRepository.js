const UserDao = require("../daos/user.dao");
const Repository=require('./Repository');
 class UserRepository extends Repository{
    getSignedJwtToken(user) {
       return UserDao.getSignedJwtToken(user);
      }
      // Match user entered password to hashed password in database
      async matchPassword(enteredPassword,user) {
        return UserDao.matchPassword(enteredPassword,user)
      }
    
      // Generate and hash password token
      getResetPasswordToken(user) {
       return UserDao.getResetPasswordToken(user);
      }
}
module.exports=new UserRepository(UserDao);
