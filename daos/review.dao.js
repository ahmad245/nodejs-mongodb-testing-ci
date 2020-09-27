const Review = require("../models/review/review.model");
const Dao = require("./dao");
class ReviewDao extends Dao {
  
}
module.exports = new ReviewDao(Review);