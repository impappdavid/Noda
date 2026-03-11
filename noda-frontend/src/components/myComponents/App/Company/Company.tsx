import React, { useState, useCallback } from 'react';
import { 
    Globe, Users, Zap, ShieldCheck, Play, 
    ExternalLink, MapPin, MoreHorizontal, 
    Heart, MessageSquare, Trash2, Settings2, 
    Plus, GripHorizontal, Terminal, Code2, Target, 
    DollarSign, ChevronRight, Activity, X
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- TYPES & MOCKS ---
type TabType = 'HOME' | 'POSTS' | 'JOBS' | 'TEAM';

const INITIAL_COMPANY_DATA = {
    name: "OpenAI",
    avatar: "O",
    location: "SF, CA",
    followers: "842k",
    employees: "1.2k",
    website: "openai.com",
    description: "Standardizing the deployment of safe Artificial General Intelligence. Core architecture involves high-scale distributed clusters and recursive neural logic.",
    techStack: ["Python", "Rust", "CUDA", "PyTorch"],
    directives: [
        "Scale GPT-5 training clusters to 100k H100s",
        "Optimize inference latency by 40%"
    ]
};

const CompanyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('HOME');
    const [isConfigMode, setIsConfigMode] = useState(false);
    
    const [companyData, setCompanyData] = useState(INITIAL_COMPANY_DATA);
    const [newTech, setNewTech] = useState("");
    const [newDirective, setNewDirective] = useState("");

    const handleTabChange = useCallback((tab: TabType) => setActiveTab(tab), []);

    // --- STABILIZED EDIT HANDLERS ---
    const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTech.trim()) {
            setCompanyData(prev => ({ ...prev, techStack: [...prev.techStack, newTech.toUpperCase().trim()] }));
            setNewTech("");
        }
    };

    const handleRemoveTech = (tech: string) => {
        setCompanyData(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tech) }));
    };

    const handleAddDirective = (e: React.KeyboardEvent<HTMLInputElement> | { key: string }) => {
        if (e.key === 'Enter' && newDirective.trim()) {
            setCompanyData(prev => ({ ...prev, directives: [...prev.directives, newDirective.trim()] }));
            setNewDirective("");
        }
    };

    const handleRemoveDirective = (idx: number) => {
        setCompanyData(prev => ({ ...prev, directives: prev.directives.filter((_, i) => i !== idx) }));
    };

    // Fix: Moved the directive input change out of inline render
    const handleDirectiveChange = (idx: number, newValue: string) => {
        setCompanyData(prev => {
            const newDirs = [...prev.directives];
            newDirs[idx] = newValue;
            return { ...prev, directives: newDirs };
        });
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col">
            <Navbar />

            {/* Changed from overflow-hidden to allow native page scroll */}
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
                
                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-14 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12">
                    
                    {/* CENTER CONTENT (Grows naturally) */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        
                        {/* HERO BANNER & TERMINAL HEADER */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col">
                            
                            {/* Admin Config Bar (Overlay on Banner) */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800 backdrop-blur-sm z-20 flex justify-between items-center px-2 ">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck size={12} className="text-emerald-500" />
                                    <span className="text-[9px]  text-zinc-200 uppercase tracking-widest">Admin Access</span>
                                </div>
                                <button 
                                    onClick={() => setIsConfigMode(!isConfigMode)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 h-full text-[9px] uppercase tracking-widest transition-colors",
                                        isConfigMode ? "bg-orange-500 text-white" : "text-zinc-300 hover:text-white hover:bg-black/50"
                                    )}
                                >
                                    <Settings2 size={12} /> {isConfigMode ? "Save Config" : "Edit Mode"}
                                </button>
                            </div>

                            {/* Banner Image Asset */}
                            <div className="h-48 bg-zinc-800 overflow-hidden relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200" 
                                    className={cn("w-full h-full object-cover transition-all duration-500", isConfigMode ? "opacity-100" : "opacity-100")} 
                                    alt="Banner" 
                                />
                                {/* Industrial Dot Overlay */}
                                <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                
                                {isConfigMode && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="px-4 py-2 bg-white text-zinc-900 text-[10px]  font-semibold uppercase hover:bg-orange-500 hover:text-white transition-colors shadow-md transition-colors">
                                            Replace Banner
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Entity Identity Plate */}
                            <div className="px-2 relative pb-6 bg-white z-10">
                                
                                {/* Logo & Action Row */}
                                <div className="flex items-end justify-between -mt-14 mb-2">
                                    <div className="w-28 h-28 bg-zinc-900 border-4 border-white flex items-center justify-center shrink-0 relative group">
                                        <span className="text-white font-mono font-black text-5xl uppercase">{companyData.avatar}</span>
                                        {isConfigMode && (
                                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center cursor-pointer text-zinc-300 hover:text-white transition-colors">
                                                <Settings2 size={16} className="mb-1" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest">Swap Logo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="shrink-0 pb-1">
                                        {isConfigMode ? (
                                            <button className="h-10 px-4 border border-zinc-300 text-zinc-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-zinc-100 transition-all flex items-center gap-2 bg-white">
                                                <Plus size={12} /> Inject_Tab
                                            </button>
                                        ) : (
                                            <button className="h-9 px-6 bg-zinc-800 cursor-pointer text-white text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all active:translate-y-0.5 active:translate-x-0.5 active:shadow-none flex items-center gap-2">
                                                <Zap size={12} /> Follow
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        {isConfigMode ? (
                                            <input 
                                                value={companyData.name} 
                                                onChange={e => setCompanyData({...companyData, name: e.target.value})} 
                                                className="text-3xl font-black uppercase tracking-tighter text-zinc-900 leading-none bg-zinc-100 px-2 outline-none border border-zinc-300 focus:border-zinc-900"
                                            />
                                        ) : (
                                            <h1 className="text-3xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{companyData.name}</h1>
                                        )}
                                        <ShieldCheck size={20} className="text-emerald-600" />
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mt-2">
                                        <span className="flex items-center gap-1.5 text-zinc-900"><Globe size={12} className="text-orange-500" /> System_Entity</span>
                                        <span className="text-zinc-300">|</span>
                                        <span>ID_7382-AGI</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* TABS CONTROLLER (Sticky inside main content) */}
                        <div className="flex w-full border-y border-zinc-300 bg-zinc-50 sticky top-14 z-30 h-11 divide-x divide-zinc-300 shrink-0">
                            {(['HOME', 'POSTS', 'JOBS', 'TEAM'] as TabType[]).map((tab) => (
                                <button 
                                    key={tab} 
                                    onClick={() => handleTabChange(tab)} 
                                    className={cn(
                                        "flex-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all border-none cursor-pointer flex items-center justify-center gap-2", 
                                        activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_2px_0_0_#f97316]" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* TAB CONTENT AREAS */}
                        <div className="bg-zinc-100">
                            {/* --- TAB: HOME --- */}
                            {activeTab === 'HOME' && (
                                <div className="animate-in fade-in duration-300 flex flex-col">
                                    <div className="grid grid-cols-2 bg-zinc-300 gap-[1px]">
                                        <div className="col-span-2 bg-white relative group/module">
                                            <ModuleHeader title="Intro_Broadcast" icon={<Play size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="aspect-video w-full bg-zinc-900 relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700" alt="vid" />
                                                <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center relative z-10 group-hover:bg-orange-500 transition-colors">
                                                    <Play size={20} className="text-white ml-1" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-2 md:col-span-1 bg-white relative group/module flex flex-col">
                                            <ModuleHeader title="Protocol_Brief" icon={<Terminal size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="p-4 flex-1">
                                                {isConfigMode ? (
                                                    <textarea 
                                                        value={companyData.description} 
                                                        onChange={e => setCompanyData({...companyData, description: e.target.value})} 
                                                        className="w-full h-full min-h-[100px] text-[11px] font-medium text-zinc-800 leading-relaxed font-mono bg-zinc-50 border border-zinc-200 p-2 outline-none focus:border-zinc-900 resize-none" 
                                                    />
                                                ) : (
                                                    <p className="text-[11px] font-medium text-zinc-700 leading-relaxed font-mono">{companyData.description}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-2 md:col-span-1 bg-white relative group/module flex flex-col">
                                            <ModuleHeader title="Core_Stack" icon={<Code2 size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="p-4 flex-1 flex flex-col gap-3">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {companyData.techStack.map(tech => (
                                                        <div key={tech} className="flex items-center gap-1 border border-zinc-300 bg-zinc-50 px-2 py-1">
                                                            <span className="font-mono text-[9px] font-black uppercase text-zinc-800">{tech}</span>
                                                            {isConfigMode && <X size={10} className="cursor-pointer text-zinc-400 hover:text-red-500" onClick={() => handleRemoveTech(tech)}/>}
                                                        </div>
                                                    ))}
                                                </div>
                                                {isConfigMode && (
                                                    <input value={newTech} onChange={e => setNewTech(e.target.value)} onKeyDown={handleAddTech} placeholder="TYPE_&_ENTER..." className="w-full h-8 px-2 text-[9px] font-mono uppercase bg-white border border-dashed border-zinc-300 outline-none focus:border-zinc-900" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-2 bg-white relative group/module">
                                            <ModuleHeader title="Active_Directives" icon={<Target size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="p-4 space-y-2">
                                                {companyData.directives.map((dir, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-3 bg-zinc-50 border border-zinc-200 group/dir">
                                                        <span className="text-[10px] font-mono font-black text-orange-500 bg-orange-100 px-1 mt-0.5 shrink-0">0{idx + 1}</span>
                                                        {isConfigMode ? (
                                                            <input 
                                                                value={dir} 
                                                                onChange={e => handleDirectiveChange(idx, e.target.value)} 
                                                                className="flex-1 text-xs font-bold text-zinc-800 uppercase tracking-tight leading-snug bg-transparent outline-none border-b border-dashed border-zinc-300 focus:border-zinc-900" 
                                                            />
                                                        ) : (
                                                            <span className="text-xs font-bold text-zinc-800 uppercase tracking-tight leading-snug flex-1">{dir}</span>
                                                        )}
                                                        {isConfigMode && <button onClick={() => handleRemoveDirective(idx)} className="opacity-0 group-hover/dir:opacity-100 text-zinc-300 hover:text-red-500"><Trash2 size={14}/></button>}
                                                    </div>
                                                ))}
                                                {isConfigMode && (
                                                    <div className="flex gap-2">
                                                        <input value={newDirective} onChange={e => setNewDirective(e.target.value)} onKeyDown={handleAddDirective} placeholder="ENTER_NEW_DIRECTIVE..." className="flex-1 h-10 px-3 text-[10px] font-bold uppercase bg-white border border-dashed border-zinc-300 outline-none focus:border-zinc-900" />
                                                        <button onClick={() => handleAddDirective({ key: 'Enter' })} className="h-10 px-4 bg-zinc-900 text-white text-[9px] font-mono uppercase tracking-widest hover:bg-orange-500">Inject</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* --- TAB: POSTS --- */}
                            {activeTab === 'POSTS' && (
                                <div className="flex flex-col bg-zinc-300 gap-[1px] animate-in fade-in">
                                    <PostMock title="System architecture upgraded. Vectors mapped." time="2H_AGO" likes={102} comments={24} />
                                    <PostMock title="New hiring protocols deployed for Q3 recruitment." time="1D_AGO" likes={44} comments={5} />
                                    <PostMock title="Optimizing latency across distributed nodes." time="3D_AGO" likes={210} comments={89} />
                                </div>
                            )}

                            {/* --- TAB: JOBS --- */}
                            {activeTab === 'JOBS' && (
                                <div className="flex flex-col bg-zinc-300 gap-[1px] animate-in fade-in">
                                    <div className="bg-zinc-50 px-4 py-3 flex items-center justify-between border-b border-zinc-300">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Active_Vacancies</span>
                                        <div className="border border-orange-500 text-orange-600 text-[8px] font-mono uppercase px-1.5 py-0.5 font-bold">03_Nodes_Open</div>
                                    </div>
                                    <JobMock role="Lead Systems Architect" loc="SF, CA" pay="200k - 250k" />
                                    <JobMock role="Vector Database Engineer" loc="Remote" pay="180k - 220k" />
                                    <JobMock role="Security Logic Analyst" loc="New York" pay="150k - 190k" />
                                </div>
                            )}

                            {/* --- TAB: TEAM --- */}
                            {activeTab === 'TEAM' && (
                                <div className="flex flex-col bg-zinc-300 gap-[1px] animate-in fade-in border-b border-zinc-300">
                                    <div className="flex items-center px-4 h-10 bg-zinc-50 border-b border-zinc-300">
                                        <span className="flex-1 text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">Node_Identity</span>
                                        <span className="w-32 text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">Clearance_Role</span>
                                        <span className="w-12 text-center text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">Status</span>
                                    </div>
                                    <TeamMock name="Sam Altman" role="CEO" status="active" />
                                    <TeamMock name="Ilya Sutskever" role="Chief Scientist" status="away" />
                                    <TeamMock name="Mira Murati" role="CTO" status="active" />
                                    <TeamMock name="Greg Brockman" role="President" status="active" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* REDESIGNED MAX-W-40 STICKY SIDEBAR */}
                    <aside className="w-39 shrink-0 bg-zinc-50/80  border-zinc-200 relative hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">
                            
                            <div className="p-2 bg-zinc-800 border-b border-zinc-700 shrink-0">
                                <div className="flex items-center gap-1.5">
                                    <Globe size={12} className="text-orange-500" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-white">System_Status</span>
                                </div>
                            </div>

                            <div className="p-2 border-b border-zinc-300 bg-white space-y-2 shrink-0">
                                <SidebarStat label="Nodes" value={companyData.followers} />
                                <SidebarStat label="Staff" value={companyData.employees} />
                                <SidebarStat label="Base" value={companyData.location} />
                            </div>

                            <div className="p-2 border-b border-zinc-300 bg-zinc-50 flex-1 space-y-3">
                                <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-200">
                                    <Activity size={10} className="text-orange-500" />
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Diagnostics</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[8px] font-mono font-black text-zinc-500 uppercase">Load</span>
                                            <span className="text-[9px] font-mono font-bold text-zinc-900">42%</span>
                                        </div>
                                        <div className="h-1 w-full bg-zinc-300"><div className="h-full bg-zinc-900 w-[42%]" /></div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[8px] font-mono font-black text-zinc-500 uppercase">Uptime</span>
                                            <span className="text-[9px] font-mono font-bold text-emerald-600">99.9%</span>
                                        </div>
                                        <div className="h-1 w-full bg-zinc-300"><div className="h-full bg-emerald-500 w-[99.9%]" /></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-white mt-auto shrink-0 border-t border-zinc-200">
                                <button className="w-full flex items-center justify-between p-2 border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-50 transition-colors group">
                                    <div className="flex flex-col text-left">
                                        <span className="text-[7px] font-mono font-black text-zinc-400 uppercase tracking-widest mb-0.5">Primary_Web</span>
                                        <span className="text-[8px] font-bold uppercase text-zinc-900 truncate max-w-[80px]">{companyData.website}</span>
                                    </div>
                                    <ExternalLink size={10} className="text-zinc-400 group-hover:text-zinc-900" />
                                </button>
                            </div>
                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---
const ModuleHeader = ({ title, icon, isConfigMode }: { title: string, icon: React.ReactNode, isConfigMode: boolean }) => (
    <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-200 bg-zinc-50/80">
        <div className="flex items-center gap-2">
            <span className="text-zinc-400">{icon}</span>
            <h3 className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">{title}</h3>
        </div>
        {isConfigMode && (
            <div className="flex items-center gap-2 opacity-0 group-hover/module:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-zinc-200 text-zinc-400 cursor-grab"><GripHorizontal size={10} /></button>
                <button className="p-1 hover:bg-red-100 text-zinc-400 hover:text-red-600"><Trash2 size={10} /></button>
            </div>
        )}
    </div>
);

const SidebarStat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">{label}</span>
        <span className="text-[9px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
);

// --- NATIVE TAB MOCK COMPONENTS ---
const PostMock = ({ title, time, likes, comments }: any) => (
    <div className="p-4 bg-white hover:bg-zinc-50 cursor-pointer group flex items-start gap-4">
        <div className="w-8 h-8 bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
            <Terminal size={12} className="text-zinc-400" />
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <span className="text-[9px] font-mono font-black text-orange-500 uppercase tracking-widest">Transmission // {time}</span>
                <MoreHorizontal size={14} className="text-zinc-300 group-hover:text-zinc-600" />
            </div>
            <p className="text-sm font-bold text-zinc-800 leading-snug mb-3">{title}</p>
            <div className="flex items-center gap-6 text-[10px] font-mono font-bold text-zinc-400">
                <span className="flex items-center gap-1.5 hover:text-zinc-900"><Heart size={12}/> {likes}</span>
                <span className="flex items-center gap-1.5 hover:text-zinc-900"><MessageSquare size={12}/> {comments}</span>
            </div>
        </div>
    </div>
);

const JobMock = ({ role, loc, pay }: any) => (
    <div className="p-4 bg-white hover:bg-zinc-50 cursor-pointer group flex justify-between items-center">
        <div>
            <h4 className="text-sm font-black uppercase tracking-tight group-hover:underline">{role}</h4>
            <div className="flex items-center gap-3 text-[9px] font-mono font-bold text-zinc-500 uppercase mt-1">
                <span className="flex items-center gap-1"><MapPin size={10} /> {loc}</span>
                <span className="flex items-center gap-1"><DollarSign size={10} /> {pay}</span>
            </div>
        </div>
        <ChevronRight size={14} className="text-zinc-300 group-hover:text-orange-500 transition-colors" />
    </div>
);

const TeamMock = ({ name, role, status }: any) => (
    <div className="flex items-center px-4 h-12 bg-white hover:bg-zinc-50 group cursor-pointer transition-colors">
        <div className="flex-1 flex items-center gap-3">
            <div className="w-6 h-6 bg-zinc-900 flex items-center justify-center text-[10px] font-black text-white">{name[0]}</div>
            <span className="text-[11px] font-bold uppercase tracking-tight">{name}</span>
        </div>
        <div className="w-32 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{role}</div>
        <div className="w-12 flex justify-center">
            <div className={cn("w-1.5 h-1.5 rounded-full", status === 'active' ? "bg-emerald-500 animate-pulse" : "bg-zinc-300")} />
        </div>
    </div>
);

export default CompanyPage;