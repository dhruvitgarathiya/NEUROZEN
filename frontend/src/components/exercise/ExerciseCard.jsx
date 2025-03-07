import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const ExerciseCard = ({ exercise, onSelect }) => {
  const MAX_DESCRIPTION_LENGTH = 100;

  // Trim description if it's too long
  const trimmedDescription =
    exercise.description.length > MAX_DESCRIPTION_LENGTH
      ? exercise.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
      : exercise.description;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-2xl cursor-pointer transition-all"
      onClick={() => onSelect(exercise)}
    >
      <h2 className="text-lg font-bold text-gray-900">{exercise.title}</h2>
      <p className="text-sm text-gray-600 mt-2">{trimmedDescription}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-500 text-xs">Duration: {exercise.duration} min</p>
        <ChevronRight className="text-gray-700" />
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
