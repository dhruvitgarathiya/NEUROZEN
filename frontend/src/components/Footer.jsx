import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/NEUROZENLOGO.png" alt="Neurozen Logo" className="w-10 h-10" />
            <span className="text-xl font-bold tracking-wide">NEUROZEN</span>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            Your all-in-one health & wellness companion. Helping you live better with guided therapy, AI support & personalized routines.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/features" className="hover:text-white transition">Features</a></li>
            <li><a href="/auth" className="hover:text-white transition">Sign Up</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Email: <a href="mailto:hello@codexjatin.me" className="hover:text-white">hello@codexjatin.me</a></li>
            <li>Phone: +91 1234567890</li>
            <li>Location: Gujarat, India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-5">
            <a
              href="https://github.com/codexjatin"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Github className="text-white w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/jateenparmar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              <Linkedin className="text-white w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center mt-12 text-white/70 text-sm border-t border-white/10 pt-6">
        © {new Date().getFullYear()} NEUROZEN. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
