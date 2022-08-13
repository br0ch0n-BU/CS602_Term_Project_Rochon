/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const displayProducts = require("./displayProducts");
const displayStore = require("./displayStore");
const displayOrders = require("./displayOrders");
const confirmPurchase = require("./confirmPurchase");
const completePurchase = require("./completePurchase");


const addProduct = require("./addProduct");
const saveProduct = require("./saveProduct");
const addUser = require("./addUser");
const saveUser = require("./saveUser");
const login = require("./login");
const logout = require("./logout");

const loginAction = require("./loginAction");
const editProduct = require("./editProduct");
const saveAfterProductEdit = require("./saveAfterProductEdit");
const deleteProduct = require("./deleteProduct");
const deleteProductAfterConfirm = require("./deleteProductAfterConfirm");


const checkToken = (req, res, next) => {
  console.log("checktoken called");
  const token = req.signedCookies.access_token;
  console.log("token is " + token);
  if (token) {
    const data = jwt.verify(token, process.env.CS602_TERM_PROJ_JWT_SECRET);
    console.log("email is: " + data.username);
    console.log("isAdmin is: " + data.isAdmin);
    res.locals.user = data.username;
    res.locals.isAdmin = data.isAdmin;
  }
  next();
};
const employeeOnly = (req, res, next) => {
  if (res.locals.isAdmin) return next();
  next("route");
};

const customerOnly = (req, res, next) => {
  if (res.locals.user) return next();
  res.redirect("/");
};

router.get("/", function (req, res, next) {
  res.redirect("/store");
});

router.get("/store", checkToken, displayStore);
router.get("/orders", checkToken, displayOrders);
router.post("/buy", checkToken, confirmPurchase);
router.post("/reallybuy", checkToken, completePurchase);



router.get("/products", checkToken, employeeOnly, displayProducts);

router.get("/products/add", checkToken, employeeOnly, addProduct);
router.post("/products/add", checkToken, employeeOnly, saveProduct);

router.get("/register", addUser);
router.post("/register", saveUser);

router.get("/login", checkToken, login);
router.post("/login", loginAction);

router.get("/logout", logout);

router.get("/products/edit/:id", checkToken, employeeOnly, editProduct);
router.post("/products/edit/", checkToken, employeeOnly, saveAfterProductEdit);

router.get("/products/delete/:id", checkToken, employeeOnly, deleteProduct);
router.post(
  "/products/delete",
  checkToken,
  employeeOnly,
  deleteProductAfterConfirm
);

module.exports = router;
