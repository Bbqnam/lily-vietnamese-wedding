import { useState } from "react";
import { ChevronDown, MapPin, Plane } from "lucide-react";
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
  },
];

const mapPoints = {
  hanoi: { top: "22%", left: "61%" },
  namDinh: { top: "29%", left: "58%" },
  daNang: { top: "55%", left: "50%" },
  hue: { top: "51%", left: "53%" },
};

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

              <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[360px] border-b border-border bg-[linear-gradient(180deg,#faf6f0_0%,#f6efe6_100%)] md:min-h-[430px] md:border-b-0 md:border-r">
                  <svg
                    viewBox="0 0 360 520"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <path
                      d="M208 28C202 64 217 86 195 124C176 156 191 190 170 226C148 265 151 315 144 353C138 387 126 426 116 474"
                      fill="none"
                      stroke="rgba(168,116,79,0.25)"
                      strokeWidth="14"
                      strokeLinecap="round"
                    />
                    <path
                      d="M199 26C193 64 206 85 186 121C168 154 180 189 160 225C141 260 141 312 134 349C128 384 117 423 109 471"
                      fill="none"
                      stroke="rgba(168,116,79,0.16)"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div
                    className="absolute"
                    style={{ top: mapPoints.hanoi.top, left: mapPoints.hanoi.left }}
                  >
                    <div className="translate-x-[-50%] translate-y-[-50%]">
                      <div className="rounded-full border border-primary/20 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
                        Hanoi
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute"
                    style={{ top: mapPoints.daNang.top, left: mapPoints.daNang.left }}
                  >
                    <div className="translate-x-[-50%] translate-y-[-50%]">
                      <div
                        className={`rounded-full border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.18em] shadow-sm ${
                          activeLocation.city === "Huế"
                            ? "border-primary/30 text-primary"
                            : "border-primary/15 text-muted-foreground"
                        }`}
                      >
                        Đà Nẵng
                      </div>
                    </div>
                  </div>

                  {[
                    {
                      key: "Nam Định",
                      label: "Nam Định",
                      point: mapPoints.namDinh,
                    },
                    {
                      key: "Huế",
                      label: "Huế",
                      point: mapPoints.hue,
                    },
                  ].map((marker) => {
                    const isActive = activeLocation.city === marker.key;

                    return (
                      <button
                        key={marker.key}
                        type="button"
                        onClick={() => setActiveCity(marker.key)}
                        className="absolute"
                        style={{ top: marker.point.top, left: marker.point.left }}
                      >
                        <div className="translate-x-[-50%] translate-y-[-50%]">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full border bg-background transition-all duration-300 ${
                              isActive
                                ? "border-primary/40 text-primary shadow-[0_16px_35px_rgba(132,92,59,0.14)]"
                                : "border-primary/18 text-primary/70"
                            }`}
                          >
                            <MapPin size={16} />
                          </div>
                          <div
                            className={`mt-3 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {marker.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  {activeLocation.city === "Huế" && (
                    <div
                      className="absolute text-[10px] uppercase tracking-[0.18em] text-primary/75"
                      style={{ top: "58.5%", left: "57%" }}
                    >
                      Arrival options
                    </div>
                  )}
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
                  <p className="mb-4 font-sans text-sm leading-7 text-muted-foreground">
                    {activeLocation.mapNote}
                  </p>
                  <p className="font-sans text-sm leading-7 text-muted-foreground">
                    Exact venue and transfer details will be shared closer to the wedding.
                  </p>
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
