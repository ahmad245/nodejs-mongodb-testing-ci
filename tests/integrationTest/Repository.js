const userModel = require("./user/UserModel");
const mongoose = require("mongoose");



const {clearHash}=require('../../sevise/cache');

module.exports = class Repository{
  constructor(model, validCollection) {
    
    this.model = model;
    this.prop = "";
    this.validCollection = validCollection;
    this.user = null;
    this.token = "";
    
  }

  setProp(prop) {
    this.prop = prop;
  }
  async createCollectionValid() {
    
    const collection= await this.model.insertMany(this.getCollecttionValid());
   // clearHash(this.model.modelName);
    return collection;
  }
  async create() {
    const collection=  await this.model.insertOne(this.getCollecttionValid()[0]);
   //  clearHash(this.model.modelName);
     return collection;
    //.create(this.getCollecttionValid()[0]);
  }

  async createModelValidWithUser(user = null) {
    const collection= await this.model.insertOne(
      this.validCollection({ user })[0]
    );
   // clearHash(this.model.modelName);
    return collection;
    
  }
  async remove() {
    await this.model.dropIndexes();
    await this.model.removeAll();
  }

  async getUserToken(email = null) {
    const { token, user } = await new userModel().getUser(email);
    this.user = user;
    this.token = token;
    return { token, user };
  }

  getCollecttionValid() {
    return this.validCollection();
  }
  getObjectId() {
    return mongoose.Types.ObjectId();
  }
};
