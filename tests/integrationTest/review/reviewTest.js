const Bootcamp = require("../../../repositories/BootcampRepository");
const User=require("../../../repositories/UserRepository");
const Course=require("../../../repositories/CourseRepository");
const Review=require("../../../repositories/ReviewRepository");

const review = require("./review");

const { getAll } = require("./reviewGetAll");
const { getById } = require("./reviewById");
const {post}=require('./reviewPost');
const {put}=require('./reviewPut');
const {remove}=require('./reviewDelete');

module.exports.reviewTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
   
  });
  afterEach(async () => {
   // await bootcamp.remove()
     await Bootcamp.drobIndexes({name:1});
     await Bootcamp.removeAll();
     await Review.drobIndexes( 
      "bootcamp_1_user_1" 
     )
    
     await Review.removeAll();

  
    await  User.drobIndexes({email:1});
    await User.removeAll({});

    await server.close();
  });
 describe("GET/", getAll(server));

    describe("GET /:id", getById(server));

    describe('POST /',post(server));
   describe('PUT /',put(server));
    describe('DELETE /',remove(server));
};
