import React from 'react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const RoadmapProtocol = () => {
    const timeline = [
        
        { id: "04", title: "MOBILE_UPLINK", date: "TBA", status: "WAIT", desc: "NATIVE PROTOCOL DEPLOYMENT." },
        { id: "03", title: "NEURAL_MATCH_V2", date: "MAR_26", status: "WAIT", desc: "VECTOR RESONANCE ALGORITHM." },
        { id: "02", title: "FOUNDER_WAITLIST", date: "FEB_26", status: "LIVE", desc: "ACTIVE INJECTION PORTAL OPEN." },
        { id: "01", title: "CORE_SYSTEM_INIT", date: "JAN_26", status: "DONE", desc: "BASE INFRASTRUCTURE DEPLOYED." },


    ];

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12.5">

                    {/* 1. COMPACT HEADER */}
                    <div className="px-4 h-8 border-b border-zinc-300 bg-zinc-800 flex justify-between items-center shrink-0">
                        <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-zinc-300">Roadmap_Index</span>
                        <span className="text-[9px] font-mono font-black text-zinc-300 uppercase italic">v.4.0_STABLE</span>
                    </div>

                    {/* 2. DATA STRIP LIST */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <div className="flex flex-col">
                            {timeline.map((node, idx) => (
                                <div key={idx} className="group border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors px-4 py-2 flex items-center gap-6">

                                    {/* STATUS SYMBOL */}
                                    <div className="w-4 flex justify-center items-start shrink-0">
                                        {node.status === "DONE" && <span className="text-[18px] font-black text-emerald-600">●</span>}
                                        {node.status === "LIVE" && <span className="text-[18px] font-black text-orange-600 animate-pulse">●</span>}
                                        {node.status === "WAIT" && <span className="text-[18px] font-black text-zinc-500">●</span>}
                                    </div>

                                    {/* PRIMARY DATA */}
                                    <div className="flex-1 flex items-center justify-between min-w-0">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-[11px] font-bold uppercase tracking-tight truncate group-hover:text-orange-600 transition-colors">
                                                    {node.title}
                                                </h3>
                                                <span className="text-[9px] font-mono font-black text-zinc-500">#N_{node.id}</span>
                                            </div>
                                            <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase truncate">
                                                {node.desc}
                                            </p>
                                        </div>

                                        {/* METADATA */}
                                        <div className="flex items-center gap-4 shrink-0">
                                            <span className={cn(
                                                "text-[9px] font-mono font-black uppercase tracking-tighter",
                                                node.status === "LIVE" ? "text-orange-600" : node.status === "DONE" ? "text-emerald-600" : "text-zinc-500"
                                            )}>
                                                {node.status}
                                            </span>
                                            <span className="text-[9px] font-mono font-black text-zinc-900 w-12 text-right">{node.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. SLIM STATUS LINE */}
                    <div className="h-6 bg-white border-t border-zinc-100 flex items-center px-4 shrink-0">
                        <div className="flex gap-4 opacity-30 grayscale">
                            <span className="text-[7px] font-mono font-black uppercase">●_Stable</span>
                            <span className="text-[7px] font-mono font-black uppercase">▶_Active</span>
                            <span className="text-[7px] font-mono font-black uppercase">○_Planned</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RoadmapProtocol;