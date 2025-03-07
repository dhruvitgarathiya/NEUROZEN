import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, ArrowLeft } from "lucide-react";

const ExerciseDetails = ({ exercise, onBack }) => {
  const [timer, setTimer] = useState(exercise.duration * 60);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 bg-white rounded-xl shadow-lg w-full max-w-5xl mx-auto"
    >
        <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-700 mb-6"
      >
        {exercise.title}
      </motion.h1>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 flex items-center text-gray-700 hover:text-gray-900 transition"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      {/* Title */}
      {/* <h2 className="text-2xl font-bold text-gray-900">{exercise.title}</h2> */}

      {/* Side-by-side layout for larger screens */}
      <div className="mt-4 flex flex-col md:flex-row gap-6">
        {/* Left: Instructions */}
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow">
          <p className="text-gray-600 mb-4">{exercise.description}</p>
          <ul className="space-y-2 text-gray-700">
            {exercise.steps.map((step, index) => (
              <li key={index} className="flex items-center">
                ✅ {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Video + Timer */}
        <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center">
          <iframe
            className="w-full rounded-lg shadow-md aspect-video"
            src={exercise.videoUrl}
            title={exercise.title}
            allowFullScreen
          ></iframe>

          {/* Timer and Controls */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              onClick={() => setTimer(exercise.duration * 60)}
              className="p-3 bg-gray-500 text-white rounded-full shadow-lg hover:bg-gray-600 transition"
            >
              <RotateCcw />
            </button>
          </div>
          <p className="text-center mt-4 text-xl font-bold text-gray-900">{timer}s</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExerciseDetails;
