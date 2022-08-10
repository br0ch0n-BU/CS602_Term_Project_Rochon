/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

//const shopDB = require("../shopDB.js");
const Employee = require("../models/employee.js");

module.exports = async (req, res, next) => {
  // Fill in the code
  Employee.findById(req.params.id, (err, employee) => {
    if (err) {
      console.error("Could not look up employee: " + err);
    }
    if (!employee) {
      return res.render("404");
    }

    res.render("editEmployeeView", {
      title: "Edit employee",
      data: {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
    });
  });
};
