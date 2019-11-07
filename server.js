let express = require('express')
let mongoose = require('mongoose')
let socket = require('socket.io')
let ejs = require('ejs')

let session = require('express-session')({
  secret:'dsfxckfsdfg',
  resave:true,
  saveUninitialized:true
})

const app = express()
const http = require('http').createServer(app)
const {UserQuery} = require('./controllers/user.controller')

app.use(express.static ('./public'))
app.set('views','./views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extend:true}))

app.use(session)

const db = require('./setting/database')
const route = require('./routes/index')
app.use(route)
db();
const io = require('socket.io').listen(http.listen(5000,()=>{
  console.log('on ecoute sur le port 5000')
}))

const sharedsession = require("express-socket.io-session");
   io.use(sharedsession(session, {
   autoSave:true
   }));

const register = io.of('/register');
   register.on('connection', (socket)=>{
   console.log('user connected'),
      socket.on('sign_up',async(data)=>{
         const result = await UserQuery.setUser(data)
         socket.emit('sign_up', result.user)
      })
   })

const login = io.of('/').use(sharedsession(session));
   login.on('connection', (socket)=>{
      console.log('user logging')
      socket.on('sign_in',async (data)=>{
         console.log(data);
         const result= await UserQuery.getUser(data)
         if(result.user != null){
            socket.handshake.session.connectUser = result.user
            socket.handshake.session.save();
            socket.emit('sign_in');
         }
      })
   })


const chatBox = io.of('/chat').use(sharedsession(session));
   chatBox.on('connection',(socket)=>{
      chatBox.emit('userOnline', socket.handshake.session.connectUser)
      
      socket.on('SetOnline',async (data)=>{
         console.log(data);
         const result = await UserQuery.setOnline(data)

         socket.handshake.session.connectUser.status = result.user.status   
         socket.handshake.session.save()
         chatBox.emit('SetOnline',result.user)
      })

      socket.on('SetAway',async (data)=>{
         console.log(data);
         const result = await UserQuery.SetAway(data)

         socket.handshake.session.connectUser.status = result.user.status   
         socket.handshake.session.save()
         chatBox.emit('SetAway',result.user)
      })
      socket.on('SetBusy',async (data)=>{
         console.log(data);
         const result = await UserQuery.SetBusy(data)

         socket.handshake.session.connectUser.status = result.user.status   
         socket.handshake.session.save()
         chatBox.emit('SetBusy',result.user)
      })
      socket.on('logout',async (data)=>{
         console.log(data);
         const result = await UserQuery.setOffline(data)
         delete socket.handshake.session.connectUser
         socket.handshake.session.save()
         chatBox.emit('deco',result.user)
      })


   })
   