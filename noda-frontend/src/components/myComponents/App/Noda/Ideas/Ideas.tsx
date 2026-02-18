import { useState } from 'react';
import { Terminal, 
    ThumbsUp, ThumbsDown, Zap, Calendar, Info, 
    Maximize
} from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const IdeaResonanceBoard = () => {
    const [proposals] = useState([
        {
            id: "77",
            title: "DARK_MODE_PROTOCOL",
            founder: "@neo",
            votes_yes: 124,
            votes_no: 12,
            category: "UI",
            desc: "STRICT MONOCHROME UI TOGGLE FOR LOW-LIGHT WORKSTATIONS.",
            intel: "Implements a high-contrast terminal aesthetic using Zinc-950. Optimized for OLED power efficiency and long-form technical sessions.",
            timestamp: "2026.02.13"
        },
        {
            id: "82",
            title: "NEURAL_SEARCH_V2",
            founder: "@vane",
            votes_yes: 89,
            votes_no: 45,
            category: "ALGO",
            desc: "VECTOR-BASED EMBEDDINGS FOR HIGH-VELOCITY MATCHING.",
            intel: "Transitioning to semantic vector indexing. Enables 'vibe-based' discovery between founder nodes and job deployments.",
            timestamp: "2026.02.12"
        },
    ]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12.5">

                    {/* 1. SLIM HEADER */}
                    <div className="px-3 h-9 border-b border-zinc-300 bg-zinc-800 flex justify-between items-center shrink-0">
                        <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-300">[RESONANCE_FEED]</span>
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                             <span className="text-[9px] font-mono font-black text-emerald-500 uppercase">SYNC_ACTIVE</span>
                        </div>
                    </div>

                    {/* 2. COMPACT TRACKER GRID */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide divide-x divide-zinc-300 gap-px grid grid-cols-2">
                        {proposals.map((idea) => (
                            <Dialog key={idea.id}>
                                <DialogTrigger asChild>
                                    <div className="p-2.5 flex flex-col group h-fit border-b border-zinc-300 bg-white hover:bg-zinc-50 transition-all cursor-pointer relative">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[9px] font-mono font-bold text-white bg-zinc-800 px-1 py-0.5">#{idea.id}</span>
                                                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{idea.category}</span>
                                            </div>

                                            <div className="flex border border-zinc-300 divide-x divide-zinc-300 shrink-0 bg-white">
                                                <div className="p-1 px-2 flex items-center gap-1 text-emerald-600 hover:bg-emerald-500/20 transition-colors cursor-pointer">
                                                    <ThumbsUp size={10} strokeWidth={2} />
                                                    <span className="text-[10px] font-black">{idea.votes_yes}</span>
                                                </div>
                                                <div className="p-1 px-2 flex items-center gap-1 text-red-600 hover:bg-red-500/20 transition-colors cursor-pointer">
                                                    <ThumbsDown size={10} strokeWidth={2} />
                                                    <span className="text-[10px] font-black">{idea.votes_no}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-0.5">
                                            <h3 className="text-[12px] font-bold uppercase tracking-tight leading-none mb-0.5 truncate">{idea.title}</h3>
                                            <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase leading-none truncate ">
                                                {idea.desc}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex justify-between items-center">
                                            <div className="flex items-center gap-1">
                                                <Terminal size={10} className="text-zinc-900" />
                                                <span className="text-[9px] font-mono font-black uppercase text-zinc-900">{idea.founder}</span>
                                            </div>
                                            <Maximize size={12} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                                        </div>
                                    </div>
                                </DialogTrigger>

                                {/* --- SHADCN DIALOG CONTENT --- */}
                                <DialogContent className="sm:max-w-[500px] p-0 rounded-none border-none gap-0 overflow-hidden">
                                    <DialogHeader className="p-4 bg-zinc-800 text-white space-y-0 flex-row items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Zap size={14} className="text-orange-500 fill-orange-500" />
                                            <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">Intel_Expansion_Node</DialogTitle>
                                        </div>
                                    </DialogHeader>

                                    <div className="p-4 space-y-4">
                                        <div className="space-y-2">
                                            <div className="text-[9px] font-mono font-black text-orange-600 uppercase tracking-widest">{idea.category}_Classification</div>
                                            <h2 className="text-xl font-bold tracking-tighter leading-none">{idea.title}</h2>
                                        </div>

                                        <div className="flex items-center gap-6  border-y border-zinc-100 font-mono text-[10px] uppercase font-bold text-zinc-500">
                                            <div className="flex items-center gap-1.5"><Terminal size={12} className="text-zinc-900" /> {idea.founder}</div>
                                            <div className="flex items-center gap-1.5"><Calendar size={12} /> {idea.timestamp}</div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                                <Info size={12} /> Abstract_Manifest
                                            </div>
                                            <p className="text-[12px] font-mono font-bold text-zinc-700 uppercase leading-relaxed">
                                                {idea.intel}
                                            </p>
                                        </div>

                                        {/* Voting Action Area */}
                                        <div className="grid grid-cols-2 gap-4 ">
                                            <button className="h-12 border border-emerald-500/50 flex items-center justify-center gap-3 hover:bg-emerald-500/20 hover:border-emerald-500/60 text-emerald-600 transition-all group cursor-pointer">
                                                <ThumbsUp size={18} className="group-active:scale-90 transition-transform" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Resonate_{idea.votes_yes}</span>
                                            </button>
                                            <button className="h-12 border border-red-500/50 flex items-center justify-center gap-3 hover:bg-red-500/20 hover:border-red-500 text-red-600 transition-all group cursor-pointer">
                                                <ThumbsDown size={18} className="group-active:scale-90 transition-transform" />
                                                <span className="text-[11px] font-black uppercase tracking-widest">Dismiss_{idea.votes_no}</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default IdeaResonanceBoard;