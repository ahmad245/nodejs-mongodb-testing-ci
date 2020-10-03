const Bootcamp = require("../../../repositories/BootcampRepository");
const User=require("../../../repositories/UserRepository");

const { advancedResult } = require("./advancedResult");
const {auth}=require('./auth');
let server = require("../../../index");
module.exports.middleware = () => {
  
  afterEach(async () => {
   await Bootcamp.drobIndexes({name:1})
    
   await Bootcamp.removeAll();

  await  User.drobIndexes({email:1})
  await User.removeAll();
  await server.close()
  });
 describe("PAGINATION/", advancedResult(server));
 describe("AUTH/", auth(server));

};
