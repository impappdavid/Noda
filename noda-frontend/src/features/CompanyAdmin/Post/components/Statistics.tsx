import React from 'react';
import { cn } from "@/lib/utils";
import type { ToolbarButtonProps } from '@/types/admin/createPost';

export const StatItem = React.memo(({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-sm font-bold text-zinc-900 tracking-tighter">{value}</span>
    </div>
));

export const ToolbarButton = React.memo(({ icon, label, onClick, active }: ToolbarButtonProps) => (
    <button 
        onClick={onClick}
        className={cn(
            "h-9 px-3 flex items-center gap-2 transition-colors cursor-pointer group",
            active ? "bg-zinc-800 text-white" : "hover:bg-zinc-800/40 text-zinc-600"
        )}
    >
        <span className={cn(active ? "text-white" : "group-hover:text-zinc-900")}>{icon}</span>
        <span className="text-[10px] font-mono font-black uppercase">{label}</span>
    </button>
));