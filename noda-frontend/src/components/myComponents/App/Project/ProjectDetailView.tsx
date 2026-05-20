import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, MessageSquare, Heart, BarChart3, Bookmark, X as CloseIcon, 
  Copy, ExternalLink, Calendar, Clock, ArrowUpRight, ShieldAlert, 
  Terminal, Grid, Code2, Flame, Link2
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import CommentNode from '../Post/CommentNode';

const MOCK_PROJECT = {
    id: "proj_9921",
    author: {
        id: "u_marcus_v",
        name: "Marcus Vane",
        username: "@mv_arch",
        role: "Systems Architect",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    title: "AetherNet Mesh Node Architecture",
    tagline: "Decentralized state synchronization protocol built for low-latency edge topology.",
    content: "Substituted heavy Raft consensus models with an asynchronous directed acyclic graph (DAG) ledger running over UDP/QUIC channels to optimize high-density edge clusters. This architecture eliminates master node bottlenecks entirely.",
    postedAgo: "1h",
    likes: 142,
    commentsCount: 56,
    views: "24.8k",
    year: "2026",
    duration: "6 Months Development",
    skills: ["Rust", "QUIC Protocol", "Cap'n Proto", "Async-Std", "Linux Kernel Tuning"],
    links: [
        { label: "Production Build", url: "https://aethernet.mesh/node", icon: ExternalLink },
        { label: "Documentation Core", url: "https://docs.aethernet.internal", icon: Link2 }
    ],
    challenges: [
        {
            title: "Challange 1",
            content:"Packet fragmentation over high-loss satellite hops required a completely customized rolling-window acknowledgment algorithm.",
        },
         {
            title: "Challange 2",
            content:"Zero-copy memory allocations inside the async network multiplexer initially triggered thread synchronization deadlocks during state updates.",
        },
    ],
    images: [
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
        "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800"
    ]
};

export default function ProjectDetailView() {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const sectionRefs = {
        identity: useRef<HTMLDivElement>(null),
        telemetry: useRef<HTMLDivElement>(null),
        stack: useRef<HTMLDivElement>(null),
        friction: useRef<HTMLDivElement>(null),
        endpoints: useRef<HTMLDivElement>(null),
    };

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            {/* LIGHTBOX DIALOG OVERLAY */}
            {selectedImg && (
                <div className="fixed inset-0 z-[100] bg-zinc-950/95 flex items-center justify-center p-2" onClick={() => setSelectedImg(null)}>
                    <button className="absolute top-3 right-3 text-zinc-400 hover:text-white cursor-pointer bg-zinc-900 border border-zinc-700 p-1 rounded-none">
                        <CloseIcon size={16} />
                    </button>
                    <img src={selectedImg} className="max-w-full max-h-[85vh] object-contain rounded-none border border-zinc-700" onClick={(e) => e.stopPropagation()} alt="" />
                </div>
            )}

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
                
                {/* APPLICATION SIDEBAR NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-14 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                {/* MAIN STREAM CONTENT WORKSPACE */}
                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex-row pt-13">
                    
                    <div className="flex-1 flex flex-col mb-64">
                        
                        {/* COMPACT STICKY CONTROL TRACK */}
                        <div className="flex w-full items-center justify-between border-b border-zinc-300 bg-white sticky top-[52px] z-20 h-9  divide-x divide-zinc-300">
                            <button onClick={() => navigate(-1)} className="hover:bg-zinc-200 h-full flex items-center gap-1.5 cursor-pointer text-[9px] font-mono font-black uppercase tracking-wider text-zinc-600 px-2 pr-3 rounded-none border-r border-zinc-300">
                                <ArrowLeft size={12} /><span>Return</span>
                            </button>
                            <div className="flex-1 px-3 text-[9px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em]">Project</div>
                            <button className="hover:text-red-600 h-full pl-3 px-2 flex items-center gap-1 text-[9px] font-mono font-black uppercase text-zinc-400 cursor-pointer rounded-none border-0 bg-transparent">
                                <ShieldAlert size={12} /><span>Report</span>
                            </button>
                        </div>

                        {/* STACKED CORE LAYOUT VIA gap-[1px] STRUCTURE */}
                        <div className="flex-1 bg-zinc-300 gap-[1px] flex flex-col">
                            
                            {/* BLOCK 1: MAIN REPO IDENTITY */}
                            <div ref={sectionRefs.identity} className="bg-white p-2 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-10 h-10 rounded-none border border-zinc-300 overflow-hidden bg-zinc-50 shrink-0">
                                            <img src={MOCK_PROJECT.author.avatar} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-black text-zinc-900 block leading-tight hover:underline cursor-pointer">{MOCK_PROJECT.author.name}</span>
                                            <span className="text-[10px] font-mono font-black text-zinc-400 block uppercase mt-0.5">{MOCK_PROJECT.author.username} • {MOCK_PROJECT.postedAgo} ago</span>
                                        </div>
                                    </div>
                                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="p-2 text-zinc-500 hover:text-zinc-900 border border-transparent hover:bg-zinc-200 bg-white cursor-pointer rounded-none">
                                        <Copy size={12} />
                                    </button>
                                </div>
                                
                                <div className="mt-4">
                                    <h1 className="text-xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{MOCK_PROJECT.title}</h1>
                                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                                         {MOCK_PROJECT.tagline}
                                    </p>
                                </div>

                                <div className="flex gap-2 text-[9px] font-mono text-zinc-600 mt-2 border-t border-zinc-100">
                                    <div className="flex items-center gap-1 border border-zinc-300 px-1.5 py-0.5 bg-zinc-50"><Calendar size={11} /> <strong>YEAR:</strong> {MOCK_PROJECT.year}</div>
                                    <div className="flex items-center gap-1 border border-zinc-300 px-1.5 py-0.5 bg-zinc-50"><Clock size={11} /> <strong>SPAN:</strong> {MOCK_PROJECT.duration}</div>
                                </div>

                                <p className="text-xs text-zinc-900 leading-relaxed mt-4">{MOCK_PROJECT.content}</p>
                            </div>

                            {/* BLOCK 2: SQUARE 2-COLUMN MULTI-ROW IMAGES GRID */}
                            {MOCK_PROJECT.images && MOCK_PROJECT.images.length > 0 && (
                                <div ref={sectionRefs.telemetry} className="bg-white">
                                    <ModuleHeader title="Asset_Telemetry" icon={<Grid size={12}/>} />
                                    <div className="">
                                        <div className="grid grid-cols-2 gap-0.5">
                                            {MOCK_PROJECT.images.map((img, i) => (
                                                <div key={i} className="bg-white  group cursor-pointer rounded-none">
                                                    <div className="aspect-video  overflow-hidden shadow-inner rounded-none">
                                                        <img 
                                                            src={img} 
                                                            className="w-full h-full object-cover transition-all duration-300" 
                                                            onClick={() => setSelectedImg(img)} 
                                                            alt="" 
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BLOCK 3: SYSTEM STACK CHIPS */}
                            <div ref={sectionRefs.stack} className="bg-white">
                                <ModuleHeader title="Stack" icon={<Code2 size={12}/>} />
                                <div className="divide-x divide-zinc-300 flex flex-wrap ">
                                    {MOCK_PROJECT.skills.map((skill, i) => (
                                        <span key={i} className="text-[10px] font-mono bg-zinc-100 text-zinc-800 px-3 py-1.5  font-bold rounded-none">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* BLOCK 4: ENGINEERING CHALLENGES (FRICTION LOGS) */}
                            <div ref={sectionRefs.friction} className="bg-white">
                                <ModuleHeader title="Logs" icon={<Flame size={12}/>} />
                                <div className="grid grid-cols-2 divide-x divide-zinc-300">
                                    {MOCK_PROJECT.challenges.map((challenge, i) => (
                                        <div key={i} className="  last:border-0 hover:bg-zinc-100 p-2 items-start gap-3">
                                            <p className="text-xs font-bold text-zinc-900 leading-relaxed">{challenge.title}</p>
                                            <p className="text-xs text-zinc-900 leading-relaxed">{challenge.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BLOCK 5: VERIFIED NETWORK TARGET ENDPOINTS */}
                            <div ref={sectionRefs.endpoints} className="bg-white">
                                <ModuleHeader title="Gateway_Endpoints" icon={<ExternalLink size={12}/>} />
                                <div className=" grid grid-cols-2 ">
                                    {MOCK_PROJECT.links.map((link, i) => {
                                        const IconComponent = link.icon;
                                        return (
                                            <a 
                                                key={i} 
                                                href={link.url} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="flex items-center justify-between p-2 py-4 text-xs bg-white hover:bg-zinc-50 transition-colors text-zinc-800 font-mono font-bold rounded-none"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <IconComponent size={14} className="text-zinc-400" />
                                                    {link.label}
                                                </span>
                                                <ArrowUpRight size={14} className="text-zinc-400" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* BLOCK 6: ENGAGEMENT CONTROL DECK TRACK */}
                            <div className="bg-white p-3">
                                <PostActionBar 
                                    post={MOCK_PROJECT} 
                                    liked={liked} 
                                    bookmarked={bookmarked} 
                                    onLike={() => setLiked(!liked)} 
                                    onBookmark={() => setBookmarked(!bookmarked)} 
                                />
                            </div>

                        </div>

                        {/* ENGAGEMENT INJECT PACK TRACK */}
                        <div className="border-t border-zinc-300 bg-white">
                            <div className="p-2 flex gap-1 bg-zinc-50 border-b border-zinc-300">
                                <input 
                                    placeholder="TRANSMIT RESPONSE TO STREAM..." 
                                    className="flex-1 bg-white border border-zinc-300 rounded-none px-2 py-1 text-[10px] font-mono outline-none focus:border-zinc-500 uppercase font-bold" 
                                />
                                <button className="bg-zinc-900 text-white px-4 rounded-none text-[10px] font-mono uppercase font-black hover:bg-zinc-800 transition-colors cursor-pointer border-0">
                                    Transmit
                                </button>
                            </div>

                            {/* COMMENT PACK FEED STREAM */}
                            <div className="divide-y divide-zinc-200 pb-24">
                                {[1, 2, 3].map((i) => (
                                    <CommentNode key={i} id={`user_${i}`} likes={10 + i} onUserClick={(id) => navigate(`/app/user/${id}`)} />
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT PROFILE SCROLL TRACK INDEX */}
                    <aside className="w-39 shrink-0 bg-white hidden md:flex flex-col border-l border-zinc-300">
                        <div className="sticky top-13 flex flex-col h-[calc(100vh-3.5rem)]">
                            <div className="pb-2 px-2 bg-zinc-300 text-black shrink-0">
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em]">On This Page</span>
                            </div>
                            
                            <nav className="flex-1 overflow-y-auto border-b border-zinc-200">
                                <NavBtn label="Summary" onClick={() => scrollTo(sectionRefs.identity)} />
                                <NavBtn label="Telemetry" onClick={() => scrollTo(sectionRefs.telemetry)} />
                                <NavBtn label="System_Stack" onClick={() => scrollTo(sectionRefs.stack)} />
                                <NavBtn label="Friction_Logs" onClick={() => scrollTo(sectionRefs.friction)} />
                                <NavBtn label="Endpoints" onClick={() => scrollTo(sectionRefs.endpoints)} />
                            </nav>
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
}

// --- SUBCOMPONENTS Matching UserProfile Signature System ---

const ModuleHeader = ({ title, icon }: any) => (
    <div className="px-2 py-1.5 bg-zinc-300 border-b border-zinc-300 flex items-center gap-2 shadow-sm">
        <span className="text-zinc-600">{icon}</span>
        <h3 className="text-[9px] font-mono font-black text-black uppercase tracking-[0.3em]">{title}</h3>
    </div>
);

const NavBtn = ({ label, onClick }: any) => (
    <button onClick={onClick} className="w-full text-left px-2 py-2 border-b border-zinc-300 text-[9px] font-mono font-bold text-zinc-500 uppercase hover:text-blue-600 cursor-pointer hover:bg-zinc-200 transition-all truncate rounded-none border-t-0 border-x-0 bg-transparent">
        {label}
    </button>
);

const PostActionBar = ({ post, liked, bookmarked, onLike, onBookmark }: any) => (
    <div className="flex items-center justify-between text-zinc-500 font-mono text-[10px]">
        <div className="flex items-center gap-6">
            <button onClick={onLike} className={cn("flex items-center gap-1.5 cursor-pointer transition-colors bg-transparent border-0 p-0 rounded-none", liked ? "text-orange-600 font-black" : "hover:text-zinc-900")}>
                <Heart size={14} className={liked ? "fill-orange-600 text-orange-600" : ""} /> {post.likes + (liked ? 1 : 0)}
            </button>
            <div className="flex items-center gap-1.5"><MessageSquare size={14} /> {post.commentsCount}</div>
            <div className="flex items-center gap-1.5"><BarChart3 size={14} /> {post.views}</div>
        </div>
        <button onClick={onBookmark} className={cn("cursor-pointer transition-colors p-1 border border-transparent hover:border-zinc-300 bg-white rounded-none", bookmarked ? "text-zinc-900" : "hover:text-zinc-900")}>
            <Bookmark size={14} className={bookmarked ? "fill-zinc-900 text-zinc-900" : ""} />
        </button>
    </div>
);