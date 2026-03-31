import { Calendar, Clock, MapPin } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const scheduleItems = [
  { time: "2:00 PM", event: "Guest Arrival & Welcome Drinks", description: "Enjoy cocktails in the garden as you arrive" },
  { time: "3:00 PM", event: "Ceremony", description: "Join us under the floral arch as we exchange vows" },
  { time: "4:00 PM", event: "Cocktail Hour", description: "Mingle and enjoy canapés by the lakeside" },
  { time: "5:30 PM", event: "Reception Dinner", description: "A seated dinner with Vietnamese and Western cuisine" },
  { time: "7:30 PM", event: "First Dance & Celebration", description: "Dance the night away under the stars" },
  { time: "10:00 PM", event: "Sparkler Send-Off", description: "A magical farewell under a tunnel of sparklers" },
];

const DetailsSection = () => {
  return (
    <section id="details" className="py-24 md:py-32 bg-warm-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              The Details
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
              Wedding Day
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span className="text-sm font-sans tracking-wide">December 28, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <span className="text-sm font-sans tracking-wide">2:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-sm font-sans tracking-wide">Đà Lạt, Vietnam</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Schedule */}
        <AnimatedSection delay={0.2}>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2 font-sans">
              Schedule
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {scheduleItems.map((item, i) => (
              <AnimatedSection key={i} delay={0.1 * i}>
                <div className={`md:flex items-center mb-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <p className="font-serif text-lg text-primary font-medium">{item.time}</p>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground mt-1">{item.event}</h3>
                    <p className="text-sm text-muted-foreground font-sans mt-1">{item.description}</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-0">
                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <FloralDivider className="mt-8" />
      </div>
    </section>
  );
};

export default DetailsSection;
