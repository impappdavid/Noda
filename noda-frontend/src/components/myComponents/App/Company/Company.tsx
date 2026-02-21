import React, { useState, useCallback } from 'react';
import { 
    Globe, Users, Zap, ShieldCheck, Play, Mail, 
    Clock, ExternalLink, MapPin, MoreHorizontal, 
    Heart, MessageSquare, Eye, Trash2
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// --- TYPES ---
type TabType = 'HOME' | 'POSTS' | 'JOBS' | 'TEAM';

const COMPANY_MOCK = {
    name: "OpenAI",
    avatar: "O",
    location: "San Francisco, CA",
    followers: "842k",
    employees: "1,200+",
    website: "openai.com",
    description: "Standardizing the deployment of safe Artificial General Intelligence. Core architecture involves high-scale distributed clusters and recursive neural logic.",
};

const CompanyPage: React.FC = () => {
    // 1. ENSURE STATE TYPE MATCHES NAV BUTTONS
    const [activeTab, setActiveTab] = useState<TabType>('HOME');

    const handleTabChange = useCallback((tab: TabType) => {
        setActiveTab(tab);
    }, []);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white pt-12.5 mb-24 min-h-screen">
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        
                        {/* HERO BANNER */}
                        <section className="relative shrink-0">
                            <div className="h-44 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                                <img 
                                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200" 
                                    className="w-full h-full object-cover opacity-40 grayscale" 
                                    alt="Banner" 
                                />
                            </div>

                            <div className="px-4 relative pb-4 border-b border-zinc-300">
                                <div className="flex items-end justify-between -mt-12 mb-4">
                                    <div className="w-24 h-24 bg-zinc-900 border-4 border-white flex items-center justify-center shrink-0 shadow-xl relative z-10">
                                        <span className="text-white font-mono font-black text-4xl uppercase">{COMPANY_MOCK.avatar}</span>
                                    </div>
                                    <button className="h-8 px-6 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-black transition-all">
                                        Initialize_Follow
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-black uppercase tracking-tighter">{COMPANY_MOCK.name}</h1>
                                    <ShieldCheck size={18} className="text-zinc-400" />
                                </div>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">System_Entity // AGI_Development</p>
                            </div>
                        </section>

                        {/* TABS CONTROLLER */}
                        <div className="flex w-full border-b border-zinc-300 bg-white sticky top-13 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            {(['HOME', 'POSTS', 'JOBS', 'TEAM'] as TabType[]).map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => handleTabChange(tab)} 
                                    className={cn(
                                        "flex-1 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-colors border-none cursor-pointer", 
                                        activeTab === tab ? "bg-zinc-900 text-white" : "bg-white text-zinc-500 hover:bg-zinc-50"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* CONDITIONAL RENDER ENGINE */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            {activeTab === 'HOME' && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="aspect-video w-full bg-zinc-900 relative flex items-center justify-center border-b border-zinc-300">
                                        <Play size={24} className="text-white/20" />
                                        <div className="absolute bottom-3 left-3 px-2 py-1 bg-zinc-900/80 text-white text-[8px] font-mono uppercase tracking-[0.3em]">LIVE_UPLINK</div>
                                    </div>
                                    <div className="p-6 space-y-6">
                                        <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">01. Protocol_Brief</h4>
                                        <p className="text-[11px] font-semibold text-zinc-600 uppercase border-l-2 border-zinc-900 pl-4 italic leading-relaxed">
                                            "{COMPANY_MOCK.description}"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'POSTS' && (
                                <div className="divide-y divide-zinc-200 animate-in fade-in">
                                    {[1, 2].map(i => (
                                        <div key={i} className="p-4 hover:bg-zinc-50 cursor-pointer">
                                            <div className="text-[9px] font-mono font-black text-zinc-400 uppercase mb-2">Post_Log_0{i}</div>
                                            <p className="text-xs font-bold text-zinc-800 uppercase leading-snug">System update for recursive neural clusters complete.</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'JOBS' && (
                                <div className="divide-y divide-zinc-200 animate-in fade-in">
                                    <div className="p-4 flex justify-between items-center group cursor-pointer hover:bg-zinc-50">
                                        <div>
                                            <h4 className="text-xs font-black uppercase">Systems Architect</h4>
                                            <span className="text-[9px] font-mono text-zinc-400">SF // $200k+</span>
                                        </div>
                                        <div className="bg-zinc-900 text-white text-[8px] font-mono px-2 py-1 uppercase">98%_Match</div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'TEAM' && (
                                <Table className="border-collapse">
                                    <TableHeader className="bg-zinc-50 border-b border-zinc-300 h-10">
                                        <TableRow className="border-none divide-x divide-zinc-300">
                                            <TableHead className="text-[9px] font-mono font-black uppercase tracking-widest pl-4">Node</TableHead>
                                            <TableHead className="text-[9px] font-mono font-black uppercase tracking-widest pl-4">Role</TableHead>
                                            <TableHead className="w-10 text-center">ST</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow className="h-12 divide-x divide-zinc-100 border-b border-zinc-100">
                                            <TableCell className="pl-4 flex items-center gap-3 h-12">
                                                <div className="w-6 h-6 bg-zinc-900 shrink-0" />
                                                <span className="text-[11px] font-black uppercase">Sam Altman</span>
                                            </TableCell>
                                            <TableCell className="pl-4 text-[10px] font-mono font-bold text-zinc-500 uppercase">CEO</TableCell>
                                            <TableCell className="text-center"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mx-auto" /></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            )}
                        </div>
                    </div>

                    {/* STATS SIDEBAR */}
                    <aside className="w-40 shrink-0 bg-zinc-50/10">
                        <div className="sticky top-13 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
                            <SidebarHeader label="Entity Info" />
                            <div className="p-3 bg-white space-y-3">
                                <SidebarMetric label="Followers" value={COMPANY_MOCK.followers} />
                                <SidebarMetric label="Engineers" value={COMPANY_MOCK.employees} />
                            </div>
                            <SidebarHeader label="Domain" />
                            <div className="p-3 bg-white flex items-center justify-between group cursor-pointer">
                                <span className="text-[10px] font-black uppercase text-zinc-900 truncate">{COMPANY_MOCK.website}</span>
                                <ExternalLink size={10} className="text-zinc-300 group-hover:text-zinc-900" />
                            </div>
                            <div className="p-3 bg-white">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Active_Uplink</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

const SidebarHeader = ({ label }: { label: string }) => (
    <div className="p-3 bg-zinc-50/50 text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">{label}</div>
);

const SidebarMetric = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tight">{label}</span>
        <span className="text-[9px] font-black uppercase text-zinc-900">{value}</span>
    </div>
);

export default CompanyPage;