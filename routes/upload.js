const express = require("express");
const {
 get
} = require("./../controller/uploadController");


const {protect,authorize}=require('../middelware/auth');


const route = express.Router();


route.route("/").get(protect,get);


module.exports = route;
