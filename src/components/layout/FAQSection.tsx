
import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HiChevronDown, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import Lottie from "lottie-react";
import aiBrain from "@/assets/ai-brain.json";  // Use a neural net/brain Lottie

const faqs = [
  { q: "What is AI Roadmap Builder?", a: "It's an AI-powered platform to help you plan, build, and track your career or learning journey with interactive roadmaps and smart suggestions." },
  { q: "Is there a free plan?", a: "Yes! You can start for free and upgrade anytime for more features." },
  { q: "Can I share my roadmaps?", a: "Absolutely. You can share public or private links, and export as images or PDFs." },
  { q: "How does the AI advisor work?", a: "Our AI analyzes your skills, goals, and interests to suggest personalized career paths and learning resources." },
];

const FloatingQuestions = () => (
  <>
    {[...Array(7)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute z-0 pointer-events-none"
        style={{
          left: `${10 + (i * 12) % 80}%`,
          top: `${10 + (i * 17) % 70}%`,
        }}
        animate={{
          y: [0, 20 + (i % 2) * 10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 6 + (i % 3),
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      >
        <HiOutlineQuestionMarkCircle className="w-8 h-8 text-[#a78bfa] opacity-60 drop-shadow-lg" />
      </motion.div>
    ))}
  </>
);

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  // Parallax effect for Lottie
  const { scrollY } = useScroll();
  const lottieY = useTransform(scrollY, [0, 800], [0, 60]);

  return (
    <section className="relative py-32 bg-[#F8F6FF] overflow-hidden" id="faq">
      {/* Animated AI brain, parallax, glowing */}
      <motion.div
        className="absolute left-1/2 top-36 -translate-x-1/2 z-0 pointer-events-none"
        style={{
          y: lottieY,
          filter: "drop-shadow(0 8px 32px #a78bfa88)",
        }}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Lottie
          animationData={aiBrain}
          loop={true}
          style={{
            width: 320,
            height: 320,
            opacity: 0.7,
            margin: "0 auto",
          }}
        />
      </motion.div>
      {/* Floating question icons */}
      <FloatingQuestions />
      {/* Glassy glowing panel behind FAQ */}
      <motion.div
        className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[320px] rounded-3xl z-0"
        animate={{ scale: [1, 1.04, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.13) 0%, rgba(139,92,246,0.10) 100%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Optional: Floating AI assistant */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-lg border border-[#e0e7ff]">
          <img src="/ai-bot.png" alt="AI Bot" className="w-8 h-8 rounded-full" />
          <span className="text-[#7c3aed] font-semibold">Need help?</span>
        </div>
      </motion.div>
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="text-4xl md:text-5xl font-bold text-center text-[#1F2937] mb-12"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl bg-white/80 backdrop-blur-xl border border-[#e0e7ff] shadow px-6 py-5"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #a78bfa22" }}
            >
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="text-lg font-semibold text-[#7c3aed] flex items-center gap-2">
                  <HiOutlineQuestionMarkCircle className="w-6 h-6 text-[#a78bfa]" />
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === idx ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <HiChevronDown className="w-6 h-6 text-[#a78bfa] transition-transform duration-300" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 text-[#6B7280] text-base">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
            
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;