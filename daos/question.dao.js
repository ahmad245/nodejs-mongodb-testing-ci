const Question = require("../models/question/question.model");
const Dao = require("./dao");
class QuestionDao extends Dao {
  
}
module.exports = new QuestionDao(Question);
