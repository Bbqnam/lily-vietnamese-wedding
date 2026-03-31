import { Plane, Info } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const locations = [
  {
    city: "Nam Định",
    details: [
      "Located in the Red River Delta, about 90 km southeast of Hanoi",
      "Easily accessible by car or bus from Hanoi (1.5–2 hours)",
      "Nearest airport: Nội Bài International Airport (HAN), Hanoi",
    ],
  },
  {
    city: "Huế",
    details: [
      "The ancient imperial capital of Vietnam, in central Vietnam",
      "Fly into Phú Bài International Airport (HUI) — direct flights from Hanoi & HCMC",
      "A beautiful city on the Perfume River, rich in history and culture",
    ],
  },
];

const TravelSection = () => {
  return (
    <section id="travel" className="py-20 md:py-24 bg-warm-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              For Our Guests
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Travel & Location
            </h2>
            <p className="text-muted-foreground font-sans text-sm max-w-xl mx-auto">
              We can't wait to share this beautiful country with you.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {locations.map((loc, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="bg-background p-8 md:p-10 border border-border h-full">
                <div className="flex items-center gap-3 mb-6">
                  <Plane size={16} className="text-primary" />
                  <h3 className="font-serif text-2xl text-foreground">{loc.city}</h3>
                </div>
                <ul className="space-y-4">
                  {loc.details.map((detail, j) => (
                    <li key={j} className="text-sm text-muted-foreground font-sans leading-relaxed flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3}>
          <div className="bg-background p-8 border border-border">
            <div className="flex items-center gap-3 mb-5">
              <Info size={16} className="text-primary" />
              <h3 className="font-serif text-xl text-foreground">Good to Know</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Vietnam visa: check your eligibility for e-visa or visa-on-arrival well in advance",
                "Vietnamese Dong (VND) is the local currency — ATMs are widely available",
                "November weather is pleasant: 20–28°C in Nam Định, 22–27°C in Huế",
                "Grab (ride-hailing app) works well in both cities",
              ].map((note, j) => (
                <li key={j} className="text-sm text-muted-foreground font-sans leading-relaxed flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default TravelSection;
