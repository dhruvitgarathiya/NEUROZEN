import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, User, ArrowRight } from "lucide-react";
import BottomNavBar from "../BottomBar";

const therapists = [
  {
    id: 1,
    name: "Dr. Aditi Sharma",
    specialization: "Clinical Psychologist",
    experience: "10+ years",
    image: "https://themindclan.com/images/smaller/professionals/aditi_sharma.webp",
  },
  {
    id: 2,
    name: "Dr. Rohan Mehta",
    specialization: "Counseling Psychologist",
    experience: "8 years",
    image: "https://cdn-images.kyruus.com/providermatch/2201oeig/photos/500/mehta-rohan-1760944656.jpg",
  },
];

const TherapistList = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 pb-20">
      <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">Find Your Therapist</h2>
      <p className="text-center text-gray-600 max-w-lg mx-auto mb-8">
        Browse through our certified therapists and book a session that suits you best.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        {therapists.map((therapist) => (
          <motion.div
            key={therapist.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
          >
            {/* Image */}
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-full h-56 object-contain"
            />

            {/* Details */}
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-900">{therapist.name}</h3>
              <p className="text-lg text-green-700 flex items-center gap-2 mt-1">
                <Briefcase className="w-5 h-5 text-green-600" /> {therapist.specialization}
              </p>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <User className="w-5 h-5 text-gray-500" /> {therapist.experience} experience
              </p>

              {/* View Profile Button */}
              <button
                onClick={() => navigate(`/therapist/${therapist.id}`)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-300 hover:bg-green-700"
              >
                View Profile <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNavBar/>
    </div>
  );
};

export default TherapistList;

