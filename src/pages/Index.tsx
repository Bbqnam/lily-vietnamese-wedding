import WeddingNav from "@/components/WeddingNav";
import HeroSection from "@/components/HeroSection";
import StorySection from "@/components/StorySection";
import EventsSection from "@/components/EventsSection";
import DetailsSection from "@/components/DetailsSection";
import VenueSection from "@/components/VenueSection";
import TravelSection from "@/components/TravelSection";
import DressCodeSection from "@/components/DressCodeSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import FAQSection from "@/components/FAQSection";
import WeddingFooter from "@/components/WeddingFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <WeddingNav />
      <HeroSection />
      <StorySection />
      <EventsSection />
      <DetailsSection />
      <VenueSection />
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
