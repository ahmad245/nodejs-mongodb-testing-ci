const mongoose = require('mongoose');
const couresSchema=require('./course.schema');

const Course=mongoose.model('Course',couresSchema);

module.exports=Course;