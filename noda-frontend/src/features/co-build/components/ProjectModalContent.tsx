import React, { useState } from 'react';
import { 
  Layers, 
  X, 
  Info, 
  User, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from "@/components/ui/dialog";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

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

// --- INTEGRATED INLINE IMAGE CAROUSEL MODULE ---
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-video bg-zinc-100 border-b border-zinc-300 flex items-center justify-center">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">No_Visual_Data</span>
      </div>
    );
  }

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-video bg-zinc-200 border-b border-zinc-300 overflow-hidden group select-none">
      <img
        src={images[currentIndex]}
        alt={`Intel attachment ${currentIndex + 1}`}
        className="w-full h-full object-cover pointer-events-none"
      />
      
      {images.length > 1 && (
        <>
          <button 
            type="button"
            onClick={prev}
            className="absolute left-0 top-0 bottom-0 px-3 bg-black/20 hover:bg-black/40 cursor-pointer text-white transition-all flex items-center border-none outline-none"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
          <button 
            type="button"
            onClick={next}
            className="absolute right-0 top-0 bottom-0 px-3 bg-black/20 hover:bg-black/40 cursor-pointer text-white transition-all flex items-center border-none outline-none"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
          
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[8px] px-1.5 py-0.5 font-mono font-black uppercase tracking-widest border border-white/10">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}

      <div className="absolute top-2 left-2 bg-blue-600 text-white text-[8px] px-1.5 py-0.5 font-mono font-black uppercase tracking-widest">
        ATTACHED_RESOURCES
      </div>
    </div>
  );
};

// --- CORE REDESIGNED COMPONENT ---
const ProjectModalContent: React.FC<ProjectModalContentProps> = ({ project }) => {
  return (
    <DialogContent className="sm:max-w-[480px] p-0 border-none rounded-none shadow-none overflow-hidden bg-white gap-0 font-mono text-left select-none text-zinc-900">
      
      {/* HEADER SECTION */}
      <DialogHeader className="bg-blue-600 p-1.5 px-3  flex flex-row items-center justify-between space-y-0 w-full text-white">
        <DialogTitle className="text-[11px] font-black tracking-wide uppercase text-white flex gap-1.5 items-center">
          <Layers size={12} strokeWidth={2.5} /> {project.title}
        </DialogTitle>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold text-white uppercase tracking-wider">
            ID_{project.id}
          </span>
          <DialogClose asChild>
            <button className="hover:bg-black/20 text-zinc-100 hover:text-white cursor-pointer p-0.5 transition-colors outline-none border-none bg-transparent">
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </DialogClose>
        </div>
      </DialogHeader>

      <div className="max-h-[75vh] overflow-y-auto scrollbar-hide flex flex-col">
        
        {/* CAROUSEL GRAPHIC COMPONENT */}
        <ImageCarousel images={project.images} />

        {/* CLASSIFICATION VALUATION TRAILER */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-300 bg-zinc-50/50">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
            VALUATION
          </span>
          <span className="text-[10px] font-black uppercase text-white bg-blue-600 px-1.5 py-0.5">
            {project.compensation}
          </span>
        </div>

        {/* DESIGNATION ENTITY NAME */}
        <div className="border-b border-zinc-300 p-3 flex flex-col gap-0.5 bg-white">
          <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">
            TITLE
          </div>
          <h2 className="text-sm font-black text-zinc-900 uppercase tracking-tight leading-snug">
            {project.title}
          </h2>
        </div>

        {/* CORE SPEC INTEL DESCRIPTION */}
        <div className="border-b border-zinc-300 p-3 flex flex-col gap-1 bg-white">
          <div className="font-black text-zinc-500 flex items-center gap-1 uppercase text-[9px] tracking-widest">
             DESCRIPTION
          </div>
          <p className="text-[10px] leading-relaxed mt-0.5 uppercase text-zinc-900 select-text font-sans tracking-wide">
            {project.description}
          </p>
        </div>

        {/* STRUCTURAL VERIFIED CREW REGISTRY */}
        <div className="p-3 bg-white flex flex-col gap-1.5 flex-1">
          <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">
            CURRENT Team ({project.currentTeam.length} User)
          </span>
          <div className="grid grid-cols-2 gap-2 w-full">
            {project.currentTeam.map((member, idx) => (
              <div 
                key={idx} 
                className="p-1.5  flex items-center gap-2 border border-zinc-300 bg-zinc-200 w-full overflow-hidden"
              >
                <div className="w-7 h-7 bg-zinc-800 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                  {member.initials.toUpperCase()}
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="text-xs font-black uppercase text-zinc-900 tracking-tight truncate">
                    {member.name}
                  </span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mt-0.5 leading-none">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
            {project.currentTeam.length === 0 && (
              <span className="col-span-2 text-[9px] text-zinc-400 italic py-1">
                NO CREW ASSIGNED TO THIS Project
              </span>
            )}
          </div>
        </div>

        {/* BOTTOM STEP MATRIX ACTION RUNTIMES */}
        <div className="grid grid-cols-2 gap-0 mt-auto items-stretch border-t border-zinc-300">
          <DialogClose asChild>
            <button 
              type="button" 
              className="h-11 bg-white hover:bg-zinc-200 text-zinc-500 hover:text-red-600 font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-1.5 border-none outline-none border-r border-zinc-300"
            >
              CLOSE
            </button>
          </DialogClose>
          <button 
            type="button"
            className="h-11 bg-zinc-900 text-white font-black text-[10px] uppercase cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 border-none outline-none"
          >
            <span>Apply</span>
            <ArrowUpRight size={12} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </DialogContent>
  );
};

export default ProjectModalContent;