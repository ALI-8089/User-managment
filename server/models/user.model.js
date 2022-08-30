const mongoose = require('mongoose');
const User = new mongoose.Schema(
    {
    name:{type:String , require:true},
    email:{type:String , require:true , unique:true},
    password:{type:String , require:true},

},
{collection:"user"}
)
const Admin = new mongoose.Schema(
    {
        email:{type:String , require:true},
        password:{type:String , require:true}
    },{collection:"admin"}
)




const UserModel = mongoose.model("user",User) 
const AdminModel = mongoose.model('admin',Admin)
module.exports ={
    UserModel,AdminModel 
}