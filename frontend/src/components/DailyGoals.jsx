import React, { use, useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

const DailyGoals = ({ userProfile }) => {
  const [dailyGoals, setDailyGoals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [goalsGenerated, setGoalsGenerated] = useState(false);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

  useEffect(() => {
    console.log("goals: ", dailyGoals);
    }, [dailyGoals]);

    const fetchDailyGoals = async () => {
        if (!userProfile) {
          alert("User profile data is missing!");
          return;
        }
      
        setLoading(true);
        const prompt = `
          Generate **daily health goals & suggestions** for a user with these details:
                - Age: ${userProfile.age}
                - Gender: ${userProfile.gender}
                - Height: ${userProfile.height} cm
                - Weight: ${userProfile.weight} kg
                - Activity Level: ${userProfile.activityLevel}
                - Health Goals: ${userProfile.healthGoals}
                - Diet Preference: ${userProfile.dietPreference}
                - Medical Conditions: ${userProfile.medicalConditions.join(", ") || "None"}
                - Medications: ${userProfile.medications.join(", ") || "None"}

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
          //console.log("key: ", API_KEY);
          const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] }
          );

          console.log("data: ", data);
      
          const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

            console.log("aiResponse: ", aiResponse);
          if (!aiResponse) {
            setDailyGoals("No response received. Please try again.");
            return;
          }
          try {
            // Extract JSON using regex (handles extra text before/after JSON)
            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              const formattedData = JSON.parse(jsonMatch[0]);
              console.log("Formatted JSON:", formattedData);
              setDailyGoals(formattedData);
              setGoalsGenerated(true);
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
      

       const parseGeminiResponse = (response) => {
        const sections = {};
        const regex = /🔹\s*\*\*(.*?)\*\*\s*:\s*([\s\S]*?)(?=\n🔹|$)/g;
      
        let match;
        while ((match = regex.exec(response)) !== null) {
          const title = match[1].trim();
          const content = match[2]
            .split("\n")
            .map((line) => line.replace(/^\*\s*🔹\s*/, "").trim())
            .filter((line) => line.length > 0);
          sections[title] = content;
        }
      
        return sections;
      };

//   return (
//     <div className="p-5 border rounded-lg shadow-md bg-white max-w-lg mx-auto">
//       <h2 className="text-xl font-bold mb-3">Your Personalized Daily Goals</h2>

//       <button
//         onClick={fetchDailyGoals}
//         className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
//         disabled={loading}
//       >
//         {loading ? "Generating..." : "Get Daily Goals"}
//       </button>

//       {dailyGoals && typeof dailyGoals === "object" && (
//         <div className="max-w-2xl mx-auto p-4">
//           <h1 className="text-2xl font-bold mb-4 text-center">
//             Daily Health Guide
//           </h1>
//           {Object.entries(dailyGoals).map(([title, content], index) => (
//             <div key={index} className="mb-4">
//               <button
//                 className="w-full text-left px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg"
//                 onClick={() => setOpenSection(openSection === index ? null : index)}
//               >
//                 {title}
//               </button>
//               {openSection === index && (
//                 <ul className="mt-2 p-4 border border-gray-200 bg-gray-100 rounded-lg">
//                   {content.map((item, i) => (
//                     <li key={i} className="text-gray-700 mb-1">- {item}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

// 

return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 m-6 w-full max-w-lg border border-green-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          Your Personalized Daily Goals
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
            <h3 className="text-xl font-semibold text-green-800 text-center mb-4">
              Daily Health Guide
            </h3>

            {Object.entries(dailyGoals).map(([title, content], index) => (
              <div key={index} className="mb-4 bg-green-100 rounded-lg shadow-md border border-green-300">
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
    // </div>
  );
};

export default DailyGoals;

