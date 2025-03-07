import React from "react";
import CBTJournaling from "../components/CBTThoughts";
import { motion } from "framer-motion";
import { BookOpen, PenTool, Brain, SendHorizontal, CheckCircle2 } from "lucide-react";

const steps = [
  { icon: BookOpen, title: "Understand CBT Journaling", desc: "CBT journaling helps you identify negative thought patterns and reframe them for a healthier mindset." },
  { icon: PenTool, title: "Write Your Thoughts", desc: "Write down what's on your mind honestly. This is a judgment-free space to express yourself." },
  { icon: Brain, title: "AI-Guided Insights", desc: "Our AI will provide gentle, supportive insights and reframing techniques based on CBT principles." },
  { icon: SendHorizontal, title: "Reflect & Apply", desc: "Take a moment to reflect on the AI's response and apply the insight to shift your mindset positively." },
  { icon: CheckCircle2, title: "Track Your Progress", desc: "Regular journaling helps build emotional resilience and awareness over time." },
];

const CBTJournalingPage = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center px-6 py-10 pb-20">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-4xl font-bold text-green-800">Transform Your Thoughts with CBT Journaling 🌱</h1>
        <p className="text-gray-600 mt-4 text-lg">
          A simple yet powerful tool to help you reframe unhelpful thoughts, boost self-awareness, and improve your emotional well-being.
        </p>
      </motion.div>

      {/* Roadmap Section */}
      <div className="grid md:grid-cols-5 gap-6 mt-12 max-w-5xl">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center p-4 bg-white shadow-lg rounded-lg border border-green-300 text-center"
          >
            <step.icon className="text-green-600 w-12 h-12 mb-3" />
            <h3 className="text-lg font-semibold text-green-800">{step.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tool Section */}
      <div className="mt-16 flex flex-col md:flex-row items-center gap-10 max-w-6xl w-full">
        
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-3xl font-semibold text-green-800">Start Journaling Today ✍️</h2>
          <p className="text-gray-600 mt-4 text-lg">
            Just write what's on your mind, and let our AI offer thoughtful reflections based on CBT techniques.
          </p>
        </motion.div>

        {/* Right Side: CBT Tool */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="md:w-1/2 w-full"
        >
          <CBTJournaling />
        </motion.div>

      </div>
    </div>
  );
};

export default CBTJournalingPage;
