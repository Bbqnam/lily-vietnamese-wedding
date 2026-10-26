import { useState } from "react";
import { Calendar, Clock, MapPin, Navigation, Plane } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";

const places = {
  namdinh: {
    location: "Nam Định", dateEn: "22 November 2026", dateVi: "22 tháng 11, 2026", time: "09:30",
    venueEn: "Sen Viet Kindergarten", venueVi: "Trường Mầm non Sen Việt",
    addressEn: "Cho Vieng, My Phuc, My Loc, Nam Dinh", addressVi: "Chợ Viềng, Xã Mỹ Phúc, Huyện Mỹ Lộc, Nam Định",
    arrivalEn: "Fly to Hanoi (HAN), then allow around 1.5–2 hours by car.", arrivalVi: "Bay đến Hà Nội (HAN), sau đó đi ô tô khoảng 1,5–2 giờ.",
    map: "https://www.google.com/maps?q=Trường+Mầm+non+Sen+Việt,+Chợ+Viềng,+Xã+Mỹ+Phúc,+Huyện+Mỹ+Lộc,+Nam+Định,+Việt+Nam&z=16&output=embed", mapsLink: "https://www.google.com/maps/search/?api=1&query=Trường+Mầm+non+Sen+Việt,+Chợ+Viềng,+Xã+Mỹ+Phúc,+Huyện+Mỹ+Lộc,+Nam+Định,+Việt+Nam",
  },
  hue: {
    location: "Huế", dateEn: "28 November 2026", dateVi: "28 tháng 11, 2026", time: "11:00",
    venueEn: "Wedding Palace", venueVi: "Trung tâm tổ chức tiệc cưới Wedding Palace",
    addressEn: "83 Yet Kieu, Phu Xuan Ward, Hue City", addressVi: "83 Yết Kiêu, P. Phú Xuân, TP. Huế",
    arrivalEn: "Fly to Hue (HUI). The venue is in the city centre.", arrivalVi: "Bay đến Huế (HUI). Địa điểm tổ chức nằm trong trung tâm thành phố.",
    map: "https://www.google.com/maps?q=Wedding+Palace,+83+Yết+Kiêu,+Phú+Xuân,+Huế,+Việt+Nam&z=16&output=embed", mapsLink: "https://www.google.com/maps/search/?api=1&query=Wedding+Palace,+83+Yết+Kiêu,+Phú+Xuân,+Huế,+Việt+Nam",
  },
};

type PlaceKey = keyof typeof places;

const EventsSection = () => {
  const { language } = useLanguage();
  const [active, setActive] = useState<PlaceKey>("namdinh");
  const place = places[active];
  return (
    <section id="events" className="bg-warm-white py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection>
          <div className="mb-8 text-center md:mb-10">
            <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">{language === "vi" ? "Thông Tin Tiệc Cưới" : "Wedding Details"}</p>
            <h2 className="font-serif text-[2.15rem] font-light leading-tight text-foreground sm:text-4xl md:text-5xl">{language === "vi" ? "Hai Buổi Tiệc, Một Niềm Vui" : "Two Celebrations, One Joy"}</h2>
          </div>
        </AnimatedSection>
        <div className="mx-auto mb-7 grid max-w-xl grid-cols-2 rounded-full border border-primary/20 bg-background p-1.5">
          {(Object.keys(places) as PlaceKey[]).map((key) => (
            <button key={key} type="button" onClick={() => setActive(key)} className={`min-h-11 whitespace-nowrap rounded-full px-3 text-sm transition-all sm:px-5 ${active === key ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-primary"}`} aria-pressed={active === key}>
              {places[key].location} · {places[key].time}
            </button>
          ))}
        </div>
        <AnimatedSection>
          <div className="grid overflow-hidden rounded-[24px] border border-border/80 bg-background shadow-[0_24px_60px_rgba(124,92,60,0.08)] sm:rounded-[30px] lg:grid-cols-[0.88fr_1.12fr]">
            <div className="flex flex-col justify-center p-5 text-left sm:p-7 md:p-10 lg:p-12">
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-primary/70">{place.location}</p>
              <h3 className="mt-3 font-serif text-[1.8rem] font-light leading-tight text-foreground sm:text-3xl md:text-4xl">{language === "vi" ? place.venueVi : place.venueEn}</h3>
              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-3">
                <div className="flex min-h-[108px] flex-col items-start justify-between rounded-2xl bg-champagne/45 p-4 sm:min-h-[132px] sm:p-5">
                  <Calendar size={18} className="text-primary" />
                  <div className="mt-4 sm:mt-5">
                    <p className={`font-serif leading-tight text-foreground ${language === "vi" ? "text-[1.02rem] sm:whitespace-nowrap sm:text-[1.4rem]" : "text-[1.05rem] sm:text-2xl"}`}>{language === "vi" ? place.dateVi : place.dateEn}</p>
                    <p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">{language === "vi" ? "Ngày tổ chức" : "Wedding date"}</p>
                  </div>
                </div>
                <div className="flex min-h-[108px] flex-col items-start justify-between rounded-2xl bg-champagne/45 p-4 sm:min-h-[132px] sm:p-5">
                  <Clock size={18} className="text-primary" />
                  <div className="mt-5">
                    <p className="font-serif text-2xl leading-none text-foreground">{place.time}</p>
                    <p className="mt-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">{language === "vi" ? "Bắt đầu tiệc" : "Party starts"}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3 text-sm leading-6 text-muted-foreground"><MapPin size={17} className="mt-1 text-primary" /><p>{language === "vi" ? place.addressVi : place.addressEn}</p></div>
              <div className="mt-4 grid grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-3 text-sm leading-6 text-muted-foreground"><Plane size={17} className="mt-1 text-primary" /><p>{language === "vi" ? place.arrivalVi : place.arrivalEn}</p></div>
              <a href={place.mapsLink} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-primary/25 px-5 text-[0.65rem] uppercase tracking-[0.17em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground sm:w-auto sm:self-start sm:text-xs sm:tracking-[0.2em]"><Navigation size={14} />{language === "vi" ? "Mở Google Maps" : "Open Google Maps"}</a>
            </div>
            <div className="relative min-h-[300px] overflow-hidden border-t border-border/70 sm:min-h-[360px] lg:min-h-[520px] lg:border-l lg:border-t-0">
              <iframe key={active} title={`${place.location} map`} src={place.map} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default EventsSection;
