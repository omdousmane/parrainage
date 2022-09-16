const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

// Création du port
const PORT = process.env.PORT || 7000;

// gestion des variables d'environement
require("dotenv/config");

// gestion des headers avec cors
app.use(cors());
app.options("*", cors());

// Déclaration des middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());

const api = process.env.API_URL;

// Création des midleware(pour que le backend est la possiblité de comprendre les données json)
app.use(bodyParser.json()).use(morgan("tiny"));

// connection a la de donnée mongodb
require("./src/db/db");

// les routes*
//
/********************
 * Users
 ********************/
require("./src/routes/users/createUser")(app);
require("./src/routes/users/readAllUsers")(app);

// listen on port 5000
app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
