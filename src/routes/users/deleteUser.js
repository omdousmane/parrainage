const { Users } = require("../../db/mongoose");
require("dotenv").config();

const api = process.env.API_URL;

module.exports = (app) => {
  app.delete(`${api}/deleteUser`, async (req, res) => {
    await Users.findOneAndDelete(req.params.id)
      .then((user) => {
        if (user.length === 0) {
          const message =
            "The requested user does not exist. Please try again in a few moments";
          return res.status(404).json({ message, data: error });
        } else {
          const message = `The user with ID n°${user.id} has been deleted`;
          return res.status(200).json({ message, userDeleted: user });
        }
      })
      .catch((err) => {
        const message = `No user found`;
        res.status(500).json({ message, deletedUser: err });
      });
  });
};
