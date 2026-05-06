import { useState } from 'react';
import { 
    ShieldCheck,
    ArrowUpRight, Info, CheckCircle2, XCircle,
    User, Calendar, Layout
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const IdeaReviewPage = () => {
    const [pendingIdeas] = useState([
        {
            id: "101",
            title: "QUANTUM_STAKING_V1",
            founder: "@berlin_dev",
            category: "FINANCE",
            abstract: "A PROBABILISTIC STAKING MODEL BASED ON NODE UPTIME VARIANCE.",
            full_intel: "THIS PROTOCOL USES SHANNON ENTROPY TO CALCULATE RISK REWARDS FOR LONG-TERM STAKERS. IT REDUCES VOLATILITY BY 12% IN TESTNET SIMULATIONS.",
            timestamp: "2026.02.13"
        },
        {
            id: "105",
            title: "ZKP_ID_PROTOCOL",
            founder: "@cipher_null",
            category: "SECURITY",
            abstract: "ZERO-KNOWLEDGE PROOF FOR ANONYMOUS FOUNDER VERIFICATION.",
            full_intel: "IMPLEMENTING CIRCOM CIRCUITS TO ALLOW FOUNDERS TO PROVE LIQUIDITY WITHOUT REVEALING WALLET ADDRESSES TO THE PUBLIC RESONANCE BOARD.",
            timestamp: "2026.02.12"
        },
        {
            id: "106",
            title: "DATA Breach",
            founder: "@cipher",
            category: "SECURITY",
            abstract: "ZERO-KNOWLEDGE PROOF FOR ANONYMOUS FOUNDER VERIFICATION.",
            full_intel: "IMPLEMENTING CIRCOM CIRCUITS TO ALLOW FOUNDERS TO PROVE LIQUIDITY WITHOUT REVEALING WALLET ADDRESSES TO THE PUBLIC RESONANCE BOARD.",
            timestamp: "2026.02.12"
        }
    ]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    
                    {/* 1. ADMIN HEADER */}
                    <div className="px-2 h-8 border-b border-zinc-300 bg-zinc-300 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-black" />
                            <span className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Idea Review Queue</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600 uppercase font-black">Pending Review: {pendingIdeas.length}</span>
                    </div>

                    {/* 2. COMPACT REVIEW LIST */}
                    <div className="flex-1 overflow-y-auto divide-x divide-zinc-300 scrollbar-hide gap-px grid grid-cols-3 border-b border-zinc-300">
                        {pendingIdeas.map((idea) => (
                            <Dialog key={idea.id}>
                                <DialogTrigger asChild>
                                    <div className="p-2 bg-white flex flex-col group h-fit border-b border-zinc-300 cursor-pointer hover:bg-zinc-200 transition-all">
                                        
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[9px] font-mono font-black text-white bg-zinc-800 px-1 py-0.5">ID: {idea.id}</span>
                                                <span className="text-[9px] font-mono font-bold text-white bg-blue-500 px-1 py-0.5 tracking-tight">{idea.category}</span>
                                            </div>
                                            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{idea.timestamp}</span>
                                        </div>

                                        <div className="flex-1 mb-1">
                                            <h3 className="text-xs font-bold uppercase tracking-tight leading-none mb-1 group-hover:text-zinc-900 transition-colors">
                                                {idea.title}
                                            </h3>
                                            <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase truncate">
                                                By {idea.founder}
                                            </p>
                                        </div>

                                        
                                    </div>
                                </DialogTrigger>

                                {/* --- REVIEW DIALOG --- */}
                                <DialogContent className="sm:max-w-[500px] p-0 rounded-none border-none shadow-none">
                                    <DialogHeader className="p-4 bg-zinc-900 text-white space-y-0 flex-row items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Layout size={12} className="text-zinc-400" />
                                            <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-300">Intel_Manifest_Review</DialogTitle>
                                        </div>
                                        <span className="text-[9px] font-mono font-black uppercase text-zinc-500 mr-10">NODE_{idea.id}</span>
                                    </DialogHeader>

                                    <div className="px-4 pb-4 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">{idea.category}_SYSTEM</div>
                                            <h2 className="text-xl font-bold uppercase tracking-tighter leading-none">{idea.title}</h2>
                                        </div>

                                        {/* Manifest Body */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-mono font-black text-zinc-900 uppercase border-b border-zinc-100 pb-1">
                                                <Info size={12} /> Technical_Abstract
                                            </div>
                                            <p className="text-[11px] font-mono font-bold text-zinc-800 uppercase leading-relaxed">
                                                {idea.full_intel}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 text-[10px] font-mono font-black text-zinc-500 uppercase">
                                            <div className="flex items-center gap-1.5"><User size={12} className="text-zinc-900" /> {idea.founder}</div>
                                            <div className="flex items-center gap-1.5"><Calendar size={12} /> {idea.timestamp}</div>
                                        </div>

                                        {/* Action Console */}
                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <button className="h-11 border border-zinc-300 flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200 text-zinc-500 hover:text-red-600 transition-all font-mono font-black text-[11px] uppercase cursor-pointer">
                                                <XCircle size={14} /> Reject_Manifest
                                            </button>
                                            <button className="h-11 bg-zinc-800 text-white flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all font-mono font-black text-[10px] uppercase tracking-widest cursor-pointer">
                                                <CheckCircle2 size={14} /> Deploy_Signal
                                            </button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>

                    {/* 3. SYSTEM FOOTER */}
                    <div className="h-6 bg-white border-t border-zinc-100 flex items-center px-4 shrink-0">
                        <span className="text-[7px] font-mono text-zinc-300 uppercase tracking-[0.4em]">Auth_Protocol: Platform_Operator_01</span>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default IdeaReviewPage;