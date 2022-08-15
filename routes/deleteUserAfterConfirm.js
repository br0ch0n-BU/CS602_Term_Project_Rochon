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

    user.deleteOne((err) => {
      if (err) {
        console.error("Could not delete user: " + err);
        return res.redirect("/users?problem=true");
      }
      res.redirect("/users?success=true");
    });
  });
};
