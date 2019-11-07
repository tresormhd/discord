const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  numero: {type:String, require:true},
  pseudo: {type:String, require:true},
  image:{type:String , default:"images/profil.jpg"},
  email :  {type:String, require:true, unique:true},
  password:{type:String, require:true},
  status: {type:String, default:'offline'}
})

module.exports = mongoose.model('user', UserSchema)
