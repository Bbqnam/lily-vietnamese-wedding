import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Pause, Play } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import PhotoLightbox from "./PhotoLightbox";
import { useLanguage } from "@/contexts/LanguageContext";

const moments = [
  { src: "/photos/love-story/01-first-date.jpg", vi: "Buổi hẹn đầu tiên", en: "Our first date", date: "16.04.2023" },
  { src: "/photos/love-story/02-birthday.jpg", vi: "Sinh nhật đầu tiên bên nhau", en: "Our first birthday together", date: "19.05.2023" },
  { src: "/photos/love-story/03-ben-tre.jpg", vi: "Chuyến đi Bến Tre đầu tiên", en: "Our first trip to Bến Tre", date: "02.06.2023" },
  { src: "/photos/love-story/04-da-lat.jpg", vi: "Đà Lạt lần đầu", en: "Our first trip to Đà Lạt", date: "02.09.2023" },
  { src: "/photos/love-story/05-waterfall.jpg", vi: "Măng Đen", en: "Măng Đen", date: "18.11.2023" },
  { src: "/photos/love-story/06-trang-an.jpg", vi: "Tràng An", en: "Tràng An", date: "28.11.2023" },
  { src: "/photos/love-story/07-bali.jpg", vi: "Bali", en: "Bali", date: "09.09.2024" },
  { src: "/photos/love-story/08-phu-yen.jpg", vi: "Phú Yên", en: "Phú Yên", date: "02.05.2025" },
  { src: "/photos/love-story/09-da-nang.jpg", vi: "Hoàng hôn Đà Nẵng", en: "Đà Nẵng at sunset", date: "13.06.2025" },
  { src: "/photos/love-story/10-ha-giang-flag.jpg", vi: "Lá cờ Hà Giang", en: "The Hà Giang flag", date: "16.11.2025" },
  { src: "/photos/love-story/11-duck-helmets.jpg", vi: "Mũ vịt vàng", en: "The yellow duck helmets", date: "16.11.2025" },
  { src: "/photos/love-story/12-dam-ngo.jpg", vi: "Lễ Dạm Ngõ", en: "Our Dạm Ngõ ceremony", date: "09.05.2026" },
  { src: "/photos/love-story/13-tam-chuc.jpg", vi: "Chùa Tam Chúc", en: "Tam Chúc Pagoda", date: "10.05.2026" },
  { src: "/photos/love-story/14-golden-bridge.jpg", vi: "Cầu Vàng, Đà Nẵng", en: "Golden Bridge, Đà Nẵng", date: "12.05.2026" },
  { src: "/photos/love-story/15-she-said-yes.jpg", vi: "Em đồng ý", en: "She said yes", date: "23.05.2026" },
];

const GallerySection = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(() =>
    typeof window === "undefined" || !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );
  const thumbnailsContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const active = moments[activeIndex];
  const activeTitle = language === "vi" ? active.vi : active.en;

  const changeSlide = (nextIndex: number, nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((nextIndex + moments.length) % moments.length);
  };

  const showPreviousSlide = () => changeSlide(activeIndex - 1, -1);
  const showNextSlide = () => changeSlide(activeIndex + 1, 1);

  useEffect(() => {
    if (!isPlaying || selectedIndex !== null) return undefined;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % moments.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [isPlaying, selectedIndex]);

  useEffect(() => {
    const container = thumbnailsContainerRef.current;
    const thumbnail = thumbnailRefs.current[activeIndex];

    if (!container || !thumbnail) return;

    container.scrollTo({
      behavior: "smooth",
      left: thumbnail.offsetLeft - (container.clientWidth - thumbnail.clientWidth) / 2,
    });
  }, [activeIndex]);

  return (
    <section id="gallery" className="overflow-hidden bg-[#f0dfca] py-12 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-5 md:px-6">
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-14">
            <div className="mb-4 flex items-center justify-center gap-4 text-primary">
              <span className="h-px w-10 bg-current/45 md:w-16" />
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.34em]">
                {language === "vi" ? "Khoảnh khắc" : "Our moments"}
              </p>
              <span className="h-px w-10 bg-current/45 md:w-16" />
            </div>
            <h2 className="mx-auto max-w-5xl font-serif text-[2.25rem] font-light leading-[1.02] text-foreground sm:text-5xl sm:leading-[0.95] md:text-7xl">
              {language === "vi"
                ? "Những khoảnh khắc bên nhau"
                : "The moments that brought us here"}
            </h2>
            <div className="mx-auto mt-5 h-1.5 w-1.5 rotate-45 bg-[#b9873e]" />
            <p className="mx-auto mt-5 max-w-xl font-serif text-base italic leading-relaxed text-foreground/65 sm:mt-6 sm:text-lg md:text-xl">
              {language === "vi"
                ? "Từ buổi hẹn đầu tiên đến ngày chúng mình chọn nhau mãi mãi."
                : "From our first date to the day we chose forever."}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div
            className="overflow-hidden rounded-[26px] border border-white/55 bg-[#ead3b9] shadow-[0_24px_70px_rgba(74,38,30,0.18)] md:rounded-[34px]"
            role="region"
            aria-roledescription="carousel"
            aria-label={language === "vi" ? "Bộ ảnh kỷ niệm" : "Memory slideshow"}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") showPreviousSlide();
              if (event.key === "ArrowRight") showNextSlide();
            }}
          >
            <div className="grid md:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.72fr)]">
              <div className="relative h-[54svh] min-h-[350px] max-h-[490px] overflow-hidden bg-[#261714] sm:h-auto sm:min-h-[560px] sm:max-h-none md:min-h-[640px]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={active.src}
                    initial={{ opacity: 0, x: direction * 42 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction * -42 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={active.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                    />
                    <div className="absolute inset-0 bg-black/15" />
                    <button
                      type="button"
                      className="absolute inset-0 z-10 flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                      onClick={() => setSelectedIndex(activeIndex)}
                      aria-label={`${language === "vi" ? "Mở toàn màn hình" : "Open fullscreen"}: ${activeTitle}`}
                    >
                      <img
                        src={active.src}
                        alt={activeTitle}
                        className="h-full w-full object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.26)]"
                      />
                    </button>
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-end bg-gradient-to-t from-black/40 to-transparent p-4 pt-16 md:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-black/20 text-white backdrop-blur-sm">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="relative flex min-h-[245px] flex-col overflow-hidden bg-[#f7ead9] px-5 py-6 text-[#321d17] sm:min-h-[340px] sm:px-8 sm:py-9 md:min-h-full md:px-9 md:py-10">
                <span className="pointer-events-none absolute -right-2 -top-12 font-serif text-[11rem] leading-none text-primary/[0.045] md:text-[13rem]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <span className="font-sans text-[0.6rem] uppercase tracking-[0.26em] text-primary/70">
                    {language === "vi" ? "Kỷ niệm" : "Memory"} {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[0.58rem] tracking-[0.2em] text-foreground/40">
                    {String(activeIndex + 1).padStart(2, "0")} / {moments.length}
                  </span>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${active.src}-caption`}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                    className="relative z-10 my-auto py-6 sm:py-9"
                  >
                    <span className="mb-4 block h-1.5 w-1.5 rotate-45 bg-[#b9873e] sm:mb-6" />
                    <h3 className="font-serif text-[2rem] font-light leading-[1.02] sm:text-5xl sm:leading-[0.98] md:text-5xl">
                      {activeTitle}
                    </h3>
                    <p className="mt-4 font-sans text-[0.62rem] uppercase tracking-[0.24em] text-primary/70 sm:mt-5 sm:text-[0.64rem] sm:tracking-[0.28em]">
                      {active.date}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="relative z-10">
                  <div className="mb-5 flex gap-1" aria-hidden="true">
                    {moments.map((moment, index) => (
                      <span
                        key={moment.src}
                        className={`h-px flex-1 transition-colors duration-300 ${
                          index === activeIndex ? "bg-primary" : "bg-primary/15"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={showPreviousSlide}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-12 sm:w-12"
                      aria-label={language === "vi" ? "Ảnh trước" : "Previous slide"}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPlaying((playing) => !playing)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-primary/70 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      aria-label={
                        isPlaying
                          ? language === "vi" ? "Tạm dừng trình chiếu" : "Pause slideshow"
                          : language === "vi" ? "Tiếp tục trình chiếu" : "Play slideshow"
                      }
                      aria-pressed={!isPlaying}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={showNextSlide}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-12 sm:w-12"
                      aria-label={language === "vi" ? "Ảnh tiếp theo" : "Next slide"}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={thumbnailsContainerRef}
            className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={language === "vi" ? "Chọn kỷ niệm" : "Choose a memory"}
          >
            {moments.map((moment, index) => {
              const title = language === "vi" ? moment.vi : moment.en;
              const isActive = index === activeIndex;

              return (
                <button
                  key={moment.src}
                  ref={(element) => {
                    thumbnailRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => changeSlide(index, index >= activeIndex ? 1 : -1)}
                  className={`group/thumb relative h-20 shrink-0 overflow-hidden rounded-[14px] border-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#f0dfca] ${
                    isActive
                      ? "w-24 border-primary shadow-[0_8px_20px_rgba(74,38,30,0.18)]"
                      : "w-16 border-transparent opacity-55 hover:w-20 hover:opacity-100"
                  }`}
                  aria-label={`${language === "vi" ? "Hiển thị" : "Show"}: ${title}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <img src={moment.src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <span className={`absolute inset-0 transition-colors ${isActive ? "bg-transparent" : "bg-[#321d17]/10 group-hover/thumb:bg-transparent"}`} />
                  <span className="absolute bottom-1.5 left-2 font-sans text-[0.5rem] tracking-[0.14em] text-white drop-shadow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="mt-7 flex items-center justify-center gap-4 text-primary/55">
            <span className="h-px w-16 bg-current md:w-20" />
            <span className="font-serif text-xl italic">Nam &amp; Linh · 2023—2026</span>
            <span className="h-px w-16 bg-current md:w-20" />
          </div>
        </AnimatedSection>
      </div>

      <PhotoLightbox
        photos={moments.map((moment) => ({
          src: moment.src,
          title: language === "vi" ? moment.vi : moment.en,
          subtitle: moment.date,
        }))}
        openIndex={selectedIndex}
        onOpenIndexChange={setSelectedIndex}
        previousLabel={language === "vi" ? "Ảnh trước" : "Previous photo"}
        nextLabel={language === "vi" ? "Ảnh tiếp theo" : "Next photo"}
        swipeLabel={language === "vi" ? "Vuốt để xem tiếp" : "Swipe for next"}
        closeLabel={language === "vi" ? "Đóng bộ ảnh" : "Close gallery"}
      />
    </section>
  );
};

export default GallerySection;
