import React from 'react';
import { cn } from "@/lib/utils";

interface MetricProps {
    label: string;
    value: string;
    color?: string;
}

const NotificationMetric: React.FC<MetricProps> = ({ label, value, color }) => (
    <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tight">{label}</span>
        <span className={cn("text-[10px] font-bold uppercase", color || "text-zinc-900")}>{value}</span>
    </div>
);

const SignalStats: React.FC = () => (
    <aside className="w-40 shrink-0 relative bg-zinc-50/10">
        <div className="sticky top-13 flex flex-col h-fit divide-y divide-zinc-300 border-b border-zinc-300">
            <div className="p-3 bg-zinc-50/50">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Signal_Stats</h2>
            </div>
            <div className="p-3 space-y-3 bg-white">
                <NotificationMetric label="Unread" value="02" />
                <NotificationMetric label="Job Alerts" value="01" />
                <NotificationMetric label="Network" value="08" />
            </div>
            <button className="w-full bg-zinc-800 text-white text-[9px] py-2 font-mono font-black uppercase tracking-widest hover:bg-black transition-all cursor-pointer">
                Clear_Signals
            </button>
        </div>
    </aside>
);

export default SignalStats;