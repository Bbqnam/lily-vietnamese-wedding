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

        <div className="relative space-y-10 md:space-y-12">
          <div className="absolute bottom-8 left-1/2 top-8 hidden -translate-x-1/2 border-l border-dashed border-primary/25 md:block" />
          {milestones.map((milestone, index) => (
            <AnimatedSection key={milestone.title} delay={0.08 * index}>
              <div className="relative flex flex-col items-center">
                <div className="relative z-10 mb-5 flex justify-center md:mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background text-primary shadow-[0_10px_30px_rgba(168,116,79,0.08)]">
                    {index === milestones.length - 1 ? <Heart size={16} /> : <MapPin size={16} />}
                  </div>
                </div>

                <div className="mb-5 text-center md:mb-6">
                  <h3 className="font-serif text-3xl font-light leading-[1.05] text-foreground md:text-[2.15rem]">
                    {milestone.title}
                  </h3>
                </div>

                <div className="w-full max-w-5xl">
                  <div className="overflow-hidden border border-border/80 bg-warm-white md:grid md:grid-cols-[0.95fr_1.05fr]">
                    <div
                      className="min-h-[220px] bg-cover bg-center md:min-h-[300px]"
                      style={{
                        backgroundImage: `linear-gradient(rgba(24, 18, 14, 0.08), rgba(24, 18, 14, 0.08)), url(${milestone.image})`,
                        backgroundPosition: milestone.imagePosition,
                      }}
                      aria-label={milestone.alt}
                      role="img"
                    />
                    <div className="flex flex-col justify-center p-6 text-center md:p-8">
                      <p className="mx-auto max-w-xl font-sans text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
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
