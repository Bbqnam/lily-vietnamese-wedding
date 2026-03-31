import AnimatedSection from "./AnimatedSection";
import venueImage from "@/assets/venue.jpg";

const VenueSection = () => {
  return (
    <section id="venue" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              The Venue
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Ana Mandara Villas Dalat
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="overflow-hidden">
              <img
                src={venueImage}
                alt="Wedding venue in Đà Lạt"
                className="w-full h-80 md:h-[500px] object-cover"
                loading="lazy"
                width={1920}
                height={1080}
              />
            </div>
            <div className="space-y-6">
              <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                Nestled in the cool highlands of Đà Lạt, Ana Mandara Villas offers a timeless 
                setting of French colonial elegance surrounded by lush gardens and pine forests.
              </p>
              <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                The ceremony will take place in the open-air garden with panoramic views of 
                Xuân Hương Lake and the misty mountains beyond. The reception follows in the 
                Grand Hall, adorned with candlelight and fresh florals.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-sans mb-2">Address</p>
                <p className="font-serif text-lg text-foreground">
                  Le Lai Street, Ward 5<br />
                  Đà Lạt, Lâm Đồng, Vietnam
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default VenueSection;
