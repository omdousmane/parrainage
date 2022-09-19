const sgMail = require("@sendgrid/mail");
const randomString = require("randomString");
const path = require("path");
const { Users } = require("../../db/mongoose");
require("dotenv").config();

const stringValidation = randomString.generate();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const api = process.env.API_URL;
const PORT = process.env.PORT || 7000;

module.exports = (app) => {
  app.post(`${api}/sendMail`, async (req, res) => {
    userByMail = await Users.findOne({ email: req.body.email });
    if (!userByMail) {
      const message = "Mail not found";
      res.status(404).json({ message });
    } else {
      res.status(404).json({ userByMail });
    }
  });
};
