import React, { useState } from 'react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { 
  Plus, Search, Users, Flame, ExternalLink, 
  Layers, X, Image as ImageIcon, SlidersHorizontal, 
  Check, FolderGit2, ArrowUpRight, Github, CheckSquare, Square
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

// Extended matching type layout context 
interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  hook: string;
  description: string; // The full description copy
  shortDescription: string; // Dynamic short text for structural card layout
  coverImage?: string; // Main structural viewport asset
  images: string[]; // Holds your requested multiple image arrays
  repoUrl?: string;
  liveUrl?: string;
  lookingFor: string[];
  techStack: string[];
  compensation: string;
  capacity: { current: number; total: number };
  upvotes: number;
  currentTeam: { name: string; initials: string; role: string }[];
  milestones: { label: string; completed: boolean }[];
}

const CoBuildPage = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "BLD-092",
      title: "VaporOS Editor",
      tagline: "Local-First Canvas Ecosystem Engine",
      hook: "A running edge-worker framework design vector.",
      shortDescription: "Bypassing centralized clusters to build an instant collaborative graphics sandbox engine optimized for offline environments.",
      description: "We are bypassing centralized databases entirely to build a super-fast collaborative engine. Our canvas system handles real-time peer networks under high latency. Engineered completely layout-agnostic.",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", 
      images: [
        "bg-gradient-to-br from-zinc-900 to-zinc-800",
        "bg-gradient-to-tr from-blue-950 to-zinc-900",
        "bg-gradient-to-r from-zinc-800 to-stone-900"
      ],
      repoUrl: "https://github.com",
      liveUrl: "https://vaporos.dev",
      lookingFor: ["WebAssembly", "Rust Dev", "UI/UX"],
      techStack: ["Rust", "React", "Cloudflare"],
      compensation: "50/50 Equity",
      capacity: { current: 2, total: 4 },
      upvotes: 412,
      currentTeam: [
        { name: "Alex K.", initials: "AK", role: "Core Infra" },
        { name: "Sarah L.", initials: "SL", role: "Product" }
      ],
      milestones: [
        { label: "Core Sync Engine Prototype", completed: true },
        { label: "WASM Rendering Layer Engine", completed: true }
      ]
    }
  ]);

  const [selectedCompensation, setSelectedCompensation] = useState<string[]>([]);
  const userSkills = ["UI/UX", "Frontend", "WebAssembly"];

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid accidental dialog opening triggers
    setProjects(prev => prev.map(p => p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <Navbar />

      <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
        {/* LEFT NAV REVEAL ARCHITECTURE */}
        <aside className="w-25 flex-none">
          <AppSideBar />
        </aside>

        {/* WORKSPACE ROW ENGINE CONTAINER */}
        <div className="flex-1 flex ">
          
          {/* CENTER PANEL SPACE */}
          <main className="flex-1 max-w-xl w-full border-l border-zinc-300 min-h-screen pt-13 bg-white flex flex-col">
            
            {/* STRICT SINGLE-LINE COMPACT HEADER */}
            <div className="p-3 bg-zinc-50 border-b border-zinc-300 flex items-center justify-between font-mono">
              <div className="text-[10px] font-black uppercase text-zinc-900 tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 inline-block" />
                <span>Co-Build Ecosystem // Production Feed Alpha</span>
              </div>
            </div>

            {/* CONTENT ROUTER ITERATOR FEED */}
            <div className="divide-y divide-zinc-300">
              {projects.map((project) => (
                <Dialog key={project.id}>
                  
                  {/* MODIFIED TRIGGER STRUCTURE ADAPTED TO PATTERN EXAMPLE */}
                  <DialogTrigger asChild>
                    <div className="mt-2.5 border border-zinc-300 bg-white overflow-hidden flex flex-col select-none cursor-pointer hover:border-zinc-400 group transition-colors">
                      
                      {/* 1. VIEWPORT COVER DESIGN WITH IMAGE COUNT BADGE OVERLAY */}
                      {project.coverImage && (
                        <div className="w-full aspect-[16/9] bg-zinc-100 border-b border-zinc-300 relative overflow-hidden">
                          <img 
                            src={project.coverImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                          <div className="absolute top-2 left-2 bg-zinc-900/90 text-white font-mono text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border border-zinc-700 flex items-center gap-1.5 backdrop-blur-xs">
                            <FolderGit2 size={10} className="text-blue-500" /> #{project.id} // Active Build
                          </div>

                          {/* Multi-Image Overlay Status indicator pills */}
                          {project.images && project.images.length > 0 && (
                            <div className="absolute bottom-2 right-2 bg-black/80 border border-zinc-800 text-[8px] font-mono font-black text-zinc-300 px-2 py-0.5 flex items-center gap-1 uppercase tracking-tight">
                              <ImageIcon size={9} /> {project.images.length} Galleries Loaded
                            </div>
                          )}
                        </div>
                      )}

                      {/* 2. SPECIFIED META DETAILS INFO BLOCK & SHORT DESCRIPTION PARSING */}
                      <div className="p-2.5 bg-zinc-50/50 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xs font-mono font-black text-zinc-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors flex items-center gap-1">
                              {project.title} <ArrowUpRight size={11} className="text-zinc-300 group-hover:text-blue-600" />
                            </h3>
                            <p className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-tight mt-0.5">
                              {project.tagline}
                            </p>
                          </div>
                          <span className="text-[9px] font-mono font-black bg-zinc-200 border border-zinc-300 text-zinc-800 px-1 py-0.5 whitespace-nowrap uppercase">
                            {project.compensation}
                          </span>
                        </div>

                        {/* Custom Card short-description wrapper assignment block */}
                        {project.shortDescription && (
                          <p className="text-xs text-zinc-600 leading-relaxed font-mono uppercase border-t border-dashed border-zinc-200 pt-1.5">
                            {project.shortDescription}
                          </p>
                        )}

                        {/* Inline Skill Tags Match Identification */}
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {project.lookingFor.map((role, idx) => {
                            const isMatch = userSkills.includes(role);
                            return (
                              <span 
                                key={idx} 
                                className={cn(
                                  "text-[8px] font-mono font-black uppercase px-1.5 py-0.5 border",
                                  isMatch ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-zinc-100 text-zinc-500 border-zinc-200"
                                )}
                              >
                                {isMatch ? `★ ${role}` : role}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* 3. SOLID TACTILE GRID ARCHITECTURE INTERACTIVE ANCHORS FOOTER */}
                      <div className="grid grid-cols-2 gap-px bg-zinc-300 border-t border-zinc-300" onClick={(e) => e.stopPropagation()}>
                        
                        {/* LEFT SECTION CONTROLS UPVOTE AND ENGAGEMENT SYSTEMS */}
                        <button 
                          onClick={(e) => handleUpvote(project.id, e)}
                          className="h-8 bg-white hover:bg-zinc-50 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black text-zinc-700 uppercase tracking-wider transition-colors active:bg-zinc-100 border-none outline-none cursor-pointer"
                        >
                          <Flame size={12} className="fill-current text-orange-500" /> Upvote Network // {project.upvotes}
                        </button>

                        {/* RIGHT SECTION DELEGATES MODAL DIALOG PREVIEWS */}
                        <div 
                          className="h-8 bg-zinc-900 text-white hover:bg-blue-600 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider transition-colors active:bg-blue-700 cursor-pointer"
                          onClick={() => {
                            // Let propagation run through context container to open Dialog layout naturally
                            const trigger = document.querySelector(`[data-id="trigger-${project.id}"]`) as HTMLElement;
                            if (trigger) trigger.click();
                          }}
                        >
                          <Layers size={11} /> Open Matrix Specifications
                        </div>
                      </div>

                    </div>
                  </DialogTrigger>

                  {/* SHADCN FULL SPEC ALL-INFORMATION LAYOUT DIALOG DIALOG OVERLAY CONTAINER */}
                  <DialogContent className="sm:max-w-[460px] p-0 rounded-none border-2 border-zinc-900 shadow-none overflow-hidden bg-white gap-0 animate-none">
                    <DialogHeader className="bg-zinc-900 p-2 px-3 border-b border-zinc-900 flex flex-row items-center justify-between space-y-0 w-full text-white">
                      <DialogTitle className="text-[11px] font-mono font-black tracking-wide uppercase text-white flex gap-1.5 items-center">
                        <Layers size={12} /> Target Pipeline Briefing: {project.title}
                      </DialogTitle>
                      <DialogClose asChild>
                        <button className="hover:bg-white/20 p-1 transition-colors border-none outline-none cursor-pointer">
                          <X className="w-3.5 h-3.5 text-white" />
                        </button>
                      </DialogClose>
                    </DialogHeader>

                    {/* Every Information Dialog Matrix Body Layer */}
                    <div className="max-h-[75vh] overflow-y-auto divide-y divide-zinc-300 font-mono">
                      
                      <div className="p-3.5 bg-zinc-50 flex items-center justify-between">
                        <div>
                          <div className="text-[8px] font-bold text-zinc-400 uppercase">NODE // {project.id}</div>
                          <h2 className="text-sm font-black uppercase text-zinc-900 leading-none mt-0.5">{project.title}</h2>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tight text-white bg-blue-600 px-1.5 py-0.5">
                          {project.compensation}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">ALL_INFO_DESCRIPTION</span>
                        <p className="text-[11px] text-zinc-700 leading-relaxed uppercase">{project.description}</p>
                      </div>

                      {/* Explicitly houses multiple attached image class matrices arrays */}
                      <div className="p-3.5 space-y-1.5 bg-zinc-50/50">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">ATTACHED_SCHEMATICS ({project.images.length})</span>
                        <div className="grid grid-cols-1 gap-2">
                          {project.images.map((imgStyle, index) => (
                            <div key={index} className={cn("w-full h-24 border border-zinc-200 flex items-center justify-center text-white relative", imgStyle)}>
                              <ImageIcon size={14} className="text-white/20" />
                              <div className="absolute top-1 right-2 text-[6px] font-bold bg-black/40 px-1 tracking-tight">LAYER_0{index+1}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Intelligence stack profiles module details */}
                      <div className="p-3.5 space-y-2">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">REQUIRED_INTELLIGENCE_STACKS</span>
                        <div className="flex flex-col gap-1">
                          <div className="text-[9px] text-zinc-400 font-bold">LOOKING FOR TARGETS:</div>
                          <div className="flex flex-wrap gap-1">
                            {project.lookingFor.map((r, i) => (
                              <span key={i} className="text-[9px] font-black uppercase px-2 py-0.5 bg-zinc-100 border border-zinc-300 text-zinc-800">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Direct target external code anchors links */}
                      <div className="p-3.5 space-y-1.5">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">REPOSITORY_DEPLOYMENT_INTEGRITY</span>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          {project.repoUrl ? (
                            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-2 border border-zinc-300 bg-zinc-50 flex items-center justify-center gap-1 text-zinc-700 font-bold uppercase hover:bg-zinc-100">
                              <Github size={12} /> Repository [↗]
                            </a>
                          ) : (
                            <div className="p-2 border border-zinc-200 text-zinc-400 bg-zinc-50/50 text-center uppercase">Closed Core</div>
                          )}
                          {project.liveUrl ? (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 bg-zinc-900 text-white flex items-center justify-center gap-1 font-bold uppercase hover:bg-blue-600">
                              <ExternalLink size={12} /> Live Link [↗]
                            </a>
                          ) : (
                            <div className="p-2 border border-zinc-200 text-zinc-400 bg-zinc-50/50 text-center uppercase">Staging Only</div>
                          )}
                        </div>
                      </div>

                      {/* Team capacity list layout matrix */}
                      <div className="p-3.5 space-y-2">
                        <span className="text-[7px] font-black text-zinc-400 uppercase tracking-wider block">VERIFIED_CURRENT_TEAM</span>
                        <div className="grid grid-cols-2 gap-2">
                          {project.currentTeam.map((m, idx) => (
                            <div key={idx} className="p-2 border border-zinc-200 flex items-center gap-2 bg-white">
                              <div className="w-5 h-5 bg-zinc-900 text-white text-[8px] font-black flex items-center justify-center shrink-0">
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

                      {/* Modal system closing interface panel anchors */}
                      <div className="p-2 bg-zinc-50 flex gap-2">
                        <DialogClose asChild>
                          <button className="h-9 px-4 bg-white border border-zinc-300 text-zinc-600 font-black text-[10px] uppercase tracking-wider hover:bg-zinc-100 cursor-pointer">
                            Close Specs
                          </button>
                        </DialogClose>
                        <button className="flex-1 h-9 bg-zinc-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors cursor-pointer">
                          Transmit Application Pitch
                        </button>
                      </div>

                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </main>

          {/* COLUMN 3: FILTER CONTROLS SIDEBAR (COMPRESSED TO EXACTLY w-39 / w-[156px]) */}
          <aside className="w-[156px] flex-none hidden md:flex flex-col bg-white border-x border-zinc-300 min-h-screen pt-13">
            <div className="flex flex-col h-full divide-y divide-zinc-300 sticky top-[53px]">
              
              <div className="p-2 px-3 bg-zinc-50 flex items-center gap-1.5">
                <SlidersHorizontal size={10} className="text-zinc-800" />
                <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-900">
                  Filters
                </span>
              </div>

              <div className="p-2 px-3 space-y-1">
                <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Role Lookup</label>
                <div className="w-full h-7 px-1.5 border border-zinc-200 flex items-center gap-1 bg-white">
                  <Search size={9} className="text-zinc-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="E.G., DEVOPS..." 
                    className="w-full bg-transparent border-none outline-none font-mono text-[8px] uppercase placeholder:text-zinc-300 min-w-0"
                  />
                </div>
              </div>

              <div className="p-2 px-3 space-y-1.5">
                <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Split Model</label>
                <div className="space-y-1">
                  {["50/50 Equity", "Profit Share", "Open Source"].map((compType) => (
                    <label key={compType} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                      <input 
                        type="checkbox"
                        className="sr-only peer"
                        checked={selectedCompensation.includes(compType)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompensation([...selectedCompensation, compType]);
                          } else {
                            setSelectedCompensation(selectedCompensation.filter(x => x !== compType));
                          }
                        }}
                      />
                      <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0">
                        <Check size={8} className="text-white hidden peer-checked:block stroke-[3]" />
                      </div>
                      <span className="truncate peer-checked:font-black">{compType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-zinc-50 mt-auto">
                <button className="w-full h-7 bg-white border border-dashed border-zinc-300 hover:border-zinc-900 text-zinc-500 hover:text-zinc-900 font-mono font-black text-[8px] uppercase tracking-tight transition-colors flex items-center justify-center gap-1 cursor-pointer">
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