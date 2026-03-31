import AnimatedSection from "./AnimatedSection";

const colorSwatches = [
  { name: "Ivory", color: "hsl(40, 33%, 97%)" },
  { name: "Champagne", color: "hsl(36, 40%, 85%)" },
  { name: "Sage", color: "hsl(140, 15%, 75%)" },
  { name: "Stone", color: "hsl(30, 10%, 55%)" },
  { name: "Blush", color: "hsl(10, 30%, 88%)" },
];

const DressCodeSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Dress Code
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-8">
            Garden Formal
          </h2>
          <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            We invite you to dress in soft, elegant tones that complement the natural beauty 
            of our garden setting. Think flowy fabrics, refined silhouettes, and muted palettes.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
            {colorSwatches.map((swatch) => (
              <div key={swatch.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-border"
                  style={{ backgroundColor: swatch.color }}
                />
                <span className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-sans">
                  {swatch.name}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-sans italic">
            Please avoid white, black, and bright colors
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default DressCodeSection;
