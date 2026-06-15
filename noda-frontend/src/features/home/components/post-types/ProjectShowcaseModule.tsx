import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProjectData } from "./types";

export const ProjectShowcaseModule = ({ project }: { project: ProjectData }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/app/project/1");
  };

  return (
    <div 
      onClick={handleCardClick}
      className="mt-2.5 border border-zinc-300 bg-white overflow-hidden flex flex-col select-none cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* 1. COVER HERO IMAGE VIEWPORT */}
      {project.coverImage && (
        <div className="w-full aspect-[16/9] bg-zinc-100 border-b border-zinc-300 relative overflow-hidden group">
          <img 
            src={project.coverImage} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute top-2 left-2 bg-zinc-900/90 text-white font-mono text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 border border-zinc-700 flex items-center gap-1.5 backdrop-blur-xs">
            <FolderGit2 size={10} className="text-blue-500" /> Production Asset Build
          </div>
        </div>
      )}

      {/* 2. META DETAILS INFO BLOCK */}
      <div className="p-2.5 bg-zinc-50/50 space-y-1.5">
        <div>
          <h3 className="text-xs font-mono font-black text-zinc-900 uppercase tracking-wide">
            {project.title}
          </h3>
          <p className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-tight mt-0.5">
            {project.tagline}
          </p>
        </div>

        {project.description && (
          <p className="text-xs text-zinc-600 leading-relaxed font-normal border-t border-dashed border-zinc-200 pt-1.5">
            {project.description}
          </p>
        )}
      </div>

      {/* 3. SOLID TACTILE ROUTING ANCHORS */}
      <div className="grid grid-cols-2 gap-px bg-zinc-300 border-t border-zinc-300">
        {project.repoUrl ? (
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e) => e.stopPropagation()} // Prevents navigating to /app/project/1
            className="h-8 bg-white hover:bg-zinc-50 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black text-zinc-700 uppercase tracking-wider transition-colors active:bg-zinc-100"
          >
            <Github size={12} className="text-zinc-500" /> Source Repository
          </a>
        ) : (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="h-8 bg-zinc-50 flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase tracking-wider cursor-default"
          >
            Private Repository
          </div>
        )}

        {project.liveUrl ? (
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noreferrer" 
            onClick={(e) => e.stopPropagation()} // Prevents navigating to /app/project/1
            className="h-8 bg-zinc-900 text-white hover:bg-blue-600 flex items-center justify-center gap-1.5 text-[10px] font-mono font-black uppercase tracking-wider transition-colors active:bg-blue-700"
          >
            <ExternalLink size={11} /> Launch Build
          </a>
        ) : (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="h-8 bg-zinc-50 flex items-center justify-center text-[10px] font-mono text-zinc-400 uppercase tracking-wider cursor-default"
          >
            Internal Deployment
          </div>
        )}
      </div>
    </div>
  );
};