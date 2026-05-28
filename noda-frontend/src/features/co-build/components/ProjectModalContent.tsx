import React from 'react';
import { Layers, X } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface TeamMember {
  name: string;
  initials: string;
  role: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  compensation: string;
  currentTeam: TeamMember[];
}

interface ProjectModalContentProps {
  project: Project;
}

const ProjectModalContent: React.FC<ProjectModalContentProps> = ({ project }) => {
  return (
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
                  0{index + 1}
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
  );
};

export default ProjectModalContent;