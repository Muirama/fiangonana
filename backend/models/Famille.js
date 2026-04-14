const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Famille = sequelize.define("Famille", {
  numero: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
  quartier: { type: DataTypes.STRING },
});

module.exports = Famille;
