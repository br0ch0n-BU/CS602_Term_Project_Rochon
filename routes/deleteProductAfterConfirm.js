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

    product.deleteOne((err) => {
      if (err) {
        console.error("Could not delete product: " + err);
        return res.redirect("/products?problem=true");
      }
      res.redirect("/products?success=true");
    });
  });
};
