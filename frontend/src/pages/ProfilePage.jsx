import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Cake, Dumbbell, Heart, Edit, LogOut, Save } from "lucide-react";
import { useUser } from "../context/userProvider";
import BottomNavBar from "../components/BottomBar";

const ProfilePage = () => {
  // Get user, healthData, and logout function from context
  const { user, profile: healthData, logout } = useUser();

  // State for editing profile
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  // Set initial data from context
  useEffect(() => {
    if (healthData) {
      setUpdatedData({ ...healthData });
    }
  }, [healthData]);

  // Handle input change
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Toggle edit mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = () => {
    console.log("Updated Data:", updatedData);
    setIsEditing(false);
    // Here, you can add an API call to update profile in database
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center p-8 pb-20">
      {/* Profile Header */}
      <motion.div 
        className="flex flex-col items-center space-y-3"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        {/* Profile Picture */}
        <div className="w-28 h-28 bg-green-200 rounded-full flex items-center justify-center text-4xl font-bold text-green-700 shadow-lg">
          {user?.fullname?.charAt(0) || "U"}
        </div>

        {/* Full Name */}
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="text-green-500" /> {user?.fullname || "Guest"}
        </h1>

        {/* Email */}
        <p className="text-gray-600 flex items-center gap-2">
          <Mail className="text-green-500" size={18} /> {user?.email || "No Email"}
        </p>
      </motion.div>

      {/* Profile Details Section */}
      <motion.div 
        className="mt-8 space-y-6 text-gray-700 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold text-green-700">Personal Information</h2>

        {/* Age */}
        <div className="flex items-center gap-2 text-lg">
          <Cake className="text-green-500" size={20} />
          {isEditing ? (
            <input
              type="number"
              name="age"
              value={updatedData.age || ""}
              onChange={handleChange}
              className="border p-1 rounded w-16"
            />
          ) : (
            <span>Age: {healthData?.age || "Not Specified"}</span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-lg">
          <MapPin className="text-green-500" size={20} />
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={updatedData.city || ""}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            <span>Location: {healthData?.city || "Not Specified"}, {healthData?.state || ""}, {healthData?.country || ""}</span>
          )}
        </div>
      </motion.div>

      {/* Health & Lifestyle Section */}
      <motion.div 
        className="mt-6 space-y-6 text-gray-700 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-green-700">Health & Lifestyle</h2>

        {/* Diet Preference */}
        <div className="flex items-center gap-2 text-lg">
          <Heart className="text-green-500" size={20} />
          {isEditing ? (
            <input
              type="text"
              name="dietPreference"
              value={updatedData.dietPreference?.join(", ") || ""}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            <span>Diet Preference: {healthData?.dietPreference?.join(", ") || "Not Specified"}</span>
          )}
        </div>

        {/* Health Goals */}
        <div className="flex items-center gap-2 text-lg">
          <Dumbbell className="text-green-500" size={20} />
          {isEditing ? (
            <input
              type="text"
              name="healthGoals"
              value={updatedData.healthGoals?.join(", ") || ""}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            <span>Health Goals: {healthData?.healthGoals?.join(", ") || "Not Specified"}</span>
          )}
        </div>
      </motion.div>

      {/* Buttons (Edit & Logout) */}
      <motion.div 
        className="mt-8 flex gap-4 flex-wrap items-center justify-center" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 text-lg hover:bg-green-600 transition"
            onClick={handleSave}
          >
            <Save size={20} /> Save Changes
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 text-lg hover:bg-blue-600 transition"
            onClick={handleEditToggle}
          >
            <Edit size={20} /> Edit Profile
          </button>
        )}

        {/* Logout Button */}
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2 text-lg hover:bg-red-600 transition"
          onClick={logout}
        >
          <LogOut size={20} /> Logout
        </button>
      </motion.div>
      <BottomNavBar/>
    </div>
  );
};

export default ProfilePage;
