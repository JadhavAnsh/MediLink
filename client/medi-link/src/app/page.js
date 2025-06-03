import { CTASection } from "@/components/CTASection";
import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { HeroPage } from "@/components/HeroPage";
import { TestimonialSection } from "@/components/TestimonialSection";



export default function Home() {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <HeroPage />
      {/* Features Section */}
      <FeatureSection />
      {/* Testimonials Section */}
      <TestimonialSection />
      {/* CTA Section */}
      <CTASection />
      {/* Footer Section */}
      <Footer />
    </div>
  );
}
