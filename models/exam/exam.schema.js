const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
    minlength: [3, "Name can not be less than 3 characters"],
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
    minlength: [3, "Description can not be less than 3 characters"],
    required: [true, "Please add a description"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  nq: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  instructions: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  difficulty: {
    type: Number,
    required: true,
    default: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
examSchema.virtual('questions',{
  ref: 'Question',
  localField: '_id',
  foreignField: 'exam',
  justOne: false
})

// const Exam = mongoose.model("Exam", examSchema);

module.exports = examSchema;
