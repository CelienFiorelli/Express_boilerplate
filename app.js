const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());

app.use('/user', require('./controllers/usersController'));
app.use('/', require('./controllers/authController'));

module.exports = app;