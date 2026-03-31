import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    attending: "",
    event: "",
    dietary: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! Your RSVP has been received.");
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border px-0 py-3 text-sm font-sans text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary transition-colors";

  return (
    <section id="rsvp" className="py-28 md:py-36 bg-warm-white">
      <div className="container mx-auto px-6 max-w-xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              Répondez S'il Vous Plaît
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-4">
              RSVP
            </h2>
            <p className="text-muted-foreground font-sans text-sm">
              Kindly respond by October 1, 2026
            </p>
          </div>
        </AnimatedSection>

        {submitted ? (
          <AnimatedSection>
            <div className="text-center py-16">
              <h3 className="font-serif text-3xl text-foreground mb-4">Thank You!</h3>
              <p className="text-muted-foreground font-sans text-sm">
                We've received your response. We can't wait to celebrate with you!
              </p>
            </div>
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
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 font-sans">
                  Will you attend?
                </p>
                <div className="flex gap-6">
                  {["Joyfully Accept", "Regretfully Decline"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          formData.attending === option
                            ? "border-primary bg-primary"
                            : "border-border group-hover:border-primary"
                        }`}
                      />
                      <span className="text-sm font-sans text-muted-foreground">{option}</span>
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
                <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 font-sans">
                  Which celebration?
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Nam Định (22 Nov)", "Huế (25 Nov)", "Both"].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-colors ${
                          formData.event === option
                            ? "border-primary bg-primary"
                            : "border-border group-hover:border-primary"
                        }`}
                      />
                      <span className="text-sm font-sans text-muted-foreground">{option}</span>
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

              <div className="text-center pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-12 py-3 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-sans hover:opacity-90 transition-opacity"
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
