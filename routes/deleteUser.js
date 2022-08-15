/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const User = require("../models/user.js");

module.exports = async (req, res, next) => {

  User.findById(req.params.id, (err, user) => {
    if (err) {
      console.error("Could not look up user: " + err);
    }
    if (!user) {
      return res.render("404");
    }

    res.render("deleteUserView", {
      title: "Admin Delete this user?",
      data: {
        id: user._id,
        sku: user.sku,
        description: user.description,
        user: res.locals.user,
        isAdmin: res.locals.isAdmin
      },
    });
  });
};
