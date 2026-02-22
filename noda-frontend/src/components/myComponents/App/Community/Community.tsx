import React, { useState } from 'react';
import { 
    ArrowLeft, Users, ShieldCheck, Zap, 
    ChevronRight, Info, Terminal, Globe, 
    MoreHorizontal, Heart, MessageSquare, Share, 
    Eye
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const MOCK_COMMUNITY = {
    id: "RUST_PROT_01",
    clusterName: "RUST_PROT_01",
    title: "Rust Protocol Nodes",
    memberCount: "12.4K",
    activeCount: "1.2K",
    description: "Primary intelligence cluster for systems architects. Discussing node velocity and kernel optimization.",
    bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    initial: "R",
    admins: ["@node_deployer", "@rust_lead"]
};

const MOCK_POSTS = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    author: "@node_deployer",
    time: "2h ago",
    title: "Optimizing H100 Cluster Interconnects",
    content: "New data suggests that switching to a memory-safe protocol for inter-node communication reduces latency by 14.2% in high-load scenarios."
}));

const CommunityDetail = () => {
    const [activeTab, setActiveTab] = useState('TOP');
    const tabs = ['TOP', 'LATEST', 'MEDIA', 'ABOUT'];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                {/* 1. GLOBAL NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-13 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white pt-12.5 mb-24 min-h-screen">
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        
                        {/* COMPACT CLUSTER HEADER */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-12.5 z-40 h-9 divide-x divide-zinc-300">
                            <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2 cursor-pointer border-r border-zinc-300 bg-transparent group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-4 flex items-center justify-between bg-zinc-50/30">
                                <span className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-tighter">
                                    SYS_ID: {MOCK_COMMUNITY.id}
                                </span>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-mono font-black text-zinc-900 uppercase">{MOCK_COMMUNITY.activeCount}_Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* HERO STAGE */}
                        <section className="relative">
                            <div className="h-40 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                                <img src={MOCK_COMMUNITY.bannerImage} className="w-full h-full object-cover opacity-40 grayscale" alt="Banner" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>
                            <div className="px-4 relative pb-4 border-b border-zinc-300">
                                <div className="flex items-end justify-between -mt-10 mb-2">
                                    <div className="w-20 h-20 bg-zinc-900 border-2 border-white flex items-center justify-center shrink-0  relative z-10">
                                        <span className="text-white font-mono font-black text-3xl">{MOCK_COMMUNITY.initial}</span>
                                    </div>
                                    <button className="h-8 px-6 bg-zinc-800 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-zinc-900 cursor-pointer transition-all">
                                        Join
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-black uppercase tracking-tighter">{MOCK_COMMUNITY.title}</h1>
                                    <ShieldCheck size={16} className="text-zinc-500" />
                                </div>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tight mt-1">
                                    {MOCK_COMMUNITY.description}
                                </p>
                            </div>
                        </section>

                        {/* TABS CONTROLLER */}
                        <nav className="flex w-full border-b border-zinc-300 bg-white sticky top-13 z-30 h-10 divide-x divide-zinc-200 shrink-0">
                            {tabs.map((tab) => (
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
                        </nav>

                        {/* FEED CHANNEL */}
                        <div className="flex-1 divide-y divide-zinc-200">
                            {MOCK_POSTS.map(post => (
                                <FeedItem key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* 2. PERSISTENT CLUSTER SIDEBAR (w-40) */}
                    <aside className="w-40 shrink-0 relative bg-zinc-50/10">
                        <div className="sticky top-12.5 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
                            <SidebarHeader label="Community Infos" />
                            <div className="p-2 bg-white space-y-2">
                                <SidebarMetric label="Node_Count" value={MOCK_COMMUNITY.memberCount} />
                                <SidebarMetric label="Active_Uplink" value={MOCK_COMMUNITY.activeCount} />
                            </div>

                            <SidebarHeader label="Authority" />
                            <div className="p-2 bg-white space-y-2">
                                {MOCK_COMMUNITY.admins.map(admin => (
                                    <div key={admin} className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-[10px] font-bold uppercase text-zinc-900 truncate">{admin}</span>
                                        <ChevronRight size={10} className="text-zinc-300 group-hover:text-zinc-900" />
                                    </div>
                                ))}
                            </div>

                            <SidebarHeader label="Network Settings" />
                            <div className="p-2 bg-white space-y-2">
                                <SidebarAction label="Documentation" icon={<Info size={10} />} />
                                <SidebarAction label="Uplink Port" icon={<Globe size={10} />} />
                                <SidebarAction label="Signal Logs" icon={<Terminal size={10} />} />
                            </div>

                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const FeedItem = ({ post }: any) => (
    <div className="p-4 hover:bg-zinc-50/50 transition-colors group cursor-pointer border-b border-zinc-300">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center border border-zinc-800">
                    <span className="text-white font-mono text-[10px] uppercase">
                        {post.author.charAt(1)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-tight text-zinc-900">{post.author}</span>
                    <span className="text-[10px] font-mono font-black text-zinc-500">{post.time}</span>
                </div>
            </div>
            <MoreHorizontal size={16} className="text-zinc-300 group-hover:text-zinc-900" />
        </div>
        <p className="text-[12px] text-zinc-600 leading-relaxed font-semibold mb-3 tracking-tight">
            {post.content}
        </p>
        <div className="flex items-center gap-6 pt-1">
            <PostStat icon={<Heart size={14} />} count="244" />
            <PostStat icon={<MessageSquare size={14} />} count="12" />
            <PostStat icon={<Eye size={14} />} count="1230" />
        </div>
    </div>
);

const SidebarHeader = ({ label }: { label: string }) => (
    <div className="h-9 flex items-center px-2 text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">
        {label}
    </div>
);

const SidebarMetric = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className="text-[9px] font-bold uppercase text-zinc-800">{value}</span>
    </div>
);

const SidebarAction = ({ label, icon }: { label: string; icon: React.ReactNode }) => (
    <div className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors group">
        {icon}
        <span className="text-[9px] font-mono font-black uppercase tracking-widest group-hover:underline">{label}</span>
    </div>
);

const PostStat = ({ icon, count }: any) => (
    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors">
        {icon} <span className="text-[10px] font-mono font-black">{count}</span>
    </div>
);

export default CommunityDetail;