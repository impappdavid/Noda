import { useState } from 'react';
import {
    Github, Briefcase, CheckCircle2,
    GraduationCap, Award, MessageSquare, 
    Heart, Eye, Bookmark, MoreHorizontal
} from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('About');

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                {/* LEFT: NAV (w-24) */}
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-[52px] h-[calc(100vh-52px)] py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex overflow-hidden pt-13">
                    <div className="flex-1 flex flex-col border-r border-zinc-300 overflow-y-auto scrollbar-hide">
                        
                        {/* IDENTITY BANNER */}
                        <div className="relative shrink-0">
                            <div className="h-32 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" className="w-full h-full object-cover opacity-20 grayscale" alt="Banner" />
                            </div>
                            <div className="px-6 relative pb-6 border-b border-zinc-300">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <div className="w-20 h-20 bg-zinc-900 border-2 border-white flex items-center justify-center shrink-0">
                                        <span className="text-white font-mono font-black text-2xl uppercase">JD</span>
                                    </div>
                                    <button className="h-8 px-4 border border-zinc-300 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">Connect</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg font-black uppercase tracking-tighter">John Doe</h1>
                                    <CheckCircle2 size={14} className="text-blue-600" />
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Lead Engineer @ Noda Labs</p>
                            </div>
                        </div>

                        {/* GITHUB BOARD: W-FULL */}
                        <div className="p-4 border-b border-zinc-300 w-full bg-white shrink-0">
                            <h3 className="text-[8px] font-mono font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                                <Github size={12} /> Github.Activity_Grid
                            </h3>
                            <div className="flex gap-[2px] overflow-hidden justify-between bg-zinc-50/50 p-3 border border-zinc-100">
                                {Array.from({ length: 48 }).map((_, col) => (
                                    <div key={col} className="flex flex-col gap-[2px]">
                                        {Array.from({ length: 7 }).map((_, row) => {
                                            const intensity = Math.random();
                                            return <div key={row} className={cn("w-[7px] h-[7px] shrink-0", intensity > 0.85 ? "bg-emerald-600" : intensity > 0.6 ? "bg-emerald-400" : intensity > 0.3 ? "bg-emerald-200" : "bg-zinc-100")} />;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* TABS: CONSOLIDATED TO TWO */}
                        <div className="flex w-full border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            {['About', 'Posts'].map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-colors", activeTab === tab ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-50")}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT */}
                        <div className={cn("flex-1", activeTab === 'Posts' ? "p-0" : "p-6")}>
                            {activeTab === 'About' && (
                                <div className="space-y-12">
                                    {/* DESCRIPTION */}
                                    <section className="space-y-3">
                                        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-[0.2em]">01. Description</h4>
                                        <p className="text-[11px] font-bold text-zinc-500 uppercase leading-relaxed tracking-tight">Lead systems architect specializing in memory-safe distributed protocols. Scaling decentralized node clusters at Noda Labs. Focused on kernel-level optimization and high-velocity systems.</p>
                                    </section>

                                    {/* EXPERIENCE */}
                                    <section className="space-y-6">
                                        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-[0.2em]">02. Experience</h4>
                                        <div className="space-y-6">
                                            <TimelineEntry role="Lead Engineer" org="Noda Labs" date="2024 - PRES" />
                                            <TimelineEntry role="Senior Dev" org="Vercel" date="2021 - 2024" />
                                        </div>
                                    </section>

                                    {/* EDUCATION */}
                                    <section className="space-y-4">
                                        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-[0.2em]">03. Education</h4>
                                        <div className="flex items-center gap-4">
                                            <GraduationCap size={16} className="text-zinc-400" />
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black uppercase">MIT - MS Computer Science</span>
                                                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Class of 2021</span>
                                            </div>
                                        </div>
                                    </section>

                                    {/* SKILLS */}
                                    <section className="space-y-4">
                                        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-[0.2em]">04. Skills</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {['Rust', 'Distributed Systems', 'Go', 'K8s', 'TS', 'eBPF'].map(skill => (
                                                <span key={skill} className="px-2 py-1 bg-zinc-900 text-white text-[8px] font-mono font-black uppercase">{skill}</span>
                                            ))}
                                        </div>
                                    </section>

                                    {/* CERTIFICATES */}
                                    <section className="space-y-4">
                                        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 tracking-[0.2em]">05. Certificates</h4>
                                        <div className="flex items-center gap-4 p-3 border border-zinc-100">
                                            <Award size={16} className="text-zinc-400" />
                                            <span className="text-[10px] font-black uppercase tracking-tight">CKA: Certified Kubernetes Administrator</span>
                                        </div>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'Posts' && (
                                <div className="divide-y divide-zinc-200">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="p-6 hover:bg-zinc-50/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center justify-between mb-3 text-[8px] font-mono font-black text-zinc-300 uppercase">
                                                <span>Node_Signal_0x{i}</span>
                                                <MoreHorizontal size={12} />
                                            </div>
                                            {/* No Blue Hover on Text Color */}
                                            <h5 className="text-[11px] font-black uppercase mb-2 text-zinc-900 transition-colors">Distributed Latency Benchmarks for Rust Clusters</h5>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight line-clamp-2 mb-4">Initial data suggests zero-copy serialization outperforms traditional methods by 14%...</p>
                                            
                                            <div className="flex items-center gap-6 border-t border-zinc-100 pt-4">
                                                <PostStat icon={<Eye size={12} />} count="1.2k" />
                                                <PostStat icon={<Heart size={12} />} count="42" />
                                                <PostStat icon={<MessageSquare size={12} />} count="12" />
                                                <PostStat icon={<Bookmark size={12} />} count="8" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT: STATS SIDEBAR (w-40) */}
                    <aside className="w-40 flex flex-col h-full bg-zinc-50/10 shrink-0">
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50/50">
                            <h2 className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-500">Node Status</h2>
                        </div>
                        <div className="p-3 border-b border-zinc-300 bg-white">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                <span className="text-[9px] font-black text-emerald-600 uppercase">Looking</span>
                            </div>
                            <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Avail: Immediate</span>
                        </div>
                        <div className="p-3 border-b border-zinc-300 bg-zinc-50/50">
                            <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Brief</h2>
                        </div>
                        <div className="p-3 space-y-3 bg-white">
                            <IntelligenceMetric label="Total Exp" value="6.5 Years" />
                            <IntelligenceMetric label="Core Stack" value="Rust / TS" />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

// --- HELPERS ---
const PostStat = ({ icon, count }: any) => (
    <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors">
        {icon}
        <span className="text-[9px] font-mono font-black uppercase tracking-tighter">{count}</span>
    </button>
);

const TimelineEntry = ({ role, org, date }: any) => (
    <div className="flex gap-4">
        <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800"><Briefcase size={16} className="text-white" /></div>
        <div className="flex flex-col">
            <span className="text-[8px] font-mono font-black text-blue-600 uppercase mb-0.5">{date}</span>
            <h4 className="text-[11px] font-black uppercase tracking-tight">{role}</h4>
            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase">{org}</span>
        </div>
    </div>
);

const IntelligenceMetric = ({ label, value }: any) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tight">{label}</span>
        <span className="text-[9px] font-black uppercase text-zinc-900">{value}</span>
    </div>
);

export default UserProfile;