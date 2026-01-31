import { useState } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';

const trackerData = [
    { id: 43, company: "Taco Bell", role: "Oven installation", status: "Interviewing", applied: "2d ago", match: 96, link: "#", interviewDate: null },
    { id: 44, company: "Vercel", role: "Frontend Deployment", status: "Applied", applied: "5d ago", match: 92, link: "#" },
    { id: 45, company: "OpenAI", role: "GPU Cluster Setup", status: "Interviewing", applied: "1w ago", match: 88, link: "#", interviewDate: "Feb 12, 14:00" },
    { id: 46, company: "Linear", role: "Systems Designer", status: "Rejected", applied: "1w ago", match: 94, link: "#" },
];

const AppTracker = () => {
    const [filter, setFilter] = useState("All");

    // 1. Functional Filter Logic
    const filteredData = trackerData.filter(item =>
        filter === "All" ? true : item.status === filter
    );

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    {/* Header Controls */}
                    <div className="px-4 py-3 border-b border-zinc-300 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1">
                            {["All", "Applied", "Interviewing", "Rejected"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`px-3 py-1 rounded-lg text-[10px] font-bold font-mono transition-all ${filter === tab
                                            ? "bg-zinc-900 text-white shadow-sm"
                                            : "bg-zinc-50 text-zinc-400 hover:text-zinc-900"
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
                            {/* 2. Dynamic Total Card Number */}
                            <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold whitespace-nowrap">
                                {filteredData.length} {filteredData.length === 1 ? 'Node' : 'Nodes'}
                            </span>
                            <button className="bg-zinc-900 text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-all shadow-sm">
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Tracker Grid */}
                    <div className="flex-1 overflow-y-auto p-3 scrollbar-hide bg-zinc-50/10">
                        <div className="grid grid-cols-2 gap-2">
                            {filteredData.map((item) => {
                                const isInterviewing = item.status === "Interviewing";
                                const hasDate = !!item.interviewDate;

                                // 1. UNSCHEDULED INTERVIEW CARD (SKY GRADIENT)
                                if (isInterviewing && !hasDate) {
                                    return (
                                        <div key={item.id} className="p-4 rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-500 flex flex-col justify-between  shadow-md border border-zinc-300">
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <h3 className="text-sm font-black text-white leading-none uppercase">You got an interview</h3>
                                                    <p className="text-[10px] font-bold text-sky-100 uppercase tracking-tighter mt-1">choose the date</p>
                                                </div>
                                                <span className="text-[11px] font-mono font-bold text-white/90">{item.match}%</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-bold text-white/80 truncate pr-4">
                                                    {item.company} — {item.role}
                                                </span>
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                            </div>
                                        </div>
                                    );
                                }

                                // 2. STANDARD / SCHEDULED CARD
                                return (
                                    <div key={item.id} className={`p-3 rounded-xl flex flex-col justify-between border transition-all ${hasDate ? "border-blue-400 bg-zinc-200/60 ring-1 ring-blue-50" : "bg-zinc-100 border-zinc-200"
                                        }`}>
                                        <div className="flex justify-between items-start">
                                            <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
                                                Applied {item.applied}
                                            </span>
                                            <span className={`text-[10px] font-mono font-bold ${item.match > 90 ? 'text-orange-500' : 'text-zinc-400'}`}>
                                                {item.match}%
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="min-w-0">
                                                <h3 className="text-[11px] font-bold text-black truncate tracking-tight">{item.role}</h3>
                                                <p className="text-[10px] text-zinc-500 font-medium truncate">{item.company}</p>
                                            </div>

                                            <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                                                {/* Date above status */}
                                                {hasDate && (
                                                    <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-1 rounded border border-blue-100">
                                                        {item.interviewDate}
                                                    </span>
                                                )}
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1 h-1 rounded-full ${item.status === 'Offer' ? 'bg-emerald-500' :
                                                        item.status === 'Interviewing' ? 'bg-blue-500 animate-pulse' :
                                                            item.status === 'Applied' ? 'bg-orange-500 animate-pulse' :
                                                                item.status === 'Rejected' ? 'bg-red-500 animate-pulse' : 'bg-zinc-500'
                                                        }`} />
                                                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${item.status === 'Offer' ? 'text-emerald-400' :
                                                        item.status === 'Interviewing' ? 'text-blue-400 animate-pulse' :
                                                            item.status === 'Applied' ? 'text-orange-400 animate-pulse' :
                                                                item.status === 'Rejected' ? 'text-red-400 animate-pulse' : 'text-zinc-400'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppTracker;