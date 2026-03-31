import { MapPin, Heart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";
import heroImage from "@/assets/hero-wedding.jpg";
import venueImage from "@/assets/venue.jpg";

const milestones = [
  {
    title: "The First Hello",
    description:
      "A quiet cafe conversation in Hanoi turned into hours of talking about life, art, and the places we hoped to see together.",
    image: heroImage,
    alt: "The beginning of Nam and Linh's story",
    imagePosition: "center 24%",
  },
  {
    title: "Across Cities And Seasons",
    description:
      "From long calls across time zones to weekends that never felt long enough, love kept returning with calm certainty.",
    image: venueImage,
    alt: "A shared journey through beautiful places",
    imagePosition: "center center",
  },
  {
    title: "The Everyday Became Ours",
    description:
      "It was never only the grand adventures. It was the dinners, the walks, the small rituals, and the quiet way home began to feel the same.",
    image: heroImage,
    alt: "Quiet moments that became lasting memories",
    imagePosition: "center 60%",
  },
  {
    title: "Forever Begins Here",
    description:
      "Now the road brings us back to Vietnam, where we cannot wait to celebrate this next chapter with the people we love most.",
    image: venueImage,
    alt: "The road leading to the wedding celebration",
    imagePosition: "center 35%",
  },
];

const routeConfigs = [
  {
    path: "M282 18C236 12 201 20 173 37C146 54 111 63 61 58",
    dot: { cx: 284, cy: 18 },
    marker: { cx: 54, cy: 58 },
    align: "start",
  },
  {
    path: "M18 18C62 11 97 21 126 38C153 54 190 63 240 58",
    dot: { cx: 16, cy: 18 },
    marker: { cx: 246, cy: 58 },
    align: "end",
  },
];

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

        <div className="space-y-10 md:space-y-14">
          {milestones.map((milestone, index) => (
            <AnimatedSection key={milestone.title} delay={0.08 * index}>
              <div className="relative grid gap-5 md:grid-cols-2 md:gap-12">
                <div className="relative z-10 mb-5 flex justify-center md:hidden">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-[0_10px_30px_rgba(168,116,79,0.08)]">
                    {index === milestones.length - 1 ? <Heart size={16} /> : <MapPin size={16} />}
                  </div>
                </div>

                <div
                  className={`w-full ${
                    index % 2 === 0 ? "md:col-start-1 md:justify-self-start" : "md:col-start-2 md:justify-self-end"
                  } md:max-w-[31rem]`}
                >
                  <div
                    className={`relative mb-4 hidden h-[74px] md:block ${
                      index % 2 === 0 ? "mr-auto" : "ml-auto"
                    }`}
                  >
                    <svg
                      viewBox="0 0 300 74"
                      className="h-full w-full text-primary/75"
                      aria-hidden="true"
                    >
                      <path
                        d={routeConfigs[index % 2].path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeDasharray="5 6"
                        strokeLinecap="round"
                      />
                      <circle
                        cx={routeConfigs[index % 2].dot.cx}
                        cy={routeConfigs[index % 2].dot.cy}
                        r="5"
                        fill="currentColor"
                        opacity="0.55"
                      />
                    </svg>
                    <div
                      className={`absolute top-[42px] ${
                        routeConfigs[index % 2].align === "start" ? "left-8" : "right-8"
                      }`}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-[0_10px_30px_rgba(168,116,79,0.08)]">
                        {index === milestones.length - 1 ? <Heart size={16} /> : <MapPin size={16} />}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`mb-5 text-center md:mb-6 ${
                      index % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <h3 className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-[2.15rem]">
                      {milestone.title}
                    </h3>
                  </div>

                  <div
                    className={`overflow-hidden border border-border/80 bg-warm-white md:grid ${
                      index % 2 === 0
                        ? "md:grid-cols-[1.02fr_0.98fr]"
                        : "md:grid-cols-[0.98fr_1.02fr]"
                    }`}
                  >
                    <div
                      className={`min-h-[220px] bg-cover bg-center md:min-h-[280px] ${
                        index % 2 === 1 ? "md:order-2" : ""
                      }`}
                      style={{
                        backgroundImage: `linear-gradient(rgba(24, 18, 14, 0.08), rgba(24, 18, 14, 0.08)), url(${milestone.image})`,
                        backgroundPosition: milestone.imagePosition,
                      }}
                      aria-label={milestone.alt}
                      role="img"
                    />
                    <div
                      className={`flex flex-col justify-center p-6 text-center md:p-7 ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <p
                        className={`mx-auto max-w-md font-sans text-sm leading-7 text-muted-foreground md:text-[0.95rem] ${
                          index % 2 === 0 ? "md:ml-auto md:mr-0" : "md:mx-0"
                        }`}
                      >
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {index !== milestones.length - 1 && (
                  <div className="mt-5 flex justify-center md:hidden">
                    <div className="h-10 w-px border-l border-dashed border-primary/25" />
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default StorySection;
