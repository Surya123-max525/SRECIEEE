import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import srecLogo from "@/assets/srec-logo.png";
import ieeeLogo from "@/assets/ieee-logo.png";
import snrLogo from "@/assets/snr-trust-logo.png";

const navItems = [
  { label: "Home", to: "/pixel-perfect" },
  { label: "About", to: "/pixel-perfect/about" },
  {
    label: "Committee",
    to: "/pixel-perfect/committee/organizing",
    children: [
      { label: "Organizing", to: "/pixel-perfect/committee/organizing" },
      { label: "Steering", to: "/pixel-perfect/committee/steering" },
      { label: "Advisory", to: "/pixel-perfect/committee/advisory" },
    ],
  },
  { label: "Authors", to: "/pixel-perfect/author" },
  { label: "Registration", to: "/pixel-perfect/register" },
  { label: "Call for Papers", to: "/pixel-perfect/call" },
  { label: "Speakers", to: "/pixel-perfect/speakers" },
  {
    label: "Venue",
    to: "/pixel-perfect/venue",
    children: [
      { label: "Venue", to: "/pixel-perfect/venue" },
      { label: "Tourist Places", to: "/pixel-perfect/venue/tourism" },
      { label: "Hotels to Stay", to: "/pixel-perfect/venue/hotels" },
    ],
  },
  { label: "Contact", to: "/pixel-perfect/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/pixel-perfect" || location.pathname === "/pixel-perfect/";
  
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideLogos = hasScrolled;

  const isParentActive = (item: any) =>
    item.children?.some((c: any) => location.pathname.startsWith(c.to.split("/").slice(0, 3).join("/"))) ?? false;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl">
        <div className="w-full flex flex-col items-center justify-center">
          
          <div className={`xl:hidden absolute right-4 md:right-10 flex items-center z-[70] transition-all duration-1000 ${"$"}{hideLogos ? "top-1/2 -translate-y-1/2" : "top-5 md:top-6"}`}>
             <button 
                onClick={() => setOpen(true)}
                className="p-2 rounded-xl transition-all shadow-sm bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-white/80"
             >
                <Menu size={28} className="md:w-8 md:h-8" />
             </button>
          </div>

          <motion.div 
             initial={false}
             animate={{ 
                height: hideLogos ? 0 : "auto", 
                opacity: hideLogos ? 0 : 1,
                scale: hideLogos ? 0.95 : 1
             }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="w-full bg-white origin-top relative z-50 overflow-hidden shadow-md"
          >
             <div className="grid grid-cols-3 items-center w-full px-4 lg:px-12 py-3 md:py-4 gap-4">
                <div className="flex justify-start">
                   <img src={srecLogo} alt="SREC" className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain flex-shrink-0" />
                </div>
                <div className="flex justify-center">
                   <img src={ieeeLogo} alt="IEEE" className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain flex-shrink-0" />
                </div>
                <div className="flex justify-end">
                   <img src={snrLogo} alt="SNR Trust" className="h-12 sm:h-14 md:h-20 lg:h-24 w-auto object-contain flex-shrink-0" />
                </div>
             </div>
          </motion.div>

          <div className="hidden xl:flex items-center justify-center gap-x-6 gap-y-2 flex-wrap w-full bg-[#002855] py-4 px-4 transition-all duration-700 shadow-inner">
             {navItems.map((item, index) => (
               <div key={item.label} className="relative group">
                 {item.children ? (
                   <button className="text-white/90 hover:text-white font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-500 flex items-center gap-1 group">
                     {item.label}
                     <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                     <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-500 group-hover:w-full bg-white"></span>
                   </button>
                 ) : (
                   <NavLink
                     to={item.to}
                     className={({ isActive }) => `text-white/90 hover:text-white font-bold tracking-[0.2em] text-[11px] uppercase transition-all duration-500 relative group ${"$"}{isActive ? "text-white" : ""}`}
                   >
                     {({ isActive }) => (
                       <>
                         {item.label}
                         <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500 bg-white ${"$"}{isActive ? "w-full" : "w-0 group-hover:w-full"}`}></span>
                       </>
                     )}
                   </NavLink>
                 )}
                 
                 {item.children && (
                   <div className="absolute left-0 top-full pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                     <div className="bg-white text-black rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
                       {item.children.map((c) => (
                         <NavLink
                           key={c.to}
                           to={c.to}
                           className={({ isActive }) =>
                             `block px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 hover:text-[#002855] transition-colors ${"$"}{isActive ? "text-[#002855] font-bold bg-gray-50 border-l-2 border-[#002855]" : "text-gray-600 border-l-2 border-transparent"}`
                           }
                         >
                           {c.label}
                         </NavLink>
                       ))}
                     </div>
                   </div>
                 )}
               </div>
             ))}
             
             <a
               href="/"
               className="ml-4 px-4 py-2 bg-yellow-500 text-[#002855] font-bold tracking-[0.1em] text-[10px] uppercase rounded-full hover:bg-yellow-400 transition-all shadow-md"
             >
               Back to IEEE
             </a>
          </div>

        </div>
      </nav>

      {!isHomePage && (
         <div className="h-[120px] md:h-[160px] w-full bg-transparent pointer-events-none" aria-hidden="true"></div>
      )}

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
                  {navItems.map((item, idx) => (
                     <div key={item.label} className="flex flex-col items-center">
                       {item.children ? (
                         <>
                           <span className="text-black/50 text-sm tracking-[0.3em] uppercase mb-2">{item.label}</span>
                           {item.children.map(c => (
                             <NavLink
                               key={c.to}
                               to={c.to}
                               onClick={() => setOpen(false)}
                               className="text-black/80 text-lg tracking-[0.2em] uppercase font-medium hover:text-[#002855] transition-colors mb-2"
                             >
                               {c.label}
                             </NavLink>
                           ))}
                         </>
                       ) : (
                         <NavLink
                           to={item.to}
                           onClick={() => setOpen(false)}
                           className="text-black/80 text-xl tracking-[0.3em] uppercase font-medium hover:text-[#002855] transition-colors"
                         >
                           {item.label}
                         </NavLink>
                       )}
                     </div>
                  ))}
                  <a
                     href="/"
                     onClick={() => setOpen(false)}
                     className="mt-8 px-6 py-3 bg-[#002855] text-white text-lg tracking-[0.2em] uppercase font-medium hover:bg-blue-900 transition-colors rounded-full"
                  >
                     Back to IEEE Website
                  </a>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </>
  );
}

