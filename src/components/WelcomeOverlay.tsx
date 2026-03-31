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

  const startOpening = () => {
    if (phase !== "sealed") {
      return;
    }

    setPhase("tearing");
    timers.current.push(window.setTimeout(() => setPhase("opened"), 920));
  };

  const handleTearEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 48) {
      startOpening();
    }
  };

  const handleEnter = () => {
    if (phase !== "opened") {
      return;
    }

    setPhase("closing");
    timers.current.push(window.setTimeout(onComplete, 680));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#120e0b]/44 px-4 py-8 backdrop-blur-[5px] md:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation welcome"
        >
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.988 }}
            animate={
              phase === "closing"
                ? { opacity: 0, y: -18, scale: 1.01 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-3xl"
          >
            <div className="mx-auto text-center">
              <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.34em] text-white/78">
                Wedding Invitation
              </p>

              <div className="relative mx-auto h-[32rem] w-full max-w-[38rem]">
                <div className="absolute inset-x-0 top-0 z-[10] text-center">
                  <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-white/72">
                    Tear open and take a moment to read
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-12 top-14">
                  <div className="relative mx-auto h-full max-w-[31rem]">
                    <motion.div
                      animate={
                        phase === "opened"
                          ? { y: -132, opacity: 1 }
                          : phase === "tearing"
                            ? { y: 120, opacity: 0 }
                          : phase === "closing"
                            ? { y: -138, opacity: 0.86 }
                            : { y: 120, opacity: 0 }
                      }
                      transition={{
                        duration: 0.96,
                        ease: [0.22, 1, 0.36, 1],
                        delay: phase === "opened" ? 0.14 : 0,
                      }}
                      className="absolute left-1/2 top-[1.1rem] z-[1] w-[76%] max-w-[22.75rem] -translate-x-1/2 rounded-[26px] border border-[#e7d8c6] bg-[#fffdfa] px-8 py-8 text-center shadow-[0_22px_42px_rgba(82,55,34,0.08)]"
                    >
                      <div className="mb-5 flex justify-center">
                        <WeddingLogo size="default" showText={false} />
                      </div>
                      <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.34em] text-primary/78">
                        You Are Invited
                      </p>
                      <h2 className="font-serif text-4xl font-light leading-none text-foreground md:text-[4rem]">
                        Linh &amp; Nam
                      </h2>
                      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-7 text-muted-foreground md:text-base">
                        Join us in Vietnam as we celebrate our wedding with the people we love most.
                      </p>
                      <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.26em] text-primary/72">
                        November 2026
                      </p>
                    </motion.div>

                    <div className="absolute inset-x-0 bottom-0 z-[4] mx-auto h-[18.75rem] max-w-[31rem]">
                      <motion.div
                        animate={
                          phase === "opened"
                            ? { rotateX: -176, y: -3 }
                            : phase === "closing"
                              ? { rotateX: -178, opacity: 0.3 }
                              : { rotateX: 0, y: 0 }
                        }
                        transition={{
                          duration: 0.78,
                          ease: [0.22, 1, 0.36, 1],
                          delay: phase === "opened" ? 0.08 : 0,
                        }}
                        className="absolute inset-x-0 top-0 z-[7] h-[9.25rem] origin-top"
                        style={{
                          transformStyle: "preserve-3d",
                          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                          background:
                            "linear-gradient(180deg, rgba(247,238,225,1) 0%, rgba(236,223,205,1) 100%)",
                          border: "1px solid rgba(217,194,165,0.72)",
                        }}
                      />

                      <div className="absolute inset-x-0 bottom-0 z-[6] h-[11.5rem] overflow-hidden rounded-b-[34px] border border-[#e4d6c3] bg-[linear-gradient(180deg,#fbf7f1_0%,#f4ecdf_100%)] shadow-[0_24px_48px_rgba(73,50,31,0.08)]">
                        <div
                          className="absolute inset-x-0 bottom-0 h-full"
                          style={{
                            clipPath: "polygon(0 12%, 50% 58%, 100% 12%, 100% 100%, 0 100%)",
                            background:
                              "linear-gradient(180deg, rgba(246,238,228,1) 0%, rgba(240,229,216,1) 100%)",
                          }}
                        />
                        <div
                          className="absolute bottom-0 left-0 h-full w-1/2 border-r border-[#eadccc]/70"
                          style={{ clipPath: "polygon(0 12%, 100% 58%, 100% 100%, 0 100%)" }}
                        />
                        <div
                          className="absolute bottom-0 right-0 h-full w-1/2 border-l border-[#eadccc]/70"
                          style={{ clipPath: "polygon(0 58%, 100% 12%, 100% 100%, 0 100%)" }}
                        />
                      </div>

                      <motion.div
                        animate={
                          phase === "tearing" || phase === "opened" || phase === "closing"
                            ? { opacity: 0, y: -8 }
                            : { opacity: 1, y: 0 }
                        }
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="absolute inset-x-0 top-[6px] z-[8] h-10 rounded-[18px] border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)] shadow-[0_10px_24px_rgba(98,66,40,0.08)]"
                      >
                        <div className="absolute inset-y-0 left-5 right-5 top-1/2 -translate-y-1/2 border-t border-dashed border-primary/28" />
                        <motion.button
                          type="button"
                          drag="x"
                          dragConstraints={{ left: -90, right: 90 }}
                          dragElastic={0.1}
                          onDragEnd={handleTearEnd}
                          onClick={startOpening}
                          className="absolute left-1/2 top-1/2 z-[9] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-5 py-2 shadow-[0_8px_16px_rgba(98,66,40,0.08)]"
                          aria-label="Tear open invitation"
                        >
                          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary">
                            Tear To Open
                          </span>
                        </motion.button>
                      </motion.div>

                      <motion.div
                        animate={
                          phase === "tearing" || phase === "opened" || phase === "closing"
                            ? { x: -98, rotate: -6, opacity: 1 }
                            : { x: 0, rotate: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-[6px] z-[9] h-10 w-1/2 origin-right rounded-l-[18px] border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)]"
                        style={{ clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}
                      />

                      <motion.div
                        animate={
                          phase === "tearing" || phase === "opened" || phase === "closing"
                            ? { x: 98, rotate: 6, opacity: 1 }
                            : { x: 0, rotate: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 top-[6px] z-[9] h-10 w-1/2 origin-left rounded-r-[18px] border border-[#dfccb0]/70 bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe5_100%)]"
                        style={{ clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
                      />
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={phase === "opened" ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.42, ease: "easeOut", delay: 0.55 }}
                  className="absolute inset-x-0 bottom-0 z-[12] text-center"
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
