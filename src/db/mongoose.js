const mongoose = require("mongoose");
const userModel = require("../models/User");

const usersShema = userModel(mongoose);

module.exports.Users = mongoose.model("User", usersShema);
