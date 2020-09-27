const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
    minlength: [3, "Name can not be less than 3 characters"],
    required: [true, "Please add a course title"],
  },

  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  answer:{type:String,required:false},
  status: {
    type: Boolean,
    default: false,
  },
  point: {
    type: Number,
    required: true,
  },
  exam: {
    type: mongoose.Schema.ObjectId,
    ref: "Exam",
    required: true,
  },
  type:{
    type:String,enum:['TRUE_FALSE','MULTIPLE_CHOICE','ESSAY']
  }
});




module.exports=questionSchema;
