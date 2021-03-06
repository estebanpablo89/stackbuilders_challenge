const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// route file
const licenses = require('./routes/licenses');

const app = express();

// body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount router
app.use('/api/licenses', licenses);

// main page
app.get('/', (req, res) => {
  res.send('./public/index.html');
});

module.exports = app;
