const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/index");

const personneRoutes = require("./routes/personne.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/personnes", personneRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })//alter: true pour ne pas raser les données existantes
  .then(() => {
    console.log("Base de données synchronisée");
    app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
  })
  .catch((err) => console.error("Erreur DB:", err));
