const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Mariage = sequelize.define("Mariage", {
  date_fiancailles: { type: DataTypes.DATEONLY },
  lieu_fiancailles: { type: DataTypes.STRING },
  date_mariage: { type: DataTypes.DATEONLY },
  lieu_mariage: { type: DataTypes.STRING },
});

module.exports = Mariage;
