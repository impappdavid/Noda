import React, { useState } from 'react';
import { 
    ArrowLeft, ShieldCheck, Zap, ChevronRight, 
    Info, Terminal, Globe, MoreHorizontal, Heart, 
    MessageSquare, Eye, Lock, Users, Activity,
    Image as ImageIcon, BarChart3, Send, AlertTriangle
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const MOCK_COMMUNITY = {
    id: "RUST_PROT_01",
    title: "Rust Protocol Nodes",
    memberCount: "12.4K",
    activeCount: "1.2K",
    description: "Primary intelligence cluster for systems architects. Discussing node velocity, memory safety, and kernel optimization.",
    bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    initial: "R",
    admins: ["@node_deployer", "@rust_lead"],
    rules: ["No unverified binaries", "Maintain signal clarity", "Respect root authority"]
};

const MOCK_POSTS = [
    {
        id: 1,
        author: "@node_deployer",
        role: "admin",
        time: "10M_AGO",
        title: "SYSTEM UPDATE: Core Matrix Migration",
        content: "All nodes must verify their local binaries against the new checksums provided in the #announcements channel before 00:00 UTC. Failure to comply will result in an automated disconnect."
    },
    {
        id: 2,
        author: "@sys_eng_04",
        role: "member",
        time: "1H_AGO",
        content: "Has anyone successfully bypassed the GIL lock on the new Python wrapper? I'm seeing a 20% latency spike when handling concurrent async requests across the cluster."
    },
    {
        id: 3,
        author: "@kernel_panic",
        role: "member",
        time: "3H_AGO",
        content: "Just deployed the new eBPF tracing script to production. The memory safety overhead is basically zero. Highly recommend moving off standard user-space agents if you need raw throughput."
    }
];

type TabType = 'ALL_SIGNALS' | 'ADMIN_LOGS' | 'MEDIA_ASSETS';

const CommunityDetail = () => {
    const [activeTab, setActiveTab] = useState<TabType>('ALL_SIGNALS');
    const [composerText, setComposerText] = useState("");

    const tabs: TabType[] = ['ALL_SIGNALS', 'ADMIN_LOGS', 'MEDIA_ASSETS'];

    return (
        <div className="min-h-screen text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
                
                {/* 1. LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-14 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12">
                    
                    {/* CENTER CONTENT - FEED & COMPOSER */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300 bg-zinc-100">
                        
                        {/* COMPACT TOP BAR */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-12 z-40 h-9 divide-x divide-zinc-300">
                            <button className="px-3 h-full hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer border-none bg-transparent group">
                                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-3 flex items-center justify-between bg-zinc-50/50 h-full">
                                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={10} /> CLUSTER: {MOCK_COMMUNITY.id}
                                </span>
                            </div>
                        </div>

                        {/* CLUSTER HEADER (Condensed for Feed Focus) */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col">
                            <div className="h-32 bg-zinc-800 overflow-hidden relative group">
                                <img 
                                    src={MOCK_COMMUNITY.bannerImage} 
                                    className="w-full h-full object-cover" 
                                    alt="Banner" 
                                />
                            </div>

                            <div className="px-3 relative pb-5 bg-white z-10">
                                <div className="flex items-end justify-between -mt-9 mb-2">
                                    <div className="w-20 h-20 bg-zinc-900 border-4 border-white flex items-center justify-center shrink-0 ">
                                        <span className="text-white font-mono font-black text-3xl uppercase">{MOCK_COMMUNITY.initial}</span>
                                    </div>
                                    <div className="shrink-0 pb-1 flex gap-2">
                                        
                                        <button className="h-7 px-4 cursor-pointer bg-orange-500 text-white text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none flex items-center gap-2">
                                            Joined
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold uppercase tracking-tighter text-zinc-900 leading-none mb-1">{MOCK_COMMUNITY.title}</h1>
                                    <p className="text-[11px] font-semibold text-zinc-600 uppercase tracking-tight mt-2 leading-relaxed max-w-xl">
                                        {MOCK_COMMUNITY.description}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* TABS CONTROLLER */}
                        <nav className="flex w-full border-b border-zinc-300 bg-zinc-50 sticky top-[88px] z-30 h-10 divide-x divide-zinc-300 shrink-0">
                            {tabs.map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)} 
                                    className={cn(
                                        "flex-1 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all border-none cursor-pointer flex items-center justify-center", 
                                        activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_2px_0_0_#f97316]" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>

                        {/* SIGNAL COMPOSER (The "Tweet Box") */}
                        {activeTab === 'ALL_SIGNALS' && (
                            <div className="bg-white p-3 border-b border-zinc-300 shrink-0">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-zinc-800 border border-zinc-800 flex items-center justify-center shrink-0">
                                        <span className="text-white text-[10px] uppercase font-bold">ME</span>
                                    </div>
                                    <div className="flex-1 flex flex-col">
                                        <textarea 
                                            value={composerText}
                                            onChange={e => setComposerText(e.target.value)}
                                            placeholder="Transmit signal to cluster..."
                                            className="w-full text-sm font-bold text-zinc-800 placeholder:text-zinc-400 bg-transparent outline-none resize-none min-h-[30px]"
                                        />
                                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-2">
                                            <div className="flex items-center gap-2">
                                                <button className="p-1.5 text-zinc-400 hover:text-orange-500 transition-colors"><ImageIcon size={14} /></button>
                                                <button className="p-1.5 text-zinc-400 hover:text-orange-500 transition-colors"><BarChart3 size={14} /></button>
                                            </div>
                                            <button 
                                                disabled={!composerText}
                                                className="h-8 px-5 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-zinc-900 transition-colors flex items-center gap-2"
                                            >
                                                Transmit <Send size={10} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FEED CHANNEL */}
                        <div className="flex-1 flex flex-col gap-[1px]">
                            {MOCK_POSTS.filter(p => activeTab === 'ADMIN_LOGS' ? p.role === 'admin' : true).map(post => (
                                <FeedItem key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* 2. PERSISTENT CLUSTER SIDEBAR (w-40) */}
                    <aside className="w-40 shrink-0 relative bg-white hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">
                            
                            {/* CLUSTER IDENTIFIER */}
                            <div className="p-2 bg-zinc-800 border-b border-zinc-700 shrink-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white">Informations</span>
                                </div>
                            </div>

                            {/* CORE METRICS */}
                            <div className="p-2 border-b border-zinc-300 bg-white space-y-2 shrink-0">
                                <SidebarStat label="Total_Nodes" value={MOCK_COMMUNITY.memberCount} />
                                <SidebarStat label="Active_Ping" value={MOCK_COMMUNITY.activeCount} />
                                <SidebarStat label="Security" value="Public" />
                            </div>

                            {/* PROTOCOL CONSTRAINTS (Rules) */}
                            <div className=" bg-zinc-50 flex-1 flex flex-col overflow-hidden">
                                <div className="flex p-2 items-center gap-1.5 pb-2 border-b border-zinc-300 ">
                                    <AlertTriangle size={12} className="text-orange-500" />
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500">Rules</span>
                                </div>
                                <div className="overflow-y-auto scrollbar-hide">
                                    {MOCK_COMMUNITY.rules.map((rule, i) => (
                                        <div key={i} className="flex items-start gap-2 bg-white border-b border-zinc-300 p-2">
                                            <span className="text-[8px] font-mono font-black text-orange-500 shrink-0 leading-tight">0{i+1}</span>
                                            <span className="text-[8px] font-bold uppercase text-zinc-700 leading-tight">{rule}</span>
                                        </div>
                                    ))}
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

const FeedItem = React.memo(({ post }: any) => {
    const isAdmin = post.role === 'admin';

    return (
        <div className={cn(
            "p-3 bg-white cursor-pointer group flex items-start gap-3 transition-colors relative",
            isAdmin ? "border-l-2 border-l-orange-500" : ""
        )}>
            <div className={cn(
                "w-10 h-10 flex items-center justify-center shrink-0 bg-zinc-800  text-white"
            )}>
                <span className=" font-bold text-[12px] uppercase">
                    {post.author.charAt(1)}
                </span>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold tracking-tight text-zinc-900 truncate">{post.author}</span>
                        {isAdmin && (
                            <span className="px-1.5 py-0.5 bg-orange-500 text-white text-[8px] font-mono font-black uppercase tracking-widest border border-orange-200">SYS_ADMIN</span>
                        )}
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-widest ml-1">{post.time}</span>
                    </div>
                    <MoreHorizontal size={14} className="text-zinc-300 group-hover:text-zinc-600 shrink-0" />
                </div>
                
                {post.title && (
                    <h3 className="text-xs font-bold uppercase mt-1 mb-1.5 text-zinc-900 tracking-tight leading-snug">{post.title}</h3>
                )}
                
                <p className="text-[11px] text-zinc-700 font-semibold tracking-tight leading-relaxed mb-3">
                    {post.content}
                </p>
                
                <div className="flex items-center gap-6 pt-1">
                    <PostStat icon={<Heart size={16} />} count="244" />
                    <PostStat icon={<MessageSquare size={16} />} count="12" />
                    <PostStat icon={<Eye size={16} />} count="1.2k" />
                </div>
            </div>
        </div>
    );
});

const SidebarStat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">{label}</span>
        <span className="text-[9px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
);

const PostStat = ({ icon, count }: any) => (
    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors">
        {icon} <span className="text-[9px] font-mono font-black uppercase">{count}</span>
    </div>
);

export default CommunityDetail;