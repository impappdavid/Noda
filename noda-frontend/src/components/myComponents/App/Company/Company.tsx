import React, { useState } from 'react';
import { Share, Star, Search } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import { SocialPost, JobListing, UserCard } from './CompanyTabs';
import type { CompanyData, TabType } from '@/types/company';

const COMPANY_MOCK: CompanyData = {
    name: "OpenAI",
    avatar: "O",
    location: "San Francisco, CA",
    country: "USA",
    followers: "842k",
    employees: "1,200+",
    rating: "4.8",
    description: "Standardizing the deployment of safe Artificial General Intelligence. Core architecture involves high-scale distributed clusters and recursive neural logic.",
};

const CompanyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('HOME');

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    {/* BRANDED HEADER AREA */}
                    <header className="relative shrink-0">
                        <div className="h-32 w-full bg-zinc-900 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                        </div>
                        
                        <div className="px-6 -mt-10 relative z-10 flex items-end justify-between">
                            <div className="flex items-end gap-4">
                                <div className="w-24 h-24 bg-zinc-900 border-4 border-white flex items-center justify-center shadow-xl">
                                    <span className="text-4xl font-black text-white font-mono">{COMPANY_MOCK.avatar}</span>
                                </div>
                                <div className="pb-1">
                                    <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">{COMPANY_MOCK.name}</h1>
                                    <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">
                                        {COMPANY_MOCK.location} // {COMPANY_MOCK.country}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2 pb-1">
                                <button className="h-9 px-4 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-black transition-colors">Follow_Node</button>
                                <button className="h-9 w-9 border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 cursor-pointer"><Share size={14} /></button>
                            </div>
                        </div>

                        <div className="px-6 py-4 flex items-center gap-6 border-b border-zinc-200">
                            <Stat label="Following_Count" value={COMPANY_MOCK.followers} />
                            <div className="w-[1px] h-6 bg-zinc-100" />
                            <Stat label="Active_Nodes" value={COMPANY_MOCK.employees} />
                            <div className="w-[1px] h-6 bg-zinc-100" />
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <Star size={10} className="text-orange-500 fill-orange-500" />
                                    <span className="text-xs font-black">{COMPANY_MOCK.rating}</span>
                                </div>
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Signal_Rating</span>
                            </div>
                        </div>
                    </header>

                    {/* SUB-NAVIGATION */}
                    <nav className="flex bg-white sticky top-0 z-10 border-b border-zinc-300">
                        {(['HOME', 'POSTS', 'JOBS', 'TEAM'] as TabType[]).map((tab) => (
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
                    </nav>

                    {/* CONTENT CORE */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {activeTab === 'HOME' && (
                            <div className="p-4 space-y-8 animate-in fade-in duration-300">
                                <section>
                                    <h4 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">About_Protocol</h4>
                                    <p className="text-sm font-semibold text-zinc-900 leading-relaxed max-w-2xl border-l-2 border-zinc-100 pl-4">{COMPANY_MOCK.description}</p>
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
                                        <input placeholder="SEARCH_TEAM_NODES..." className="w-full h-10 bg-zinc-50 pl-10 pr-4 text-xs font-mono font-bold uppercase outline-none" />
                                    </div>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                    <UserCard name="Sam Altman" role="Protocol Head" verified />
                                    <UserCard name="Mira Murati" role="Technical Architect" verified />
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col">
        <span className="text-xs font-black">{value}</span>
        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">{label}</span>
    </div>
);

export default CompanyPage;