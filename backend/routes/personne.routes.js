const express = require("express");
const router = express.Router();
const {
  createPersonne,
  getAllPersonnes,
  getPersonneById,
  updatePersonne,
  deletePersonne,
  assignerFamille
} = require("../controllers/personne.controller");

router.get("/", getAllPersonnes);
router.get("/:id", getPersonneById);
router.post("/", createPersonne);
router.put("/:id", updatePersonne);
router.delete("/:id", deletePersonne);
router.patch("/:id/famille", assignerFamille);

module.exports = router;
