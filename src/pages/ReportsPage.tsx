import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, FolderOpen, Eye, FileArchive, Search, Calendar, BadgeInfo } from "lucide-react";
import { useMemo, useState } from "react";

/* =========================
   AUTO IMPORT DOCUMENTS
========================= */
const localDocs = import.meta.glob("/src/assets/gallery/IEEE Events/**/*.{doc,docx,pdf}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const getLocalGroupedDocs = () => {
  const grouped: Record<string, { id: string, name: string, url: string, path: string, type: string }[]> = {};
  Object.entries(localDocs).forEach(([path, url], idx) => {
    const parts = path.split("/");
    const folder = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];
    const isPdf = fileName.toLowerCase().endsWith('.pdf');
    const isDocx = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
    
    if (!grouped[folder]) grouped[folder] = [];
    grouped[folder].push({ 
      id: `doc-${idx}`,
      name: fileName.replace(/\.(doc|docx|pdf)$/i, ''), 
      url: url,
      path: path,
      type: isPdf ? 'PDF' : isDocx ? 'Word' : 'Doc'
    });
  });
  return grouped;
};

const ReportsPage = () => {
  const groupedDocs = useMemo(() => getLocalGroupedDocs(), []);
  
  const sortedFolders = Object.keys(groupedDocs).sort((a, b) => b.localeCompare(a));
  const [activeFolder, setActiveFolder] = useState<string>(sortedFolders[0] || "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = useMemo(() => {
    if (!activeFolder || !groupedDocs[activeFolder]) return [];
    if (!searchQuery) return groupedDocs[activeFolder];
    return groupedDocs[activeFolder].filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeFolder, searchQuery, groupedDocs]);

  // Card Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 12 } },
    hover: { y: -8, transition: { type: "spring" as const, stiffness: 400, damping: 10 } }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans selection:bg-[#0b3b8f] selection:text-white">
      <Navbar />
      
      {/* CREATIVE HEADER */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-[#001730]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b3b8f]/50 to-transparent opacity-50"></div>
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[40vw] -left-[20vw] w-[80vw] h-[80vw] rounded-full bg-gradient-to-tr from-[#00a6d6]/20 to-transparent blur-[100px] pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[40vw] -right-[20vw] w-[80vw] h-[80vw] rounded-full bg-gradient-to-bl from-indigo-500/20 to-transparent blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-cyan-300 text-xs font-black uppercase tracking-widest mb-6 shadow-2xl">
            <BadgeInfo size={14} /> Digital Archive
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vault</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Explore our curated repository of technical reports, event documentations, and historical records.
          </motion.p>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 pb-20 -mt-10 relative z-20">
        {sortedFolders.length === 0 ? (
           <div className="text-center text-slate-500 py-16 bg-white rounded-[2rem] shadow-xl border border-slate-200/80 backdrop-blur-xl">
             <FileArchive size={48} className="mx-auto text-slate-300 mb-4" />
             <p className="font-bold text-lg">No documents in the vault.</p>
             <p className="text-sm mt-2 opacity-80">Upload records to your structured local gallery to see them here.</p>
           </div>
        ) : (
          <div className="flex flex-col gap-8">
            
            {/* TOP FILTER BAR */}
            <div className="w-full xl:sticky xl:top-20 z-30">
              <div className="bg-white/90 backdrop-blur-2xl rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-2">
                    <Calendar size={14} className="text-cyan-600" /> Chronological Filter
                  </h3>
                </div>
                
                {/* Horizontal Scrolling Pill List */}
                <div className="flex overflow-x-auto pb-2 gap-3 snap-x scrollbar-hide">
                  {sortedFolders.map(folder => {
                    const isActive = activeFolder === folder;
                    return (
                      <button
                        key={folder}
                        onClick={() => { setActiveFolder(folder); setSearchQuery(""); }}
                        className={`shrink-0 snap-start flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-500 font-bold group relative overflow-hidden ${
                          isActive ? "text-white shadow-lg shadow-blue-900/10 scale-[1.02]" : "bg-slate-50 hover:bg-white text-slate-600 hover:text-[#0b3b8f] border border-slate-100 hover:border-[#0b3b8f]/20 hover:shadow-md"
                        }`}
                      >
                        {/* Selected Background animation */}
                        {isActive && (
                          <motion.div layoutId="activeVaultTab" className="absolute inset-0 bg-gradient-to-r from-[#0b3b8f] to-indigo-600" />
                        )}
                        
                        <span className="relative z-10 flex items-center gap-2 text-sm tracking-wide whitespace-nowrap">
                          <FolderOpen size={16} className={isActive ? "text-cyan-300" : "text-slate-400 group-hover:text-[#0b3b8f] transition-colors"} />
                          {folder.replace('IEEE', '').trim()}
                        </span>
                        
                        <span className={`relative z-10 text-[10px] px-2.5 py-1 rounded-full font-black tracking-widest ${
                          isActive ? "bg-white/20 text-white backdrop-blur-sm shadow-inner" : "bg-white text-slate-500 shadow-sm border border-slate-100"
                        }`}>
                          {groupedDocs[folder].length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* VAULT CONTENT AREA */}
            <div className="flex-1 space-y-6">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-2xl rounded-[2rem] p-4 px-6 shadow-sm border border-slate-200/60 gap-4">
                 <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                   {activeFolder} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b3b8f] to-cyan-500 font-black">Archive</span>
                 </h2>
                 <div className="relative w-full sm:w-72">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search reports..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-sm font-semibold rounded-2xl py-3 pl-11 pr-4 outline-none focus:bg-white focus:ring-2 focus:ring-[#0b3b8f]/30 transition-all duration-300 text-slate-700 placeholder:text-slate-400 shadow-inner"
                    />
                 </div>
              </div>

              {/* Document Grid */}
              {filteredDocs.length === 0 ? (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-24 text-center text-slate-400 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-slate-200/60 border-dashed">
                    <Search size={48} className="mx-auto mb-6 text-slate-300 mix-blend-multiply" />
                    <p className="font-black text-xl text-slate-500">No matching records found.</p>
                    <p className="text-sm mt-2 font-medium">Try adjusting your search criteria.</p>
                 </motion.div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredDocs.map((doc, i) => (
                      <motion.div
                        layout
                        key={doc.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative flex flex-col p-6 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(11,59,143,0.08)] hover:border-[#0b3b8f]/20 transition-all duration-500 overflow-hidden"
                      >
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                          {/* Top row: Icon & Badge */}
                          <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-[1.25rem] flex items-center justify-center transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 shadow-sm ${
                              doc.type === 'PDF' 
                                ? "bg-gradient-to-br from-red-50 to-rose-100 text-rose-600 border border-rose-100 shadow-rose-200/50" 
                                : "bg-gradient-to-br from-blue-50 to-cyan-100 text-[#0b3b8f] border border-blue-100 shadow-blue-200/50"
                            }`}>
                              <FileText size={26} strokeWidth={2.5} />
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-[0.25em] px-3.5 py-1.5 rounded-full shadow-sm border ${
                              doc.type === 'PDF' ? "bg-rose-50 text-rose-700 border-rose-100" : "bg-blue-50 text-[#0b3b8f] border-blue-100"
                            }`}>
                              {doc.type}
                            </span>
                          </div>

                          {/* Title */}
                          <div className="mb-8 flex-1">
                            <h4 className="font-black text-[17px] text-slate-800 line-clamp-3 leading-[1.4] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#0b3b8f] group-hover:to-cyan-600 transition-all duration-300">
                              {doc.name}
                            </h4>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 pt-5 border-t border-slate-100/80">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-[0.5] flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-[#0b3b8f] text-slate-600 hover:text-white border border-slate-200 hover:border-[#0b3b8f] rounded-xl text-xs font-bold transition-all duration-300 group/btn"
                            >
                              <Eye size={16} className="group-hover/btn:-mt-1 transition-transform" /> 
                              <span className="hidden sm:inline">Preview</span>
                            </a>
                            <a
                              href={doc.url}
                              download={doc.name}
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#001730] hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-[#001730]/10 hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300 group/btn"
                            >
                              <Download size={16} className="group-hover/btn:translate-y-1 transition-transform" /> Download File
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>
            
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
};

export default ReportsPage;
