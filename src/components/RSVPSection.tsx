import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import WeddingLogo from "./WeddingLogo";
import { toast } from "sonner";

const SEND_ANIMATION_MS = 2500;
const ENV_W = 356;
const ENV_H = 224;
const FLAP_H = 122;
const BODY_TOP = 118;
const EASE = [0.22, 1, 0.36, 1] as const;

const SendingAnimation = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Sending Your Reply
        </p>
        <h3 className="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">
          Sealing Your Note And Sending It Away
        </h3>
      </div>

      <div
        className="relative mx-auto mt-12 h-[380px] w-full max-w-[440px] overflow-hidden"
        style={{ perspective: "900px" }}
      >
        <motion.div
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          animate={{ opacity: 0, x: 136, y: -126, rotate: -10, scale: 0.84 }}
          transition={{
            duration: 0.92,
            delay: 1.05,
            ease: EASE,
          }}
          className="absolute inset-x-0 top-0 z-[8] mx-auto h-[340px]"
          style={{ width: ENV_W }}
        >
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0.12, y: 48, scale: 0.88 }}
            transition={{ duration: 0.82, delay: 0.18, ease: EASE }}
            className="absolute inset-0 z-[1] origin-center"
          >
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
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: 22, scale: 0.94 }}
              transition={{ duration: 0.54, delay: 0.16, ease: EASE }}
              className="absolute inset-x-[22px]"
              style={{
                top: BODY_TOP - FLAP_H + 8,
                height: FLAP_H,
                zIndex: 1,
                clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                background: "linear-gradient(180deg, #f5edde 0%, #ece1cf 58%, #e2d6c2 100%)",
                borderLeft: "1px solid rgba(213,201,182,0.72)",
                borderRight: "1px solid rgba(213,201,182,0.72)",
                borderTop: "1px solid rgba(213,201,182,0.72)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: -24, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="absolute inset-x-[22px]"
              style={{
                top: BODY_TOP + 4,
                height: 136,
                zIndex: 12,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #f5edde 0%, #ece1cf 58%, #e2d6c2 100%)",
                borderLeft: "1px solid rgba(213,201,182,0.72)",
                borderRight: "1px solid rgba(213,201,182,0.72)",
                borderBottom: "1px solid rgba(213,201,182,0.72)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.38, y: -22 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.68, ease: EASE }}
              className="absolute left-1/2 z-[14] -translate-x-1/2"
              style={{
                top: BODY_TOP + 82,
              }}
            >
              <div className="rounded-full border border-[#d9c9b7] bg-[#fbf7f0] p-1.5 shadow-[0_12px_24px_rgba(88,64,40,0.16)]">
                <div className="scale-[0.8]">
                  <WeddingLogo size="small" showText={false} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={{ y: 126, scale: 0.94, opacity: 0.12 }}
          transition={{ duration: 1.05, ease: EASE }}
          className="absolute left-1/2 top-4 z-[10] h-[186px] w-[272px] rounded-[24px] border border-[#e6d7c4] bg-[#fffdfa] px-8 py-8 shadow-[0_22px_40px_rgba(104,72,45,0.08)]"
          style={{ marginLeft: "-136px", willChange: "transform, opacity" }}
        >
          <div className="mb-5 flex items-center justify-center gap-3 text-[#d8c0a1]/90">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-current" />
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-current" />
          </div>

          <p className="text-center font-serif text-[2.1rem] font-light text-foreground">RSVP</p>
          <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.32em] text-primary/60">
            Reply Enclosed With Love
          </p>

          <div className="mt-5 space-y-3">
            <div className="mx-auto h-[1px] w-[74%] bg-primary/20" />
            <div className="mx-auto h-[1px] w-[58%] bg-primary/14" />
            <div className="mx-auto h-[1px] w-[66%] bg-primary/14" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute left-1/2 top-[190px] z-[2] h-[18px] w-[268px] -translate-x-1/2 rounded-full bg-primary/8 blur-md"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.48, 0] }}
          transition={{ duration: 0.82, delay: 1.08, times: [0, 0.34, 1], ease: "easeOut" }}
          className="absolute left-[14%] top-[66%] h-[2px] w-[214px] bg-gradient-to-r from-primary/0 via-primary/24 to-primary/0"
        />
      </div>
    </div>
  );
};

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    event: "",
    dietary: "",
    wishes: "",
  });
  const [submitPhase, setSubmitPhase] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    if (submitPhase !== "sending") {
      return;
    }

    const timer = window.setTimeout(() => {
      setSubmitPhase("done");
      toast.success("Thank you! Your RSVP has been received.");
    }, SEND_ANIMATION_MS);

    return () => window.clearTimeout(timer);
  }, [submitPhase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitPhase("sending");
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border px-0 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors";

  return (
    <section id="rsvp" className="bg-warm-white py-20 md:py-24">
      <div className="container mx-auto max-w-xl px-6">
        <AnimatedSection>
          <div className="mb-16 text-center">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Répondez S&apos;il Vous Plaît
            </p>
            <h2 className="mb-4 font-serif text-4xl font-light text-foreground md:text-5xl">
              RSVP
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              Kindly respond by October 1, 2026
            </p>
          </div>
        </AnimatedSection>

        {submitPhase === "done" ? (
          <AnimatedSection>
            <div className="py-16 text-center">
              <h3 className="mb-4 font-serif text-3xl text-foreground">Thank You!</h3>
              <p className="text-sm text-muted-foreground font-sans">
                We&apos;ve received your response. We can&apos;t wait to celebrate with you!
              </p>
              <button
                type="button"
                onClick={() => setSubmitPhase("idle")}
                className="mt-8 rounded-full border border-primary/20 px-6 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary/5"
              >
                Send Another Reply
              </button>
            </div>
          </AnimatedSection>
        ) : submitPhase === "sending" ? (
          <AnimatedSection>
            <SendingAnimation />
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-10">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClasses}
              />

              <div>
                <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Will you attend?
                </p>
                <div className="flex gap-6">
                  {["Joyfully Accept", "Regretfully Decline"].map((option) => (
                    <label key={option} className="group flex cursor-pointer items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                          formData.attending === option
                            ? "border-primary bg-primary"
                            : "border-border group-hover:border-primary"
                        }`}
                      />
                      <span className="font-sans text-sm text-muted-foreground">{option}</span>
                      <input
                        type="radio"
                        name="attending"
                        value={option}
                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                        className="sr-only"
                        required
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4 font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Which celebration?
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Nam Định (22 Nov)", "Huế (25 Nov)", "Both"].map((option) => (
                    <label key={option} className="group flex cursor-pointer items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full border-2 transition-colors ${
                          formData.event === option
                            ? "border-primary bg-primary"
                            : "border-border group-hover:border-primary"
                        }`}
                      />
                      <span className="font-sans text-sm text-muted-foreground">{option}</span>
                      <input
                        type="radio"
                        name="event"
                        value={option}
                        onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                        className="sr-only"
                        required
                      />
                    </label>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Dietary requirements (if any)"
                value={formData.dietary}
                onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                className={inputClasses}
              />

              <textarea
                placeholder="Send your wishes to the couple"
                value={formData.wishes}
                onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                rows={3}
                className="min-h-[96px] w-full resize-none rounded-[18px] border border-border bg-transparent px-4 py-4 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none transition-colors"
              />

              <div className="pt-4 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-primary px-12 py-3 font-sans text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Send RSVP
                </motion.button>
              </div>
            </form>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;
