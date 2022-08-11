/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

module.exports = (req, res, next) => {
  res.render("loginView", { title: "Login" });
};
