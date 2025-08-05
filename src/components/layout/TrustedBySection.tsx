import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaCheckCircle, FaRobot, FaMagic } from "react-icons/fa";

const logos = [
  { src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", alt: "Google" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", alt: "Netflix" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", alt: "Microsoft" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_GitHub.svg", alt: "GitHub" },
  { src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Tesla_Motors.svg", alt: "Tesla" },
];

const TrustedBySection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section className="relative py-24 bg-transparent" ref={ref}>
      {/* Parallax blobs */}
      <motion.div
        className="absolute left-1/4 top-0 w-[300px] h-[120px] rounded-full z-0"
        style={{ y }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.5, 0.7, 0.5],
          filter: ["blur(60px)", "blur(80px)", "blur(60px)"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.13) 0%, rgba(139,92,246,0.18) 60%, rgba(139,92,246,0.10) 100%)",
        }}
      />
      <motion.div
        className="absolute right-1/4 bottom-0 w-[300px] h-[120px] rounded-full z-0"
        style={{ y: y }}
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.5, 0.7, 0.5],
          filter: ["blur(60px)", "blur(80px)", "blur(60px)"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(236,72,153,0.13) 0%, rgba(168,85,247,0.13) 60%, rgba(139,92,246,0.08) 100%)",
        }}
      />
      {/* Animated icons */}
      <motion.div
        className="absolute left-10 top-10 text-[#a78bfa] z-10"
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaCheckCircle size={32} />
      </motion.div>
      <motion.div
        className="absolute right-10 top-16 text-[#f472b6] z-10"
        animate={{ y: [0, -20, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaRobot size={32} />
      </motion.div>
      <motion.div
        className="absolute left-1/2 bottom-0 text-[#7F9CF5] z-10"
        animate={{ y: [0, 15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaMagic size={32} />
      </motion.div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="rounded-2xl bg-white/60 backdrop-blur-xl border border-[#e0e7ff] shadow-lg px-8 py-10 flex flex-col items-center">
          <div className="text-[#7c3aed] font-semibold text-lg mb-6 tracking-wide">Trusted by teams at</div>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {logos.map((logo, idx) => (
              <motion.img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-10 w-auto grayscale hover:grayscale-0 transition"
                style={{ maxWidth: 120 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 12px #a78bfa88)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;