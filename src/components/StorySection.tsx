import { Heart, MapPin, Plane } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";
import heroImage from "@/assets/hero-wedding.jpg";
import venueImage from "@/assets/venue.jpg";

const milestones = [
  {
    year: "2021",
    date: "A Spring Afternoon In Hanoi",
    title: "The First Hello",
    description:
      "A quiet cafe conversation in Hanoi turned into hours of talking about life, art, and the places we hoped to see together.",
    image: heroImage,
    alt: "The beginning of Nam and Linh's story",
    imagePosition: "center 24%",
    icon: "pin",
  },
  {
    year: "2022-2024",
    date: "Across Cities And Seasons",
    title: "Across Cities And Seasons",
    description:
      "From long calls across time zones to weekends that never felt long enough, love kept returning with calm certainty.",
    image: venueImage,
    alt: "A shared journey through beautiful places",
    imagePosition: "center center",
    icon: "pin",
  },
  {
    year: "2025",
    date: "The Everyday Became Ours",
    title: "The Everyday Became Ours",
    description:
      "It was never only the grand adventures. It was the dinners, the walks, the small rituals, and the quiet way home began to feel the same.",
    image: heroImage,
    alt: "Quiet moments that became lasting memories",
    imagePosition: "center 60%",
    icon: "pin",
  },
  {
    year: "November 2026",
    date: "Back To Vietnam For The Wedding",
    title: "Forever Begins Here",
    description:
      "Now the road brings us back to Vietnam, where we cannot wait to celebrate this next chapter with the people we love most.",
    image: venueImage,
    alt: "The road leading to the wedding celebration",
    imagePosition: "center 35%",
    icon: "heart",
  },
];

const finalStop = {
  year: "After The Wedding",
  date: "A New Chapter In Sweden",
  title: "Next Stop: Sweden",
  description:
    "After the vows and celebrations, the road keeps going north, carrying Linh to Sweden and into the home we will build together there.",
};

const MobileJourneyDivider = () => (
  <div className="mt-6 flex h-16 flex-col items-center justify-between md:hidden" aria-hidden="true">
    <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
    <span className="h-full w-px bg-[linear-gradient(180deg,rgba(188,149,111,0.36)_0%,rgba(188,149,111,0.12)_100%)]" />
    <span className="h-2.5 w-2.5 rounded-full border border-primary/15 bg-background shadow-[0_10px_24px_rgba(168,116,79,0.08)]" />
  </div>
);

const StorySection = () => {
  return (
    <section id="story" className="bg-background py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mb-5 flex justify-center">
              <svg
                width="110"
                height="56"
                viewBox="0 0 110 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary/75"
                aria-hidden="true"
              >
                <path
                  d="M10 44C18 36 26 34 36 37C49 42 57 26 51 16C47 9 51 5 59 8C69 12 67 29 81 30C89 31 96 26 100 16"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="44" r="3.5" fill="currentColor" />
                <circle cx="52" cy="16" r="3.5" fill="currentColor" />
                <circle cx="98" cy="16" r="3.5" fill="currentColor" />
              </svg>
            </div>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Our Story
            </p>
            <h2 className="font-serif text-4xl font-light text-foreground md:text-5xl">
              A Roadmap To Love
            </h2>
          </div>
        </AnimatedSection>

        <div className="relative space-y-16 md:space-y-24">
          <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden -translate-x-1/2 md:block">
            <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-[radial-gradient(circle,rgba(196,162,126,0.16)_0%,rgba(196,162,126,0.06)_42%,transparent_72%)] blur-[12px]" />
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[linear-gradient(180deg,rgba(188,149,111,0.08)_0%,rgba(188,149,111,0.34)_10%,rgba(188,149,111,0.22)_90%,rgba(188,149,111,0.06)_100%)]" />
            <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(188,149,111,0.22)_1px,transparent_1.6px)] [background-size:6px_20px] opacity-70" />
          </div>

          {milestones.map((milestone, index) => {
            const isLeft = index % 2 === 0;
            const Icon = milestone.icon === "heart" ? Heart : MapPin;

            return (
              <AnimatedSection key={milestone.title} delay={0.08 * index}>
                <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] md:items-start md:gap-12">
                  {isLeft ? (
                    <div className="md:col-start-1">
                      <div className="overflow-hidden rounded-[26px] border border-border/80 bg-warm-white shadow-[0_18px_40px_rgba(124,92,60,0.06)] md:grid md:grid-cols-[1.02fr_0.98fr]">
                        <div
                          className="min-h-[220px] bg-cover bg-center md:min-h-[280px]"
                          style={{
                            backgroundImage: `linear-gradient(rgba(24, 18, 14, 0.08), rgba(24, 18, 14, 0.08)), url(${milestone.image})`,
                            backgroundPosition: milestone.imagePosition,
                          }}
                          aria-label={milestone.alt}
                          role="img"
                        />
                        <div className="flex flex-col justify-center p-6 text-center md:p-7 md:text-right">
                          <h3 className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-[2.15rem]">
                            {milestone.title}
                          </h3>
                          <p className="mt-4 max-w-md font-sans text-sm leading-7 text-muted-foreground md:ml-auto md:mr-0 md:text-[0.95rem]">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block" />
                  )}

                  <div className="relative z-10 flex flex-col items-center md:pt-4">
                    <div className="min-w-[8.9rem] rounded-full border border-primary/18 bg-[linear-gradient(180deg,rgba(252,247,239,0.96)_0%,rgba(248,239,227,0.92)_100%)] px-5 py-2.5 text-center shadow-[0_14px_34px_rgba(142,108,74,0.08)]">
                      <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-primary/60">
                        {milestone.year}
                      </p>
                    </div>

                    <div className="relative mt-4 flex h-16 w-16 items-center justify-center md:h-14 md:w-14">
                      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/24 bg-background text-primary shadow-[0_16px_30px_rgba(168,116,79,0.12)] md:h-14 md:w-14">
                        <Icon size={18} />
                      </div>
                    </div>

                    <div className="mt-4 max-w-[10.5rem] rounded-[18px] bg-background/90 px-3 py-2 text-center shadow-[0_10px_30px_rgba(250,247,240,0.95)]">
                      <p className="font-sans text-[0.72rem] uppercase leading-[1.55] tracking-[0.24em] text-muted-foreground/80 md:text-[0.68rem]">
                        {milestone.date}
                      </p>
                    </div>

                    <MobileJourneyDivider />
                  </div>

                  {isLeft ? (
                    <div className="hidden md:block" />
                  ) : (
                    <div className="md:col-start-3">
                      <div className="overflow-hidden rounded-[26px] border border-border/80 bg-warm-white shadow-[0_18px_40px_rgba(124,92,60,0.06)] md:grid md:grid-cols-[0.98fr_1.02fr]">
                        <div
                          className="min-h-[220px] bg-cover bg-center md:order-2 md:min-h-[280px]"
                          style={{
                            backgroundImage: `linear-gradient(rgba(24, 18, 14, 0.08), rgba(24, 18, 14, 0.08)), url(${milestone.image})`,
                            backgroundPosition: milestone.imagePosition,
                          }}
                          aria-label={milestone.alt}
                          role="img"
                        />
                        <div className="flex flex-col justify-center p-6 text-center md:p-7 md:text-left">
                          <h3 className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-[2.15rem]">
                            {milestone.title}
                          </h3>
                          <p className="mt-4 max-w-md font-sans text-sm leading-7 text-muted-foreground md:mx-0 md:text-[0.95rem]">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}

          <AnimatedSection delay={0.36}>
            <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] md:items-start md:gap-12">
              <div className="hidden md:block" />

              <div className="relative z-10 flex flex-col items-center md:pt-4">
                <div className="min-w-[8.9rem] rounded-full border border-primary/18 bg-[linear-gradient(180deg,rgba(252,247,239,0.96)_0%,rgba(248,239,227,0.92)_100%)] px-5 py-2.5 text-center shadow-[0_14px_34px_rgba(142,108,74,0.08)]">
                  <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-primary/60">
                    {finalStop.year}
                  </p>
                </div>

                <div className="relative mt-4 flex h-16 w-16 items-center justify-center md:h-14 md:w-14">
                  <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/24 bg-background text-primary shadow-[0_16px_30px_rgba(168,116,79,0.12)] md:h-14 md:w-14">
                    <Plane size={18} />
                  </div>
                </div>

                <div className="mt-4 max-w-[10.5rem] rounded-[18px] bg-background/90 px-3 py-2 text-center shadow-[0_10px_30px_rgba(250,247,240,0.95)]">
                  <p className="font-sans text-[0.72rem] uppercase leading-[1.55] tracking-[0.24em] text-muted-foreground/80 md:text-[0.68rem]">
                    {finalStop.date}
                  </p>
                </div>
              </div>

              <div className="rounded-[26px] border border-border/80 bg-[linear-gradient(180deg,rgba(251,246,239,1)_0%,rgba(246,238,226,0.94)_100%)] p-6 text-center shadow-[0_18px_40px_rgba(124,92,60,0.06)] md:p-7 md:text-left">
                <p className="font-serif text-[1.9rem] font-light leading-[1.08] text-foreground md:text-[2.1rem]">
                  {finalStop.title}
                </p>
                <p className="mt-4 max-w-md font-sans text-sm leading-7 text-muted-foreground md:text-[0.95rem]">
                  {finalStop.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default StorySection;
