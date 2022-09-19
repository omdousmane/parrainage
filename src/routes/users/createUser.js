const { json } = require("body-parser");
const { Users } = require("../../db/mongoose");
require("dotenv/config");
const randomString = require("randomString");
const sgMail = require("@sendgrid/mail");
const { stringValidation } = require("mongoose");
const api = process.env.API_URL;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (app) => {
  app.post(`${api}/createUser`, async (req, res) => {
    const stringValidation = await randomString.generate();
    const users = new Users({
      name: req.body.name,
      email: req.body.email,
      training: req.body.training,
      validationKeys: stringValidation,
      active: false,
    });
    users
      .save()
      .then(async (user) => {
        let html = `<p>Veillez cliquez sur<a href="http://${req.headers.host}/${api}/validateMail/?token=${stringValidation}"> le liens suivant
                    </a>pour valider votre compte.  </p>
                    <p>Vous avez 30 jours pour valider votre compte </p>
                    <p>http://${req.headers.host}${api}/validateMail?token=${stringValidation} </p>`;
        const msg = {
          to: req.body.email, // Change to your recipient
          from: "omdousmane@gmail.com", // Change to your verified sender
          subject: "Confirm your email",
          text: "Confirm your email address",
          html: html,
        };
        await sgMail
          .send(msg)
          .then(() => {
            const message = `Un mail de confirmation a été envoyé à ${req.body.email}`;
            res.status(202).json({ message, dataUser: user });
          })
          .catch((error) => {
            const message = `Erreur d'envoie de mail`;
            res.status(500).json({ message, error });
          });
      })

      .catch((err) => {
        // if (err  stringValidation) {
        //   return res.status(400).json({ message: error.message, data: error });
        // }
        const message = `L'utilisateur  n'a pas été créé !`;
        let messages = err.message.split(":")[2];
        res.status(500).json({ message, error: messages });
      });
  });
};
