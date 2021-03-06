const express=require('express');
const {getAll,getById,post,put,remove}=require('./../controller/questionController');

const advancedResults=require('./../middelware/advancedResults');
const Question=require('../repositories/QuestionRepository').getModel();

const {clearCache}=require('../middelware/clearCache');
const {protect,authorize}=require('../middelware/auth');

const route = express.Router({mergeParams:true});


route.route("/").get(advancedResults(Question.model), getAll)
.post(protect, authorize('publisher', 'admin'), post);


route.route("/:id")
   .get(getById)
   .put(protect,authorize('admin','publisher'),put)
   .delete(protect,authorize('admin','publisher'),remove);

module.exports = route;
