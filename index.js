//Required packages
session = require('express-session')
const express = require('express')
const cors = require('cors')
const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const mongoose = require('mongoose',{ useUnifiedTopology: true })
const cookieParser = require('cookie-parser');
const postRoute = require('./routes/postsroute')
const postUsersRoute = require('./routes/usersroute')
//Middlewares
app.use('/posts',postRoute)
app.use('/account',postUsersRoute)
app.use(cors())

app.use(cookieParser('abcdefg'));

app.use(session({
    secret: 'abcdefg',
    resave: true,
    saveUninitialized: true,
	// cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());




require('dotenv/config')

//ROUTES

app.get('/',(req,res)=>
		
		{
			res.send('We are at home!')
		}	
	)
app.get('/posts',(req,res)=>
		
		{
			res.send('We are at posts!')
		}	
	)

//Connect to DB

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true },

	() => 
	console.log('Connected to db')
	)


//Connect to server

app.listen(3000)