import React from "react";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-green-50 px-6 pb-16">
      
      {/* Left Side - Cool Text */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-8xl font-bold text-green-800 Margarine">404</h1>
        <h1 className="text-5xl font-bold text-green-800">Oops... Lost in Chill Mode 😎</h1>
        <p className="text-gray-600 text-lg mt-4">
          Looks like this page is taking a break! No worries, let's get you back on track.
        </p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <ArrowLeftCircle className="w-6 h-6" /> Take Me Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Right Side - Chill Image */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="md:w-1/2 flex justify-center"
      >
        <img src="https://gallerypngs.com/wp-content/uploads/2024/12/Chill-Guy-Png-Image-Free-Download.png" alt="Chill Guy" className="max-w-sm w-full" />
      </motion.div>

    </div>
  );
};

export default NotFound;
