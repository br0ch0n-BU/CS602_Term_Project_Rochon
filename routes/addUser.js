/***********************************
 *  Brandon Rochon                 *
 *  brochon@bu.edu                 *
 *  CS 602 TermProject, Sum2 2022  *
 **********************************/

module.exports = (req, res, next) => {
  res.render("addUserView", {
    title: "Register New User",
    problem: req.query.problem,
  });
};
