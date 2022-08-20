/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");

module.exports = async (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) {
      console.error("Could not look up product: " + err);
    }
    if (!product) {
      return res.render("404");
    }

    res.render("editProductView", {
      title: "Edit Product Details",
      data: {
        id: product._id,
        sku: product.sku,
        description: product.description,
        image: product.imagePath,
        price: product.price,
        quantity: product.quantityInStock,
      },
    });
  });
};
