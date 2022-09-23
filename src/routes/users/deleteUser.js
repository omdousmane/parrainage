const { Users } = require("../../db/mongoose");
require("dotenv").config();

const api = process.env.API_URL;

module.exports = (app) => {
  app.delete(`${api}/deleteUser`, (req, res) => {
    Users.findOneAndDelete(req.params.id)
      .then((user) => {
        if (user.length === 0) {
          const message =
            "The requested user does not exist. Please try again in a few moments";
          return res.status(404).json({ message, data: user });
        } else {
          const message = `The user with ID n°${user.id} has been deleted`;
          return res.status(200).json({ message, userDeleted: user });
        }
      })
      .catch((err) => {
        const message = `No user found diallo`;
        res.status(500).json({ message, err });
      });
  });
};
