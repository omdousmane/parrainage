require("dotenv/config");
const mongoose = require("mongoose");

const url = process.env.DEVELOPPEMENT_CONNECTION_STRING;
const dbName = process.env.DATABASE_NAME;

mongoose
  .connect(`${url + "/" + dbName}`, { useNewUrlParser: true })
  .then(() => {
    console.log("La connection à la base de donnée reusie...");
  })
  .catch((error) => {
    console.log("echec de la connection à la base de donnée" + error);
  });
