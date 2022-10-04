const mongoose = require("mongoose");
// création des collections (table) shema
const randomString = require("randomstring");
const stringValidation = randomString.generate();

module.exports = (mongoose) => {
  return mongoose.Schema({
    name: {
      type: String,
      // required: [true, "name validation failed"],
      minlength: [2, "Name must be at least 2 characters longer"],
      maxlength: [64, "Name must be at most 64 characters shorter"],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      // required: [true, "email validation failed email is requiered"],
      maxlength: [128, "Email must be at most 128 characters"],
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
    parentId: [
      // {
      //   type: mongoose.Types.ObjectId,
      //   ref: "users",
      // },
    ],
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
      default: stringValidation,
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
    writeConcern: {
      j: true,
      wtimeout: 1000,
    },
  });
};
