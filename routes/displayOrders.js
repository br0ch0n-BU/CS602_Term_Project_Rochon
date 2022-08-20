/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const Order = require("../models/order.js");

module.exports = async (req, res, next) => {
  if (res.locals.user) {
    let orders = await Order.find({username: res.locals.user}).sort("purchaseDate");

    let results = orders.map((order) => {
      return {
        id: order._id,
        sku: order.sku,
        username: order.username,
        date: order.purchaseDate,
        quantity: order.quantityOrdered,
        total: order.invoiceTotal.toFixed(2),
      };
    });

    res.render("displayOrdersView", {
      title: "Your Order History",
      data: results,
      thanks: req.query.success
    });
  } else res.redirect("/");
};
