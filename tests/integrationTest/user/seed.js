module.exports.user=(obj={})=>{
    return   {
          name: obj.name || 'ahmad',
        
          email: obj.email|| "admintest@gmail.com",
          role: obj.role|| "publisher",
          password: obj.password|| "123456",
          
        }
  }
  