const {Famille} = require('../models/famille.model');

exports.getAllFamilles = async (req, res) => {
  try {
    const familles = await Famille.findAll();
    res.status(200).json(familles);
  } catch (error) {
    console.error("Error fetching familles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  getAllFamilles,
};