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