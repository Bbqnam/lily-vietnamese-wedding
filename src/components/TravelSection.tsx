import { useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin, Plane } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const locations = [
  {
    city: "Nam Định",
    arrival: "Fly into Hanoi (HAN)",
    transfer: "Then drive about 1.5 to 2 hours to Nam Định.",
    notes: [
      "Best route for most international guests",
      "Easy car or private transfer from Hanoi",
    ],
    mapNote: "Closest arrival point: Hanoi, then continue south to Linh's hometown in Nam Định.",
    accent: "Northern Vietnam",
    mapEmbed: "https://www.google.com/maps?q=Nam%20Dinh%2C%20Vietnam&z=10&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Nam%20Dinh%2C%20Vietnam",
    routeTags: ["Hanoi airport", "Car transfer"],
  },
  {
    city: "Huế",
    arrival: "Fly into Huế (HUI) or Đà Nẵng (DAD)",
    transfer: "Huế airport is closest. From Đà Nẵng, the drive is about 2 to 2.5 hours.",
    notes: [
      "Both Huế and Đà Nẵng are good arrival options",
      "Choose the easiest flight for your route",
    ],
    mapNote: "For Nam's hometown, you can arrive directly in Huế or come through Đà Nẵng and transfer north.",
    accent: "Central Vietnam",
    mapEmbed: "https://www.google.com/maps?q=Hue%2C%20Vietnam&z=10&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Hue%2C%20Vietnam",
    routeTags: ["Huế airport", "Đà Nẵng option"],
  },
];

const TravelSection = () => {
  const [activeCity, setActiveCity] = useState(locations[0].city);

  const activeLocation =
    locations.find((location) => location.city === activeCity) ?? locations[0];

  return (
    <section id="travel" className="bg-warm-white py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mb-14 text-center md:mb-16">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              For Our Guests
            </p>
            <h2 className="mb-4 font-serif text-4xl font-light text-foreground md:text-5xl">
              Travel &amp; Location
            </h2>
            <p className="mx-auto max-w-xl font-sans text-sm text-muted-foreground">
              The simplest routes for each celebration, with only the details you will actually need.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <AnimatedSection>
            <div className="border border-border bg-background">
              {locations.map((location, index) => {
                const isActive = activeLocation.city === location.city;

                return (
                  <div
                    key={location.city}
                    className={index !== locations.length - 1 ? "border-b border-border/80" : ""}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveCity(location.city)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-7"
                      aria-expanded={isActive}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary">
                          <Plane size={15} />
                        </div>
                        <div>
                          <p className="font-serif text-[2rem] font-light leading-none text-foreground">
                            {location.city}
                          </p>
                          <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                            {location.accent}
                          </p>
                        </div>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-primary transition-transform duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isActive && (
                      <div className="px-6 pb-6 md:px-7 md:pb-7">
                        <div className="rounded-[28px] border border-border/80 bg-warm-white px-5 py-5">
                          <div className="mb-4">
                            <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
                              Best Arrival
                            </p>
                            <p className="mt-2 font-serif text-2xl font-light text-foreground">
                              {location.arrival}
                            </p>
                          </div>

                          <p className="mb-5 font-sans text-sm leading-7 text-muted-foreground">
                            {location.transfer}
                          </p>

                          <ul className="space-y-3">
                            {location.notes.map((note) => (
                              <li
                                key={note}
                                className="flex items-start gap-3 font-sans text-sm leading-7 text-muted-foreground"
                              >
                                <span className="mt-3 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="overflow-hidden border border-border bg-background">
              <div className="border-b border-border/80 px-6 py-6 md:px-8">
                <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                  Location Map
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-serif text-3xl font-light text-foreground md:text-[2.1rem]">
                    {activeLocation.city}
                  </h3>
                  <div className="rounded-full border border-primary/20 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-primary">
                    {activeLocation.accent}
                  </div>
                </div>
              </div>

              <div className="grid gap-0 md:grid-cols-[1.18fr_0.82fr]">
                <div className="min-h-[380px] border-b border-border md:min-h-[500px] md:border-b-0 md:border-r">
                  <iframe
                    title={`Map of ${activeLocation.city}`}
                    src={activeLocation.mapEmbed}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex flex-col justify-center px-6 py-8 md:px-8">
                  <div className="mb-4 flex items-center gap-2 text-primary">
                    <MapPin size={15} />
                    <span className="font-sans text-xs uppercase tracking-[0.24em]">
                      {activeLocation.city}
                    </span>
                  </div>
                  <h4 className="mb-3 font-serif text-3xl font-light text-foreground">
                    {activeLocation.arrival}
                  </h4>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {activeLocation.routeTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-warm-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mb-4 font-sans text-sm leading-7 text-muted-foreground">
                    {activeLocation.mapNote}
                  </p>
                  <p className="mb-6 font-sans text-sm leading-7 text-muted-foreground">
                    Exact venue and transfer details will be shared closer to the wedding.
                  </p>
                  <a
                    href={activeLocation.mapLink}
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
        </div>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default TravelSection;
