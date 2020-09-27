const QuestionDao = require("../daos/question.dao");
const Repository=require('./Repository');
 class QuestionRepository extends Repository{
 
}
module.exports=new QuestionRepository(QuestionDao);