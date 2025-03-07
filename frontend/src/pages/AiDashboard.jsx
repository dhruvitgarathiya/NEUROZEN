import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Mic, Smile, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

const AIDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-300 to-green-500 text-white p-6 pb-25">
      <motion.h1
        className="text-5xl font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI-Powered Emotion & Voice Analyzer
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <motion.div
          className="bg-white text-green-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Mic size={60} className="text-green-600" />
          <h2 className="text-2xl font-semibold mt-4">Voice Detector</h2>
          <p className="text-gray-600 text-center mt-2">
            Analyze your speech and detect mood through voice.
          </p>
          <Link
            to="/voice"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Access Now
          </Link>
        </motion.div>

        <motion.div
          className="bg-white text-green-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <Smile size={60} className="text-yellow-500" />
          <h2 className="text-2xl font-semibold mt-4">Emotion Detector</h2>
          <p className="text-gray-600 text-center mt-2">
            Real-time facial emotion detection using AI.
          </p>
          <Link
            to="/emotion"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Access Now
          </Link>
        </motion.div>

        <motion.div
          className="bg-white text-green-700 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center hover:scale-105 transition-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <BrainCircuit size={60} className="text-blue-500" />
          <h2 className="text-2xl font-semibold mt-4">Emotion Classifier</h2>
          <p className="text-gray-600 text-center mt-2">
            Classify emotions based on text or speech input.
          </p>
          <Link
            to="/emtion-cl"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Access Now
          </Link>
        </motion.div>
      </div>

      {/* Outlet to render nested routes */}
      <Outlet />
    </div>
  );
};

export default AIDashboard;
