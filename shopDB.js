/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 TermProject, Sum2 2022  *
 **************************/

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

let connection = null;
let userConnection = null;
let employeeConnection = null;

let userModel = null;
let employeeModel = null;


let Schema = mongoose.Schema;

// Step 1. Fill in the schema definition

// Step 2. For collection, replace lastName below with your lastName

let employeeSchema = new Schema(
  {
    firstName: String,
    lastName: String,
  },
  {
    collection: "employees_rochon",
  }
);

let userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String

  },
  {
    collection: "users_rochon",
  }
);

module.exports = {
  getEmployeeModel: () => {
    if (connection == null) {
      console.log("Creating connection and model...");
      connection = mongoose.createConnection(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      employeeModel = connection.model("EmployeeModel", employeeSchema);
    }
    return employeeModel;
  },

  getUserModel: () => {
    if (connection == null) {
      console.log("Creating connection and model...");
      connection = mongoose.createConnection(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      userModel = connection.model("UserModel", userSchema);
    }
    return userModel;
  },
};
