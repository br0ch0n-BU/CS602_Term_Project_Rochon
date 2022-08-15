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

const editOrder = require("./editOrder");
const deleteOrder = require("./deleteOrder");
const deleteOrderAfterConfirm = require("./deleteOrderAfterConfirm");
const saveAfterOrderEdit = require("./saveAfterOrderEdit");

const adminManageOrders = require("./adminManageOrders");
const adminManageUsers = require("./adminManageUsers");


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

const editUser = require("./editUser");
const deleteUser = require("./deleteUser");
const deleteUserAfterConfirm = require("./deleteUserAfterConfirm");

const saveAfterUserEdit = require("./saveAfterUserEdit");


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

router.get("/manageorders", checkToken, employeeOnly, adminManageOrders);
router.get("/manageorders/edit/:id", checkToken, employeeOnly, editOrder);
router.post("/manageorders/edit", checkToken, employeeOnly, saveAfterOrderEdit);
router.get("/manageorders/delete/:id", checkToken, employeeOnly, deleteOrder);
router.post(
  "/manageorders/delete",
  checkToken,
  employeeOnly,
  deleteOrderAfterConfirm
);


router.get("/orders", checkToken, customerOnly, displayOrders);
router.post("/buy", checkToken, customerOnly, confirmPurchase);
router.post("/reallybuy", checkToken, customerOnly, completePurchase);



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

router.get("/users", checkToken, employeeOnly, adminManageUsers);
router.get("/users/edit/:id", checkToken, employeeOnly, editUser);
router.post("/users/edit", checkToken, employeeOnly, saveAfterUserEdit);
router.get("/users/delete/:id", checkToken, employeeOnly, deleteUser);
router.post(
  "/users/delete",
  checkToken,
  employeeOnly,
  deleteUserAfterConfirm
);

module.exports = router;
