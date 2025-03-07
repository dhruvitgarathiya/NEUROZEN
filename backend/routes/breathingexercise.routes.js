const express = require("express");
const router = express.Router();
const BreathingExerciseController = require("../controllers/BreathingExercise.controller");
const secureRoute=require('../middleware/secureRoute');

router.post("/",secureRoute, BreathingExerciseController.createBreathingExercise);
router.get("/:id",secureRoute, BreathingExerciseController.getBreathingExercise);
router.put("/:id",secureRoute, BreathingExerciseController.updateBreathingExercise);
router.delete("/:id",secureRoute, BreathingExerciseController.deleteBreathingExercise);

module.exports = router;