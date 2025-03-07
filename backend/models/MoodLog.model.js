const mongoose = require("mongoose");

const MoodLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },  
    moodCategory: { 
      type: String, 
      enum: ["happy", "sad", "angry", "stressed", "excited", "calm"], 
      required: true 
    }, 
    moodText: { type: String },
    positiveMessage: { type: String },
  }, { timestamps: true });
  
  module.exports = mongoose.model("MoodLog", MoodLogSchema);
  