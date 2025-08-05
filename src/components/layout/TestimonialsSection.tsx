import { motion } from "framer-motion";

// Dummy avatars (replace with your own images)
const AVATAR1 = "https://randomuser.me/api/portraits/men/32.jpg";
const AVATAR2 = "https://randomuser.me/api/portraits/men/45.jpg";
const AVATAR3 = "https://randomuser.me/api/portraits/men/64.jpg";

const testimonials = [
  {
    name: "User Name",
    job: "Job title",
    avatar: AVATAR1,
    text: "Thet toiet band lorm wntro ctra you freenatuc tid trte yloes! Verthuen andte une huolo ontes.",
    stars: 4,
    tag: {
      text: "Uclit A fanne\nRetobcots",
      avatar: AVATAR1,
    },
    gradient: "from-[#e0c3fc] via-[#8ec5fc] to-[#e0c3fc]",
    button: "Snn Arhertens",
  },
  {
    name: "Testimonials†",
    job: "",
    avatar: AVATAR2,
    text: "Youb sethe doirsta tarolt tnel caioen and heanot auste mr oxtio tho hred ediond sonatic stunin yo oarties.",
    stars: 5,
    tag: {
      text: "Pestwiche",
      avatar: AVATAR2,
    },
    gradient: "from-[#fbc2eb] via-[#fcb69f] to-[#a1c4fd]",
    button: "GarSlwoters",
    center: true,
  },
  {
    name: "Job Title",
    job: "Job title",
    avatar: AVATAR3,
    text: "You riciUta you tteet trnuto sheat, oos wtrsthat thera! qflcmntsliden fedop in peaf any your eterun?",
    stars: 4,
    tag: {
      text: "1eaonts",
      avatar: AVATAR3,
    },
    gradient: "from-[#a1c4fd] via-[#c2e9fb] to-[#fbc2eb]",
    button: "Snot Arhertone",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, delay: i * 0.12 },
  }),
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg width={24} height={24} fill="none">
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      fill={filled ? "#a78bfa" : "none"}
      stroke="#a78bfa"
      strokeWidth={filled ? 0 : 1.5}
    />
  </svg>
);

const TestimonialsSection = () => (
  <section className="relative py-32 bg-[#F6F7FA] overflow-hidden">
    {/* Big heading */}
    <div className="relative z-10 mb-24">
      <h2
        className="text-[5rem] md:text-[7rem] font-serif font-bold text-center text-[#18181b] leading-none tracking-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Testimonials
        <span className="inline-block align-super text-base font-sans ml-2 border border-[#18181b] rounded-full px-2">92</span>
      </h2>
    </div>
    {/* Cards */}
    <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12 max-w-6xl mx-auto px-6">
      {testimonials.map((t, idx) => (
        <motion.div
          key={idx}
          custom={idx}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={`
            relative flex flex-col items-center w-full max-w-sm mx-auto
            ${t.center ? "scale-105 z-20" : "scale-95 z-10"}
            transition-all duration-300
          `}
        >
          {/* Blob background */}
          <motion.div
            className={`
              absolute -inset-6 z-0 rounded-[2.5rem] blur-2xl opacity-90
              pointer-events-none
              bg-gradient-to-br ${t.gradient}
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
            className={`
              relative z-10 w-full rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-[#e0e7ff] shadow-xl px-8 py-12 flex flex-col items-center
              ${t.center ? "py-16 px-10" : ""}
            `}
            style={{
              boxShadow: "0 8px 48px 0 rgba(168,85,247,0.10), 0 0 0 2px #E0E7FF",
              background: "linear-gradient(135deg,rgba(255,255,255,0.85) 60%,rgba(196,181,253,0.13) 100%)",
            }}
          >
            {/* Avatar */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            {/* Tag bubble */}
            <div className={`absolute -top-6 ${t.center ? "left-1/4" : idx === 0 ? "left-0" : "right-0"} flex items-center gap-2`}>
              <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow border border-[#e0e7ff] text-xs font-semibold">
                {t.tag.avatar && (
                  <img src={t.tag.avatar} alt="" className="w-6 h-6 rounded-full mr-2" />
                )}
                <span className="whitespace-pre-line">{t.tag.text}</span>
              </div>
            </div>
            {/* Name & job */}
            <div className="mt-16 mb-2 flex items-center justify-between w-full">
              <span className="text-xs text-[#a1a1aa] font-semibold">{t.center ? "" : "name"}</span>
              <span className="text-xs text-[#a1a1aa] font-semibold">{t.job}</span>
            </div>
            {/* Title */}
            <div className={`text-3xl md:text-4xl font-serif font-bold text-center text-[#18181b] mb-4 ${t.center ? "mt-2" : ""}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.name}
            </div>
            {/* Text */}
            <div className="text-[#6B7280] text-base text-center mb-8 font-medium opacity-80">
              {t.text}
            </div>
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} filled={n <= t.stars} />
              ))}
            </div>
            {/* Button */}
            <button
              className={`
                px-7 py-2 rounded-full font-semibold text-[#7c3aed] bg-white/80 border border-[#e0e7ff] shadow
                hover:bg-gradient-to-r hover:from-[#a78bfa] hover:to-[#f472b6] hover:text-white transition
              `}
            >
              {t.button}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;