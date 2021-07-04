
//Express calling
const express = require('express')
//Router calling
const router = express.Router()
//Post model calling
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/UsersModel')
const {registrationValidation, loginValidation} = require('./validation')
//Gets all the users

router.get('/', async (req, res) => {

    
    try {
        const users = await Users.find()
        res.json(users)
    }
    catch (err) {
        res.json({
            message: err
        })
    }
})


//New user registration
router.post('/registration',async (req, res) => {
    const {error} = registrationValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //Check if any email already exists

    const emailExist = await Users.findOne({email:req.body.email})

    if (emailExist) return res.status(400).send('Email Already Exists!')
    
    //Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword

    })
    

    try {
        const savedRegistration =  await user.save()
        
        res.send({user:user._id})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login',async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //Check if user exists

    const user = await Users.findOne({email:req.body.email})

    if (!user) return res.status(400).send('Email not Found!')
    
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send('Invalid Password')
    // Create a token
    const token = jwt.sign({
        _id: user._id,
        }, process.env.TOKEN_SECRET)
        // console.log(user);
    try {
        
        res.header('auth_token',token).send(token)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out.');
  })


module.exports = router