import { useState } from 'react';
import { 
  Github, MapPin, Briefcase, Mail, Users, 
  CheckCircle2, ExternalLink,
  Award, Terminal, GraduationCap
} from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Experience');

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                
                {/* 1. STICKY SIDEBAR */}
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-[52px] h-[calc(100vh-52px)] py-4">
                        <AppSideBar />
                    </div>
                </aside>

                {/* 2. PROFILE MAIN SCHEMATIC */}
                <main className="flex-1 flex flex-col border-x border-zinc-300 bg-white min-h-screen pb-20">
                    
                    {/* IDENTITY CLUSTER */}
                    <div className="relative">
                        <div className="h-44 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                            <img 
                                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200" 
                                className="w-full h-full object-cover opacity-20 grayscale"
                                alt="Banner"
                            />
                        </div>
                        
                        <div className="px-8 relative">
                            <div className="flex items-end justify-between -mt-16 mb-6">
                                <div className="w-32 h-32 bg-zinc-900 border-4 border-white flex items-center justify-center shrink-0 shadow-sm">
                                    <span className="text-white font-mono font-black text-5xl">JD</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="h-10 px-6 border border-zinc-300 bg-white text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all">Message</button>
                                    <button className="h-10 px-8 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">Connect</button>
                                </div>
                            </div>

                            <div className="space-y-1 mb-6">
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-black uppercase tracking-tighter leading-none">John Doe</h1>
                                    <CheckCircle2 size={16} className="text-blue-600 fill-blue-50" />
                                </div>
                                <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-tight">Lead Vector Engineer at Noda Labs</p>
                                <div className="flex flex-wrap gap-4 pt-2">
                                    <ProfileMeta icon={<MapPin size={12}/>} text="San Francisco, CA" />
                                    <ProfileMeta icon={<Mail size={12}/>} text="john@noda.network" />
                                    <ProfileMeta icon={<Users size={12}/>} text="1.2k Connections" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. PERMANENT GITHUB INTELLIGENCE BOARD */}
                    <div className="border-y border-zinc-300 bg-white">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Github size={14}/> Github.Commit_Activity
                                </h3>
                                <div className="flex items-center gap-4">
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Total: 1,402 Commits</span>
                                    <ExternalLink size={12} className="text-zinc-200" />
                                </div>
                            </div>

                            {/* Official-style Contribution Grid */}
                            <div className="flex gap-[3px] overflow-hidden justify-center w-full bg-zinc-50/30 p-4 border border-zinc-100">
                                {Array.from({ length: 50 }).map((_, col) => (
                                    <div key={col} className="flex flex-col gap-[3px]">
                                        {Array.from({ length: 7 }).map((_, row) => {
                                            const intensity = Math.random();
                                            return (
                                                <div 
                                                    key={row} 
                                                    className={cn(
                                                        "w-[9px] h-[9px] shrink-0",
                                                        intensity > 0.85 ? "bg-emerald-600" : 
                                                        intensity > 0.6 ? "bg-emerald-400" : 
                                                        intensity > 0.3 ? "bg-emerald-200" : "bg-zinc-100"
                                                    )}
                                                />
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4. PROFESSIONAL NAVIGATION TABS */}
                    <div className="flex w-full border-b border-zinc-300 bg-white sticky top-[52px] z-30 h-12 divide-x divide-zinc-200">
                        {[
                          { id: 'Experience', icon: <Briefcase size={12}/> },
                          { id: 'Education', icon: <GraduationCap size={12}/> },
                          { id: 'Skills', icon: <Terminal size={12}/> },
                          { id: 'Certifications', icon: <Award size={12}/> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all",
                                    activeTab === tab.id ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-900"
                                )}
                            >
                                <span className="hidden sm:inline">{tab.id}</span>
                            </button>
                        ))}
                    </div>

                    {/* 5. DYNAMIC TAB CONTENT */}
                    <div className="p-8">
                        {activeTab === 'Experience' && (
                            <div className="space-y-10">
                                <TimelineEntry 
                                  role="Lead Systems Engineer" 
                                  org="Noda Labs" 
                                  date="2024 - Present" 
                                  desc="Architecting decentralized node synchronization protocols for global recruitment clusters." 
                                />
                                <TimelineEntry 
                                  role="Senior Frontend Dev" 
                                  org="Vercel" 
                                  date="2021 - 2024" 
                                  desc="Optimized edge-side rendering pipelines for high-velocity deployment cycles." 
                                />
                            </div>
                        )}

                        {activeTab === 'Skills' && (
                            <div className="grid grid-cols-2 gap-4">
                                <SkillNode category="Languages" items={['Rust', 'TypeScript', 'Go', 'C++']} />
                                <SkillNode category="Infrastructure" items={['Kubernetes', 'AWS', 'Docker', 'Terraform']} />
                                <SkillNode category="Databases" items={['PostgreSQL', 'Redis', 'MongoDB']} />
                                <SkillNode category="Frameworks" items={['React', 'Next.js', 'Express']} />
                            </div>
                        )}
                        
                        {/* Placeholder for Education/Certs */}
                        {(activeTab === 'Education' || activeTab === 'Certifications') && (
                          <div className="h-40 flex items-center justify-center border border-dashed border-zinc-200">
                             <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-[0.3em]">Node Data Restricted</span>
                          </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- SCHEMATIC HELPERS ---
const ProfileMeta = ({ icon, text }: any) => (
    <div className="flex items-center gap-1.5">
        <span className="text-zinc-300">{icon}</span>
        <span className="text-[10px] font-mono font-black uppercase tracking-tighter text-zinc-500">{text}</span>
    </div>
);

const TimelineEntry = ({ role, org, date, desc }: any) => (
    <div className="flex gap-6 group">
        <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
            <Briefcase size={20} className="text-white"/>
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] font-mono font-black text-blue-600 uppercase mb-1">{date}</span>
            <h4 className="text-[13px] font-black uppercase tracking-tight">{role}</h4>
            <span className="text-[10px] font-mono font-black text-zinc-400 uppercase mb-3">{org}</span>
            <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-tight leading-relaxed max-w-xl">{desc}</p>
        </div>
    </div>
);

const SkillNode = ({ category, items }: any) => (
  <div className="border border-zinc-200 p-4">
    <h5 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest mb-3">{category}</h5>
    <div className="flex flex-wrap gap-1">
      {items.map((item: string) => (
        <span key={item} className="px-2 py-1 bg-zinc-900 text-white text-[8px] font-mono font-black uppercase">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default UserProfile;