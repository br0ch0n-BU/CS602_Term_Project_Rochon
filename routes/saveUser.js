/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 TermProject, Sum2 2022  *
 **************************/

const User = require("../models/user.js");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  if (req.body.fname && req.body.lname && req.body.email && req.body.password) {
    let user = new User({
      firstName: req.body.fname,
      lastName: req.body.lname,
      email: req.body.email.toLowerCase(),
      password: await bcrypt.hash(req.body.password, salt),
    });

    user.save((error) => {
      if (error) {
        console.error("Could not register user: " + error);
      }
      // Success
      res.redirect("/login");
    });
  } else res.redirect("/register");
};
