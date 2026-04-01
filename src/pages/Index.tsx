import { useState } from "react";
import WeddingNav from "@/components/WeddingNav";
import WelcomeOverlay from "@/components/WelcomeOverlay";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import EventsSection from "@/components/EventsSection";
import DetailsSection from "@/components/DetailsSection";
import TravelSection from "@/components/TravelSection";
import DressCodeSection from "@/components/DressCodeSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import FAQSection from "@/components/FAQSection";
import WeddingFooter from "@/components/WeddingFooter";

const Index = () => {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

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
      <DetailsSection />
      <TravelSection />
      <DressCodeSection />
      <GallerySection />
      <RSVPSection />
      <FAQSection />
      <WeddingFooter />
    </div>
  );
};

export default Index;
