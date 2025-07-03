// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="min-h-screen pt-18 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left bg-gradient-to-b from-green-300 to-green-500 text-white px-6 lg:px-20">
//       {/* Left Side: Text */}
//       <div className="flex-1 max-w-lg lg:pr-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="text-4xl sm:text-5xl font-bold leading-tight"
//         >
//           Find Your Inner Peace with{" "}
//           <span className="text-green-900">NEUROZEN</span>
//         </motion.h1>
//         <p className="text-lg sm:text-xl mt-3">
//           A personalized mental wellness platform designed just for you.
//         </p>
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           className="mt-6 px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:bg-green-200 transition"
//           onClick={() => navigate("/home")}
//         >
//           Get Started
//         </motion.button>
//       </div>

//       {/* Right Side: Larger Image */}
//       <motion.div
//         initial={{ opacity: 0, x: 50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1.2 }}
//         className="flex-1 flex justify-center lg:justify-end p-2 mt-8 lg:mt-0"
//       >
//         <img
//           src="https://allinforhealth.info/wp-content/uploads/2018/05/mental-health-illustration_634548677.jpg"
//           alt="Mindfulness Illustration"
//           className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-xl shadow-lg"
//         />
//       </motion.div>
//     </section>
//   );
// };

// export default HeroSection;

import React from "react";
import { motion } from "framer-motion";
import "./hero.css"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-white to-[#e4ecf2] pt-12 pb-10 overflow-hidden">
      {/* Hero Text */}
      <div className="text-center px-4 mt-10 hero-text">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
          NEUROZEN – Your Personal <br /> Health & Wellness Companion
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-600 hidden md:block">
          A platform for your physical and mental well-being. Personalized recommendations, guided routines, AI support, and expert therapy — all in one place.
        </p>
      </div>

      {/* Phone and Floating Feature Cards */}
      <motion.div className="relative mt-16 flex justify-center items-center group">

        {/* Phone Mockup */}
        <motion.img
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="/mockup.png"
          alt="App Mockup"
          className="w-[240px] md:w-[300px] lg:w-[360px] z-10"
        />

        {/* Mood-Based Recommendations */}
        <motion.div
          className="absolute top-[12%] left-[15%] hidden md:block"
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-52">
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-600 p-2 rounded-full text-lg">🧘</span>
              <span className="font-semibold text-gray-800 text-sm">Mood-Based Suggestions</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Get personalized wellness tips based on your mood.</p>
          </div>
        </motion.div>

        {/* Daily Mood Logs */}
        <motion.div
          className="absolute bottom-[18%] left-[12%] hidden lg:block"
          whileHover={{ y: 8 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-52">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full text-lg">📅</span>
              <span className="font-semibold text-gray-800 text-sm">Daily Mood Logs</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Log your emotions and get uplifting AI motivations.</p>
          </div>
        </motion.div>

        {/* Health Guide & Breathing */}
        <motion.div
          className="absolute top-[10%] right-[14%] hidden lg:block"
          whileHover={{ y: -8, x: 6 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-60">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full text-lg">📖</span>
              <span className="font-semibold text-gray-800 text-sm">Daily Health Guide</span>
            </div>
            <ul className="text-xs text-gray-500 mt-2 space-y-1 list-disc list-inside">
              <li>Healthy Routines</li>
              <li>Breathing & Music</li>
              <li>Mindfulness Tips</li>
            </ul>
          </div>
        </motion.div>

        {/* Thought Journal */}
        <motion.div
          className="absolute bottom-[16%] right-[12%] hidden md:block"
          whileHover={{ y: 8, x: 6 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-56">
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 p-2 rounded-full text-lg">✍️</span>
              <span className="font-semibold text-gray-800 text-sm">CBT Journal</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Log your thoughts, reframe patterns, and gain clarity.</p>
          </div>
        </motion.div>

        {/* AI Chatbot */}
        <motion.div
          className="absolute top-[52%] left-[5%] hidden xl:block"
          whileHover={{ x: -8 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-52">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full text-lg">💬</span>
              <span className="font-semibold text-gray-800 text-sm">AI Mental Health Chat</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Talk to our smart assistant for support & guidance.</p>
          </div>
        </motion.div>

        {/* Therapist Booking */}
        <motion.div
          className="absolute top-[50%] right-[4%] hidden xl:block"
          whileHover={{ x: 8 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <div className="bg-white shadow-xl rounded-xl px-4 py-3 w-60">
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-red-600 p-2 rounded-full text-lg">🩺</span>
              <span className="font-semibold text-gray-800 text-sm">Book a Therapist</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Secure sessions & payments with top wellness experts.</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
