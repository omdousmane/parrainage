const mongoose = require("mongoose");
const userModel = require("../models/User");

const usersShema = userModel(mongoose);

usersShema.path("email").validate(async (email) => {
  const countEmail = await mongoose.models.User.countDocuments({ email });
  return !countEmail;
}, "Email already exists");

module.exports.Users = mongoose.model("User", usersShema);
