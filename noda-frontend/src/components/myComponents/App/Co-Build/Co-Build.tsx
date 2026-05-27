import React, { useState } from 'react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { 
  Plus, Flame, Layers, X, SlidersHorizontal, Check, 
  ChevronLeft, ChevronRight, Users, Eye
} from 'lucide-react';
import { cn } from "@/lib/utils";

// Shadcn UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

interface ProjectData {
  id: string;
  title: string;
  hook: string;
  description: string;
  images: string[];
  lookingFor: string[];
  techStack: string[];
  compensation: string;
  upvotes: number;
  currentTeam: { name: string; initials: string; role: string }[];
}

const CoBuildPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "BLD-092",
      title: "synapse-mesh",
      hook: "A high-performance peer-to-peer execution layer bypassing centralized databases entirely for real-time collaboration.",
      description: "Building an ephemeral matrix engine handling extreme real-time updates over low-bandwidth environments. The core engine is layout-agnostic and relies on local-first CRDTs. Looking for core engineers to scale our WebRTC data channel mesh infrastructure.",
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop", 
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop"
      ],
      lookingFor: ["Backend", "DevOps"],
      techStack: ["Rust", "TypeScript", "Libp2p"],
      compensation: "50/50 Equity",
      upvotes: 614,
      currentTeam: [
        { name: "Marcus V.", initials: "MV", role: "Systems" },
        { name: "Elena R.", initials: "ER", role: "Frontend" }
      ]
    },
    {
      id: "BLD-093",
      title: "vortex-canvas",
      hook: "Vector layout engine running completely isolated within lightweight client-side WebAssembly sandboxes.",
      description: "We are reimagining design tooling using a raw WebGL pipeline instead of DOM trees. The app features a zero-latency multiplayer engine. Currently expanding the design token system.",
      images: [
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop"
      ],
      lookingFor: ["Frontend", "UI/UX"],
      techStack: ["TypeScript", "React", "Rust"],
      compensation: "Profit Share",
      upvotes: 342,
      currentTeam: [{ name: "Sora L.", initials: "SL", role: "Graphics Lead" }]
    }
  ]);

  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({ "BLD-092": 0, "BLD-093": 0 });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCompensation, setSelectedCompensation] = useState<string[]>([]);

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProjects(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  const handleCarouselPrev = (id: string, max: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndices(prev => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? max - 1 : (prev[id] || 0) - 1
    }));
  };

  const handleCarouselNext = (id: string, max: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCarouselIndices(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % max
    }));
  };

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(x => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
        {/* COLUMN 1: LEFT SIDEBAR NAVIGATION */}
        <aside className="w-25 flex-none">
          <AppSideBar />
        </aside>

        {/* WORKSPACE ROW CONTAINER ENGINE */}
        <div className="flex-1 flex">
          
          {/* COLUMN 2: PRIMARY INTERFACE GRID FEED */}
          <main className="flex-1 border-x border-zinc-300 min-h-screen pt-13 bg-white flex flex-col">
            
            <div className="p-2 bg-zinc-200 border-b border-zinc-300 flex items-center justify-between font-mono">
              <div className="text-[10px] font-black uppercase text-zinc-900 tracking-tight flex items-center gap-2">
                <span>Find your next coding project</span>
              </div>
            </div>

            {/* DYNAMIC TWO-COLUMN GRID FEED COMPONENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-zinc-300">
              {projects.map((project) => {
                const currentImgIdx = carouselIndices[project.id] || 0;
                return (
                  <Dialog key={project.id}>
                    
                    {/* FLAT SQUARED STRUCTURAL CARD VIEW - MAX PADDING p-2 BOUNDS */}
                    <div 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                      className="bg-white flex flex-col select-none relative rounded-none p-1.5 gap-2"
                    >
                      
                      {/* INTEGRATED CAROUSEL SYSTEM - NO RADIUS */}
                      <div className="w-full aspect-[16/10] relative overflow-hidden shrink-0 group bg-zinc-100 border border-zinc-200 rounded-none">
                        <img 
                          src={project.images[currentImgIdx]} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-1.5 pointer-events-none">
                          <button 
                            onClick={(e) => handleCarouselPrev(project.id, project.images.length, e)}
                            className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center shadow-none pointer-events-auto cursor-pointer transition-transform active:scale-90 rounded-none border-none outline-none"
                          >
                            <ChevronLeft size={12} strokeWidth={2.5} />
                          </button>
                          <button 
                            onClick={(e) => handleCarouselNext(project.id, project.images.length, e)}
                            className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center shadow-none pointer-events-auto cursor-pointer transition-transform active:scale-90 rounded-none border-none outline-none"
                          >
                            <ChevronRight size={12} strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className="absolute top-1.5 left-1.5 flex gap-1 bg-zinc-900/90 px-1.5 py-0.5 border border-zinc-700 text-[8px] font-mono font-black text-white rounded-none">
                          0{currentImgIdx + 1} / 0{project.images.length}
                        </div>
                      </div>

                      {/* TEXTUAL META FIELDS AND ATTRIBUTE TAGS METRIC CHIPS */}
                      <div className="flex flex-col flex-1 justify-between gap-2">
                        <div className="space-y-2">
                          
                          {/* Heading Line Area */}
                          <div className="flex items-center justify-between gap-1">
                            <h2 className="text-xs font-mono font-black uppercase tracking-tight text-zinc-900 truncate">
                              {project.title}
                            </h2>
                            {/* Re-designed compact subtle like configuration */}
                            <button 
                              onClick={(e) => handleUpvote(project.id, e)}
                              className="flex items-center gap-1 text-[8px] font-mono border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 px-1.5 py-0.5 transition-all shrink-0 cursor-pointer rounded-none"
                            >
                              <Flame size={8} className="text-zinc-400 group-hover:text-zinc-900" /> {project.upvotes}
                            </button>
                          </div>

                          {/* Looking For Labels */}
                          <div className="flex flex-wrap gap-1">
                            <span className="text-[7px] font-mono font-bold uppercase text-zinc-400 mr-1 self-center">LOOKING FOR:</span>
                            {project.lookingFor.map((tag, idx) => (
                              <span 
                                key={idx} 
                                className="text-[8px] font-mono font-black uppercase px-1 py-0.2 bg-zinc-900 text-white border border-zinc-900 rounded-none"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Hook Parameter Short Copy content line */}
                          <p className="text-[11px] font-mono text-zinc-600 leading-tight uppercase line-clamp-2">
                            {project.hook}
                          </p>
                        </div>

                        {/* Crew / Members Segment Area */}
                        <div className="border-t border-dashed border-zinc-200 pt-2 mt-1">
                          <div className="text-[7px] font-mono font-bold uppercase text-zinc-400 mb-1 flex items-center gap-1">
                            <Users size={8} /> Active Members ({project.currentTeam.length})
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.currentTeam.map((member, idx) => (
                              <div key={idx} className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-1 py-0.5 rounded-none text-[8px] font-mono text-zinc-700">
                                <span className="font-black text-zinc-900">{member.name}</span>
                                <span className="text-zinc-400 text-[7px]">({member.role})</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* SINGLE BRUTALIST LEARN MORE BUTTON - NO TERMINAL BAR */}
                        <DialogTrigger asChild>
                          <button className="w-full h-8 mt-2 bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-black text-[9px] uppercase tracking-widest transition-colors rounded-none border-none outline-none cursor-pointer flex items-center justify-center gap-1.5">
                            <Eye size={10} /> LEARN MORE
                          </button>
                        </DialogTrigger>

                      </div>

                    </div>

                    {/* SHADCN MODAL CONTAINER OVERLAY PROFILE OVERVIEW */}
                    <DialogContent className="sm:max-w-[460px] p-0 border-2 border-zinc-900 shadow-none overflow-hidden bg-white gap-0 animate-none rounded-none">
                      <DialogHeader className="bg-zinc-900 p-2 px-3 border-b border-zinc-900 flex flex-row items-center justify-between space-y-0 w-full text-white rounded-none">
                        <DialogTitle className="text-[11px] font-mono font-black tracking-wide uppercase text-white flex gap-1.5 items-center">
                          <Layers size={12} /> Registry Asset Core Parameters
                        </DialogTitle>
                        <DialogClose asChild>
                          <button className="hover:bg-white/20 p-1 transition-colors border-none outline-none cursor-pointer">
                            <X className="w-3.5 h-3.5 text-white" />
                          </button>
                        </DialogClose>
                      </DialogHeader>

                      <div className="max-h-[70vh] overflow-y-auto divide-y divide-zinc-300 font-mono rounded-none">
                        
                        <div className="p-3.5 bg-zinc-50 flex items-center justify-between">
                          <div>
                            <div className="text-[8px] font-bold text-zinc-400 uppercase tracking-tight">REGISTRY // {project.id}</div>
                            <h2 className="text-xs font-black text-zinc-900 uppercase leading-none mt-0.5">{project.title}</h2>
                          </div>
                          <span className="text-[10px] font-black uppercase text-white bg-blue-600 px-1.5 py-0.5 rounded-none">
                            {project.compensation}
                          </span>
                        </div>

                        <div className="p-3.5 space-y-1">
                          <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">ALL_INFO_DESCRIPTION</span>
                          <p className="text-[11px] text-zinc-700 leading-relaxed uppercase">{project.description}</p>
                        </div>

                        <div className="p-3.5 space-y-1.5 bg-zinc-50/50">
                          <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">ATTACHED_RESOURCES ({project.images.length} Layers)</span>
                          <div className="grid grid-cols-3 gap-2">
                            {project.images.map((src, index) => (
                              <div key={index} className="aspect-square border border-zinc-300 overflow-hidden relative bg-white rounded-none">
                                <img src={src} alt="gallery profile layer" className="w-full h-full object-cover" />
                                <div className="absolute bottom-1 right-1 text-[6px] font-bold bg-black/60 text-white px-1 rounded-none">
                                  0{index+1}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3.5 space-y-2">
                          <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">VERIFIED_CURRENT_CREW</span>
                          <div className="grid grid-cols-2 gap-2">
                            {project.currentTeam.map((m, idx) => (
                              <div key={idx} className="p-2 border border-zinc-200 flex items-center gap-2 bg-white rounded-none">
                                <div className="w-5 h-5 bg-zinc-900 text-white text-[8px] font-black flex items-center justify-center shrink-0 rounded-none">
                                  {m.initials}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[9px] font-black uppercase text-zinc-900 truncate">{m.name}</div>
                                  <div className="text-[7px] text-zinc-400 uppercase leading-none">{m.role}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-2 bg-zinc-50 flex gap-2 rounded-none">
                          <DialogClose asChild>
                            <button className="h-9 px-4 bg-white border border-zinc-300 text-zinc-600 font-black text-[10px] uppercase tracking-wider hover:bg-zinc-100 rounded-none cursor-pointer">
                              Close Spec Profile
                            </button>
                          </DialogClose>
                          <button className="flex-1 h-9 bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors rounded-none cursor-pointer">
                            Transmit Integration Request
                          </button>
                        </div>

                      </div>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </main>

          {/* COLUMN 3: RIGHT ALIGNED COMPACT SIDEBAR FILTERS (STRICTLY w-39 / 156px) */}
          <aside className="w-39 flex-none hidden lg:flex flex-col bg-white border-r border-zinc-300 min-h-screen pt-13">
            <div className="flex flex-col h-full divide-y divide-zinc-200 sticky top-[53px]">
              
              <div className="p-2 px-3 bg-zinc-50 flex items-center gap-1.5">
                <SlidersHorizontal size={10} className="text-zinc-800" />
                <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-900">
                  Filters
                </span>
              </div>

              {/* Roles Group Checkboxes */}
              <div className="p-2 px-3 space-y-1.5">
                <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Target Roles</label>
                <div className="space-y-1">
                  {["Frontend", "Backend", "DevOps", "UI/UX", "Fullstack"].map((role) => (
                    <label key={role} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                      <input 
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedRoles.includes(role)}
                        onChange={() => toggleFilter(selectedRoles, setSelectedRoles, role)}
                      />
                      <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                        <Check size={8} className="text-white hidden peer-checked:block stroke-[3]" />
                      </div>
                      <span className="truncate peer-checked:font-black">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills Group Checkboxes */}
              <div className="p-2 px-3 space-y-1.5">
                <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Core Skills</label>
                <div className="space-y-1">
                  {["TypeScript", "Rust", "Docker", "Python"].map((skill) => (
                    <label key={skill} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                      <input 
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleFilter(selectedSkills, setSelectedSkills, skill)}
                      />
                      <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                        <Check size={8} className="text-white hidden peer-checked:block stroke-[3]" />
                      </div>
                      <span className="truncate peer-checked:font-black">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Split Comp Model Group Checkboxes */}
              <div className="p-2 px-3 space-y-1.5">
                <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Split Model</label>
                <div className="space-y-1">
                  {["50/50 Equity", "Profit Share", "Open Source"].map((compType) => (
                    <label key={compType} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                      <input 
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedCompensation.includes(compType)}
                        onChange={() => toggleFilter(selectedCompensation, setSelectedCompensation, compType)}
                      />
                      <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                        <Check size={8} className="text-white hidden peer-checked:block stroke-[3]" />
                      </div>
                      <span className="truncate peer-checked:font-black">{compType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-zinc-50 mt-auto">
                <button className="w-full h-7 bg-white border border-dashed border-zinc-300 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 font-mono font-black text-[8px] uppercase tracking-tight transition-colors flex items-center justify-center gap-1 cursor-pointer rounded-none">
                  <Plus size={10} /> Add Build
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default CoBuildPage;