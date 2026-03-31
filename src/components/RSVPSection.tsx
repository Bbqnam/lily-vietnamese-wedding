import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const SEND_ANIMATION_MS = 2800;

const SendingAnimation = () => {
  return (
    <div className="py-12 md:py-16">
      <div className="text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Sending Your Reply
        </p>
        <h3 className="mt-4 font-serif text-3xl font-light text-foreground md:text-4xl">
          Folding Your Note Into An Envelope
        </h3>
      </div>

      <div className="relative mx-auto mt-12 h-[320px] w-full max-w-[420px] overflow-hidden">
        <motion.div
          initial={{ y: 0, scale: 1, opacity: 1 }}
          animate={{
            y: [0, 0, 56, 74],
            scale: [1, 1, 0.94, 0.9],
            opacity: [1, 1, 1, 0.94],
          }}
          transition={{ duration: 1.1, times: [0, 0.28, 0.78, 1], ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-4 z-[1] h-[158px] w-[230px] -translate-x-1/2 rounded-[24px] border border-[#e6d7c4] bg-[#fffdfa] px-6 py-6 shadow-[0_22px_40px_rgba(104,72,45,0.08)]"
        >
          <p className="font-serif text-[2rem] font-light text-foreground">RSVP</p>
          <div className="mt-5 space-y-3">
            <div className="h-[1px] w-[72%] bg-primary/20" />
            <div className="h-[1px] w-[58%] bg-primary/14" />
            <div className="h-[1px] w-[66%] bg-primary/14" />
          </div>
        </motion.div>

        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: [0, 0, -172] }}
          transition={{ duration: 0.78, delay: 0.92, times: [0, 0.2, 1], ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[116px] z-[4] h-[110px] w-[320px] -translate-x-1/2 origin-top"
          style={{
            transformStyle: "preserve-3d",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background:
              "linear-gradient(180deg, rgba(244,234,218,1) 0%, rgba(236,223,205,1) 100%)",
            border: "1px solid rgba(217,194,165,0.72)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.4, y: -28 }}
          animate={{ opacity: [0, 0, 1, 1], scale: [0.4, 0.4, 1.08, 1], y: [-28, -28, 0, 0] }}
          transition={{ duration: 0.65, delay: 1.5, times: [0, 0.32, 0.72, 1], ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[148px] z-[5] flex h-[58px] w-[58px] -translate-x-1/2 items-center justify-center rounded-full border border-primary/28 bg-background shadow-[0_14px_28px_rgba(104,72,45,0.12)]"
        >
          <div className="h-[18px] w-[18px] rounded-full border border-primary/50 bg-primary/10" />
        </motion.div>

        <motion.div
          initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
          animate={{
            x: [0, 0, 18, 132],
            y: [0, 0, -18, -136],
            rotate: [0, 0, -4, -12],
            scale: [1, 1, 0.98, 0.86],
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: 1.1, delay: 1.7, times: [0, 0.2, 0.58, 1], ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-4 z-[2] mx-auto h-[168px] w-[320px]"
        >
          <div className="absolute inset-x-0 bottom-0 h-[118px] rounded-b-[28px] border border-[#e4d6c3] bg-[linear-gradient(180deg,#faf6f0_0%,#f5ede3_100%)]" />
          <div
            className="absolute bottom-0 left-0 h-[118px] w-1/2 border-r border-[#eadccc]/70"
            style={{ clipPath: "polygon(0 0, 100% 50%, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-[118px] w-1/2 border-l border-[#eadccc]/70"
            style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[118px]"
            style={{
              clipPath: "polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%)",
              background:
                "linear-gradient(180deg, rgba(246,238,228,1) 0%, rgba(240,229,216,1) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0.5, 0] }}
          transition={{ duration: 1.1, delay: 1.84, times: [0, 0.24, 0.54, 1], ease: "easeOut" }}
          className="absolute left-[9%] top-[58%] h-[2px] w-[200px] bg-gradient-to-r from-primary/0 via-primary/24 to-primary/0"
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
