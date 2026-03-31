import AnimatedSection from "./AnimatedSection";
import FloralDivider from "./FloralDivider";
import lilyImage from "@/assets/lily-of-the-valley.png";

const StorySection = () => {
  return (
    <section id="story" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <AnimatedSection>
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
            Our Story
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-12">
            How It All Began
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative">
            <img
              src={lilyImage}
              alt="Lily of the Valley"
              className="absolute -left-16 top-0 w-20 opacity-20 hidden lg:block"
              loading="lazy"
              width={512}
              height={800}
            />
            <div className="space-y-6 text-muted-foreground leading-relaxed font-sans text-sm md:text-base">
              <p>
                We first crossed paths on a quiet autumn afternoon in Hanoi, at a small café 
                tucked along a tree-lined street. What began as a chance encounter turned into 
                hours of conversation — about art, dreams, and the places we longed to see.
              </p>
              <p>
                Over the years, our love has taken us across oceans and through seasons. 
                From late-night calls across time zones to sunrise walks along the coast of 
                Đà Nẵng, every moment has deepened what we share.
              </p>
              <p>
                Now, surrounded by the misty hills and pine forests of Đà Lạt, we're ready to 
                begin our greatest adventure together — and we want you there to celebrate with us.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <FloralDivider className="mt-12" />
      </div>
    </section>
  );
};

export default StorySection;
