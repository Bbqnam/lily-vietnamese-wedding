import WeddingLogo from "./WeddingLogo";

const WeddingFooter = () => {
  return (
    <footer className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <WeddingLogo size="small" showText={false} />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mt-6 mb-4">
          Nam & Linh
        </h2>
        <p className="text-sm text-muted-foreground font-sans tracking-wide mb-2">
          22 November 2026 · Nam Định
        </p>
        <p className="text-sm text-muted-foreground font-sans tracking-wide">
          25 November 2026 · Huế
        </p>
        <p className="text-xs text-muted-foreground/50 font-sans mt-10">
          Made with love
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
