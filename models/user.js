const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
  },
  {
    collection: "users_rochon",
  }
);
const userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;
