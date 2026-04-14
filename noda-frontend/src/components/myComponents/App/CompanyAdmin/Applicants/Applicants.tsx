import { 
  BadgeCheck, Briefcase, CalendarPlus, Code2, Github, Globe, Search, 
  Terminal, Trash2, X, Zap, Twitter, Linkedin, CheckCircle2, AlertCircle, CircleDashed 
} from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

const candidates = [
  {
    name: "Alex Rivera",
    email: "alex.riv@example.com",
    role: "Fullstack Engineer",
    experience: "5 years",
    match: 92,
    avatar: "https://github.com/shadcn.png",
    bio: "Lead Architect specializing in high-performance distributed engines and memory-safe protocols. Passionate about DX and system performance.",
    education: "MSCS • MIT",
    skills: ['Rust', 'Go', 'K8s', 'TS', 'Postgres']
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Product Designer",
    experience: "3 years",
    match: 88,
    avatar: "",
    bio: "Focused on creating accessible design systems and intuitive user flows for complex SaaS platforms.",
    education: "BFA • RISD",
    skills: ['Figma', 'Auto Layout', 'Prototyping', 'React']
  },
  {
    name: "John Doe",
    email: "john.d@example.com",
    role: "DevOps Engineer",
    experience: "4 years",
    match: 75,
    avatar: "",
    bio: "Automation enthusiast with a focus on CI/CD pipelines and cloud-native infrastructure scaling.",
    education: "BSc • Georgia Tech",
    skills: ['AWS', 'Terraform', 'Docker', 'Python']
  }
];

type ProfileTab = 'INFO' | 'CV';

const Applicants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);
  const [activeTab, setActiveTab] = useState<ProfileTab>('INFO');

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0 ">
          <AppSideBar />
        </aside>

        <main className="flex ml-4 bg-white overflow-hidden w-full pt-12 border-t border-zinc-200">
          
          {/* LEFT COLUMN: CANDIDATE LIST */}
          <div className="bg-white flex flex-col shrink-0 w-72 border-x border-zinc-300">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-400" size={16} />
              <input
                value={searchQuery}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Search Candidates..."}
                className="w-full h-9 border-b border-zinc-300 pl-9 pr-4 text-[11px] font-mono font-bold outline-none focus:bg-zinc-50"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredCandidates.map((candidate, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={`flex items-center border-b border-zinc-300 cursor-pointer transition-colors hover:bg-zinc-100 ${
                    selectedCandidate?.name === candidate.name ? "bg-zinc-200" : ""
                  }`}
                >
                  <div className={`w-12 h-12 shrink-0 text-white flex items-center justify-center text-xs font-black ${candidate.match < 50 ? "bg-red-500" : candidate.match < 80 ? "bg-amber-500" : "bg-emerald-600"}`}>
                    {candidate.match}%
                  </div>
                  <div className="flex flex-col pl-3 overflow-hidden">
                    <div className="text-[13px] font-bold font-mono truncate">{candidate.name}</div>
                    <div className="text-[11px] text-zinc-500 truncate font-mono uppercase tracking-tight">{candidate.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: INSPECTOR DETAILS */}
          <div className="flex-1 flex flex-col border-r border-zinc-300 relative bg-white overflow-hidden">
            <div className="border-b border-zinc-300 flex justify-between items-center shrink-0 bg-zinc-50/50">
              <div className="text-[10px] font-black p-3 uppercase  text-zinc-500 flex items-center gap-2">
                <CircleDashed size={14} className="animate-spin" style={{ animationDuration: '3s' }} /> 
                Full-Stack Developer Role
              </div>
              <button className="h-full px-3 py-2 aspe bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer">
                <CalendarPlus className="w-3.5 h-3.5" />
              </button>
            </div>

            {selectedCandidate ? (
              <div className="flex flex-col flex-1 relative overflow-hidden">
                
                {/* HEADER AREA */}
                <div className="flex items-center border-b border-zinc-300 shrink-0 bg-white">
                  <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center shrink-0 ">
                    <span className="text-white font-mono font-black text-2xl">{selectedCandidate.name.charAt(0)}</span>
                  </div>
                  <div className="ml-2">
                    <h2 className="text-sm font-bold font-mono uppercase leading-tight tracking-tight">{selectedCandidate.name}</h2>
                    <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{selectedCandidate.role}</p>
                  </div>
                </div>

                {/* SOCIAL LINKS GRID */}
                <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 shrink-0">
                  <a href="#" className="flex items-center justify-center h-8 text-zinc-400 hover:text-blue-500 hover:bg-zinc-50  transition-all"><Globe size={12} /></a>
                  <a href="#" className="flex items-center justify-center h-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50  transition-all"><Github size={12} /></a>
                  <a href="#" className="flex items-center justify-center h-8 text-zinc-400 hover:text-sky-400 hover:bg-zinc-50  transition-all"><Twitter size={12} /></a>
                  <a href="#" className="flex items-center justify-center h-8 text-zinc-400 hover:text-blue-700 hover:bg-zinc-50 transition-all"><Linkedin size={12} /></a>
                </div>

                {/* TABS CONTROLLER */}
                <div className="flex border-b border-zinc-300 h-10 bg-zinc-50 divide-x divide-zinc-300 shrink-0">
                  {(['INFO', 'CV'] as ProfileTab[]).map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "flex-1 text-[11px] font-mono font-black  transition-all uppercase",
                        activeTab === tab ? "bg-white text-zinc-900 shadow-[inset_0_-2px_0_0_#f97316]" : "text-zinc-400 hover:bg-zinc-200 cursor-pointer"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* SCROLLABLE CONTENT */}
                <div className="flex-1 overflow-y-auto bg-white pb-16">
                  {activeTab === 'INFO' ? (
                    <div className="flex flex-col divide-y divide-zinc-300">
                      
                      {/* AI ANALYSIS: 2 COLUMN LIGHT THEME */}
                      <div className="grid grid-cols-2 divide-x divide-zinc-200 border-b border-zinc-200">
                        <div className="p-2 bg-emerald-50/50">
                          <span className="text-[10px] font-mono font-black text-emerald-700 uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                            <CheckCircle2 size={14} /> Matching_Skills
                          </span>
                          <ul className="space-y-2">
                            {['Distributed Systems', 'Rust/WASM', 'Memory Safety'].map((item) => (
                              <li key={item} className="text-[11px] font-mono font-bold text-emerald-800 leading-tight flex gap-2">
                                <span className="text-emerald-400">»</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2 bg-red-50/50">
                          <span className="text-[10px] font-mono font-black text-red-700 uppercase tracking-widest mb-3 block flex items-center gap-1.5">
                            <AlertCircle size={14} /> Missing_Logic
                          </span>
                          <ul className="space-y-2">
                            {['K8s Security (CKS)', 'AWS Nitro'].map((item) => (
                              <li key={item} className="text-[11px] font-mono font-bold text-red-800 leading-tight flex gap-2">
                                <span className="text-red-400">!</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* STATS SECTION */}
                      <div className=" grid grid-cols-2  bg-zinc-50/20">
                         <div className="space-y-1 p-2 py-1 border-r border-zinc-300">
                            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tighter">Network_Address</span>
                            <p className="text-xs font-mono text-zinc-800 truncate  pb-1">{selectedCandidate.email}</p>
                         </div>
                         <div className="space-y-1 p-2 py-1">
                            <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Education_History</span>
                            <p className="text-xs font-bold text-zinc-800  pb-1">{selectedCandidate.education}</p>
                         </div>
                      </div>

                      {/* ABOUT ME */}
                      <div className="p-2">
                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase mb-1 block tracking-widest">About</span>
                        <p className="text-xs leading-relaxed text-zinc-700 font-medium">
                          {selectedCandidate.bio}
                        </p>
                      </div>

                      {/* WORK HISTORY / EXPERIENCE */}
                      <div className="p-2">
                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase mb-2 block tracking-[0.2em]">Deployment_History</span>
                        <div className="space-y-6">
                          {[1, 2].map((_, i) => (
                            <div key={i} className="relative pl-5 border-l-2 border-zinc-300">
                              <div className="absolute w-2 h-2 bg-zinc-400 -left-[5px] top-1.5 rounded-full" />
                              <div className="flex justify-between items-start mb-1">
                                <h4 className="text-xs font-bold uppercase text-zinc-900 tracking-tight">Lead Systems Architect</h4>
                                <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-100 px-1.5 rounded">2021 — 2024</span>
                              </div>
                              <p className="text-[10px] font-mono font-black text-blue-600 mb-2">SYSTEM_NODE_0{i+1} • FULL_TIME</p>
                              <p className="text-[12px] text-zinc-600 leading-snug">
                                Scaled core processing engine to handle 1.2M concurrent connections. Implemented zero-copy memory protocols and optimized garbage collection overhead by 35%.
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SKILLS CHIPS */}
                      <div className="p-2">
                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase mb-2 block tracking-widest">Skill_Stack_Manifest</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedCandidate.skills.map(s => (
                            <span key={s} className="px-2.5 py-1 border border-zinc-300 text-[11px] font-mono font-black uppercase text-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-default">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 flex flex-col items-center justify-center space-y-4 opacity-40 h-full min-h-[400px]">
                      <Terminal size={40} className="text-zinc-400" />
                      <span className="text-[11px] font-mono font-black uppercase tracking-[0.5em]">Buffer_Stream_Ready...</span>
                    </div>
                  )}
                </div>

                {/* FIXED ACTION FOOTER */}
                <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-zinc-300 grid grid-cols-2 bg-white z-30 ">
                  <button className="flex items-center justify-center gap-3 bg-red-500/20 text-zinc-500 hover:text-white hover:bg-red-500 border-t border-zinc-300 transition-all font-mono font-black text-[12px] uppercase  group cursor-pointer">
                     Reject
                  </button>
                  <button className="flex items-center justify-center gap-3 bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-mono font-black text-[12px] uppercase group cursor-pointer">
                     Send Message
                  </button>
                </div>

              </div>
            ) : (
              <div className="flex-1 border-4 border-dashed border-zinc-100 flex items-center justify-center bg-zinc-50/50 m-6">
                <span className="text-[12px] font-mono font-black text-zinc-300 uppercase tracking-[0.5em] animate-pulse">Waiting_For_Selection...</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Applicants;