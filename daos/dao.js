module.exports = class Dao{
    constructor(model){
        this.model=model
    }

    findAll() {
        return this.model.find();
    }
    findById(id) {
        return this.model.findById(id);
    }

   async create(obj) {
      const model=await  this.model.create(obj);
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
}