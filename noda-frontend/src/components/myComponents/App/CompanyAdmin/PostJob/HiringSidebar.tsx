import React from 'react';
import { Users, Zap } from 'lucide-react';
import type { HiringSidebarProps } from '@/types/admin/jobPost';

const HiringSidebar: React.FC<HiringSidebarProps> = ({ 
    companyInitial, companyName, nodeCount, activeJobs, avgApplicants 
}) => (
    <div className="w-40 flex flex-col bg-zinc-50/50 overflow-y-auto scrollbar-hide shrink-0">
        <div className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white flex items-center justify-center mb-3">
                <span className="text-xl font-black text-zinc-900 font-mono">{companyInitial}</span>
            </div>
            <h5 className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">{companyName}</h5>
            <div className="flex items-center gap-1 text-zinc-300">
                <Users size={10} />
                <span className="text-[9px] font-mono font-bold uppercase tracking-tighter">{nodeCount}_NODES</span>
            </div>
        </div>

        <div className="p-4 space-y-8 flex-1">
            <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-orange-600" />
                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-900">Hiring_Stats</span>
            </div>
            <div className="space-y-4">
                <SidebarStat label="Active_Jobs" value={activeJobs} />
                <SidebarStat label="Avg_Applicants" value={avgApplicants} />
            </div>
        </div>
    </div>
);

const SidebarStat = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex flex-col">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-sm font-bold text-zinc-900 tracking-tighter">{value}</span>
    </div>
);

export default React.memo(HiringSidebar);