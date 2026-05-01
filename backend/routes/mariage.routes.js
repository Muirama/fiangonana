const express = require("express");
const router = express.Router();
const {
  getAllMariages,
  getMariageByFamille,
  createOrUpdateMariage,
  deleteMariage,
} = require("../controllers/mariage.controller");

router.get("/", getAllMariages);
router.get("/famille/:familleId", getMariageByFamille);
router.post("/", createOrUpdateMariage);
router.delete("/:id", deleteMariage);

module.exports = router;
