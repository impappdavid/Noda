import React, { useState } from 'react';
import { 
    Briefcase, Search, ChevronRight, 
    ArrowLeft, Filter, CheckCircle2, XCircle, 
    FileText, Clock, Timer, Users, Trash2 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

// Types for better stability
interface JobNode {
    id: string;
    role: string;
    applicants: number;
    new: number;
    deadline: string;
}

const ManageApplicants = () => {
    const [view, setView] = useState<'LIST' | 'DRILLDOWN'>('LIST');
    const [selectedJob, setSelectedJob] = useState<JobNode | null>(null);

    const activeJobs: JobNode[] = [
        { id: "NODE_J1", role: "LEAD_SYSTEMS_ARCH", applicants: 124, new: 12, deadline: "4 days" },
        { id: "NODE_J2", role: "NEURAL_INTERFACE_DESIGN", applicants: 89, new: 3, deadline: "11 days" },
    ];

    const applicants = [
        { id: "a1", name: "Marcus Vane", match: "98%", status: "Pending", applied: "2h ago", deadline: "13d 22h" },
        { id: "a2", name: "Elena Kovic", match: "91%", status: "Reviewed", applied: "5h ago", deadline: "13d 19h" },
        { id: "a3", name: "Cipher Node", match: "84%", status: "Pending", applied: "1d ago", deadline: "12d 04h" },
    ];

    const handleJobSelect = (job: JobNode) => {
        setSelectedJob(job);
        setView('DRILLDOWN');
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    
                    {/* 1. DYNAMIC HEADER: SINGLE LINE DARK MODE FOR DRILLDOWN */}
                    {view === 'DRILLDOWN' && selectedJob ? (
                        <div className="h-14 bg-zinc-800 text-white flex items-center justify-between px-4 shrink-0 animate-in fade-in slide-in-from-top-1 duration-300">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setView('LIST')}
                                    className="h-8 w-8 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group"
                                >
                                    <ArrowLeft size={16} />
                                </button>
                                <div className="h-6 w-[1px] bg-zinc-700" />
                                <div className="flex flex-col justify-center">
                                    <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] leading-none">{selectedJob.role}</h2>
                                    <span className="text-[8px] font-mono text-zinc-300 uppercase mt-1">ID: {selectedJob.id}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-mono font-black text-orange-500 uppercase leading-none">Response_Protocol</span>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="text-[9px] font-mono font-bold uppercase">Max_Window: 14D</span>
                                    </div>
                                </div>
                                <div className="h-8 w-[1px] bg-zinc-700" />
                                <div className="flex flex-col items-end">
                                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase leading-none">Signals</span>
                                    <span className="text-xs font-black font-mono">{selectedJob.applicants}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 border-b border-zinc-300 bg-zinc-50/30 shrink-0">
                            <h1 className="text-2xl font-black uppercase tracking-tighter">Applicant_Control</h1>
                            <p className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mt-1">
                                Monitor talent uplink nodes across active vacancies
                            </p>
                        </div>
                    )}

                    {/* 2. SHARED SEARCHBAR */}
                    <div className=" bg-white flex  shrink-0">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 text-zinc-400" size={14} />
                            <input 
                                placeholder={view === 'LIST' ? "FILTER_VACANCIES..." : "SEARCH_APPLICANTS..."} 
                                className="w-full h-10  border-b border-zinc-300 pl-10 pr-4 text-[10px] font-mono font-bold uppercase outline-none"
                            />
                        </div>
                        <button className="px-4 h-10 border-l border-b border-zinc-300 flex items-center gap-2 text-[9px] font-mono font-black uppercase hover:bg-zinc-200/60 transition-colors cursor-pointer">
                            <Filter size={12} /> Filter
                        </button>
                    </div>

                    {/* 3. SCROLLABLE DATA TABLE */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {view === 'LIST' ? (
                            <div className="divide-y divide-zinc-300">
                                {activeJobs.map((job) => (
                                    <div 
                                        key={job.id}
                                        onClick={() => handleJobSelect(job)}
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
                                ))}
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-200">
                                {applicants.map((app) => (
                                    <div key={app.id} className="p-3 bg-white hover:bg-zinc-100 transition-all group flex items-center justify-between">
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
                                                <button className="h-8 px-4 border border-zinc-800 text-[9px] font-mono font-black uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer">
                                                    Review
                                                </button>
                                                <button className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors cursor-pointer">
                                                    <CheckCircle2 size={18} />
                                                </button>
                                                <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer">
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 4. FOOTER: SYSTEM STATUS */}
                    <div className="h-10 bg-zinc-900 border-t border-zinc-800 flex items-center px-6 justify-between shrink-0">
                        <div className="flex gap-6">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest leading-none">Protocol: Applicant_Control_v.2.06</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] font-mono text-emerald-500 uppercase font-black tracking-widest leading-none">Uplink_Encrypted</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManageApplicants;