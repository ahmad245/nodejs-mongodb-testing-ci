const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    text: {
    type: String,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
    minlength: [3, "Name can not be less than 3 characters"],
    required: [true, "Please add a course title"],
  },
 
  options:[{type:String}],
  correctAnswer:{type:Number,required:true},
  status: {
    type: Boolean,
    default: false,
  },
  score:{
      type:Number,
      required:true
  },
  exam:{
      type:mongoose.Schema.ObjectId,ref:'Exam',required:true
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
