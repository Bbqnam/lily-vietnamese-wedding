import { MapPin, Calendar, Heart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const events = [
  {
    location: "Nam Định",
    date: "22 November 2026",
    description: "A joyful celebration with family and friends in Linh's hometown.",
    venue: "Venue details to be announced",
    moments: ["Family welcome", "Ceremony", "Dinner & toasts"],
  },
  {
    location: "Huế",
    date: "25 November 2026",
    description: "An intimate celebration in Nam's hometown, the beautiful ancient capital of Huế.",
    venue: "Venue details to be announced",
    moments: ["Ancient city setting", "Celebration feast", "Late-night dancing"],
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="bg-warm-white py-20 md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-14 md:mb-16">
            <div className="mb-5 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-background text-primary">
                <Heart size={16} />
              </div>
            </div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              Celebrations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Wedding Events
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground font-sans md:text-base">
              Two celebrations, two cities, and one shared joy. Each gathering carries its own atmosphere while still feeling like part of the same story.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 md:gap-8">
          {events.map((event, i) => (
            <AnimatedSection key={i} delay={0.15 * i}>
              <div className="flex h-full flex-col items-center border border-border bg-background p-8 text-center md:p-9">
                <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 text-primary">
                  <Calendar size={15} />
                </div>
                <h3 className="mb-3 font-serif text-3xl font-light text-foreground md:text-4xl">
                  {event.location}
                </h3>
                <div className="mb-5 flex items-center gap-2 text-primary">
                  <Calendar size={14} />
                  <span className="text-sm font-sans tracking-wide">{event.date}</span>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6 max-w-xs">
                  {event.description}
                </p>
                <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
                  {event.moments.map((moment) => (
                    <span
                      key={moment}
                      className="rounded-full border border-border bg-warm-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      {moment}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground/60 mt-auto">
                  <MapPin size={13} />
                  <span className="text-xs font-sans tracking-wide">{event.venue}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default EventsSection;
