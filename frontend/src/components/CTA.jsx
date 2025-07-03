import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-green-50 via-green-100 to-green-50 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto backdrop-blur-lg bg-white/50 border border-white/30 rounded-3xl p-10 shadow-xl shadow-green-100"
      >
        <h2 className="text-4xl font-bold text-gray-800">
          Start Your Journey Today
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Join thousands of users improving their well-being with NEUROZEN.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/auth")}
          className="mt-8 px-7 py-3 bg-white text-green-700 rounded-full font-semibold shadow-md hover:bg-green-50 hover:shadow-green-200 transition duration-300"
        >
          Sign Up Now
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTASection;

  