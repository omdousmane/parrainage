const { Users } = require("../../db/mongoose");
require("dotenv").config();

const api = process.env.API_URL;

module.exports = (app) => {
  app.get(`${api}/updateUser`, async (req, res) => {
    const id = req.body.id;
    await Users.findByIdAndUpdate(
      id,
      { $set: { active: true, updateAt: Date.now() } },
      { new: true },
      (err, docs) => {
        const smg = "No user found, please contact your administrator";
        if (err) return res.status(500).json({ smg, erreur: err });

        const message = `the user ${docs.id} has been successfully updated`;
        res.status(200).json({ message, userUpdate: docs });
        // res.sendFile(path.join(__dirname + "/validateMail.html"));
      }
    );
  });
};
