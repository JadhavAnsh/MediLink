"use client";
import { CTASection } from "@/components/CTASection";
import { FeatureSection } from "@/components/FeatureSection";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { HeroPage } from "@/components/HeroPage";
import { PricingSection } from "@/components/PricingSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { storage } from "@/lib/appwrite";
import { useEffect } from "react";

export default function Home() {
   useEffect(() => {
    const pingAppwrite = async () => {
      try {
        // 🔄 This doesn't require authentication
        const result = await storage.listFiles(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID);
        console.log("✅ Appwrite connection successful:", result);
      } catch (err) {
        console.error("❌ Failed to connect to Appwrite:", err);
      }
    };

    pingAppwrite();
  }, []);

  return (
    <div className="bg-background">
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <HeroPage />
      {/* Features Section */}
      <FeatureSection />
      {/* Pricing Section */}
      <PricingSection />
      {/* Testimonials Section */}
      <TestimonialSection />
      {/* CTA Section */}
      <CTASection />
      {/* Footer Section */}
      <Footer />
    </div>
  );
}