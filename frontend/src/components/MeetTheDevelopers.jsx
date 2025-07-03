import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const MeetTheDeveloper = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 tracking-tight">
          Meet the Developer
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto mb-12">
          Building exceptional digital experiences with clean code, creativity,
          and craftsmanship.
        </p>

        <motion.div
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-8 shadow-2xl flex flex-col items-center transition-all duration-300"
        >
          <img
            src="https://i.ibb.co/C0Ntv5L/lead.jpg"
            alt="Jatin Parmar"
            className="w-28 h-28 rounded-full border border-white/40 shadow-md object-fit mb-4"
          />
          <h3 className="text-2xl font-semibold text-gray-900">Jatin Parmar</h3>
          <p className="text-sm text-gray-600 mb-4 mt-1">Full Stack Web Developer</p>

          <div className="flex gap-6 text-xl mt-2">
            <a
              href="https://github.com/codexjatin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/jateenparmar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MeetTheDeveloper;
