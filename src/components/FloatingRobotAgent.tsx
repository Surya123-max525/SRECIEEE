import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Sparkles, ArrowRight, Activity, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import robotGif from "@/assets/robot.gif";

const FloatingRobotAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Welcome to the IEEE SREC digital portal. I am your architectural guide.",
    "Our branch focuses on uncompromising precision and technical excellence.",
    "You can explore our 8 technical societies or submit an application to join our executive teams."
  ];

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[340px] bg-white/95 backdrop-blur-xl border border-slate-200/60 shadow-[0_20px_40px_rgba(0,0,0,0.1),_0_0_40px_rgba(34,211,238,0.15)] rounded-2xl overflow-hidden relative"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"></div>

            {/* Header */}
            <div className="bg-slate-900/5 px-6 py-5 flex items-center justify-between border-b border-slate-100 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-3 h-3">
                  <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-75"></div>
                  <div className="relative w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>
                </div>
                <span className="text-slate-900 font-extrabold text-xs tracking-[0.2em] uppercase">Nexus System</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                title="Close Assistant" 
                aria-label="Close Assistant" 
                className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-1.5 rounded-full transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* AI Message Stream */}
            <div className="p-6 bg-gradient-to-b from-white to-slate-50/50">
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 shrink-0 bg-gradient-to-br from-[#0b3b8f] to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20"
                >
                  <Bot size={20} strokeWidth={2} />
                </motion.div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-cyan-600 uppercase tracking-widest">Active Analysis</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={messageIndex}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-slate-700 leading-relaxed font-semibold pt-1"
                    >
                      {messages[messageIndex]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 border-t border-slate-200 pt-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Navigation</p>
                <Link to="/societies" className="flex items-center justify-between w-full p-3 bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors group">
                  <div className="flex items-center gap-2"><Globe size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors"/> View Societies</div>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
                </Link>
                <Link to="/join" className="flex items-center justify-between w-full p-3 bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-colors group">
                  <div className="flex items-center gap-2"><Activity size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors"/> Submit Application</div>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle Assistant"
        aria-label="Toggle Assistant"
        className="group relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 transition-all duration-500 overflow-visible focus:outline-none"
      >
        {isOpen ? (
          <motion.div 
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            className="flex items-center justify-center w-14 h-14 bg-slate-900 border-2 border-slate-700 text-white rounded-full shadow-[0_0_30px_rgba(11,59,143,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:bg-rose-500 hover:border-rose-400 transition-all duration-300"
          >
            <X size={26} strokeWidth={2.5} />
          </motion.div>
        ) : (
          <motion.div 
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-4, 4, -4],
              scale: [1, 1.02, 1]
            }} 
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-full h-full drop-shadow-[0_15px_15px_rgba(34,211,238,0.3)] group-hover:drop-shadow-[0_25px_35px_rgba(34,211,238,0.6)] transition-all duration-500 cursor-pointer"
          >
            {/* Using the imported local GIF from the assets folder. */}
            <img 
              src={robotGif} 
              alt="Floating Mascot Animation" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Interactive Glow / Particles */}
            <motion.div 
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-2 lg:-bottom-6 left-1/2 -translate-x-1/2 w-16 h-4 bg-cyan-400 blur-[15px] rounded-full -z-10 opacity-50"
            />
            <Sparkles size={24} className="absolute top-2 right-2 text-yellow-300 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
          </motion.div>
        )}
      </motion.button>

    </div>
  );
};

export default FloatingRobotAgent;
