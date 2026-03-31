import { motion } from "framer-motion";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding scene in Vietnam"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide mb-14"
        >
          Nam & Linh
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="space-y-3 mb-14"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-px bg-white/40" />
            <p className="font-serif text-base md:text-lg text-white/90 italic">
              22 November 2026 — Nam Định
            </p>
            <div className="w-10 h-px bg-white/40" />
          </div>
          <p className="font-serif text-base md:text-lg text-white/90 italic">
            25 November 2026 — Huế
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="text-sm text-white/75 font-sans max-w-md mx-auto leading-relaxed"
        >
          We are so happy to celebrate our wedding in Vietnam with the people we love.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-white/30 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
