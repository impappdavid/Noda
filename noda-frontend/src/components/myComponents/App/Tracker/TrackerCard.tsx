import React from 'react';
import { cn } from "@/lib/utils";
import type { NodeEntry } from '@/types/tracker';

interface NodeCardProps {
    item: NodeEntry;
    index: number;
    onClick: () => void;
}

const NodeCard: React.FC<NodeCardProps> = ({ item, index, onClick }) => {
    const isUnscheduled = item.status === "Interviewing" && !item.interviewDate;
    const borderClasses = `border-b border-zinc-300 ${index % 2 === 0 ? 'border-r' : ''}`;

    return (
        <div
            onClick={onClick}
            className={cn(
                "p-3 flex flex-col justify-center min-h-[72px] transition-colors cursor-pointer group relative",
                borderClasses,
                isUnscheduled ? "bg-zinc-200 hover:bg-zinc-200/80" : "bg-white hover:bg-zinc-200/60"
            )}
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col min-w-0">
                    <span className={cn(
                        "text-[9px] font-mono font-black uppercase tracking-widest",
                        isUnscheduled ? "text-orange-600" : "text-zinc-500"
                    )}>
                        {isUnscheduled ? "INTELLIGENCE REQUIRED" : `APPLIED ${item.applied}`}
                        <span className="mx-1 opacity-30">•</span> {item.match}%
                    </span>
                    <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5">
                        {item.role}
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-medium truncate uppercase mt-0.5">{item.company}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                    <div className="flex items-center gap-1.5">
                        <div className={cn("w-1 h-1 rounded-full",
                            item.status === 'Offer' ? 'bg-emerald-500' :
                            item.status === 'Interviewing' ? 'bg-blue-500' :
                            item.status === 'Applied' ? 'bg-orange-500' : 'bg-red-500'
                        )} />
                        <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">{item.status}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(NodeCard);