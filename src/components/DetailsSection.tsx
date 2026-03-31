import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const scheduleItems = [
  { time: "2:00 PM", event: "Guest Arrival & Welcome Drinks" },
  { time: "3:00 PM", event: "Ceremony" },
  { time: "4:00 PM", event: "Cocktail Hour" },
  { time: "5:30 PM", event: "Reception Dinner" },
  { time: "7:30 PM", event: "Celebration & Dancing" },
];

const DetailsSection = () => {
  return (
    <section id="details" className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              The Day
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              Schedule
            </h2>
            <p className="text-sm text-muted-foreground font-sans">
              A general outline — detailed schedules for each event will follow.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="space-y-0">
            {scheduleItems.map((item, i) => (
              <div
                key={i}
                className="flex items-baseline gap-6 py-5 border-b border-border last:border-0"
              >
                <span className="font-serif text-lg text-primary w-24 flex-shrink-0">
                  {item.time}
                </span>
                <span className="font-serif text-lg text-foreground">
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <FloralDivider className="mt-12" />
      </div>
    </section>
  );
};

export default DetailsSection;
