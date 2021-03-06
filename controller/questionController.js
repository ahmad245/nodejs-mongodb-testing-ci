const questionRepository= require("./../repositories/QuestionRepository");
const Exam = require("./../repositories/ExamRepository").getModel();

module.exports.getAll = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

module.exports.getById = async (req, res, next) => {
  const question = await questionRepository.findById(req.params.id);
  if (!question) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.status(200).json({ data: question, success: true });
}

// @desc      Add question
// @route     POST /api/v1/exams/:examId/questions
// @access    Private
module.exports.post = async (req, res, next) => {
  req.body.exam = req.params.examId;
  req.body.user = req.user.id;
  const exam =await Exam.findById(req.params.examId);
  if (!exam) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  if (exam.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: `User ${req.user.id} is not authorized to add a question to exam ${exam._id}`,
    });
  }
  const question = await questionRepository.create(req.body);
  res.status(201).json({ success: true, data: question });
}

module.exports.put = async (req, res, next) => {
    let question = await questionRepository.findById(req.params.id);
  
    if (!question) {
      return res
        .status(404)
        .json({
          success: false,
          error: `No question with the id of ${req.params.id}`,
        });
    }
  
    // Make sure user is exam owner
    if (question.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          error: `User ${req.user.id} is not authorized to update question ${exam._id}`,
        });
    }
  
    question = await questionRepository.update(req.params.id, req.body);
  
    res.status(200).json({ data: question, success: true });
  };
  
  module.exports.remove = async (req, res, next) => {
    const question = await questionRepository.findById(req.params.id);
  
    if (!question) {
      return res
        .status(404)
        .json({
          success: false,
          error: `No question with the id of ${req.params.id}`,
        });
    }
  
    // Make sure user is question owner
    if (question.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          error: `User ${req.user.id} is not authorized to delete question ${question._id}`,
        });
    }
  
    await questionRepository.remove(question._id);
  
    res.status(200).json({ data: question, success: true });
  };
  
