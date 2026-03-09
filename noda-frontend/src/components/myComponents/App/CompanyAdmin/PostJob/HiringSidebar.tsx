import React from 'react';
import { Users, Zap, Briefcase, Activity } from 'lucide-react';
import type { HiringSidebarProps } from '@/types/admin/jobPost';

const HiringSidebar: React.FC<HiringSidebarProps> = ({ 
    companyInitial, companyName, nodeCount, activeJobs, avgApplicants 
}) => (
    <aside className="w-38.5 flex flex-col bg-zinc-50/50 overflow-y-auto scrollbar-hide shrink-0 ">
        
        {/* 1. UNIT IDENTIFIER NODE */}
        <div className="p-2 border-b border-zinc-300 bg-white relative overflow-hidden group">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '8px 8px' }} />
            
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center">
                        <span className="text-lg font-black text-white font-mono">{companyInitial}</span>
                    </div>
                    <div className="flex flex-col">
                        <h5 className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 leading-none">{companyName}</h5>
                        <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase font-bold tracking-widest">Hiring_Entity</span>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-zinc-100 p-2 border border-zinc-200">
                    <Users size={12} className="text-zinc-500" />
                    <span className="text-[9px] font-mono font-black text-zinc-900 uppercase">{nodeCount} followers</span>
                </div>
            </div>
        </div>

        {/* 2. RECRUITMENT TELEMETRY */}
        <div className="p-2 space-y-2 flex-1">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Zap size={14} className="text-orange-600" />
                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-400">Hiring Registry</span>
                </div>
                
                <div className="space-y-5">
                    <SidebarStat 
                        label="Active Jobs" 
                        value={activeJobs} 
                        percentage={75} // Mock progress for visual depth
                        icon={<Briefcase size={12} />}
                    />
                    <SidebarStat 
                        label="Avg Applicants" 
                        value={avgApplicants} 
                        percentage={40} 
                        icon={<Activity size={12} />}
                    />
                </div>
            </div>

           
        </div>

       
    </aside>
);

const SidebarStat = ({ label, value, percentage, icon }: { label: string, value: string | number, percentage: number, icon: React.ReactNode }) => (
    <div className="space-y-1.5 group">
        <div className="flex justify-between items-end">
            <div className="flex items-center gap-1.5">
                <span className="text-zinc-500 group-hover:text-orange-500 transition-colors">{icon}</span>
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{label}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-900">{value}</span>
        </div>
        <div className="h-1 bg-zinc-300 w-full overflow-hidden">
            <div 
                className="h-full bg-zinc-900 transition-all duration-1000 ease-out group-hover:bg-orange-500" 
                style={{ width: `${percentage}%` }} 
            />
        </div>
    </div>
);

export default React.memo(HiringSidebar);