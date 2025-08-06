import { motion } from "framer-motion";
import {
  UserIcon,
  UserPlusIcon,
  EnvelopeIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";

// Features data
const features = [
  {
    icon: UserIcon,
    title: "Personalized Recommendations",
    description: "Get tailored career advice for your unique path.",
  },
  {
    icon: UserPlusIcon,
    title: "Skill Gap Analysis",
    description: "Identify and bridge your skill gaps with AI insights.",
  },
  {
    icon: EnvelopeIcon,
    title: "Resume Optimization",
    description: "Enhance your resume to stand out to employers.",
  },
  {
    icon: CameraIcon,
    title: "Interview Practice",
    description: "Practice interviews and get instant feedback.",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80 },
  },
};

// 1. Pill-shaped, fewer, thicker, animated height
const PillBlocks = () => {
  const columns = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 flex z-0 pointer-events-none">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          className="basis-[7%] h-full mx-2"
          initial={{ opacity: 0.22, height: "80%" }}
          animate={{
            opacity: [0.22, 0.38, 0.22],
            height: ["80%", "100%", "80%"],
          }}
          transition={{
            duration: 3.5 + i * 0.07,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.07,
          }}
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.18) 20%, rgba(139,92,246,0.10) 80%, transparent 100%)",
            borderRadius: "9999px",
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
};

// 3. Checkerboard pattern (alternating color/opacity)
const CheckerBlocks = () => {
  const columns = Array.from({ length: 20 });
  return (
    <div className="absolute inset-0 flex z-0 pointer-events-none">
      {columns.map((_, i) => (
        <motion.div
          key={i}
          className="flex-1 h-full mx-1"
          initial={{ opacity: 0.18, y: 0 }}
          animate={{
            opacity: [0.18, 0.32, 0.18],
            y: [0, 10 * Math.sin(i), 0],
          }}
          transition={{
            duration: 2.5 + i * 0.05,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.05,
          }}
          style={{
            background:
              i % 2 === 0
                ? "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.22) 20%, rgba(139,92,246,0.12) 80%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.10) 20%, rgba(139,92,246,0.05) 80%, transparent 100%)",
            borderRadius: "1.2rem",
          }}
        />
      ))}
    </div>
  );
};

// You can stack multiple layers for more depth:
const StackedBlocks = () => (
  <>
    <PillBlocks />
    <CheckerBlocks />
    {/* Add or remove layers as you wish */}
  </>
);

// --- COMMENTED OUT unused components to avoid TS errors ---
// const DottedBlocks = () => { ... }
// const DiagonalBlocks = () => { ... }
// const SolidBlocks = () => { ... }

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.04 }}
    className="
      relative
      bg-white/40
      rounded-3xl
      border border-[#C4B5FD]
      shadow-[0_8px_32px_0_rgba(139,92,246,0.18)]
      flex flex-col items-center text-center
      px-8 py-10
      backdrop-blur-xl
      transition-all
      duration-300
      z-10
      "
    style={{
      boxShadow:
        "0 4px 32px 0 rgba(139,92,246,0.18), 0 0 0 2px #C4B5FD",
      border: "1.5px solid #C4B5FD",
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.55) 60%, rgba(196,181,253,0.18) 100%)",
    }}
  >
    <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-[#8B5CF6]" />
    </div>
    <h3 className="text-lg font-bold text-[#8B5CF6] mb-2">{title}</h3>
    <p className="text-[#6B7280] text-base">{description}</p>
  </motion.div>
);

const FeaturesSection = () => (
  <section
    id="features"
    className="relative py-24 sm:py-32 bg-[#F8F6FF] overflow-hidden"
  >
    <StackedBlocks />

    <div className="max-w-screen-xl mx-auto px-6 relative z-10">
      <h2 className="text-5xl font-bold text-center text-[#8B5CF6] mb-16">
        Features Section
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </motion.div>
    </div>
  </section>
);

export default FeaturesSection;