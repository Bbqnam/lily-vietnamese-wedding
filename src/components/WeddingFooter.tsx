import lilyImage from "@/assets/lily-of-the-valley.png";

const WeddingFooter = () => {
  return (
    <footer className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <img
          src={lilyImage}
          alt=""
          className="w-16 mx-auto mb-8 opacity-30"
          loading="lazy"
          width={512}
          height={800}
        />
        <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4">
          Anh & Bình
        </h2>
        <p className="text-sm text-muted-foreground font-sans tracking-wide mb-2">
          December 28, 2026 · Đà Lạt, Vietnam
        </p>
        <p className="text-xs text-muted-foreground/60 font-sans mt-8">
          Made with love
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
