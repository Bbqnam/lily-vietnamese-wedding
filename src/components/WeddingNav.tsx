import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingLogo from "./WeddingLogo";
import { useLanguage } from "@/contexts/LanguageContext";

type WeddingNavProps = {
  onOpenInvitation: () => void;
};

const WeddingNav = ({ onOpenInvitation }: WeddingNavProps) => {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navLinks = [
    { label: language === "vi" ? "Chuyện Chúng Mình" : "Our Story", href: "#story" },
    { label: language === "vi" ? "Thông Tin" : "Wedding Details", href: "#events" },
    { label: language === "vi" ? "Hình Ảnh" : "Photos", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
  ];

  const LanguageToggle = () => (
    <div className="flex items-center rounded-full border border-primary/20 p-0.5 text-[0.58rem] tracking-[0.16em] text-primary" aria-label="Language">
      {(["en", "vi"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={`rounded-full px-2 py-1 transition-colors ${language === item ? "bg-primary text-primary-foreground" : "hover:bg-primary/5"}`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-primary/15 bg-background/95 shadow-[0_5px_24px_rgba(74,15,25,0.08)] backdrop-blur-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-5 lg:py-5 xl:gap-8">
          <a
            href="#"
            aria-label="Nam and Linh wedding home"
            className="flex items-center gap-3 text-primary transition-opacity duration-300 hover:opacity-80"
          >
            <WeddingLogo size="small" showText={false} />
            <div className="hidden xl:block">
              <p className="font-serif text-xl font-light tracking-[0.08em] text-foreground">
                Nam &amp; Linh
              </p>
            </div>
          </a>

          <div className="hidden items-center justify-center gap-4 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap uppercase text-muted-foreground transition-colors duration-300 hover:text-primary ${language === "vi" ? "text-[0.64rem] tracking-[0.17em] xl:text-[0.68rem] xl:tracking-[0.2em]" : "text-[0.68rem] tracking-[0.23em]"}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center justify-end gap-3 lg:flex xl:gap-4">
            <p className="hidden 2xl:block text-[0.65rem] uppercase tracking-[0.34em] text-muted-foreground/80">
              Vietnam 2026
            </p>
            <button
              type="button"
              onClick={onOpenInvitation}
              className="rounded-full border border-primary/20 px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-primary transition-colors duration-300 hover:border-primary/35 hover:bg-primary/5"
            >
              {language === "vi" ? "Thiệp Mời" : "Invitation"}
            </button>
            <LanguageToggle />
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="-mr-3 flex min-h-11 min-w-11 items-center justify-center text-foreground lg:hidden"
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
            className="border-t border-border/60 bg-background/96 lg:hidden"
          >
            <div className="flex flex-col items-center gap-5 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`whitespace-nowrap uppercase text-muted-foreground transition-colors hover:text-primary ${language === "vi" ? "text-[0.7rem] tracking-[0.2em]" : "text-[0.72rem] tracking-[0.28em]"}`}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenInvitation();
                }}
                className="rounded-full border border-primary/20 px-4 py-2 text-[0.72rem] uppercase tracking-[0.28em] text-primary transition-colors hover:border-primary/35 hover:bg-primary/5"
              >
                {language === "vi" ? "Thiệp Mời" : "Invitation"}
              </button>
              <LanguageToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default WeddingNav;
