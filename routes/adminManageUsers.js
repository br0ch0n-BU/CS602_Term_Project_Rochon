/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

const User = require("../models/user.js");

module.exports = async (req, res, next) => {
    let users = await User.find({}).sort({lastName: 1, firstName: 1});

    let results = users.map((user) => {
      return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
      };
    });

    res.render("displayUsersView", {
      title: "Admin Manage Users",
      data: results,
      manageView: true
    });
};
