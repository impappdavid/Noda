import { Sparkles, Check } from "lucide-react";
import type { MilestoneData } from "./types";

export const SystemMilestoneModule = ({ milestone }: { milestone: MilestoneData }) => {
  // Ultra-compact theme configurations
  const themeConfig = {
    PROMOTION: {
      actionText: "PROMOTED",
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      textColor: "text-emerald-700",
    },
    NEW_HIRE: {
      actionText: "JOINED",
      gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
      textColor: "text-blue-700",
    },
    ANNIVERSARY: {
      actionText: "ANNIVERSARY",
      gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
      textColor: "text-amber-700",
    },
  }[milestone.category];

  return (
    <div 
      className="mt-2 border border-zinc-300 rounded-none bg-white overflow-hidden select-none"
      onClick={(e) => e.preventDefault()}
    >
      {/* 1. COMPACT HERO BANNER (Strict Square Assets & Layout) */}
      <div className={`h-14 w-full bg-gradient-to-r ${themeConfig.gradient} relative flex items-center justify-between p-2 border-b border-zinc-200`}>
        
        {/* RECTILINEAR OVERLAPPING BADGE MATRIX */}
        <div className="flex items-center gap-2">
          <div className="relative w-11 h-11 shrink-0">
            {/* Base Block: Company Logo Container */}
            <div className="absolute top-0 left-0 w-8 h-8 rounded-none border border-zinc-300 bg-black overflow-hidden flex items-center justify-center shadow-xs">
              <img 
                src={milestone.companyLogo} 
                alt={milestone.companyName} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Overlap Block: Target Employee Portrait */}
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-none border border-white bg-zinc-100 overflow-hidden shadow-xs">
              <img 
                src={milestone.targetUser.avatar} 
                alt={milestone.targetUser.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Corner System Verification Indicator */}
            <div className="absolute top-0 right-2.5 bg-emerald-600 text-white rounded-none p-0.5 border border-white z-30 flex items-center justify-center">
              <Check size={6} className="stroke-[4]" />
            </div>
          </div>

          {/* Identity Descriptor */}
          <div className="min-w-0">
            <h4 className="text-[11px] font-mono font-black text-zinc-900 uppercase tracking-wide truncate leading-tight">
              {milestone.companyName}
            </h4>
            <span className="text-[9px] font-mono text-zinc-400 block truncate leading-none mt-0.5">
              @{milestone.targetUser.username}
            </span>
          </div>
        </div>

        {/* BOLD DISPATCH LABEL */}
        <div className="pr-1">
          <span className={`text-base font-mono font-black tracking-wider ${themeConfig.textColor}`}>
            {themeConfig.actionText}
          </span>
        </div>
      </div>

      {/* 2. DESCRIPTION TEXT & INTERACTION ROW (Max p-2, gap-2) */}
      <div className="p-2 flex flex-col gap-2">
        <div className="bg-zinc-50 rounded-none p-2 border border-zinc-200 text-xs text-zinc-600 leading-relaxed font-normal">
          {milestone.category === "NEW_HIRE" && (
            <p>
              Please congratulate <span className="font-bold text-zinc-900">{milestone.targetUser.name}</span> on their formal onboarding parameters update! Welcome to the workspace ecosystem as the newly appointed <span className="font-bold text-zinc-900 uppercase">{milestone.targetUser.assignedRole}</span>.
            </p>
          )}
          {milestone.category === "PROMOTION" && (
            <p>
              Please congratulate <span className="font-bold text-zinc-900">{milestone.targetUser.name}</span> on their formal career evolution milestone setup! Advanced safely from <span className="text-zinc-400 line-through">{milestone.targetUser.previousRole}</span> to the new rank of <span className="font-bold text-zinc-900 uppercase">{milestone.targetUser.assignedRole}</span>.
            </p>
          )}
          {milestone.category === "ANNIVERSARY" && (
            <p>
              Please congratulate <span className="font-bold text-zinc-900">{milestone.targetUser.name}</span> on celebrating an official tenure log milestone marker! Active infrastructure commitment as a dedicated <span className="font-bold text-zinc-900 uppercase">{milestone.targetUser.assignedRole}</span>.
            </p>
          )}
        </div>

        {/* CONTROLS AREA */}
        <div className="flex justify-end">
          <button 
            onClick={() => alert(`Saluted @${milestone.targetUser.username}`)}
            className="h-6 px-2.5 border border-zinc-300 rounded-none bg-white hover:bg-zinc-50 transition-colors text-[10px] font-mono font-black text-zinc-700 uppercase tracking-wider cursor-pointer flex items-center gap-1 active:scale-[0.98]"
          >
            <Sparkles size={10} className="text-zinc-400 fill-zinc-400" />
            <span>Salute</span>
          </button>
        </div>
      </div>
    </div>
  );
};