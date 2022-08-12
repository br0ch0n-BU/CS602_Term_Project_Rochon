/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");

module.exports = async (req, res, next) => {
  // Fill in the code
  if (
    req.body.sku &&
    req.body.description &&
    req.body.price &&
    req.body.quantity
  ) {
    let product = new Product({
      sku: req.body.sku,
      description: req.body.description,
      price: req.body.price,
      quantityInStock: req.body.quantity,
    });
    if (req.body.imagePath) {
      product.imagePath = req.body.imagePath;
    }
    product.save((error) => {
      if (error) {
        console.error("Could not add product: " + error);
      }
      res.redirect("/products");
    });
  } else res.redirect("/products/add");
};
