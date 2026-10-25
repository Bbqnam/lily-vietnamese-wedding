import { useLayoutEffect, useState } from "react";
import WeddingNav from "@/components/WeddingNav";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import WeddingFooter from "@/components/WeddingFooter";

const Index = () => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(
        window.history.state,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const handleInvitationComplete = () => {
    setIsWelcomeOpen(false);
  };

  const handleOpenInvitation = () => {
    setIsWelcomeOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <WelcomeOverlay open={isWelcomeOpen} onComplete={handleInvitationComplete} />
      <WeddingNav onOpenInvitation={handleOpenInvitation} />
      <HeroSection />
      <StorySection />
      <EventsSection />
      <GallerySection />
      <RSVPSection />
      <WeddingFooter />
    </div>
  );
};

export default Index;
