const { json } = require("body-parser");
const { Users } = require("../../db/mongoose");
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
    const verifEmail = validator.isEmail(req.body.email);
    if (verifEmail !== true) {
      const message = `Email non conforme`;
      return res.status(401).json({ message });
    } else {
      const users = new Users(req.body);
      users
        .save()
        .then((user) => {
          const message = `L'utilisateur a été créé avec succès !`;
          res.status(201).json({ message, data: user, mail: body });
        })
        .catch((err) => {
          const message = `L'utilisateur n'a pas été créé !`;
          let messages = err.message.split(":")[2];
          res.status(500).json({ message, messages, err });
        });
    }
  });
};
