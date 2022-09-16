const { Category } = require("../../models/category");
// const mongoose = require("mongoose");
// const query = new mongoose.Query();

require("dotenv/config");
const api = process.env.API_URL;

module.exports = (app) => {
  app.get(`${api}/categories`, (req, res) => {
    // get categories by name
    if (req.query.name) {
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.lenght < 2) {
        const message = `Le terme de recherche doit contenir au minimum 2 carctères`;
        return res.status(400).json({ message });
      }
      return Category.find({ name: { $regex: name, $options: "i" } })
        .limit(5)
        .exec((err, cat) => {
          if (err) {
            const message = `Error survenue lors de la recuperation`;
            return res.status(500).json({ message, data: err });
          }
          const message = `Il y a ${cat.length} categorie(s) qui correspond au terme de recherche ${name}`;
          res.status(200).json({ message, data: cat });
        });
    }

    // get all categories
    Category.find()
      .then((cat) => {
        const message = "La liste des categories a bien été récupérée.";
        res.json({ message, data: cat });
      })
      .catch((error) => {
        const message =
          "La liste des categories n'a pas été récuperée. Reesayer dans quelques instant";
        res.status(500).json({ message, data: error });
      });
  });
};
