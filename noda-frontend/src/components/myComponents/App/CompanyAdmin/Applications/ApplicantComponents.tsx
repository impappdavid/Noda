import React from 'react';
import { Briefcase, ChevronRight, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { ApplicantNode, JobNode } from '@/types/admin/applications';

export const JobCard = React.memo(({ job, onSelect }: { job: JobNode, onSelect: (j: JobNode) => void }) => (
    <div 
        onClick={() => onSelect(job)}
        className="p-3 bg-white hover:bg-zinc-100 transition-all cursor-pointer group flex items-center justify-between"
    >
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 text-white flex items-center justify-center border border-zinc-800 shrink-0">
                <Briefcase size={16} />
            </div>
            <div className='flex flex-col'>
                <h5 className="text-sm font-black uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                    {job.role}
                </h5>
                <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{job.applicants} Inbound_Nodes</span>
            </div>
        </div>
        <div className="flex items-center gap-4">
            {job.new > 0 && (
                <div className="px-1.5 py-0.5 bg-orange-600 text-white text-[10px] font-mono font-black uppercase animate-pulse">
                    {job.new}_NEW
                </div>
            )}
            <ChevronRight size={18} className="text-zinc-200 group-hover:text-zinc-900" />
        </div>
    </div>
));

export const ApplicantCard = React.memo(({ app }: { app: ApplicantNode }) => (
    <div className="p-3 bg-white hover:bg-zinc-100 transition-all group flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center font-black text-xs text-zinc-400 shrink-0">
                {app.name[0]}
            </div>
            <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                    <h5 className="text-sm font-black uppercase tracking-tight">{app.name}</h5>
                    <span className="text-[9px] font-mono font-black text-emerald-600 border border-emerald-200 bg-emerald-50 px-1.5 py-0.5">
                        {app.match}_MATCH
                    </span>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-mono font-bold text-zinc-500 uppercase">
                    <span className="flex items-center gap-1"><Clock size={10} /> Applied {app.applied}</span>
                </div>
            </div>
        </div>
        
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono font-black text-zinc-500 uppercase mb-1">Response_Deadline</span>
                <div className={cn(
                    "px-2 py-1 border text-[9px] font-mono font-black uppercase",
                    app.deadline.startsWith('13d') ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-orange-200 bg-orange-50 text-orange-600"
                )}>
                    {app.deadline}
                </div>
            </div>
            <div className="flex gap-2">
                <button className="h-8 px-4 border border-zinc-800 text-[9px] font-mono font-black uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer">Review</button>
                <button className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors cursor-pointer"><CheckCircle2 size={18} /></button>
                <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"><XCircle size={18} /></button>
            </div>
        </div>
    </div>
));