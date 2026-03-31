import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const [phase, setPhase] = useState<"idle" | "opening" | "closing">("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!open) {
      setPhase("idle");
    }
  }, [open]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, []);

  const ribbonLabel = useMemo(() => {
    if (phase === "idle") {
      return "Pull to open";
    }

    if (phase === "opening") {
      return "Opening invitation";
    }

    return "Welcome";
  }, [phase]);

  const startOpening = () => {
    if (phase !== "idle") {
      return;
    }

    setPhase("opening");
    timers.current.push(
      window.setTimeout(() => setPhase("closing"), 1450),
      window.setTimeout(() => {
        onComplete();
        setPhase("idle");
      }, 1950),
    );
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 72) {
      startOpening();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#120e0b]/46 px-4 py-8 backdrop-blur-[5px] md:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation welcome"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.985 }}
            animate={
              phase === "closing"
                ? { opacity: 0, y: -24, scale: 1.02 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl"
          >
            <div className="mx-auto max-w-[39rem] text-center">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={phase === "closing" ? { opacity: 0 } : { opacity: 1, y: 0 }}
                className="mb-5 font-sans text-[11px] uppercase tracking-[0.34em] text-white/78"
              >
                Wedding Invitation
              </motion.p>

              <div className="relative mx-auto aspect-[1.06/0.82] w-full max-w-[39rem]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={phase === "closing" ? { opacity: 0 } : { opacity: 1, scale: 1 }}
                  className="absolute inset-0 rounded-[36px] border border-white/30 bg-[linear-gradient(180deg,rgba(255,252,247,0.97),rgba(247,241,232,0.98))] shadow-[0_45px_120px_rgba(18,14,11,0.22)]"
                />

                <motion.div
                  animate={
                    phase === "opening"
                      ? { y: "-29%", scale: 1.015 }
                      : phase === "closing"
                        ? { y: "-37%", scale: 1.03, opacity: 0.3 }
                        : { y: "0%", scale: 1 }
                  }
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-[6%] right-[6%] top-[15%] z-[1] rounded-[28px] border border-[#e8d8c4] bg-[#fffdfa] px-6 py-7 text-center shadow-[0_18px_40px_rgba(82,55,34,0.08)] md:left-[11%] md:right-[11%] md:px-10 md:py-10"
                >
                  <div className="mb-5 flex justify-center">
                    <WeddingLogo size="default" showText={false} />
                  </div>
                  <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.34em] text-primary/80">
                    Linh &amp; Nam
                  </p>
                  <h2 className="font-serif text-4xl font-light leading-none text-foreground md:text-[4.2rem]">
                    You Are Invited
                  </h2>
                  <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-muted-foreground md:text-base">
                    Join us in Vietnam as we celebrate our wedding with the people we love most.
                  </p>
                  <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.3em] text-primary/75">
                    Pull the ribbon to open
                  </p>
                </motion.div>

                <motion.div
                  animate={
                    phase === "opening"
                      ? { rotateX: -170, y: -12 }
                      : phase === "closing"
                        ? { rotateX: -180, opacity: 0.2 }
                        : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-[4%] top-[7.8%] z-[3] h-[36%] origin-top"
                  style={{
                    transformStyle: "preserve-3d",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background:
                      "linear-gradient(180deg, rgba(244,234,218,1) 0%, rgba(236,223,205,1) 100%)",
                    border: "1px solid rgba(217,194,165,0.7)",
                  }}
                />

                <div
                  className="absolute inset-x-[4%] bottom-[10.5%] z-[4] h-[50%] overflow-hidden rounded-b-[34px] border border-[#e4d6c3] bg-[linear-gradient(180deg,#faf6f0_0%,#f5ede3_100%)]"
                >
                  <div
                    className="absolute inset-x-0 bottom-0 h-[88%]"
                    style={{
                      clipPath: "polygon(0 0, 50% 53%, 100% 0, 100% 100%, 0 100%)",
                      background:
                        "linear-gradient(180deg, rgba(246,238,228,1) 0%, rgba(240,229,216,1) 100%)",
                    }}
                  />
                  <div
                    className="absolute bottom-0 left-0 h-[88%] w-1/2 border-r border-[#eadccc]/70"
                    style={{ clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)" }}
                  />
                  <div
                    className="absolute bottom-0 right-0 h-[88%] w-1/2 border-l border-[#eadccc]/70"
                    style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}
                  />
                </div>

                <motion.button
                  type="button"
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 110 }}
                  dragElastic={0.08}
                  onDragEnd={handleDragEnd}
                  onClick={startOpening}
                  animate={
                    phase === "opening"
                      ? { y: 104, opacity: 0 }
                      : phase === "closing"
                        ? { y: 120, opacity: 0 }
                        : { y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-[3.8%] left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center text-center"
                  aria-label="Pull ribbon to open invitation"
                >
                  <div className="h-8 w-[2px] rounded-full bg-primary/45" />
                  <div className="mt-1 rounded-full border border-primary/30 bg-background px-5 py-3 shadow-[0_12px_26px_rgba(103,69,45,0.12)]">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary">
                      {ribbonLabel}
                    </p>
                  </div>
                </motion.button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={phase === "closing" ? { opacity: 0 } : { opacity: 1, y: 0 }}
                className="mt-6"
              >
                <button
                  type="button"
                  onClick={startOpening}
                  className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/72 transition-opacity hover:opacity-80"
                >
                  Open invitation
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
