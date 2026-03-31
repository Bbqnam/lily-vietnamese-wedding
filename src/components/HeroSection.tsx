import { motion } from "framer-motion";
import WeddingLogo from "./WeddingLogo";
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="mb-10"
        >
          <WeddingLogo size="large" showText={false} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-wide mb-10"
        >
          Nam & Linh
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="space-y-2 mb-10"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-primary-foreground/40" />
            <p className="font-serif text-base md:text-lg text-primary-foreground/90 italic">
              22 November 2026 — Nam Định
            </p>
            <div className="w-12 h-px bg-primary-foreground/40" />
          </div>
          <p className="font-serif text-base md:text-lg text-primary-foreground/90 italic">
            25 November 2026 — Huế
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-sm text-primary-foreground/80 font-sans max-w-md mx-auto leading-relaxed"
        >
          We are so happy to celebrate our wedding in Vietnam with the people we love.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-primary-foreground/40 mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
