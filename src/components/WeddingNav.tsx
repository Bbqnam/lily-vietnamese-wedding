import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Events", href: "#events" },
  { label: "Travel", href: "#travel" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" },
  { label: "FAQ", href: "#faq" },
];

const WeddingNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/60 bg-background/88 backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 md:py-5">
          <a
            href="#"
            aria-label="Nam and Linh wedding home"
            className="flex items-center gap-3 text-primary transition-opacity duration-300 hover:opacity-80"
          >
            <WeddingLogo size="small" showText={false} />
            <div className="hidden sm:block">
              <p className="font-serif text-xl font-light tracking-[0.08em] text-foreground">
                Nam &amp; Linh
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center justify-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.72rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-end">
            <p className="text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground/80">
              Vietnam 2026
            </p>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/60 bg-background/96 md:hidden"
          >
            <div className="flex flex-col items-center gap-5 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[0.72rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default WeddingNav;
