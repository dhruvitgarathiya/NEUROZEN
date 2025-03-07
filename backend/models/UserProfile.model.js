const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  age: Number,
  gender: { type: String, enum: ["male", "female", "non-binary", "prefer not to say"] },
  height: Number,
  weight: Number,
  activityLevel: {
    type: [String],
    enum: ["Low", "Moderate", "High"], // Only these values allowed
    required: true,
  },  
  healthGoals: {
    type: [String],
    enum: ["Weight Loss", "Muscle Gain", "Mental Health", "General Fitness"], // Allowed values
    required: true,
  },
  dietPreference: { type: [String], enum: ["vegetarian", "vegan", "non vegetarian"] },  
  state : { type: String, required: true },
  city : { type: String, required: true },
  country : { type: String, required: true },
  
}, { timestamps: true });

module.exports = mongoose.model("UserProfile", UserProfileSchema);