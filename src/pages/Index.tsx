import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ImpactSection from "@/components/ImpactSection";
import BenefitsSection from "@/components/BenefitsSection";
import LatestHighlightsSection from "@/components/LatestHighlightsSection";
import CollegeAboutSection from "@/components/CollegeAboutSection";
import AboutSection from "@/components/AboutSection";
import SocietiesSection from "@/components/SocietiesSection";
import TestimonialsMarqueeSection from "@/components/TestimonialsMarqueeSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingRobotAgent from "@/components/FloatingRobotAgent";


import TechStackCarousel from "@/components/TechStackCarousel";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Subtle Parallax Block for moving objects effect requested
const MovingParallaxBackdrop = () => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#fafafa]">
      <motion.div 
        style={{ y: yOffset }} 
        className="absolute inset-0 opacity-[0.02]"
      >
        {/* Abstract large typography acting as moving background objects */}
        <div className="absolute top-[20%] -left-[10%] text-[20vw] font-serif font-black whitespace-nowrap leading-none text-slate-900 tracking-tighter mix-blend-multiply">
          INNOVATION
        </div>
        <div className="absolute top-[60%] -right-[5%] text-[15vw] font-serif font-black whitespace-nowrap leading-none text-slate-900 tracking-tighter mix-blend-multiply">
          EXCELLENCE
        </div>
      </motion.div>
    </div>
  );
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen relative selection:bg-slate-900 selection:text-white font-sans text-slate-800 bg-[#fafafa]">
      <MovingParallaxBackdrop />
      <Navbar />

      <main className="w-full relative pb-0 z-0">
        
        {/* Full Bleed Hero */}
        <HeroSection />

        {/* Content Wrapper - Strict borders, tons of white space */}
        <div className="relative z-10 w-full bg-white border-t border-slate-200">
          
          <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
            <FadeInSection>
              <div className="border border-slate-200 bg-white shadow-sm p-2">
                <StatsSection />
              </div>
            </FadeInSection>
          </div>

          {/* Symmetrical Split Section */}
          <div className="border-t border-slate-200 bg-[#fafafa]">
            <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32 flex flex-col gap-16 md:gap-24">
              <FadeInSection>
                <div className="h-full border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow duration-700">
                  <div className="mb-8">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Our Impact</p>
                    <div className="h-[1px] w-12 bg-slate-900 mb-6"></div>
                  </div>
                  <ImpactSection />
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="h-full border border-slate-200 bg-white p-8 hover:shadow-lg transition-shadow duration-700">
                  <div className="mb-8">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2">Exclusive Benefits</p>
                    <div className="h-[1px] w-12 bg-slate-900 mb-6"></div>
                  </div>
                  <BenefitsSection />
                </div>
              </FadeInSection>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
              <FadeInSection>
                <LatestHighlightsSection />
              </FadeInSection>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-[#fafafa]">
            <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
              <FadeInSection>
                <div className="flex flex-col gap-12 items-stretch">
                  <div className="w-full border border-slate-200 bg-white p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-700">
                    <CollegeAboutSection />
                  </div>
                  <div className="w-full border border-slate-200 bg-slate-900 text-white p-8 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-700">
                    <AboutSection />
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>



          <div className="border-t border-slate-200 bg-white">
            <div className="py-24 md:py-32">
              <FadeInSection>
                <SocietiesSection />
              </FadeInSection>
            </div>
          </div>



          <div className="border-t border-slate-200 bg-[#fafafa]">
            <FadeInSection>
              <TechStackCarousel />
            </FadeInSection>
          </div>



          <div className="border-t border-slate-200 bg-[#fafafa]">
            <div className="py-24 md:py-32">
              <FadeInSection>
                <div className="max-w-[1400px] mx-auto px-6 mb-12">
                  <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-2 text-center">Testimonials</p>
                  <div className="h-[1px] w-12 bg-slate-900 mx-auto"></div>
                </div>
                <TestimonialsMarqueeSection />
              </FadeInSection>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 py-24 md:py-32">
              <FadeInSection>
                <FAQSection />
              </FadeInSection>
            </div>
          </div>
          
        </div>
      </main>

      <div className="relative z-40 bg-slate-900 text-white border-t border-slate-800">
        <Footer />
      </div>

      <FloatingRobotAgent />
    </div>
  );
};

export default Index;
