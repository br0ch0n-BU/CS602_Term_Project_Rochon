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
    if (req.body.sku && req.body.total && req.body.quantity) {
      order.sku = req.body.sku;
      order.invoiceTotal = req.body.total;
      order.quantityOrdered = req.body.quantity;

      order.save((err) => {
        if (err) {
          console.error("Could not update order: " + err);
          return res.redirect("/manageorders?problem=true");
        }
        res.redirect("/manageorders?success=true");
      });
    } else {
      res.redirect("/manageorders?problem=true");
    }
  });
};
