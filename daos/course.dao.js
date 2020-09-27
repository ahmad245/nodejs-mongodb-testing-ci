const Course = require("../models/course/course.model");
const Dao = require("./dao");
class CourseDao extends Dao {
  
}
module.exports = new CourseDao(Course);