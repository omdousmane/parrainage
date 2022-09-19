const { Users } = require("../../db/mongoose");
require("dotenv").config();
const path = require("path");

const api = process.env.API_URL;

module.exports = (app) => {
  app.get(`${api}/validateMail`, async (req, res) => {
    const token = req.params.token;
    const validateAt = new Date();
    await Users.findOne({ token: token })
      .then((userByToken) => {
        Users.findByIdAndUpdate(
          userByToken.id,
          { $set: { active: true } },
          { new: true },
          (err, docs) => {
            const smg =
              "Token invalide veillez constacter votre administrateur";
            if (err) return res.status(500).json({ smg, erreur: err });

            // Calculation of the validation time
            var diffTemps = validateAt.getTime() - docs.createdAt.getTime();
            var diffJours = diffTemps / (1000 * 3600 * 24);
            const daysValidated = Math.round(diffJours);
            if (daysValidated > 30) {
              return Users.findOneAndDelete({ _id: userByToken.id })
                .then((userDeleted) => {
                  if (userDeleted.length === 0) {
                    const message =
                      "The requested user does not exist. Please try again in a few moments";
                    return res.status(404).json({ message, data: error });
                  }
                  const message = `The token is no longer valid click here to signe http://${req.headers.host}${api}/creatUser  `;
                  res.status(200).json({ message, days: daysValidated });
                })
                .catch((err) => {
                  const message = `No user found`;
                  res.status(500).json({ message, deletedUser: err });
                });
            }

            const message = `Felicitation votre compte a été validé avec succès 👨‍🦰🙌 Vous pouvrez rejoins la communauté Hetic sur le discord et communiquer avec ton parrain https://discord.gg/23UYA86A" Le liens discord`;
            res.status(200).json({ message, userUpdate: daysValidated });
            // res.sendFile(path.join(__dirname + "/validateMail.html"));
          }
        );
      })
      .catch((err) => {
        const message =
          "Token inexistant veillez constacter votre administrateur";
        res.status(500).json({ message, erreur: err });
      });
  });
};
