const mongoose = require('mongoose');
const questionSchema=require('./question.schema');

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;