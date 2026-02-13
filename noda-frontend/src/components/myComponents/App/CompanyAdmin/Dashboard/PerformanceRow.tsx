import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { PerformanceRowProps } from '@/types/admin/dashboard';

const PerformanceRow: React.FC<PerformanceRowProps> = ({ title, views, likes, comments }) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-50 transition-all cursor-pointer group">
        <span className="text-xs font-bold uppercase tracking-tight group-hover:text-orange-600 transition-colors">
            {title}
        </span>
        <div className="flex gap-6 items-center">
            <StatDetail label="Views" value={views} />
            <StatDetail label="Likes" value={likes} />
            <StatDetail label="Comm." value={comments} />
            <ArrowUpRight size={16} className="text-white group-hover:text-zinc-900 transition-all" />
        </div>
    </div>
);

const StatDetail = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col items-end">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{label}</span>
        <span className="text-[11px] font-black">{value}</span>
    </div>
);

export default React.memo(PerformanceRow);