import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import WeddingLogo from "./WeddingLogo";
import { useLanguage } from "@/contexts/LanguageContext";

type Phase = "sealed" | "opening" | "revealed";

type WelcomeOverlayProps = {
  open: boolean;
  onComplete: () => void;
};

const ENV_W = 430;
const ENV_H = 248;
const FLAP_H = 132;
const BODY_TOP = 130;
const PULL_THRESHOLD = 26;
const EASE = [0.22, 1, 0.36, 1] as const;

const WelcomeOverlay = ({ open, onComplete }: WelcomeOverlayProps) => {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("sealed");
  const [isLeaving, setIsLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (open) {
      setPhase("sealed");
      setIsLeaving(false);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, []);

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const startOpening = () => {
    if (phase !== "sealed") {
      return;
    }

    setPhase("opening");
    schedule(() => setPhase("revealed"), 1020);
  };

  const handlePullEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (phase !== "sealed") {
      return;
    }

    if (Math.abs(info.offset.y) >= PULL_THRESHOLD) {
      startOpening();
    }
  };

  const handleEnter = () => {
    if (phase !== "revealed") {
      return;
    }

    setIsLeaving(true);
    schedule(onComplete, 40);
  };

  const isOpening = phase === "opening" || phase === "revealed";
  const isRevealed = phase === "revealed";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto px-3 py-4 sm:px-4 sm:py-8 md:px-6"
          style={{
            background:
              "radial-gradient(ellipse at center, #fffaf2 0%, #ead8c5 58%, #b98576 100%)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation"
        >
          <motion.div
            animate={phase === "sealed" ? { opacity: 1, y: 0 } : { opacity: 0.34, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-0 top-5 flex flex-col items-center px-5 text-center sm:top-10"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-primary/60">
              {language === "vi" ? "Trân Trọng Kính Mời" : "Welcome"}
            </p>
            <h1 className="mt-2 max-w-[22rem] font-serif text-[1.55rem] font-light leading-tight text-foreground/80 sm:max-w-none sm:text-[2rem] sm:leading-none md:text-[2.5rem]">
              {language === "vi" ? "Đến Chung Vui Cùng Nam & Linh" : "To The Wedding Celebration Of Nam & Linh"}
            </h1>
          </motion.div>

          <div className="relative flex w-full max-w-4xl flex-col items-center">
            <div
              className="relative mx-auto overflow-visible"
              style={{
                width: `min(${ENV_W}px, 92vw)`,
                height: FLAP_H + ENV_H + 132,
                perspective: "900px",
              }}
            >
              <motion.div
                animate={
                  isOpening
                    ? { opacity: 1, y: -132, scale: 1.015 }
                    : { opacity: 0, y: 88, scale: 0.97 }
                }
                transition={{ duration: 0.9, ease: EASE }}
                className="pointer-events-auto absolute inset-x-[-3px] z-[40] sm:inset-x-[-22px]"
                style={{ top: BODY_TOP - 6, pointerEvents: isRevealed && !isLeaving ? "auto" : "none" }}
              >
                <div
                    className="relative overflow-hidden rounded-[24px] p-[1.5px] text-center sm:rounded-[30px]"
                  style={{
                    boxShadow: "0 34px 78px rgba(0,0,0,0.16), 0 10px 24px rgba(124,92,60,0.08)",
                  }}
                >
                  <motion.div
                    aria-hidden="true"
                    animate={{ rotate: isRevealed ? 360 : 180 }}
                    transition={{ duration: isRevealed ? 14 : 0.9, repeat: isRevealed ? Infinity : 0, ease: "linear" }}
                    className="pointer-events-none absolute inset-[-42%] opacity-75"
                    style={{
                      background:
                        "conic-gradient(from 0deg, rgba(255,227,184,0) 0deg, rgba(255,205,132,0.94) 60deg, rgba(255,242,214,0.24) 108deg, rgba(255,188,124,0.88) 168deg, rgba(255,229,186,0.18) 220deg, rgba(255,213,146,0.9) 282deg, rgba(255,227,184,0) 360deg)",
                    }}
                  />

                  <div
                    className="pointer-events-none absolute inset-[1.5px] rounded-[22px] sm:rounded-[28px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,252,247,0.985) 0%, rgba(252,247,239,1) 45%, rgba(247,238,226,1) 100%)",
                    }}
                  />

                  <div className="pointer-events-none absolute inset-[8px] rounded-[17px] border border-[#eadfcd]/90 sm:inset-[10px] sm:rounded-[22px]" />

                  <div
                    className="pointer-events-none absolute inset-x-10 top-0 h-24"
                    style={{
                      background:
                        "radial-gradient(circle at top, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 72%)",
                    }}
                  />

                  <div className="relative z-10 flex flex-col items-center px-5 py-7 sm:px-10 sm:py-11 md:px-12 md:py-12">
                    <div className="mb-3 flex w-full items-center gap-3 text-[#d8c0a1]/90 sm:mb-5 sm:gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-current" />
                      <div className="h-1.5 w-1.5 rounded-full bg-current" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-current" />
                    </div>

                    <div className="mb-2 scale-[0.76] sm:mb-4 sm:scale-[0.9]">
                      <WeddingLogo size="default" showText={false} />
                    </div>

                    <p className="mb-3 bg-gradient-to-r from-[#b97743] via-[#d8a46b] to-[#c88756] bg-clip-text font-sans text-[10px] uppercase tracking-[0.3em] text-transparent sm:mb-4 sm:text-[13px] sm:tracking-[0.38em]">
                      {language === "vi" ? "Trân Trọng Kính Mời" : "You Are Invited"}
                    </p>

                    <h2 className="whitespace-nowrap bg-gradient-to-r from-[#681626] via-[#b8793f] to-[#681626] bg-clip-text font-serif text-[2.85rem] font-light leading-none text-transparent sm:text-[3.85rem] md:text-[4.5rem]">
                      Nam &amp; Linh
                    </h2>

                    <p className="mx-auto mt-4 max-w-[330px] font-sans text-sm leading-6 text-foreground/72 sm:mt-5 sm:max-w-[360px] sm:text-[1.05rem] sm:leading-8">
                      {language === "vi"
                        ? "Mời bạn đến Việt Nam chung vui ngày cưới cùng chúng mình."
                        : "Join us in Vietnam as we celebrate our wedding with the people we love most."}
                    </p>

                    <div className="mt-4 rounded-full border border-[#e2cfb4] bg-[#f6ecde] px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:mt-6 sm:px-5">
                      <p className="bg-gradient-to-r from-[#9c7449] via-[#c19867] to-[#9c7449] bg-clip-text font-sans text-[11px] uppercase tracking-[0.3em] text-transparent">
                        22 &amp; 28 · 11 · 2026
                      </p>
                    </div>

                    <div className="mt-5 w-full sm:mt-8 sm:w-auto">
                      <button
                        type="button"
                        onClick={handleEnter}
                        className="group inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-full border border-[#936a41] px-5 py-3 font-sans text-[9px] uppercase tracking-[0.26em] text-[#fff8ef] transition-all duration-300 hover:-translate-y-0.5 sm:min-w-[17.5rem] sm:px-9 sm:py-3.5 sm:text-[10px] sm:tracking-[0.34em]"
                        style={{
                          background:
                            "linear-gradient(135deg, #a13749 0%, #7f1d2f 48%, #5d1220 100%)",
                          boxShadow:
                            "0 14px 28px rgba(93,18,32,0.30), inset 0 1px 0 rgba(255,243,225,0.32)",
                        }}
                      >
                        <span>{language === "vi" ? "Mở Thiệp Cưới" : "Enter The Wedding Site"}</span>
                        <span className="text-[0.8rem] transition-transform duration-300 group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </div>

                    <div className="mt-4 flex w-full items-center gap-3 text-[#d8c0a1]/80 sm:mt-6 sm:gap-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d8c0a1]" />
                      <div className="h-1.5 w-1.5 rounded-full bg-[#d8c0a1]" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d8c0a1]" />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={
                  isOpening
                    ? { opacity: 0.16, y: 42, scale: 0.88 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{ duration: 0.78, ease: EASE }}
                className="pointer-events-none absolute inset-0 z-[8] origin-center"
              >
                <motion.div
                  animate={isOpening ? { opacity: 0, y: -18, scaleY: 0.94 } : { opacity: 1, y: 0, scaleY: 1 }}
                  transition={{ duration: 0.56, ease: EASE }}
                  className="absolute inset-x-[22px]"
                  style={{
                    top: BODY_TOP + 4,
                    height: 138,
                    zIndex: 12,
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg, #f5edde 0%, #ece1cf 58%, #e2d6c2 100%)",
                    borderLeft: "1px solid rgba(213,201,182,0.72)",
                    borderRight: "1px solid rgba(213,201,182,0.72)",
                    borderBottom: "1px solid rgba(213,201,182,0.72)",
                    transformOrigin: "center top",
                  }}
                />

                <div
                  className="absolute inset-x-0 rounded-[6px_6px_22px_22px]"
                  style={{
                    top: BODY_TOP,
                    height: ENV_H,
                    background: "linear-gradient(180deg, #efe5d5 0%, #eadfce 100%)",
                    boxShadow: "0 24px 60px rgba(0,0,0,0.16), 0 6px 14px rgba(60,40,15,0.06)",
                  }}
                />

                <div
                  className="absolute left-0"
                  style={{
                    top: BODY_TOP + 6,
                    width: "50%",
                    height: ENV_H - 8,
                    background: "linear-gradient(135deg, #e8dccb 0%, #dfd2bf 100%)",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    zIndex: 2,
                  }}
                />

                <div
                  className="absolute right-0"
                  style={{
                    top: BODY_TOP + 6,
                    width: "50%",
                    height: ENV_H - 8,
                    background: "linear-gradient(-135deg, #e5d8c6 0%, #dccfbc 100%)",
                    clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
                    zIndex: 2,
                  }}
                />

                <div
                  className="absolute inset-x-[12px] overflow-hidden rounded-b-[22px]"
                  style={{
                    top: BODY_TOP + 10,
                    height: ENV_H - 12,
                    background: "linear-gradient(180deg, #f0e6d7 0%, #e9decd 100%)",
                    zIndex: 3,
                  }}
                />

                <div
                  className="absolute inset-x-0"
                  style={{
                    top: BODY_TOP + 10,
                    height: ENV_H - 12,
                    background: "linear-gradient(180deg, #efe4d3 0%, #e4d6c2 100%)",
                    clipPath: "polygon(0 100%, 50% 28%, 100% 100%)",
                    borderBottomLeftRadius: "22px",
                    borderBottomRightRadius: "22px",
                    zIndex: 8,
                  }}
                />

                <motion.div
                  animate={isOpening ? { opacity: 1, y: -6, scale: 1 } : { opacity: 0, y: 18, scale: 0.94 }}
                  transition={{ duration: 0.96, ease: EASE }}
                  className="absolute inset-x-0"
                  style={{
                    top: BODY_TOP - FLAP_H + 4,
                    height: FLAP_H,
                    zIndex: 14,
                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                    background: "linear-gradient(180deg, #ddd0bc 0%, #eadfce 38%, #f4ecdf 100%)",
                    borderLeft: "1px solid #d5c9b6",
                    borderRight: "1px solid #d5c9b6",
                    borderBottom: "1px solid #d5c9b6",
                  }}
                />
              </motion.div>

              {phase === "sealed" && (
                <motion.div
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="absolute left-1/2 z-[26] -translate-x-1/2"
                  style={{
                    top: BODY_TOP + 78,
                    marginLeft: "-30px",
                    pointerEvents: "auto",
                  }}
                >
                  <motion.button
                    type="button"
                    drag="y"
                    dragConstraints={{ top: -10, bottom: 48 }}
                    dragElastic={0.08}
                    dragSnapToOrigin
                    onDragEnd={handlePullEnd}
                    onClick={startOpening}
                    aria-label={language === "vi" ? "Kéo hoặc nhấn vào chữ lồng để mở thiệp" : "Pull or click the monogram to open"}
                    className="cursor-grab rounded-full active:cursor-grabbing"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,251,245,0.98) 0%, rgba(255,247,237,0.82) 55%, rgba(255,247,237,0) 88%)",
                    }}
                  >
                    <div className="rounded-full border border-[#d9c9b7] bg-[#fbf7f0] p-1.5 shadow-[0_12px_24px_rgba(88,64,40,0.16)]">
                      <div className="scale-[0.84]">
                        <WeddingLogo size="small" showText={false} />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              )}
            </div>

            {phase === "sealed" && (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="-mt-2"
              >
                <div className="flex items-center justify-center gap-3 text-[#b9966c]">
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-current" />
                  <svg viewBox="0 0 140 22" className="h-6 w-[8.5rem]" aria-hidden="true">
                    <path
                      d="M6 11C20 11 22 4 30 4C38 4 40 11 54 11C68 11 70 4 78 4C86 4 88 11 102 11C116 11 118 4 126 4C132 4 135 8 134 11C135 14 132 18 126 18C118 18 116 11 102 11C88 11 86 18 78 18C70 18 68 11 54 11C40 11 38 18 30 18C22 18 20 11 6 11Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="70" cy="11" r="2.1" fill="currentColor" />
                  </svg>
                  <div className="h-px w-10 bg-gradient-to-l from-transparent to-current" />
                </div>
                <div className="mt-2 rounded-full border border-[#e0ceb7] bg-[linear-gradient(180deg,#fbf3e8_0%,#f4e8d6_100%)] px-6 py-3 shadow-[0_12px_24px_rgba(150,118,80,0.1),inset_0_1px_0_rgba(255,255,255,0.82)]">
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary/70">
                    {language === "vi" ? "Nhấn hoặc kéo nhẹ chữ lồng để mở thiệp" : "Click or gently pull the monogram to open your invitation"}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
