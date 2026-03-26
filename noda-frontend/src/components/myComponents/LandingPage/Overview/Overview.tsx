import { useState, useEffect } from 'react';
import {
    Terminal, Users,
    Activity, Clock, Search, ShieldCheck, Twitter,
    ArrowUpRight, CalendarDays, Lock,
    ShieldAlert,
    BotOff,
    PlaySquare,
    PanelRight,
    EyeOff,
    Database,
    MessageSquare,
    Play,
    Mail,
    Youtube,
    Command
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from './Navbar';
import HeroVideo from './HeroVideo';
import InteractiveTabs from './InteractiveTabs';



const CHANGELOG = [
    { version: "v2.1.0", title: "Auth_Gateway_Refactor", date: "TODAY" },
    { version: "v2.0.5", title: "14_Day_Lifecycle_Strict", date: "3D AGO" },
    { version: "v2.0.1", title: "Node_Tracker_Grid", date: "1W AGO" },
    { version: "v1.9.8", title: "Telemetry_API_v2", date: "2W AGO" },
];


// --- SUB-COMPONENTS ---
const SectionHeader = ({ title, id }: { title: string, id?: string }) => (
    <div id={id} className="p-2 border-y border-zinc-300 bg-zinc-100 flex items-center shrink-0 scroll-mt-14">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-orange-500 inline-block shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            {title}
        </span>
    </div>
);

export default function LandingPage() {
   
   


    

   

    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center font-sans selection:bg-zinc-300 scroll-smooth">

            {/* MASTER HARDWARE BOUNDING BOX */}
            <div className="w-full max-w-4xl border-x border-zinc-300 bg-white flex flex-col  overflow-hidden">

                {/* --- 0. CUSTOM NAVBAR --- */}
                <Navbar />


                <HeroVideo />

                <SectionHeader title="Core Features" id="features" />
                <InteractiveTabs />


                {/* --- 5. SECONDARY FEATURE GRID --- */}
                <SectionHeader title="Secondary Features" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                    {/* Feature 1: Scheduling Sync */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="grid grid-cols-5 gap-1 w-full max-w-[160px] opacity-80 group-hover:scale-105 transition-transform duration-300">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className={cn("h-4 border border-zinc-400", i === 7 || i === 8 ? "bg-orange-500 border-orange-500" : "bg-white")} />
                                ))}
                            </div>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-emerald-500" />
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Synced</span>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Calendar</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Directly align interview timeslots with internal calendar nodes to prevent scheduling latency.</p>
                        </div>
                    </div>

                    {/* Feature 2: Multi-Source Ingestion */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="flex flex-col gap-2 w-full max-w-[160px] group-hover:scale-105 transition-transform duration-300">
                                <div className="h-5 border border-zinc-300 bg-white flex items-center px-2 "><span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">SRC LINKEDIN</span></div>
                                <div className="h-5 border border-zinc-300 bg-white flex items-center px-2 ml-2"><span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">SRC GREENHOUSE</span></div>
                                <div className="h-5 border border-orange-300 bg-orange-50 flex items-center px-2  ml-4"><span className="text-[9px] font-mono font-bold text-orange-600 uppercase">SYS AGGREGATED</span></div>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Database size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Data Aggregation</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Automatically ingest and centralize job listings from multiple external ATS and board endpoints.</p>
                        </div>
                    </div>

                    {/* Feature 3: Node Feedback */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="border border-zinc-300 bg-white p-3 shadow-sm w-full max-w-[150px] flex flex-col gap-2 group-hover:scale-105 transition-transform duration-300">
                                {/* Header: Identity Toggle */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-4 h-4 bg-zinc-900 flex items-center justify-center">
                                            <EyeOff size={10} className="text-white" />
                                        </div>
                                        <span className="text-[8px] font-mono font-black text-zinc-900 uppercase tracking-widest">ANONYMUS</span>
                                    </div>
                                </div>
                                {/* Comment Lines */}
                                <div className="space-y-1">
                                    <div className="w-full h-1.5 bg-zinc-200" />
                                    <div className="w-4/5 h-1.5 bg-zinc-200" />
                                </div>
                                {/* Metric: Response Time */}
                                <div className=" flex items-center justify-between border-t border-zinc-300 pt-2">
                                    <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Response Time</span>
                                    <span className="text-[7px] font-black text-orange-500 uppercase tracking-widest">24 HRS</span>
                                </div>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <MessageSquare size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Company Reviews</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Broadcast public or cloaked feedback on entity operations and optionally log recruiter response latencies.</p>
                        </div>
                    </div>

                    {/* Feature 4: Anonymous Mode */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="border border-zinc-300 bg-white p-2 shadow-sm w-full max-w-[140px] flex items-center justify-between group-hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-zinc-200 flex items-center justify-center"><EyeOff size={10} className="text-zinc-500" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-zinc-900 uppercase">ANONYMUS</span>
                                        <span className="text-[8px] font-mono text-zinc-600">@anonymus</span>
                                    </div>
                                </div>
                                <div className="w-6 h-3 bg-zinc-800 rounded-full relative">
                                    <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-orange-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <EyeOff size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Anonymus Mode</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Browse the network and deploy nodes securely without broadcasting your primary identity token.</p>
                        </div>
                    </div>

                    {/* Feature 5: Quick Sidebar */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="w-full max-w-[160px] h-20 border border-zinc-300 bg-white shadow-sm flex overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                <div className="flex-1 bg-zinc-100 border-r border-zinc-200 p-2 flex flex-col gap-1">
                                    <div className="w-full h-1.5 bg-zinc-200" />
                                    <div className="w-2/3 h-1.5 bg-zinc-200" />
                                </div>
                                <div className="w-16 bg-white p-2 flex flex-col gap-1 shadow-[-4px_0_12px_rgba(0,0,0,0.05)] z-10">
                                    <div className="w-4 h-4 bg-orange-200 border border-orange-300 mb-1" />
                                    <div className="w-full h-1 bg-zinc-300" />
                                    <div className="w-full h-1 bg-zinc-300" />
                                    <div className="w-1/2 h-1 bg-zinc-300" />
                                </div>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <PanelRight size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Quick Inspect</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Rapidly parse candidate telemetry via a sliding overlay terminal without losing your primary context.</p>
                        </div>
                    </div>

                    {/* Feature 6: Company Intro Video */}
                    <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                        {/* Visual Mock */}
                        <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                            <div className="w-full max-w-[140px] aspect-video border border-zinc-300 bg-zinc-800 relative flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                                {/* Scanlines */}
                                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)' }} />
                                <Play size={16} className="text-orange-500 z-10" />
                                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                                    <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest">Intro</span>
                                </div>
                            </div>
                        </div>
                        {/* Copy */}
                        <div className="p-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <PlaySquare size={14} className="text-zinc-900" />
                                <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Company Broadcast</h3>
                            </div>
                            <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Integrate high-fidelity video streams allowing companies to showcase internal culture and tech stacks.</p>
                        </div>
                    </div>

                </div>





                {/* --- 6. FOOTER: DIAGNOSTICS & SYSTEM LOGS --- */}
                <SectionHeader title="System Logs & Comms" id="changelog" />
                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-300 bg-white">

                    {/* Left: Terminal Changelog (Col Span 8) */}
                    <div className="lg:col-span-8 flex flex-col bg-zinc-800 text-white relative overflow-hidden">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between p-2 border-b border-zinc-800 bg-zinc-900 shrink-0">
                            <div className="flex items-center gap-2">
                                <Command size={12} className="text-zinc-400" />
                                <span className="text-[9px] font-mono font-black text-zinc-300 uppercase tracking-widest mt-0.5">
                                    sys_changelog.log
                                </span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-zinc-700" />
                                <div className="w-1.5 h-1.5 bg-zinc-700" />
                                <div className="w-1.5 h-1.5 bg-zinc-700" />
                            </div>
                        </div>

                        {/* Terminal Output */}
                        <div className="flex-1 p-2 font-mono text-[10px] sm:text-xs flex flex-col gap-4 overflow-y-auto">
                            {CHANGELOG.map((log, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-2 group cursor-default">
                                    <div className="flex items-center gap-2 shrink-0 sm:w-36">
                                        <span className="text-zinc-200 font-semibold">{log.date}</span>
                                        <span className="text-orange-500">[{log.version}]</span>
                                    </div>
                                    <span className="text-zinc-300 group-hover:text-white transition-colors flex items-center gap-2">
                                        <ArrowUpRight size={12} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                        Executed protocol: {log.title}
                                    </span>
                                </div>
                            ))}

                            {/* Blinking Cursor */}
                            <div className="flex items-center gap-2 mt-2 text-zinc-400">
                                <span>root@noda-sys:~#</span>
                                <div className="w-2 h-3 bg-orange-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Comms & Socials (Col Span 4) */}
                    <div className="lg:col-span-4 flex flex-col bg-white">

                        {/* Comms Header */}
                        <div className=" px-2 pb-2 border-b border-zinc-300 ">
                            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest">Links</span>
                        </div>

                        {/* Links List */}
                        <div className="flex flex-col divide-y divide-zinc-200 flex-1">
                            <a href="/contact" className="p-4 flex items-center gap-3 hover:bg-zinc-50 transition-colors group outline-none">
                                <Mail size={14} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-zinc-600 group-hover:text-zinc-900 transition-colors">Contact</span>
                            </a>
                            <a href="#" className="p-4  flex items-center gap-3 hover:bg-zinc-50 transition-colors group outline-none">
                                <Youtube size={14} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-zinc-600 group-hover:text-zinc-900 transition-colors">YouTube</span>
                            </a>
                            <a href="#" className="p-4  flex items-center gap-3 hover:bg-zinc-50 transition-colors group outline-none">
                                <Twitter size={14} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                <span className="text-[10px] font-mono font-black tracking-widest uppercase text-zinc-600 group-hover:text-zinc-900 transition-colors">Twitter / X</span>
                            </a>

                        </div>

                        {/* Legal */}
                        <div className="mt-auto p-4 flex flex-col gap-3 border-t border-zinc-300">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-mono font-bold text-zinc-900 uppercase ">© 2026 Noda Network</span>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="text-[9px] font-mono font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-widest">Legal</a>
                                    <a href="#" className="text-[9px] font-mono font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-widest">Privacy</a>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}