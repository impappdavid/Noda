import { useState } from 'react';
import { ShieldCheck, ArrowRight, Zap, Terminal,  X,  Image as ImageIcon2 } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FounderIdeaPortal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Simulation for image data injection
  const handleImageUpload = () => {
    if (images.length < 4) {
      setImages([...images, `blob:noda-node-${images.length}`]);
    }
  };

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0">
          <AppSideBar />
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
          
          {/* 1. PROTOCOL HEADER */}
          <div className="px-4 py-2 bg-zinc-800 bg-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-orange-500" />
              <span className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">Protocol: Idea_Injection</span>
            </div>
            <span className="text-[9px] font-mono font-black text-zinc-300 uppercase tracking-tighter">Verified_Founder_ID: #0042</span>
          </div>

          {/* 2. COMPACT INPUT SYSTEM */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Title Input */}
            <div className="border-b border-zinc-300">
              <input 
                placeholder="IDEA_TITLE" 
                className="w-full px-4 h-10 text-sm font-bold tracking-tighter outline-none bg-transparent placeholder:text-zinc-500"
              />
            </div>

            {/* Label-less Select Grid */}
            <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300 shrink-0">
              <div className="h-10 px-4 bg-zinc-50/50 flex items-center">
                <Select defaultValue="core">
                  <SelectTrigger className="border-none shadow-none focus:ring-0 h-full w-full p-0 bg-transparent text-[9px] font-bold uppercase rounded-none justify-start gap-2 cursor-pointer">
                    <Terminal size={10} className="text-zinc-500" />
                    <SelectValue placeholder="SELECT_CATEGORY" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-none border-zinc-300 font-mono text-[10px] uppercase">
                    <SelectItem value="core" className='cursor-pointer text-xs'>CORE_SYSTEM</SelectItem>
                    <SelectItem value="ux" className='cursor-pointer text-xs'>UX_INTERFACE</SelectItem>
                    <SelectItem value="algo" className='cursor-pointer text-xs'>ALGO_FEED</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-10 px-4 flex items-center">
                <Select defaultValue="critical">
                  <SelectTrigger className="border-none shadow-none focus:ring-0 h-full w-full p-0 bg-transparent text-[9px] font-bold uppercase rounded-none justify-start gap-2 cursor-pointer">
                    <Zap size={10} className="text-zinc-500" />
                    <SelectValue placeholder="SELECT_PRIORITY" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="rounded-none border-zinc-300 font-mono text-[10px] uppercase ">
                    <SelectItem value="low" className='cursor-pointer text-xs'>LOW_IMPACT</SelectItem>
                    <SelectItem value="mid" className='cursor-pointer text-xs'>MEDIUM_WEIGHT</SelectItem>
                    <SelectItem value="critical" className='cursor-pointer text-xs'>CRITICAL_NODE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Main Manifest Content */}
            <div className="flex-1 flex flex-col  bg-white overflow-y-auto scrollbar-hide">
              <textarea 
                placeholder="IDENTIFY_OPPORTUNITY_AND_EXPECTED_RESONANCE..."
                className="w-full flex-1 p-4 text-[11px] font-mono font-bold outline-none resize-none leading-relaxed placeholder:text-zinc-500 min-h-[150px]"
              />

              {/* DYNAMIC IMAGE GRID PATTERN */}
              <div className="mt-6 pt-4 border-t border-zinc-300">
                <div className="flex items-center justify-between mb-4 px-4">
                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Visual_Uplink_Nodes</span>
                    <button 
                        onClick={handleImageUpload}
                        className="text-[8px] font-mono font-black text-zinc-900 uppercase underline underline-offset-4 hover:text-orange-600 transition-colors"
                    >
                        Attach_New_Data [+]
                    </button>
                </div>

                {/* Grid Logic: 1 img = full, 2+ = 2-col grid */}
                <div className={cn(
                    "grid gap-2",
                    images.length >= 2 ? "grid-cols-2" : "grid-cols-1"
                )}>
                  {images.map((_, i) => (
                    <div key={i} className="group relative aspect-video bg-zinc-200 border border-zinc-200 flex items-center justify-center overflow-hidden">
                      <ImageIcon2 size={20} className="text-zinc-500" />
                      
                      {/* Technical Overlay */}
                      <div className="absolute top-2 left-2 px-1 bg-zinc-900 text-[9px] font-mono text-white">
                        REF_NODE_{i+1}
                      </div>

                      <button 
                        onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                        className="absolute top-2 right-2 bg-zinc-900 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  {/* Empty state placeholder if no images attached */}
                  {images.length === 0 && (
                    <div className="h-24 border-2 border-dashed border-zinc-50 flex flex-col items-center justify-center">
                        <span className="text-[7px] font-mono font-black text-zinc-200 uppercase tracking-widest">No_Visual_Data_Injected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. HEAVY ACTION FOOTER */}
            <div className="shrink-0">
              <button 
                onClick={() => setIsSubmitting(true)}
                disabled={isSubmitting}
                className={cn(
                  "w-full h-12 flex items-center justify-center gap-4 font-mono font-black text-[11px] uppercase tracking-[0.4em] transition-all cursor-pointer",
                  isSubmitting ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white hover:bg-zinc-800"
                )}
              >
                {isSubmitting ? "TRANSMITTING..." : "Initialize_Idea_Uplink"}
                {isSubmitting ? <Zap size={14} fill="currentColor" className="animate-pulse" /> : <ArrowRight size={14} />}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FounderIdeaPortal;