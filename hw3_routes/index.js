/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');


// other modules
const displayEmployees = require("./displayEmployees");
const addEmployee = require("./addEmployee");
const saveEmployee = require("./saveEmployee");
const addUser = require("./addUser");
const saveUser = require("./saveUser");
const login = require("./login");
const loginAction = require("./loginAction");
const editEmployee = require("./editEmployee");
const saveAfterEdit = require("./saveAfterEdit");
const deleteEmployee = require("./deleteEmployee");
const deleteEmployeeAfterConfirm = require("./deleteEmployeeAfterConfirm");

//const fakeMiddle = () => {console.log("foo");}; 
// router specs
function something(req, res, next) { 
  console.log("something called");
  const token = req.signedCookies.access_token;
  console.log ("token is " + token);
  const data = jwt.verify(token, process.env.CS602_TERM_PROJ_JWT_SECRET);
  console.log("email is: " + data.username);
  console.log("isAdmin is: " + data.isAdmin);
  res.locals.user = data.username;

  next();
};

router.get("/", function (req, res, next) {
  res.redirect("/employees");
});

router.get("/employees", something, displayEmployees);

router.get("/employees/add", addEmployee);
router.post("/employees/add", saveEmployee);

router.get("/register", addUser);
router.post("/register", saveUser);

router.get("/login", login);
router.post("/login", loginAction);

router.get("/employees/edit/:id", editEmployee);
router.post("/employees/edit/", saveAfterEdit);

router.get("/employees/delete/:id", deleteEmployee);
router.post("/employees/delete", deleteEmployeeAfterConfirm);

module.exports = router;
