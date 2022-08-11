/***************************
 *  Brandon Rochon         *
 *  brochon@bu.edu         *
 *  CS 602 HW3, Sum2 2022  *
 **************************/

const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.CS602_TERM_PROJ_JWT_SECRET || "secret"


module.exports = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  if (req.body.email && req.body.password) {

    //let user = new User({
    //  firstName: req.body.fname,
    //  lastName: req.body.lname,
    //  email: req.body.email,
    //  password: await bcrypt.hash(req.body.password, salt),
    //});

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        const accessToken = jwt.sign({ username: user.email,  isAdmin: user.isAdmin }, accessTokenSecret);
        res.cookie('access_token', accessToken, { signed: true });
        res.status(200).json({ message: "Valid password.  Token is: " + accessToken });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }


    /*user.save((error) => {
      if (error) {
        console.error("Could not register user: " + error);
      }
      // Success
      res.redirect("/employees");
    }); */

  } else res.redirect("/login");
};
