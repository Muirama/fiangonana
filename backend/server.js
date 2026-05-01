const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/database");
require("./models/index");

const personneRoutes = require("./routes/personne.routes");
const apvRoutes     = require("./routes/apv.routes");
const familleRoutes = require("./routes/famille.routes");
const mariageRoutes  = require("./routes/mariage.routes");

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ["https://ekarsoavy.netlify.app"]
    : "*",
}));
app.use(express.json());

app.use("/api/personnes", personneRoutes);
app.use("/api/apvs", apvRoutes);
app.use("/api/familles", familleRoutes);
app.use("/api/mariages", mariageRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de données synchronisée");
    app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
  })
  .catch((err) => console.error("Erreur DB:", err));
