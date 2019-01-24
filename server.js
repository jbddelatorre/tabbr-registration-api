const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const tournaments = require('./routes/api/tournaments');
const representatives = require('./routes/api/representatives');
const viewregistration = require('./routes/api/viewregistration');
// const signup = require('./routes/api/account/signup')
// const login = require('./routes/api/account/login')
const account = require('./routes/api/account')

const app = express();

//Morgan
app.use(morgan('dev'));


//CORS **STUDY THIS
// *** FIX THIS BEFORE DEPLOYMENT
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Body Parser
app.use(bodyParser.urlencoded({extended: false, useNewUrlParser: true}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);


app.get('/', (req, res) => res.send('hello!!!!'));

//Use Routes
app.use('/api/tournaments', tournaments);
app.use('/api/registration', representatives);
app.use('/api/viewregistration', viewregistration);
app.use('/api/account', account);
// app.use('/api/login', login);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));