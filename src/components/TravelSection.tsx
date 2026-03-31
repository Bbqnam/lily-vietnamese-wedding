import { Plane, Hotel, Car, Info } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const travelCards = [
  {
    icon: Plane,
    title: "Getting There",
    details: [
      "Fly into Liên Khương Airport (DLI), Đà Lạt's international airport",
      "Direct flights available from Ho Chi Minh City (1hr) and Hanoi (2hrs)",
      "International guests: fly into Tân Sơn Nhất (SGN), then connect to DLI",
    ],
  },
  {
    icon: Hotel,
    title: "Accommodation",
    details: [
      "We've arranged a room block at Ana Mandara Villas at a special rate",
      "Nearby options: Swiss-Belresort, Dalat Palace Heritage Hotel",
      "Book early — December is peak season in Đà Lạt",
    ],
  },
  {
    icon: Car,
    title: "Local Transport",
    details: [
      "Shuttle service from the airport on Dec 27 & 28",
      "Grab (ride-hailing app) is widely available",
      "We'll arrange group transport to/from the venue",
    ],
  },
  {
    icon: Info,
    title: "Good to Know",
    details: [
      "Đà Lạt is cooler — expect 15–22°C in December. Bring a light jacket",
      "Vietnamese Dong (VND) is the local currency; ATMs are easy to find",
      "Vietnam visa: check your eligibility for e-visa or visa-on-arrival",
    ],
  },
];

const TravelSection = () => {
  return (
    <section id="travel" className="py-24 md:py-32 bg-warm-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              For Our Guests
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Travel to Vietnam
            </h2>
            <p className="text-muted-foreground font-sans text-sm max-w-xl mx-auto">
              We can't wait to share this beautiful country with you. Here's everything 
              you need to know to plan your trip.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {travelCards.map((card, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="bg-background p-8 border border-border h-full">
                <div className="flex items-center gap-3 mb-5">
                  <card.icon size={18} className="text-primary" />
                  <h3 className="font-serif text-xl text-foreground">{card.title}</h3>
                </div>
                <ul className="space-y-3">
                  {card.details.map((detail, j) => (
                    <li key={j} className="text-sm text-muted-foreground font-sans leading-relaxed flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <FloralDivider className="mt-12" />
      </div>
    </section>
  );
};

export default TravelSection;
