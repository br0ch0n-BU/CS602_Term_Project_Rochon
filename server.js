/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/


var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();
const mongoose = require("mongoose");

const credentials = require("./credentials.js");

const dbUrl =
  "mongodb+srv://" +
  credentials.username +
  ":" +
  credentials.password +
  "@" +
  credentials.host +
  "/" +
  credentials.database;

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// setup handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
var routes = require('./hw3_routes/index');
app.use('/', routes);

app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});

