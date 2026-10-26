import WeddingLogo from "./WeddingLogo";
import { useLanguage } from "@/contexts/LanguageContext";

const WeddingFooter = () => {
  const { language } = useLanguage();
  return (
    <footer className="border-t border-[#e1b96c]/20 bg-[#4f111d] py-8 text-[#fff7ec] md:py-12">
      <div className="container mx-auto px-4 text-center sm:px-6">
        <div className="mx-auto inline-flex rounded-full bg-[#fff7ec] p-1.5"><WeddingLogo size="small" showText={false} /></div>
        <h2 className="mt-4 font-serif text-3xl font-light text-[#fff7ec] md:text-4xl">
          Nam & Linh
        </h2>
        <div className="mx-auto mt-5 flex max-w-3xl flex-col items-center justify-center gap-2 font-sans text-[0.6rem] uppercase leading-5 tracking-[0.1em] text-[#fff7ec]/70 sm:flex-row sm:gap-5 sm:text-[0.66rem] sm:tracking-[0.14em]">
          <p>
            {language === "vi" ? "22 tháng 11, 2026" : "22 November 2026"} · Nam Định · 09:30
          </p>
          <span className="hidden h-3 w-px bg-[#fff7ec]/25 sm:block" />
          <p>
            {language === "vi" ? "28 tháng 11, 2026" : "28 November 2026"} · Huế · 11:00
          </p>
        </div>
        <p className="mt-6 font-sans text-[0.58rem] uppercase tracking-[0.24em] text-[#e1b96c]">
          {language === "vi" ? "Được tạo nên bằng tình yêu" : "Made with love"}
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
