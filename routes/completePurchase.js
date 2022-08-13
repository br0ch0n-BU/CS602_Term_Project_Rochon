/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Product = require("../models/product.js");
const Order = require("../models/order.js");

module.exports = async (req, res, next) => {
  Product.findById(req.body.id, (err, product) => {
    if (err) {
      console.error("Could not look up product: " + err);
    }
    if (!product) {
      return res.render("404");
    }

    //TODO: don't allow negative; handle errors
    product.quantityInStock -= req.body.desired;
    product.save();

    let order = new Order({
      sku: req.body.sku,
      username: res.locals.user,
      purchaseDate: new Date(Date.now()),
      quantityOrdered: req.body.desired,
      invoiceTotal: req.body.total,
    });

    order.save((error) => {
      if (error) {
        console.error("Could not place order: " + error);
      }
      // Success
      res.redirect("/orders");
    });
  });
};
