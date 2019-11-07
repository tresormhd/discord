const mongoose = require('mongoose');
const chatGroup = new mongoose.Schema({
    video:{type:String},
    audio:{type:String},
    image:{type:String},
    text:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    date_pub:{type:Date, default:Date.now}
 
})

module.exports=mongoose.model('chatGroup', chatGroup)
