const mongoose = require('mongoose');

const connection =async ()=>{
  
    try {
        await mongoose.connect('mongodb://localhost:27017/discord',{
          useNewUrlParser:true,
          useFindAndModify:false,
          useUnifiedTopology:true,
        })
    }
    catch{
        console.log('connected to mongodb')
    }
}

module.exports = connection
