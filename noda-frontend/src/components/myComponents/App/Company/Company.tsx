import React, { useState } from 'react';
import { 
    Globe, Users, Star, Activity, MapPin, 
    ShieldCheck, Zap, MessageSquare, Briefcase, 
    ChevronRight, Calendar, Info, Plus, ArrowUpRight, 
    Clock, Terminal, Search, Share, MoreHorizontal, Bookmark, DollarSign,
    Heart
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import { Link, useNavigate } from 'react-router-dom';

// Using your provided post example style for the feed logic
const CompanyPage = () => {
    const [activeTab, setActiveTab] = useState('HOME');

    const companyData = {
        name: "OpenAI",
        avatar: "O",
        location: "San Francisco, CA",
        country: "USA",
        followers: "842k",
        employees: "1,200+",
        rating: "4.8",
        description: "Standardizing the deployment of safe Artificial General Intelligence. Core architecture involves high-scale distributed clusters and recursive neural logic.",
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    
                    {/* 1. BRANDED HEADER AREA */}
                    <div className="relative shrink-0">
                        <div className="h-32 w-full bg-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                        </div>
                        
                        <div className="px-6 -mt-10 relative z-10 flex items-end justify-between">
                            <div className="flex items-end gap-4">
                                <div className="w-24 h-24 bg-zinc-900 border-4 border-white flex items-center justify-center shadow-xl">
                                    <span className="text-4xl font-black text-white font-mono">{companyData.avatar}</span>
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">{companyData.name}</h1>
                                    <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">
                                        {companyData.location} // {companyData.country}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 pb-1">
                                <button className="h-9 px-4 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black transition-colors">
                                    Follow_Node
                                </button>
                                <button className="h-9 w-9 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 cursor-pointer">
                                    <Share size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-4 flex items-center gap-6 border-b border-zinc-200">
                            <div className="flex flex-col">
                                <span className="text-xs font-black">{companyData.followers}</span>
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Following_Count</span>
                            </div>
                            <div className="w-[1px] h-6 bg-zinc-100" />
                            <div className="flex flex-col">
                                <span className="text-xs font-black">{companyData.employees}</span>
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Active_Nodes</span>
                            </div>
                            <div className="w-[1px] h-6 bg-zinc-100" />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <Star size={10} className="text-orange-500 fill-orange-500" />
                                    <span className="text-xs font-black">{companyData.rating}</span>
                                </div>
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Signal_Rating</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. SUB-NAVIGATION (NO GAP STYLE) */}
                    <div className="flex bg-white sticky top-0 z-10 border-b border-zinc-300">
                        {['HOME', 'POSTS', 'JOBS', 'TEAM'].map((tab) => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative",
                                    activeTab === tab ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:bg-zinc-50"
                                )}
                            >
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900" />}
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 3. CONTENT CORE */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        
                        {activeTab === 'HOME' && (
                            <div className="p-4 space-y-8 animate-in fade-in duration-300">
                                <section>
                                    <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">About_Protocol</h4>
                                    <p className="text-sm font-semibold text-zinc-900 leading-relaxed max-w-2xl border-l-2 border-zinc-100 ">
                                        {companyData.description}
                                    </p>
                                </section>
                                <section>
                                    <h4 className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">Scheduled_Syncs</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-300 border border-zinc-300">
                                        <EventCompact date="FEB 14" title="AGI Deployment Webinar" />
                                        <EventCompact date="MAR 02" title="Developer Onboarding" />
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'POSTS' && (
                            <div className="divide-y divide-zinc-300 animate-in fade-in duration-300">
                                <SocialPost author="OpenAI" username="@openai" role="System Admin" time="2h" content="Applying the 14-day anti-ghosting protocol has significantly improved our response velocity." />
                                <SocialPost author="OpenAI" username="@openai" role="System Admin" time="1d" content="New technical documentation for the O1 Model node interface is now available." />
                            </div>
                        )}

                        {activeTab === 'JOBS' && (
                            <div className="divide-y divide-zinc-300 animate-in fade-in duration-300">
                                <JobListing role="Lead Systems Architect" location="SF (Hybrid)" pay="$180k - $240k" time="2d" match="96" />
                                <JobListing role="Security Researcher" location="Remote" pay="$160k - $210k" time="4d" match="91" />
                            </div>
                        )}

                        {activeTab === 'TEAM' && (
                            <div className="flex flex-col animate-in fade-in duration-300">
                                <div className="border-b border-zinc-300 sticky top-0 bg-white z-20">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 text-zinc-400" size={14} />
                                        <input 
                                            placeholder="SEARCH_TEAM_NODES..." 
                                            className="w-full h-10 bg-zinc-50 pl-10 pr-4 text-xs font-mono font-bold uppercase outline-none"
                                        />
                                    </div>
                                </div>
                                {/* NO GAP - DIVIDE STYLE */}
                                <div className="divide-y divide-zinc-300">
                                    <UserCard name="Sam Altman" role="Protocol Head" verified />
                                    <UserCard name="Mira Murati" role="Technical Architect" verified />
                                    <UserCard name="Alex Rivers" role="Lead Systems Engineer" />
                                    <UserCard name="Jordan Vane" role="Security Node" />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- COMPONENTS STYLED AS PER MAIN POST EXAMPLE ---

const SocialPost = ({ author, username, role, time, content }: any) => {
    const navigate = useNavigate();

    // Prevent button clicks from triggering the parent Link
    const handleAction = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Logic for Like/Boost/etc goes here
    };

    return (
        <div className="border-b border-zinc-300">
            <Link 
                to={`/app/post/${author}`} 
                className="block hover:bg-zinc-200/60 transition-colors group p-4"
            >
                <div className="flex justify-between items-start mb-1">
                    <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 border border-zinc-200 bg-zinc-900 flex items-center justify-center font-black text-white shrink-0">
                            {author[0]}
                        </div>
                        
                        {/* Meta */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-zinc-900 hover:underline cursor-pointer">
                                    {author}
                                </span>
                                <span className="text-xs font-mono text-zinc-400 uppercase">
                                    {username}
                                </span>
                            </div>
                            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                                {role} • {time}
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleAction}
                        className="text-zinc-500 hover:text-zinc-900 p-1 hover:bg-zinc-300/50 transition-colors"
                    >
                        <MoreHorizontal size={16} />
                    </button>
                </div>

                {/* Content Area - Indented to match Avatar width + Gap */}
                <div className="pl-[52px]">
                    <p className="text-sm text-zinc-800 leading-relaxed mb-3">
                        {content}
                    </p>

                    {/* Action Row */}
                    <div className="flex items-center gap-8 pt-2">
                        <button 
                            onClick={handleAction}
                            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                            <Heart size={16} /> 102
                        </button>
                        <button 
                            onClick={handleAction}
                            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                            <MessageSquare size={16} /> 24
                        </button>
                        <button 
                            onClick={handleAction}
                            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-orange-600 transition-colors cursor-pointer"
                        >
                            <Zap size={16} /> Boost
                        </button>
                        <button 
                            onClick={handleAction}
                            className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer ml-auto"
                        >
                            <Share size={16} />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const JobListing = ({ role, location, pay, time, match }: any) => (
    <div className="p-4 bg-white hover:bg-zinc-200/60 transition-colors cursor-pointer group flex justify-between items-center">
        <div className="space-y-1">
            <span className="text-[9px] font-mono font-black text-orange-600 uppercase tracking-widest">Active_Sequence • {time}</span>
            <h4 className="text-sm font-black uppercase tracking-tighter group-hover:underline">{role}</h4>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-500 uppercase">
                <span className="flex items-center gap-1"><MapPin size={10} /> {location}</span>
                <span className="flex items-center gap-1"><DollarSign size={10} /> {pay}</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
             <div className="px-2 py-1 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase">{match}%_Match</div>
             <ChevronRight size={16} className="text-zinc-500" />
        </div>
    </div>
);

const UserCard = ({ name, role, verified }: any) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-200/60 transition-colors group cursor-pointer bg-white">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center font-black text-white text-xs">
                {name[0]}
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <h5 className="text-sm font-bold uppercase tracking-tight leading-none">{name}</h5>
                    {verified && <ShieldCheck size={12} className="text-blue-500" />}
                </div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">{role}</p>
            </div>
        </div>
        <button className="h-8 px-4 border border-zinc-900 text-[9px] font-mono font-black uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer">
            Ping_Node
        </button>
    </div>
);

const EventCompact = ({ date, title }: any) => (
    <div className="flex items-center bg-white p-3 hover:bg-zinc-50 transition-colors cursor-pointer">
        <div className="w-10 h-10 bg-zinc-900 text-white flex flex-col items-center justify-center shrink-0">
            <span className="text-[6px] font-mono font-black leading-none uppercase">{date.split(' ')[0]}</span>
            <span className="text-xs font-black leading-none">{date.split(' ')[1]}</span>
        </div>
        <div className="ml-3">
            <h5 className="text-[10px] font-black uppercase tracking-tight leading-none">{title}</h5>
            <span className="text-[8px] font-mono font-bold text-orange-600 uppercase mt-1 block tracking-widest underline decoration-orange-200">Initialize_Sync</span>
        </div>
    </div>
);

export default CompanyPage;