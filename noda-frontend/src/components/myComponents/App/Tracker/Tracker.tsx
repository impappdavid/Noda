import React, { useState, useEffect } from 'react';
import {
    Plus, Search, ChevronsUpDown,
    Link as LinkIcon, Activity,
    Users, Star, AlertTriangle, Briefcase, Globe, Calendar, DollarSign, CheckCircle2, Clock,
    Rss, Trash2,
    X,
    CornerDownRight
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
                                            "p-2 flex flex-col justify-center min-h-[72px] transition-colors cursor-pointer group relative",
                                            borderClasses,
                                            isUnscheduled ? "bg-zinc-200 hover:bg-zinc-200/80" : "bg-white hover:bg-zinc-200/60"
                                        )}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col min-w-0">
                                                <span className={cn(
                                                    "text-[9px] font-mono font-black uppercase tracking-widest",
                                                    isUnscheduled ? "text-blue-600" : "text-zinc-500"
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

    const handleAddLog = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
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
                <DialogContent className="sm:max-w-4xl rounded-none p-0 overflow-hidden bg-white border-none shadow-xl flex flex-col h-[75vh] text-zinc-900">
                    
                    {/* FLAT HEADER BANNER WITH CLOSE ACTION */}
                    <DialogHeader className="h-9 px-3 bg-zinc-900 text-white flex flex-row items-center justify-between space-y-0 shrink-0 select-none">
                        <div className="flex items-center gap-2">
                            <Rss size={12} className="text-blue-500" />
                            <DialogTitle className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-200">
                                Job Tracker // ID: {selectedNode.id}
                            </DialogTitle>
                        </div>
                        <button 
                            onClick={() => setSelectedNode(null)}
                            className="h-full px-2 -mr-3 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center border-l border-zinc-800"
                        >
                            <X size={14} />
                        </button>
                    </DialogHeader>

                    {/* TWO-COLUMN HARD GRID ROW */}
                    <div className="flex flex-1 overflow-hidden divide-x divide-zinc-200">
                        
                        {/* LEFT ELEMENT: SPECS & DOSSIER */}
                        <div className="flex-1 overflow-y-auto p-3 scrollbar-hide flex flex-col gap-3 bg-white">
                            
                            {/* FLAT METADATA FRAME */}
                            <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-200">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-mono font-black text-white text-sm shrink-0 rounded-none border border-zinc-700">
                                        {selectedNode.company[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-xs font-black text-zinc-900 uppercase tracking-wide block truncate">{selectedNode.company}</span>
                                        <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400 uppercase mt-0.5">
                                            <Users size={10} /> {selectedNode.memberCount} Members
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 border border-zinc-200 px-2 py-0.5 bg-zinc-50 flex items-center gap-2">
                                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">Match Score:</span>
                                    <span className="text-xs font-mono font-black text-blue-600">{selectedNode.match}%</span>
                                </div>
                            </div>

                            {/* ROLE IDENTIFICATION BLOCK */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2 bg-zinc-50 border border-zinc-200 p-1.5">
                                    <h2 className="text-xs font-mono font-black uppercase text-zinc-900 truncate">
                                        {selectedNode.role}
                                    </h2>
                                    <span className="text-[9px] font-mono font-bold uppercase bg-blue-600 text-white px-1.5 py-0.5 shrink-0">
                                        {selectedNode.experience || '4+ Years'}
                                    </span>
                                </div>

                                {/* SOLID FLAT SPEC MATRIX */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200">
                                    <SpecBox label="Pay Range" value={selectedNode.salary || "Not Specified"} />
                                    <SpecBox label="Remote Type" value={selectedNode.workMode} />
                                    <SpecBox label="Contract" value={selectedNode.jobType || 'Full-time'} />
                                    <SpecBox label="Location" value={selectedNode.location} />
                                </div>
                            </div>

                            {/* TEXT STACK REGISTRY */}
                            {selectedNode.stack && selectedNode.stack.length > 0 && (
                                <div className="p-2 border border-zinc-200 bg-zinc-50/50">
                                    <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wider block mb-1">Indexed Tech Infrastructure</span>
                                    <div className="flex flex-wrap gap-1">
                                        {selectedNode.stack.map((tag: string) => (
                                            <span key={tag} className="px-1.5 py-0.5 bg-white border border-zinc-300 text-[9px] font-mono font-bold text-zinc-700 uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* COMPACT DETAILED DOSSIER */}
                            <div className="border border-zinc-200 p-2 flex-1 overflow-y-auto bg-white">
                                <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2 border-b border-zinc-100 pb-1">Role Specification Profile</div>
                                <div className="text-[11px] leading-relaxed text-zinc-700 space-y-2 font-sans">
                                    <ReactMarkdown
                                        components={{
                                            h3: ({ ...props }) => <h3 className="text-[10px] font-mono font-black uppercase text-blue-600 mt-3 mb-1 border-b border-dashed border-zinc-200 pb-0.5 inline-block first:mt-0" {...props} />,
                                            p: ({ ...props }) => <p className="mb-1 text-zinc-600" {...props} />,
                                            ul: ({ ...props }) => <ul className="space-y-1 mb-2 list-none pl-0" {...props} />,
                                            li: ({ ...props }) => (
                                                <li className="relative pl-3.5 flex items-start text-zinc-700" {...props}>
                                                    <CornerDownRight size={10} className="absolute left-0 top-1 text-blue-500 shrink-0" />
                                                    <span>{props.children}</span>
                                                </li>
                                            ),
                                        }}
                                    >
                                        {selectedNode.description}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT ELEMENT: PIPELINE & ACTION PANELS */}
                        <div className="w-56 shrink-0 flex flex-col bg-zinc-50/50">
                            
                            {/* SYSTEM STEP UPDATER */}
                            <div className="p-2 border-b border-zinc-200 bg-white shrink-0">
                                <label className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1">Pipeline State</label>
                                <Select defaultValue={selectedNode.status}>
                                    <SelectTrigger className="w-full h-8 rounded-none border-zinc-300 bg-white text-zinc-900 font-mono text-[11px] font-bold uppercase focus:ring-0 focus:ring-offset-0">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent position="popper" sideOffset={1} className="rounded-none border-zinc-300 bg-white p-0">
                                        {["Applied", "Interviewing", "Offer", "Rejected"].map((status) => (
                                            <SelectItem key={status} value={status} className='cursor-pointer text-[11px] font-mono rounded-none focus:bg-blue-600 focus:text-white uppercase p-2'>
                                                {status === "Offer" ? "Offer Rec'd" : status}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* NEW ACCORDION CONTENT: COMPACT ACTIVITY OVERVIEW */}
                            <div className="p-2 border-b border-zinc-200 bg-zinc-100/50 grid grid-cols-2 gap-1 text-[9px] font-mono select-none">
                                <div className="bg-white p-1 border border-zinc-200 flex items-center gap-1">
                                    <Calendar size={10} className="text-zinc-400" />
                                    <div className="truncate">
                                        <span className="text-zinc-400 block text-[7px]">TRACKED</span>
                                        <span className="font-bold text-zinc-800">14 DAYS</span>
                                    </div>
                                </div>
                                <div className="bg-white p-1 border border-zinc-200 flex items-center gap-1">
                                    <Activity size={10} className="text-zinc-400" />
                                    <div className="truncate">
                                        <span className="text-zinc-400 block text-[7px]">EVENTS</span>
                                        <span className="font-bold text-zinc-800">{localLogs.length} LOGS</span>
                                    </div>
                                    
                                </div>
                            </div>

                            {/* EVENT REGISTRY HISTORY STREAM */}
                            <div className="p-2 flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                                <div className="flex items-center gap-1 mb-2 shrink-0 select-none">
                                    <Clock size={10} className="text-zinc-400" />
                                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">Registry Log</span>
                                </div>

                                <div className="relative space-y-3 flex-1 overflow-y-auto mb-2 pr-1">
                                    <div className="absolute left-[3px] top-1 bottom-1 w-px bg-zinc-300" />
                                    {localLogs.map((log: any, idx: number) => (
                                        <div key={idx} className="relative pl-4 flex flex-col group">
                                            <div className={cn(
                                                "absolute left-0 top-1 w-1.5 h-1.5 rounded-none border z-10 transition-colors",
                                                log.status === "COMPLETED" ? "bg-blue-600 border-blue-600" : "bg-white border-zinc-400"
                                            )} />
                                            <span className="text-[10px] font-mono font-bold uppercase text-zinc-800 leading-none truncate">
                                                {log.stage}
                                            </span>
                                            <span className="text-[8px] font-mono text-zinc-400 uppercase mt-0.5">{log.date}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* HIGH CONTRAST SOLID APPEND TERMINAL BLOCK */}
                                <div className="mt-auto shrink-0 pt-2 border-t border-dashed border-zinc-300">
                                    {isAddingLog ? (
                                        <form onSubmit={handleAddLog} className="border border-zinc-300 p-2 bg-white space-y-1.5">
                                            <input 
                                                autoFocus
                                                value={newLogStage}
                                                onChange={e => setNewLogStage(e.target.value)}
                                                onKeyDown={e => { if (e.key === 'Escape') setIsAddingLog(false); }}
                                                placeholder="ENTER TERMINAL STEP..."
                                                className="w-full bg-zinc-50 border border-zinc-300 p-1.5 font-mono text-[9px] font-bold uppercase text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 rounded-none"
                                            />
                                            <div className="flex justify-end gap-2 text-[8px] font-mono font-bold uppercase">
                                                <button type="button" onClick={() => setIsAddingLog(false)} className="text-zinc-400 hover:text-zinc-600 cursor-pointer">
                                                    Cancel
                                                </button>
                                                <button type="submit" disabled={!newLogStage.trim()} className="text-white bg-blue-600 px-2 py-0.5 cursor-pointer">
                                                    Add
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <button 
                                            onClick={() => setIsAddingLog(true)} 
                                            className="w-full py-1.5 border border-zinc-400 bg-zinc-900 text-white text-[9px] font-mono font-bold uppercase hover:bg-blue-600 transition-colors cursor-pointer rounded-none tracking-wide"
                                        >
                                            + Append Trace Log
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* PERSISTENT ACTIONS FOOTER */}
                            <div className="p-2 bg-white border-t border-zinc-200 flex flex-col gap-1 shrink-0">
                                <a href={selectedNode.jobLink} target="_blank" rel="noreferrer" className="w-full h-8 border border-zinc-300 bg-white flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold text-zinc-600 uppercase hover:bg-zinc-50 transition-colors rounded-none">
                                    <LinkIcon size={10} /> Launch Source
                                </a>
                                <button className="w-full h-8 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase hover:bg-blue-700 transition-colors rounded-none">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    );
};

// HARD MATRIX GRID BOX COMPONENT
const SpecBox = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white p-1.5 flex flex-col min-w-0 border border-transparent">
        <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase block leading-none">{label}</span>
        <span className="text-[10px] font-mono font-bold text-zinc-800 uppercase truncate mt-1">{value}</span>
    </div>
);


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