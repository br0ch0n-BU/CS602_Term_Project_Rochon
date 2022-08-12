/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 TermProject, Sum2 2022  *
 **************************/

//const shopDB = require("../shopDB.js");
const Employee = require("../models/employee.js");

module.exports = async (req, res, next) => {
  // Fill in the code
  if (req.body.fname && req.body.lname) {
    let employee = new Employee({
      firstName: req.body.fname,
      lastName: req.body.lname,
    });
    employee.save((error) => {
      if (error) {
        console.error("Could not add employee: " + error);
      }
      res.redirect("/employees");
    });
  } else res.redirect("/employees/add");
};
