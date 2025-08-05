import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const CTABanner = () => (
  <section className="relative py-20 bg-transparent">
    {/* Parallax blob */}
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[180px] rounded-full z-0"
      initial={{ scale: 0.95, opacity: 0.7 }}
      animate={{
        scale: [0.95, 1.05, 0.95],
        opacity: [0.7, 0.9, 0.7],
        filter: ["blur(60px)", "blur(80px)", "blur(60px)"],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(168,85,247,0.13) 0%, rgba(139,92,246,0.18) 60%, rgba(139,92,246,0.10) 100%)",
      }}
    />
    <div className="relative z-10 max-w-2xl mx-auto px-6">
      <motion.div
        className="rounded-2xl bg-white/70 backdrop-blur-xl border border-[#e0e7ff] shadow-lg px-10 py-12 flex flex-col items-center relative overflow-hidden"
        whileHover={{ scale: 1.02, boxShadow: "0 0 32px #a78bfa" }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: "conic-gradient(from 90deg at 50% 50%, #a78bfa, #f472b6, #7F9CF5, #a78bfa)",
            opacity: 0.18,
            zIndex: 1,
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        />
        {/* Floating icon */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#a78bfa] to-[#f472b6] w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaRocket className="text-white text-3xl" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1F2937] mb-6 mt-8 z-10">
          Start Building Your AI Roadmap Today
        </h2>
        <motion.a
          whileHover={{ scale: 1.09, boxShadow: "0 0 32px #a78bfa" }}
          href="#"
          className="px-10 py-4 rounded-full font-bold text-white text-lg bg-gradient-to-r from-[#a78bfa] to-[#f472b6] shadow-lg transition z-10"
          style={{
            boxShadow: "0 4px 24px 0 rgba(139,92,246,0.18)",
          }}
        >
          Get Started
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default CTABanner;