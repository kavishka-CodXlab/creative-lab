
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TechStackCarousel } from "@/components/home/TechStackCarousel";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <ServicesPreview />
      <TechStackCarousel />
      <WhyChooseUs />
      <ProjectsShowcase />
      <IndustriesSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Index;
