const express=require('express');
const {getAll,getById,post,put,remove}=require('./../controller/examController');

const advancedResults=require('./../middelware/advancedResults');
const Exam=require('../repositories/ExamRepository').getModel();

const {clearCache}=require('../middelware/clearCache');
const {protect,authorize}=require('../middelware/auth');

const questionRouter=require('./question');
const submissionRouter=require('./submissions');

const route = express.Router({mergeParams:true});
route .use('/:examId/questions', questionRouter);
route .use('/:examId/submissions', submissionRouter);

route.route("/").get(advancedResults(Exam.model,{path:'course questions' ,select:'title description text options correctAnswer status score' }), getAll)
.post(protect, authorize('publisher', 'admin'), post);


route.route("/:id")
   .get(getById)
   .put(protect,authorize('admin','publisher'),put)
   .delete(protect,authorize('admin','publisher'),remove);

module.exports = route;
