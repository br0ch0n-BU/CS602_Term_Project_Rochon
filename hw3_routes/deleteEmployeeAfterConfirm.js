/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

//const shopDB = require("../shopDB.js");
const Employee = require("../models/employee.js");

module.exports = async (req, res, next) => {
  // Fill in the code
  Employee.findById(req.body.id, (err, employee) => {
    if (err) {
      console.error("Could not look up employee: " + err);
    }
    if (!employee) {
      return res.render("404");
    }

    employee.remove((err) => {
      if (err) {
        console.error("Could not delete employee: " + err);
      }
      res.redirect("/employees");
    });
  });
};
