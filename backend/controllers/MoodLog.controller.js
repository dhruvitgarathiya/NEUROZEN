const MoodLog = require("../models/MoodLog.model");

exports.createMoodLog = async (req, res) => {
  try {
    const moodLog = new MoodLog(req.body);
    await moodLog.save();
    res.status(201).json(moodLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMoodLog = async (req, res) => {
  try {
    const moodLog = await MoodLog.findById(req.params.id);
    if (!moodLog) {
      return res.status(404).json({ error: "MoodLog not found" });
    }
    res.status(200).json(moodLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMoodLog = async (req, res) => {
  try {
    const moodLog = await MoodLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!moodLog) {
      return res.status(404).json({ error: "MoodLog not found" });
    }
    res.status(200).json(moodLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMoodLog = async (req, res) => {
  try {
    const moodLog = await MoodLog.findByIdAndDelete(req.params.id);
    if (!moodLog) {
      return res.status(404).json({ error: "MoodLog not found" });
    }
    res.status(200).json({ message: "MoodLog deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};