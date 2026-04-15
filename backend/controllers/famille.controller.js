const { Famille, Apv, Personne } = require("../models");

const getAllFamilles = async (req, res) => {
  try {
    const familles = await Famille.findAll({
      include: [
        { model: Apv, attributes: ["id", "code", "nom"] },
        { model: Personne, attributes: ["id", "nom", "prenom", "type"] },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(familles);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getFamilleById = async (req, res) => {
  try {
    const famille = await Famille.findByPk(req.params.id, {
      include: [{ model: Apv }, { model: Personne }],
    });
    if (!famille) return res.status(404).json({ error: "Famille non trouvée" });
    res.status(200).json(famille);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const createFamille = async (req, res) => {
  try {
    const { adresse, quartier, apv_id } = req.body;
    if (!apv_id) return res.status(400).json({ error: "apv_id est requis" });

    // Récupère l'APV pour construire le numéro
    const apv = await Apv.findByPk(apv_id);
    if (!apv) return res.status(404).json({ error: "APV non trouvé" });

    // Crée d'abord sans numéro pour avoir l'id
    const famille = await Famille.create({ adresse, quartier, apv_id });

    // Génère le numéro : id + code APV, ex: "0012-APV03"
    const numero = `${String(famille.id).padStart(4, "0")}-${apv.code}`;
    await famille.update({ numero });

    res.status(201).json(famille);
  } catch (error) {
    console.error("Erreur création famille:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updateFamille = async (req, res) => {
  try {
    const famille = await Famille.findByPk(req.params.id);
    if (!famille) return res.status(404).json({ error: "Famille non trouvée" });

    // Si apv_id change, recalcule le numéro
    if (req.body.apv_id && req.body.apv_id !== famille.apv_id) {
      const apv = await Apv.findByPk(req.body.apv_id);
      if (!apv) return res.status(404).json({ error: "APV non trouvé" });
      req.body.numero = `${String(famille.id).padStart(4, "0")}-${apv.code}`;
    }

    await famille.update(req.body);
    res.status(200).json(famille);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deleteFamille = async (req, res) => {
  try {
    const famille = await Famille.findByPk(req.params.id);
    if (!famille) return res.status(404).json({ error: "Famille non trouvée" });
    await famille.destroy();
    res.status(200).json({ message: "Famille supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getAllFamilles,
  getFamilleById,
  createFamille,
  updateFamille,
  deleteFamille,
};
