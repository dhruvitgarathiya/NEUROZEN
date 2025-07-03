import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Move, BarChart, BookOpen, Smile, Link, Music, UserSearch,Edit } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import DailyGoals from "../components/DailyGoals";
import MoodRecommendation from "../components/recommendation/MoodRecommendation";
import BottomNavBar from "../components/BottomBar";
import { useUser } from "../context/userProvider";
import { useNavigate } from "react-router-dom";
import MoodLogCard from "../components/MoodLogCard";
import { Bell, Settings, UserCircle } from "lucide-react";
import Notifications from "../components/Notifications";




const Dashboard = () => {

  const [moodLogs, setMoodLogs] = useState('');
  const [steps, setSteps] = useState(null);
  const [isGoogleFitConnected, setIsGoogleFitConnected] = useState(false);
  const [token, setToken] = useState(null);
  const [showMoodLog, setShowMoodLog] = useState(false);
  const navigate = useNavigate();

  const {profile,setProfile,user} = useUser();
  const [notifications, setNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const handelGoogleFitConnect = async () => {
    try {
      const response = await fetch("https://nuerozen-backend.onrender.com/auth/google", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      if (data.success && data.authUrl) {
        window.open(data.authUrl, "_blank");
        localStorage.setItem("googleAuthUrl", data.authUrl);
      }
    } catch (error) {
      console.error("Error connecting to Google Fit: ", error);
    }
  };

  
  



  useEffect(() => {
     // Get today's date in YYYY-MM-DD format
     const today = new Date().toISOString().split("T")[0];
     const lastVisitDate = localStorage.getItem("lastMoodLogDate");
 
     if (lastVisitDate !== today) {
       // If it's the first visit today, show MoodLog and update last visit date
       setShowMoodLog(true);
     }
 
    const Localtoken = localStorage.getItem("token");
    if (Localtoken) {
      setToken(Localtoken);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await fetch(`https://nuerozen-backend.onrender.com/api/user-profiles/user/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
  
        const profileData = await profileRes.json();
        console.log("Profile Data:", profileData);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/auth");
      }
    };
  
    if (user._id && token) {
      fetchProfile();
    }
  }, [token, setProfile]);  // Dependencies to avoid unnecessary re-fetching



  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    const mood = logs[0]?.mood;
    console.log("logs: ", logs);
    setMoodLogs(mood);

    // const logs = JSON.parse(localStorage.getItem("moodLogs")) || [];
    // const latestMood = logs.length > 0 ? logs[logs.length - 1].mood : null;
    // console.log("All Logs: ", logs);
    // console.log("Latest Mood: ", latestMood);
    // setMoodLogs(latestMood);


    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('auth_token', token);
      setIsGoogleFitConnected(true);
      const fetchSteps = async () => {
        try {
          const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              aggregateBy: [{
                dataTypeName: 'com.google.step_count.delta',
              }],
              bucketByTime: { durationMillis: 86400000 },
              startTimeMillis: Date.now() - 86400000,
              endTimeMillis: Date.now(),
            }),
          });
          const data = await response.json();
          const steps = data.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
          setSteps(steps);
        } catch (error) {
          console.error('Error fetching steps: ', error);
        }
      };

      fetchSteps();
    }
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto pb-16">

    <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full bg-white shadow-md flex items-center justify-between px-4 py-3 rounded-2xl border border-green-300 md:px-6 md:py-4"
      >
        {/* Left - App Logo & Name */}
        <div className="flex items-center gap-2">
          <img src="/NEUROZENLOGO.png" alt="NeuroZen Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-lg md:text-2xl font-bold text-green-800 tracking-wide">
            NEUROZEN
          </h1>
        </div>

        {/* Right - Notification, Settings, Profile */}
        <div className="relative flex items-center gap-3">
          {/* Notification Icon with Badge */}
          <button 
            className="relative p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-6 h-6 text-green-700" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {notifications > 9 ? "9+" : notifications}
              </span>
            )}
          </button>

          {/* Notifications Popup */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-10 right-0 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
            >
              <Notifications />
            </motion.div>
          )}

          {/* Profile Icon */}
          <button
            onClick={() => navigate("/myProfile")}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <UserCircle className="w-6 h-6 text-green-700" />
          </button>
        </div>
      </motion.div>


      {/* User Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <motion.div className="p-4 bg-white shadow-md rounded-xl flex items-center gap-4">
          <Heart className="text-red-500" size={24} />
          <div>
            <h3 className="text-gray-600">Height</h3>
            <p className="text-xl font-bold">{profile?.height} cm</p>
          </div>
        </motion.div>
        <motion.div className="p-4 bg-white shadow-md rounded-xl flex items-center gap-4">
          <BarChart className="text-blue-500" size={24} />
          <div>
            <h3 className="text-gray-600">Weight</h3>
            <p className="text-xl font-bold">{profile?.weight} kg</p>
          </div>
        </motion.div>
        <motion.div className="p-4 bg-white shadow-md rounded-xl flex items-center gap-4">
          <Move className="text-green-500" size={24} />
          <div>
            <h3 className="text-gray-600">Steps Today</h3>
            {isGoogleFitConnected ? (
              <p className="text-xl font-bold">{steps || "Loading..."}</p>
            ) : (
              <button 
                onClick={handelGoogleFitConnect} 
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                <FaGoogle /> Connect Google Fit
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Daily Goals */}
      <div className="flex items-center justify-center flex-wrap w-full">
      <DailyGoals userProfile={profile} className="mt-6" />
      <MoodRecommendation mood={moodLogs} className="mt-6" />
      </div>
      

      {/* CBT Journaling Section */}
      <div className="mt-6 bg-yellow-100 p-6 rounded-xl shadow-md">
        <BookOpen size={28} className="text-yellow-600 mb-2" />
        <h2 className="text-xl font-semibold">Boost Your Mindset with CBT Journaling</h2>
        <p className="text-gray-700 mt-2">Write down your thoughts, track patterns, and build resilience.</p>
        <button 

        onClick={() => navigate("/CBT")}
        
        className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600">
          Start Journaling
        </button>
      </div>

      <div className="mt-6 bg-blue-100 p-6 rounded-xl shadow-md">
        <Music size={28} className="text-blue-600 mb-2" />
        <h2 className="text-xl font-semibold">Heal with Music Therapy</h2>
        <p className="text-gray-700 mt-2">Listen to calming tunes and boost your mood effortlessly.</p>
        <button 
          onClick={() => navigate("/moodMusic")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
          Explore Music
        </button>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
        <UserSearch size={28} className="text-green-600 mb-2" />
        <h2 className="text-xl font-semibold">Find the Right Therapist</h2>
        <p className="text-gray-700 mt-2">Connect with a professional to guide you on your mental wellness journey.</p>
        <button 
          onClick={() => navigate("/therapist")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600">
          Find a Therapist
        </button>
      </div>

      <div className="mt-6 bg-purple-100 p-6 rounded-xl shadow-md">
        <Edit size={28} className="text-purple-600 mb-2" />
        <h2 className="text-xl font-semibold">Track Your Mood</h2>
        <p className="text-gray-700 mt-2">Log your emotions and identify patterns for better self-awareness.</p>
        <button 
          onClick={() => navigate("/moodLog")}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600">
          Start Logging
        </button>
      </div>


      {/* Mood-Based Recommendations */}
      {/* <MoodRecommendations moodLogs={moodLogs} className="mt-6" /> */}

      {/* Trending Health Tips */}
      <div className="mt-6 mb-6">
        <h2 className="text-xl font-semibold">Trending Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-white shadow-md rounded-xl">
            <Smile size={24} className="text-green-500 mb-2" />
            <h3 className="text-lg font-bold">Smile More</h3>
            <p className="text-gray-600">Smiling releases endorphins and reduces stress.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-white shadow-md rounded-xl">
            <Move size={24} className="text-blue-500 mb-2" />
            <h3 className="text-lg font-bold">Stay Active</h3>
            <p className="text-gray-600">Daily movement improves mental health and energy levels.</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4 bg-white shadow-md rounded-xl">
            <Link size={24} className="text-purple-500 mb-2" />
            <h3 className="text-lg font-bold">Connect with Others</h3>
            <p className="text-gray-600">Social interactions strengthen emotional well-being.</p>
          </motion.div>
        </div>
      </div>

      {/* MoodLog Popup Modal */}
      {showMoodLog && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg md:max-w-2xl max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowMoodLog(false)}
            >
              ×
            </button>
            <MoodLogCard />
          </div>
        </div>
      )}


      <BottomNavBar/>
    </div>
  );
};

export default Dashboard;
