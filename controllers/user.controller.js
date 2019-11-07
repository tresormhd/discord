const User = require('../modeles/user.modele.js')
const chatgroup = require('../modeles/chatgroup.modele.js')

exports.UserQuery = class{
  
  static setUser(data){
      return new Promise(async (next)=>{
      const user = new User({
            numero: data.numero,
            pseudo:data.pseudo,
            email:data.email,
            password:data.password
      }).save().then((user)=>{
         next({etat:true, user:user})
      }).catch((err)=>{
         next({etat:false, erreur:err})
      })
    })
  }

   static getUser(data){
         return new Promise(async (next)=>{
         User.findOne({
            email:data.email,
            password:data.password
         }).then((user)=>{
            user.status = "online" 
            user.save()
            next({etat:true, user:user})
         
         }).catch((err)=>{
            next({etat:false, erreur:err})
         })
      })
   }

   static getAllUser(){
      return new Promise(async (next)=>{
         User.find().then((user)=>{
         next({etat:true, users:user})
         }).catch((err)=>{
         next({etat:false, erreur:err})
         })
      })
   }

   static setOnline(data){
      return new Promise(async (next)=>{
         User.findById(data)
         .then((user)=>{
            user.status = "online"
            user.save()
            next({etat:true, user:user})
         }).catch((err)=>{
            next({etat:false, erreur:err})
         })
      })
   }

   static setOffline(data){
   return new Promise(async (next)=>{
      User.findById(data)
      .then((user)=>{
         user.status = "offline"
         user.save()
         next({etat:true, user:user})
      }).catch((err)=>{
         next({etat:false, erreur:err})
      })
   })
   }


   static SetAway(data){
      return new Promise(async (next)=>{
         User.findById(data)
         .then((user)=>{
            user.status = "Away"
            user.save()
            next({etat:true, user:user})
         }).catch((err)=>{
            next({etat:false, erreur:err})
         })
      })
   }

   static SetBusy(data){
      return new Promise(async (next)=>{
         User.findById(data)
         .then((user)=>{
            user.status = "Busy"
            user.save()
            next({etat:true, user:user})
         }).catch((err)=>{
            next({etat:false, erreur:err})
         })
      })
   }

   static SetMessage(data){
      return new Promise (async(next)=>{
         const messaage = new chatGroup({
            video:data.video,
            text:data.text,
            date:date_pub,
            audio:data.audio,
            image:data.image

         })
      })
   }

   // return new Promise(async (next)=>{
   //    const user = new User({
   //          numero: data.numero,
   //          pseudo:data.pseudo,
   //          email:data.email,
   //          password:data.password
   //    }).save().then((user)=>{
   //       next({etat:true, user:user})
   //    }).catch((err)=>{
   //       next({etat:false, erreur:err})
   //    })
   //  })




}
