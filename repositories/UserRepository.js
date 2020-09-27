const UserDao = require("../daos/user.dao");
const Repository=require('./Repository');
 class UserRepository extends Repository{
 
}
module.exports=new UserRepository(UserDao);