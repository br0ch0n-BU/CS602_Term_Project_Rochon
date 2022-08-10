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
    // Doublecheck for blank inputs then save employee with new name values
    if (req.body.fname && req.body.lname) {
      employee.firstName = req.body.fname;
      employee.lastName = req.body.lname;

      employee.save((err) => {
        if (err) {
          console.error("Could not update employee: " + err);
        }
        res.redirect("/employees");
      });
    } else {
      res.redirect("/employees");
    }
  });
};
