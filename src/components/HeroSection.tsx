import { motion } from "framer-motion";
import heroImage from "@/assets/photos/hero-formal.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();
  const isVietnamese = language === "vi";

  return (
    <section className="bg-background px-3 pb-6 pt-[4.9rem] sm:px-5 sm:pt-[5.75rem] md:pb-12 md:pt-[7rem]">
      <div className="mx-auto grid max-w-[1360px] overflow-hidden rounded-[24px] border border-primary/10 bg-[#fffaf2] shadow-[0_18px_55px_rgba(56,22,25,0.11)] sm:rounded-[28px] lg:min-h-[620px] lg:grid-cols-[0.88fr_1.12fr] lg:rounded-[36px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.015 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[min(44svh,420px)] min-h-[310px] overflow-hidden bg-[#eee9e8] sm:h-[min(52svh,490px)] sm:min-h-0 lg:order-2 lg:h-auto"
        >
          <img
            src={heroImage}
            alt={isVietnamese ? "Nam và Linh trong lễ phục cưới" : "Nam and Linh in their wedding attire"}
            className="h-full w-full object-cover object-[50%_28%]"
            width={1200}
            height={1800}
            fetchPriority="high"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 to-transparent" />
          <p className="absolute bottom-4 right-5 font-sans text-[0.56rem] uppercase tracking-[0.24em] text-white/90 drop-shadow-md">Việt Nam · 11.2026</p>
        </motion.div>

        <div className="relative flex items-center bg-[#651827] px-5 py-7 text-[#fff8ee] sm:px-9 sm:py-10 lg:order-1 lg:px-[clamp(2.5rem,4vw,4rem)] lg:py-12">
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#d5a05c]/10 blur-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            className="relative w-full max-w-xl"
          >
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e4bc72]/45 font-serif text-xs text-[#e4bc72]">N&amp;L</div>
              <p className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-[#e4bc72]">{isVietnamese ? "Lễ Thành Hôn" : "The Wedding Of"}</p>
            </div>

            <h1 className="whitespace-nowrap font-serif text-[clamp(2.8rem,15vw,3.35rem)] font-light leading-[0.92] sm:text-[4.1rem] lg:text-[4.5rem] xl:text-[5.25rem]">
              Nam <span className="text-[#e4bc72]">&amp;</span> Linh
            </h1>
            <p className="mt-5 max-w-md font-serif text-lg font-light italic leading-7 text-[#fff8ee]/72 sm:text-xl">
              {isVietnamese ? "Hai thành phố, hai ngày vui, một hành trình trọn đời." : "Two cities, two celebrations, one life together."}
            </p>

            <div className="mt-7 border-y border-[#fff8ee]/16">
              <a href="#events" className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-3.5">
                <span className="font-sans text-[0.56rem] uppercase tracking-[0.14em] text-[#e4bc72] sm:text-[0.6rem] sm:tracking-[0.19em]">22 · 11 · 2026</span>
                <span className="whitespace-nowrap font-serif text-[0.95rem] text-[#fff8ee] transition-colors group-hover:text-[#e4bc72] sm:text-lg">Nam Định · 09:30</span>
              </a>
              <a href="#events" className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-[#fff8ee]/16 py-3.5">
                <span className="font-sans text-[0.56rem] uppercase tracking-[0.14em] text-[#e4bc72] sm:text-[0.6rem] sm:tracking-[0.19em]">28 · 11 · 2026</span>
                <span className="whitespace-nowrap font-serif text-[0.95rem] text-[#fff8ee] transition-colors group-hover:text-[#e4bc72] sm:text-lg">Huế · 11:00</span>
              </a>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:gap-3">
              <a href="#rsvp" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#e4bc72] px-3 font-sans text-[0.58rem] font-medium uppercase tracking-[0.16em] text-[#54111e] transition-colors hover:bg-[#f1d18e] sm:px-6 sm:text-[0.62rem] sm:tracking-[0.2em]">{isVietnamese ? "Xác nhận" : "RSVP"}</a>
              <a href="#story" className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#fff8ee]/28 px-3 font-sans text-[0.58rem] uppercase tracking-[0.14em] text-[#fff8ee] transition-colors hover:border-[#e4bc72] hover:text-[#e4bc72] sm:px-6 sm:text-[0.62rem] sm:tracking-[0.18em]">{isVietnamese ? "Hành trình" : "Our journey"}</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
