const submissionRepository=require('../repositories/SubmissionRepository');
const examRepository=require('../repositories/ExamRepository');



module.exports.getAll = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

module.exports.getById = async (req, res, next) => {
  const submission = await submissionRepository.findById(req.params.id);
  if (!submission) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.status(200).json({ data: submission, success: true });
}

// @desc      Add exam
// @route     POST /api/v1/exams/:examId/submissions
// @access    Private
module.exports.post = async (req, res, next) => {
  req.body.exam = req.params.examId;
  req.body.student = req.user.id;
  console.log(req.params.examId);
  
  const exam =await examRepository.findById(req.params.examId);
  
  if (!exam) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  const submission = await submissionRepository.create(req.body);
  res.status(201).json({ success: true, data: submission });
}

module.exports.put = async (req, res, next) => {
    let exam = await examRepository.findById(req.params.id);
  
    if (!exam) {
      return res
        .status(404)
        .json({
          success: false,
          error: `No exam with the id of ${req.params.id}`,
        });
    }
  
    // Make sure user is exam owner
    if (exam.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          error: `User ${req.user.id} is not authorized to update exam ${exam._id}`,
        });
    }
  
    exam = await examRepository.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ data: exam, success: true });
  };
  
  module.exports.remove = async (req, res, next) => {
    const exam = await examRepository.findById(req.params.id);
  
    if (!exam) {
      return res
        .status(404)
        .json({
          success: false,
          error: `No exam with the id of ${req.params.id}`,
        });
    }
  
    // Make sure user is exam owner
    if (exam.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          success: false,
          error: `User ${req.user.id} is not authorized to delete exam ${exam._id}`,
        });
    }
  
    await exam.remove();
  
    res.status(200).json({ data: exam, success: true });
  };
  


