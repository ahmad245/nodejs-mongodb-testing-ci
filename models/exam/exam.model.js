const mongoose = require('mongoose');
const examSchema=require('./exam.schema');
const Exam = mongoose.model("Exam", examSchema);

module.exports=Exam;