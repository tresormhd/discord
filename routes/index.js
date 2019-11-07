const express = require('express')
const router =new express.Router

const {UserQuery} = require('../controllers/user.controller')

router.route('/')
  .get((req, res)=>{
    res.render('index')
  }),

router.route('/register')
  .get((req, res)=>{
    res.render('register')
  }),

router.route('/chat')
  .get(async(req, res)=>{
    if (req.session.connectUser) {
      const Users = await UserQuery.getAllUser()
      res.render('chat',{user:req.session.connectUser,AllUsers:Users.users})
    } else {
      res.redirect('/')
    }
  })

module.exports = router
