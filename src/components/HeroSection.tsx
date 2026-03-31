import { motion } from "framer-motion";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding couple in Vietnam"
          className="w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-primary-foreground/80 mb-6 font-sans"
        >
          We're getting married
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-5xl md:text-8xl lg:text-9xl font-light text-primary-foreground tracking-wide mb-6"
        >
          Anh & Bình
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="w-16 h-px bg-primary-foreground/40" />
          <p className="font-serif text-lg md:text-xl text-primary-foreground/90 italic">
            December 28, 2026
          </p>
          <div className="w-16 h-px bg-primary-foreground/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xs md:text-sm tracking-[0.25em] uppercase text-primary-foreground/70 font-sans"
        >
          Đà Lạt, Vietnam
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
