import React from 'react';
import { IntelligenceMetric } from './JobComponents';
import { Zap, Users, Cpu, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface JobSidebarProps {
    recruiter: { name: string; initials: string; role: string };
    analytics: { rating: string; velocity: string; nodes: string };
    match?: number;
    applicants?: number;
    skills?: string[];
}

const JobSidebar: React.FC<JobSidebarProps> = ({ 
    recruiter, 
    analytics, 
    match = 94, 
    applicants = 124, 
    skills = ["Rust", "Distributed Systems", "RDMA", "TCP/IP"] 
}) => {
    // Generate 10 bars for the telemetry meter
    const totalBars = 40;
    const activeBars = Math.round((match / 100) * totalBars);

    return (
        <aside className="flex-1 flex flex-col h-full bg-white overflow-hidden w-30">
            {/* SECTION 1: MATCH TELEMETRY */}
            <div className="p-2 border-b border-zinc-300 bg-orange-50/30">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-orange-800 flex items-center gap-1">
                            <Zap size={10} className="fill-orange-500 stroke-none" /> Match_Sync
                        </h2>
                        <span className="text-[12px] font-black text-orange-600 font-mono tracking-tighter">
                            {match}%
                        </span>
                    </div>

                    {/* BIT-METER DISPLAY */}
                    <div className="flex gap-0.5 items-center">
                        {[...Array(totalBars)].map((_, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "h-[13px] w-[2px] transition-colors duration-500",
                                    i < activeBars 
                                        ? "bg-orange-400 shadow-[0_0_5px_rgba(251,146,60,0.4)]" 
                                        : "bg-zinc-300 opacity-30"
                                )}
                            />
                        ))}
                    </div>
                    
                    
                </div>
            </div>

            {/* SECTION 3: SKILL_REGISTRY */}
            <div className="p-3 h-7 border-b border-zinc-300 bg-zinc-50/50 flex items-center">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">Skills</h2>
            </div>
            <div className="p-2 border-b border-zinc-300 bg-white space-y-1.5 flex flex-wrap gap-1 content-start">
                {skills.map((skill) => (
                    <div key={skill} className="px-1.5 py-0.5 border border-zinc-200 bg-zinc-50 text-[9px] font-bold uppercase text-zinc-600 tracking-tighter">
                        {skill}
                    </div>
                ))}
            </div>

            {/* SECTION 4: DEPLOYMENT_ANALYTICS */}
            <div className="p-2 h-7 border-b border-zinc-300 bg-zinc-50/50 flex items-center">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-500">INFOS</h2>
            </div>
            <div className="p-2 space-y-2 flex-1 bg-white">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tight">Applied</span>
                    <span className="text-[11px] font-black text-zinc-900 font-mono flex items-center gap-1">
                        <Users size={10} className="text-zinc-500" /> {applicants}
                    </span>
                </div>
                <div className="border-t pt-2 border-dashed border-zinc-300">
                    <IntelligenceMetric label="Org_Size" value={analytics.nodes} />
                </div>
            </div>

            {/* FOOTER STATUS */}
            <div className="p-2 bg-zinc-50 border-t border-zinc-300">
                <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase">Uplink_Active</span>
                </div>
            </div>
        </aside>
    );
};

export default JobSidebar;