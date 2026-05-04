import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Activity, Globe, Hash, LockOpen } from 'lucide-react';
import type { Community } from '@/types/communities';

interface CardProps {
  community: Community;
}

const CompactProtocolCard: React.FC<CardProps> = ({ community }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/app/communities/${community.name}`)}
      className="group bg-white flex flex-col relative transition-all cursor-pointer overflow-hidden  border-zinc-300 h-full hover:bg-zinc-200/80"
    >
      {/* IDENTITY CLUSTER */}
      <div className="p-2 pb-1 flex items-center gap-2">
        {/* LOGO BOX */}
        <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center border border-zinc-800 shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
          {community.logo ? (
            <img 
              src={community.logo} 
              alt={community.name} 
              className="w-7 h-7 object-contain invert opacity-90 group-hover:opacity-100 transition-opacity" 
            />
          ) : (
            <span className="text-xs font-black text-white font-mono">{community.name[0]}</span>
          )}
        </div>

        {/* INFO CLUSTER */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center justify-between mb-1">
             <h3 className="text-[12px] font-black text-zinc-900 uppercase tracking-tight truncate leading-none">
              {community.name}
            </h3>

            {/* HOVER-ONLY ARROW INDICATOR */}
            <ArrowRight 
              size={14} 
              className="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out" 
            />
          </div>
          
          {/* TECHNICAL METADATA ROW - CLEAN TAG STYLE */}
          <div className="flex items-center gap-3 overflow-hidden">
            {/* TAG AS ICON + TEXT */}
            <div className="flex items-center gap-1 shrink-0">
               <Hash size={11} className="text-zinc-500" />
               <span className="text-[9px]  text-zinc-500 uppercase tracking-tighter">
                {community.tag}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <Globe size={11} className="text-zinc-500" />
              <span className="text-[9px] text-zinc-500 uppercase tracking-tighter">Public</span>
            </div>

            
          </div>
        </div>
      </div>

      {/* DESCRIPTION & FOOTER */}
      <div className="px-2 py-2 flex flex-col gap-2">
        <p className="text-[10px] text-zinc-600 font-mono leading-[1.3] uppercase line-clamp-2 h-[26px]">
          Operationalizing secure intelligence protocols for the {community.name} network environment.
        </p>

        <div className="flex items-center justify-between border-t border-zinc-300 pt-2">
          <div className="flex items-center gap-1.5">
            <Users size={10} className="text-blue-500" />
            <span className="text-[9px] font-mono font-bold text-zinc-900  uppercase tracking-tighter">
              {community.members} <span className="opacity-100 text-[8px] text-zinc-500">user</span>
            </span>
          </div>
          
          
        </div>
      </div>

      {/* TOP-RIGHT CORNER ACCENT */}
      <div className="absolute top-0 right-0 w-4 h-4 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[1px] h-full bg-zinc-100" />
        <div className="absolute top-0 right-0 w-full h-[1px] bg-zinc-100" />
      </div>
    </div>
  );
};

export default React.memo(CompactProtocolCard);