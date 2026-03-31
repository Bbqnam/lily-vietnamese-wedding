import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

const STORAGE_KEY = "wedding-welcome-dismissed";

const WelcomeOverlay = () => {
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY) === "true";
    setIsVisible(!dismissed);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isReady, isVisible]);

  const handleEnter = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#120e0b]/50 px-6 py-10 backdrop-blur-[4px]"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation welcome"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl border border-white/50 bg-background/95 px-8 py-10 text-center shadow-[0_30px_90px_rgba(18,14,11,0.16)] md:px-12 md:py-12"
          >
            <div className="mb-6 flex justify-center">
              <WeddingLogo size="default" showText={false} />
            </div>

            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.34em] text-primary/85">
              Wedding Invitation
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl">
              You Are Invited
            </h2>
            <p className="mt-4 font-sans text-base leading-8 text-muted-foreground md:px-8">
              We would be so happy to welcome you to celebrate our wedding in Vietnam.
            </p>
            <p className="mt-6 font-serif text-3xl font-light text-foreground md:text-[2.4rem]">
              Linh &amp; Nam
            </p>

            <button
              type="button"
              onClick={handleEnter}
              className="mt-8 inline-flex items-center justify-center rounded-full border border-primary/25 bg-primary px-8 py-3 font-sans text-[11px] uppercase tracking-[0.28em] text-primary-foreground transition-all duration-300 hover:opacity-90"
            >
              Enter Our Wedding Site
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
