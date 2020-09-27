const BootcampDao = require("../daos/bootcamp.dao");
const Repository=require('./Repository');
 class BootcampRepository extends Repository{
 
}
module.exports=new BootcampRepository(BootcampDao);