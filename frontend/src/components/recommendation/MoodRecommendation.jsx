import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { FaHeadphones, FaLeaf, FaPen, FaSmile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Import images (if using local assets)
// import musicImage from "/assets/music.jpg";
// import breathingImage from "/assets/breathing.jpg";
// import journalingImage from "/assets/journaling.jpg";
// import moodLogImage from "/assets/moodlog.jpg";

// Your Gemini API Key (Replace with your actual key)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Hardcoded recommendation if no mood is logged
const defaultRecommendation = {
  message: "Start by logging your mood! Tracking your emotions helps you understand yourself better.",
  actionText: "Log Your Mood",
  type: "log your mood",
};

// Function to get images based on recommendation type
const getImage = (type) => {
  switch (type) {
    case "music":
      return "https://img.freepik.com/premium-photo/young-beautiful-happy-resting-woman-headphones-listening-relaxing-music-couch-home-aft_629685-135529.jpg"; 
    case "breathing-exercise":
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5uBVAw00ta1fUp5w1w8aDAeyv8aQK6XS9A&s";
    case "CBT thoughts journalling":
      return "https://www.drquintal.com/wp-content/uploads/Positive-Thoughts-Shift-1920x960.jpg";
    case "log your mood":
    default:
      return "https://cdn.firstcry.com/education/2022/08/10152542/all-about-children-and-emotions.jpg";
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

const MoodRecommendation = ({ mood }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mood) {
      setRecommendation(defaultRecommendation);
      setLoading(false);
      return;
    }

    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const prompt = `The user has logged their mood as "${mood}". Suggest a relevant activity: music, breathing-exercise, or CBT journaling. Ex. for stressed mood recommendation can be music breathing exercise or CBT show different everytime Format response in JSON:
        {
          "message": "A short motivating message relevant to the mood",
          "actionText": "Text for the button",
          "type": "music | breathing-exercise | CBT thoughts journalling"
        }`;

        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          { contents: [{ parts: [{ text: prompt }] }] }
        );

        const textResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text.match(/\{[^}]*\}/);
        const parsedData = textResponse ? JSON.parse(textResponse) : null;

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
    <div className="p-6 m-6 bg-white rounded-lg shadow-md min-w-[250px] min-h-[150px] text-center max-w-md mx-auto">
      {loading ? (
        <>
          {/* Rotating Loader Only */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <Loader2 className="text-green-500 w-10 h-10" />
          </motion.div>
          <p className="text-gray-600 text-sm">Fetching something special for you...</p>
        </>
      ) : (
        recommendation && (
          <motion.div
            key={recommendation.type}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center" // Add a wrapper to control layout
          >
            <img
              src={getImage(recommendation.type)}
              alt={recommendation.type}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
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
