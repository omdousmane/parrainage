const { json } = require("body-parser");
const { Users } = require("../../db/mongoose");
require("dotenv/config");

const api = process.env.API_URL;

module.exports = (app) => {
  app.post(`${api}/createUser`, (req, res) => {
    const users = new Users(req.body);
    users
      .save()
      .then((user) => {
        const message = `L'utilisateur ${req.body.name} a été créé avec succès`;
        res.status(201).json({ message, user: user });
      })
      .catch((err) => {
        const message = `L'utilisateur ${req.body.name} n'a été créé !`;
        res.status(500).json({ message, user: err });
      });
  });
};
