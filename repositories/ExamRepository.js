const ExamDao = require("../daos/exam.dao");
const Repository=require('./Repository');
 class ExamRepository extends Repository{
 
}
module.exports=new ExamRepository(ExamDao);