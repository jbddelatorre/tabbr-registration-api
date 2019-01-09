const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const tournaments = require('./routes/api/tournaments');
const representatives = require('./routes/api/representatives');

const app = express();

//Morgan
app.use(morgan('dev'));

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err))

app.get('/', (req, res) => res.send('hello!!!!'));

//Use Routes
app.use('/api/tournaments', tournaments);
app.use('/api/representatives', representatives);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));