const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
  },
  {
    collection: "employees_rochon",
  }
);
const employeeModel = mongoose.model("EmployeeModel", employeeSchema);
module.exports = employeeModel;
