const Bootcamp = require("../../../repositories/BootcampRepository");
const User = require("../../../repositories/UserRepository");
const Course = require("../../../repositories/CourseRepository");

const cours = require("./course");

const { getAll } = require("./coursGetAll");
const { getById } = require("./courseById");
const { post } = require("./coursePost");
const { put } = require("./coursePut");
const { remove } = require("./courseDelete");

module.exports.courseTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
  });

  afterEach(async () => {
    // await bootcamp.remove()
    await Bootcamp.drobIndexes({ name: 1 });
    await Bootcamp.removeAll();
    await Course.removeAll();

    await User.drobIndexes({ email: 1 });
    await User.removeAll();
    await server.close();
  });
  describe("GET/", getAll(server));

  describe("GET /:id", getById(server));

  describe("POST /", post(server));
  describe("PUT /", put(server));
  describe("DELETE /", remove(server));
};
