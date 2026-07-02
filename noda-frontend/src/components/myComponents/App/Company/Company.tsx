import React, { useState, useRef } from 'react';
import { 
    BadgeCheck, Building2, Heart,  Globe,  Briefcase, Code2, 
    Github, Twitter, Linkedin, BarChart3, TrendingUp, Users, Search, 
     Play, Pause, Video, Eye, Calendar, MapPin, ExternalLink, 
     Award, Flame, 
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

type TabType = 'OVERVIEW' | 'JOBS' | 'EVENTS' | 'CULTURE';

const INITIAL_COMPANY_DATA = {
    name: "Noda Labs",
    logo: "NL",
    industry: "Distributed Infrastructure & Cryptography",
    hq: "San Francisco, CA",
    tagline: "Building memory-safe distributed consensus protocols and zero-copy data pipelines for the decentralized web.",
    about: "Noda Labs is an infrastructure engineering firm specializing in low-latency systems networking, eBPF kernel instrumentation, and high-performance file systems. Founded in 2021 by MIT systems researchers, we power data execution layers for global computing clusters.",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32128-large.mp4",
    stats: {
        funding: "$42M Series A",
        throughput: "4.2M tx/s",
        uptime: "99.999%",
        teamCount: "142 NODES",
        domain: "NODALABS.IO",
        responseTime: "< 14 MINS"
    },
    products: [
        { name: "Hyper-Node Enterprise", desc: "Low-latency P2P networking runtime built in Rust with built-in zero-copy serialization.", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80" },
        { name: "Noda-Kernel-Shield", desc: "eBPF-driven real-time network safety and security observability suite for cloud-native applications.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80" }
    ],
    press: [
        { source: "TechCrunch", title: "Noda Labs Secures $42M to Re-engineer the Core Consensus Layer.", date: "MAR 2026" },
        { source: "Wired Enterprise", title: "Why Kernel-Level Security Is the Next Battleground for Cloud Infrastructure.", date: "JAN 2026" }
    ],
    milestones: [
        { year: "2026", title: "V2 Protocol Engine Launch", desc: "Achieved sub-millisecond execution times globally." },
        { year: "2024", title: "Series A Funding Round", desc: "Led by Framework Ventures with participation from tier-1 systems funds." }
    ],
    investors: ["Framework Ventures", "Andreessen Horowitz", "MIT Delta Engine VCs"],
    jobs: [
        { title: "Senior Systems Engineer (Rust / eBPF)", team: "Core Protocols", location: "SF / Hybrid", type: "Full-Time" }
    ],
    events: [
        { title: "Decentralized Infra Summit 2026", type: "Conference", date: "JUN 14", location: "San Francisco, CA", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80", desc: "Hosting core protocol architects discussing memory-safe kernel optimization." }
    ],
    culture: [
        { title: "Open Source First", desc: "Over 70% of our core stack is open-source. We believe in building public utilities." }
    ]
};

const CompanyProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('OVERVIEW');
    const [isConfigMode, setIsConfigMode] = useState(false);
    const [companyData] = useState(INITIAL_COMPANY_DATA);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
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
                        
                        {/* COMPANY IDENTITY HEADER PLATE */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col ">
                            <div className="h-32 bg-zinc-900 relative">
                                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" className="w-full h-full object-cover opacity-40" alt="Company Banner" />
                            </div>

                            <div className="px-4 relative pb-4 bg-white z-10">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <div className="w-20 h-20 bg-zinc-950 border-4 border-white flex items-center justify-center shrink-0 shadow-lg">
                                        <span className="text-white font-mono font-black text-3xl uppercase tracking-tighter">{companyData.logo}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setIsConfigMode(!isConfigMode)}
                                            className={cn("h-7 px-3 border text-[9px] font-mono font-black uppercase tracking-widest transition-colors", 
                                            isConfigMode ? "bg-blue-600 border-blue-600 text-white" : "border-zinc-300 text-zinc-500 hover:bg-zinc-50")}
                                        >
                                             {isConfigMode ? "Save" : "Manage"}
                                        </button>
                                        <button className="h-7 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-blue-500 transition-all">
                                            Follow
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{companyData.name}</h1>
                                    <BadgeCheck size={16} className="text-blue-600" />
                                </div>
                                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tight mt-1">{companyData.industry} • {companyData.hq}</p>
                                <p className="text-xs font-medium text-zinc-700 mt-2 leading-snug">{companyData.tagline}</p>
                            </div>
                        </section>

                        {/* TAB LIST */}
                        <div className="flex w-full border-b border-zinc-300 bg-zinc-100 h-9 divide-x divide-zinc-300 sticky top-13 z-20">
                            {(['OVERVIEW', 'JOBS', 'EVENTS', 'CULTURE'] as TabType[]).map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 text-[9px] font-mono font-black uppercase tracking-[0.15em] transition-all", activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#18181b]" : "text-zinc-400")}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT PANELS */}
                        <div className="flex-1 bg-zinc-300 gap-px flex flex-col">
                            {activeTab === 'OVERVIEW' && (
                                <>
                                    {/* SECTION: Telemetry */}
                                    <div className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Performance Telemetry" icon={<BarChart3 size={12}/>} />
                                        <div className="grid grid-cols-3 divide-x divide-zinc-300">
                                            <AnalyticsItem icon={<TrendingUp size={14}/>} label="Funding" val={companyData.stats.funding} sub="Active Run-rate" />
                                            <AnalyticsItem icon={<Users size={14}/>} label="Scale" val={companyData.stats.throughput} sub="Engine Output" />
                                            <AnalyticsItem icon={<Search size={14}/>} label="Network Core" val={companyData.stats.uptime} sub="SLA Guarantee" />
                                        </div>
                                    </div>

                                    {/* SECTION: Profile Summary */}
                                    <div className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Org Profile" icon={<Building2 size={12}/>} />
                                        <div className="p-4">
                                            <p className="text-xs font-medium text-zinc-900 leading-relaxed">{companyData.about}</p>
                                        </div>
                                    </div>

                                    {/* SECTION: Intro Video */}
                                    <div className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Introduction Video" icon={<Video size={12}/>} />
                                        <div className="">
                                            <div className="relative aspect-video w-full bg-zinc-800  overflow-hidden shadow-inner group">
                                                <video ref={videoRef} src={companyData.videoUrl} className="w-full h-full object-cover" loop muted playsInline />
                                                <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-3">
                                                    <div className="flex justify-between items-start">
                                                        <span className="bg-zinc-900 text-white font-mono text-[8px] font-black px-1.5 py-0.5 uppercase tracking-widest flex items-center gap-1">
                                                            <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"/> SECURE_STREAM // DATA_FEED
                                                        </span>
                                                        <span className="text-[9px] font-mono text-white/80 bg-black/40 px-1 py-0.5"><Eye size={10} className="inline mr-1"/> 1.4k views</span>
                                                    </div>
                                                    <button onClick={togglePlay} className="self-start bg-white text-zinc-900 hover:bg-orange-600 hover:text-white border border-zinc-900 font-mono font-black uppercase text-[10px] tracking-wider px-3 py-1.5 flex items-center gap-2 shadow-md transition-all transform active:scale-95">
                                                        {isPlaying ? <Pause size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                                                        {isPlaying ? "HALT_FEED" : "INITIALIZE_VIDEO"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECTION: Products */}
                                    <div className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Updates & News" icon={<Code2 size={12}/>} />
                                        <div className="grid grid-cols-2 gap-px bg-zinc-300">
                                            {companyData.products.map((prod, idx) => (
                                                <div key={idx} className="bg-white p-2 group cursor-pointer">
                                                    <div className="aspect-video bg-zinc-100 mb-2 overflow-hidden border border-zinc-200 shadow-inner">
                                                        <img src={prod.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={prod.name} />
                                                    </div>
                                                    <h4 className="text-[10px] font-black uppercase text-zinc-900 mb-0.5 tracking-tight">{prod.name}</h4>
                                                    <p className="text-[9px] text-zinc-500 leading-tight line-clamp-2">{prod.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    

                                    {/* SECTION: Timeline */}
                                    <div className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Timeline" icon={<Flame size={12}/>} />
                                        <div className="p-2 space-y-2">
                                            {companyData.milestones.map((ms, idx) => (
                                                <div key={idx} className="flex gap-4 relative before:absolute before:left-2 before:top-3 before:-bottom-5 before:w-px before:bg-zinc-200 last:before:hidden">
                                                    <div className="w-4 h-4  bg-blue-500 flex items-center justify-center text-white shrink-0 z-10 mt-0.5 shadow-sm">
                                                        <div className="w-1 h-1 bg-white "/>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-mono font-black text-blue-600 tracking-tighter">{ms.year} // SYSTEM_MARK</span>
                                                        <h4 className="text-[11px] font-black uppercase text-zinc-900 tracking-tight">{ms.title}</h4>
                                                        <p className="text-[10px] text-zinc-500 leading-snug">{ms.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* SECTION: Backed By */}
                                    <div className="bg-white ">
                                        <ModuleHeader title="Backed By" icon={<Award size={12}/>} />
                                        <div className=" flex flex-wrap divide-x divide-zinc-300">
                                            {companyData.investors.map((inv, idx) => (
                                                <span key={idx} className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 p-2  uppercase tracking-tighter">
                                                    {inv}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    
                                </>
                            )}

                            {/* OTHER TABS (JOBS, EVENTS, CULTURE) */}
                            {activeTab === 'JOBS' && (
                                <div className="bg-white border-b border-zinc-300">
                                    <ModuleHeader title="Open Engineering Nodes" icon={<Briefcase size={12}/>} />
                                    {companyData.jobs.map((job, idx) => (
                                        <div key={idx} className="flex border-b border-zinc-100 last:border-0 hover:bg-zinc-50 items-center justify-between p-4">
                                            <div>
                                                <h4 className="text-[11px] font-black uppercase tracking-tight text-zinc-900">{job.title}</h4>
                                                <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{job.team} • {job.location}</p>
                                            </div>
                                            <button className="h-6 px-3 bg-zinc-100 hover:bg-zinc-900 border border-zinc-300 hover:border-zinc-900 text-zinc-800 hover:text-white text-[8px] font-mono font-black uppercase tracking-wider transition-all">
                                                Apply_Node
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'EVENTS' && (
                                <div className="bg-white border-b border-zinc-300">
                                    <ModuleHeader title="Summits, Panels & Hackathons" icon={<Calendar size={12}/>} />
                                    {companyData.events.map((evt, idx) => (
                                        <div key={idx} className="p-4 flex flex-col md:flex-row gap-4 hover:bg-zinc-50 transition-colors">
                                            <div className="w-full md:w-44 aspect-video bg-zinc-100 shrink-0 border border-zinc-200 overflow-hidden shadow-sm">
                                                <img src={evt.img} className="w-full h-full object-cover grayscale" alt={evt.title} />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-[7px] font-mono font-black bg-zinc-900 text-white px-1.5 py-0.5 uppercase tracking-wider">{evt.type}</span>
                                                        <span className="text-[9px] font-mono font-bold text-orange-600 flex items-center gap-0.5"><MapPin size={9}/>{evt.location}</span>
                                                    </div>
                                                    <h4 className="text-xs font-black uppercase tracking-tight text-zinc-900 leading-tight mb-1">{evt.title}</h4>
                                                    <p className="text-[10px] text-zinc-500 leading-normal">{evt.desc}</p>
                                                </div>
                                                <div className="flex items-center justify-between pt-2 border-t border-dashed border-zinc-200 mt-2">
                                                    <span className="text-[10px] font-mono font-black text-zinc-900">DATE: {evt.date}</span>
                                                    <button className="text-[8px] font-mono font-black text-blue-600 hover:text-zinc-900 uppercase tracking-widest flex items-center gap-1">
                                                        Registration_Pass <ExternalLink size={8}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'CULTURE' && (
                                <div className="bg-white border-b border-zinc-300">
                                    <ModuleHeader title="Life & Operational Culture" icon={<Heart size={12}/>} />
                                    <div className="p-4 space-y-4">
                                        {companyData.culture.map((cul, i) => (
                                            <div key={i} className="border-l-2 border-zinc-900 pl-4 py-1">
                                                <h4 className="text-[10px] font-black uppercase text-zinc-900 mb-0.5">{cul.title}</h4>
                                                <p className="text-[10px] italic text-zinc-700 leading-relaxed">"{cul.desc}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: CLEANED UP - NO MORE "ON THIS PAGE" SECTIONS */}
                    <aside className="w-39 shrink-0 bg-white hidden md:flex flex-col border-l border-zinc-300">
                        <div className="sticky top-13 flex flex-col h-[calc(100vh-3.5rem)]">
                            
                            {/* METRIC READOUT TELEMETRY LAYER */}
                            <div className="p-3 bg-zinc-50 flex-1 space-y-3">
                                <div>
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block tracking-wider mb-2">Metrics Matrix</span>
                                    <div className="border border-zinc-300 bg-white flex flex-col divide-y divide-zinc-200 text-[9px] font-mono p-2 rounded-sm shadow-sm">
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">Gateway Node</span>
                                            <span className="font-black text-blue-600 truncate block">{companyData.stats.domain}</span>
                                        </div>
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">Active Workspace</span>
                                            <span className="font-black text-zinc-900 block">{companyData.stats.teamCount}</span>
                                        </div>
                                        <div className="py-1.5">
                                            <span className="text-zinc-400 block text-[6px] uppercase tracking-wider">SLA Threshold</span>
                                            <span className="font-black text-emerald-600 block">{companyData.stats.responseTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BRUTALIST SOCIAL DISPATCH PANEL */}
                            <div className="p-3 bg-zinc-50 border-t border-zinc-200">
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block mb-2">Protocols</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <SocialIcon icon={<Github size={12}/>} href="https://github.com" />
                                    <SocialIcon icon={<Linkedin size={12}/>} href="https://linkedin.com" />
                                    <SocialIcon icon={<Twitter size={12}/>} href="https://twitter.com" />
                                    <SocialIcon icon={<Globe size={12}/>} href="#" />
                                </div>
                            </div>

                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- CORE UTILITY ATOMS ---

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href?: string }) => (
    <a href={href || "#"} className="aspect-square bg-white border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-950 text-zinc-600 hover:text-white flex items-center justify-center transition-all shadow-sm active:translate-y-0.5">
        {icon}
    </a>
);

const ModuleHeader = ({ title, icon }: any) => (
    <div className="px-3 py-2 bg-zinc-300 border-b border-zinc-300 flex items-center gap-2 shadow-sm">
        <span className="text-zinc-600">{icon}</span>
        <h3 className="text-[9px] font-mono font-black text-black uppercase tracking-[0.3em]">{title}</h3>
    </div>
);

const AnalyticsItem = ({ icon, label, val, sub }: any) => (
    <div className="p-3 flex flex-col gap-0.5 hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-400">
            {icon} <span className="text-[7px] font-mono font-bold uppercase">{label}</span>
        </div>
        <span className="text-xl font-black text-zinc-900 tracking-tighter leading-none">{val}</span>
        <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">{sub}</span>
    </div>
);

export default CompanyProfile;