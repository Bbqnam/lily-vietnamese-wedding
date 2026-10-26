import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export type LightboxPhoto = {
  src: string;
  title: string;
  subtitle?: string;
};

type PhotoLightboxProps = {
  photos: LightboxPhoto[];
  openIndex: number | null;
  onOpenIndexChange: (index: number | null) => void;
  previousLabel: string;
  nextLabel: string;
  swipeLabel: string;
  closeLabel: string;
};

const swipeConfidenceThreshold = 8_000;

const PhotoLightbox = ({
  photos,
  openIndex,
  onOpenIndexChange,
  previousLabel,
  nextLabel,
  swipeLabel,
  closeLabel,
}: PhotoLightboxProps) => {
  const selected = openIndex === null ? null : photos[openIndex];

  const move = (step: -1 | 1) => {
    if (openIndex === null) return;
    onOpenIndexChange((openIndex + step + photos.length) % photos.length);
  };

  return (
    <Dialog open={openIndex !== null} onOpenChange={(open) => !open && onOpenIndexChange(null)}>
      <DialogContent
        aria-label={selected?.title}
        className="!flex h-[100dvh] max-h-none w-screen max-w-none flex-col gap-0 overflow-hidden border-0 bg-[#130d0b] p-0 text-white shadow-2xl sm:h-[94dvh] sm:max-h-[900px] sm:w-[94vw] sm:max-w-6xl sm:rounded-[28px] [&>button]:right-4 [&>button]:top-4 [&>button]:z-50 [&>button]:flex [&>button]:h-10 [&>button]:w-10 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:bg-black/40 [&>button]:text-white [&>button]:opacity-100 [&>button_svg]:h-5 [&>button_svg]:w-5"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
      >
        {selected && openIndex !== null && (
          <>
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/25">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.img
                  key={`${openIndex}-${selected.src}`}
                  src={selected.src}
                  alt={selected.title}
                  draggable={false}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (offset.x < -70 || swipe < -swipeConfidenceThreshold) move(1);
                    if (offset.x > 70 || swipe > swipeConfidenceThreshold) move(-1);
                  }}
                  className="h-full max-h-full w-full cursor-grab touch-pan-y select-none object-contain active:cursor-grabbing"
                />
              </AnimatePresence>

              <button
                type="button"
                onClick={() => move(-1)}
                className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex md:left-5"
                aria-label={previousLabel}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:flex md:right-5"
                aria-label={nextLabel}
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 font-sans text-[0.56rem] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md sm:hidden">
                {openIndex + 1} / {photos.length} · {swipeLabel}
              </p>
            </div>

            <div className="flex shrink-0 items-end justify-between gap-5 border-t border-white/10 px-5 py-4 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <DialogTitle className="truncate font-serif text-2xl font-normal sm:text-3xl">
                  {selected.title}
                </DialogTitle>
                {selected.subtitle && (
                  <DialogDescription className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/55">
                    {selected.subtitle}
                  </DialogDescription>
                )}
              </div>
              <span className="shrink-0 font-sans text-[0.62rem] tracking-[0.17em] text-white/55">
                {String(openIndex + 1).padStart(2, "0")} / {photos.length}
              </span>
            </div>
            <span className="sr-only">{closeLabel}</span>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PhotoLightbox;
