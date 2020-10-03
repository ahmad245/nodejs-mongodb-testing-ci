const courseRepository = require("../repositories/CourseRepository");
const Bootcamp  = require("../repositories/BootcampRepository")
const User = require("../repositories/UserRepository");
const { startSession } = require("mongoose");
module.exports.getAll = async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    const courses = await courseRepository.find({ bootcamp: req.params.bootcampId });
    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
};
module.exports.getById = async (req, res, next) => {
  const course = await courseRepository.findById(req.params.id).cache({
    key: req.params.id,
  });

  
  if (!course) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  res.status(200).json({ success: true, data: course });
};

module.exports.post = async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId).cache({
    key: req.params.bootcampId,
  });
  if (!bootcamp) {
    return res.status(404).json({
      success: false,
      error: `No bootcamp with the id of ${req.params.bootcampId}`,
    });
  }
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(401).json({
      success: false,
      error: `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
    });
  }
  const course = await courseRepository.create(req.body);
  res.status(201).json({ success: true, data: course });
};

module.exports.put = async (req, res, next) => {
  let course = await courseRepository.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: `No course with the id of ${req.params.id}`,
    });
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: `User ${req.user.id} is not authorized to update course ${course._id}`,
    });
  }

  course = await courseRepository.update(req.params.id, req.body);

  res.status(200).json({ data: course, success: true });
};

module.exports.remove = async (req, res, next) => {
  const course = await courseRepository.findById(req.params.id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: `No course with the id of ${req.params.id}`,
    });
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: `User ${req.user.id} is not authorized to delete course ${course._id}`,
    });
  }

  await courseRepository.remove(course._id);

  res.status(200).json({ data: course, success: true });
};

module.exports.apply = async (req, res, next) => {
  let course = await courseRepository.findById(req.params.id);
  let student = req.body.student;

  if (!course) {
    return res.status(404).json({
      success: false,
      error: `No course with the id of ${req.params.id}`,
    });
  }
  const user = await User.findById(student);
  if (!user) {
    return res.status(404).json({
      success: false,
      error: `is not authorized to apply this course `,
    });
  }
  const session = await startSession();
  try {
    session.startTransaction();
    if (course.students.indexOf(student) !== -1) {
      course.students.pull(student);
      user.courses.pull(course._id);
      course.numberOfStudent--
    } else {
      course.students.push(student);
      user.courses.push(course._id);
      course.numberOfStudent++
    }

    await course.save();
    await user.save();

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ data: course, success: true });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ data: err, success: false });
  }
};
