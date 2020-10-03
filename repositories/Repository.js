module.exports = class Repository {
  constructor(dao) {
    this.dao = dao;
  }
  find(obj) {
    return this.dao.find(obj);
  }
  findOne(obj) {
    return this.dao.findOne(obj);
  }
  findAll() {
    return this.dao.findAll();
  }

  findById(id) {
    return this.dao.findById(id);
  }
  create(obj) {
    return this.dao.create(obj);
  }
  update(id, obj) {
    return this.dao.update(id, obj);
  }
  remove(id) {
    return this.dao.remove(id);
  }
  getModel() {
    return this.dao;
  }
  drobIndexes(obj){
    this.dao.drobIndexes()
  }
  dropAllIndexes(obj) {
    this.dao.dropAllIndexes(obj);
  }
  removeAll(){
    this.dao.removeAll();
  }
  insertMany(arr){
   return this.dao.insertMany(arr)
  } 
  insertOne(obj) {
   return this.dao.insertOne(obj);
  }
};
