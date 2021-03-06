module.exports = class Dao {
  constructor(model) {
    this.model = model;
  }

  findAll() {
    return this.model.find();
  }
  findById(id) {
    return this.model.findById(id);
  }
  find(obj) {
    return this.model.find(obj);
  }
  findOne(obj) {
  
    return this.model.findOne(obj);
  }

  async create(obj) {
    const model = await this.model.create(obj);
    return model;
  }
  async update(id, obj) {
    let model = await this.model.findById(id);
    if (!model) {
      return null;
    }

    model = await this.model.findByIdAndUpdate(id, obj, {
      new: true,
      runValidators: true,
    });
    return model;
  }
  async remove(id) {
    let model = await this.model.findById(id);
    if (!model) {
      return null;
    }
    await model.remove();
    return model;
  }
 async drobIndexes(obj) {
   
    this.model.collection.dropIndex(obj);
  }
 async dropAllIndexes(obj) {
    this.model.collection.dropIndexes(obj);
  }
  removeAll() {
    this.model.collection.remove({});
  }
  insertMany(arr) {
    return this.model.collection.insertMany(arr);
  }
  insertOne(obj) {
    return this.model.collection.insertOne(obj);
  }
};
