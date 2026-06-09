import React, { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ProjectModalContent from './ProjectModalContent';

interface TeamMember {
  name: string;
  initials: string;
  role: string;
}

interface Project {
  id: string;
  title: string;
  hook: string;
  description: string;
  images: string[];
  lookingFor: string[];
  techStack: string[];
  compensation: string;
  upvotes: number;
  currentTeam: TeamMember[];
}

interface ProjectCardProps {
  project: Project;
  onUpvote: (id: string, e: React.MouseEvent) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onUpvote }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIdx((prev) => (prev + 1) % project.images.length);
  };

  return (
    <Dialog>
      {/* Outer card box wrapper is left clear of any bottom borders */}
      <div 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
        className="bg-white flex flex-col select-none relative rounded-none p-1.5 gap-2"
      >
        {/* Project Image Carousel Wrapper */}
        <div className="w-full aspect-[16/10] relative overflow-hidden shrink-0 group bg-zinc-100 border border-zinc-200 rounded-none">
          <img 
            src={project.images[currentImgIdx]} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between px-1.5 pointer-events-none">
            <button 
              onClick={handlePrevImage}
              className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center shadow-none pointer-events-auto cursor-pointer transition-transform active:scale-90 rounded-none border-none outline-none"
            >
              <ChevronLeft size={12} strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleNextImage}
              className="w-5 h-5 bg-zinc-900 text-white flex items-center justify-center shadow-none pointer-events-auto cursor-pointer transition-transform active:scale-90 rounded-none border-none outline-none"
            >
              <ChevronRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          <div className="absolute top-1.5 left-1.5 flex gap-1 bg-zinc-900/90 px-1.5 py-0.5 border border-zinc-700 text-[8px] font-mono font-black text-white rounded-none">
            0{currentImgIdx + 1} / 0{project.images.length}
          </div>
        </div>

        {/* Textual Metadata Parameters Area */}
        <div className="flex flex-col flex-1 justify-between gap-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <h2 className="text-xs font-mono font-black uppercase tracking-tight text-zinc-900 truncate">
                {project.title}
              </h2>
            </div>

            {/* Looking For Segment Chips */}
            <div className="flex flex-wrap gap-1">
              <span className="text-[9px] font-mono font-bold uppercase text-zinc-500 self-center">LOOKING FOR:</span>
              {project.lookingFor.map((tag, idx) => (
                <span key={idx} className="text-[9px] font-mono font-black uppercase px-1 py-0.2 bg-zinc-800 text-white border border-zinc-800 rounded-none">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-[11px] font-mono text-zinc-600 leading-tight uppercase line-clamp-2">
              {project.hook}
            </p>
          </div>

          {/* Current Crew / Members Container */}
          <div className="border-t border-dashed border-zinc-200 pt-2 mt-1">
            <div className="text-[8px] font-mono font-bold uppercase text-zinc-500 mb-1 flex items-center gap-1">
               Active Members ({project.currentTeam.length})
            </div>
            <div className="flex flex-wrap gap-1">
              {project.currentTeam.map((member, idx) => (
                <div key={idx} className="flex items-center gap-1 bg-zinc-50 border border-zinc-200 px-1 py-0.5 rounded-none text-[9px] font-mono text-zinc-700">
                  <span className="font-black text-zinc-900">{member.name}</span>
                  <span className="text-zinc-600 text-[9px]">({member.role})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Bar: Learn More + Like Button */}
          <div className="flex items-stretch w-full h-8 mt-1 gap-1">
            {/* Main Action Trigger */}
            <DialogTrigger asChild>
              <button className="flex-1 h-full bg-blue-500 hover:bg-blue-600 text-white font-mono font-black text-[9px] uppercase tracking-widest transition-colors rounded-none border-none outline-none cursor-pointer flex items-center justify-center gap-1.5">
                 LEARN MORE
              </button>
            </DialogTrigger>

            {/* Relocated Like (Flame) Button */}
            <button 
              onClick={(e) => onUpvote(project.id, e)}
              className="flex items-center justify-center gap-1 w-14 h-full text-[9px] font-mono font-black border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors shrink-0 cursor-pointer rounded-none outline-none"
            >
              <Flame size={10} strokeWidth={2.5} className="text-zinc-400 group-hover:text-zinc-900" /> 
              <span>{project.upvotes}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Render the extracted profile dialog content wrapper details */}
      <ProjectModalContent project={project} />
    </Dialog>
  );
};

export default ProjectCard;