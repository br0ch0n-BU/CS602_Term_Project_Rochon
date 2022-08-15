/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");

module.exports = async (req, res, next) => {
  Product.findById(req.body.id, (err, product) => {
    if (err) {
      console.error("Could not look up product: " + err);
    }
    if (!product) {
      return res.render("404");
    }
    // Doublecheck for blank inputs then save product with new name values
    if (
      req.body.sku &&
      req.body.description &&
      req.body.price &&
      req.body.quantity
    ) {
      product.sku = req.body.sku;
      product.description = req.body.description;
      product.price = req.body.price;
      product.quantityInStock = req.body.quantity;
      if (req.body.imagePath) {
        product.imagePath = req.body.imagePath;
      }

      product.save((err) => {
        if (err) {
          console.error("Could not update product: " + err);
          return res.redirect("/products?problem=true");
        }
        res.redirect("/products");
      });
    } else {
      res.redirect("/products");
    }
  });
};
