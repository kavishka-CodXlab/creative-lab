import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { TechStackCarousel } from "@/components/home/TechStackCarousel";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <TechStackCarousel />
      <ProjectsShowcase />
      <CTASection />
    </Layout>
  );
};

export default Index;
