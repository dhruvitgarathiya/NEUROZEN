import React, { useState } from "react";
import { motion } from "framer-motion";
import { Loader, Send } from "lucide-react"; // Import icons
import axios from "axios";

const CBTJournaling = () => {
  const [thought, setThought] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const formatResponse = (response) => {
    return response
      .replace(/\n\s*\n/g, "\n\n") // Remove excessive empty lines
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove markdown bold (**text**)
      .replace(/\*(.*?)\*/g, "$1") // Remove markdown italics (*text*)
      .replace(/(?:-|•)\s+/g, "✅ ") // Convert bullet points to checkmarks
      .replace(/💡/g, "🔹") // Replace 💡 with 🔹 for variety
      .replace(/🌱/g, "🌿") // Replace 🌱 with 🌿 to add warmth
      .trim(); // Remove extra spaces
  };

  const handleSubmit = async () => {
    if (!thought.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const geminiAPIKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!geminiAPIKey) throw new Error("Missing API Key!");

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiAPIKey}`;

      const prompt = `You are a compassionate CBT-based journaling assistant.
The user has shared their thoughts and feelings:

"${thought}"

💡 **Your task:**  
- **Acknowledge their feelings** in a warm and empathetic way.  
- **Gently challenge unhelpful thinking patterns** without using clinical terms like "cognitive distortions."  
- **Offer a simple, practical reframe** to help them see things in a more balanced way.  
- **Provide a small, actionable step** they can take to feel better.  
- **Keep it brief, friendly, and conversational**—like a caring friend giving thoughtful advice.  
- **Use light emojis** (but not excessively) to make it feel more human and reassuring.
- make sure to reply in user's language  

🎯 **Tone:**  
- Warm, supportive, and encouraging.  
- Conversational and non-judgmental.

**Now, generate a response in this style based on the user’s journal entry. make sure its readable and concise shorter**`;

      const requestBody = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      const { data } = await axios.post(geminiEndpoint, requestBody);

      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help, but I couldn't generate a response. Try again.";
      setResponse(formatResponse(aiResponse));

    } catch (err) {
      setError("Oops! Something went wrong. Try again later.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          What's on your mind? 🌿
        </h2>

        {/* Text Input */}
        <textarea
          value={thought}
          onChange={(e) => setThought(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-32 p-3 border border-green-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 mt-4 bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition hover:bg-green-700 disabled:bg-gray-400"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Loader className="animate-spin" /> : <Send />}
          {loading ? "Thinking..." : "Get Insight"}
        </motion.button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        {/* AI Response */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-4 bg-green-100 border-l-4 border-green-500 rounded-md shadow-sm"
          >
            <h3>Here's something to consider:</h3>
          {/* ✅ Format response safely instead of using dangerouslySetInnerHTML */}
          {response.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <p className="more-info">
            Want to dive deeper? <a href="/cbt-explained">Learn more about CBT →</a>
          </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CBTJournaling;
