import { motion } from "framer-motion";
import { HiOutlineUser, HiOutlineLightningBolt, HiOutlineSparkles } from "react-icons/hi";

const steps = [
  {
    title: "Choose Goal",
    description: "Select your career goal. Our AI will help you align your path.",
    icon: <HiOutlineUser className="w-10 h-10 text-[#a78bfa]" />,
    button: "Get Started",
  },
  {
    title: "Build Roadmap",
    description: "Visually build your learning roadmap with our interactive tool.",
    icon: <HiOutlineLightningBolt className="w-10 h-10 text-[#f472b6]" />,
    button: "Get Started",
  },
  {
    title: "Get AI Suggestions",
    description: "Receive personalized AI suggestions for your next steps.",
    icon: <HiOutlineSparkles className="w-10 h-10 text-[#a78bfa]" />,
    button: "Get Started",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};
const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
};

const AnimatedBackground = () => (
  <>
    {/* Animated gradient blobs */}
    <motion.div
      className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full z-0"
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
      className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full z-0"
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

    {/* Animated glowing roadmap lines */}
    <svg
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      width="100%" height="100%" viewBox="0 0 1440 400" fill="none"
      style={{ opacity: 0.35 }}
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="roadmap1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="roadmap2" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#7F9CF5" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 100 350 Q 400 200 720 300 Q 1100 400 1340 120"
        stroke="url(#roadmap1)"
        strokeWidth="5"
        filter="url(#glow)"
        fill="none"
        initial={{ pathLength: 0.7 }}
        animate={{ pathLength: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M 200 380 Q 600 250 900 350 Q 1200 450 1440 200"
        stroke="url(#roadmap2)"
        strokeWidth="4"
        filter="url(#glow)"
        fill="none"
        initial={{ pathLength: 0.5 }}
        animate={{ pathLength: [0.5, 1, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>

    {/* Animated particles */}
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full z-0 pointer-events-none"
        style={{
          width: `${12 + (i % 4) * 8}px`,
          height: `${12 + (i % 4) * 8}px`,
          background: `linear-gradient(135deg, #a78bfa88 0%, #f472b688 100%)`,
          top: `${10 + (i * 5) % 80}%`,
          left: `${(i * 53) % 100}%`,
          filter: "blur(1.5px)",
        }}
        initial={{ y: 0, opacity: 0.7 }}
        animate={{
          y: [0, -20 - (i % 3) * 10, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4 + (i % 5),
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.3,
          ease: "easeInOut",
        }}
      />
    ))}
  </>
);

const HowItWorksSection = () => (
  <section className="relative py-24 sm:py-32 bg-[#F8F6FF] overflow-hidden">
    <AnimatedBackground />
    <div className="max-w-screen-xl mx-auto px-6 relative z-10">
      <h2 className="text-5xl font-bold text-center text-[#1F2937] mb-20">
        How It Works
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 relative"
      >
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={stepVariants}
            whileHover={{
              y: -12,
              boxShadow:
                "0 8px 48px 0 rgba(168,85,247,0.18), 0 0 0 4px #a78bfa44",
            }}
            className={`
              relative flex flex-col items-center bg-white/60
              rounded-2xl
              shadow-[0_8px_32px_0_rgba(139,92,246,0.10)]
              px-8 py-10
              backdrop-blur-xl
              transition-all duration-300
              w-full md:w-[320px] max-w-[320px] mx-auto
              mb-12 md:mb-0
              ${idx !== steps.length - 1 ? "md:mr-12" : ""}
            `}
            style={{
              boxShadow:
                "0 4px 32px 0 rgba(139,92,246,0.10), 0 0 0 2px #E0E7FF",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.65) 60%, rgba(196,181,253,0.13) 100%)",
            }}
          >
            {/* Floating icon */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-[#a78bfa] via-[#f472b6] to-[#3b82f6] flex items-center justify-center shadow-xl border-4 border-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.15, type: "spring", stiffness: 120 }}
              whileHover={{
                scale: 1.12,
                boxShadow: "0 8px 32px 0 rgba(168,85,247,0.22)",
              }}
            >
              <span className="text-white text-4xl">{step.icon}</span>
            </motion.div>
            {/* Step number below icon */}
            <div className="mt-12 mb-2 text-sm font-bold text-[#a78bfa] tracking-widest opacity-80">
              STEP {idx + 1}
            </div>
            <h3 className="text-xl font-extrabold text-[#7c3aed] mb-2 text-center">{step.title}</h3>
            <p className="text-[#6B7280] text-base text-center mb-6">{step.description}</p>
            <motion.button
              whileHover={{
                scale: 1.07,
                background:
                  "linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)",
                boxShadow: "0 4px 24px 0 rgba(168,85,247,0.22)",
              }}
              className="px-8 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-[#a78bfa] to-[#f472b6] shadow-lg transition"
              style={{
                boxShadow: "0 4px 24px 0 rgba(139,92,246,0.18)",
              }}
            >
              {step.button}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default HowItWorksSection;