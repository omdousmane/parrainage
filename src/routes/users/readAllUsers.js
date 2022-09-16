const { Users } = require("../../db/mongoose");

require("dotenv/config");
const api = process.env.API_URL;

module.exports = (app) => {
  app.get(`${api}/readAllUsers`, (req, res) => {
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
          const message = `Il y a ${user.length} useregorie(s) qui correspond au terme de recherche ${name}`;
          res.status(200).json({ message, data: user });
        });
    }

    // find all users
    Users.find()
      .then((user) => {
        const message = "La liste des utilisateurs a bien été récupérée.";
        res.json({ message, data: user });
      })
      .catch((error) => {
        const message =
          "La liste des utilisateurs n'a pas été récuperée. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};