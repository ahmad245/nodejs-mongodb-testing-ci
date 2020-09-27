const SubmissionDao = require("../daos/submission.dao");
const Repository=require('./Repository');
 class SubmissionRepository extends Repository{

}
module.exports=new SubmissionRepository(SubmissionDao);