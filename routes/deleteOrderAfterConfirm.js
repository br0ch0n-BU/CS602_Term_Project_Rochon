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

    order.deleteOne((err) => {
      if (err) {
        console.error("Could not delete order: " + err);
        return res.redirect("/manageorders?problem=true");
      }
      res.redirect("/manageorders?success=true");
    });
  });
};
