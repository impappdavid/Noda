import React, { useState, useRef } from 'react';
import { 
    BadgeCheck, GraduationCap, Zap, Globe, Terminal, Briefcase, Code2, 
    Github, Twitter, Linkedin, BarChart3, TrendingUp, Users, Search, 
    Quote, Settings2
} from 'lucide-react';
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
    skills: ["Rust", "Distributed Systems", "Kubernetes", "eBPF", "PostgreSQL", "System Design"],
    experience: [
        { role: "Lead Engineer", org: "Noda Labs", date: "2024 - PRES", logo: "NL" },
        { role: "Senior Dev", org: "Vercel", date: "2021 - 2024", logo: "VC" }
    ],
    education: [
        { degree: "MS Computer Science", org: "MIT", date: "2021", logo: "MT" }
    ],
    certifications: [
        { name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023" },
        { name: "CKA: Kubernetes Admin", issuer: "CNCF", date: "2022" }
    ],
    projects: [
        { name: "Hyper-Node", desc: "Low-latency P2P networking layer.", img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=400&q=80" },
        { name: "Zero-Copy-JS", desc: "Binary serialization for Node.js.", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80" }
    ],
    recommendations: [
        { name: "Sarah Chen", role: "CTO @ Vercel", text: "One of the most technically gifted architects I've worked with." }
    ],
    volunteering: [{ role: "Mentor", org: "Code for Good", date: "2022" }],
    languages: ["English (Native)", "Japanese (N2)"],
    honors: ["Open Source Contributor 2023"]
};

const UserProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('ABOUT');
    const [isConfigMode, setIsConfigMode] = useState(false);
    const [userData] = useState(INITIAL_USER_DATA);

    const sectionRefs = {
        analytics: useRef<HTMLDivElement>(null),
        about: useRef<HTMLDivElement>(null),
        experience: useRef<HTMLDivElement>(null),
        projects: useRef<HTMLDivElement>(null),
        skills: useRef<HTMLDivElement>(null),
        education: useRef<HTMLDivElement>(null),
        certs: useRef<HTMLDivElement>(null),
        recs: useRef<HTMLDivElement>(null),
        volunteering: useRef<HTMLDivElement>(null),
        misc: useRef<HTMLDivElement>(null),
    };

    const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="w-full text-zinc-900 font-sans flex flex-col relative ">

            <div className="max-w-4xl mx-auto  flex flex-1 w-full gap-4 relative">
                
                

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen flex-row ">
                    
                    <div className="flex-1 flex flex-col   mb-64">
                        
                        {/* IDENTITY PLATE */}
                        <section className="relative shrink-0 bg-white border-b border-zinc-300 flex flex-col ">
                            <div className="h-32 bg-zinc-900 relative">
                                <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" className="w-full h-full object-cover opacity-60" alt="Banner" />
                            </div>

                            <div className="px-4 relative pb-4 bg-white z-10">
                                <div className="flex items-end justify-between -mt-10 mb-4">
                                    <div className="w-20 h-20 bg-zinc-900 border-4 border-white flex items-center justify-center shrink-0 shadow-lg">
                                        <span className="text-white font-mono font-black text-3xl uppercase">{userData.avatar}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setIsConfigMode(!isConfigMode)}
                                            className={cn("h-7 px-3 border text-[9px] font-mono font-black uppercase tracking-widest transition-colors", 
                                            isConfigMode ? "bg-blue-600 border-blue-600 text-white" : "border-zinc-300 text-zinc-500 hover:bg-zinc-50")}
                                        >
                                            <Settings2 size={10} className="inline mr-1.5"/> {isConfigMode ? "Save" : "Edit"}
                                        </button>
                                        <button className="h-7 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase tracking-widest hover:bg-orange-600 transition-all">
                                            Connect
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-xl font-bold uppercase tracking-tighter text-zinc-900 leading-none">{userData.name}</h1>
                                    <BadgeCheck size={16} className="text-blue-600" />
                                </div>
                                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mt-1">{userData.role} @ {userData.org}</p>
                            </div>
                        </section>

                        {/* ANALYTICS SECTION */}
                        <section ref={sectionRefs.analytics} className="bg-white border-b border-zinc-300">
                            <ModuleHeader title="Statistics" icon={<BarChart3 size={12}/>} />
                            <div className="grid grid-cols-3 divide-x divide-zinc-300">
                                <AnalyticsItem icon={<TrendingUp size={14}/>} label="Views" val="1.2k" sub="+12%" />
                                <AnalyticsItem icon={<Users size={14}/>} label="Nodes" val="482" sub="Verified" />
                                <AnalyticsItem icon={<Search size={14}/>} label="Queries" val="89" sub="Weekly" />
                            </div>
                        </section>

                        {/* TABS */}
                        <div className="flex w-full border-b border-zinc-300 bg-zinc-100 h-9 divide-x divide-zinc-300">
                            {(['ABOUT', 'POSTS'] as TabType[]).map((tab) => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all", activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#18181b]" : "text-zinc-400")}>
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* MODULES CONTAINER */}
                        <div className="flex-1 bg-zinc-300 gap-px flex flex-col">
                            {activeTab === 'ABOUT' && (
                                <>
                                    <div ref={sectionRefs.about} className="bg-white p-2 border-b border-zinc-300">
                                        <h3 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-2"> <Terminal size={11}/> Bio_Process</h3>
                                        <p className="text-xs font-medium text-zinc-900 leading-relaxed">{userData.description}</p>
                                    </div>

                                    <div ref={sectionRefs.experience} className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Experience" icon={<Briefcase size={12}/>} />
                                        {userData.experience.map((exp, idx) => (
                                            <div key={idx} className="flex border-b border-zinc-100 last:border-0 hover:bg-zinc-50">
                                                <div className="w-14 flex items-center justify-center bg-zinc-50 border-r border-zinc-200 py-3 text-[10px] font-black text-zinc-400">{exp.logo}</div>
                                                <div className="flex-1 px-4 py-3 flex justify-between items-center">
                                                    <div>
                                                        <h4 className="text-[11px] font-black uppercase tracking-tight text-zinc-900">{exp.role}</h4>
                                                        <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{exp.org}</p>
                                                    </div>
                                                    <span className="text-[8px] font-bold text-zinc-400 font-mono italic">{exp.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div ref={sectionRefs.projects} className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Projects" icon={<Code2 size={12}/>} />
                                        <div className="grid grid-cols-2 gap-px bg-zinc-300">
                                            {userData.projects.map((proj, idx) => (
                                                <div key={idx} className="bg-white p-2 group cursor-pointer">
                                                    <div className="aspect-video bg-zinc-100 mb-2 overflow-hidden border border-zinc-200 shadow-inner">
                                                        <img src={proj.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                    </div>
                                                    <h4 className="text-[10px] font-black uppercase text-zinc-900 mb-0.5">{proj.name}</h4>
                                                    <p className="text-[9px] text-zinc-500 leading-tight line-clamp-2">{proj.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div ref={sectionRefs.skills} className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Skills" icon={<Zap size={12}/>} />
                                        <div className="p-2 grid grid-cols-2 gap-x-8 gap-y-3">
                                            {userData.skills.map(s => (
                                                <div key={s} className="flex items-center justify-between border-b border-zinc-100 pb-1.5 group">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-zinc-900" />
                                                        <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-tighter group-hover:text-orange-600 transition-colors">{s}</span>
                                                    </div>
                                                    <span className="text-[8px] font-mono text-zinc-300 font-bold uppercase tracking-widest">Stable</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div ref={sectionRefs.education} className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Education" icon={<GraduationCap size={12}/>} />
                                        {userData.education.map((edu, idx) => (
                                            <div key={idx} className="flex border-b border-zinc-100 last:border-0">
                                                <div className="w-14 flex items-center justify-center bg-zinc-50 border-r border-zinc-200 py-3 text-[10px] font-black text-zinc-400">{edu.logo}</div>
                                                <div className="flex-1 px-4 py-3">
                                                    <h4 className="text-[10px] font-black uppercase text-zinc-900">{edu.org}</h4>
                                                    <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{edu.degree}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div ref={sectionRefs.recs} className="bg-white border-b border-zinc-300">
                                        <ModuleHeader title="Reccomendations" icon={<Quote size={12}/>} />
                                        <div className="p-4 space-y-4">
                                            {userData.recommendations.map((r, i) => (
                                                <div key={i} className="border-l-2 border-zinc-900 pl-4 py-1">
                                                    <p className="text-[10px] italic text-zinc-700 leading-relaxed mb-1">"{r.text}"</p>
                                                    <p className="text-[8px] font-black uppercase text-zinc-900">{r.name} — {r.role}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div ref={sectionRefs.misc} className="bg-white p-4 border-b border-zinc-300 grid grid-cols-2 divide-x divide-zinc-200">
                                        <div>
                                            <h4 className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest mb-2">Languages</h4>
                                            {userData.languages.map(l => <p key={l} className="text-[10px] font-bold uppercase text-zinc-800">{l}</p>)}
                                        </div>
                                        <div className="pl-4">
                                            <h4 className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-widest mb-2">Recognition</h4>
                                            {userData.honors.map(h => <p key={h} className="text-[10px] font-bold uppercase text-blue-600">{h}</p>)}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* NAVIGATION SIDEBAR */}
                    <aside className="w-39 shrink-0 bg-white hidden md:flex flex-col border-l border-zinc-300">
                        <div className="sticky top-13 flex flex-col h-[calc(100vh-3.5rem)]">
                            <div className="pb-2 px-2 bg-zinc-300 text-black shrink-0 ">
                                <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em]">On This Page</span>
                            </div>
                            
                            <nav className=" flex-1  overflow-y-auto border-b border-zinc-200">
                                <NavBtn label="Analytics" onClick={() => scrollTo(sectionRefs.analytics)} />
                                <NavBtn label="Summary" onClick={() => scrollTo(sectionRefs.about)} />
                                <NavBtn label="Career" onClick={() => scrollTo(sectionRefs.experience)} />
                                <NavBtn label="Projects" onClick={() => scrollTo(sectionRefs.projects)} />
                                <NavBtn label="Stack" onClick={() => scrollTo(sectionRefs.skills)} />
                                <NavBtn label="Training" onClick={() => scrollTo(sectionRefs.education)} />
                                <NavBtn label="Validation" onClick={() => scrollTo(sectionRefs.recs)} />
                                <NavBtn label="System_Info" onClick={() => scrollTo(sectionRefs.misc)} />
                            </nav>

                            <div className="p-3 bg-zinc-50 border-t border-zinc-200">
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block mb-3">Protocols</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <SocialIcon icon={<Github size={12}/>} />
                                    <SocialIcon icon={<Linkedin size={12}/>} />
                                    <SocialIcon icon={<Twitter size={12}/>} />
                                    <SocialIcon icon={<Globe size={12}/>} />
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

// --- SUBCOMPONENTS ---

const ModuleHeader = ({ title, icon }: any) => (
    <div className="px-2 py-1.5 bg-zinc-300 border-b border-zinc-300 flex items-center gap-2 shadow-sm">
        <span className="text-zinc-600">{icon}</span>
        <h3 className="text-[9px] font-mono font-black text-black uppercase tracking-[0.3em]">{title}</h3>
    </div>
);

const AnalyticsItem = ({ icon, label, val, sub }: any) => (
    <div className="p-2 flex flex-col gap-0.5 hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-400">
            {icon} <span className="text-[7px] font-mono font-bold uppercase">{label}</span>
        </div>
        <span className="text-xl font-black text-zinc-900 tracking-tighter leading-none">{val}</span>
        <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">{sub}</span>
    </div>
);

const NavBtn = ({ label, onClick }: any) => (
    <button onClick={onClick} className="w-full text-left px-2 py-2 border-b border-zinc-300 text-[9px] font-mono font-bold text-zinc-500 uppercase hover:text-blue-600 cursor-pointer hover:bg-zinc-200 transition-all truncate ">
        {label}
    </button>
);

const SocialIcon = ({ icon }: any) => (
    <div className="aspect-square bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-900 hover:border-zinc-900 cursor-pointer transition-all shadow-sm">
        {icon}
    </div>
);

export default UserProfile;