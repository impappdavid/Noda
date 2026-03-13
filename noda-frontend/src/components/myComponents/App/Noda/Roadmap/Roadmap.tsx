import React from 'react';
import {
    Globe, Github, Info, Circle, CheckCircle2,
    LayoutGrid, GitCommit, Layers, Terminal, CircleDashed
} from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

// --- MOCK DATA ---
const ROADMAP_DATA = [
    {
        id: "V1.1.0",
        title: "AI Node Suggestions",
        target: "Q3_2026",
        status: "UPCOMING",
        progress: []
    },
    {
        id: "V1.0.5",
        title: "Dark Mode Matrix",
        target: "Q2_2026",
        status: "ACTIVE",
        progress: [
            { date: "05_MAR_26", log: "UI color palette saturation adjusted for low-light environments. Testing across mobile viewports." },
            { date: "01_MAR_26", log: "Initial CSS variable mapping complete across main interface and nested components." }
        ]
    },
    {
        id: "V1.0.2",
        title: "Settings Module v2",
        target: "Q1_2026",
        status: "LIVE",
        progress: [
            { date: "24_FEB_26", log: "Implemented select nodes and multi-toggle switches for deep customization." },
            { date: "20_FEB_26", log: "Linked user preferences to encrypted local storage to persist offline." }
        ]
    },
    {
        id: "V1.0.1",
        title: "Core System Init",
        target: "Q1_2026",
        status: "COMPLETED",
        progress: [
            { date: "15_JAN_26", log: "Base infrastructure deployed to global edge network with 99.9% uptime." },
            { date: "10_JAN_26", log: "Database schemas locked, verified, and replication nodes initialized." }
        ]
    }
];

const RoadmapProtocol: React.FC = () => {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">

                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12">

                    {/* CENTER CONTENT */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300">

                        {/* SIMPLIFIED HEADER */}
                        <div className="p-2 bg-zinc-800 bg-white sticky top-12 z-30 flex items-center gap-1 border-b border-zinc-700">
                            <LayoutGrid size={14} className="text-zinc-200" />
                            <h1 className="text-xs font-semibold uppercase text-zinc-200 leading-none">Roadmap</h1>
                        </div>

                        {/* CONTINUOUS CONTENT ENGINE */}
                        <div className="flex-1">
                            <div className="flex flex-col gap-[1px]">
                                {ROADMAP_DATA.map(block => (
                                    <div key={block.id} className="bg-white relative flex flex-col group/module">

                                        {/* BLOCK HEADER */}
                                        <div className="flex justify-between items-center  p-2 bg-zinc-50/80 bg-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-semibold text-orange-500 uppercase">{block.id}</span>
                                                <h3 className="text-xs font-semibold text-white uppercase tracking-tight">{block.title}</h3>
                                            </div>
                                            <div className="flex items-center">
                                               
                                                <StatusBadge status={block.status} />
                                            </div>
                                        </div>

                                        {/* BLOCK PROGRESS LOGS */}
                                        <div className="flex flex-col divide-y divide-zinc-300">
                                            {block.progress.map((item, idx) => (
                                                <div key={idx} className="flex group hover:bg-zinc-50 transition-colors">
                                                    <div className="w-20 shrink-0 p-2 border-r border-zinc-100 flex flex-col items-center justify-center bg-zinc-50/30 group-hover:bg-white transition-colors">
                                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{item.date}</span>
                                                    </div>
                                                    <div className="p-2 flex-1 flex items-start gap-3">
                                                        <GitCommit size={14} className="text-zinc-300 group-hover:text-orange-500 transition-colors shrink-0 mt-0.5" />
                                                        <p className="text-[11px] font-medium text-zinc-700 leading-relaxed">
                                                            {item.log}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}

                                            {/* EMPTY STATE FOR UPCOMING */}
                                            {block.progress.length === 0 && (
                                                <div className="p-6 flex flex-col items-center justify-center gap-2 text-zinc-400 bg-zinc-50/30">
                                                    <Terminal size={14} className="opacity-50" />
                                                    <span className="text-[9px] font-mono font-black uppercase tracking-widest">Awaiting Initial Uplink</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* REDESIGNED MAX-W-40 SIDEBAR */}
                    <aside className="w-40 shrink-0 bg-white relative hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">

                            {/* SIDEBAR HEADER */}
                            <div className="p-2 bg-zinc-800 text-white shrink-0">
                                <div className="flex items-center gap-1">
                                    <span className="text-[9px] font-semibold text-zinc-300 uppercase">Registry Stats</span>
                                </div>
                            </div>

                            {/* AGGREGATE INFO */}
                            <div className="p-2 border-b border-zinc-300 bg-white space-y-2 shrink-0">
                                <SidebarStat label="Total Nodes" value={ROADMAP_DATA.length.toString()} />
                                <SidebarStat label="Completed" value={ROADMAP_DATA.filter(r => r.status === 'COMPLETED').length.toString()} />
                                <SidebarStat label="Live/Active" value={ROADMAP_DATA.filter(r => r.status === 'ACTIVE' || r.status === 'LIVE').length.toString()} />
                                <SidebarStat label="Upcoming" value={ROADMAP_DATA.filter(r => r.status === 'UPCOMING').length.toString()} />
                            </div>

                            {/* VERSION LOGS */}
                            <div className="p-2 border-b border-zinc-300 bg-zinc-50 flex-1 overflow-hidden flex flex-col">
                                <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-200 mb-3 shrink-0">
                                    <Layers size={10} className="text-zinc-600" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Recent Tags</span>
                                </div>
                                <div className="flex flex-wrap gap-1 overflow-y-auto scrollbar-hide content-start">
                                    {['v4.0.1', 'v4.0.0', 'v3.9.5', 'v3.9.2'].map(tag => (
                                        <div key={tag} className="flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-0.5 cursor-pointer hover:border-zinc-400 transition-colors">
                                            <span className="text-[9px] font-mono font-black text-zinc-700 uppercase">{tag}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* NETWORK LINKS */}
                            <div className="bg-white shrink-0">
                                <div className="flex items-center gap-1.5 p-2 border-b border-zinc-300 bg-zinc-800">
                                    <Globe size={10} className="text-zinc-300" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-300">Resources</span>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                    <SocialLink icon={<Github size={10} />} label="Repository" value="github.com/noda" />
                                    <SocialLink icon={<Terminal size={10} />} label="API Docs" value="docs.noda.dev" />
                                    <SocialLink icon={<Info size={10} />} label="Changelog" value="noda.dev/changes" />
                                </div>
                            </div>

                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---
const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "COMPLETED":
            return (
                <div className="flex items-center gap-1.5 text-zinc-500 ">
                    <CheckCircle2 size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Done</span>
                </div>
            );
        case "LIVE":
            return (
                <div className="flex items-center gap-1.5 text-emerald-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Live</span>
                </div>
            );
        case "ACTIVE":
            return (
                <div className="flex items-center gap-1.5 text-orange-500">
                    <Circle size={10} className="animate-[spin_4s_linear_infinite]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Active</span>
                </div>
            );
        case "UPCOMING":
            return (
                <div className="flex items-center gap-1.5 text-zinc-400 ">
                    <CircleDashed size={12} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Upcoming</span>
                </div>
            );
        default:
            return null;
    }
};

const SidebarStat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">{label}</span>
        <span className="text-[9px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
);

const SocialLink = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col group cursor-pointer p-2 hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-500 mb-0.5 group-hover:text-orange-600 transition-colors">
            {icon}
            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[9px] font-bold text-zinc-900 truncate w-full pl-4">{value}</span>
    </div>
);

export default RoadmapProtocol;