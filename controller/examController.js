const Exam = require("./../models/Exam");
const Course = require("./../models/Course");

module.exports.getAll = async (req, res, next) => {
  res.status(200).json(res.advancedResults);
};

module.exports.getById = async (req, res, next) => {
  const exam = await Exam.findById(req.params.id);
  if (!exam) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.status(200).json({ data: exam, success: true });
}

// @desc      Add exam
// @route     POST /api/v1/courses/:courseId/exams
// @access    Private
module.exports.post = async (req, res, next) => {
  req.body.course = req.params.courseId;
  req.body.user = req.user.id;
  const course =await Course.findById(req.params.courseId);
  console.log(course);
  
  if (!course) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: `User ${req.user.id} is not authorized to add a exam to course ${course._id}`,
    });
  }
  const exam = await Exam.create(req.body);
  res.status(201).json({ success: true, data: exam });
}

module.exports.put = async (req, res, next) => {
    let exam = await Exam.findById(req.params.id);
  
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
  
    exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ data: exam, success: true });
  };
  
  module.exports.remove = async (req, res, next) => {
    const exam = await Exam.findById(req.params.id);
  
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
  


