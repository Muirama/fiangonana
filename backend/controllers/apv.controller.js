const { Apv } = require("../models");

const getAllApvs = async (req, res) => {
  try {
    const apvs = await Apv.findAll({ order: [["code", "ASC"]] });
    res.status(200).json(apvs);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const createApv = async (req, res) => {
  try {
    const { code, nom } = req.body;
    if (!code || !nom)
      return res.status(400).json({ error: "code et nom sont requis" });
    const apv = await Apv.create({ code, nom });
    res.status(201).json(apv);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError")
      return res.status(400).json({ error: "Ce code APV existe déjà" });
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updateApv = async (req, res) => {
  try {
    const apv = await Apv.findByPk(req.params.id);
    if (!apv) return res.status(404).json({ error: "APV non trouvé" });
    await apv.update(req.body);
    res.status(200).json(apv);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deleteApv = async (req, res) => {
  try {
    const apv = await Apv.findByPk(req.params.id);
    if (!apv) return res.status(404).json({ error: "APV non trouvé" });
    await apv.destroy();
    res.status(200).json({ message: "APV supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { getAllApvs, createApv, updateApv, deleteApv };
