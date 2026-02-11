import React, { useState } from 'react';
import { BadgeCheck, GraduationCap, Heart, MessageSquare, Eye, MoreHorizontal } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import GithubGrid from './GithubGrid';
import { TimelineEntry, IntelligenceMetric, PostStat } from './ProfileComponents';

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'About' | 'Posts'>('About');

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white pt-13 mb-24 min-h-screen">
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        {/* IDENTITY BANNER */}
                        <section className="relative shrink-0">
                            <div className="h-32 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" className="w-full h-full object-cover opacity-20 grayscale" alt="Banner" />
                            </div>
                            <div className="px-3 relative pb-6 border-b border-zinc-300">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <div className="w-20 h-20 bg-zinc-900 border-2 border-white flex items-center justify-center shrink-0 shadow-sm">
                                        <span className="text-white font-mono font-black text-2xl uppercase">JD</span>
                                    </div>
                                    <button className="h-7 px-4 border border-zinc-300 text-[9px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all cursor-pointer">Connect</button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg font-black uppercase tracking-tighter">John Doe</h1>
                                    <BadgeCheck size={16} className="text-emerald-600" />
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Lead Engineer @ Noda Labs</p>
                            </div>
                        </section>

                        <GithubGrid />

                        {/* TABS */}
                        <div className="flex w-full border-b border-zinc-300 bg-white sticky top-13 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            {(['About', 'Posts'] as const).map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)} 
                                    className={cn(
                                        "flex-1 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-colors border-none cursor-pointer", 
                                        activeTab === tab ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 hover:bg-zinc-50"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className={cn("flex-1", activeTab === 'Posts' ? "p-0" : "p-6")}>
                            {activeTab === 'About' ? <AboutSection /> : <PostsSection />}
                        </div>
                    </div>

                    <StatsSidebar />
                </main>
            </div>
        </div>
    );
};

// --- INTERNAL TAB SECTIONS ---

const AboutSection: React.FC = () => (
    <div className="space-y-12 animate-in fade-in duration-300">
        <section className="space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-[0.2em]">01. Description</h4>
            <p className="text-[11px] font-semibold text-zinc-600 uppercase leading-relaxed tracking-tight">Lead systems architect specializing in memory-safe distributed protocols. Scaling decentralized node clusters at Noda Labs.</p>
        </section>

        <section className="space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-[0.2em]">02. Experience</h4>
            <div className="space-y-3">
                <TimelineEntry role="Lead Engineer" org="Noda Labs" date="2024 - PRES" />
                <TimelineEntry role="Senior Dev" org="Vercel" date="2021 - 2024" />
            </div>
        </section>

        <section className="space-y-4">
            <h4 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-[0.2em]">03. Education</h4>
            <div className="flex items-center gap-4">
                <GraduationCap size={16} className="text-zinc-500" />
                <span className="text-[11px] font-bold uppercase">MIT - MS Computer Science</span>
            </div>
        </section>
    </div>
);

const PostsSection: React.FC = () => (
    <div className="divide-y divide-zinc-300 animate-in fade-in duration-300">
        {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="p-3 hover:bg-zinc-50/50 transition-colors cursor-pointer border-b border-zinc-300">
                <div className="flex items-center justify-between mb-2 text-[9px] font-mono font-black text-zinc-500 uppercase">
                    <span>Node_Signal_0x{i}</span>
                    <MoreHorizontal size={12} />
                </div>
                <h5 className="text-[11px] font-bold uppercase mb-1 text-zinc-900">Distributed Latency Benchmarks for Rust Clusters</h5>
                <p className="text-xs text-zinc-500 font-semibold tracking-tight line-clamp-2 mb-3">Initial data suggests zero-copy serialization outperforms traditional methods by 14%...</p>
                <div className="flex items-center gap-6 border-t border-zinc-300 pt-2 px-0.5">
                    <PostStat icon={<Heart size={12} />} count="42" />
                    <PostStat icon={<MessageSquare size={12} />} count="12" />
                    <PostStat icon={<Eye size={12} />} count="1.2k" />
                </div>
            </div>
        ))}
    </div>
);

const StatsSidebar: React.FC = () => (
    <aside className="w-40 shrink-0 relative bg-zinc-50/10">
        <div className="sticky top-13 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
            <div className="p-3 bg-zinc-50/50">
                <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Node Status</h2>
            </div>
            <div className="p-3 bg-white">
                <div className="flex items-center gap-1 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span className="text-[9px] font-black text-emerald-600 uppercase">Looking</span>
                </div>
                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Avail: Immediate</span>
            </div>

            <div className="p-3 bg-zinc-50/50">
                <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Brief</h2>
            </div>
            <div className="p-3 space-y-3 bg-white">
                <IntelligenceMetric label="Total Exp" value="6.5 Years" />
                <IntelligenceMetric label="Core Stack" value="Rust / TS" />
            </div>

            <div className="p-3 bg-zinc-50/50">
                <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Core Matrix</h2>
            </div>
            <div className="p-3 bg-white flex flex-wrap gap-1">
                {['Rust', 'Go', 'K8s', 'TS', 'eBPF'].map(skill => (
                    <span key={skill} className="px-1.5 py-0.5 border border-zinc-200 text-zinc-500 text-[10px] font-mono font-black uppercase">{skill}</span>
                ))}
            </div>
        </div>
    </aside>
);

export default UserProfile;