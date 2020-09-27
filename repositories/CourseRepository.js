const CourseDao = require("../daos/course.dao");
const Repository=require('./Repository');
 class CourseRepository extends Repository{
 
}
module.exports=new CourseRepository(CourseDao);