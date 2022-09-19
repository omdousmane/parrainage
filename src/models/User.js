const mongoose = require("mongoose");

// création des collections (table) shema
module.exports = (mongoose) => {
  return mongoose.Schema({
    name: {
      type: String,
      required: { message: "name validation failed" },
    },
    email: {
      type: String,
      required: { message: "email validation failed email is requiered" },
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
    active: {
      type: Boolean,
      default: false,
    },
    validationKeys: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    validatedAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: "",
    },
  });
};
// to creat one post

// creation du model
// module.exports.Users = mongoose.model("User", usersShema);
