const express = require("express");
const {
  getAll,
  getById,
  post,
  put,
  remove,
  apply
} = require("./../controller/coursesController");

const advancedResults=require('./../middelware/advancedResults');
const Course=require('../models/Course');

const {clearCache}=require('../middelware/clearCache');
const {protect,authorize}=require('../middelware/auth');

const examRouter=require('./exam');


const route = express.Router({mergeParams:true});
route.use('/:courseId/exams', examRouter);

route.route("/").get(advancedResults(Course,{path:'bootcamp user students' ,select:'name description email'}), getAll);
route.route("/:bootcampId").post(protect,authorize('admin','publisher'),clearCache('Course'),post);

route.route("/:id/apply")
  .put(protect,authorize('admin','publisher','user'),clearCache('Course'),apply)
route.route("/:id")
   .get(getById)
   .put(protect,authorize('admin','publisher'),clearCache('Course'),put)
   
   .delete(protect,authorize('admin','publisher'),clearCache('Course'),remove);

module.exports = route;
