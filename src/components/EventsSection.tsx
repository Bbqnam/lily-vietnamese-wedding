import { MapPin, Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const events = [
  {
    location: "Nam Định",
    date: "22 November 2026",
    description: "A joyful celebration with family and friends in Nam's hometown.",
    venue: "Venue details to be announced",
  },
  {
    location: "Huế",
    date: "25 November 2026",
    description: "An intimate celebration in the beautiful ancient capital of Huế.",
    venue: "Venue details to be announced",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-28 md:py-36 bg-warm-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              Celebrations
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Wedding Events
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {events.map((event, i) => (
            <AnimatedSection key={i} delay={0.15 * i}>
              <div className="bg-background border border-border p-10 md:p-12 text-center h-full flex flex-col items-center">
                <div className="w-12 h-px bg-primary/40 mb-8" />
                <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
                  {event.location}
                </h3>
                <div className="flex items-center gap-2 text-primary mb-6">
                  <Calendar size={14} />
                  <span className="text-sm font-sans tracking-wide">{event.date}</span>
                </div>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed mb-6 max-w-xs">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground/60 mt-auto">
                  <MapPin size={13} />
                  <span className="text-xs font-sans tracking-wide">{event.venue}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <FloralDivider className="mt-16" />
      </div>
    </section>
  );
};

export default EventsSection;
