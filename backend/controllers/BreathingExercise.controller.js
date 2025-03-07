const BreathingExercise = require("../models/BreathingExercise.model");

exports.createBreathingExercise = async (req, res) => {
  try {
    const breathingExercise = new BreathingExercise(req.body);
    await breathingExercise.save();
    res.status(201).json(breathingExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBreathingExercise = async (req, res) => {
  try {
    const breathingExercise = await BreathingExercise.findById(req.params.id);
    if (!breathingExercise) {
      return res.status(404).json({ error: "BreathingExercise not found" });
    }
    res.status(200).json(breathingExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBreathingExercise = async (req, res) => {
  try {
    const breathingExercise = await BreathingExercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!breathingExercise) {
      return res.status(404).json({ error: "BreathingExercise not found" });
    }
    res.status(200).json(breathingExercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBreathingExercise = async (req, res) => {
  try {
    const breathingExercise = await BreathingExercise.findByIdAndDelete(req.params.id);
    if (!breathingExercise) {
      return res.status(404).json({ error: "BreathingExercise not found" });
    }
    res.status(200).json({ message: "BreathingExercise deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};