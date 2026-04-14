const express = require("express");
const router = express.Router();
const {
  createPersonne,
  getAllPersonnes,
  getPersonneById,
  updatePersonne,
  deletePersonne,
} = require("../controllers/personne.controller");

router.get("/", getAllPersonnes);
router.get("/:id", getPersonneById);
router.post("/", createPersonne);
router.put("/:id", updatePersonne);
router.delete("/:id", deletePersonne);

module.exports = router;
