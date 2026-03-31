import { motion } from "framer-motion";
import heroImage from "@/assets/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden px-6 pt-24 md:px-8 md:pt-28">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding scene in Vietnam"
          className="h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18120e]/56 via-[#18120e]/28 to-[#18120e]/64" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[76vh] w-full max-w-6xl flex-col justify-between pb-10 pt-2 md:min-h-[80vh] md:pb-14">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="pt-1 text-center font-serif text-[4rem] font-light leading-[0.9] tracking-[0.03em] text-white sm:text-[4.6rem] md:pt-0 md:text-[5.6rem] lg:text-[6.2rem]"
        >
          Linh &amp; Nam
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="mt-10 md:mt-14"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-12 w-px bg-white/45"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
