import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import ieeeLogo from "@/assets/ieee-logo.png";
import srecLogo from "@/assets/srec-logo.png";
import snrLogo from "@/assets/snr-trust-logo.png";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Societies", href: "/societies" },
  { label: "Activities", href: "/activities" },
  { label: "Team", href: "/Team" },
  { label: "Awards", href: "/awards" },
  { label: "Plans", href: "/annual-plans" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reports", href: "/reports" },
  { label: "Funding", href: "/funding" },
  { label: "Contact", href: "/contact" },
  { label: "Admin", href: "/admin" },
];

const Navbar = () => {
   const [open, setOpen] = useState(false);
   
   const isHomePage = window.location.pathname === "/";
   
   // True if user physically scrolled down
   const [hasScrolled, setHasScrolled] = useState(false);

   useEffect(() => {
     const onScroll = () => {
        setHasScrolled(window.scrollY > 20);
     };
     window.addEventListener("scroll", onScroll);
     onScroll(); // initialize correct state
     return () => window.removeEventListener("scroll", onScroll);
   }, []);

   // Background is solid white if scrolled OR if we are on a subpage
   const isSolidBackground = hasScrolled || !isHomePage;
   
   // Logos hide ONLY when user specifically scrolls down (on any page)
   const hideLogos = hasScrolled;

   return (
     <>
      {/* Top Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-[1s] ease-[0.16,1,0.3,1] ${isSolidBackground ? 'bg-white/95 backdrop-blur-2xl shadow-lg border-b border-black/5 py-4' : 'bg-transparent py-6'}`}>
         
         <div className="w-full relative px-2 md:px-12 flex flex-col items-center justify-center">
            
            {/* Mobile Hamburger Icon (Always visible on mobile right corner) */}
            <div className={`xl:hidden absolute right-4 md:right-10 flex items-center z-[70] transition-all duration-[1s] ${hideLogos ? 'top-1/2 -translate-y-1/2' : 'top-5 md:top-6'}`}>
               <button 
                  onClick={() => setOpen(true)}
                  className={`p-2 rounded-xl transition-all shadow-sm md:shadow-none bg-white/80 backdrop-blur-md border border-black/5 md:bg-transparent md:border-none ${isSolidBackground ? 'text-black/80 hover:text-black' : 'text-black/80 md:text-white/80 hover:text-black md:hover:text-white'}`}
               >
                  <Menu size={28} className="md:w-8 md:h-8" />
               </button>
            </div>

            {/* Top Row: Logos with ultra-smooth cinematic hide animation */}
            <motion.div 
               initial={false}
               animate={{ 
                  height: hideLogos ? 0 : "auto", 
                  opacity: hideLogos ? 0 : 1,
                  filter: hideLogos ? "blur(12px)" : "blur(0px)",
                  scale: hideLogos ? 0.9 : 1,
                  marginBottom: hideLogos ? 0 : (isHomePage ? 24 : 16)
               }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               className="overflow-hidden flex flex-col items-center w-full origin-top relative z-50 px-1 pr-14 md:px-0"
            >
               {/* Eliminate the "double box" effect: only show the floating pill when the main nav header is transparent */}
               <div className={`flex flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-8 lg:gap-10 rounded-full px-2 md:px-12 py-2 md:py-3 transition-colors duration-[1s] w-full md:w-auto ${isSolidBackground ? 'bg-transparent shadow-none border-none' : 'bg-white/95 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-white/40'}`}>
                  <img src={srecLogo} alt="SREC" className="h-8 sm:h-10 md:h-14 xl:h-16 w-auto object-contain flex-shrink-0" />
                  <img src={ieeeLogo} alt="IEEE" className="h-10 sm:h-14 md:h-20 xl:h-24 w-auto object-contain flex-shrink-0" />
                  <img src={snrLogo} alt="SNR Trust" className="h-8 sm:h-10 md:h-14 xl:h-16 w-auto object-contain flex-shrink-0" />
               </div>
            </motion.div>

            {/* Bottom Row: Desktop Horizontal Nav Links */}
            <div className={`hidden xl:flex items-center justify-center gap-x-8 gap-y-2 flex-wrap w-full transition-all duration-700 ${hideLogos ? 'border-none pt-0' : 'border-t border-black/10 md:border-white/20 pt-4'}`}>
               {navLinks.map((l, index) => (
                  <motion.a
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1.2, delay: 0.4 + (index * 0.05), ease: [0.16, 1, 0.3, 1] }}
                     key={l.label}
                     href={l.href}
                     className={`${isSolidBackground ? 'text-black/70 hover:text-black font-extrabold tracking-[0.35em]' : 'text-white/70 hover:text-white font-bold tracking-[0.3em]'} text-[11px] uppercase transition-all duration-500 relative group`}
                  >
                     {l.label}
                     <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${isSolidBackground ? 'bg-black' : 'bg-white'}`}></span>
                  </motion.a>
               ))}
               <motion.a
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1.2, delay: 0.4 + (navLinks.length * 0.05), ease: [0.16, 1, 0.3, 1] }}
                     href="https://vtools.vtools.ieee.org/" target="_blank"
                     className={`${isSolidBackground ? 'text-black/70 hover:text-black font-extrabold tracking-[0.35em]' : 'text-white/70 hover:text-white font-bold tracking-[0.3em]'} text-[11px] uppercase transition-all duration-500 relative group`}
                  >
                     VTOOLS
                     <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${isSolidBackground ? 'bg-black' : 'bg-white'}`}></span>
               </motion.a>
            </div>

         </div>
      </nav>

      {/* Global Transparent Spacer for Subpages to prevent content clipping under the tall fixed navbar */}
      {!isHomePage && (
         <div className="h-[120px] md:h-[160px] w-full bg-transparent pointer-events-none" aria-hidden="true"></div>
      )}

      {/* Mobile Sidebar/Dropdown Menu */}
      <AnimatePresence>
         {open && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl w-full h-screen overflow-y-auto"
            >
               <div className="absolute top-8 right-8">
                  <button onClick={() => setOpen(false)} className="p-3 bg-black/5 rounded-full text-black/50 hover:text-black hover:bg-black/10 transition-all">
                     <X size={32} />
                  </button>
               </div>
               <div className="flex flex-col items-center justify-center min-h-screen py-20 space-y-6">
                  {navLinks.map((l, idx) => (
                     <motion.a
                        key={l.label}
                        href={l.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 + (idx * 0.05) }}
                        onClick={() => setOpen(false)}
                        className="text-black/80 text-xl tracking-[0.3em] uppercase font-medium hover:text-blue-600 transition-colors"
                     >
                        {l.label}
                     </motion.a>
                  ))}
                  <motion.a
                     href="https://vtools.vtools.ieee.org/" target="_blank"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.1 + (navLinks.length * 0.05) }}
                     onClick={() => setOpen(false)}
                     className="text-black/80 text-xl tracking-[0.3em] uppercase font-medium hover:text-blue-600 transition-colors"
                  >
                     VTOOLS
                  </motion.a>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Floating Back to Home Button globally visible across all pages except landing page */}
      {!isHomePage && (
        <a 
          href="/" 
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[40] bg-black text-white p-4 rounded-full shadow-2xl flex flex-col items-center justify-center gap-1 hover:bg-slate-900 transition-all duration-500 group w-12 h-12 md:w-14 md:h-14 border border-white/20"
          title="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform duration-500">
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
        </a>
      )}
     </>
   )
};

export default Navbar;