const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Apv = sequelize.define("Apv", {
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  nom: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Apv;
