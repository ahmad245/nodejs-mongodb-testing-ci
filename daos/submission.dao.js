const Submissions = require("../models/submissions/Submission.model");
const Dao = require("./dao");
class SubmissionDao extends Dao {
  scoreExam(questions = []) {
    let n = 0;
    let score = 0;
    console.log(questions);
    
    questions.forEach((q) => {
      score += q.point;
      if (q.answer && q.answer == q.correctAnswer) {
        n += q.point;
      }
    });

    return (n / score) * 100;
  }

  async create(obj) {
      obj.score=this.scoreExam(obj.answers);
    const model=await  this.model.create(obj);
    return model;
  }
}
module.exports = new SubmissionDao(Submissions);
