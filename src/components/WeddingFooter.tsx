import WeddingLogo from "./WeddingLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const WeddingFooter = () => {
  const { language } = useLanguage();
  return (
    <footer className="border-t border-[#e1b96c]/25 bg-[#4f111d] py-14 text-[#fff7ec] md:py-16">
      <div className="container mx-auto px-6 text-center">
        <div className="mx-auto inline-flex rounded-full bg-[#fff7ec] p-2"><WeddingLogo size="small" showText={false} /></div>
        <h2 className="mt-5 font-serif text-4xl font-light text-[#fff7ec] md:text-5xl">
          Nam & Linh
        </h2>
        <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
          <p className="rounded-full border border-[#fff7ec]/18 bg-black/10 px-5 py-3 font-sans text-xs uppercase tracking-[0.16em] text-[#fff7ec]/75">
            {language === "vi" ? "22 tháng 11, 2026" : "22 November 2026"} · Nam Định · 09:30
          </p>
          <p className="rounded-full border border-[#fff7ec]/18 bg-black/10 px-5 py-3 font-sans text-xs uppercase tracking-[0.16em] text-[#fff7ec]/75">
            {language === "vi" ? "28 tháng 11, 2026" : "28 November 2026"} · Huế · 11:00
          </p>
        </div>
        <p className="mt-8 font-sans text-[0.65rem] uppercase tracking-[0.26em] text-[#e1b96c]">
          {language === "vi" ? "Được tạo nên bằng tình yêu" : "Made with love"}
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
