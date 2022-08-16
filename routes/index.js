/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const displayStore = require("./displayStore");
const displayOrders = require("./displayOrders");

const confirmPurchase = require("./confirmPurchase");
const completePurchase = require("./completePurchase");

const editOrder = require("./editOrder");
const deleteOrder = require("./deleteOrder");
const deleteOrderAfterConfirm = require("./deleteOrderAfterConfirm");
const saveAfterOrderEdit = require("./saveAfterOrderEdit");

const addUser = require("./addUser");
const saveUser = require("./saveUser");
const login = require("./login");
const logout = require("./logout");
const loginAction = require("./loginAction");

const adminManageOrders = require("./adminManageOrders");
const adminManageUsers = require("./adminManageUsers");
const editUser = require("./editUser");
const deleteUser = require("./deleteUser");
const deleteUserAfterConfirm = require("./deleteUserAfterConfirm");
const saveAfterUserEdit = require("./saveAfterUserEdit");

const displayProducts = require("./displayProducts");
const addProduct = require("./addProduct");
const saveProduct = require("./saveProduct");
const editProduct = require("./editProduct");
const saveAfterProductEdit = require("./saveAfterProductEdit");
const deleteProduct = require("./deleteProduct");
const deleteProductAfterConfirm = require("./deleteProductAfterConfirm");

// Middleware
const checkToken = (req, res, next) => {
  const token = req.signedCookies.access_token;
  if (token) {
    const data = jwt.verify(token, process.env.CS602_TERM_PROJ_JWT_SECRET);
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


// Default to storefront
router.get("/", function (req, res, next) {
  res.redirect("/store");
});

// Unauthenticated routes
router.get("/store", checkToken, displayStore);
router.get("/register", addUser);
router.post("/register", saveUser);
router.get("/login", checkToken, login);
router.post("/login", loginAction);
router.get("/logout", logout);

// Routes for authenticated customers
router.get("/orders", checkToken, customerOnly, displayOrders);
router.post("/buy", checkToken, customerOnly, confirmPurchase);
router.post("/reallybuy", checkToken, customerOnly, completePurchase);


// Routes for admins
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

router.get("/products", checkToken, employeeOnly, displayProducts);
router.get("/products/add", checkToken, employeeOnly, addProduct);
router.post("/products/add", checkToken, employeeOnly, saveProduct);
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
