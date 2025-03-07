import { useState } from "react";
import { motion } from "framer-motion";
import ExerciseCard from "./ExerciseCard";

const ExercisePage = ({ exercises, selectedMood ,onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique moods/categories
  const categories = [...new Set(exercises.flatMap((exercise) => exercise.recommendedFor))];

  // Filter for recommended & search
  const recommendedExercises = exercises.filter(
    (exercise) =>
      exercise.recommendedFor.includes(selectedMood.toLowerCase()) &&
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Find the Perfect Breathing Exercise</h1>
        <p className="text-gray-600 mt-2">Browse exercises based on your mood and preferences.</p>
      </div>

 {/* Search Bar */}
<div className="flex justify-center max-w-4xl mx-auto mb-6 px-4">
  <div className="relative w-full max-w-md">
    <input
      type="text"
      placeholder="Find the perfect exercise..."
      className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-green-500 outline-none transition-all duration-200"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <svg
      className="absolute left-3 top-3 text-gray-400 w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A8.5 8.5 0 1011 19.5a8.5 8.5 0 005.65-2.85z" />
    </svg>
  </div>
</div>



      {/* Recommended Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recommendedExercises.length > 0 ? (
            recommendedExercises.map((exercise) => (
              <ExerciseCard key={exercise._id} exercise={exercise} onSelect={onSelect} />
            ))
          ) : (
            <p className="text-gray-500">No recommended exercises found.</p>
          )}
        </motion.div>
      </div>

      {/* All Categories Section */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Browse by Mood</h2>
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{category.toUpperCase()}</h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {exercises
                .filter((exercise) => exercise.recommendedFor.includes(category))
                .map((exercise) => (
                  <ExerciseCard key={exercise._id} exercise={exercise} onSelect={onSelect} />
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExercisePage;


