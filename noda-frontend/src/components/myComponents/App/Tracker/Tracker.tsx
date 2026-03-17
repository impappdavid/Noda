import React, { useState, useEffect } from 'react';
import {
    Plus, Search, ChevronsUpDown,
    Link as LinkIcon, Activity,
    Users, Star, AlertTriangle, Briefcase, Globe, Calendar, DollarSign, CheckCircle2, Clock,
    Rss, Trash2
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';

// --- EXPANDED DATA SCHEMA ---
const trackerData = [
    {
        id: 43,
        company: "Taco Bell",
        role: "Lead Systems Architect",
        status: "Interviewing",
        applied: "2d ago",
        match: 96,
        salary: "$180k - $240k",
        location: "San Francisco, CA",
        workMode: "Hybrid_Node",
        jobType: "Full-time",
        experience: "6+ Years",
        companyRating: "4.8",
        memberCount: "12,400+",
        stack: ["Hardware", "Thermal Systems", "IoT", "Calibration", "Rust", "TypeScript"],
        jobLink: "https://tacobell.com/careers",
        description: `As a Lead Systems Architect, you will spearhead the digital transformation of our thermal processing units. You will be responsible for the end-to-end reliability of the kitchen intelligence layer.

### Primary Objectives:
* Design high-availability IoT protocols for real-time thermal monitoring.
* Lead the migration from legacy hardware controllers to a unified Rust-based edge cluster.
* Implement 99.99% uptime strategies for high-velocity production environments.
* Collaborate with the culinary engineering team to translate cheese-melt physics into algorithmic constraints.

### Requirements:
* Proven experience in distributed systems and hardware-software integration.
* Mastery of systems-level programming and real-time data telemetry.
* Strong background in managing low-latency node clusters in decentralized environments.`,
        logs: [
            { stage: "Applied", date: "2026-01-10", status: "COMPLETED" },
            { stage: "Screening", date: "2026-01-15", status: "COMPLETED" },
            { stage: "Technical 1", date: "2026-01-22", status: "COMPLETED" },
            { stage: "System Design", date: "2026-02-05", status: "COMPLETED" },
        ]
    },
    { id: 44, company: "Vercel", role: "Frontend Deployment", status: "Applied", applied: "5d ago", match: 92, interviewDate: null, jobLink: "https://vercel.com/jobs", workMode: "Remote_Node", salary: "$160k - $210k", location: "Global", companyRating: "4.9", memberCount: "800+", stack: ["Next.js", "Edge", "Rust"], description: "Optimizing global edge delivery networks.", logs: [{ stage: "Applied", date: "2026-02-01", status: "COMPLETED" }] },
    { id: 45, company: "OpenAI", role: "GPU Cluster Setup", status: "Interviewing", applied: "1w ago", match: 88, interviewDate: "Feb 12, 14:00", jobLink: "https://openai.com/jobs", workMode: "Onsite_Node", salary: "$250k - $350k", location: "San Francisco", companyRating: "4.7", memberCount: "2,000+", stack: ["PyTorch", "CUDA", "Linux"], description: "Managing H100 training clusters.", logs: [{ stage: "Applied", date: "2026-01-28", status: "COMPLETED" }] },
];

const AppTracker = () => {
    const [filter, setFilter] = useState("All");
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const filteredData = trackerData.filter(item =>
        filter === "All" ? true : item.status === filter
    );

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 hidden sm:block">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 sm:ml-4 h-full bg-white overflow-hidden pt-12.5">

                    {/* FILTER HUB */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-300">
                        <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
                            <Search size={14} className="text-zinc-400 mr-2" />
                            <input placeholder="SEARCH NODES..." className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent" />
                        </div>
                        <div className="flex-1 h-full">
                            <FilterCombobox
                                label="STATUS"
                                current={filter}
                                options={["All", "Applied", "Interviewing", "Rejected"].map(s => ({ label: s, value: s }))}
                                onSelect={setFilter}
                            />
                        </div>
                        <div className="w-24 h-full flex items-center justify-center bg-zinc-50 border-r border-zinc-300">
                            <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-tighter">
                                {filteredData.length}/{trackerData.length} NODES
                            </span>
                        </div>

                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <button className="px-3 h-full bg-white hover:bg-zinc-200/80 transition-all cursor-pointer group border-none outline-none">
                                    <Plus size={16} className="text-zinc-400 group-hover:text-zinc-900" />
                                </button>
                            </DialogTrigger>
                            <AddNodeModal onClose={() => setIsAddOpen(false)} />
                        </Dialog>
                    </div>

                    {/* LISTING GRID */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide bg-white border-b border-zinc-300">
                        <div className="grid grid-cols-2">
                            {filteredData.map((item, index) => {
                                const isUnscheduled = item.status === "Interviewing" && !item.interviewDate;
                                const borderClasses = `border-b border-zinc-300 ${index % 2 === 0 ? 'border-r' : ''}`;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedNode(item)}
                                        className={cn(
                                            "p-3 flex flex-col justify-center min-h-[72px] transition-colors cursor-pointer group relative",
                                            borderClasses,
                                            isUnscheduled ? "bg-zinc-200 hover:bg-zinc-200/80" : "bg-white hover:bg-zinc-200/60"
                                        )}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col min-w-0">
                                                <span className={cn(
                                                    "text-[9px] font-mono font-black uppercase tracking-widest",
                                                    isUnscheduled ? "text-orange-600" : "text-zinc-500"
                                                )}>
                                                    {isUnscheduled ? "INTELLIGENCE REQUIRED" : `APPLIED ${item.applied}`}
                                                    <span className="mx-1 opacity-30">•</span> {item.match}%
                                                </span>
                                                <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5">
                                                    {item.role}
                                                </h3>
                                                <p className="text-[10px] text-zinc-500 font-medium truncate uppercase mt-0.5">{item.company}</p>
                                            </div>

                                            <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className={cn("w-1 h-1 rounded-full",
                                                        item.status === 'Offer' ? 'bg-emerald-500' :
                                                            item.status === 'Interviewing' ? 'bg-blue-500' :
                                                                item.status === 'Applied' ? 'bg-orange-500' : 'bg-red-500'
                                                    )} />
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">{item.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>

            {/* INTEGRATED DEEP-DIVE INSPECTOR DIALOG */}
            <DeepDiveInspector selectedNode={selectedNode} setSelectedNode={setSelectedNode} />

        </div>
    );
};

// --- SUB-COMPONENTS ---

// --- REDESIGNED DEEP-DIVE INSPECTOR (From Previous Step) ---
const DeepDiveInspector = ({ selectedNode, setSelectedNode }: any) => {
    const [localLogs, setLocalLogs] = useState<any[]>([]);
    const [isAddingLog, setIsAddingLog] = useState(false);
    const [newLogStage, setNewLogStage] = useState("");

    useEffect(() => {
        if (selectedNode) {
            setLocalLogs(selectedNode.logs || []);
            setIsAddingLog(false);
            setNewLogStage("");
        }
    }, [selectedNode]);

    const handleAddLog = () => {
        if (!newLogStage.trim()) return;
        const newLog = {
            stage: newLogStage.toUpperCase(),
            date: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
            status: "COMPLETED"
        };
        setLocalLogs([...localLogs, newLog]);
        setNewLogStage("");
        setIsAddingLog(false);
    };

    return (
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
            {selectedNode && (
                <DialogContent className="sm:max-w-5xl rounded-none p-0 overflow-hidden bg-zinc-50 border-none flex flex-col h-[85vh]">
                    
                    <DialogHeader className="p-3 bg-zinc-800 border-b border-zinc-700 text-white flex flex-row items-center justify-between space-y-0 shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '4px 4px' }} />
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-6 h-6 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                <Rss size={12} className="text-orange-500 animate-pulse" />
                            </div>
                            <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em] leading-none text-zinc-100">
                                Job Tracker // ID: {selectedNode.id}
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    <div className="flex flex-1 overflow-hidden divide-x divide-zinc-300">
                        
                        <div className="flex-1 overflow-y-auto px-4 pb-2 scrollbar-hide bg-white">
                            <header className="mb-2 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center font-mono font-bold text-white text-lg">
                                            {selectedNode.company[0]}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-zinc-900 uppercase tracking-widest">{selectedNode.company}</span>
                                            <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                                                <Users size={10} /> {selectedNode.memberCount} Members
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Target Match</span>
                                        <div className="flex items-end gap-1">
                                            <span className="text-xl font-black text-orange-600 leading-none">{selectedNode.match}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 w-full flex justify-between">
                                    <h2 className="text-xl font-bold uppercase tracking-tighter leading-none text-zinc-900">
                                        {selectedNode.role}
                                    </h2>
                                    <span className="text-[10px] font-mono font-medium uppercase tracking-widest bg-zinc-800 text-white px-2 py-0.5 h-fit ">
                                        {selectedNode.experience || '4+ Years'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-zinc-300 border border-zinc-300">
                                    <div className="bg-zinc-50 p-2 flex flex-col justify-center">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Pay Range</span>
                                        <span className="text-[11px] font-bold text-zinc-900">{selectedNode.salary || "NaN"}</span>
                                    </div>
                                    <div className="bg-zinc-50 p-2 flex flex-col justify-center">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Remote type</span>
                                        <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.workMode}</span>
                                    </div>
                                    <div className="bg-zinc-50 p-2 flex flex-col justify-center">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Contract Type</span>
                                        <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.jobType || 'Full-time'}</span>
                                    </div>
                                    <div className="bg-zinc-50 p-2 flex flex-col justify-center">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">Location</span>
                                        <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.location}</span>
                                    </div>
                                </div>
                            </header>

                            <div className="py-2 border-y border-zinc-300 mb-4">
                                <h5 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-2">Technical Stack</h5>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedNode.stack?.map((tag: string) => (
                                        <span key={tag} className="px-2 py-1 bg-white border border-zinc-300 text-[10px] font-mono font-black text-zinc-700 uppercase tracking-widest shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <section className="space-y-4">
                                <h4 className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-3 shrink-0">
                                    Role_Specification
                                    <div className="h-[1px] flex-1 bg-zinc-200" />
                                </h4>
                                <div className="pr-2 pb-6">
                                    <div className="text-[12px] leading-relaxed text-zinc-800">
                                        <ReactMarkdown
                                            components={{
                                                h3: ({ node, ...props }) => <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-orange-600 mt-4 mb-3 border-b border-zinc-200 pb-1 inline-block" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 font-medium text-zinc-700" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="space-y-2 mb-4 list-none" {...props} />,
                                                li: ({ node, ...props }) => <li className="relative pl-4 before:content-[''] before:w-1.5 before:h-1.5 before:bg-zinc-300 before:absolute before:left-0 before:top-1.5" {...props} />,
                                            }}
                                        >
                                            {selectedNode.description}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="w-60 shrink-0 flex flex-col relative">
                            <div className="pb-2 px-4 border-b border-zinc-300 bg-white shrink-0 z-10 shadow-sm">
                                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-3">System_Control</span>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest block">Status Update</label>
                                    <Select defaultValue={selectedNode.status}>
                                        <SelectTrigger className="w-full h-10 rounded-none cursor-pointer border-zinc-300 bg-zinc-50 text-zinc-900 font-mono text-[11px] font-bold uppercase tracking-widest shadow-none transition-colors">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent position="popper" sideOffset={0} className="rounded-none border-zinc-300  bg-white ">
                                            <SelectItem value="Applied" className='cursor-pointer text-xs font-medium'>Applied</SelectItem>
                                            <SelectItem value="Interviewing" className='cursor-pointer text-xs font-medium'>Interviewing</SelectItem>
                                            <SelectItem value="Offer" className='cursor-pointer text-xs font-medium'>Offer_Received</SelectItem>
                                            <SelectItem value="Rejected" className='cursor-pointer text-xs font-medium'>Rejected</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="py-2 px-4 flex-1 overflow-y-auto scrollbar-hide">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock size={12} className="text-zinc-400" />
                                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Progression Log</span>
                                </div>

                                <div className="relative ml-1 space-y-5">
                                    <div className="absolute left-[3px] top-2 bottom-2 w-px bg-zinc-300" />
                                    {localLogs.map((log: any, idx: number) => (
                                        <div key={idx} className="relative pl-6 animate-in slide-in-from-left-2 duration-300 fade-in">
                                            <div className={cn(
                                                "absolute left-0 top-1 w-2 h-2 border z-10 transition-colors",
                                                log.status === "COMPLETED" ? "bg-zinc-900 border-zinc-900" :
                                                log.status === "ACTIVE" ? "bg-white border-orange-500 ring-2 ring-orange-500/20" : "bg-zinc-100 border-zinc-400"
                                            )} />
                                            <div className="flex flex-col gap-0.5">
                                                <span className={cn(
                                                    "text-[11px] font-bold uppercase tracking-tight leading-none",
                                                    log.status === "PENDING" ? "text-zinc-500" : "text-zinc-900"
                                                )}>
                                                    {log.stage}
                                                </span>
                                                <span className="text-[9px] font-mono font-bold text-zinc-600 tracking-widest uppercase">{log.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {isAddingLog ? (
                                    <div className="mt-4 p-3 border border-orange-500 bg-orange-50/50 relative animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="absolute -top-2 left-2 bg-zinc-50 px-1 text-[9px] font-mono font-black text-orange-600 uppercase tracking-widest">
                                            New Log
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-orange-500 font-mono font-black text-xs">{">"}</span>
                                            <input 
                                                autoFocus
                                                value={newLogStage}
                                                onChange={e => setNewLogStage(e.target.value)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') handleAddLog();
                                                    if (e.key === 'Escape') setIsAddingLog(false);
                                                }}
                                                placeholder="E.G. TECHNICAL_INTERVIEW"
                                                className="flex-1 bg-transparent border-none outline-none font-mono text-[10px] font-bold uppercase text-zinc-900 placeholder:text-zinc-400/70"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-orange-500/20">
                                            <button onClick={() => setIsAddingLog(false)} className="text-[9px] font-mono font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest px-2 py-1 transition-colors cursor-pointer outline-none">
                                                [Esc] Cancel
                                            </button>
                                            <button onClick={handleAddLog} disabled={!newLogStage.trim()} className="text-[9px] font-mono font-black text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 uppercase tracking-widest px-3 py-1 transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] cursor-pointer outline-none">
                                                [ENT] ADD
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsAddingLog(true)} className="mt-6 w-full py-2.5 border border-dashed border-zinc-300 bg-white text-[9px] font-mono font-black text-zinc-500 uppercase hover:border-orange-500 hover:text-orange-600 transition-colors cursor-pointer outline-none">
                                        + Append_Log_Trace
                                    </button>
                                )}
                            </div>

                            <div className="p-5 bg-white border-t border-zinc-300 space-y-3 shrink-0">
                                <a href={selectedNode.jobLink} target="_blank" className="w-full h-10 border border-zinc-300 bg-white flex items-center justify-center gap-2 text-[10px] font-mono font-black text-zinc-700 uppercase hover:bg-zinc-50 transition-colors cursor-pointer outline-none shadow-sm">
                                    <LinkIcon size={12} /> Open Job
                                </a>
                                <button className="w-full h-10 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase hover:bg-orange-500 transition-colors cursor-pointer outline-none shadow-[2px_2px_0px_0px_rgba(24,24,27,0.2)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px]">
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};

// --- PRE-EXISTING COMPONENTS (Kept Intact) ---

const AddNodeModal = ({ onClose }: { onClose: () => void }) => {
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); onClose(); }, 2000);
    };

    return (
        <DialogContent className="sm:max-w-md bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
            <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />
                    <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-widest">Protocol: New_Node_Deployment</DialogTitle>
                </div>
            </DialogHeader>
            {!submitted ? (
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">Company_ID</label>
                            <div className="relative"><Globe className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" /><input required placeholder="TARGET COMPANY..." className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" /></div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">Node_Role</label>
                            <div className="relative"><Briefcase className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" /><input required placeholder="SYSTEM ROLE..." className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" /></div>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">Source_Link</label>
                        <div className="relative"><LinkIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" /><input type="url" placeholder="HTTP://SIGNAL.SOURCE..." className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-[10px] font-mono outline-none focus:border-zinc-900" /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">Deployment_Date</label>
                            <div className="relative"><Calendar className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" /><input type="date" required className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-[10px] font-mono outline-none focus:border-zinc-900" /></div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 block">Pay_Range</label>
                            <div className="relative"><DollarSign className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" /><input placeholder="e.g. $180k..." className="w-full h-9 bg-zinc-50 border border-zinc-200 pl-9 pr-3 text-xs font-mono font-bold uppercase outline-none focus:border-zinc-900" /></div>
                        </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors cursor-pointer">Abort</button>
                        <button type="submit" className="flex-[2] h-10 bg-zinc-800 text-white text-[10px] font-mono font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">Initialize_Deployment</button>
                    </div>
                </form>
            ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                    <CheckCircle2 size={46} className="text-emerald-500 mb-4" />
                    <h3 className="text-sm font-black uppercase tracking-widest mb-1">Node_Deployed</h3>
                    <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Entry added to local schematic</p>
                </div>
            )}
        </DialogContent>
    );
};

function FilterCombobox({ label, options, current, onSelect }: any) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-full w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0 outline-none cursor-pointer">
                    <span className="truncate text-zinc-400">{current !== "All" ? current : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[190px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono bg-white">
                    <CommandGroup>
                        {options.map((opt: any) => (
                            <CommandItem key={opt.value} value={opt.value} className="text-[10px] font-bold uppercase py-2 cursor-pointer" onSelect={(v) => { onSelect(v); setOpen(false); }}>
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default AppTracker;