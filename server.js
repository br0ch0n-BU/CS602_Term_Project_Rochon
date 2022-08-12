/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 TermProject, Sum2 2022  *
 **************************/

const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const jwt = require("jsonwebtoken");
const accesstokensecret = process.env.CS602_TERM_PROJ_JWT_SECRET || "secret";
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

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
app.engine("handlebars", handlebars({ defaultLayout: "main_logo" }));
app.set("view engine", "handlebars");

// static resources
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("cookiesecret"));

// Routing
var routes = require("./routes/index");
app.use("/", routes);

app.use(function (req, res) {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(3000, function () {
  console.log("http://localhost:3000");
});
