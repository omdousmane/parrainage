const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

// Création du port
const PORT = process.env.PORT || 7000;

// gestion des variables d'environement
require("dotenv").config();

// Déclaration des middleware
app.use(morgan("tiny")).use(express.json()).use(cors());
app.options("*", cors());

// connection a la de donnée mongodb
require("./src/db/db");

// les routes*
/********************
 * Users
 ********************/
require("./src/routes/users/createUser")(app);
require("./src/routes/users/readAllUsers")(app);
require("./src/routes/users/deleteUser")(app);
require("./src/routes/mails/validateMail")(app);

// listen on port
app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
