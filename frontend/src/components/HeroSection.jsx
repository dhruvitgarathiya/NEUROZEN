import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-18 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left bg-gradient-to-b from-green-300 to-green-500 text-white px-6 lg:px-20">
      {/* Left Side: Text */}
      <div className="flex-1 max-w-lg lg:pr-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl font-bold leading-tight"
        >
          Find Your Inner Peace with{" "}
          <span className="text-green-900">NEUROZEN</span>
        </motion.h1>
        <p className="text-lg sm:text-xl mt-3">
          A personalized mental wellness platform designed just for you.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-white text-green-700 rounded-full font-semibold shadow-lg hover:bg-green-200 transition"
          onClick={() => navigate("/auth")}
        >
          Get Started
        </motion.button>
      </div>

      {/* Right Side: Larger Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="flex-1 flex justify-center lg:justify-end p-2 mt-8 lg:mt-0"
      >
        <img
          src="https://allinforhealth.info/wp-content/uploads/2018/05/mental-health-illustration_634548677.jpg"
          alt="Mindfulness Illustration"
          className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;





