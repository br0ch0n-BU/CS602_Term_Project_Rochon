/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  User.findById(req.body.id, async (err, user) => {
    if (err) {
      console.error("Could not look up user: " + err);
    }
    if (!user) {
      return res.render("404");
    }

    // Doublecheck for blank inputs then save user with new name values
    if (req.body.fname && req.body.lname && req.body.email) {
      user.firstName = req.body.fname;
      user.lastName = req.body.lname;
      user.email = req.body.email.toLowerCase();
      user.isAdmin = req.body.isAdmin ? true : false;

      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      user.save((err) => {
        if (err) {
          console.error("Could not update user: " + err);
          return res.redirect(`/users/edit/${req.body.id}?problem=true`);
        }
        res.redirect("/users?success=true");
      });
    } else {
      res.redirect(`/users/edit/${req.body.id}?problem=true`);
    }
  });
};
