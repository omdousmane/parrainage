// const mongoose = require("mongoose");

// création des collections (table) shema
module.exports = (mongoose) => {
  return mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },

    idDiscord: {
      type: String,
      default: "",
    },
    training: {
      type: String,
      default: "",
    },

    studyLevel: {
      type: Number,
      default: 1,
    },
    familyLevel: {
      type: Number,
      default: null,
    },
    idFamily: {
      type: Number,
      default: null,
    },

    quote: {
      type: String,
      default: "",
    },
  });
};
// to creat one post

// creation du model
// module.exports.Users = mongoose.model("User", usersShema);
