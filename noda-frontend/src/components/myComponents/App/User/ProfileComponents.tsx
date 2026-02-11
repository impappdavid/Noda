import React from 'react';
import { Briefcase } from 'lucide-react';
import type { IntelligenceMetricProps, PostStatProps, TimelineEntryProps } from '@/types/user';

export const PostStat: React.FC<PostStatProps> = ({ icon, count }) => (
    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors border-none bg-transparent cursor-pointer">
        {icon}
        <span className="text-[11px] font-mono font-black uppercase tracking-tighter">{count}</span>
    </button>
);

export const TimelineEntry: React.FC<TimelineEntryProps> = ({ role, org, date }) => (
    <div className="flex gap-4">
        <div className="w-11 h-11 bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 shadow-sm">
            <Briefcase size={16} className="text-white" />
        </div>
        <div className="flex flex-col">
            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase mb-0.5">{date}</span>
            <h4 className="text-[11px] font-bold uppercase tracking-tight">{role}</h4>
            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{org}</span>
        </div>
    </div>
);

export const IntelligenceMetric: React.FC<IntelligenceMetricProps> = ({ label, value }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tight">{label}</span>
        <span className="text-[9px] font-black uppercase text-zinc-900">{value}</span>
    </div>
);