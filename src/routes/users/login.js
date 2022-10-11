const { Users } = require("../../db/mongoose");
const bcrypt = require("bcrypt");

require("dotenv/config");
const api = process.env.API_URL;

// Utilisation de jsonwebtoken
const jwt = require("jsonwebtoken");
const privateKey = require("../../auth/private_key");

module.exports = (app) => {
  app.post(`${api}/login`, (req, res) => {
    Users.find({ email: req.body.email })
      .select("email password")
      .then((user) => {
        if (!user) {
          const message = `User not found`;
          return res.status(400).json({ message: message });
        }
        bcrypt
          .compare(req.body.password, user[0].password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mail ou le mot de passe est incorrect`;
              return res.status(404).json({ message });
            }
            //JWT
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, user: user, token });
          })
          .catch((error) => {
            const message = `L'utilisateur n'a pas pu être connecté`;
            return res.status(404).json({ message: message, err: error });
          });
      })
      .catch((error) => {
        const message = `Aucun utilisateur trouvé`;
        return res.status(404)({ message: message, err: error });
      });
  });
};
