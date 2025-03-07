import React from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-green-100 shadow-md py-4 px-6 flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold text-green-700">NEUROZEN</h1>
      <div className="hidden md:flex space-x-6">
        <a href="#features" className="text-green-700 hover:text-green-500">Features</a>
        <a href="#team" className="text-green-700 hover:text-green-500">Our Team</a>
        <a href="#contact" className="text-green-700 hover:text-green-500">Contact</a>
      </div>
      <button className="md:hidden">
        <Menu size={28} className="text-green-700" />
      </button>
    </nav>
  );
};

export default Navbar;

