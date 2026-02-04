
import {
    ArrowLeft, DollarSign, MapPin, Briefcase, Timer,
    ShieldCheck, ArrowUpRight, Bookmark, Share2
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const JobDetail = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            {/* OUTER FRAME: Matches Communities [max-w-4xl mx-auto px-6 gap-4] */}
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                {/* THE SCHEMATIC MAIN: Single border-x container */}
                <main className="flex flex-1 border-x border-zinc-300 h-full overflow-hidden bg-white pt-13">

                    {/* LEFT PANE: WIDE CONTENT [flex-[2]] */}
                    <div className="flex-[3] flex flex-col border-r border-zinc-300 h-full relative">

                        {/* NAVIGATION HEADER */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2 group">
                                <ArrowLeft size={12} />
                                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-4 flex items-center">
                                <span className="text-xs font-mono font-black text-zinc-400 uppercase tracking-tighter">NODE: JOB_0x7F4</span>
                            </div>
                        </div>

                        {/* SPECIFICATION AREA */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <div className="p-4">
                                <h1 className="text-3xl font-black uppercase tracking-tighter leading-none mb-3">
                                    Lead Systems Architect
                                </h1>
                                <div className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-widest text-zinc-400 mb-6">
                                    <span className="text-zinc-900">Rust Foundation</span>
                                    <span className="opacity-30">•</span>
                                    <span className='text-zinc-500'>San Francisco, CA</span>
                                </div>

                                {/* FULL-WIDTH INTELLIGENCE BAR */}
                                <div className="flex w-full border-y border-zinc-200 bg-white h-10 mb-8 shrink-0 divide-x divide-zinc-200">
                                    <IntelligenceNode label="PAY" value="$180k - $240k" />
                                    <IntelligenceNode label="MODE" value="Hybrid" active />
                                    <IntelligenceNode label="TYPE" value="Full-time" />
                                    <IntelligenceNode label="VLY" value="~24H" protocol />
                                </div>

                                <section className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-xs font-mono font-semibold text-zinc-900 uppercase tracking-[0.2em]">Specification</h4>
                                        <div className="h-[1px] flex-1 bg-zinc-300"></div>
                                    </div>
                                    <p className="text-xs text-zinc-600 leading-relaxed tracking-tight">
                                        We are seeking a Lead Systems Architect to oversee the development of memory-safe distributed protocols. You will be responsible for node synchronization logic and maintaining network velocity across decentralized clusters. High proficiency in Rust and low-level systems design is mandatory. This role requires direct management of three senior engineers and weekly reporting to the Infrastructure Board.
                                    </p>
                                </section>
                            </div>
                        </div>

                        {/* SQUARED DEPLOY (ZERO ROUNDING) */}
                        <button className="w-full bg-zinc-900 h-14 border-t border-zinc-800 flex items-center justify-center gap-4 hover:bg-black transition-all group shrink-0">
                            <span className="text-xs font-semibold text-white uppercase tracking-[0.2em]">Deploy Application</span>
                            <ArrowUpRight className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                        </button>
                    </div>

                    {/* RIGHT PANE: COMPRESSED SIDEBAR [flex-1] */}
                    <aside className="flex-1 flex flex-col h-full bg-white overflow-hidden min-w-[200px]">

                        {/* RECRUITER / CONTROLLER NODE */}
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50/50">
                            <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Node Controller</h2>
                        </div>
                        <div className="p-3 border-b border-zinc-300">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center shrink-0">
                                    <span className="text-white font-mono font-black text-sm">MV</span>
                                </div>
                                <div className="flex flex-col overflow-hidden justify-center">
                                    <h3 className="text-[11px] font-bold uppercase text-zinc-900 truncate">Marcus Vane</h3>
                                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tighter mt-0.5">Talent Lead</span>
                                </div>
                            </div>

                            {/* MESSAGE BUTTON PROTOCOL */}
                            <button className="w-full h-8 bg-white border border-zinc-300 flex items-center justify-center gap-2 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all group">

                                <span className="text-[11px] font-mono font-semibold uppercase ">Message Controller</span>
                            </button>
                        </div>

                        {/* COMPANY ANALYTICS */}
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50/50">
                            <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Company Intel</h2>
                        </div>
                        <div className="p-3 space-y-3 flex-1">
                            <IntelligenceMetric label="Rating" value="4.8/5.0" />
                            <IntelligenceMetric label="Velocity" value="High" color="text-emerald-500" />
                            <IntelligenceMetric label="Nodes" value="2.4k Eng" />
                        </div>

                        {/* UTILITY FOOTER */}
                        <div className="grid grid-cols-2 divide-x divide-zinc-300 border-t border-zinc-300 h-14 shrink-0">
                            <button className="flex flex-col items-center justify-center hover:bg-zinc-200 transition-colors">
                                <Bookmark size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono font-black mt-1 uppercase">Save</span>
                            </button>
                            <button className="flex flex-col items-center justify-center hover:bg-zinc-200 transition-colors">
                                <Share2 size={16} className="text-zinc-500" />
                                <span className="text-[10px] font-mono font-black mt-1 uppercase">Share</span>
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

const IntelligenceNode = ({ label, value, active, protocol }: any) => (
    <div className={cn(
        "flex-1 flex items-center px-4 gap-2 transition-colors",
        active && "bg-zinc-50/50"
    )}>
        {/* Monospace Label */}
        <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-tighter shrink-0">
            {label}
        </span>

        {/* Thin Divider Dot */}
        <span className="w-1 h-1 rounded-full bg-zinc-100 shrink-0" />

        {/* High-Density Value */}
        <div className="flex items-center gap-1 min-w-0">
            <span className={cn(
                "text-[10px] font-bold uppercase tracking-tight truncate",
                active ? "text-blue-600" : "text-zinc-900"
            )}>
                {value}
            </span>
            {protocol && <ShieldCheck size={10} className="text-emerald-500 shrink-0" />}
        </div>
    </div>
);

const IntelligenceMetric = ({ label, value, color }: any) => (
    <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-tight">{label}</span>
        <span className={cn("text-[11px] font-bold uppercase tracking-tighter", color || "text-zinc-900")}>{value}</span>
    </div>
);

export default JobDetail;