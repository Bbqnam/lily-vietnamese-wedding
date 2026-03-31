import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import WeddingLogo from "./WeddingLogo";

type Phase = "sealed" | "tearing" | "torn" | "flap-opening" | "letter-rising" | "revealed" | "closing";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

/* ── Geometry ── */
const ENV_W = 400;
const ENV_H = 280;
const FLAP_H = 160;
const TEAR_H = 24;
const TEAR_THRESHOLD = 70;
const EASE = [0.22, 1, 0.36, 1] as unknown as number[];

/* ── Paper colours ── */
const PAPER_LIGHT = "hsl(36 32% 90%)";
const PAPER_MID = "hsl(36 28% 84%)";
const PAPER_DARK = "hsl(36 24% 78%)";
const PAPER_INNER = "hsl(36 20% 82%)";
const BORDER = "hsl(36 18% 76%)";

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const [phase, setPhase] = useState<Phase>("sealed");
  const timers = useRef<number[]>([]);

  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartSide = useRef<"left" | "right" | null>(null);

  /* ── derived transforms for tear halves ── */
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

  /* progressive tear gap — makes the two halves separate visually */
  const tearGap = useTransform(dragX, (v) => Math.abs(v));
  const tearCenterOpacity = useTransform(
    tearGap,
    [0, TEAR_THRESHOLD * 0.4, TEAR_THRESHOLD],
    [1, 0.6, 0]
  );

  /* ── lifecycle ── */
  useEffect(() => {
    if (open) setPhase("sealed");
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

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
    schedule(() => setPhase("letter-rising"), 1400);
    schedule(() => setPhase("revealed"), 2400);
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

  /* ── Total container height: flap sits above body, plus room for letter to rise ── */
  const TOTAL_H = FLAP_H + ENV_H + 80;

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
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={
              phase === "closing"
                ? { opacity: 0, y: -40, scale: 1.04 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex flex-col items-center"
          >
            {/* ── Hint ── */}
            <motion.p
              animate={past("torn") ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 select-none font-sans text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "hsl(36 20% 55%)" }}
            >
              {phase === "sealed" ? "← Drag to tear open →" : "Opening…"}
            </motion.p>

            {/* ═══════════════════════════════════
                ENVELOPE CONTAINER
               ═══════════════════════════════════ */}
            <div
              className="relative mx-auto"
              style={{
                width: `min(${ENV_W}px, 90vw)`,
                height: TOTAL_H,
                perspective: "900px",
              }}
            >
              {/* ── 1. ENVELOPE BODY (back panel) ── */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: FLAP_H,
                  height: ENV_H,
                  background: `linear-gradient(175deg, ${PAPER_MID} 0%, ${PAPER_DARK} 100%)`,
                  borderRadius: "0 0 6px 6px",
                  border: `1px solid ${BORDER}`,
                  borderTop: "none",
                  boxShadow:
                    "0 16px 48px rgba(60,40,15,0.15), 0 4px 12px rgba(60,40,15,0.08)",
                }}
              />

              {/* ── 2. INNER DIAMOND (the four triangular folds visible from the back) ── */}
              {/* Left inner fold */}
              <div
                className="absolute"
                style={{
                  top: FLAP_H,
                  left: 0,
                  width: "50%",
                  height: ENV_H,
                  background: `linear-gradient(135deg, ${PAPER_INNER} 0%, ${PAPER_MID} 100%)`,
                  clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  zIndex: 1,
                }}
              />
              {/* Right inner fold */}
              <div
                className="absolute"
                style={{
                  top: FLAP_H,
                  right: 0,
                  width: "50%",
                  height: ENV_H,
                  background: `linear-gradient(-135deg, ${PAPER_INNER} 0%, ${PAPER_MID} 100%)`,
                  clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                  zIndex: 1,
                }}
              />
              {/* Bottom inner fold */}
              <div
                className="absolute"
                style={{
                  top: FLAP_H,
                  left: 0,
                  right: 0,
                  height: ENV_H,
                  background: `linear-gradient(0deg, ${PAPER_MID} 0%, ${PAPER_LIGHT} 60%)`,
                  clipPath: "polygon(0 100%, 50% 35%, 100% 100%)",
                  zIndex: 2,
                }}
              />

              {/* ── 3. LETTER (hidden inside, rises after opening) ── */}
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={
                  past("letter-rising")
                    ? { y: -(ENV_H * 0.95), scale: 1.03 }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 1.1, ease: EASE }}
                className="absolute"
                style={{
                  top: FLAP_H + 16,
                  left: "10%",
                  right: "10%",
                  height: ENV_H - 32,
                  zIndex: past("letter-rising") ? 35 : 3,
                  borderRadius: "8px",
                  background: "hsl(40 40% 98%)",
                  border: "1px solid hsl(36 25% 90%)",
                  /* letter is clipped inside the envelope body until flap opens */
                  clipPath: past("flap-opening")
                    ? "none"
                    : `inset(0 0 0 0 round 8px)`,
                  overflow: "hidden",
                  boxShadow: past("revealed")
                    ? "0 24px 80px rgba(60,40,15,0.22), 0 0 0 1px hsl(36 20% 92%), 0 0 60px rgba(180,150,100,0.08)"
                    : "0 2px 8px rgba(60,40,15,0.06)",
                }}
              >
                <motion.div
                  animate={past("revealed") ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex h-full flex-col items-center justify-center px-6 py-5"
                >
                  <div className="mb-3">
                    <WeddingLogo size="small" showText={false} />
                  </div>
                  <p
                    className="mb-2 font-sans text-[9px] uppercase tracking-[0.35em]"
                    style={{ color: "hsl(36 30% 55%)" }}
                  >
                    You Are Invited
                  </p>
                  <h2
                    className="font-serif text-3xl font-light leading-none md:text-5xl"
                    style={{ color: "hsl(36 25% 25%)" }}
                  >
                    Nam &amp; Linh
                  </h2>
                  <p
                    className="mx-auto mt-3 max-w-[240px] font-sans text-xs leading-relaxed md:text-sm"
                    style={{ color: "hsl(36 15% 45%)" }}
                  >
                    Join us in Vietnam as we celebrate our wedding with the people we love most.
                  </p>
                  <p
                    className="mt-3 font-sans text-[9px] uppercase tracking-[0.28em]"
                    style={{ color: "hsl(36 25% 60%)" }}
                  >
                    November 2026
                  </p>
                </motion.div>
              </motion.div>

              {/* ── 4. FRONT POCKET (the bottom-up triangle that covers the letter) ── */}
              <div
                className="absolute left-0 right-0"
                style={{
                  top: FLAP_H,
                  height: ENV_H,
                  zIndex: 6,
                  background: `linear-gradient(0deg, ${PAPER_LIGHT} 0%, ${PAPER_MID} 100%)`,
                  clipPath: "polygon(0 100%, 50% 28%, 100% 100%)",
                  borderRadius: "0 0 6px 6px",
                  boxShadow: "inset 0 -2px 12px rgba(60,40,15,0.04)",
                }}
              >
                {/* subtle fold line */}
                <div
                  className="absolute left-1/2 -translate-x-1/2"
                  style={{
                    bottom: "15%",
                    width: "1px",
                    height: "20%",
                    background: "hsl(36 20% 80%)",
                    opacity: 0.4,
                  }}
                />
              </div>

              {/* ── 5. TOP FLAP (triangular, folds open via rotateX) ── */}
              <motion.div
                animate={
                  past("flap-opening")
                    ? { rotateX: -180, opacity: 0.5 }
                    : { rotateX: 0, opacity: 1 }
                }
                transition={{ duration: 0.9, ease: EASE }}
                className="absolute left-0 right-0"
                style={{
                  top: 0,
                  height: FLAP_H,
                  zIndex: past("flap-opening") ? 0 : 12,
                  transformOrigin: `center ${FLAP_H}px`,
                  transformStyle: "preserve-3d",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background: `linear-gradient(180deg, ${PAPER_LIGHT} 0%, ${PAPER_MID} 70%, ${PAPER_DARK} 100%)`,
                  borderLeft: `1px solid ${BORDER}`,
                  borderRight: `1px solid ${BORDER}`,
                  borderTop: `1px solid ${BORDER}`,
                }}
              >
                {/* fold shadow line at flap base */}
                <div
                  className="absolute bottom-0 left-[15%] right-[15%]"
                  style={{
                    height: "2px",
                    background: "linear-gradient(90deg, transparent, hsl(36 20% 72%), transparent)",
                    opacity: 0.5,
                  }}
                />
              </motion.div>

              {/* ── 6. TEAR STRIP (sits at flap base, user drags to tear) ── */}
              <AnimatePresence>
                {!past("torn") && (
                  <motion.div
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 right-0"
                    style={{
                      top: FLAP_H - TEAR_H / 2,
                      height: TEAR_H,
                      zIndex: 15,
                    }}
                  >
                    {/* Centre strip (fades as user drags) */}
                    <motion.div
                      style={{ opacity: tearCenterOpacity }}
                      className="absolute inset-0"
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: `linear-gradient(180deg, hsl(38 35% 92%) 0%, hsl(36 28% 87%) 100%)`,
                          border: `1px solid hsl(36 20% 82%)`,
                          boxShadow: "0 1px 4px rgba(60,40,15,0.08)",
                        }}
                      />
                      {/* dashed perforation line */}
                      <div className="absolute inset-y-0 left-6 right-6 flex items-center">
                        <div
                          className="h-px w-full"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, hsl(36 20% 72%) 0px, hsl(36 20% 72%) 4px, transparent 4px, transparent 8px)",
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* LEFT HALF — peels left */}
                    <motion.div
                      style={{
                        x: leftHalfX,
                        clipPath: "polygon(0 0, 100% 0, 94% 100%, 0 100%)",
                        background: `linear-gradient(180deg, hsl(38 35% 92%) 0%, hsl(36 28% 87%) 100%)`,
                        border: `1px solid hsl(36 20% 82%)`,
                        boxShadow: "0 1px 3px rgba(60,40,15,0.06)",
                      }}
                      animate={
                        phase === "tearing"
                          ? { x: -220, rotate: -6, opacity: 0 }
                          : {}
                      }
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute left-0 top-0 h-full w-1/2 rounded-l-full"
                    />

                    {/* RIGHT HALF — peels right */}
                    <motion.div
                      style={{
                        x: rightHalfX,
                        clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0 100%)",
                        background: `linear-gradient(180deg, hsl(38 35% 92%) 0%, hsl(36 28% 87%) 100%)`,
                        border: `1px solid hsl(36 20% 82%)`,
                        boxShadow: "0 1px 3px rgba(60,40,15,0.06)",
                      }}
                      animate={
                        phase === "tearing"
                          ? { x: 220, rotate: 6, opacity: 0 }
                          : {}
                      }
                      transition={{ duration: 0.4, ease: EASE }}
                      className="absolute right-0 top-0 h-full w-1/2 rounded-r-full"
                    />

                    {/* DRAG HANDLE (wax-seal-like pill) */}
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: -180, right: 180 }}
                      dragElastic={0.06}
                      style={{ x: dragX }}
                      onPointerDown={handlePointerDown as any}
                      onDragEnd={handleDragEnd}
                      className="absolute left-1/2 top-1/2 z-[16] -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                    >
                      <div
                        className="rounded-full px-5 py-1.5"
                        style={{
                          background: "linear-gradient(180deg, hsl(30 40% 50%) 0%, hsl(28 35% 40%) 100%)",
                          border: "1px solid hsl(28 30% 35%)",
                          boxShadow:
                            "0 2px 8px rgba(60,40,15,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                        }}
                      >
                        <span className="pointer-events-none select-none font-sans text-[8px] uppercase tracking-[0.35em] text-white/90">
                          Tear to Open
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── 7. ENVELOPE BLUR (softens envelope after letter rises) ── */}
              <motion.div
                animate={past("revealed") ? { opacity: 0.6 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-0 right-0 backdrop-blur-[3px]"
                style={{
                  top: FLAP_H,
                  height: ENV_H,
                  zIndex: 25,
                  pointerEvents: "none",
                  background: "hsla(36, 30%, 92%, 0.35)",
                  borderRadius: "0 0 6px 6px",
                }}
              />
            </div>

            {/* ── Enter button ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                phase === "revealed"
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
