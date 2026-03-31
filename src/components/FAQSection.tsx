import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const faqs = [
  {
    q: "Can I bring a plus one?",
    a: "Your invitation will specify the number of guests. If you'd like to bring someone not mentioned, please reach out to us directly.",
  },
  {
    q: "What's the weather like in Vietnam in November?",
    a: "November is a lovely time to visit. Expect pleasant temperatures around 20–28°C. In Huế, occasional light rain is possible — we recommend bringing a light layer.",
  },
  {
    q: "Will there be vegetarian/vegan options?",
    a: "Absolutely! Our menu will include a variety of options. Please note any dietary needs in your RSVP.",
  },
  {
    q: "Do I need a visa to visit Vietnam?",
    a: "It depends on your nationality. Many countries qualify for e-visa or visa-on-arrival. We recommend checking Vietnam's official immigration portal well in advance.",
  },
  {
    q: "What gift should I bring?",
    a: "Your presence is the greatest gift! If you'd like to give something, a monetary gift in a red envelope is a beautiful Vietnamese tradition.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
              Questions
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
              FAQ
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-0">
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={0.05 * i}>
              <div className="border-b border-border">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm text-muted-foreground font-sans leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
