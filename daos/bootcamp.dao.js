const Bootcamp = require("../models/bootcamp/bootcamp.model");
const Dao = require("./dao");
class BootcampDao extends Dao {
  
}

module.exports = new BootcampDao(Bootcamp);