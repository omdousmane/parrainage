const { json } = require("body-parser");
const { Users } = require("../../db/mongoose");
const bcrypt = require("bcrypt");
// const sgMail = require("@sendgrid/mail");
const validator = require("validator");
// const mailgun = require("mailgun-js");
require("dotenv/config");
// const domain = "sandbox8815a254d5e942118421fefd0d256456.mailgun.org";
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: domain,
// });

const api = process.env.API_URL;

module.exports = async (app) => {
  app.post(`${api}/createUser`, async (req, res) => {
    let dataUser = {
      name: req.body.name,
      email: req.body.email,
      training: req.body.training,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    const users = new Users(dataUser);
    users
      .save()
      .then((user) => {
        const message = `L'utilisateur a été créé avec succès !`;
        res.status(201).json({ message, data: user });
      })
      .catch((err) => {
        const message = `L'utilisateur n'a pas été créé !`;
        res.status(500).json({ message: message, erreur: err });
      });
    // }
  });
};
