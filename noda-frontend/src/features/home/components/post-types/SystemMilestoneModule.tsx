import React from "react";
import { ArrowRight, MessageSquarePlus } from "lucide-react";
import type { MilestoneData } from "./types";
import { useNotifications } from "@/context/NotificationContext";

export const SystemMilestoneModule = ({ milestone }: { milestone: MilestoneData }) => {
  const { addNotification } = useNotifications();

  const isPromotion = milestone.category === "PROMOTION";

  // Light-mode, high-contrast structural badge mappings
  const statusConfig = {
    PROMOTION: { label: "Promoted", style: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    NEW_HIRE: { label: "Hired", style: "bg-blue-50 text-blue-700 border-blue-200" },
    ANNIVERSARY: { label: "Anniversary", style: "bg-amber-50 text-amber-700 border-amber-200" },
  }[milestone.category];

  const handleCongratulate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addNotification({
      title: "CONGRATULATIONS FIRED",
      message: `Greeting signal successfully dispatched to @${milestone.targetUser.username}.`,
      type: "success",
    });
  };

  return (
    <div 
      className="w-full bg-white border border-zinc-200 rounded-none p-2 flex flex-col select-none font-mono text-left tracking-tight"
      onClick={(e) => e.preventDefault()}
    >
      {/* 1. TOP ROW HEADER (Matches 'Store: Name' & 'Status Badge' from image_ca3a91.png) */}
      <div className="flex items-center justify-between pb-1 border-b border-zinc-300">
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
          System Update
        </span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded-none ${statusConfig.style}`}>
          {statusConfig.label}
        </span>
      </div>

      {/* 2. MAIN CONTENT ROW (Matches product asset, titles, and right-side metrics from image_ca3a91.png) */}
      <div className="flex items-center justify-between gap-4 mt-3">
        
        {/* Left Side: Thumbnail Asset and Text Stack */}
        <div className="flex items-center gap-3 min-w-0">
          {/* User Profile Square Frame */}
          <div className="w-9 h-9 border border-zinc-200 bg-zinc-100 overflow-hidden shrink-0 rounded-none">
            <img 
              src={milestone.targetUser.avatar} 
              alt={milestone.targetUser.name} 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Primary Text Info Matrix */}
          <div className="min-w-0 flex flex-col justify-center">
            {/* The Role Header */}
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight">
              {isPromotion ? (
                <span className="flex items-center gap-1">
                  <span className="text-zinc-400 line-through font-normal">{milestone.targetUser.previousRole}</span>
                  <ArrowRight size={11} className="text-zinc-300 stroke-[2.5]" />
                  <span>{milestone.targetUser.assignedRole}</span>
                </span>
              ) : (
                <span>{milestone.targetUser.assignedRole}</span>
              )}
            </h4>
            
            {/* User Meta Subtitle */}
            <span className="text-[10px] text-zinc-400 font-normal block truncate mt-1">
              <span className="text-zinc-700 font-bold uppercase">{milestone.targetUser.name}</span> • @{milestone.targetUser.username}
            </span>
          </div>
        </div>

        {/* Right Side: Interactive Congratulate Trigger */}
        <div className="shrink-0">
          <button
            onClick={handleCongratulate}
            className="group flex items-center gap-1.5 h-6 px-2 bg-zinc-50 border border-zinc-200 text-[10px] font-bold text-zinc-700 hover:text-white hover:bg-zinc-950 hover:border-zinc-950 transition-all uppercase rounded-none cursor-pointer outline-none"
          >
            <span>Congratulate</span>
            <MessageSquarePlus size={11} className="text-zinc-400 group-hover:text-zinc-300" />
          </button>
        </div>

      </div>
    </div>
  );
};