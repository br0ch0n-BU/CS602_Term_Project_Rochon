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

    res.render("deleteOrderView", {
      title: "Admin Delete this order?",
      data: {
        id: order._id,
        sku: order.sku,
        description: order.description,
        user: res.locals.user,
        isAdmin: res.locals.isAdmin
      },
    });
  });
};
