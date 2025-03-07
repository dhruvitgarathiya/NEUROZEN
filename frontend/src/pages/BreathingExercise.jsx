import { useState } from "react";
import { motion } from "framer-motion";
import ExerciseList from "../components/exercise/ExerciseList";
import ExerciseDetails from "../components/exercise/ExerciseDetails";
import BottomNavBar from "../components/BottomBar";

const sampleExercises = [
  {
    _id: "67c950af6b641f434ba5d4ca",
    title: "4-7-8 Breathing",
    description: "A relaxation technique that helps reduce anxiety and promotes better sleep.",
    duration: 4,
    steps: [
      "Inhale quietly through your nose for a count of 4.",
      "Hold your breath for a count of 7.",
      "Exhale completely through your mouth for a count of 8.",
      "Repeat this cycle."
    ],
    videoUrl: "https://www.youtube.com/embed/LiUnFJ8P4gM",
    recommendedFor: ["stressed", "anxious"]
  },
  {
    _id: "67c950af6b641f434ba5d4cb",
    title: "Box Breathing",
    description: "A technique used to calm the mind and improve focus.",
    duration: 5,
    steps: [
      "Inhale through your nose for 4 seconds.",
      "Hold your breath for 4 seconds.",
      "Exhale through your mouth for 4 seconds.",
      "Hold again for 4 seconds and repeat."
    ],
    videoUrl: "https://www.youtube.com/embed/oN8xV3Kb5-Q",
    recommendedFor: ["stressed", "neutral"]
  },
  {
    _id: "67c950af6b641f434ba5d4ce",
    title: "Mindful Breathing",
    description: "Focuses on present moment awareness to reduce stress and enhance relaxation.",
    duration: 10,
    steps: [
      "Sit comfortably with your back straight.",
      "Close your eyes and bring attention to your breath.",
      "Notice the sensation of air entering and leaving your nostrils.",
      "If your mind wanders, gently bring it back to your breath."
    ],
    videoUrl: "https://www.youtube.com/embed/wfDTp2GogaQ",
    recommendedFor: ["calm", "neutral", "anxious"]
  },
  {
    _id: "67c950af6b641f434ba5d4cf",
    title: "Alternate Nostril Breathing",
    description: "Balances the left and right hemispheres of the brain, promoting mental clarity and calmness.",
    duration: 5,
    steps: [
      "Sit comfortably and relax.",
      "Use your right thumb to close your right nostril.",
      "Inhale deeply through your left nostril.",
      "Close your left nostril with your right ring finger and release your right nostril.",
      "Exhale through your right nostril.",
      "Inhale through your right nostril, then close it and exhale through your left nostril.",
      "Repeat this cycle."
    ],
    videoUrl: "https://www.youtube.com/embed/OnkWg3l1eXA",
    recommendedFor: ["calm", "neutral", "anxious"]
  },
  {
    _id: "67c950af6b641f434ba5d4d0",
    title: "Energizing Breath",
    description: "A quick technique to boost energy and alertness.",
    duration: 3,
    steps: [
      "Sit or stand comfortably.",
      "Take short, quick inhales through your nose, filling your lungs halfway.",
      "Exhale passively, allowing your breath to fall out.",
      "Repeat this cycle rapidly for 10 breaths."
    ],
    videoUrl: "https://www.youtube.com/embed/J0Nrgutgkpk",
    recommendedFor: ["excited", "happy", "neutral"]
  },
  {
    _id: "67c950af6b641f434ba5d4d1",
    title: "Diaphragmatic Breathing",
    description: "Engages the diaphragm for deeper breaths, reducing stress and promoting relaxation.",
    duration: 5,
    steps: [
      "Lie on your back with knees bent or sit comfortably.",
      "Place one hand on your chest and the other on your abdomen.",
      "Inhale deeply through your nose, ensuring your diaphragm (not your chest) inflates with air.",
      "Exhale slowly through your mouth.",
      "Continue this pattern."
    ],
    videoUrl: "https://www.youtube.com/embed/0Ua9bOsZTYg",
    recommendedFor: ["stressed", "anxious", "sad"]
  },
  {
    _id: "67c950af6b641f434ba5d4d2",
    title: "Resonant Breathing",
    description: "Maintains a consistent breathing rate to promote relaxation and heart health.",
    duration: 10,
    steps: [
      "Sit or lie down comfortably.",
      "Inhale for a count of 5 seconds.",
      "Exhale for a count of 5 seconds.",
      "Continue this pattern, maintaining equal inhale and exhale durations."
    ],
    videoUrl: "https://www.youtube.com/embed/pevoteLKtTU",
    recommendedFor: ["calm", "neutral", "anxious"]
  },
  {
    _id: "67c950af6b641f434ba5d4d3",
    title: "Lion's Breath",
    description: "Releases tension and boosts energy by engaging facial muscles and vocal cords.",
    duration: 2,
    steps: [
      "Sit comfortably with your hands on your knees.",
      "Inhale deeply through your nose.",
      "Open your mouth wide, stick out your tongue, and exhale forcefully, making a 'ha' sound.",
      "Repeat this cycle."
    ],
    videoUrl: "https://www.youtube.com/embed/pXzZchHF92I?si=5FZ2zbXqBG-ln-W8",
    recommendedFor: ["angry", "stressed", "excited"]
  },
  {
    _id: "67c950af6b641f434ba5d4d4",
    title: "Progressive Relaxation",
    description: "Combines deep breathing with muscle relaxation to reduce stress and promote calmness.",
    duration: 15,
    steps: [
      "Sit or lie down comfortably.",
      "Inhale deeply, tensing a specific muscle group (e.g., feet).",
      "Exhale, releasing the tension in that muscle group.",
      "Move systematically through different muscle groups, from feet to head."
    ],
    videoUrl: "https://www.youtube.com/embed/utGa6rqzs3g?si=NLkvugoB_lk-45r6",
    recommendedFor: ["stressed", "anxious", "sad"]
  }
];



const BreathingExercise = ({ mood = "stressed" }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 pb-20">
      {/* <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-green-700 mb-6"
      >
        Breathing Exercises for {mood.charAt(0).toUpperCase() + mood.slice(1)}
      </motion.h1> */}
      {selectedExercise ? (
        <ExerciseDetails exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />
      ) : (
        <ExerciseList mood={mood} onSelect={setSelectedExercise} exercises={sampleExercises} />
      )}
      <BottomNavBar/>
    </div>
  );
};

export default BreathingExercise;
