import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check, Clock3, Heart, MapPin, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import rsvpPhoto from "@/assets/photos/rsvp-save-the-date.jpg";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

type SubmitPhase = "idle" | "sending" | "done";

const RSVPSection = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", attending: "", event: "", guestCount: "1", wishes: "" });
  const [website, setWebsite] = useState("");
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = import.meta.env.VITE_RSVP_ENDPOINT?.trim();
    setSubmitError("");

    if (website) {
      setSubmitPhase("done");
      return;
    }

    if (!endpoint) {
      setSubmitError(language === "vi" ? "Biểu mẫu chưa được kết nối. Vui lòng liên hệ trực tiếp với Nam hoặc Linh." : "The RSVP destination has not been connected yet. Please contact Nam or Linh directly.");
      return;
    }

    setSubmitPhase("sending");
    try {
      const payload = {
        ...formData,
        event: formData.attending === "decline" ? "" : formData.event,
        guestCount: formData.attending === "decline" ? 0 : Number(formData.guestCount),
        language,
        submittedAt: new Date().toISOString(),
        submissionId: window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      };
      const isGoogleAppsScript = endpoint.startsWith("https://script.google.com/macros/s/");

      if (isGoogleAppsScript && !endpoint.endsWith("/exec")) {
        throw new Error("The Google Apps Script endpoint must be the deployed /exec URL.");
      }

      const [response] = await Promise.all([
        fetch(
          endpoint,
          isGoogleAppsScript
            ? {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload),
              }
            : {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(payload),
              },
        ),
        new Promise((resolve) => window.setTimeout(resolve, 700)),
      ]);
      if (!isGoogleAppsScript && !response.ok) throw new Error(`RSVP request failed (${response.status})`);
      setSubmitPhase("done");
      toast.success(language === "vi" ? "Đã nhận được xác nhận của bạn." : "Your RSVP has been received.");
    } catch (error) {
      console.error(error);
      setSubmitPhase("idle");
      setSubmitError(language === "vi" ? "Không thể gửi xác nhận. Vui lòng thử lại hoặc liên hệ trực tiếp với Nam hoặc Linh." : "We couldn't send your RSVP. Please try again or contact Nam or Linh directly.");
    }
  };

  const attendanceOptions = [
    { value: "accept", label: language === "vi" ? "Vui vẻ nhận lời" : "Joyfully accept" },
    { value: "decline", label: language === "vi" ? "Rất tiếc không thể tham dự" : "Regretfully decline" },
  ];
  const eventOptions = [
    { value: "Nam Định (22 Nov)", label: "Nam Định", date: "22.11" },
    { value: "Huế (28 Nov)", label: "Huế", date: "28.11" },
    { value: "Both", label: language === "vi" ? "Cả hai" : "Both", date: "22 + 28" },
  ];

  return (
    <section id="rsvp" className="relative overflow-hidden bg-background py-12 md:py-20">
      <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-9">
            <p className="mb-3 font-sans text-xs uppercase tracking-[0.32em] text-primary">{language === "vi" ? "Xác Nhận Tham Dự" : "Répondez S'il Vous Plaît"}</p>
            <h2 className="font-serif text-[2.65rem] font-light leading-none text-foreground sm:text-5xl md:text-6xl">{language === "vi" ? "Bạn sẽ đến chứ?" : "Will you join us?"}</h2>
            <p className="mt-4 font-sans text-sm text-muted-foreground">{language === "vi" ? "Vui lòng phản hồi trước ngày 1 tháng 10, 2026" : "Kindly reply by October 1, 2026"}</p>
          </div>
        </AnimatedSection>

        <div className="grid overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-[0_24px_65px_rgba(74,38,30,0.12)] sm:rounded-[32px] lg:grid-cols-[0.82fr_1.18fr]">
          <AnimatedSection className="flex min-h-full flex-col bg-primary text-primary-foreground">
            <div className="relative shrink-0 overflow-hidden">
              <img src={rsvpPhoto} alt={language === "vi" ? "Nam và Linh cùng tấm bảng Save the Date" : "Nam and Linh with their Save the Date signs"} className="block h-auto w-full" width={1600} height={1067} loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-5 px-5 py-6 text-left sm:gap-6 sm:px-7 sm:py-7 md:px-9 md:py-8">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary-foreground/85 sm:text-sm">{language === "vi" ? "Hai ngày chung vui" : "Two celebrations"}</p>
                <h3 className="mt-2 font-serif text-[1.75rem] font-light leading-tight sm:text-3xl">{language === "vi" ? "Một lời hẹn từ trái tim" : "One heartfelt invitation"}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex min-h-[108px] flex-col items-start justify-between rounded-2xl border border-primary-foreground/20 bg-black/10 p-3.5 sm:min-h-[126px] sm:p-4">
                  <CalendarDays size={18} className="text-[#e4bc72]" />
                  <div className="mt-5">
                    <p className="font-serif text-lg leading-none sm:text-xl">22.11.2026</p>
                    <p className="mt-2 text-xs uppercase leading-5 tracking-[0.06em] text-primary-foreground/85 sm:text-sm sm:tracking-[0.08em]">Nam Định · 09:30</p>
                  </div>
                </div>
                <div className="flex min-h-[108px] flex-col items-start justify-between rounded-2xl border border-primary-foreground/20 bg-black/10 p-3.5 sm:min-h-[126px] sm:p-4">
                  <Clock3 size={18} className="text-[#e4bc72]" />
                  <div className="mt-5">
                    <p className="font-serif text-lg leading-none sm:text-xl">28.11.2026</p>
                    <p className="mt-2 text-xs uppercase leading-5 tracking-[0.06em] text-primary-foreground/85 sm:text-sm sm:tracking-[0.08em]">Huế · 11:00</p>
                  </div>
                </div>
              </div>
              <p className="flex items-start gap-2 text-sm leading-6 text-primary-foreground/85"><MapPin size={14} className="mt-0.5 shrink-0" /> {language === "vi" ? "Việt Nam · Hẹn gặp bạn tại một hoặc cả hai buổi lễ" : "Vietnam · Join us at one or both celebrations"}</p>
              <div className="rounded-2xl border border-[#e4bc72]/30 px-4 py-5 text-center">
                <Heart size={22} strokeWidth={1.3} className="mx-auto mb-3 text-[#e4bc72]" aria-hidden="true" />
                <p className="font-serif text-xl italic leading-7 text-primary-foreground/90">{language === "vi" ? "Bạn mang nụ cười, chúng mình chuẩn bị ngày vui!" : "Bring your smiles. We’ll bring the happy tears!"}</p>
              </div>
            </div>
          </AnimatedSection>

          <div className="flex min-h-0 items-center bg-[#fffaf2] p-5 py-8 sm:p-7 md:p-10 lg:min-h-[620px] lg:p-12">
            {submitPhase === "done" ? (
              <AnimatedSection className="mx-auto max-w-md text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check size={28} /></div>
                <h3 className="mt-6 font-serif text-4xl font-light text-foreground">{language === "vi" ? "Cảm ơn bạn!" : "Thank you!"}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">{language === "vi" ? "Chúng mình đã nhận được phản hồi và rất mong được chung vui cùng bạn." : "We've received your reply and cannot wait to celebrate with you."}</p>
                <button type="button" onClick={() => setSubmitPhase("idle")} className="mt-7 rounded-full border border-primary/25 px-6 py-3 text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:bg-primary/5">{language === "vi" ? "Gửi phản hồi khác" : "Send another reply"}</button>
              </AnimatedSection>
            ) : submitPhase === "sending" ? (
              <AnimatedSection className="mx-auto text-center">
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }} transition={{ duration: 1.1, repeat: Infinity }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_16px_36px_rgba(120,27,42,0.25)]"><Send size={30} /></motion.div>
                <h3 className="mt-7 font-serif text-3xl font-light text-foreground">{language === "vi" ? "Đang gửi lời hồi âm…" : "Sending your reply…"}</h3>
              </AnimatedSection>
            ) : (
              <AnimatedSection className="w-full">
                <form onSubmit={handleSubmit} className="space-y-5 text-left sm:space-y-7">
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(event) => setWebsite(event.target.value)}
                    />
                  </div>
                  <div>
                    <p className={`mb-3 flex items-center gap-3 font-sans uppercase leading-5 text-primary ${language === "vi" ? "text-xs tracking-[0.15em]" : "text-xs tracking-[0.19em]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>{language === "vi" ? "Tên của bạn" : "Your name"}</p>
                    <input type="text" placeholder={language === "vi" ? "Họ và tên" : "Full name"} required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="min-h-12 w-full rounded-xl border border-border bg-white/75 px-4 py-3 font-sans text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  </div>

                  <fieldset>
                    <legend className={`mb-3 flex items-center gap-3 font-sans uppercase leading-5 text-primary ${language === "vi" ? "text-xs tracking-[0.15em]" : "text-xs tracking-[0.19em]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>{language === "vi" ? "Bạn có thể tham dự?" : "Can you attend?"}</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {attendanceOptions.map((option) => (
                        <label key={option.value} className={`flex min-h-[64px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all focus-within:ring-2 focus-within:ring-primary/25 ${formData.attending === option.value ? "border-primary bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(120,27,42,0.16)]" : "border-border bg-white/70 text-muted-foreground hover:border-primary/50"}`}>
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${formData.attending === option.value ? "border-primary-foreground/50 bg-primary-foreground text-primary" : "border-border"}`}>{formData.attending === option.value ? <Check size={12} /> : null}</span>
                          <span className={`font-sans leading-5 ${language === "vi" ? "text-sm sm:text-base" : "text-sm"}`}>{option.label}</span>
                          <input type="radio" name="attending" value={option.value} checked={formData.attending === option.value} onChange={(e) => setFormData({ ...formData, attending: e.target.value, event: e.target.value === "decline" ? "" : formData.event })} className="sr-only" required />
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {formData.attending !== "decline" ? (
                    <fieldset>
                      <legend className={`mb-3 flex items-center gap-3 font-sans uppercase leading-5 text-primary ${language === "vi" ? "text-xs tracking-[0.13em]" : "text-xs tracking-[0.19em]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>{language === "vi" ? "Bạn sẽ tham dự tiệc nào?" : "Which celebration?"}</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {eventOptions.map((option) => (
                          <label key={option.value} className={`flex min-h-[82px] cursor-pointer flex-col items-center justify-center rounded-xl border px-1.5 py-3 text-center transition-all focus-within:ring-2 focus-within:ring-accent/25 sm:min-h-[86px] sm:px-2 ${formData.event === option.value ? "border-accent bg-accent text-accent-foreground shadow-[0_8px_18px_rgba(44,98,73,0.16)]" : "border-border bg-white/70 text-muted-foreground hover:border-accent/50"}`}>
                            <span className="block font-serif text-[1rem] leading-tight sm:text-lg sm:leading-none">{option.label}</span>
                            <span className="mt-1.5 block text-xs uppercase tracking-[0.14em] opacity-75">{option.date}</span>
                            <input type="radio" name="event" value={option.value} checked={formData.event === option.value} onChange={(e) => setFormData({ ...formData, event: e.target.value })} className="sr-only" required={formData.attending === "accept"} />
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : null}

                  {formData.attending !== "decline" ? (
                    <div>
                      <label htmlFor="guestCount" className={`mb-3 flex items-center gap-3 font-sans uppercase leading-5 text-primary ${language === "vi" ? "text-xs tracking-[0.13em]" : "text-xs tracking-[0.19em]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>{language === "vi" ? "Số người tham dự" : "Number of people"}</label>
                      <select id="guestCount" name="guestCount" required value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} aria-describedby="guestCountHelp" className="min-h-12 w-full rounded-xl border border-border bg-white/75 px-4 py-3 font-sans text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10">
                        {[1, 2, 3, 4, 5].map((count) => (
                          <option key={count} value={count}>{language === "vi" ? `${count} người` : `${count} ${count === 1 ? "person" : "people"}`}</option>
                        ))}
                      </select>
                      <p id="guestCountHelp" className="mt-2 font-sans text-sm leading-6 text-muted-foreground">{language === "vi" ? "Bao gồm cả bạn. Nếu chọn cả hai tiệc, số người này áp dụng cho mỗi tiệc." : "Including yourself. If attending both celebrations, this number applies to each."}</p>
                    </div>
                  ) : null}

                  <div>
                    <label htmlFor="wishes" className={`mb-3 flex items-center gap-3 font-sans uppercase leading-5 text-primary ${language === "vi" ? "text-xs tracking-[0.12em]" : "text-xs tracking-[0.19em]"}`}><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{formData.attending === "decline" ? "3" : "5"}</span>{language === "vi" ? "Lời nhắn (không bắt buộc)" : "A note (optional)"}</label>
                    <textarea id="wishes" placeholder={language === "vi" ? "Gửi lời chúc đến cô dâu chú rể" : "Send your wishes to the couple"} value={formData.wishes} onChange={(e) => setFormData({ ...formData, wishes: e.target.value })} rows={3} className="min-h-[92px] w-full resize-none rounded-xl border border-border bg-white/75 px-4 py-3 font-sans text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/10" />
                  </div>

                  {submitError ? <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm leading-6 text-destructive">{submitError}</p> : null}

                  <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} type="submit" className="flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-primary px-5 py-4 font-sans text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-[0_14px_28px_rgba(120,27,42,0.22)] transition-colors hover:bg-[#7e1c2d] sm:px-8 sm:text-sm sm:tracking-[0.24em]">
                    <Heart size={15} /> {language === "vi" ? "Gửi xác nhận" : "Send RSVP"}
                  </motion.button>
                </form>
              </AnimatedSection>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
