import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import BottomNavBar from "./BottomBar";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const moods = [
  { name: "happy", emoji: "😊", color: "bg-yellow-100 text-yellow-600" },
  { name: "sad", emoji: "😢", color: "bg-blue-100 text-blue-600" },
  { name: "angry", emoji: "😡", color: "bg-red-100 text-red-600" },
  { name: "stressed", emoji: "😖", color: "bg-purple-100 text-purple-600" },
  { name: "excited", emoji: "🤩", color: "bg-orange-100 text-orange-600" },
  { name: "calm", emoji: "😌", color: "bg-green-100 text-green-600" },
];

const MoodLogCard = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodText, setMoodText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [moodLogs, setMoodLogs] = useState([]);

  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    setMoodLogs(savedLogs);
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodText("");
    setResponseMessage("");
  };

  const handleSubmit = async () => {
    if (!selectedMood) return alert("Please select a mood!");

    setLoading(true);
    setResponseMessage("");

    try {
      const prompt = `User is feeling "${selectedMood}". They said: "${moodText}". Give a short uplifting message in this JSON format:
      {
        "userMood": "${selectedMood}",
        "positive message": "Your uplifting message here"
      }`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );

      const match = response.data.candidates[0]?.content?.parts[0]?.text.match(/\{[^}]*\}/);
      if (match) {
        const parsedData = JSON.parse(match[0]);
        const newMoodEntry = {
          date: new Date().toLocaleString(),
          mood: parsedData["userMood"],
          text: moodText,
          message: parsedData["positive message"],
        };

        const updatedLogs = [newMoodEntry, ...moodLogs];
        setMoodLogs(updatedLogs);
        localStorage.setItem("moodLogs", JSON.stringify(updatedLogs));
        localStorage.setItem("lastMoodLogDate", new Date().toISOString().split("T")[0]);

        setResponseMessage(parsedData["positive message"]);
      } else {
        setResponseMessage("Couldn't fetch response, try again!");
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      setResponseMessage("Error fetching message, try again.");
    }


    setLoading(false);
  };

  const clearLogs = () => {
    localStorage.removeItem("moodLogs");
    setMoodLogs([]);
  };

  return (
    <div className="max-w-lg mx-auto m-6 bg-white rounded-lg p-6 text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">How are you feeling today?</h2>

      {/* Mood Selection */}
      <div className="flex justify-center gap-4 flex-wrap mb-4">
        {moods.map(({ name, emoji, color }) => (
          <motion.button
            key={name}
            className={`relative p-3 text-2xl rounded-full border transition-all duration-300 ${
              selectedMood === name ? "border-green-500 scale-110 shadow-md" : "border-gray-300 hover:scale-110"
            }`}
            onClick={() => handleMoodSelect(name)}
            whileHover={{ scale: 1.15 }}
          >
            {emoji}
            {/* Tooltip on Hover */}
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Optional Text Input */}
      {selectedMood && (
        <textarea
          className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-green-300"
          rows="3"
          placeholder="Tell us more about how you're feeling..."
          value={moodText}
          onChange={(e) => setMoodText(e.target.value)}
        />
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {/* Response Message */}
      {responseMessage && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 p-3 rounded-md">
          {responseMessage}
        </div>
      )}

      {/* Mood Log History */}
      {moodLogs.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Mood Logs</h3>
          <ul className="mt-3 space-y-3">
            {moodLogs.map((log, index) => (
              <li key={index} className="bg-gray-100 p-3 rounded-md text-left">
                <p className="text-gray-700 font-medium">
                  <span className="capitalize">{log.mood}</span> - {log.date}
                </p>
                {log.text && <p className="text-gray-600">"{log.text}"</p>}
                <p className="text-green-700 text-sm">{log.message}</p>
              </li>
            ))}
          </ul>

          {/* Clear Logs Button */}
          <button
            onClick={clearLogs}
            className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
          >
            Clear Logs
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodLogCard;
