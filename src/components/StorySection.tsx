import { Heart, Home, MapPin, Plane, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import traditionalPhoto from "@/assets/photos/story-traditional.jpg";
import dancePhoto from "@/assets/photos/gallery-dance.jpg";
import gardenPhoto from "@/assets/photos/hero-garden.jpg";
import archPhoto from "@/assets/photos/gallery-arch.jpg";
import signsPhoto from "@/assets/photos/gallery-signs.jpg";
import studioPhoto from "@/assets/photos/gallery-studio.jpg";
import formalPhoto from "@/assets/photos/hero-formal.jpg";
import bridePhoto from "@/assets/photos/portrait-bride.jpg";
import traditionalPortraitPhoto from "@/assets/photos/wedding-traditional-portrait.jpg";
import veilPortraitPhoto from "@/assets/photos/wedding-veil-portrait.jpg";
import vowsPortraitPhoto from "@/assets/photos/wedding-vows-portrait.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const weddingPhotos = [
  { src: gardenPhoto, vi: "Nam và Linh trong khu vườn", en: "Nam and Linh in the garden", width: "w-[17rem] sm:w-[23rem]" },
  { src: traditionalPhoto, vi: "Nam và Linh trong trang phục truyền thống", en: "Nam and Linh in traditional Vietnamese attire", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: traditionalPortraitPhoto, vi: "Nam và Linh trong cổ phục Việt", en: "Nam and Linh in traditional Vietnamese ceremonial attire", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: dancePhoto, vi: "Nam và Linh cùng khiêu vũ", en: "Nam and Linh dancing together", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: veilPortraitPhoto, vi: "Nam nâng khăn voan cho Linh", en: "Nam lifting Linh's veil", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: signsPhoto, vi: "Nam và Linh với lời hẹn ngày cưới", en: "Nam and Linh holding their wedding signs", width: "w-[17rem] sm:w-[23rem]" },
  { src: archPhoto, vi: "Nam và Linh dưới cổng hoa", en: "Nam and Linh beneath the floral arch", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: vowsPortraitPhoto, vi: "Nam và Linh cùng đọc lời hẹn ước", en: "Nam and Linh reading their vows", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: studioPhoto, vi: "Chân dung cưới của Nam và Linh", en: "Nam and Linh's wedding portrait", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: formalPhoto, vi: "Nam và Linh trong lễ phục cưới", en: "Nam and Linh in their wedding attire", width: "w-[11.5rem] sm:w-[15.5rem]" },
  { src: bridePhoto, vi: "Chân dung cô dâu Linh", en: "A bridal portrait of Linh", width: "w-[11.5rem] sm:w-[15.5rem]" },
];

const StorySection = () => {
  const { language } = useLanguage();
  const isVietnamese = language === "vi";

  const chapters = isVietnamese
    ? [
        {
          year: "2023",
          title: "Gặp nhau tại Sài Gòn",
          text: "Một lời chào giản dị đã mở đầu cho câu chuyện của hai đứa.",
          icon: MapPin,
        },
        {
          year: "2023 — 2025",
          title: "Cùng nhau trưởng thành",
          text: "Hơn hai năm sẻ chia những ngày bình dị, những chuyến đi và một mái nhà chung.",
          icon: Heart,
        },
        {
          year: "2025",
          title: "Yêu thương qua khoảng cách",
          text: "Việt Nam và Thụy Điển cách xa, nhưng những cuộc gọi mỗi ngày luôn giữ hai đứa thật gần.",
          icon: Plane,
        },
        {
          year: "2026",
          title: "Hai ngày chung vui",
          text: "Nam Định và Huế — hai lễ cưới, hai gia đình, một lời hẹn ước trọn đời.",
          icon: Sparkles,
        },
        {
          year: "2027 — MÃI MÃI",
          title: "Cùng viết chương mới",
          text: "Một mái ấm tại Thụy Điển và hành trình phía trước — từ nay luôn có nhau.",
          icon: Home,
        },
      ]
    : [
        {
          year: "2023",
          title: "We met in Saigon",
          text: "A simple hello began the story of us.",
          icon: MapPin,
        },
        {
          year: "2023 — 2025",
          title: "Growing together",
          text: "More than two years of ordinary days, shared journeys and one home together.",
          icon: Heart,
        },
        {
          year: "2025",
          title: "Love across the distance",
          text: "Vietnam and Sweden were far apart, but our daily calls kept us close.",
          icon: Plane,
        },
        {
          year: "2026",
          title: "Two celebrations",
          text: "Nam Định and Huế — two weddings, two families and one promise for life.",
          icon: Sparkles,
        },
        {
          year: "2027 — ALWAYS",
          title: "Our next chapter",
          text: "A home in Sweden and the journey ahead — now, always together.",
          icon: Home,
        },
      ];

  const quote = isVietnamese
    ? "Bởi hành trình đẹp nhất không phải là hành trình không có khó khăn, mà là hành trình luôn có nhau."
    : "The most beautiful journey is not one without difficulty, but one where we always have each other.";

  return (
    <section id="story" className="relative overflow-hidden bg-background py-12 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-secondary/55 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-5 sm:px-6">
        <AnimatedSection>
          <div className="mb-8 max-w-3xl md:mb-14">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.32em] text-primary">
              {isVietnamese ? "Chuyện Chúng Mình" : "Our Story"}
            </p>
            <h2 className="font-serif text-4xl font-light leading-[1.02] text-foreground sm:text-5xl md:text-6xl">
              {isVietnamese ? "Hành trình của chúng mình" : "Our journey, together"}
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-9 md:mb-12">
          <div
            className="story-photo-reel relative -mx-5 overflow-hidden py-2 sm:-mx-6 md:mx-0 md:rounded-[32px]"
            role="region"
            aria-label={isVietnamese ? "Ảnh cưới của Nam và Linh tự động cuộn" : "Automatically scrolling wedding photos of Nam and Linh"}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-20" />
            <div className="story-photo-track flex w-max">
              {[0, 1].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
                  aria-hidden={copyIndex === 1 ? "true" : undefined}
                >
                  {weddingPhotos.map((photo, index) => (
                    <figure
                      key={`${copyIndex}-${photo.src}`}
                      className={`relative h-[20rem] shrink-0 overflow-hidden rounded-[20px] bg-card shadow-[0_14px_34px_rgba(72,37,29,0.1)] sm:h-[27rem] sm:rounded-[22px] ${photo.width}`}
                    >
                      <img
                        src={photo.src}
                        alt={copyIndex === 0 ? (isVietnamese ? photo.vi : photo.en) : ""}
                        className={`h-full w-full object-cover transition-transform duration-700 hover:scale-[1.025] ${
                          index === 0 || index === 3 ? "object-center" : "object-[50%_35%]"
                        }`}
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <p className="shrink-0 font-serif text-xl italic text-primary sm:text-2xl">
              {isVietnamese ? "2023 — mãi mãi" : "2023 — always"}
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
        </AnimatedSection>

        <div className="mx-auto max-w-5xl pt-3">
          <div className="relative">
            <div className="pointer-events-none absolute bottom-12 left-5 top-8 w-px bg-border md:left-1/2 md:-translate-x-1/2" />
            <div className="space-y-2 md:space-y-0">
              {chapters.map((chapter, index) => {
                const Icon = chapter.icon;
                return (
                  <AnimatedSection key={`${chapter.year}-${chapter.title}`} delay={index * 0.05}>
                    <article className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-6 text-left md:grid-cols-[1fr_4.5rem_1fr] md:gap-7 md:py-10">
                      <div className="hidden min-w-0 text-right md:col-start-1 md:block">
                        {index % 2 === 0 ? (
                          <>
                            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">{chapter.year}</p>
                            <h3 className="mt-2 font-serif text-[2rem] font-light leading-tight text-foreground">{chapter.title}</h3>
                            <p className="ml-auto mt-3 max-w-sm font-sans text-[0.92rem] leading-7 text-muted-foreground">{chapter.text}</p>
                          </>
                        ) : null}
                      </div>

                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-background text-primary shadow-[0_7px_20px_rgba(120,27,42,0.1)] md:col-start-2 md:h-12 md:w-12 md:justify-self-center">
                        <Icon size={17} strokeWidth={1.6} />
                      </div>

                      <div className={`min-w-0 ${index % 2 === 0 ? "md:hidden" : "md:col-start-3"}`}>
                        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary md:text-[0.65rem]">
                          {chapter.year}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-foreground md:text-[2rem]">
                          {chapter.title}
                        </h3>
                        <p className="mt-2 max-w-sm font-sans text-[0.88rem] leading-6 text-muted-foreground md:mt-3 md:text-[0.92rem] md:leading-7">
                          {chapter.text}
                        </p>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection className="mt-7 md:mt-12" delay={0.25}>
              <blockquote className="relative mx-auto max-w-4xl overflow-hidden rounded-[24px] border border-border/80 bg-card/65 px-6 py-9 text-center shadow-[0_18px_50px_rgba(72,37,29,0.06)] sm:px-10 md:rounded-[32px] md:px-16 md:py-12">
                <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full border border-primary/10" />
                <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full border border-primary/10" />

                <div className="relative flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-primary/25 sm:w-12" />
                  <Sparkles className="text-primary/70" size={15} strokeWidth={1.5} />
                  <p className="font-sans text-[0.58rem] font-medium uppercase tracking-[0.28em] text-primary sm:text-[0.64rem]">
                    {isVietnamese ? "Cùng nhau" : "Together"}
                  </p>
                  <span className="h-px w-8 bg-primary/25 sm:w-12" />
                </div>

                <p className="relative mx-auto mt-5 max-w-[42rem] text-balance font-serif text-[1.45rem] font-light italic leading-[1.3] text-foreground sm:text-[1.8rem] md:mt-6 md:text-[2.25rem] md:leading-[1.22]">
                  “{quote}”
                </p>
              </blockquote>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
