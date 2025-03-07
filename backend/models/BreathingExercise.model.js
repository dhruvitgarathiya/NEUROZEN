const mongoose = require("mongoose");

const BreathingExerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },  // Name of the exercise
    description: { type: String, required: true },  // Short explanation
    duration: { type: Number, required: true },  // In minutes
    steps: [{ type: String, required: true }],  // Step-by-step guide
    videoUrl: { type: String },  
    recommendedFor: [{ 
      type: String, 
      enum: ["happy", "sad", "angry", "stressed", "excited", "calm", "neutral"]
    }], 
  }, { timestamps: true });
  
  module.exports = mongoose.model("BreathingExercise", BreathingExerciseSchema);
  