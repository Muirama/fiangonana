const { Mariage, Famille, Personne } = require("../models");

const getAllMariages = async (req, res) => {
  try {
    const mariages = await Mariage.findAll({
      include: [
        {
          model: Famille,
          attributes: ["id", "numero", "quartier", "adresse"],
          include: [
            { model: Personne, attributes: ["id", "nom", "prenom", "type"] },
          ],
        },
      ],
      order: [["date_mariage", "DESC"]],
    });
    res.status(200).json(mariages);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const getMariageByFamille = async (req, res) => {
  try {
    const mariage = await Mariage.findOne({
      where: { famille_id: req.params.familleId },
      include: [{ model: Famille, include: [{ model: Personne }] }],
    });
    if (!mariage) return res.status(404).json({ error: "Mariage non trouvé" });
    res.status(200).json(mariage);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const createOrUpdateMariage = async (req, res) => {
  try {
    const {
      famille_id,
      date_fiancailles,
      lieu_fiancailles,
      date_mariage,
      lieu_mariage,
    } = req.body;
    if (!famille_id)
      return res.status(400).json({ error: "famille_id requis" });

    // Vérifie que la famille existe
    const famille = await Famille.findByPk(famille_id);
    if (!famille) return res.status(404).json({ error: "Famille non trouvée" });

    // Vérifie qu'il y a un père et une mère
    const membres = await Personne.findAll({ where: { famille_id } });
    const pere = membres.find((p) => p.type === "pere");
    const mere = membres.find((p) => p.type === "mere");
    if (!pere || !mere) {
      return res
        .status(400)
        .json({
          error:
            "La famille doit avoir un père et une mère pour enregistrer un mariage",
        });
    }

    // Crée ou met à jour (upsert)
    const [mariage, created] = await Mariage.findOrCreate({
      where: { famille_id },
      defaults: {
        date_fiancailles,
        lieu_fiancailles,
        date_mariage,
        lieu_mariage,
        famille_id,
      },
    });

    if (!created) {
      await mariage.update({
        date_fiancailles,
        lieu_fiancailles,
        date_mariage,
        lieu_mariage,
      });
    }

    res.status(created ? 201 : 200).json(mariage);
  } catch (error) {
    console.error("Erreur mariage:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const deleteMariage = async (req, res) => {
  try {
    const mariage = await Mariage.findByPk(req.params.id);
    if (!mariage) return res.status(404).json({ error: "Mariage non trouvé" });
    await mariage.destroy();
    res.status(200).json({ message: "Mariage supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  getAllMariages,
  getMariageByFamille,
  createOrUpdateMariage,
  deleteMariage,
};
