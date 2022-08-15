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
    const totalPrice = parseFloat(req.body.desired) * parseFloat(product.price);


    res.render("confirmPurchaseView", {
      title: "Confirm Purchase",
      data: {
        id: product._id,
        sku: product.sku,
        desired: req.body.desired,
        total: totalPrice.toFixed(2),
        user: res.locals.user,
        isAdmin: res.locals.isAdmin
      },
    });
  });
};
