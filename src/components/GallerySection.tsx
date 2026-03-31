import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const galleryImages = [
  { aspect: "aspect-[3/4]", alt: "Couple portrait" },
  { aspect: "aspect-square", alt: "Engagement ring" },
  { aspect: "aspect-[4/3]", alt: "Together in nature" },
  { aspect: "aspect-[3/4]", alt: "Laughing together" },
  { aspect: "aspect-square", alt: "Sunset moment" },
  { aspect: "aspect-[4/3]", alt: "Adventure together" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-24 bg-warm-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              Moments
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              Our Gallery
            </h2>
          </div>
        </AnimatedSection>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className={`${img.aspect} bg-champagne overflow-hidden break-inside-avoid`}>
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-stone font-sans">
                    {img.alt}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <FloralDivider className="mt-10" />
      </div>
    </section>
  );
};

export default GallerySection;
