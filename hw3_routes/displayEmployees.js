/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

const Employee = require("../models/employee.js");
//const Employee = shopDB.getEmployeeModel();

// display employees

module.exports = async (req, res, next) => {
  let employees = await Employee.find({});

  let results = employees.map((emp) => {
    return {
      id: emp._id,
      firstName: emp.firstName,
      lastName: emp.lastName,
    };
  });

  res.render("displayEmployeesView", {
    title: "List of Employees",
    data: results,
    user: res.locals.user
  });
};
