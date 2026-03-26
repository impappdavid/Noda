import { cn } from "@/lib/utils";
import { BotOff, Clock, Search, ShieldAlert, ShieldCheck, Terminal, Users, Lock } from "lucide-react";
import { Activity, useEffect, useState } from "react";

// --- MOCK DATA ---
const TABS = [
    {
        id: "tracker",
        title: "Tracker",
        desc: "Monitor pipeline progression with algorithmic match scoring.",
        icon: <Activity size={12} />
    },
    {
        id: "deadline",
        title: "Anti Ghosting",
        desc: "Strict 14-day lifecycles enforce rapid pipeline execution.",
        icon: <Clock size={14} />
    },
    {
        id: "tags",
        title: "Command Search",
        desc: "Filter system nodes using precise technical stack tags.",
        icon: <Search size={14} />
    },
    {
        id: "profile",
        title: "Anti Bot",
        desc: "Complete strict identity verification to unlock messaging and pipeline interactions.",
        icon: <BotOff size={14} />
    }
];

const InteractiveTabs = () => {

    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [countdown, setCountdown] = useState(14 * 24 * 60 * 60);

    useEffect(() => {
        const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, []);

     const formatTime = (seconds: number) => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor(seconds % (3600 * 24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 60);
        return `${d}D : ${h.toString().padStart(2, '0')}H : ${m.toString().padStart(2, '0')}M : ${s.toString().padStart(2, '0')}S`;
    };
    return (
        <>
            {/* --- 4. INTERACTIVE COMPONENT DECK --- */}

            <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-300 bg-white border-b border-zinc-300">

                {/* Left: Tab List (Col Span 4) */}
                <div className="md:col-span-4 flex flex-col divide-y divide-zinc-300">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "p-5 flex flex-col text-left transition-all cursor-pointer outline-none group border-l-[3px]",
                                activeTab === tab.id
                                    ? "bg-zinc-50 border-l-orange-500"
                                    : "bg-transparent border-l-transparent hover:bg-zinc-50/80"
                            )}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className={cn("transition-colors", activeTab === tab.id ? "text-orange-600" : "text-zinc-500 group-hover:text-zinc-900")}>
                                    {tab.icon}
                                </div>
                                <span className={cn(
                                    "text-xs font-bold uppercase tracking-widest leading-none mt-0.5",
                                    activeTab === tab.id ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"
                                )}>
                                    {tab.title}
                                </span>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-600 leading-relaxed">
                                {tab.desc}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right: Component Render (Col Span 8) */}
                <div className="md:col-span-8 bg-zinc-200 flex flex-col relative overflow-hidden min-h-[320px]">

                    {/* Terminal Header */}
                    <div className="border-b border-zinc-300 flex items-center justify-between p-2 bg-white shrink-0 z-10 ">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-orange-500" />
                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mt-0.5">
                                render.tsx
                            </span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-1.5 h-1.5 bg-zinc-300" />
                            <div className="w-1.5 h-1.5 bg-zinc-300" />
                        </div>
                    </div>

                    {/* Interactive Render Area */}
                    <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                        <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in-95 duration-300" key={activeTab}>

                            {activeTab === 'tracker' && (
                                <div className="bg-white border border-zinc-300 p-5 flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-orange-600 mb-1">Applied 2D AGO</span>
                                            <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Lead Systems Architect</h3>
                                            <p className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5 tracking-widest">OpenAI</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Match</span>
                                            <span className="text-xl font-black text-emerald-600 leading-none">96%</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-zinc-300 h-1.5 border border-zinc-200">
                                        <div className="bg-emerald-500 h-full w-[96%]" />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'deadline' && (
                                <div className="bg-white border border-zinc-300 flex flex-col">
                                    <div className="p-2 bg-zinc-800 flex justify-between items-center text-white">
                                        <span className="text-[9px] font-mono font-black uppercase tracking-widest">Lifecycle_TTL</span>
                                        <Clock size={12} className="text-orange-500 animate-pulse" />
                                    </div>
                                    <div className="p-4 flex flex-col items-center justify-center bg-zinc-50 border-t border-zinc-300">
                                        <span className="text-xl font-mono font-black text-zinc- leading-none mb-3 drop-shadow-sm">
                                            {formatTime(countdown)}
                                        </span>
                                        <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest px-2 py-1 bg-red-100 border border-red-200">Action Required</span>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'tags' && (
                                <div className="bg-white border border-zinc-300 p-2 flex flex-col gap-2">
                                    <div className="relative flex items-center h-10 border border-zinc-300 bg-zinc-50 px-3 ">
                                        <Search size={14} className="text-zinc-500 mr-2" />
                                        <input disabled placeholder="/user, /company, /job..." className="w-full text-[12px] outline-none bg-transparent" />
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["React", "Rust", "Distributed_Systems", "GraphQL", "Web3"].map(tag => (
                                            <span key={tag} className="px-2 py-1.5 bg-white border border-zinc-300 text-[9px] font-black text-zinc-700 uppercase tracking-widest shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'profile' && (
                                <div className="bg-white border border-zinc-300 flex flex-col w-full">

                                    {/* Anti-Bot Security Header */}
                                    <div className="p-2 bg-red-50 border-b border-zinc-300 flex items-center justify-between shrink-0">
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert size={14} className="text-red-600" />
                                            <span className="text-[9px] font-mono font-black text-red-600 uppercase tracking-widest mt-0.5">
                                                Identity Unverified
                                            </span>
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-red-600 " />
                                    </div>

                                    {/* Basic Profile Readout */}
                                    <div className="p-2 flex items-center justify-between border-b border-zinc-200 bg-zinc-50 shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white border border-zinc-300 flex items-center justify-center">
                                                <Users size={14} className="text-zinc-500" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-wide">Standard User</span>
                                                <div className="flex items-center ">
                                                    <span className="text-[9px] font-black text-zinc-500 mr-1">@</span>
                                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">node_892a</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Locked Feature Matrix (2-Column Grid to save vertical space) */}
                                    <div className="p-2 flex flex-col gap-2 flex-1 bg-white">
                                        <p className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest mb-1">
                                            Restricted Modules (Anti-Bot):
                                        </p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                "Messaging",
                                                "Job Apply",
                                                "Connections",
                                                "Forum Write"
                                            ].map((feature) => (
                                                <div key={feature} className="flex items-center justify-between p-2 border border-zinc-200 bg-zinc-50/50">
                                                    <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest truncate mr-2">{feature}</span>
                                                    <Lock size={10} className="text-zinc-500 shrink-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Execution CTA */}
                                    <div className="p-2 pt-0 mt-auto shrink-0 bg-white">
                                        <button className="w-full h-10 bg-zinc-800 text-white flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-orange-500 transition-colors active:shadow-none outline-none cursor-pointer">
                                            <ShieldCheck size={14} />
                                            Verify Identity
                                        </button>
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InteractiveTabs