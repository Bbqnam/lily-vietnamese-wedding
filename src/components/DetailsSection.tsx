import { Calendar, Heart } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";
import venueImage from "@/assets/venue.jpg";

const scheduleItems = [
  { time: "2:00 PM", event: "Guest Arrival", note: "Welcome drinks and hugs all around" },
  { time: "3:00 PM", event: "Ceremony", note: "A beautiful moment with our families" },
  { time: "4:00 PM", event: "Cocktail Hour", note: "Time to mingle, sip, and take photos" },
  { time: "5:30 PM", event: "Reception Dinner", note: "Dinner, speeches, and shared stories" },
  { time: "7:30 PM", event: "Celebration", note: "Music, dancing, and a joyful night together" },
];

const DetailsSection = () => {
  return (
    <section id="details" className="bg-background py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <AnimatedSection>
          <div className="mb-14 text-center md:mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              The Day
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Schedule
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground font-sans">
              A simple flow for the day so everyone knows when to arrive, settle in, and celebrate with us.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-2 xl:gap-8">
          <AnimatedSection delay={0.2}>
            <div className="h-full overflow-hidden border border-border bg-warm-white">
              <div className="flex items-center gap-3 border-b border-border px-6 py-5 md:px-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary">
                  <Calendar size={15} />
                </div>
                <div>
                  <p className="font-serif text-2xl text-foreground">Celebration Flow</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground font-sans">
                    A relaxed outline for the day
                  </p>
                </div>
              </div>

              <div className="space-y-0 px-6 md:px-8">
                {scheduleItems.map((item, i) => (
                  <div
                    key={i}
                    className="grid gap-2 border-b border-border/80 py-4 last:border-0 md:grid-cols-[88px_1fr]"
                  >
                    <span className="font-serif text-[1.65rem] leading-none text-primary">{item.time}</span>
                    <div>
                      <p className="font-serif text-[1.9rem] leading-none text-foreground">{item.event}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground font-sans">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.28}>
            <div className="h-full overflow-hidden border border-border bg-warm-white">
              <div
                className="min-h-[260px] bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(24, 18, 14, 0.14), rgba(24, 18, 14, 0.2)), url(${venueImage})`,
                }}
              />
              <div className="p-8 md:p-9">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary">
                  <Heart size={15} />
                </div>
                <h3 className="mb-3 font-serif text-2xl font-light text-foreground">
                  A Day Meant To Feel Warm
                </h3>
                <p className="mb-5 text-sm leading-7 text-muted-foreground font-sans">
                  We want the day to feel generous and unhurried, with time for family, conversation, and beautiful little moments in between.
                </p>
                <div className="space-y-3">
                  {[
                    "Arrive a little early to settle in",
                    "Expect portraits and family photos after the ceremony",
                    "Comfortable shoes for dancing are always welcome",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
                      <p className="text-sm leading-6 text-muted-foreground font-sans">{note}</p>
                    </div>
                  ))}
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

export default DetailsSection;
