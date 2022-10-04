require("dotenv/config");
const mongoose = require("mongoose");
const dbName = process.env.DATABASE_NAME;

if (process.env.NODE_ENV === "development") {
  let url = process.env.DEVELOPPEMENT_CONNECTION_STRING;
  mongoose
    .connect(process.env.MONGODB_URI || `${url + "/" + dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      journal: true,
    })
    .then(() => {
      console.log(`La connexion à la base de données reussie...`);
    })
    .catch((error) => {
      console.log("echec de la connexion à la base de données" + error);
    });
} else {
  let url = process.env.PRODUCTION_CONNECTION_STRING;
  mongoose
    .connect(process.env.MONGODB_URI || `${url + "/" + dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      journal: true,
    })
    .then(() => {
      console.log(`La connexion à la base de données reussie... ${url}`);
    })
    .catch((error) => {
      console.log("echec de la connexion à la base de données" + error);
    });
}
