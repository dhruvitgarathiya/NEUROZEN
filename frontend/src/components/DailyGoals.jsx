import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DailyGoals = ({ userProfile }) => {
  const [dailyGoals, setDailyGoals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [goalsGenerated, setGoalsGenerated] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const checkLocalStorage = () => {
    const savedGoals = localStorage.getItem("dailyGoals");
    const savedDate = localStorage.getItem("goalsDate");

    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format

    if (savedGoals && savedDate === today) {
      setDailyGoals(JSON.parse(savedGoals));
      setGoalsGenerated(true);
    }
  };

  const fetchDailyGoals = async () => {
    if (!userProfile) {
      alert("User profile data is missing!");
      return;
    }

    setLoading(true);

    const today = new Date().toISOString().split("T")[0]; // Get YYYY-MM-DD format

    const prompt = `
      Generate **daily health goals & suggestions** for a user with these details:
        - Age: ${userProfile.age}
        - Gender: ${userProfile.gender}
        - Height: ${userProfile.height} cm
        - Weight: ${userProfile.weight} kg
        - Activity Level: ${userProfile.activityLevel[0]}
        - Health Goals: ${userProfile.healthGoals}
        - Diet Preference: ${userProfile.dietPreference}
        - User is from ${userProfile.city}, ${userProfile.state}, ${userProfile.country}

      Return the response strictly in **JSON format** with the following structure (make sure strings are not too big):
      {
        "Nutrition": [
          "String of suggestion 1",
          "String of suggestion 2"
        ],
        "PhysicalActivity": [
          "String of suggestion 1",
          "String of suggestion 2"
        ],
        "Other": [
          "String of suggestion 1",
          "String of suggestion 2"
        ],
        "ExampleDay": [
          "String of example meal 1",
          "String of example meal 2"
        ]
      }
    `;

    try {
      const { data } = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ parts: [{ text: prompt }] }] }
      );

      const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!aiResponse) {
        setDailyGoals("No response received. Please try again.");
        return;
      }

      try {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const formattedData = JSON.parse(jsonMatch[0]);
          setDailyGoals(formattedData);
          setGoalsGenerated(true);

          // Save to localStorage
          localStorage.setItem("dailyGoals", JSON.stringify(formattedData));
          localStorage.setItem("goalsDate", today);
        } else {
          console.error("No valid JSON found in response.");
        }
      } catch (error) {
        console.error("Error parsing AI response:", error);
      }
    } catch (error) {
      console.error("Error fetching daily goals:", error);
      setDailyGoals("Failed to generate daily goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 m-6 w-full max-w-lg border border-green-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
        Your Personalized Daily Health Guide
      </h2>

      {!goalsGenerated && (
        <motion.button
          onClick={fetchDailyGoals}
          className="w-full px-5 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition-all"
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Get Daily Goals"}
        </motion.button>
      )}

      {goalsGenerated && dailyGoals && typeof dailyGoals === "object" && (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >

          {Object.entries(dailyGoals).map(([title, content], index) => (
            <div
              key={index}
              className="mb-4 bg-green-100 rounded-lg shadow-md border border-green-300"
            >
              <motion.button
                className="w-full flex justify-between items-center px-4 py-3 bg-green-500 text-white font-medium rounded-t-lg hover:bg-green-600 transition-all"
                onClick={() =>
                  setOpenSection(openSection === index ? null : index)
                }
                whileTap={{ scale: 0.97 }}
              >
                {title}
                <span className="text-xl">
                  {openSection === index ? "▲" : "▼"}
                </span>
              </motion.button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openSection === index ? "auto" : 0,
                  opacity: openSection === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <ul className="mt-2 p-4 bg-green-50 border-t border-green-300 rounded-b-lg">
                  {content.map((item, i) => (
                    <motion.li
                      key={i}
                      className="text-green-800 mb-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      ✅ {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyGoals;
