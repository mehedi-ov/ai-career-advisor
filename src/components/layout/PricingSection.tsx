import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineLightningBolt,
  HiOutlineSparkles,
} from "react-icons/hi";

const plans = [
  {
    name: "Free",
    icon: <HiOutlineUser className="w-8 h-8 text-[#a78bfa]" />,
    price: { monthly: "$0", yearly: "$0" },
    title: "Start learning for free",
    features: [
      "Basic roadmap builder",
      "Access to public roadmaps",
      "Save up to 2 roadmaps",
      "Community support",
    ],
    button: {
      text: "Get Started",
      color: "from-[#7F9CF5] to-[#A78BFA]",
    },
    blob: "bg-[#e0c3fc]/60",
    label: "",
    labelColor: "",
    foot: "For individuals exploring careers",
  },
  {
    name: "Pro",
    icon: <HiOutlineLightningBolt className="w-8 h-8 text-[#f472b6]" />,
    price: { monthly: "$9", yearly: "$90" },
    title: "Unlock all Pro features",
    features: [
      "Unlimited roadmaps",
      "Private roadmap sharing",
      "Priority support",
      "Export as PDF/PNG",
      "Early access to new features",
    ],
    button: {
      text: "Get Started",
      color: "from-[#7F9CF5] to-[#A78BFA]",
    },
    blob: "bg-[#fbc2eb]/60",
    label: "",
    labelColor: "",
    foot: "For serious learners & professionals",
  },
  {
    name: "AI Career",
    icon: <HiOutlineSparkles className="w-8 h-8 text-[#a78bfa]" />,
    price: { monthly: "$19", yearly: "$190" },
    title: "AI-powered career guidance",
    features: [
      "Everything in Pro",
      "AI career advisor",
      "Personalized skill gap analysis",
      "AI-powered interview practice",
      "1-on-1 AI chat support",
    ],
    button: {
      text: "Get Started",
      color: "from-[#a78bfa] to-[#f472b6]",
    },
    blob: "bg-[#c2e9fb]/60",
    label: "AI Career",
    labelColor: "bg-gradient-to-r from-[#a78bfa] to-[#7F9CF5]",
    foot: "For ambitious career builders",
  },
  // You can add the Team plan back if you want, just make sure the icon is imported and used.
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 80, delay: i * 0.12 },
  }),
};

const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="relative py-24 sm:py-32 bg-[#F6F7FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-5xl font-bold text-center text-[#1F2937] mb-12">
          Pricing Plans
        </h2>
        {/* Toggle */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex bg-white/70 rounded-full p-1 shadow-inner border border-[#e0e7ff]">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                billing === "monthly"
                  ? "bg-gradient-to-r from-[#a78bfa] to-[#f472b6] text-white shadow"
                  : "text-[#7c3aed]"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                billing === "yearly"
                  ? "bg-gradient-to-r from-[#a78bfa] to-[#f472b6] text-white shadow"
                  : "text-[#7c3aed]"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        {/* Cards */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-10">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants as any}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.045,
                boxShadow:
                  "0 12px 64px 0 rgba(168,85,247,0.18), 0 0 0 6px #a78bfa33",
              }}
              className="relative flex flex-col items-center w-full max-w-xs mx-auto transition-all duration-300"
            >
              {/* Blob background */}
              <motion.div
                className={`
                  absolute -inset-4 z-0 rounded-[2.5rem] blur-2xl opacity-90
                  pointer-events-none ${plan.blob}
                `}
                initial={{ opacity: 0.7, scale: 0.95 }}
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 6 + idx,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              {/* Card */}
              <div
                className="relative z-10 w-full rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-[#e0e7ff] shadow-xl px-8 py-12 flex flex-col items-center"
                style={{
                  boxShadow: "0 8px 48px 0 rgba(168,85,247,0.10), 0 0 0 2px #E0E7FF",
                  background: "linear-gradient(135deg,rgba(255,255,255,0.85) 60%,rgba(196,181,253,0.13) 100%)",
                }}
              >
                {/* Plan label */}
                {plan.label && (
                  <motion.div
                    className={`absolute -top-5 right-6 px-5 py-2 rounded-full text-xs font-bold text-white shadow-lg ${plan.labelColor}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: "spring" }}
                  >
                    {plan.label}
                  </motion.div>
                )}
                {/* Icon */}
                <div className="mb-4">{plan.icon}</div>
                {/* Price */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl font-extrabold text-[#222] mb-2 tracking-tight"
                  >
                    {plan.price[billing]}
                    <span className="text-base font-medium text-[#6B7280] ml-1">
                      {plan.name === "Free" ? "" : billing === "monthly" ? "/mo" : "/yr"}
                    </span>
                  </motion.div>
                </AnimatePresence>
                {/* Title */}
                <div className="text-base font-medium text-[#6B7280] mb-6 text-center">
                  {plan.title}
                </div>
                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 w-full">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3 text-[#7c3aed] text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, type: "spring" }}
                    >
                      <span className="inline-block w-5 h-5 rounded-md border-2 border-[#a78bfa] bg-white/60 flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#a78bfa] opacity-70" />
                      </span>
                      <span className="opacity-80">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                {/* Button */}
                <motion.button
                  whileHover={{
                    scale: 1.07,
                    background:
                      plan.button.color === "from-[#a78bfa] to-[#f472b6]"
                        ? "linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)"
                        : undefined,
                    boxShadow: "0 4px 24px 0 rgba(139,92,246,0.22)",
                  }}
                  className={`
                    w-full py-3 rounded-full font-semibold text-white
                    bg-gradient-to-r ${plan.button.color} shadow-lg
                    hover:scale-105 transition
                  `}
                  style={{
                    boxShadow: "0 4px 24px 0 rgba(139,92,246,0.18)",
                  }}
                >
                  {plan.button.text}
                </motion.button>
              </div>
              {/* Plan foot */}
              <div className="mt-6 text-center text-[#6B7280] text-xs font-medium tracking-wide opacity-80">
                {plan.foot}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;