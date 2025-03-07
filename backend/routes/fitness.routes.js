const express = require("express");
const router = express.Router();
const { getFitnessData } = require("../controllers/fitness.controller");

router.post("/fetch-data", getFitnessData);

module.exports = router;