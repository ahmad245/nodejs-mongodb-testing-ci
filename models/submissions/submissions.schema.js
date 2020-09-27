const mongoose = require("mongoose");
const questionSchema = require("../question/question.schema");

const submissionsSchema = new mongoose.Schema({
  score: { type: Number },
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
    required: true,
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  answers: [questionSchema],
});


module.exports=submissionsSchema;