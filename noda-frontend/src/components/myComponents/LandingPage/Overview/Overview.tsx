
import { Twitter, ArrowUpRight, Mail, Youtube, Command } from 'lucide-react';
import Navbar from './Navbar';
import HeroVideo from './HeroVideo';
import InteractiveTabs from './InteractiveTabs';
import SecondaryFeatures from './SecondaryFeatures';



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
                <SecondaryFeatures />





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