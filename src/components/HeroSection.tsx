import { motion } from "framer-motion";
import heroImage from "@/assets/photos/hero-formal.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();
  return (
    <section className="relative bg-background px-4 pb-5 pt-[6.5rem] md:min-h-screen md:px-8 md:pb-8 md:pt-[7.5rem]">
      <div className="mx-auto grid max-w-[1540px] overflow-hidden rounded-[26px] border border-primary/15 shadow-[0_30px_90px_rgba(56,22,25,0.2)] md:rounded-[38px] lg:h-[clamp(650px,calc(100svh-9.5rem),820px)] lg:grid-cols-[minmax(440px,0.9fr)_minmax(0,1.1fr)]">
        <div className="relative order-2 flex overflow-hidden bg-[#651827] px-7 py-10 text-center text-[#fff8ee] sm:px-10 sm:py-12 lg:order-1 lg:items-center lg:px-[clamp(2.75rem,4vw,4.5rem)] lg:py-12 lg:text-left">
          <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-[#b97b43]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-[-8rem] h-96 w-96 rounded-full border border-[#e4bc72]/15" />
          <div className="pointer-events-none absolute -bottom-44 right-[-5rem] h-96 w-96 rounded-full border border-[#e4bc72]/10" />

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25 }} className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-xl">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#e4bc72]/45 font-serif text-sm tracking-tight text-[#e4bc72] lg:mx-0">N&amp;L</div>
            <p className="font-sans text-[0.64rem] uppercase tracking-[0.32em] text-[#e4bc72] sm:text-[0.68rem] sm:tracking-[0.38em]">{language === "vi" ? "Lễ Thành Hôn" : "The Wedding Of"}</p>
            <h1 className="mt-4 whitespace-nowrap font-serif text-[3.15rem] font-light leading-none text-[#fff8ee] sm:text-[4.25rem] lg:text-[3.65rem] xl:text-[4.5rem] 2xl:text-[5.25rem]">Nam <span className="text-[#e4bc72]">&amp;</span> Linh</h1>
            <p className="mx-auto mt-5 max-w-lg font-serif text-lg font-light italic leading-7 text-[#fff8ee]/72 sm:text-xl sm:leading-8 lg:mx-0 lg:max-w-md xl:text-2xl">{language === "vi" ? "Hai thành phố, hai ngày vui, một hành trình trọn đời." : "Two cities, two celebrations, one life together."}</p>

            <div className="mt-7 grid gap-3 text-left sm:grid-cols-2">
              <a href="#events" className="rounded-2xl border border-[#fff8ee]/16 bg-black/10 px-4 py-3.5 transition-colors hover:border-[#e4bc72]/55 hover:bg-black/15">
                <span className="block font-sans text-[0.58rem] uppercase tracking-[0.2em] text-[#e4bc72]">22 · 11 · 2026</span>
                <span className="mt-1 block whitespace-nowrap font-serif text-base text-[#fff8ee] xl:text-lg">Nam Định · 09:30</span>
              </a>
              <a href="#events" className="rounded-2xl border border-[#fff8ee]/16 bg-black/10 px-4 py-3.5 transition-colors hover:border-[#e4bc72]/55 hover:bg-black/15">
                <span className="block font-sans text-[0.58rem] uppercase tracking-[0.2em] text-[#e4bc72]">28 · 11 · 2026</span>
                <span className="mt-1 block whitespace-nowrap font-serif text-base text-[#fff8ee] xl:text-lg">Huế · 11:00</span>
              </a>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a href="#rsvp" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-[#e4bc72] px-5 font-sans text-[0.63rem] font-medium uppercase tracking-[0.2em] text-[#54111e] shadow-[0_14px_32px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#f1d18e]">{language === "vi" ? "Xác nhận" : "RSVP"}</a>
              <a href="#story" className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#fff8ee]/30 px-5 font-sans text-[0.63rem] uppercase tracking-[0.19em] text-[#fff8ee] transition-colors hover:border-[#e4bc72] hover:text-[#e4bc72]">{language === "vi" ? "Câu chuyện" : "Our story"}</a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} className="relative order-1 h-[clamp(430px,62svh,590px)] overflow-hidden bg-[#f0ecef] lg:order-2 lg:h-full lg:min-h-0">
          <img src={heroImage} alt="Nam and Linh in their wedding attire" className="h-full w-full object-cover object-[50%_30%]" width={1200} height={1800} fetchPriority="high" decoding="async" />
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#651827]/20 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/18 to-transparent" />
          <p className="absolute bottom-5 right-6 font-sans text-[0.6rem] uppercase tracking-[0.26em] text-white/90 drop-shadow-md">Vietnam · November 2026</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
