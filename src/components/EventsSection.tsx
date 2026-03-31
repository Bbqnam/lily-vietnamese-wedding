import { useState } from "react";
import { MapPin, Calendar, Heart, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const events = [
  {
    location: "Nam Định",
    date: "22 November 2026",
    description: "A joyful celebration with family and friends in Linh's hometown.",
    venue: "Venue details to be announced",
    moments: ["Family welcome", "Ceremony", "Dinner & toasts"],
    mapEmbed:
      "https://www.google.com/maps?q=Nam%20Dinh%2C%20Vietnam&z=11&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Nam%20Dinh%2C%20Vietnam",
    note: "A northern celebration close to family, old streets, and the place Linh calls home.",
  },
  {
    location: "Huế",
    date: "25 November 2026",
    description: "An intimate celebration in Nam's hometown, the beautiful ancient capital of Huế.",
    venue: "Venue details to be announced",
    moments: ["Ancient city setting", "Celebration feast", "Late-night dancing"],
    mapEmbed:
      "https://www.google.com/maps?q=Hue%2C%20Vietnam&z=12&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Hue%2C%20Vietnam",
    note: "A softer gathering in central Vietnam, surrounded by riverside calm and imperial history.",
  },
];

const EventsSection = () => {
  const [selectedLocation, setSelectedLocation] = useState(events[0].location);

  const activeEvent =
    events.find((event) => event.location === selectedLocation) ?? events[0];

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
              <button
                type="button"
                onClick={() => setSelectedLocation(event.location)}
                className={`flex h-full w-full flex-col items-center border bg-background p-8 text-center transition-all duration-300 md:p-9 ${
                  activeEvent.location === event.location
                    ? "border-primary/45 shadow-[0_18px_44px_rgba(132,92,59,0.08)]"
                    : "border-border hover:border-primary/30"
                }`}
                aria-pressed={activeEvent.location === event.location}
              >
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
              </button>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.2}>
          <div className="mt-10 overflow-hidden border border-border bg-background">
            <div className="border-b border-border/80 px-6 py-6 md:px-8">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                    Location Map
                  </p>
                  <h3 className="font-serif text-3xl font-light text-foreground md:text-[2.15rem]">
                    Find Each Celebration
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {events.map((event) => (
                    <button
                      key={event.location}
                      type="button"
                      onClick={() => setSelectedLocation(event.location)}
                      className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors ${
                        activeEvent.location === event.location
                          ? "border-primary/35 bg-primary/10 text-primary"
                          : "border-border bg-warm-white text-muted-foreground hover:border-primary/25"
                      }`}
                    >
                      {event.location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
              <div className="min-h-[320px] border-b border-border md:min-h-[420px] md:border-b-0 md:border-r">
                <iframe
                  title={`Map of ${activeEvent.location}`}
                  src={activeEvent.mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-col justify-center px-6 py-8 md:px-8">
                <div className="mb-4 flex items-center gap-2 text-primary">
                  <MapPin size={15} />
                  <span className="font-sans text-xs uppercase tracking-[0.24em]">
                    {activeEvent.location}
                  </span>
                </div>
                <h4 className="mb-3 font-serif text-3xl font-light text-foreground">
                  {activeEvent.date}
                </h4>
                <p className="mb-4 font-sans text-sm leading-7 text-muted-foreground md:text-[0.95rem]">
                  {activeEvent.note}
                </p>
                <p className="mb-6 font-sans text-sm leading-7 text-muted-foreground">
                  Final venue details will be added here as soon as they are confirmed.
                </p>
                <a
                  href={activeEvent.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 self-start text-sm text-primary transition-opacity hover:opacity-70"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default EventsSection;
