import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import RazorpayCheckout from "../components/therapist/RazorPay";
import { Star, Clock, CheckCircle } from "lucide-react";
import BottomNavBar from "../components/BottomBar";
import { Dialog } from "@headlessui/react";

const therapistData = {
  1: {
    name: "Dr. Aditi Sharma",
    specialization: "Clinical Psychologist",
    experience: "10+ years",
    bio: "Expert in Cognitive Behavioral Therapy (CBT) and mindfulness therapy. Passionate about guiding individuals through anxiety, depression, and emotional distress.",
    image: "https://themindclan.com/images/smaller/professionals/aditi_sharma.webp",
    price: 500,
    slots: ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM", "6:00 PM - 7:00 PM"],
    reviews: [
      { name: "Rahul Verma", rating: 5, comment: "Dr. Aditi is amazing! Helped me manage my anxiety so well." },
      { name: "Pooja Kapoor", rating: 4, comment: "Very professional and understanding. Highly recommend!" },
    ],
  },
  2: {
    name: "Dr. Rohan Mehta",
    specialization: "Counseling Psychologist",
    experience: "8 years",
    bio: "Specializes in anxiety, stress management, and relationship counseling. Uses evidence-based approaches for mental well-being.",
    image: "https://cdn-images.kyruus.com/providermatch/2201oeig/photos/500/mehta-rohan-1760944656.jpg",
    price: 700,
    slots: ["9:30 AM - 10:30 AM", "1:00 PM - 2:00 PM", "5:30 PM - 6:30 PM"],
    reviews: [
      { name: "Ananya Singh", rating: 5, comment: "A great listener and very insightful. Helped me a lot!" },
      { name: "Vikram Patel", rating: 4, comment: "Effective sessions, felt much better after therapy." },
    ],
  },
};

const TherapistDetails = () => {
  const { id } = useParams();
  const therapist = therapistData[id];
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  if (!therapist) {
    return <p className="text-center text-red-500 text-lg mt-10">Therapist Not Found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-6 m-6 bg-white shadow-lg rounded-lg pb-20">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row items-center gap-6">
        <motion.img src={therapist.image} alt={therapist.name} className="w-40 h-40 rounded-full shadow-md border-4 border-green-500" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-green-800">{therapist.name}</h2>
          <p className="text-lg text-gray-600">{therapist.specialization}</p>
          <p className="text-sm text-gray-500">{therapist.experience} experience</p>
          <p className="mt-4 text-gray-700">{therapist.bio}</p>
          <p className="text-xl font-semibold text-green-700 mt-4">₹{therapist.price} / session</p>
        </div>
      </motion.div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600" /> Available Time Slots
        </h3>
        <p className="text-gray-600 mt-2">Select a time slot to book an appointment.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {therapist.slots.map((slot, index) => (
            <button key={index} onClick={() => { setSelectedSlot(slot); setIsOpen(true); }} className="px-3 py-1 bg-green-100 text-green-700 rounded-md border border-green-500 hover:bg-green-200">
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> Patient Reviews
        </h3>
        <div className="mt-2 space-y-3">
          {therapist.reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium">{review.name}</p>
              <div className="flex items-center gap-1 text-yellow-500">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-600 mt-1">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for selecting a time slot */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <Dialog.Title className="text-xl font-semibold text-green-700">Confirm Appointment</Dialog.Title>
          <p className="mt-2 text-gray-700">You have selected <strong>{selectedSlot}</strong>. Do you want to proceed?</p>
          <div className="mt-4 space-x-4 md:space-y-4">
            <RazorpayCheckout therapist={therapist} selectedSlot={selectedSlot} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 mt-2"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      </Dialog>

      <BottomNavBar />
    </div>
  );
};

export default TherapistDetails;