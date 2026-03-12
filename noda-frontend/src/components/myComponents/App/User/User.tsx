import React, { useState, useCallback, useMemo } from 'react';
import { 
    BadgeCheck, GraduationCap, Heart, MessageSquare, Eye, 
    MoreHorizontal, ShieldCheck, Settings2, Plus, Zap, Globe, Terminal, Briefcase, Code2, Trash2, 
    Github, Twitter, Linkedin, X, GripHorizontal
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

// --- TYPES & MOCKS ---
type TabType = 'ABOUT' | 'POSTS';

const INITIAL_USER_DATA = {
    name: "John Doe",
    username: "@johndoe_sys",
    avatar: "JD",
    role: "Lead Systems Architect",
    org: "Noda Labs",
    location: "SF, CA",
    followers: "12.4k",
    website: "johndoe.dev",
    description: "Specializing in memory-safe distributed protocols. Scaling decentralized node clusters and optimizing zero-copy serialization in Rust.",
    skills: ["Rust", "Go", "K8s", "TypeScript", "eBPF", "PostgreSQL"],
    socials: {
        github: "github.com/johndoe",
        twitter: "x.com/johndoe",
        linkedin: "in/johndoe"
    },
    experience: [
        { role: "Lead Engineer", org: "Noda Labs", date: "2024 - PRES" },
        { role: "Senior Dev", org: "Vercel", date: "2021 - 2024" }
    ],
    education: { degree: "MS Computer Science", org: "MIT" }
};

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('ABOUT');
    const [isConfigMode, setIsConfigMode] = useState(false);
    const [userData, setUserData] = useState(INITIAL_USER_DATA);
    const [newSkill, setNewSkill] = useState("");

    const handleTabChange = useCallback((tab: TabType) => setActiveTab(tab), []);

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            setUserData(prev => ({ 
                ...prev, 
                skills: [...prev.skills, newSkill.toUpperCase().trim()] 
            }));
            setNewSkill("");
        }
    };

    const handleRemoveSkill = (skillName: string) => {
        setUserData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillName) }));
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
                
                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative">
                    <div className="sticky top-14 h-fit py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12">
                    
                    {/* CENTER CONTENT */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300">
                        
                        {/* USER BANNER & IDENTITY PLATE */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col">
                            <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900/90 backdrop-blur-sm z-20 flex justify-between items-center px-3 ">
                                <div className="flex items-center gap-1">
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                    <span className="text-[9px] font-semibold text-zinc-300 uppercase ">Admin Access</span>
                                </div>
                                <button 
                                    onClick={() => setIsConfigMode(!isConfigMode)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 h-full text-[9px] font-mono font-black uppercase tracking-widest transition-colors",
                                        isConfigMode ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white hover:bg-black/50"
                                    )}
                                >
                                    <Settings2 size={12} /> {isConfigMode ? "Save_Profile" : "Edit_Mode"}
                                </button>
                            </div>

                            <div className="h-40 bg-zinc-900 overflow-hidden relative group">
                                <img 
                                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" 
                                    className={cn("w-full h-full object-cover transition-all duration-500")} 
                                    alt="Banner" 
                                />
                                <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                {isConfigMode && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="px-4 py-2 bg-white text-zinc-900 text-[10px] font-bold uppercase hover:bg-orange-500 hover:text-white transition-colors shadow-md cursor-pointer">
                                            Replace Banner
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="px-3 relative pb-3 bg-white z-10">
                                <div className="flex items-end justify-between -mt-14 mb-2">
                                    <div className="w-28 h-28 bg-zinc-800 border-4 border-white flex items-center justify-center shrink-0 relative group">
                                        <span className="text-white font-mono font-black text-5xl uppercase">{userData.avatar}</span>
                                        {isConfigMode && (
                                            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center cursor-pointer text-zinc-300 hover:text-white transition-colors">
                                                <Settings2 size={16} className="mb-1" />
                                                <span className="text-[9px] font-mono uppercase tracking-widest">Swap Picture</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="shrink-0 pb-1">
                                        {isConfigMode ? (
                                            <button className="h-10 px-4 border border-zinc-300 text-zinc-600 text-[9px] font-mono font-black uppercase tracking-widest hover:bg-zinc-100 transition-all flex items-center gap-2 bg-white">
                                                <Plus size={12} /> Inject_Tab
                                            </button>
                                        ) : (
                                            <button className="h-10 px-6 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase tracking-[0.2em] hover:bg-orange-500 transition-all active:translate-y-0.5 active:translate-x-0.5 cursor-pointer active:shadow-none flex items-center gap-2">
                                                <Zap size={12} /> Connect
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        {isConfigMode ? (
                                            <input 
                                                value={userData.name} 
                                                onChange={e => setUserData({...userData, name: e.target.value})} 
                                                className="text-2xl font-bold uppercase tracking-tighter text-zinc-900 leading-none bg-zinc-100 px-2 outline-none border border-zinc-300 focus:border-zinc-900"
                                            />
                                        ) : (
                                            <h1 className="text-2xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{userData.name}</h1>
                                        )}
                                        <BadgeCheck size={20} className="text-emerald-600" />
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-2">
                                        <span className="flex items-center gap-1.5 text-zinc-900">{userData.role}</span>
                                        <span className="text-zinc-400">|</span>
                                        <span>@{userData.org}</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <GithubGrid />

                        {/* TABS CONTROLLER */}
                        <div className="flex w-full border-b border-zinc-300 bg-zinc-50 sticky top-14 z-30 h-11 divide-x divide-zinc-300 shrink-0">
                            {(['ABOUT', 'POSTS'] as TabType[]).map((tab) => (
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

                        {/* MODULAR CONTENT ENGINE */}
                        <div className="flex-1">
                            {activeTab === 'ABOUT' && (
                                <div className="animate-in fade-in duration-300 flex flex-col">
                                    <div className="grid grid-cols-1 gap-[1px]">
                                        
                                        <div className="bg-white relative flex flex-col group/module border-b border-zinc-300">
                                            <ModuleHeader title="About Me" icon={<Terminal size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="p-3">
                                                {isConfigMode ? (
                                                    <textarea 
                                                        value={userData.description} 
                                                        onChange={e => setUserData({...userData, description: e.target.value})} 
                                                        className="w-full min-h-[60px] text-[11px] font-medium text-zinc-900 leading-relaxed font-mono bg-zinc-50 border border-zinc-200 p-2 outline-none focus:border-zinc-900 resize-none" 
                                                    />
                                                ) : (
                                                    <p className="text-xs font-medium text-zinc-900 leading-relaxed ">{userData.description}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-white relative flex flex-col group/module">
                                            <ModuleHeader title="Experience" icon={<Briefcase size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="flex flex-col divide-y divide-zinc-300">
                                                {userData.experience.map((exp, idx) => (
                                                    <div key={idx} className="flex group hover:bg-zinc-400/40 transition-colors">
                                                        <div className="w-28 shrink-0 p-3 border-r border-zinc-300 flex flex-col justify-center group-hover:bg-zinc-100 transition-colors">
                                                            <span className="text-[9px]  font-bold text-zinc-900 uppercase tracking-widest">{exp.date}</span>
                                                            <span className="text-[8px]  font-bold text-orange-500 uppercase mt-1 tracking-widest">Duration_0{idx+1}</span>
                                                        </div>
                                                        <div className="p-3 flex-1 flex flex-col justify-center">
                                                            <div className="flex items-center justify-between">
                                                                <h4 className="text-[12px] font-bold uppercase text-zinc-900 tracking-tight">{exp.role}</h4>
                                                                <div className="flex items-center gap-1 border border-emerald-500/30 bg-emerald-50 text-emerald-600 px-1.5 py-0.5">
                                                                    <ShieldCheck size={12} />
                                                                    <span className="text-[9px] font-mono font-black uppercase">Verified</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest hover:underline cursor-pointer">
                                                                {exp.org}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white relative flex flex-col group/module border-b border-zinc-300">
                                            <ModuleHeader title="Education" icon={<GraduationCap size={12}/>} isConfigMode={isConfigMode} />
                                            <div className="grid grid-cols-2 divide-x divide-zinc-300">
                                                <div className="p-3 group hover:bg-zinc-400/40 transition-colors">
                                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block ">Institution_Node</span>
                                                    <span className="text-[11px] font-bold text-zinc-900 uppercase flex items-center gap-2">
                                                        {userData.education.org}
                                                    </span>
                                                </div>
                                                <div className="p-3 group hover:bg-zinc-400/40 transition-colors">
                                                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] block ">Specialization</span>
                                                    <span className="text-[11px] font-bold text-zinc-900 uppercase">{userData.education.degree}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {activeTab === 'POSTS' && (
                                <div className="flex flex-col bg-zinc-300 gap-[1px] animate-in fade-in">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="p-4 bg-white hover:bg-zinc-50 cursor-pointer group flex items-start gap-4">
                                            <div className="w-8 h-8 bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
                                                <Terminal size={12} className="text-zinc-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[9px] font-mono font-black text-orange-500 uppercase tracking-widest">Node_Signal_0x{i}</span>
                                                    <MoreHorizontal size={14} className="text-zinc-300 group-hover:text-zinc-600" />
                                                </div>
                                                <h5 className="text-[11px] font-bold uppercase mb-1 text-zinc-900">Distributed Latency Benchmarks</h5>
                                                <p className="text-xs text-zinc-500 font-semibold tracking-tight line-clamp-2 mb-3">Initial data suggests zero-copy serialization outperforms traditional methods...</p>
                                                <div className="flex items-center gap-6 border-t border-zinc-200 pt-2 px-0.5">
                                                    <PostStat icon={<Heart size={12} />} count="42" />
                                                    <PostStat icon={<MessageSquare size={12} />} count="12" />
                                                    <PostStat icon={<Eye size={12} />} count="1.2k" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STREAMLINED NETWORK & SPECS SIDEBAR */}
                    <aside className="w-40 shrink-0 bg-white relative hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">
                            
                            {/* NODE STATUS */}
                            <div className="p-2 bg-zinc-800 text-white shrink-0">
                                <div className="flex items-center gap-1">
                                    <span className="text-[9px] font-semibold text-zinc-300 uppercase ">Quick View</span>
                                </div>
                            </div>

                            {/* BASE INFO */}
                            <div className="p-2 border-b border-zinc-300 bg-white space-y-2 shrink-0">
                                <SidebarStat label="Total Exp" value="6.5_YRS" />
                                <SidebarStat label="Base Loc" value={userData.location} />
                            </div>

                            {/* CORE STACK */}
                            <div className="p-2 border-b border-zinc-300 bg-zinc-50 flex-1 overflow-hidden flex flex-col">
                                <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-200 mb-3 shrink-0">
                                    <Code2 size={10} className="text-zinc-600" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Stack</span>
                                </div>
                                <div className="flex flex-wrap gap-1 overflow-y-auto scrollbar-hide content-start">
                                    {userData.skills.map(skill => (
                                        <div key={skill} className="flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-0.5">
                                            <span className="text-[9px] font-mono font-black text-zinc-700 uppercase">{skill}</span>
                                            {isConfigMode && <X size={8} className="cursor-pointer text-zinc-400 hover:text-red-500" onClick={() => handleRemoveSkill(skill)} />}
                                        </div>
                                    ))}
                                </div>
                                {isConfigMode && (
                                    <input 
                                        value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={handleAddSkill} 
                                        placeholder="ADD_SKILL..." className="w-full mt-2 h-7 px-2 shrink-0 text-[8px] font-mono uppercase bg-white border border-dashed border-zinc-300 outline-none focus:border-zinc-900" 
                                    />
                                )}
                            </div>

                            {/* NETWORK LINKS */}
                            <div className=" bg-white shrink-0 ">
                                <div className="flex items-center gap-1.5 p-2 border-b border-zinc-300 bg-zinc-800">
                                    <Globe size={10} className="text-zinc-300" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-300">Network Links</span>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                <SocialLink icon={<Globe size={10} />} label="Primary_Web" value={userData.website} />
                                <SocialLink icon={<Github size={10} />} label="Github" value={userData.socials.github} />
                                <SocialLink icon={<Twitter size={10} />} label="X_Network" value={userData.socials.twitter} />
                                <SocialLink icon={<Linkedin size={10} />} label="LinkedIn" value={userData.socials.linkedin} />
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
const ModuleHeader = ({ title, icon, isConfigMode }: { title: string, icon: React.ReactNode, isConfigMode: boolean }) => (
    <div className="flex justify-between items-center px-3 py-2 border-b border-zinc-300">
        <div className="flex items-center gap-2">
            <span className="text-zinc-500">{icon}</span>
            <h3 className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">{title}</h3>
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

const SocialLink = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col group cursor-pointer   p-1.5 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-500 mb-0.5 group-hover:text-orange-600 transition-colors">
            {icon}
            <span className="text-[9px] font-mono font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[9px] font-bold text-zinc-900 truncate w-full pl-4">{value}</span>
    </div>
);

const PostStat = ({ icon, count }: any) => (
    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
        {icon}
        <span className="text-[11px] font-mono font-black uppercase tracking-tighter">{count}</span>
    </div>
);

const GithubGrid: React.FC = () => {
    const columns = useMemo(() => Array.from({ length: 48 }).map(() => Array.from({ length: 7 }).map(() => Math.random())), []);
    return (
        <div className="p-4 border-b border-zinc-300 w-full bg-white shrink-0">
            <h3 className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                <Github size={12} className="text-zinc-900"/> System_Activity_Grid
            </h3>
            <div className="flex gap-[2px] overflow-hidden justify-between bg-zinc-50/50 p-3 border border-zinc-200">
                {columns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-[2px]">
                        {col.map((intensity, rowIdx) => (
                            <div key={rowIdx} className={cn("w-[7px] h-[7px] shrink-0", intensity > 0.85 ? "bg-emerald-600" : intensity > 0.6 ? "bg-emerald-400" : intensity > 0.3 ? "bg-emerald-200" : "bg-zinc-200")} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;