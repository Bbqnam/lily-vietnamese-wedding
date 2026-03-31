import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const [phase, setPhase] = useState<"sealed" | "tearing" | "opened" | "closing">("sealed");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (open) {
      setPhase("sealed");
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

  const startTearing = () => {
    if (phase !== "sealed") {
      return;
    }

    setPhase("tearing");
    timers.current.push(window.setTimeout(() => setPhase("opened"), 1150));
  };

  const handleTearEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 64 || Math.abs(info.offset.y) > 36) {
      startTearing();
    }
  };

  const handleEnter = () => {
    if (phase !== "opened") {
      return;
    }

    setPhase("closing");
    timers.current.push(
      window.setTimeout(() => {
        onComplete();
      }, 820),
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#120e0b]/42 px-4 py-8 backdrop-blur-[5px] md:px-6"
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
            className="w-full max-w-4xl"
          >
            <div className="mx-auto max-w-[44rem] text-center">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={phase === "closing" ? { opacity: 0 } : { opacity: 1, y: 0 }}
                className="mb-5 font-sans text-[11px] uppercase tracking-[0.34em] text-white/80"
              >
                Wedding Invitation
              </motion.p>

              <div className="relative mx-auto h-[34rem] w-full max-w-[44rem]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={phase === "closing" ? { opacity: 0 } : { opacity: 1, scale: 1 }}
                  className="absolute inset-0 rounded-[40px] border border-white/35 bg-[linear-gradient(180deg,rgba(255,252,247,0.97),rgba(247,241,232,0.98))] shadow-[0_45px_120px_rgba(18,14,11,0.22)]"
                />

                <div className="absolute inset-x-[8%] top-[7%] z-[1]">
                  <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-primary/72">
                    Linh &amp; Nam
                  </p>
                </div>

                <div className="absolute inset-x-[11%] bottom-[9%] top-[17%]">
                  <motion.div
                    animate={
                      phase === "opened"
                        ? { y: -112, opacity: 1 }
                        : phase === "closing"
                          ? { y: -122, opacity: 0.85, scale: 0.98 }
                          : { y: 0, opacity: 1 }
                    }
                    transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: phase === "opened" ? 0.18 : 0 }}
                    className="absolute inset-x-[8%] bottom-[17%] z-[2] rounded-[30px] border border-[#e8d8c4] bg-[#fffdfa] px-7 py-8 text-center shadow-[0_20px_46px_rgba(82,55,34,0.08)] md:px-12 md:py-10"
                  >
                    <div className="mb-5 flex justify-center">
                      <WeddingLogo size="default" showText={false} />
                    </div>
                    <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.34em] text-primary/80">
                      You Are Invited
                    </p>
                    <h2 className="font-serif text-4xl font-light leading-none text-foreground md:text-[4.2rem]">
                      Linh &amp; Nam
                    </h2>
                    <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-7 text-muted-foreground md:text-base">
                      Join us in Vietnam as we celebrate our wedding with the people we love most.
                    </p>
                    <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.26em] text-primary/72">
                      November 2026
                    </p>
                  </motion.div>

                  <motion.div
                    animate={
                      phase === "opened"
                        ? { rotateX: -176, y: -8 }
                        : phase === "closing"
                          ? { rotateX: -178, opacity: 0.3 }
                          : { rotateX: 0, y: 0 }
                    }
                    transition={{ duration: 0.92, ease: [0.22, 1, 0.36, 1], delay: phase === "opened" ? 0.14 : 0 }}
                    className="absolute inset-x-0 top-0 z-[5] h-[35%] origin-top"
                    style={{
                      transformStyle: "preserve-3d",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, rgba(247,238,225,1) 0%, rgba(238,226,208,1) 100%)",
                      border: "1px solid rgba(219,198,170,0.78)",
                    }}
                  />

                  <div className="absolute inset-x-0 bottom-0 z-[4] h-[63%] overflow-hidden rounded-b-[34px] border border-[#e4d6c3] bg-[linear-gradient(180deg,#faf6f0_0%,#f5ede3_100%)]">
                    <div
                      className="absolute inset-x-0 bottom-0 h-full"
                      style={{
                        clipPath: "polygon(0 8%, 50% 55%, 100% 8%, 100% 100%, 0 100%)",
                        background:
                          "linear-gradient(180deg, rgba(245,235,223,1) 0%, rgba(239,227,213,1) 100%)",
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 h-full w-1/2 border-r border-[#eadccc]/70"
                      style={{ clipPath: "polygon(0 8%, 100% 55%, 100% 100%, 0 100%)" }}
                    />
                    <div
                      className="absolute bottom-0 right-0 h-full w-1/2 border-l border-[#eadccc]/70"
                      style={{ clipPath: "polygon(0 55%, 100% 8%, 100% 100%, 0 100%)" }}
                    />
                  </div>

                  <motion.div
                    animate={
                      phase === "tearing" || phase === "opened" || phase === "closing"
                        ? { opacity: 0, y: -14 }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="absolute inset-x-[3%] top-[10px] z-[6] h-[34px] rounded-full border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)] shadow-[0_10px_24px_rgba(98,66,40,0.08)]"
                  >
                    <div className="absolute inset-y-0 left-4 right-4 border-t border-dashed border-primary/30 top-1/2 -translate-y-1/2" />
                    <motion.button
                      type="button"
                      drag="x"
                      dragConstraints={{ left: -90, right: 90 }}
                      dragElastic={0.12}
                      onDragEnd={handleTearEnd}
                      onClick={startTearing}
                      className="absolute left-1/2 top-1/2 z-[7] flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full bg-background px-5 py-2.5 shadow-[0_8px_16px_rgba(98,66,40,0.08)]"
                      aria-label="Tear open invitation"
                    >
                      <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-primary">
                        Tear To Open
                      </span>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    animate={
                      phase === "tearing" || phase === "opened" || phase === "closing"
                        ? { x: -132, rotate: -9, opacity: 1 }
                        : { x: 0, rotate: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-[2.5%] top-[10px] z-[7] h-[34px] w-[44%] origin-right rounded-l-full border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)]"
                    style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}
                  />
                  <motion.div
                    animate={
                      phase === "tearing" || phase === "opened" || phase === "closing"
                        ? { x: 132, rotate: 9, opacity: 1 }
                        : { x: 0, rotate: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-[2.5%] top-[10px] z-[7] h-[34px] w-[44%] origin-left rounded-r-full border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)]"
                    style={{ clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase === "opened" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
                  className="absolute inset-x-0 bottom-[2%] z-[10] text-center"
                >
                  <button
                    type="button"
                    onClick={handleEnter}
                    className="inline-flex items-center justify-center rounded-full border border-primary/25 bg-primary px-8 py-3 font-sans text-[11px] uppercase tracking-[0.28em] text-primary-foreground transition-all duration-300 hover:opacity-90"
                  >
                    Enter Wedding Site
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={phase === "sealed" ? { opacity: 1, y: 0 } : { opacity: 0.75, y: 0 }}
                className="mt-6"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/72">
                  Tear the seal, then take a moment to read
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
