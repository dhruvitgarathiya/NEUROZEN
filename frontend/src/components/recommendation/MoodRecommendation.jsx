import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FaHeadphones, FaLeaf, FaPen, FaSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Your Gemini API Key (Replace with your actual key)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Hardcoded recommendation if no mood is logged
const defaultRecommendation = {
  message: "Start by logging your mood! Tracking your emotions helps you understand yourself better.",
  actionText: "Log Your Mood",
  type: "log your mood",
};

const MoodRecommendation = ({ mood }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to parse the AI response into JSON safely
  const parseJsonString = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return null;
    }
  };

  // Select an icon based on the recommendation type
  const getIcon = (type) => {
    switch (type) {
      case "music":
        return <FaHeadphones className="mr-2" />;
      case "breathing-exercise":
        return <FaLeaf className="mr-2" />;
      case "CBT thoughts journalling":
        return <FaPen className="mr-2" />;
      case "log your mood":
      default:
        return <FaSmile className="mr-2" />;
    }
  };

  // Define the navigation paths based on the type
  const getPath = (type) => {
    switch (type) {
      case "music":
        return "/moodmusic";
      case "breathing-exercise":
        return "/breathing";
      case "CBT thoughts journalling":
        return "/CBT";
      case "log your mood":
      default:
        return "/moodlog";
    }
  };

  useEffect(() => {
    if (!mood) {
      // If no mood is logged, set the default recommendation
      setRecommendation(defaultRecommendation);
      setLoading(false);
      return;
    }

    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const prompt = `
  The user has logged their mood as "${mood}". 
  Based on this, suggest an activity that is most suitable to their current emotional state to improve their well-being.

  Ensure variety in responses—recommend music, breathing exercises, CBT thought journaling, or logging mood appropriately. 
  Do NOT suggest the same type repeatedly. 

  Follow these guidelines:
  - If the user is happy, suggest music or CBT journaling to reflect on their positivity.
  - If the user is stressed, anxious, or overwhelmed, recommend breathing exercises or music.
  - If the user is feeling low, recommend journaling or music to uplift their spirits.

  Respond strictly in the following JSON format:

  {
    "message": "A short motivating message relevant to the mood",
    "actionText": "Text for the call-to-action button",
    "type": "music | breathing-exercise | CBT thoughts journalling"
  }
`;


        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            contents: [{ parts: [{ text: prompt }] }],
          }
        );

        const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text.match(/\{[^}]*\}/);
        const parsedData = parseJsonString(textResponse);

        if (parsedData) {
          setRecommendation(parsedData);
        } else {
          setRecommendation({
            message: "Couldn't generate a recommendation. Try again later!",
            actionText: "Retry",
            type: "log your mood",
          });
        }
      } catch (error) {
        console.error("Error fetching recommendation:", error);
        setRecommendation({
          message: "Oops! Something went wrong. Try again later!",
          actionText: "Retry",
          type: "log your mood",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [mood]);

  return (
    <div className="p-6 m-6 bg-white rounded-lg shadow-md min-w-[200px] min-h-[100px] text-center max-w-md mx-auto">
      {loading ? (
        <>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <Loader2 className="animate-spin text-green-500 w-10 h-10" />
        </motion.div>
          <p className="text-gray-600 text-sm">Fetching something special for you...</p>
        </>
      ) : (
        recommendation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-semibold text-gray-800">{recommendation.message}</p>
            <button
              onClick={() => navigate(getPath(recommendation.type))}
              className="mt-4 inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-600 transition-all"
            >
              {getIcon(recommendation.type)} {recommendation.actionText}
            </button>
          </motion.div>
        )
      )}
    </div>
  );
};

export default MoodRecommendation;
