const Bootcamp = require("../../../repositories/BootcampRepository");
const User = require("../../../repositories/UserRepository");
const { getAll } = require("./bootcampGetAll");
const { getById } = require("./bootcampById");
const { post } = require("./bootcampPost");
const { put } = require("./bootcampUpdate");
const { remove } = require("./bootcampDelete");

module.exports.bootcampTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
  });
  afterEach(async () => {
    // await bootcamp.remove()
    await Bootcamp.drobIndexes({ name: 1 });

    await Bootcamp.removeAll();

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
