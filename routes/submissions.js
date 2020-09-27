const express=require('express');
const {getAll,getById,post,put,remove}=require('./../controller/submissionsController');

const advancedResults=require('./../middelware/advancedResults');
const Exam=require('../models/exam/exam.model');

const {clearCache}=require('../middelware/clearCache');
const {protect,authorize}=require('../middelware/auth');

const questionRouter=require('./question');

const route = express.Router({mergeParams:true});

route.route("/").get(advancedResults(Exam), getAll)
.post(protect, authorize('publisher', 'admin','user'), post);


route.route("/:id")
   .get(getById)
   .put(protect,authorize('admin','publisher'),put)
   .delete(protect,authorize('admin','publisher'),remove);

module.exports = route;
