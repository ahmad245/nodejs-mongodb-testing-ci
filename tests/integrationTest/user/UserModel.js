jest.setTimeout(5000000);
const mongoose=require('mongoose');
const User=require('../../../repositories/UserRepository');

const {user}=require('./seed');

class UserModel{
    constructor(){}

  async  getUser(email=null){
       const user =await User.create(this.getValidUser(email));
      const  token = User.getSignedJwtToken(user);
      return {token,user};
    }

    async create(){
    return  await User.create(this.getValidUser());
    }

    getValidUser(email){
        return user({email});
    }
}

module.exports=UserModel;