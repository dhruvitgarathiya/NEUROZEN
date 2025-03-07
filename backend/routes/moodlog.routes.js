const express = require("express");
const router = express.Router();
const MoodLogController = require("../controllers/MoodLog.controller");
const secureRoute=require('../middleware/secureRoute')

router.post("/",secureRoute, MoodLogController.createMoodLog);
router.get("/:id",secureRoute, MoodLogController.getMoodLog);
router.put("/:id",secureRoute, MoodLogController.updateMoodLog);
router.delete("/:id",secureRoute, MoodLogController.deleteMoodLog);

module.exports = router;