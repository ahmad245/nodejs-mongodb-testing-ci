const mongoose = require('mongoose');
const ReviewSchema=require('./review.schema');

const Review= mongoose.model('Review', ReviewSchema);
module.exports=Review;
