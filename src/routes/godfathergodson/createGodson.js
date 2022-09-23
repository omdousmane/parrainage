const { json } = require("body-parser");
const { Users } = require("../../db/mongoose");
require("dotenv/config");

const api = process.env.API_URL;

module.exports = (app) => {
  app.put(`${api}/createGodson`, (req, res) => {
    const id = req.body.id;
    Users.findByIdAndUpdate(
      id,
      {
        $set: {
          familyLevel: req.body.familyLevel,
        },
        $push: {
          parentId: req.body.parentId,
        },
      },
      { new: true },
      (err, docs) => {
        if (err) {
          const message = "No user found, please contact your administrator";
          return res.status(500).json({ message, erreur: err });
        } else {
          const message = `the user ${docs.id} has been successfully updated`;
          res.status(200).json({ message, userUpdate: docs });
        }
      }
    );
  });
};
