import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const VenueSection = () => {
  return (
    <section id="venue" className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            The Venues
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
            Where We'll Celebrate
          </h2>
          <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Both celebrations will take place in beautiful settings that are close to our hearts. 
            Detailed venue information and directions will be shared closer to the date.
          </p>
        </AnimatedSection>

        <FloralDivider className="mt-12" />
      </div>
    </section>
  );
};

export default VenueSection;
