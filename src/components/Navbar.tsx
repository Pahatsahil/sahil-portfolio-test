import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="text-2xl font-bold font-['Space_Grotesk']">
            <span className="text-gradient">SP</span>
            <span className="text-white ml-1">.dev</span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-[#61dafb] transition-colors text-sm font-medium"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            whileHover={{ scale: 1.04 }}
          >
            <Link
              to="/resume"
              className="px-4 py-2 border border-[#61dafb]/40 text-[#61dafb] text-sm font-medium rounded-full hover:bg-[#61dafb]/10 transition-all"
            >
              Resume
            </Link>
          </motion.div>
          <motion.a
            href="#contact"
            className="px-5 py-2.5 bg-gradient-to-r from-[#61dafb] to-[#818cf8] text-[#0f172a] font-semibold rounded-full text-sm hover:shadow-lg hover:shadow-[#61dafb]/25 transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-full left-0 right-0 p-6"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-[#61dafb] transition-colors text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/resume"
              className="text-[#61dafb] font-medium text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume ↗
            </Link>
            <a
              href="#contact"
              className="mt-2 px-5 py-3 bg-gradient-to-r from-[#61dafb] to-[#818cf8] text-[#0f172a] font-semibold rounded-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
