import React from 'react';
import { SlidersHorizontal, Check, Plus } from 'lucide-react';

interface ProjectFilterSidebarProps {
  selectedRoles: string[];
  selectedSkills: string[];
  selectedCompensation: string[];
  onToggleFilter: (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => void;
  setSelectedRoles: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedCompensation: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProjectFilterSidebar: React.FC<ProjectFilterSidebarProps> = ({
  selectedRoles,
  selectedSkills,
  selectedCompensation,
  onToggleFilter,
  setSelectedRoles,
  setSelectedSkills,
  setSelectedCompensation
}) => {
  return (
    <aside className="w-39 flex-none hidden lg:flex flex-col bg-white border-l border-zinc-300 min-h-screen ">
      <div className="flex flex-col h-full divide-y divide-zinc-200 sticky top-13.25">
        
        <div className="p-2 px-3 bg-zinc-50 flex items-center gap-1.5">
          <SlidersHorizontal size={10} className="text-zinc-800" />
          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-900">
            Filters
          </span>
        </div>

        {/* Roles Group Box Segment */}
        <div className="p-2 px-3 space-y-1.5">
          <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Target Roles</label>
          <div className="space-y-1">
            {["Frontend", "Backend", "DevOps", "UI/UX", "Fullstack"].map((role) => (
              <label key={role} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedRoles.includes(role)}
                  onChange={() => onToggleFilter(selectedRoles, setSelectedRoles, role)}
                />
                <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                  <Check size={8} className="text-white hidden peer-checked:block stroke-3" />
                </div>
                <span className="truncate peer-checked:font-black">{role}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Skills Group Box Segment */}
        <div className="p-2 px-3 space-y-1.5">
          <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Core Skills</label>
          <div className="space-y-1">
            {["TypeScript", "Rust", "Docker", "Python"].map((skill) => (
              <label key={skill} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => onToggleFilter(selectedSkills, setSelectedSkills, skill)}
                />
                <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                  <Check size={8} className="text-white hidden peer-checked:block stroke-3" />
                </div>
                <span className="truncate peer-checked:font-black">{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Comp Model Group Box Segment */}
        <div className="p-2 px-3 space-y-1.5">
          <label className="text-[7px] font-mono font-black uppercase text-zinc-400 block">Split Model</label>
          <div className="space-y-1">
            {["50/50 Equity", "Profit Share", "Open Source"].map((compType) => (
              <label key={compType} className="flex items-center gap-1.5 cursor-pointer group text-[9px] font-mono font-bold uppercase text-zinc-700 hover:text-zinc-900">
                <input 
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedCompensation.includes(compType)}
                  onChange={() => onToggleFilter(selectedCompensation, setSelectedCompensation, compType)}
                />
                <div className="w-3 h-3 border border-zinc-300 bg-white flex items-center justify-center peer-checked:bg-zinc-900 peer-checked:border-zinc-900 transition-colors shrink-0 rounded-none">
                  <Check size={8} className="text-white hidden peer-checked:block stroke-3" />
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
  );
};

export default ProjectFilterSidebar;