import React, { useState, useEffect } from 'react';
import {
    ChevronRight, Terminal, Box, Wrench, Globe, Users,
    Activity, Clock, Search, ShieldCheck, Github, Twitter,
    ArrowUpRight, Building2, CalendarDays, KeyRound, Network, Cpu
} from 'lucide-react';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const TABS = [
    {
        id: "tracker",
        title: "Node_Tracker",
        desc: "Monitor pipeline progression with algorithmic match scoring.",
        icon: <Activity size={12} />
    },
    {
        id: "deadline",
        title: "Velocity_Limit",
        desc: "Strict 14-day lifecycles enforce rapid pipeline execution.",
        icon: <Clock size={12} />
    },
    {
        id: "tags",
        title: "Parametric_Search",
        desc: "Filter system nodes using precise technical stack tags.",
        icon: <Search size={12} />
    },
    {
        id: "profile",
        title: "Entity_Config",
        desc: "Customize your public identity and network telemetry.",
        icon: <KeyRound size={12} />
    }
];

const STATS = [
    { label: "Active_Nodes", value: "14,204" },
    { label: "Verified_Entities", value: "892" },
    { label: "Uptime_Telemetry", value: "99.99%" }
];

const CHANGELOG = [
    { version: "v2.1.0", title: "Auth_Gateway_Refactor", date: "TODAY" },
    { version: "v2.0.5", title: "14_Day_Lifecycle_Strict", date: "3D AGO" },
    { version: "v2.0.1", title: "Node_Tracker_Grid", date: "1W AGO" },
    { version: "v1.9.8", title: "Telemetry_API_v2", date: "2W AGO" },
];

const LOGOS = ["Vercel", "Anthropic", "Supabase", "OpenAI", "Cloudflare", "AWS_Edge"];

// --- SUB-COMPONENTS ---
const SectionHeader = ({ title, id }: { title: string, id?: string }) => (
    <div id={id} className="p-3 px-6 border-y border-zinc-300 bg-zinc-100 flex items-center shrink-0 scroll-mt-14">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            {title}
        </span>
    </div>
);

export default function LandingPage() {
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
        <div className="min-h-screen bg-zinc-50 flex justify-center font-sans selection:bg-zinc-300 scroll-smooth">

            {/* MASTER HARDWARE BOUNDING BOX */}
            <div className="w-full max-w-4xl border border-zinc-300 bg-white flex flex-col  overflow-hidden mb-12">

                {/* --- 0. CUSTOM NAVBAR --- */}
                <nav className="flex items-center justify-between border-b border-zinc-300 bg-white shrink-0 sticky top-0 z-50">
                    <div className="flex items-center h-full">
                        <img src="/noda2.png" alt="" className='w-8 h-8' />

                        {/* Center Anchor Links */}
                        <a href="#features" className="text-[10px] p-2 h-full flex items-center border-x border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Features</a>
                        <a href="#telemetry" className="text-[10px] p-2 h-full flex items-center border-r border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Telemetry</a>
                        <a href="#changelog" className="text-[10px] p-2 h-full flex items-center border-r border-zinc-300 font-mono font-bold text-zinc-500 hover:text-orange-600 uppercase tracking-[0.2em] transition-colors outline-none">Changelog</a>

                    </div>

                    {/* Right Auth Links */}
                    <div className="flex items-center h-full">
                        <a href="/login" className="text-[10px] p-2 px-4 border-l border-zinc-300 h-full flex items-center font-mono font-black text-zinc-600 hover:text-orange-600 uppercase tracking-widest transition-colors outline-none cursor-pointer">
                            Login
                        </a>
                        <a href="/signup" className="h-full flex items-center px-4 bg-orange-500 text-white items-center justify-center text-[10px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 transition-colors outline-none cursor-pointer">
                            SignUp
                        </a>
                    </div>
                </nav>

                {/* --- 1. HERO SECTION --- */}
                <div className="border-b border-zinc-300 bg-zinc-50 relative overflow-hidden flex flex-col items-center justify-start ">

                        {/* --- LOOPED VIDEO PREVIEW --- */}
                        <div className="w-full  bg-white relative flex flex-col">

                            {/* Video Terminal Bar */}
                            <div className="flex items-center justify-between border-b border-zinc-300 shrink-0">
                                <div className="flex items-center gap-2 p-2">
                                    <Activity size={12} className="text-orange-500 animate-pulse" />
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] mt-0.5">
                                        sys_preview_feed.mp4
                                    </span>
                                </div>
                                <div className="flex gap-1.5 px-2">
                                    <div className="w-1.5 h-1.5 bg-orange-400" />
                                    <div className="w-1.5 h-1.5 bg-orange-500" />
                                    <div className="w-1.5 h-1.5 bg-orange-600" />
                                </div>
                            </div>

                            {/* Video Container */}
                            <div className="relative bg-zinc-800 aspect-video w-full overflow-hidden border border-zinc-300">
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    // Replace src with your actual video path (e.g., "/noda-demo.mp4")
                                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                    className="object-cover w-full h-full opacity-90 grayscale contrast-125"
                                />

                                {/* CSS Scanline Overlay for the Terminal Vibe */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-10"
                                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}
                                />

                                {/* Live Recording Badge */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-zinc-900/80 px-2 py-1 border border-zinc-700/50 backdrop-blur-sm">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest mt-0.5">Live_Feed</span>
                                </div>
                            </div>

                    </div>
                </div>

                {/* --- 2. SPONSOR LOGOS --- */}
                <div className="grid grid-cols-2 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-zinc-300 border-t border-zinc-300 bg-white">
                    {LOGOS.map((logo, i) => (
                        <div key={i} className="h-16 flex items-center justify-center group cursor-default hover:bg-zinc-50 transition-colors">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-900 transition-colors">
                                {logo}
                            </span>
                        </div>
                    ))}
                </div>



                {/* --- 4. INTERACTIVE COMPONENT DECK --- */}
                <SectionHeader title="Core_Protocol_Features" id="features" />
                <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-zinc-300 bg-white">

                    {/* Left: Tab List (Col Span 4) */}
                    <div className="md:col-span-4 flex flex-col divide-y divide-zinc-300">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "p-6 flex flex-col text-left transition-all cursor-pointer outline-none group border-l-[3px]",
                                    activeTab === tab.id
                                        ? "bg-zinc-50 border-l-orange-500"
                                        : "bg-transparent border-l-transparent hover:bg-zinc-50/80"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className={cn("transition-colors", activeTab === tab.id ? "text-orange-600" : "text-zinc-400 group-hover:text-zinc-900")}>
                                        {tab.icon}
                                    </div>
                                    <span className={cn(
                                        "text-[11px] font-black uppercase tracking-widest leading-none mt-0.5",
                                        activeTab === tab.id ? "text-zinc-900" : "text-zinc-500 group-hover:text-zinc-900"
                                    )}>
                                        {tab.title}
                                    </span>
                                </div>
                                <span className="text-[10px] font-medium text-zinc-500 leading-relaxed">
                                    {tab.desc}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Component Render (Col Span 8) */}
                    <div className="md:col-span-8 bg-zinc-200 flex flex-col relative overflow-hidden min-h-[350px]">
                        <div className="h-10 border-b border-zinc-300 flex items-center justify-between px-4 bg-white shrink-0 z-10 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Terminal size={12} className="text-orange-500" />
                                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mt-0.5">
                                    render_node.tsx
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-zinc-300" />
                                <div className="w-1.5 h-1.5 bg-zinc-300" />
                            </div>
                        </div>

                        {/* Interactive Render Area */}
                        <div className="flex-1 flex items-center justify-center p-6 md:p-10 relative">
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                            <div className="relative z-10 w-full max-w-sm animate-in fade-in zoom-in-95 duration-300" key={activeTab}>

                                {activeTab === 'tracker' && (
                                    <div className="bg-white border border-zinc-300 p-4 shadow-xl flex flex-col gap-4">
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-orange-600 mb-1">Applied 2D AGO</span>
                                                <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-tight">Lead Systems Architect</h3>
                                                <p className="text-[10px] text-zinc-500 font-medium uppercase mt-0.5">OpenAI</p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Match</span>
                                                <span className="text-xl font-black text-emerald-600 leading-none">96%</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-zinc-100 h-1 mt-2">
                                            <div className="bg-emerald-500 h-full w-[96%]" />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'deadline' && (
                                    <div className="bg-white border border-zinc-300 flex flex-col shadow-xl">
                                        <div className="p-3 bg-zinc-900 flex justify-between items-center text-white">
                                            <span className="text-[9px] font-mono font-black uppercase tracking-widest">Lifecycle_TTL</span>
                                            <Clock size={12} className="text-orange-500 animate-pulse" />
                                        </div>
                                        <div className="p-6 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-mono font-black text-zinc-900 tracking-[0.2em] leading-none mb-2">
                                                {formatTime(countdown)}
                                            </span>
                                            <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">Action Required</span>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'tags' && (
                                    <div className="bg-white border border-zinc-300 p-4 shadow-xl flex flex-col gap-4">
                                        <div className="relative flex items-center h-10 border border-zinc-300 bg-zinc-50 px-3">
                                            <Search size={14} className="text-zinc-400 mr-2" />
                                            <input disabled placeholder="SEARCH NODES..." className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent" />
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["React", "Rust", "Distributed_Systems", "GraphQL", "Web3"].map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-white border border-zinc-300 text-[9px] font-mono font-black text-zinc-700 uppercase tracking-widest shadow-sm">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'profile' && (
                                    <div className="bg-white border border-zinc-300 flex flex-col shadow-xl divide-y divide-zinc-200">
                                        <div className="p-3 flex flex-col gap-1.5 focus-within:bg-zinc-50">
                                            <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Display_Name</label>
                                            <div className="flex items-center">
                                                <Users size={12} className="text-zinc-400 mr-2" />
                                                <span className="text-[11px] font-bold text-zinc-900 uppercase">System Admin</span>
                                            </div>
                                        </div>
                                        <div className="p-3 flex flex-col gap-1.5 focus-within:bg-zinc-50">
                                            <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">System_Handle</label>
                                            <div className="flex items-center">
                                                <span className="text-[11px] font-black text-orange-500 mr-1">@</span>
                                                <span className="text-[11px] font-bold text-zinc-900 uppercase">root_deployer</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- 5. SECONDARY FEATURE GRID --- */}
                <SectionHeader title="Secondary_Protocols" />
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-300 bg-zinc-50">
                    <div className="p-6 flex flex-col gap-3 hover:bg-white transition-colors">
                        <Building2 size={16} className="text-zinc-900" />
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Entity Verification</h3>
                        <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Companies are strictly verified via DNS and MX records before entering the network.</p>
                    </div>
                    <div className="p-6 flex flex-col gap-3 hover:bg-white transition-colors">
                        <CalendarDays size={16} className="text-zinc-900" />
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Scheduling Sync</h3>
                        <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Directly align interview timeslots with internal calendar nodes to prevent latency.</p>
                    </div>
                    <div className="p-6 flex flex-col gap-3 hover:bg-white transition-colors">
                        <ShieldCheck size={16} className="text-zinc-900" />
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900">Hardware 2FA</h3>
                        <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">Military-grade protection. Connect authenticator apps to execute critical node deployments.</p>
                    </div>
                </div>

                {/* --- 3. STATS STRIP --- */}
                <SectionHeader title="Statictics" />
                <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-700 bg-zinc-900 text-white">
                    {STATS.map((stat, i) => (
                        <div key={i} className="p-6 flex flex-col items-center text-center justify-center hover:bg-zinc-800 transition-colors">
                            <span className="text-2xl font-black tracking-tighter text-orange-500 leading-none mb-2">{stat.value}</span>
                            <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-400">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* --- 6. FOOTER: CHANGELOG & SOCIALS --- */}
                <SectionHeader title="Changelog_&_Network" id="changelog" />
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-300 bg-white">

                    {/* Changelog */}
                    <div className="md:col-span-2 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-300 h-full">
                            {CHANGELOG.map((log, i) => (
                                <a key={i} href="#" className={cn("p-5 flex flex-col gap-1.5 hover:bg-zinc-50 transition-colors group outline-none", i > 1 && "border-t border-zinc-300")}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-widest group-hover:text-orange-600 transition-colors">{log.version}</span>
                                        <ArrowUpRight size={12} className="text-zinc-300 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-tight">{log.title}</span>
                                    <span className="text-[8px] font-mono font-bold text-zinc-400 tracking-[0.2em] mt-auto pt-4">{log.date}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Socials & Legal */}
                    <div className="flex flex-col bg-zinc-900 text-white">
                        <div className="flex flex-col divide-y divide-zinc-800 flex-1">
                            <a href="#" className="p-5 flex items-center gap-3 hover:bg-zinc-800 transition-colors group outline-none">
                                <Twitter size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">Twitter / X</span>
                            </a>
                            <a href="#" className="p-5 flex items-center gap-3 hover:bg-zinc-800 transition-colors group outline-none">
                                <Github size={14} className="text-zinc-400 group-hover:text-white transition-colors" />
                                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">GitHub_Repo</span>
                            </a>
                            <div className="mt-auto p-5 flex flex-col gap-2 bg-zinc-950">
                                <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">© 2026 Noda Network</span>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="text-[8px] font-mono font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest">Legal</a>
                                    <a href="#" className="text-[8px] font-mono font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-widest">Privacy</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}