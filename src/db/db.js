require("dotenv/config");
const mongoose = require("mongoose");
let url = "";
const dbName = process.env.DATABASE_NAME;

if (process.env.NODE_ENV === "production") {
  url = process.env.PRODUCTION_CONNECTION_STRING;
} else {
  url = process.env.DEVELOPPEMENT_CONNECTION_STRING;
}

mongoose
  .connect(`${url + "/" + dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    journal: true,
  })
  .then(() => {
    console.log(`La connection à la base de donnée reusie...`);
  })
  .catch((error) => {
    console.log("echec de la connection à la base de donnée" + error);
  });
