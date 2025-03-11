import React from "react";
import { Home, NotebookPen, User, Wind } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={24} />, path: "/home" },
    { id: "journal", label: "Journal", icon: <NotebookPen size={24} />, path: "/CBT" },
    { id: "breathing", label: "Breathing", icon: <Wind size={24} />, path: "/breathing" },
    { id: "profile", label: "Profile", icon: <User size={24} />, path: "/myProfile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around py-3 px-4 sm:px-6 md:px-8 lg:px-12">
      {navItems.map((item) => (
        <motion.div
          key={item.id}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center cursor-pointer transition-all ${
            location.pathname === item.path ? "text-green-500 scale-110" : "text-gray-600"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {item.icon}
          <span className="text-xs font-medium">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default BottomNavBar;
