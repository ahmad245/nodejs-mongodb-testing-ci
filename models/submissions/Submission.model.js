const mongoose = require('mongoose');
const submissionsSchema=require('./submissions.schema');
const Submissions = mongoose.model("Submissions", submissionsSchema);

module.exports=Submissions;