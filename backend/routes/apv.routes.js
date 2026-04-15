const express = require("express");
const router = express.Router();
const {
  getAllApvs,
  createApv,
  updateApv,
  deleteApv,
} = require("../controllers/apv.controller");

router.get("/", getAllApvs);
router.post("/", createApv);
router.put("/:id", updateApv);
router.delete("/:id", deleteApv);

module.exports = router;
