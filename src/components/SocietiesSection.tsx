import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Cpu, Radio, HeartPulse, Gauge, Loader2, Target, Network, Layers, Activity } from "lucide-react";
import { Link } from "react-router-dom";

// Extensive icon/color mapping based on index or type
const designTokens = [
  { icon: Cpu, color: "from-blue-500 to-indigo-600", bg: "bg-slate-100 text-slate-900" },
  { icon: HeartPulse, color: "from-rose-500 to-pink-600", bg: "bg-rose-50 text-rose-600" },
  { icon: Radio, color: "from-amber-400 to-orange-500", bg: "bg-orange-50 text-orange-600" },
  { icon: Gauge, color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50 text-emerald-600" },
  { icon: Network, color: "from-cyan-400 to-blue-500", bg: "bg-slate-100 text-slate-500" },
  { icon: Target, color: "from-purple-500 to-violet-600", bg: "bg-purple-50 text-purple-600" },
  { icon: Layers, color: "from-fuchsia-400 to-pink-500", bg: "bg-fuchsia-50 text-fuchsia-600" },
  { icon: Activity, color: "from-lime-400 to-green-500", bg: "bg-lime-50 text-lime-600" },
];

const getSlugForSociety = (name: string, id: number) => {
  const n = name.toLowerCase();
  if (n.includes("srec")) return "srec";
  if (n.includes("wie") || n.includes("women")) return "wie";
  if (n.includes("embs") || n.includes("medicine")) return "embs";
  if (n.includes("cs") || n.includes("computer")) return "cs";
  if (n.includes("comsoc") || n.includes("communication")) return "comsoc";
  if (n.includes("pels") || n.includes("power")) return "pels";
  if (n.includes("im") || n.includes("instrumentation")) return "im";
  if (n.includes("cis") || n.includes("computational")) return "cis";
  return id.toString();
};

const SocietiesSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { data: societies = [], isLoading } = useQuery({
    queryKey: ["societies"],
    queryFn: async () => {
      const { data } = await supabase.from("societies").select("*").order("id", { ascending: true });
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <section className="py-24 bg-slate-50 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-[#00629b] opacity-50" />
      </section>
    );
  }

  return (
    <section id="societies" className="py-24 relative overflow-hidden bg-white border-t border-slate-50">
      
      {/* Light mode background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-100/50 to-transparent blur-3xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-emerald-100/50 to-transparent blur-3xl pointer-events-none rounded-full -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-semibold text-xs tracking-widest uppercase mb-4 border border-cyan-100 shadow-sm">
            <Layers size={14} />
            <span>Technical Chapters</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Our <span className="text-slate-900 font-serif font-medium">Societies</span>
          </h2>
          <p className="text-slate-600 text-lg md:text-xl">
            Explore our diverse student chapters dedicated to pushing the boundaries of technology, innovation, and specific engineering disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {societies.map((s: any, i: number) => {
            const token = designTokens[i % designTokens.length];
            const Icon = token.icon;
            const isHovered = hoveredIdx === i;
            const linkSlug = getSlugForSociety(s.name, s.id);
            
            return (
              <Link
                to={`/societies/${linkSlug}`}
                key={s.id || s.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative group rounded-none p-px overflow-hidden transition-all duration-700 ease-in-out hover:shadow-lg cursor-pointer shadow-sm hover:shadow-lg"
              >
                {/* Animated gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${token.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                <div className="absolute inset-0 border border-slate-200 group-hover:border-slate-200 transition-colors duration-500 rounded-none pointer-events-none z-10" />
                
                <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-none p-6 md:p-8 flex flex-col items-center text-center z-0">
                  
                  <div className={`w-16 h-16 rounded-none flex items-center justify-center mb-6 transition-all duration-700 ease-in-out z-10 relative ${isHovered ? `bg-gradient-to-br ${token.color} text-slate-900 shadow-lg scale-110 -rotate-3` : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="font-serif font-extrabold text-xl text-slate-800 mb-3 tracking-tight z-10 relative">
                    {s.name}
                  </h3>
                  
                  {s.description ? (
                    <p className={`line-clamp-3 text-sm transition-colors duration-300 z-10 relative ${isHovered ? 'text-slate-600' : 'text-slate-500'}`}>
                      {s.description}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic z-10 relative">Exploring innovations pushing boundaries.</p>
                  )}
                  
                  {/* Faux button effect on hover */}
                  <div className={`mt-6 w-full pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-700 ease-in-out z-10 relative ${isHovered ? 'text-slate-900 opacity-100 translate-y-0' : 'text-slate-400 opacity-0 translate-y-2'}`}>
                    Learn More <Target size={14} className="animate-pulse" />
                  </div>
                  
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default SocietiesSection;
