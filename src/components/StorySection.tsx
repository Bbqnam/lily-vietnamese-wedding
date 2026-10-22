import { Heart, Home, MapPin, Plane, Sparkles } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import traditionalPhoto from "@/assets/photos/story-traditional.jpg";
import dancePhoto from "@/assets/photos/gallery-dance.jpg";
import gardenPhoto from "@/assets/photos/hero-garden.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const StorySection = () => {
  const { language } = useLanguage();
  const isVietnamese = language === "vi";

  const chapters = isVietnamese
    ? [
        {
          year: "2023",
          title: "Từ ánh mắt đầu tiên đến chung một mái nhà",
          text: "Một cuộc gặp gỡ tại TP. Hồ Chí Minh đã mở đầu cho câu chuyện của chúng mình. Từ ánh mắt đầu tiên, lời chào giản dị, hai người xa lạ dần trở thành một phần không thể thiếu trong cuộc sống của nhau. Những bữa cơm, những chuyến đi và những khoảnh khắc bình dị đã trở thành những kỷ niệm đáng nhớ.",
          icon: MapPin,
        },
        {
          year: "2023 — 2025",
          title: "Cùng nhau trưởng thành",
          text: "Hơn hai năm sống cùng nhau tại Việt Nam, chúng mình đã trải qua những ngày vui, những lúc khó khăn và học cách thấu hiểu nhau hơn. Tình yêu không chỉ là những khoảnh khắc đẹp mà còn là sự sẻ chia, quan tâm và đồng hành trong cuộc sống mỗi ngày.",
          icon: Heart,
        },
        {
          year: "2025",
          title: "Yêu thương qua khoảng cách",
          text: "Khi Nam trở về Thụy Điển để chuẩn bị cho tương lai, chúng mình bắt đầu những ngày yêu xa. Dù cách nhau hàng nghìn cây số, những cuộc gọi mỗi ngày và niềm mong chờ những lần gặp lại đã giúp chúng mình luôn cảm thấy gần nhau.",
          icon: Plane,
        },
        {
          year: "2026",
          title: "Ngày mình về chung một nhà",
          text: "Sau những năm tháng yêu thương và chờ đợi, chúng mình quyết định cùng nhau bước sang một chương mới. Hai lễ cưới tại Nam Định và Huế không chỉ là ngày hạnh phúc của riêng hai đứa mà còn là dịp để hai gia đình cùng chung vui và chứng kiến lời hẹn ước trọn đời.",
          icon: Sparkles,
        },
        {
          year: "2027 — MÃI MÃI",
          title: "Chương mới nơi phương xa",
          text: "Tạm biệt những ngày tháng yêu xa, chúng mình mong chờ được bắt đầu cuộc sống mới tại Thụy Điển. Một đất nước mới, những trải nghiệm mới và một mái ấm nhỏ của riêng hai đứa. Phía trước chắc chắn sẽ có những thử thách, nhưng từ nay, chúng mình sẽ cùng nhau đối mặt, cùng nhau trưởng thành và viết tiếp câu chuyện tình yêu của mình.",
          icon: Home,
        },
      ]
    : [
        {
          year: "2023",
          title: "From the first glance to sharing a home",
          text: "A meeting in Ho Chi Minh City began our story. From the first glance and a simple hello, two strangers gradually became an irreplaceable part of each other’s lives. Shared meals, journeys and ordinary moments became memories we will always treasure.",
          icon: MapPin,
        },
        {
          year: "2023 — 2025",
          title: "Growing together",
          text: "For more than two years living together in Vietnam, we shared joyful days, difficult moments and learned to understand one another more deeply. Love became more than beautiful moments — it was sharing, caring and walking beside each other every day.",
          icon: Heart,
        },
        {
          year: "2025",
          title: "Love across the distance",
          text: "When Nam returned to Sweden to prepare for our future, our long-distance chapter began. Though thousands of kilometres apart, daily calls and the anticipation of every reunion always kept us feeling close.",
          icon: Plane,
        },
        {
          year: "2026",
          title: "The day we become one home",
          text: "After years of love and waiting, we chose to begin a new chapter together. Our two weddings in Nam Định and Huế are not only celebrations of our happiness, but a chance for both families to share our joy and witness our promise for life.",
          icon: Sparkles,
        },
        {
          year: "2027 — ALWAYS",
          title: "A new chapter far from home",
          text: "As the long-distance days come to an end, we look forward to beginning our new life in Sweden — a new country, new experiences and a small home of our own. Challenges will surely come, but from now on we will face them together, keep growing together and continue writing our love story.",
          icon: Home,
        },
      ];

  const quote = isVietnamese
    ? "Bởi hành trình đẹp nhất không phải là hành trình không có khó khăn, mà là hành trình luôn có nhau."
    : "The most beautiful journey is not one without difficulty, but one where we always have each other.";

  return (
    <section id="story" className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-secondary/55 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mb-10 max-w-3xl md:mb-14">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.32em] text-primary">
              {isVietnamese ? "Chuyện Chúng Mình" : "Our Story"}
            </p>
            <h2 className="font-serif text-4xl font-light leading-[1.02] text-foreground sm:text-5xl md:text-6xl">
              {isVietnamese ? "Hành trình của chúng mình" : "Our journey, together"}
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mb-10">
          <div className="grid h-[440px] grid-cols-2 grid-rows-2 gap-3 overflow-hidden rounded-[30px] sm:h-[520px] md:grid-cols-[1.5fr_0.75fr_0.75fr] md:grid-rows-1">
            <figure className="col-span-2 overflow-hidden bg-card md:col-span-1">
              <img
                src={gardenPhoto}
                alt={isVietnamese ? "Nam và Linh trong khu vườn" : "Nam and Linh in the garden"}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </figure>
            <figure className="overflow-hidden bg-card">
              <img
                src={traditionalPhoto}
                alt={isVietnamese ? "Nam và Linh trong trang phục truyền thống" : "Nam and Linh in traditional Vietnamese attire"}
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </figure>
            <figure className="overflow-hidden bg-card">
              <img
                src={dancePhoto}
                alt={isVietnamese ? "Nam và Linh cùng khiêu vũ" : "Nam and Linh dancing together"}
                className="h-full w-full object-cover object-[55%_55%]"
                loading="lazy"
              />
            </figure>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <p className="shrink-0 font-serif text-xl italic text-primary sm:text-2xl">
              {isVietnamese ? "2023 — mãi mãi" : "2023 — always"}
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
        </AnimatedSection>

        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <div className="pointer-events-none absolute bottom-32 left-[1.45rem] top-10 w-px bg-border md:left-[1.7rem]" />
            <div className="space-y-4">
              {chapters.map((chapter, index) => {
                const Icon = chapter.icon;
                return (
                  <AnimatedSection key={`${chapter.year}-${chapter.title}`} delay={index * 0.05}>
                    <article className="relative grid grid-cols-[3rem_1fr] gap-4 rounded-[26px] border border-border/80 bg-card/80 p-5 shadow-[0_16px_45px_rgba(72,37,29,0.06)] backdrop-blur-sm md:grid-cols-[3.5rem_1fr] md:gap-6 md:p-8">
                      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_9px_22px_rgba(120,27,42,0.24)] md:h-12 md:w-12">
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary md:text-xs">
                          {chapter.year}
                        </p>
                        <h3 className="mt-2 font-serif text-2xl font-light leading-tight text-foreground md:text-[2rem]">
                          {chapter.title}
                        </h3>
                        <p className="mt-3 font-sans text-[0.9rem] leading-7 text-muted-foreground md:text-[0.95rem]">
                          {chapter.text}
                        </p>
                      </div>
                    </article>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection className="mt-5" delay={0.25}>
              <blockquote className="relative overflow-hidden rounded-[26px] bg-primary px-7 py-8 text-primary-foreground shadow-[0_20px_50px_rgba(120,27,42,0.18)] md:px-10 md:py-10">
                <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full border border-primary-foreground/15" />
                <div className="pointer-events-none absolute -right-3 -top-5 h-32 w-32 rounded-full border border-primary-foreground/15" />
                <Sparkles className="mb-5 text-secondary" size={22} strokeWidth={1.5} />
                <p className="max-w-2xl font-serif text-2xl font-light italic leading-snug md:text-3xl">
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
