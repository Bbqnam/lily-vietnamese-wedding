import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

type Phase = "sealed" | "tearing" | "torn" | "flap-opening" | "letter-rising" | "revealed" | "closing";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

/* ──────────────────────────────────────────────
   Envelope geometry constants (shared by all layers)
   ────────────────────────────────────────────── */
const ENV_W = 380; // max envelope width
const ENV_H = 260; // envelope pocket height
const FLAP_H = 140; // triangular flap height
const TEAR_H = 28;  // tear strip height
const TEAR_THRESHOLD = 80; // drag px to trigger tear

const EASING = [0.22, 1, 0.36, 1] as const;

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const [phase, setPhase] = useState<Phase>("sealed");
  const timers = useRef<number[]>([]);

  /* ── drag state ── */
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartSide = useRef<"left" | "right" | null>(null);

  /* derived motion values for the two halves of the tear strip */
  const leftHalfX = useTransform(dragX, (v) => {
    if (!isDragging.current) return 0;
    return dragStartSide.current === "right" ? Math.min(0, v) : Math.min(0, -Math.abs(v));
  });
  const rightHalfX = useTransform(dragX, (v) => {
    if (!isDragging.current) return 0;
    return dragStartSide.current === "left" ? Math.max(0, v) : Math.max(0, Math.abs(v));
  });
  const tearOpacity = useTransform(dragX, [-TEAR_THRESHOLD, 0, TEAR_THRESHOLD], [0.4, 1, 0.4]);

  /* ── lifecycle ── */
  useEffect(() => {
    if (open) setPhase("sealed");
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  /* ── tear interaction ── */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "sealed") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    dragStartSide.current = relX < rect.width / 2 ? "left" : "right";
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    if (phase !== "sealed") return;
    const absX = Math.abs(dragX.get());
    if (absX >= TEAR_THRESHOLD) {
      completeTear();
    } else {
      isDragging.current = false;
      dragX.set(0);
    }
  };

  const completeTear = () => {
    setPhase("tearing");
    // quick tear-apart animation, then open sequence
    schedule(() => setPhase("torn"), 500);
    schedule(() => setPhase("flap-opening"), 700);
    schedule(() => setPhase("letter-rising"), 1300);
    schedule(() => setPhase("revealed"), 2100);
  };

  const handleEnter = () => {
    if (phase !== "revealed") return;
    setPhase("closing");
    schedule(onComplete, 700);
  };

  /* ── helpers ── */
  const past = (target: Phase) => {
    const order: Phase[] = ["sealed", "tearing", "torn", "flap-opening", "letter-rising", "revealed", "closing"];
    return order.indexOf(phase) >= order.indexOf(target);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={phase === "closing"
              ? { opacity: 0, y: -30, scale: 1.02 }
              : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.5, ease: EASING as unknown as number[] }}
            className="relative flex flex-col items-center"
          >
            {/* ── Hint text ── */}
            <motion.p
              animate={past("torn") ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-primary-foreground/70"
            >
              {phase === "sealed" ? "Drag the seal to tear open" : "Opening…"}
            </motion.p>

            {/* ══════════════════════════════════════════
                ENVELOPE ASSEMBLY — a single centered box
               ══════════════════════════════════════════ */}
            <div
              className="relative mx-auto"
              style={{
                width: `min(${ENV_W}px, 88vw)`,
                height: ENV_H + FLAP_H + 60, // extra room for letter rising
              }}
            >
              {/* ── 1. BACK PANEL (behind everything) ── */}
              <div
                className="absolute left-0 right-0 rounded-b-lg rounded-t-sm"
                style={{
                  top: FLAP_H - 4,
                  height: ENV_H,
                  background: "linear-gradient(180deg, hsl(36 30% 88%) 0%, hsl(36 28% 83%) 100%)",
                  boxShadow: "0 12px 40px rgba(80,55,30,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
                  border: "1px solid hsl(36 20% 82%)",
                }}
              />

              {/* ── 2. LETTER (starts hidden behind pocket, rises up) ── */}
              <motion.div
                initial={{ y: 0 }}
                animate={
                  past("letter-rising")
                    ? { y: -(ENV_H + 30), scale: 1.02 }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 1.0, ease: EASING as unknown as number[] }}
                className="absolute left-[8%] right-[8%] rounded-xl border border-border bg-card text-center"
                style={{
                  top: FLAP_H + 20,
                  height: ENV_H - 40,
                  zIndex: past("letter-rising") ? 30 : 2,
                  boxShadow: past("revealed")
                    ? "0 20px 60px rgba(80,55,30,0.18), 0 0 0 1px hsl(36 20% 90%)"
                    : "none",
                  clipPath: past("flap-opening") ? "none" : `inset(0 0 0 0)`,
                  overflow: "hidden",
                }}
              >
                <motion.div
                  animate={past("revealed") ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex h-full flex-col items-center justify-center px-6 py-6"
                >
                  <div className="mb-3">
                    <WeddingLogo size="small" showText={false} />
                  </div>
                  <p className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-primary/70">
                    You Are Invited
                  </p>
                  <h2 className="font-serif text-3xl font-light leading-none text-foreground md:text-5xl">
                    Nam &amp; Linh
                  </h2>
                  <p className="mx-auto mt-3 max-w-xs font-sans text-xs leading-6 text-muted-foreground md:text-sm">
                    Join us in Vietnam as we celebrate our wedding with the people we love most.
                  </p>
                  <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.24em] text-primary/60">
                    November 2026
                  </p>
                </motion.div>
              </motion.div>

              {/* ── 3. FRONT POCKET (covers letter) ── */}
              <div
                className="absolute left-0 right-0 overflow-hidden rounded-b-lg"
                style={{
                  top: FLAP_H + ENV_H * 0.32,
                  height: ENV_H * 0.68 + 1,
                  zIndex: 5,
                  background: "linear-gradient(180deg, hsl(38 32% 92%) 0%, hsl(36 28% 87%) 100%)",
                  borderLeft: "1px solid hsl(36 20% 84%)",
                  borderRight: "1px solid hsl(36 20% 84%)",
                  borderBottom: "1px solid hsl(36 20% 82%)",
                  boxShadow: "inset 0 8px 16px rgba(80,55,30,0.04)",
                }}
              >
                {/* side fold lines */}
                <div className="absolute left-3 top-0 h-full w-px bg-primary/[0.06]" />
                <div className="absolute right-3 top-0 h-full w-px bg-primary/[0.06]" />
                {/* bottom center monogram watermark */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-serif text-lg tracking-wider text-primary/[0.08]">
                  N &amp; L
                </div>
              </div>

              {/* ── 4. LEFT SIDE FOLD ── */}
              <div
                className="absolute"
                style={{
                  top: FLAP_H - 2,
                  left: 0,
                  width: "18%",
                  height: ENV_H * 0.35,
                  zIndex: 4,
                  background: "linear-gradient(90deg, hsl(36 28% 86%) 0%, hsl(38 30% 90%) 100%)",
                  clipPath: "polygon(0 0, 100% 12%, 100% 100%, 0 100%)",
                  borderLeft: "1px solid hsl(36 18% 82%)",
                }}
              />

              {/* ── 5. RIGHT SIDE FOLD ── */}
              <div
                className="absolute"
                style={{
                  top: FLAP_H - 2,
                  right: 0,
                  width: "18%",
                  height: ENV_H * 0.35,
                  zIndex: 4,
                  background: "linear-gradient(-90deg, hsl(36 28% 86%) 0%, hsl(38 30% 90%) 100%)",
                  clipPath: "polygon(0 12%, 100% 0, 100% 100%, 0 100%)",
                  borderRight: "1px solid hsl(36 18% 82%)",
                }}
              />

              {/* ── 6. TOP FLAP ── */}
              <motion.div
                animate={past("flap-opening")
                  ? { rotateX: -180, opacity: 0.6 }
                  : { rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 0.8, ease: EASING as unknown as number[] }}
                className="absolute left-0 right-0"
                style={{
                  top: 0,
                  height: FLAP_H,
                  zIndex: past("flap-opening") ? 1 : 10,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, hsl(38 32% 91%) 0%, hsl(36 28% 86%) 100%)",
                  border: "1px solid hsl(36 18% 84%)",
                }}
              />

              {/* ── 7. TEAR STRIP ── */}
              <AnimatePresence>
                {!past("torn") && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 right-0"
                    style={{
                      top: FLAP_H - TEAR_H / 2,
                      height: TEAR_H,
                      zIndex: 12,
                    }}
                  >
                    {/* full strip (visible when not dragging much) */}
                    <motion.div
                      style={{ opacity: tearOpacity }}
                      className="absolute inset-0 rounded-full border border-primary/15 bg-gradient-to-b from-card to-secondary"
                    >
                      <div className="absolute inset-y-0 left-5 right-5 flex items-center">
                        <div className="h-px w-full border-t border-dashed border-primary/20" />
                      </div>
                    </motion.div>

                    {/* LEFT half */}
                    <motion.div
                      style={{ x: leftHalfX, clipPath: "polygon(0 0, 100% 0, 96% 100%, 0 100%)" }}
                      animate={phase === "tearing" ? { x: -200, rotate: -4, opacity: 0 } : {}}
                      transition={{ duration: 0.45, ease: EASING as unknown as number[] }}
                      className="absolute left-0 top-0 h-full w-1/2 rounded-l-full border border-primary/15 bg-gradient-to-b from-card to-secondary"
                    />

                    {/* RIGHT half */}
                    <motion.div
                      style={{ x: rightHalfX, clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%)" }}
                      animate={phase === "tearing" ? { x: 200, rotate: 4, opacity: 0 } : {}}
                      transition={{ duration: 0.45, ease: EASING as unknown as number[] }}
                      className="absolute right-0 top-0 h-full w-1/2 rounded-r-full border border-primary/15 bg-gradient-to-b from-card to-secondary"
                    />

                    {/* drag handle / seal */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -160, right: 160 }}
                      dragElastic={0.08}
                      style={{ x: dragX }}
                      onPointerDown={handlePointerDown as any}
                      onDragEnd={handleDragEnd}
                      className="absolute left-1/2 top-1/2 z-[14] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border border-primary/20 bg-card px-5 py-1.5 shadow-md active:cursor-grabbing"
                      role="button"
                      aria-label="Drag to tear open the envelope"
                    >
                      <span className="pointer-events-none select-none font-sans text-[9px] uppercase tracking-[0.3em] text-primary/80">
                        Tear to Open
                      </span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── 8. ENVELOPE BLUR OVERLAY (softens envelope after reveal) ── */}
              <motion.div
                animate={past("revealed") ? { opacity: 0.5 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute left-0 right-0 rounded-b-lg backdrop-blur-[2px]"
                style={{
                  top: FLAP_H - 4,
                  height: ENV_H + 4,
                  zIndex: 20,
                  pointerEvents: "none",
                  background: "rgba(255,253,248,0.3)",
                }}
              />
            </div>

            {/* ── Enter button ── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={phase === "revealed" ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.5 }}
              className="mt-6"
            >
              <button
                type="button"
                onClick={handleEnter}
                className="inline-flex items-center rounded-full border border-primary/25 bg-primary px-8 py-3 font-sans text-[11px] uppercase tracking-[0.28em] text-primary-foreground transition-all duration-300 hover:opacity-90"
              >
                Enter Wedding Site
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
