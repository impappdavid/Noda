import { useState } from 'react';
import { Plus, ExternalLink, MoreHorizontal, Clock, Target, SlidersHorizontal } from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';

const trackerData = [
    { id: 43, company: "Taco Bell", role: "Oven installation", status: "Interviewing", applied: "2d ago", match: 96, link: "#" },
    { id: 44, company: "Vercel", role: "Frontend Deployment", status: "Applied", applied: "5d ago", match: 92, link: "#" },
    { id: 45, company: "OpenAI", role: "GPU Cluster Setup", status: "Closed", applied: "1w ago", match: 88, link: "#" },
    { id: 46, company: "Linear", role: "Systems Designer", status: "Rejected", applied: "1w ago", match: 94, link: "#" },
    { id: 47, company: "Stripe", role: "Backend Engineer", status: "Offer", applied: "2w ago", match: 84, link: "#" }
];

const AppTracker = () => {
    const [filter, setFilter] = useState("All");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    {/* 1. Header & Filter Protocol */}
                    <div className="px-4 py-3 border-b border-zinc-300 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
                            {["All", "Applied", "Interviewing", "Offer"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold font-mono shrink-0 transition-all ${
                                        filter === tab ? "bg-zinc-900 text-white" : "bg-zinc-50 text-zinc-400 hover:text-zinc-900"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                            <button className="p-1 text-zinc-300 hover:text-zinc-900 ml-1">
                                <SlidersHorizontal size={14} />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 pl-4">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold whitespace-nowrap">
                                {trackerData.length} Nodes
                            </span>
                            <button className="bg-zinc-900 text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-all shadow-sm">
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>

                    {/* 2. Horizontal Node Grid */}
                    <div className="flex-1 overflow-y-auto p-3 scrollbar-hide bg-zinc-50/10">
                        <div className="grid grid-cols-2 gap-2">
                            {trackerData.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200/60 transition-all flex flex-col gap-2 group cursor-pointer"
                                >
                                    {/* Top Row: Meta & Signal */}
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                                            Applied {item.applied}
                                        </span>
                                        <div className={`text-[10px] font-mono font-bold ${item.match > 90 ? 'text-orange-500' : 'text-zinc-400'}`}>
                                            {item.match}%
                                        </div>
                                    </div>

                                    {/* Middle: Core Identity */}
                                    <div className="flex justify-between items-end">
                                        <div className="min-w-0">
                                            <h3 className="text-[11px] font-bold text-black truncate tracking-tight leading-none">
                                                {item.role}
                                            </h3>
                                            <p className="text-[10px] text-zinc-500 font-medium mt-1 truncate">
                                                {item.company}
                                            </p>
                                        </div>
                                        
                                        {/* Status Signal */}
                                        <div className="flex items-center gap-1.5 shrink-0 ml-4">
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                item.status === 'Offer' ? 'bg-emerald-500' : 
                                                item.status === 'Interviewing' ? 'bg-blue-500 animate-pulse' :
                                                item.status === 'Applied' ? 'bg-orange-500 animate-pulse' :
                                                item.status === 'Rejected' ? 'bg-red-500 animate-pulse' : 'bg-zinc-500' 
                                            }`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${
                                                item.status === 'Offer' ? 'text-emerald-400' : 
                                                item.status === 'Interviewing' ? 'text-blue-400 animate-pulse' :
                                                item.status === 'Applied' ? 'text-orange-400 animate-pulse' :
                                                item.status === 'Rejected' ? 'text-red-400 animate-pulse' : 'text-zinc-400' 
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppTracker;