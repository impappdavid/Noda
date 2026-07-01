import React from 'react';
import { Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { CalendarCellProps } from '@/types/calendar';

const CalendarCell: React.FC<CalendarCellProps> = ({ day, interviews, isCurrent, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className={cn(
                "min-h-27.5 p-2 flex flex-col border-b border-zinc-300 transition-colors relative group",
                !day && "bg-zinc-50/20",
                day && "bg-white hover:bg-zinc-200/60 cursor-pointer",
                isCurrent && "bg-zinc-200/80"
            )}
        >
            {day && (
                <div className="flex justify-between items-start mb-1">
                    <span className={cn(
                        "text-[10px] font-mono font-black",
                        isCurrent ? "text-zinc-900 underline decoration-orange-500 underline-offset-4" : "text-zinc-400"
                    )}>
                        {day < 10 ? `0${day}` : day}
                    </span>
                    <Plus size={14} className="text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            )}

            <div className="space-y-1">
                {interviews.map((interview) => (
                    <div key={interview.id} className={cn(
                        "p-1 border flex flex-col gap-0",
                        interview.status === "Pending" ? "bg-orange-500/10 border-orange-200" : "bg-zinc-900 border-zinc-800 shadow-sm"
                    )}>
                        <div className="flex justify-between items-center leading-none mb-0.5">
                            <span className={cn(
                                "text-[8px] font-mono font-black uppercase",
                                interview.status === "Pending" ? "text-amber-600" : "text-zinc-500"
                            )}>
                                {interview.type}
                            </span>
                            <span className="text-[8px] font-mono text-orange-400">{interview.hour}</span>
                        </div>
                        <span className={cn(
                            "text-[9px] font-semibold uppercase truncate leading-tight",
                            interview.status === "Confirmed" ? "text-white" : "text-zinc-900"
                        )}>
                            {interview.company}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Prevent 42 cells from re-rendering unless their specific data changes
export default React.memo(CalendarCell);