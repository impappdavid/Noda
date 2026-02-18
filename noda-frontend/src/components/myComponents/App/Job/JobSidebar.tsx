import React from 'react';
import { IntelligenceMetric } from './JobComponents';

interface JobSidebarProps {
    recruiter: { name: string; initials: string; role: string };
    analytics: { rating: string; velocity: string; nodes: string };
}

const JobSidebar: React.FC<JobSidebarProps> = ({ recruiter, analytics }) => (
    <aside className="flex-1 flex flex-col h-full bg-white overflow-hidden min-w-[200px]">
        <div className="p-3 h-9 border-b border-zinc-300 bg-zinc-50/50">
            <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Node Controller</h2>
        </div>
        <div className="p-3 border-b border-zinc-300">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center shrink-0">
                    <span className="text-white font-mono font-black text-sm">{recruiter.initials}</span>
                </div>
                <div className="flex flex-col overflow-hidden justify-center">
                    <h3 className="text-[11px] font-bold uppercase text-zinc-900 truncate">{recruiter.name}</h3>
                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tighter mt-0.5">{recruiter.role}</span>
                </div>
            </div>
            <button className="w-full h-8 bg-white border border-zinc-300 flex items-center justify-center gap-2 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer">
                <span className="text-[11px] font-mono font-semibold uppercase ">Message Controller</span>
            </button>
        </div>

        <div className="p-3 border-b border-zinc-300 bg-zinc-50/50">
            <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Company Intel</h2>
        </div>
        <div className="p-3 space-y-3 flex-1">
            <IntelligenceMetric label="Rating" value={analytics.rating} />
            <IntelligenceMetric label="Velocity" value={analytics.velocity} color="text-emerald-500" />
            <IntelligenceMetric label="Nodes" value={analytics.nodes} />
        </div>

        
    </aside>
);


export default JobSidebar;