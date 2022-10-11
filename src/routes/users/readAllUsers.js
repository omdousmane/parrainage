const { Users } = require("../../db/mongoose");
const validator = require("validator");
const auth = require("../../auth/auth");
require("dotenv/config");
const api = process.env.API_URL;

module.exports = (app) => {
  app.get(`${api}/readAllUsers`, auth, (req, res) => {
    // find User by name
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.lenght < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 carctères`;
        return res.status(400).json({ message });
      }
      return Users.find({ name: { $regex: name, $options: "i" } })
        .limit(5)
        .exec((err, user) => {
          if (err) {
            const message = `Error survenue lors de la recuperation`;
            return res.status(500).json({ message, data: err });
          }
          const message = `Il y a ${user.length} user(s) qui correspond au terme de recherche ${name}`;
          res.status(200).json({ message, data: user });
        });
    }

    // find User by email
    if (req.query.email) {
      const email = req.query.email;

      const verifEmail = validator.isEmail(req.query.email);
      if (!verifEmail) {
        const message = `Email non conforme`;
        return res.status(401).json({ message });
      }
      return Users.find({ email: { $regex: email, $options: "i" } }).exec(
        (err, user) => {
          if (err) {
            const message = `Une erreur est survenue lors de la recuperation`;
            return res.status(500).json({ message, data: err });
          }
          const message = `Un utilisateur trouvé pour l'adresse ${email}`;
          res.status(200).json({ message, data: user });
        }
      );
    }

    // find all users
    Users.find()
      .then((user) => {
        if (user.length !== 0) {
          const message = "La liste des utilisateurs a bien été récupérée.";
          return res.status(200).json({ message, data: user });
        } else {
          const message = "Aucun utilisateur dans la base de donnée.";
          return res.status(404).json({ message });
        }
      })
      .catch((error) => {
        const message =
          "La liste des utilisateurs n'a pas été récuperée. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};
