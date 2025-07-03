import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollPos = useRef(0);
  const scrollTimeout = useRef(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const scrollingDown = currentScrollPos > prevScrollPos.current;

    if (currentScrollPos < 50) {
      setIsVisible(true);
    } else {
      setIsVisible(!scrollingDown);
    }

    prevScrollPos.current = currentScrollPos;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "Our Team", href: "#team" },
    { label: "Contact", href: "#contact" },
    { label: "Get Started", href: "/auth", cta: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-120%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 max-w-4xl w-[90%] bg-opacity-20 backdrop-blur-xl border border-white border-opacity-30 shadow-lg z-[100] px-8 py-3 flex justify-between items-center rounded-full"
        style={{ WebkitBackdropFilter: "blur(20px)", backdropFilter: "blur(20px)" }}
      >
        <h1 className="text-3xl font-extrabold text-green-700 tracking-wide cursor-default select-none">
          NEUROZEN
        </h1>

        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) =>
            item.cta ? (
              <li key={index}>
                <a
                  href={item.href}
                  className="px-5 py-2 rounded-full bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all duration-300"
                >
                  {item.label}
                </a>
              </li>
            ) : (
              <li key={index} className="relative group cursor-pointer">
                <a
                  href={item.href}
                  className="text-gray-700 font-semibold hover:text-green-600 transition-colors duration-300"
                >
                  {item.label}
                </a>
                <span
                  className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-600 transition-all group-hover:w-full"
                  aria-hidden="true"
                />
              </li>
            )
          )}
        </ul>

        <button
          className="md:hidden text-green-700 focus:outline-none"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen bg-white z-[99] flex flex-col items-center justify-center space-y-8 text-2xl font-semibold text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item, index) =>
              item.cta ? (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-green-500 transition-colors duration-300"
                >
                  {item.label}
                </a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
