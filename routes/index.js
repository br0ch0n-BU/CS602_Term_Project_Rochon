/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 TermProject, Sum2 2022  *
 **************************/

const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');


// other modules
const displayProducts = require("./displayProducts");

const addProduct = require("./addProduct");
const saveProduct = require("./saveProduct");
const addUser = require("./addUser");
const saveUser = require("./saveUser");
const login = require("./login");
const loginAction = require("./loginAction");
const editProduct = require("./editProduct");
const saveAfterProductEdit = require("./saveAfterProductEdit");
const deleteProduct = require("./deleteProduct");
const deleteProductAfterConfirm = require("./deleteProductAfterConfirm");

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
  res.redirect("/products");
});

router.get("/products", something, displayProducts);


router.get("/products/add", addProduct);
router.post("/products/add", saveProduct);

router.get("/register", addUser);
router.post("/register", saveUser);

router.get("/login", login);
router.post("/login", loginAction);

router.get("/products/edit/:id", editProduct);
router.post("/products/edit/", saveAfterProductEdit);

router.get("/products/delete/:id", deleteProduct);
router.post("/products/delete", deleteProductAfterConfirm);

module.exports = router;
