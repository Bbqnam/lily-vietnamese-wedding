import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

type Phase = "sealed" | "tearing" | "torn" | "flap-opening" | "letter-rising" | "revealed" | "closing";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

/* ── Geometry ── */
const ENV_W = 420;
const ENV_H = 260;
const FLAP_H = 150;
const TEAR_H = 26;
const TEAR_THRESHOLD = 70;
const EASE = [0.22, 1, 0.36, 1] as unknown as number[];

/* Wax seal SVG component */
const WaxSeal = () => (
  <svg viewBox="0 0 64 64" className="h-10 w-10 drop-shadow-[0_3px_8px_rgba(80,20,20,.28)]">
    <defs>
      <radialGradient id="wax" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#b94a4a" />
        <stop offset="55%" stopColor="#8e2f36" />
        <stop offset="100%" stopColor="#642028" />
      </radialGradient>
    </defs>
    <path
      d="M32 6l7 3 8-1 4 7 7 4-1 8 3 7-5 6-1 8-8 2-5 6-8-2-8 2-5-6-8-2-1-8-5-6 3-7-1-8 7-4 4-7 8 1z"
      fill="url(#wax)"
    />
    {/* Decorative leaf / lily motif */}
    <path
      d="M22 36c7-2 12-8 13-14 3 8 8 12 13 14-9 1-17 1-26 0z"
      fill="#f6e7cf"
      opacity=".85"
    />
    {/* N & L initials */}
    <text
      x="32"
      y="38"
      textAnchor="middle"
      fontSize="9"
      fontFamily="serif"
      fill="#f6e7cf"
      opacity=".95"
      letterSpacing="1"
    >
      N L
    </text>
  </svg>
);

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const [phase, setPhase] = useState<Phase>("sealed");
  const timers = useRef<number[]>([]);
  const envelopeRef = useRef<HTMLDivElement>(null);

  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartSide = useRef<"left" | "right" | null>(null);

  /* derived transforms for tear halves */
  const leftHalfX = useTransform(dragX, (v) => {
    if (!isDragging.current) return 0;
    return dragStartSide.current === "right"
      ? Math.min(0, v)
      : Math.min(0, -Math.abs(v));
  });
  const rightHalfX = useTransform(dragX, (v) => {
    if (!isDragging.current) return 0;
    return dragStartSide.current === "left"
      ? Math.max(0, v)
      : Math.max(0, Math.abs(v));
  });
  const tearCenterOpacity = useTransform(
    dragX,
    (v) => {
      const abs = Math.abs(v);
      return Math.max(0, 1 - abs / (TEAR_THRESHOLD * 0.6));
    }
  );

  /* lifecycle */
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

  /* tear interaction */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (phase !== "sealed") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    dragStartSide.current = relX < rect.width / 2 ? "left" : "right";
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    if (phase !== "sealed") return;
    if (Math.abs(dragX.get()) >= TEAR_THRESHOLD) {
      completeTear();
    } else {
      isDragging.current = false;
      dragX.set(0);
    }
  };

  const completeTear = () => {
    setPhase("tearing");
    schedule(() => setPhase("torn"), 450);
    schedule(() => setPhase("flap-opening"), 650);
    schedule(() => setPhase("letter-rising"), 1500);
    schedule(() => setPhase("revealed"), 2500);
  };

  const handleEnter = () => {
    if (phase !== "revealed") return;
    setPhase("closing");
    schedule(onComplete, 700);
  };

  const past = (target: Phase) => {
    const order: Phase[] = [
      "sealed", "tearing", "torn", "flap-opening",
      "letter-rising", "revealed", "closing",
    ];
    return order.indexOf(phase) >= order.indexOf(target);
  };

  const isLetterOut = past("letter-rising");
  const isRevealed = past("revealed");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at center, hsl(36 20% 94%) 0%, hsl(36 15% 88%) 60%, hsl(36 12% 80%) 100%)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
        >
          {/* ── ENVELOPE WRAPPER (shrinks/blurs when letter comes out) ── */}
          <motion.div
            ref={envelopeRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={
              phase === "closing"
                ? { opacity: 0, scale: 0.92, y: 40 }
                : isLetterOut
                  ? { opacity: 1, scale: 0.85, y: 80, filter: "blur(3px)" }
                  : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
            }
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute flex flex-col items-center"
          >
            {/* Hint text */}
            <motion.p
              animate={past("torn") ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 select-none font-sans text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "hsl(36 20% 55%)" }}
            >
              {phase === "sealed" ? "← Drag the seal to tear open →" : "Opening…"}
            </motion.p>

            {/* ═══════════════════════════════════
                ENVELOPE
               ═══════════════════════════════════ */}
            <div
              className="relative mx-auto overflow-visible"
              style={{
                width: `min(${ENV_W}px, 90vw)`,
                height: FLAP_H + ENV_H,
                perspective: "900px",
              }}
            >
              {/* 1. BACK PANEL — the envelope body */}
              <div
                className="absolute inset-x-0 rounded-[4px_4px_18px_18px]"
                style={{
                  top: FLAP_H,
                  height: ENV_H,
                  background: "#efe6d6",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.06)",
                }}
              />

              {/* 2. LEFT INNER FOLD */}
              <div
                className="absolute left-0"
                style={{
                  top: FLAP_H,
                  width: "50%",
                  height: ENV_H,
                  background: "linear-gradient(135deg, #eadfce 0%, #e2d5c2 100%)",
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  zIndex: 1,
                }}
              />

              {/* 3. RIGHT INNER FOLD */}
              <div
                className="absolute right-0"
                style={{
                  top: FLAP_H,
                  width: "50%",
                  height: ENV_H,
                  background: "linear-gradient(-135deg, #e3d7c4 0%, #ddd0bc 100%)",
                  clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                  zIndex: 1,
                }}
              />

              {/* 4. BOTTOM POCKET FOLD (covers letter, highest z among folds) */}
              <div
                className="absolute inset-x-[8px]"
                style={{
                  top: FLAP_H,
                  height: ENV_H,
                  background: "linear-gradient(0deg, #efe6d6 0%, #e7dcc9 60%, #dfd4c3 100%)",
                  clipPath: "polygon(0 100%, 50% 32%, 100% 100%)",
                  zIndex: 5,
                  borderRadius: "0 0 16px 16px",
                }}
              />

              {/* 5. LETTER CARD (hidden inside envelope, stays here until phase) */}
              {!isLetterOut && (
                <div
                  className="absolute overflow-hidden rounded-lg"
                  style={{
                    top: FLAP_H + 14,
                    left: "12%",
                    right: "12%",
                    height: ENV_H - 28,
                    zIndex: 3,
                    background: "#fbf7f0",
                    border: "1px solid hsl(36 25% 90%)",
                  }}
                />
              )}

              {/* 6. TOP FLAP (triangular, rotates open) */}
              <motion.div
                animate={
                  past("flap-opening")
                    ? { rotateX: -180, opacity: 0.4 }
                    : { rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute inset-x-0"
                style={{
                  top: 0,
                  height: FLAP_H,
                  zIndex: past("flap-opening") ? 0 : 10,
                  transformOrigin: `center ${FLAP_H}px`,
                  transformStyle: "preserve-3d",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: "linear-gradient(180deg, #f4ecdf 0%, #e7dcc9 70%, #ddd0bc 100%)",
                  borderLeft: "1px solid #d5c9b6",
                  borderRight: "1px solid #d5c9b6",
                  borderTop: "1px solid #d5c9b6",
                }}
              />

              {/* 7. TEAR STRIP */}
              <AnimatePresence>
                {!past("torn") && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-x-0"
                    style={{
                      top: FLAP_H - TEAR_H / 2,
                      height: TEAR_H,
                      zIndex: 15,
                    }}
                  >
                    {/* Centre strip background (fades during drag) */}
                    <motion.div
                      style={{ opacity: tearCenterOpacity }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(180deg, #f0e8da 0%, #e4d9c8 100%)",
                          border: "1px solid #d5c9b6",
                          boxShadow: "0 1px 4px rgba(60,40,15,0.08)",
                        }}
                      />
                      {/* perforation */}
                      <div className="absolute inset-y-0 left-6 right-6 flex items-center">
                        <div
                          className="h-px w-full"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, #c4b8a4 0px, #c4b8a4 4px, transparent 4px, transparent 9px)",
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* LEFT HALF */}
                    <motion.div
                      style={{
                        x: leftHalfX,
                        clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
                        background: "linear-gradient(180deg, #f0e8da 0%, #e4d9c8 100%)",
                        border: "1px solid #d5c9b6",
                      }}
                      animate={phase === "tearing" ? { x: -240, rotate: -6, opacity: 0 } : {}}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute left-0 top-0 h-full w-1/2 rounded-l-full"
                    />

                    {/* RIGHT HALF */}
                    <motion.div
                      style={{
                        x: rightHalfX,
                        clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)",
                        background: "linear-gradient(180deg, #f0e8da 0%, #e4d9c8 100%)",
                        border: "1px solid #d5c9b6",
                      }}
                      animate={phase === "tearing" ? { x: 240, rotate: 6, opacity: 0 } : {}}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute right-0 top-0 h-full w-1/2 rounded-r-full"
                    />

                    {/* WAX SEAL DRAG HANDLE */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -180, right: 180 }}
                      dragElastic={0.06}
                      style={{ x: dragX }}
                      onPointerDown={handlePointerDown as any}
                      onDragEnd={handleDragEnd}
                      className="absolute left-1/2 top-1/2 z-[16] -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    >
                      <WaxSeal />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════
              INVITATION LETTER — fixed centered on screen
             ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: "18%", scale: 0.92 }}
            animate={
              phase === "closing"
                ? { opacity: 0, y: "-8%", scale: 1.05 }
                : isLetterOut
                  ? { opacity: 1, y: "-4%", scale: 1 }
                  : { opacity: 0, y: "18%", scale: 0.92 }
            }
            transition={{ duration: 1.0, ease: EASE }}
            className="fixed left-1/2 top-1/2 z-[95] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ pointerEvents: isRevealed ? "auto" : "none" }}
          >
            <div
              className="w-[min(520px,88vw)] rounded-[20px] px-8 py-10 text-center md:px-12 md:py-14"
              style={{
                background: "#fbf7f0",
                border: "1px solid hsl(36 25% 90%)",
                boxShadow:
                  "0 40px 100px rgba(0,0,0,0.18), 0 0 0 1px hsl(36 20% 92%), 0 0 80px rgba(180,150,100,0.06)",
              }}
            >
              <motion.div
                animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <WeddingLogo size="small" showText={false} />
                </div>
                <p
                  className="mb-3 font-sans text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: "hsl(36 30% 55%)" }}
                >
                  You Are Invited
                </p>
                <h2
                  className="font-serif text-4xl font-light leading-none md:text-6xl"
                  style={{ color: "hsl(36 25% 25%)" }}
                >
                  Nam &amp; Linh
                </h2>
                <p
                  className="mx-auto mt-4 max-w-[280px] font-sans text-sm leading-relaxed md:text-base"
                  style={{ color: "hsl(36 15% 45%)" }}
                >
                  Join us in Vietnam as we celebrate our wedding with the people we love most.
                </p>
                <p
                  className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em]"
                  style={{ color: "hsl(36 25% 60%)" }}
                >
                  November 2026
                </p>

                {/* Enter button inside the card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                  className="mt-8"
                >
                  <button
                    type="button"
                    onClick={handleEnter}
                    className="inline-flex items-center rounded-full px-10 py-3 font-sans text-[10px] uppercase tracking-[0.32em] transition-all duration-300 hover:shadow-lg"
                    style={{
                      background: "linear-gradient(180deg, hsl(30 35% 48%) 0%, hsl(28 32% 38%) 100%)",
                      color: "hsl(40 40% 96%)",
                      border: "1px solid hsl(28 28% 35%)",
                      boxShadow: "0 4px 16px rgba(60,40,15,0.2)",
                    }}
                  >
                    Enter Wedding Site
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
