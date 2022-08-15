/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Order = require("../models/order.js");

module.exports = async (req, res, next) => {
  Order.findById(req.body.id, (err, order) => {
    if (err) {
      console.error("Could not look up order: " + err);
    }
    if (!order) {
      return res.render("404");
    }
    // Doublecheck for blank inputs then save order with new name values
    if (
      req.body.sku &&
      req.body.description &&
      req.body.price &&
      req.body.quantity
    ) {
      order.sku = req.body.sku;
      order.description = req.body.description;
      order.price = req.body.price;
      order.quantityInStock = req.body.quantity;
      if (req.body.imagePath) {
        order.imagePath = req.body.imagePath;
      }

      order.save((err) => {
        if (err) {
          console.error("Could not update order: " + err);
          return res.redirect("/orders?problem=true");
        }
        res.redirect("/orders");
      });
    } else {
      res.redirect("/orders");
    }
  });
};
