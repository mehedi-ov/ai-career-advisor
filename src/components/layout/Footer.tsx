import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="relative bg-[#F6F7FA] pt-20 pb-10 overflow-hidden">
    {/* Animated blobs */}
    <motion.div
      className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full z-0"
      initial={{ scale: 0.9, opacity: 0.5 }}
      animate={{
        scale: [0.9, 1.1, 0.9],
        opacity: [0.5, 0.7, 0.5],
        filter: ["blur(80px)", "blur(100px)", "blur(80px)"],
      }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.18) 0%, rgba(139,92,246,0.22) 60%, rgba(139,92,246,0.10) 100%)",
      }}
    />
    <motion.div
      className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full z-0"
      initial={{ scale: 1.1, opacity: 0.5 }}
      animate={{
        scale: [1.1, 0.9, 1.1],
        opacity: [0.5, 0.7, 0.5],
        filter: ["blur(80px)", "blur(100px)", "blur(80px)"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        background:
          "radial-gradient(circle at 70% 70%, rgba(236,72,153,0.18) 0%, rgba(168,85,247,0.18) 60%, rgba(139,92,246,0.10) 100%)",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#e0e7ff]/60">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#f5f3ff] flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#a78bfa" />
              <path d="M9 14h10M14 9v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-[#7c3aed] tracking-tight">ARO</span>
        </div>
        {/* Navigation */}
        <nav className="flex flex-wrap gap-8 text-[#6B7280] font-medium text-base">
          <a href="#features" className="hover:text-[#a78bfa] transition">Features</a>
          <a href="#pricing" className="hover:text-[#a78bfa] transition">Pricing</a>
          <a href="#testimonials" className="hover:text-[#a78bfa] transition">Testimonials</a>
          <a href="#about" className="hover:text-[#a78bfa] transition">About</a>
          <a href="#contact" className="hover:text-[#a78bfa] transition">Contact</a>
        </nav>
        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#7c3aed] transition">
            <FaTwitter size={22} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#7c3aed] transition">
            <FaGithub size={22} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-[#a78bfa] hover:text-[#7c3aed] transition">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
      {/* Copyright */}
      <div className="mt-8 text-center text-[#a1a1aa] text-sm font-medium opacity-80">
        &copy; {new Date().getFullYear()} ARO. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;