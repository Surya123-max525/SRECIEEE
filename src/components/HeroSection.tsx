import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Professional cinematic architecture/technology imagery
const slideImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=100&w=2500",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=100&w=2500",
  "https://images.unsplash.com/photo-1528644686414-b1531e21b7ff?auto=format&fit=crop&q=100&w=2500"
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 60 });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="home" className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] selection:bg-slate-900 selection:text-white border-b border-slate-200">

      {/* LUXURY CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 h-full w-full" ref={emblaRef}>
        <div className="flex h-full w-full">
          {slideImages.map((src, index) => (
            <div className="relative flex-[0_0_100%] min-w-0 h-full w-full overflow-hidden" key={index}>
              <motion.div 
                initial={{ scale: 1.05 }}
                animate={{ scale: currentIndex === index ? 1 : 1.05 }}
                transition={{ duration: 10, ease: "linear" }}
                className="w-full h-full bg-center bg-cover"
                style={{ backgroundImage: `url(${src})` }}
              />
              {/* Elegant white overlay to ensure text readability while keeping the image visible */}
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-[#fafafa] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pb-20 justify-end md:justify-center">
        
        <div className="md:mt-0 mt-32 flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="text-slate-500 text-[10px] md:text-xs font-medium tracking-[0.5em] uppercase mb-8"
          >
            SREC IEEE Student Branch
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-9xl font-light text-slate-900 tracking-[0.05em] md:tracking-[0.1em] uppercase leading-none mb-8 font-serif"
          >
            Absolute <br className="md:hidden" /> <span className="font-bold tracking-[0.1em]">Pursuit</span>
          </motion.h1>

          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
             className="h-[1px] w-16 md:w-32 bg-slate-400 mb-8 origin-center"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3 }}
            className="text-slate-600 text-sm md:text-lg max-w-2xl mx-auto tracking-[0.05em] md:tracking-[0.1em] font-light leading-loose mb-12 px-4"
          >
            ART AND SCIENCE. ENGINEERING THE FUTURE OF TECHNOLOGY WITH UNCOMPROMISING PRECISION.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a href="#about" className="group flex items-center justify-center gap-4 px-12 py-4 bg-slate-900 text-white text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium hover:bg-slate-800 transition-all duration-500 rounded-sm">
              Discover Vision <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/activities" className="group flex items-center justify-center gap-4 px-12 py-4 text-slate-900 border border-slate-300 hover:border-slate-900 text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium transition-all duration-500 backdrop-blur-sm bg-white/50 hover:bg-white rounded-sm">
              View Heritage
            </a>
          </motion.div>
        </div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-400 z-20 cursor-pointer hover:text-slate-900 transition-colors"
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-semibold">Explore</span>
        <div className="w-[1px] h-12 bg-slate-300 overflow-hidden relative">
          <motion.div
            className="w-full h-full bg-slate-900 absolute top-0 left-0"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
