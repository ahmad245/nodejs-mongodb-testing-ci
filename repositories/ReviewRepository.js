const ReviewDao = require("../daos/review.dao");
const Repository=require('./Repository');
 class ReviewRepository extends Repository{
 
}
module.exports=new ReviewRepository(ReviewDao);