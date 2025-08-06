import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";

const ProductPreviewSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section className="relative py-32 bg-[#F8F6FF] overflow-hidden" ref={ref}>
      {/* Parallax blob */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full z-0"
        style={{
          y,
          background:
            "radial-gradient(ellipse at center, rgba(168,85,247,0.13) 0%, rgba(139,92,246,0.18) 60%, rgba(139,92,246,0.10) 100%)",
        }}
        initial={{ scale: 0.95, opacity: 0.7 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.7, 0.9, 0.7],
          filter: ["blur(80px)", "blur(100px)", "blur(80px)"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1F2937] mb-10">
          See AI Roadmap Builder in Action
        </h2>
        {/* Mockup with tilt on hover */}
        <motion.div
          whileHover={{ rotateY: 6, scale: 1.03 }}
          className="relative w-full max-w-3xl rounded-3xl shadow-2xl border border-[#e0e7ff] bg-white/70 backdrop-blur-xl overflow-hidden"
        >
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/60 border-b border-[#e0e7ff]">
            <span className="w-3 h-3 rounded-full bg-[#f472b6]" />
            <span className="w-3 h-3 rounded-full bg-[#fbbf24]" />
            <span className="w-3 h-3 rounded-full bg-[#34d399]" />
            <span className="ml-4 text-xs text-[#a1a1aa]">ai-roadmap.app/demo</span>
          </div>
          {/* Product image or animated preview */}
          <div className="bg-gradient-to-br from-[#f3e8ff] via-[#fbc2eb] to-[#a1c4fd] p-8 min-h-[340px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <HiOutlineLightningBolt className="w-16 h-16 text-[#a78bfa] mb-4 animate-pulse" />
              <div className="text-2xl font-bold text-[#7c3aed] mb-2">Drag, Drop & Build Your AI Roadmap</div>
              <div className="text-[#6B7280] text-base text-center max-w-md">
                Experience the real product: interactive, visual, and powered by AI. <br />
                (Replace this with a real screenshot or animated GIF for best results!)
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPreviewSection;