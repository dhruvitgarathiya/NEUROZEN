import AuthForm from "./components/AuthForm"
import ProfileSetup from "./components/ProfileSetup"
import { Route,Routes,Navigate } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import CBTJournaling from "./components/CBTThoughts"
import CBTJournalingPage from "./pages/CBTPage"
import NotFound from "./pages/NotFound"
import DailyGoals from "./components/DailyGoals"
import EmergencyContactPage from "./pages/EmergencyContactPage"
import MentalHealthChatbot from "./components/MentalHealthChatbot"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle,SidebarCloseIcon, User } from "lucide-react";
import TherapistList from "./components/therapist/TherapistList";
import TherapistDetails from "./pages/TherapistPage";
import MoodLogCard from "./components/MoodLogCard"
import MoodMusic from "./components/relaxTools/moodPlaylist"
import BreathingExercises from "./pages/BreathingExercise"
import AIDashboard from "./pages/AiDashboard"
import Dashboard from "./pages/Dashboard"
import ProfilePage from "./pages/ProfilePage"
import { UserProvider } from "./context/userProvider"
import ProtectedRoute from "./components/protectedRoute/protectedRoutes"
import { useUser } from "./context/userProvider"
import MeetingPage from "./pages/MeetingPage"


//remove this temporary data after integrating with backend
// const userProfile = {
//   age: 28,
//   gender: "female",
//   height: 165,
//   weight: 60,
//   activityLevel: "moderate",
//   healthGoals: "increase stamina",
//   dietPreference: "vegetarian",
//   medicalConditions: ["Anemia"],
//   medications: ["Iron supplements"],
// };

// const user = {
//   fullname: "Jatin Parmar",
//   email: "jjatinparmar54@gmail.com",
// };

// const healthData = {
//   age: 20,
//   gender: "male",
//   activityLevel: ["Moderate"],
//   healthGoals: ["Weight Loss", "Muscle Gain"],
//   dietPreference: ["Vegetarian"],
//   state: "Gujarat",
//   city: "Ahmedabad City",
//   country: "India",
// };





function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);



  useEffect(() => {


    
  }, []);


  return (
    <UserProvider>
    <Routes>
      <Route path="/auth" element={<AuthForm/>}/>
      <Route path="/profile" element={
            <ProtectedRoute>
                <ProfileSetup/>
            </ProtectedRoute> 
        }/>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/CBT" element={
        <ProtectedRoute>
        <CBTJournalingPage/>
        </ProtectedRoute>
        }/>
      <Route path="*" element={<NotFound/>}/>
      {/* <Route path="/goals" element={<DailyGoals userProfile={userProfile}/>}/> */}
      <Route path="/emergency" element={<EmergencyContactPage/>}/>
      <Route path="/bot" element={<MentalHealthChatbot/>}/>
      <Route path="/therapist" element={
        <ProtectedRoute>
        <TherapistList />
        </ProtectedRoute>
        } />
      <Route path="/therapist/:id" element={
        <ProtectedRoute>
        <TherapistDetails />
        </ProtectedRoute>
        } />
      <Route path="/moodlog" element={
        <ProtectedRoute>
        <MoodLogCard/>
        </ProtectedRoute>
        }/>
      <Route path="/moodmusic" element={
        <ProtectedRoute>
        <MoodMusic/>
        </ProtectedRoute>
        }/>
      <Route path="/breathing" element={
        <ProtectedRoute>
        <BreathingExercises/>
        </ProtectedRoute>
        }/>
      <Route path="/aidashboard" element={
        <ProtectedRoute>
        <AIDashboard/>
        </ProtectedRoute>
        }/>
      <Route path="/home" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
        }/> 
      <Route path="/myProfile" element={
        <ProtectedRoute>
        <ProfilePage/>
        </ProtectedRoute>
        }/>

      <Route path="/meeting" element={
        <ProtectedRoute>
        <MeetingPage/>
        </ProtectedRoute>
        }/>

    </Routes>

    <motion.button
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-15 left-4 p-3 bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-100"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen? <SidebarCloseIcon className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chatbot - Slide In/Out */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: isChatOpen ? "0%" : "-100%", opacity: isChatOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-14 left-4  shadow-lg z-50"
      >
        <MentalHealthChatbot />
      </motion.div>

      

    </UserProvider>
  )
}

export default App
