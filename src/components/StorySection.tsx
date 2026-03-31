import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";

const StorySection = () => {
  return (
    <section id="story" className="py-28 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-14">
            How It All Began
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="space-y-8 text-muted-foreground leading-relaxed font-sans text-sm md:text-base">
            <p>
              We first crossed paths on a quiet autumn afternoon in Hanoi, at a small café 
              tucked along a tree-lined street. What began as a chance encounter turned into 
              hours of conversation — about art, dreams, and the places we longed to see.
            </p>
            <p>
              Over the years, our love has taken us across oceans and through seasons. 
              From late-night calls across time zones to sunrise walks along the coast,
              every moment has deepened what we share.
            </p>
            <p>
              Now we're ready to begin our greatest adventure together — and we want you 
              there to celebrate with us.
            </p>
          </div>
        </AnimatedSection>

        <FloralDivider className="mt-14" />
      </div>
    </section>
  );
};

export default StorySection;
