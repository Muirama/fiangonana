const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Personne = sequelize.define("Personne", {
  nom: { type: DataTypes.STRING, allowNull: false },
  date_naissance: { type: DataTypes.DATEONLY },
  sexe: { type: DataTypes.ENUM("M", "F") },
  type: { type: DataTypes.ENUM("pere", "mere", "enfant", "autre") },
  contact: { type: DataTypes.STRING },
  profession: { type: DataTypes.STRING },
  role_eglise: { type: DataTypes.STRING },
  groupe_eglise: { type: DataTypes.STRING },
  bapteme: { type: DataTypes.BOOLEAN, defaultValue: false },
  communion: { type: DataTypes.BOOLEAN, defaultValue: false },
  confirmation: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = Personne;
