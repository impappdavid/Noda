import { useState } from "react";
import {
  ShieldCheck,
  Info,
  CheckCircle2,
  XCircle,
  User,
  Calendar,
  X,
  BadgeQuestionMark,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// --- NEW CAROUSEL COMPONENT ---
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video bg-zinc-100 border-b border-zinc-300 flex items-center justify-center">
        <span className="text-[10px] font-mono text-zinc-400 uppercase">No_Visual_Data</span>
      </div>
    );
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-video bg-zinc-200 border-b border-zinc-300 overflow-hidden group">
      <img
        src={images[currentIndex]}
        alt={`Intel attachment ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />
      
      {/* Navigation Overlays */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-0 top-0 bottom-0 px-2 bg-black/30 hover:bg-black/50 cursor-pointer text-white transition-all flex items-center"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-0 bottom-0 px-2 bg-black/30 hover:bg-black/50 cursor-pointer text-white  transition-all flex items-center"
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Index Counter */}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 font-mono uppercase tracking-widest backdrop-blur-sm border border-white/20">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}

      <div className="absolute top-2 left-2 bg-black/60 text-white text-[8px] px-1.5 py-0.5 font-mono uppercase tracking-widest backdrop-blur-sm border border-white/20">
        Images
      </div>
    </div>
  );
};

const IdeaReview = () => {
  const [pendingIdeas] = useState([
    {
      id: "101",
      title: "QUANTUM_STAKING_V1",
      founder: "berlin_dev",
      category: "FINANCE",
      // Changed to array
      images: [
        "https://developer.apple.com/design/resources/images/thumbnails/Thumbnail-UIKit-iOS26_2x.png",
        "https://img.magnific.com/free-vector/gradient-ui-kit-collection_23-2149203257.jpg?semt=ais_hybrid&w=740&q=80"
      ],
      abstract: "A PROBABILISTIC STAKING MODEL BASED ON NODE UPTIME VARIANCE.",
      full_intel:
        "THIS PROTOCOL USES SHANNON ENTROPY TO CALCULATE RISK REWARDS FOR LONG-TERM STAKERS. IT REDUCES VOLATILITY BY 12% IN TESTNET SIMULATIONS.",
      timestamp: "2026.02.13",
    },
    {
      id: "105",
      title: "ZKP_ID_PROTOCOL",
      founder: "cipher_null",
      category: "SECURITY",
      images: ["https://developer.apple.com/design/resources/images/thumbnails/Thumbnail-SwiftUI-iOS26_2x.png"],
      abstract: "ZERO-KNOWLEDGE PROOF FOR ANONYMOUS FOUNDER VERIFICATION.",
      full_intel:
        "IMPLEMENTING CIRCOM CIRCUITS TO ALLOW FOUNDERS TO PROVE LIQUIDITY WITHOUT REVEALING WALLET ADDRESSES TO THE PUBLIC RESONANCE BOARD.",
      timestamp: "2026.02.12",
    },
    {
      id: "106",
      title: "DATA Breach",
      founder: "cipher",
      category: "SECURITY",
      images: [],
      abstract: "ZERO-KNOWLEDGE PROOF FOR ANONYMOUS FOUNDER VERIFICATION.",
      full_intel:
        "IMPLEMENTING CIRCOM CIRCUITS TO ALLOW FOUNDERS TO PROVE LIQUIDITY WITHOUT REVEALING WALLET ADDRESSES TO THE PUBLIC RESONANCE BOARD.",
      timestamp: "2026.02.12",
    },
  ]);

  return (
    <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
        

        <main className="flex flex-1 border-x border-zinc-300  bg-white overflow-hidden flex-col">
          <div className="px-2 h-8 border-b border-zinc-300 bg-zinc-200 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-black" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                Idea Review Queue
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase font-black">
              Pending Review: {pendingIdeas.length}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-x divide-zinc-300 scrollbar-hide gap-px grid grid-cols-3 border-b border-zinc-300">
            {pendingIdeas.map((idea) => (
              <Dialog key={idea.id}>
                <DialogTrigger asChild>
                  <div className="p-2 bg-white flex flex-col group h-fit border-b border-zinc-300 cursor-pointer hover:bg-zinc-200 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] font-mono font-black text-white bg-zinc-800 px-1 py-0.5">
                          ID: {idea.id}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-white bg-blue-500 px-1 py-0.5 tracking-tight">
                          {idea.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                        {idea.timestamp}
                      </span>
                    </div>

                    <div className="flex-1 ">
                      <h3 className="text-xs font-bold uppercase tracking-tight leading-none mb-1 group-hover:text-zinc-900 transition-colors">
                        {idea.title}
                      </h3>
                      <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase truncate">
                        By {idea.founder}
                      </p>
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
                  <DialogHeader className="bg-blue-500 p-1.5 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
                    <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
                      <BadgeQuestionMark size={16} className="text-white shrink-0" />
                      Review
                    </DialogTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold uppercase text-zinc-300">
                        Idea_{idea.id}
                      </span>
                      <DialogClose>
                        <button className="hover:bg-black/40 text-zinc-200 hover:text-zinc-100 cursor-pointer p-1 transition-colors outline-none border-none bg-transparent">
                          <X className="w-4 h-4 " />
                        </button>
                      </DialogClose>
                    </div>
                  </DialogHeader>

                  <div className="max-h-[75vh] overflow-y-auto scrollbar-hide">
                    {/* SECTION 1: CAROUSEL REPLACING SINGLE IMAGE */}
                    <ImageCarousel images={idea.images} />

                    <div className="flex items-center justify-between p-2 pb-1  border-b border-zinc-300">
                      <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                        {idea.category}
                      </span>
                      <div className="h-1.5 w-1.5 bg-green-500 animate-pulse" />
                    </div>

                    <div className="border-b border-zinc-300">
                      <span className="text-[10px] font-bold flex flex-col gap-1 p-2 text-zinc-900 leading-none">
                        <div className="font-normal text-zinc-500 uppercase text-[9px] tracking-tighter">
                          Title
                        </div>
                        <h2 className="text-lg font-bold tracking-tighter">
                          {idea.title}
                        </h2>
                      </span>
                    </div>

                    <div className=" border-b border-zinc-300">
                      <span className="text-[10px] font-bold flex flex-col gap-1 font-mono p-2 text-zinc-800 leading-none">
                        <div className="font-normal text-zinc-500 flex items-center gap-1 uppercase text-[9px]">
                          <Info size={12} /> Description
                        </div>
                        <p className="text-[11px] leading-relaxed mt-1 uppercase text-zinc-700">
                          {idea.full_intel}
                        </p>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300">
                      <div className="px-2 pb-1.5 bg-white">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">
                          Founder
                        </span>
                        <div className="text-[10px] font-mono font-bold text-zinc-900 flex items-center gap-1.5 hover:underline cursor-pointer">
                          <User size={10} /> @{idea.founder}
                        </div>
                      </div>
                      <div className="px-2 pb-1.5 bg-white">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">
                          Timestamp
                        </span>
                        <div className="text-[10px] font-mono font-bold text-zinc-600 flex items-center gap-1.5">
                          <Calendar size={10} /> {idea.timestamp}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2">
                      <button className="h-11 border-t border-zinc-300 bg-white hover:bg-red-500 hover:text-white font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2 text-zinc-600">
                        <XCircle size={14} /> Reject
                      </button>
                      <button className="h-11 bg-zinc-800 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2 border-t border-zinc-900">
                        <CheckCircle2 size={14} /> Accept
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          <div className="h-6 bg-white border-t border-zinc-100 flex items-center px-4 shrink-0">
            <span className="text-[7px] font-mono text-zinc-300 uppercase tracking-[0.4em]">
              Auth_Protocol: Platform_Operator_01
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IdeaReview;