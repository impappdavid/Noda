import React, { useState } from 'react';
import { 
     ShieldCheck, 
    Info,  MoreHorizontal, Heart, 
    MessageSquare, Eye, 
    Image as ImageIcon, BarChart3, Send, AlertTriangle,
    TrendingUp, Clock, Image, UserCheck
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
        content: "All nodes must verify their local binaries against the new checksums provided in the #announcements channel before 00:00 UTC. Failure to comply will result in an automated disconnect.",
        likes: 542,
        comments: 42,
        views: "3.4k"
    },
    {
        id: 2,
        author: "@sys_eng_04",
        role: "member",
        time: "1H_AGO",
        content: "Has anyone successfully bypassed the GIL lock on the new Python wrapper? I'm seeing a 20% latency spike when handling concurrent async requests across the cluster.",
        likes: 124,
        comments: 18,
        views: "1.1k"
    },
    {
        id: 3,
        author: "@kernel_panic",
        role: "member",
        time: "3H_AGO",
        content: "Just deployed the new eBPF tracing script to production. The memory safety overhead is basically zero. Highly recommend moving off standard user-space agents if you need raw throughput.",
        likes: 289,
        comments: 24,
        views: "2.1k"
    }
];

// Added custom span properties to replicate the visual layout behavior
const MOCK_MEDIA = [
    { id: 'm1', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600', label: 'Matrix Control', span: 'col-span-2 row-span-2' },
    { id: 'm2', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400', label: 'Architecture Diagram', span: 'col-span-1 row-span-1' },
    { id: 'm3', url: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=400', label: 'Kernel Benchmarks', span: 'col-span-1 row-span-2' },
    { id: 'm4', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400', label: 'Cluster Matrix Map', span: 'col-span-1 row-span-1' },
    { id: 'm5', url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600', label: 'Memory Overheads', span: 'col-span-2 row-span-1' },
    { id: 'm6', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400', label: 'Telemetry Link', span: 'col-span-1 row-span-1' }
];

type TabType = 'TOP' | 'LATEST' | 'MEDIA' | 'ABOUT';

const CommunityDetail: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('TOP');
    const [composerText, setComposerText] = useState("");
    const [posts, setPosts] = useState(MOCK_POSTS);

    const handleTransmit = () => {
        if (!composerText.trim()) return;
        
        const newPost = {
            id: Date.now(),
            author: "@me_operator",
            role: "member",
            time: "JUST_NOW",
            content: composerText,
            likes: 0,
            comments: 0,
            views: "1"
        };

        setPosts([newPost, ...posts]);
        setComposerText("");
    };

    const getFilteredPosts = () => {
        if (activeTab === 'TOP') {
            return [...posts].sort((a, b) => b.likes - a.likes);
        }
        if (activeTab === 'LATEST') {
            return [...posts].sort((a, b) => b.id - a.id);
        }
        return posts;
    };

    return (
        <div className="min-h-screen text-zinc-900 font-sans flex flex-col relative bg-zinc-50">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
                
                {/* Left App Navigation Sidebar */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-14 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                {/* Core main workspace layout */}
                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex-row pt-13">
                    
                    <div className="flex-1 flex flex-col mb-32">
                        
                        {/* IDENTITY HEADER PLATE */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col ">
                            <div className="h-32 bg-zinc-900 relative">
                                <img src={MOCK_COMMUNITY.bannerImage} className="w-full h-full object-cover opacity-40" alt="Community Banner" />
                            </div>

                            <div className="px-4 relative pb-4 bg-white z-10">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <div className="w-20 h-20 bg-zinc-950 border-4 border-white flex items-center justify-center shrink-0 shadow-lg">
                                        <span className="text-white font-mono font-black text-3xl uppercase tracking-tighter">{MOCK_COMMUNITY.initial}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="h-7 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
                                            Joined
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{MOCK_COMMUNITY.title}</h1>
                                    <ShieldCheck size={16} className="text-orange-500" />
                                </div>
                                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tight mt-1">CLUSTER // {MOCK_COMMUNITY.id}</p>
                                <p className="text-xs font-medium text-zinc-700 mt-2 leading-snug">{MOCK_COMMUNITY.description}</p>
                            </div>
                        </section>

                        {/* TAB LIST */}
                        <div className="flex w-full border-b border-zinc-300 bg-zinc-100 h-9 divide-x divide-zinc-300 sticky top-13 z-20">
                            {(['TOP', 'LATEST', 'MEDIA', 'ABOUT'] as TabType[]).map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => setActiveTab(tab)} 
                                    className={cn(
                                        "flex-1 text-[9px] font-mono font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-1.5", 
                                        activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#18181b]" : "text-zinc-400 hover:text-zinc-600"
                                    )}
                                >
                                    {tab === 'TOP' && <TrendingUp size={10} />}
                                    {tab === 'LATEST' && <Clock size={10} />}
                                    {tab === 'MEDIA' && <Image size={10} />}
                                    {tab === 'ABOUT' && <Info size={10} />}
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT PANELS */}
                        <div className="flex-1 bg-zinc-300 flex flex-col">
                            
                            {/* SIGNAL COMPOSER */}
                            {(activeTab === 'TOP' || activeTab === 'LATEST') && (
                                <div className="bg-white p-4 border-b border-zinc-300 shrink-0">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-zinc-950 flex items-center justify-center shrink-0">
                                            <span className="text-white font-mono text-[10px] uppercase font-black">ME</span>
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <textarea 
                                                value={composerText}
                                                onChange={e => setComposerText(e.target.value)}
                                                placeholder="Transmit data packet to cluster..."
                                                className="w-full text-xs font-bold text-zinc-800 placeholder:text-zinc-400 bg-transparent outline-none resize-none min-h-8"
                                            />
                                            <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <button className="p-1.5 text-zinc-400 hover:text-orange-500 transition-colors"><ImageIcon size={13} /></button>
                                                    <button className="p-1.5 text-zinc-400 hover:text-orange-500 transition-colors"><BarChart3 size={13} /></button>
                                                </div>
                                                <button 
                                                    onClick={handleTransmit}
                                                    disabled={!composerText.trim()}
                                                    className="h-7 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 disabled:opacity-30 disabled:hover:bg-zinc-900 transition-colors flex items-center gap-1.5"
                                                >
                                                    Transmit <Send size={9} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* FEED RENDER PATHWAYS */}
                            {(activeTab === 'TOP' || activeTab === 'LATEST') && (
                                <div className="flex flex-col gap-px">
                                    {getFilteredPosts().map(post => (
                                        <FeedItem key={post.id} post={post} />
                                    ))}
                                </div>
                            )}

                            {/* NO PADDING MOODBOARD STYLE MEDIA GRID */}
                            {activeTab === 'MEDIA' && (
                                <div className="grid grid-cols-3 auto-rows-[140px] gap-1 bg-white p-0">
                                    {MOCK_MEDIA.map((media) => (
                                        <div 
                                            key={media.id} 
                                            className={cn(
                                                "relative group overflow-hidden bg-zinc-900 cursor-pointer w-full h-full", 
                                                media.span
                                            )}
                                        >
                                            <img 
                                                src={media.url} 
                                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                                                alt={media.label} 
                                            />
                                            {/* Minimal clean identifier overlay on hover */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                                                <p className="text-[10px] font-mono font-black text-white uppercase tracking-tight">{media.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ABOUT BREAKDOWN VIEW */}
                            {activeTab === 'ABOUT' && (
                                <div className="bg-white p-6 space-y-6 min-h-100">
                                    <div>
                                        <h3 className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400 mb-2">Core Manifesto</h3>
                                        <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                                            {MOCK_COMMUNITY.description} Extended cluster environment dedicated to testing high-throughput systems, safety diagnostics, and concurrent communication architectures.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-[10px] font-mono font-black uppercase tracking-wider text-zinc-400 mb-2">Cluster Overseers</h3>
                                        <div className="flex flex-col gap-1.5">
                                            {MOCK_COMMUNITY.admins.map((admin, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-zinc-900 bg-zinc-50 p-2 border border-zinc-200 rounded-sm">
                                                    <UserCheck size={12} className="text-orange-500" />
                                                    <span>{admin}</span>
                                                    <span className="text-[7px] font-mono bg-orange-100 text-orange-600 px-1 font-black uppercase tracking-wide ml-auto">Level 0 Root</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: BALANCED GEOMETRY SPEC */}
                    <aside className="w-39 shrink-0 bg-white hidden md:flex flex-col border-l border-zinc-300">
                        <div className="sticky top-13 flex flex-col h-[calc(100vh-3.5rem)]">
                            
                            {/* METRIC READOUT TELEMETRY LAYER */}
                            <div className="p-3 bg-zinc-50 flex-1 space-y-3">
                                <div>
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block tracking-wider mb-2">Cluster Matrix</span>
                                    <div className="border border-zinc-300 bg-white flex flex-col divide-y divide-zinc-200 text-[9px] font-mono p-2 rounded-sm shadow-sm">
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">Total Nodes</span>
                                            <span className="font-black text-zinc-900 block">{MOCK_COMMUNITY.memberCount}</span>
                                        </div>
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">Active Pings</span>
                                            <span className="font-black text-orange-600 block">{MOCK_COMMUNITY.activeCount}</span>
                                        </div>
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">Uplink Gateway</span>
                                            <span className="font-black text-blue-600 block">PUBLIC // ENCRYPTED</span>
                                        </div>
                                    </div>
                                </div>

                                {/* PROTOCOL RESTRAINTS LIST */}
                                <div>
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block tracking-wider mb-1.5 items-center gap-1"><AlertTriangle size={10} className="text-orange-500" /> Operational Rules</span>
                                    <div className="space-y-1">
                                        {MOCK_COMMUNITY.rules.map((rule, idx) => (
                                            <div key={idx} className="bg-white border border-zinc-200 p-1.5 rounded-sm flex items-start gap-1.5">
                                                <span className="text-[7px] font-mono font-black text-zinc-400 mt-0.5">0{idx + 1}</span>
                                                <p className="text-[8px] font-bold text-zinc-600 uppercase leading-tight tracking-tight">{rule}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- SUBSYSTEM COMPONENT ATOMS ---

const FeedItem = React.memo(({ post }: any) => {
    const isAdmin = post.role === 'admin';

    return (
        <div className={cn(
            "p-4 bg-white border-b border-zinc-200 group flex items-start gap-3 transition-colors relative hover:bg-zinc-50/50",
            isAdmin ? "border-l-2 border-l-orange-500" : ""
        )}>
            <div className="w-9 h-9 flex items-center justify-center shrink-0 bg-zinc-950 text-white font-mono">
                <span className="font-black text-[11px] uppercase">
                    {post.author.charAt(1)}
                </span>
            </div>
            
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold tracking-tight text-zinc-900 truncate">{post.author}</span>
                        {isAdmin && (
                            <span className="px-1 py-0.5 bg-orange-500 text-white text-[6px] font-mono font-black uppercase tracking-widest">SYS_ADMIN</span>
                        )}
                        <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest ml-1">{post.time}</span>
                    </div>
                    <MoreHorizontal size={12} className="text-zinc-300 group-hover:text-zinc-600 shrink-0 cursor-pointer" />
                </div>
                
                {post.title && (
                    <h3 className="text-xs font-black uppercase mt-1 mb-1 text-zinc-900 tracking-tight leading-snug">{post.title}</h3>
                )}
                
                <p className="text-[11px] text-zinc-600 font-medium tracking-tight leading-relaxed mb-3">
                    {post.content}
                </p>
                
                <div className="flex items-center gap-5 pt-0.5">
                    <PostStat icon={<Heart size={13} />} count={post.likes} />
                    <PostStat icon={<MessageSquare size={13} />} count={post.comments} />
                    <PostStat icon={<Eye size={13} />} count={post.views} />
                </div>
            </div>
        </div>
    );
});

const PostStat = ({ icon, count }: any) => (
    <div className="flex items-center gap-1 text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
        {icon} <span className="text-[8px] font-mono font-black uppercase">{count}</span>
    </div>
);

export default CommunityDetail;