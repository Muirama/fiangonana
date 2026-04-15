const express = require("express");
const router = express.Router();
const {
  getAllFamilles,
  getFamilleById,
  createFamille,
  updateFamille,
  deleteFamille,
} = require("../controllers/famille.controller");

router.get("/", getAllFamilles);
router.get("/:id", getFamilleById);
router.post("/", createFamille);
router.put("/:id", updateFamille);
router.delete("/:id", deleteFamille);

module.exports = router;
