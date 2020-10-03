const mongoose = require('mongoose');
const bootcampSchema=require('./bootcamp.schema');

const BootCamp=mongoose.model('Bootcamp',bootcampSchema);
module.exports=BootCamp;

