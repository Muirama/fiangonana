const { Personne } = require("../models");

const createPersonne = async (req, res) => {
  try {
    const {
      nom,
      prenom,
      date_naissance,
      sexe,
      type,
      contact,
      profession,
      role_eglise,
      groupe_eglise,
      bapteme,
      communion,
      confirmation,
      famille_id,
    } = req.body;

    // Seuls les champs vraiment obligatoires
    if (!nom || !sexe || !type || !contact) {
      return res
        .status(400)
        .json({ error: "nom, sexe, type et contact sont requis" });
    }

    const newPersonne = await Personne.create({
      nom,
      prenom,
      date_naissance,
      sexe,
      type,
      contact,
      profession,
      role_eglise,
      groupe_eglise,
      bapteme: bapteme ?? false,
      communion: communion ?? false,
      confirmation: confirmation ?? false,
      famille_id,
    });

    res.status(201).json(newPersonne);
  } catch (error) {
    console.error("Erreur création personne:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getAllPersonnes = async (req, res) => {
  try {
    const personnes = await Personne.findAll({
      order: [["nom", "ASC"]],
    });
    res.status(200).json(personnes);
  } catch (error) {
    console.error("Erreur récupération personnes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getPersonneById = async (req, res) => {
  try {
    const personne = await Personne.findByPk(req.params.id);
    if (!personne)
      return res.status(404).json({ error: "Personne non trouvée" });
    res.status(200).json(personne);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const updatePersonne = async (req, res) => {
  try {
    const personne = await Personne.findByPk(req.params.id);
    if (!personne)
      return res.status(404).json({ error: "Personne non trouvée" });
    await personne.update(req.body);
    res.status(200).json(personne);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deletePersonne = async (req, res) => {
  try {
    const personne = await Personne.findByPk(req.params.id);
    if (!personne)
      return res.status(404).json({ error: "Personne non trouvée" });
    await personne.destroy();
    res.status(200).json({ message: "Personne supprimée" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  createPersonne,
  getAllPersonnes,
  getPersonneById,
  updatePersonne,
  deletePersonne,
};
