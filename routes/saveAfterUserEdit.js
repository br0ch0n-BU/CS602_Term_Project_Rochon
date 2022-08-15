/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const User = require("../models/user.js");

module.exports = async (req, res, next) => {
  User.findById(req.body.id, (err, user) => {
    if (err) {
      console.error("Could not look up user: " + err);
    }
    if (!user) {
      return res.render("404");
    }
    // Doublecheck for blank inputs then save user with new name values
    if (
      req.body.sku &&
      req.body.description &&
      req.body.price &&
      req.body.quantity
    ) {
      user.sku = req.body.sku;
      user.description = req.body.description;
      user.price = req.body.price;
      user.quantityInStock = req.body.quantity;
      if (req.body.imagePath) {
        user.imagePath = req.body.imagePath;
      }

      user.save((err) => {
        if (err) {
          console.error("Could not update user: " + err);
          return res.redirect("/users?problem=true");
        }
        res.redirect("/users");
      });
    } else {
      res.redirect("/users");
    }
  });
};
