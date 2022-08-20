/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Order = require("../models/order.js");

module.exports = async (req, res, next) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      console.error("Could not look up order: " + err);
    }
    if (!order) {
      return res.render("404");
    }

    res.render("editOrderView", {
      title: "Edit Customer Order Details",
      data: {
        id: order._id,
        sku: order.sku,
        username: order.username,
        date: order.purchaseDate,
        total: order.invoiceTotal.toFixed(2),
        quantity: order.quantityOrdered,
      },
    });
  });
};
