import React, { useState } from 'react';
import {
    Plus, Search, ChevronsUpDown,
    Link as LinkIcon, Activity,
    Users, Star, AlertTriangle, Briefcase, Globe, Calendar, DollarSign, CheckCircle2, Clock
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
            { stage: "Technical_1", date: "2026-01-22", status: "COMPLETED" },
            { stage: "System_Design", date: "2026-02-05", status: "ACTIVE" },
            { stage: "Onsite_Final", date: "TBD", status: "PENDING" },
            { stage: "Offer_Phase", date: "TBD", status: "PENDING" }
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
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">

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

            {/* DEEP-DIVE INSPECTOR DIALOG */}
            <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
                {selectedNode && (
                    <DialogContent className="sm:max-w-4xl rounded-none p-0 overflow-hidden bg-white border-none shadow-2xl flex flex-col h-[85vh]">
                        <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
                            <div className="flex items-center gap-3">
                                <Activity size={16} className="text-orange-500" />
                                <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-[0.2em] leading-none">
                                    Intelligence_Deep_Dive // NODE_{selectedNode.id}
                                </DialogTitle>
                            </div>
                        </DialogHeader>

                        <div className="flex flex-1 overflow-hidden divide-x divide-zinc-300">
                            {/* LEFT COLUMN: PRIMARY SPECS */}
                            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                                <header className="mb-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center font-mono font-black text-white text-xs">{selectedNode.company[0]}</div>
                                        <span className="text-sm font-mono font-black text-zinc-900 uppercase tracking-widest">{selectedNode.company}</span>
                                        <div className="flex items-center gap-1 ml-2 text-[10px] text-zinc-500 font-black">
                                            <Star size={10} className="text-orange-500 fill-orange-500" />{selectedNode.companyRating}
                                            <span className="mx-2">•</span><Users size={10} />{selectedNode.memberCount} NODES
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-bold uppercase tracking-tighter leading-none">{selectedNode.role}</h2>
                                        <div className="flex gap-2 items-end">
                                            <span className="text-lg font-bold text-zinc-900 leading-none">{selectedNode.match}%</span>
                                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Match</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-px bg-zinc-300 border border-zinc-300">
                                        <div className="bg-white p-2">
                                            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">PAY_RANGE</span>
                                            <span className="text-[11px] font-bold text-zinc-900">{selectedNode.salary}</span>
                                        </div>
                                        <div className="bg-white p-2">
                                            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">NODE_MODE</span>
                                            <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.workMode}</span>
                                        </div>
                                        <div className="bg-white p-2">
                                            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">CONTRACT_TYPE</span>
                                            <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.jobType || 'Full-time'}</span>
                                        </div>
                                        <div className="bg-white p-2">
                                            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">LOCATION</span>
                                            <span className="text-[11px] font-bold text-zinc-900 uppercase">{selectedNode.location}</span>
                                        </div>
                                    </div>
                                </header>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-zinc-300">
                                    <div className="space-y-3 col-span-2">
                                        <h5 className="text-[10px] font-mono font-black text-zinc-500 uppercase">Technical_Stack</h5>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedNode.stack?.map((tag: string) => (
                                                <span key={tag} className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 text-[10px] font-mono font-black uppercase">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <h5 className="text-[10px] font-mono font-black text-zinc-500 uppercase">Experience_Requirement</h5>
                                        <span className="text-[10px] font-bold uppercase bg-zinc-800 text-white px-2 py-0.5 inline-block">
                                            {selectedNode.experience || '4+ Years'}
                                        </span>
                                    </div>
                                </div>

                                <section className="space-y-4 mb-10">
                                    <h4 className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em] flex items-center gap-3 shrink-0">
                                        Role_Specification
                                        <div className="h-[1px] flex-1 bg-zinc-300" />
                                    </h4>

                                    <div className="max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent">
                                        <div className="text-[12px] leading-relaxed text-zinc-900">
                                            <ReactMarkdown
                                                components={{
                                                    h3: ({ node, ...props }) => (
                                                        <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 mt-6 mb-2 border-b border-zinc-50 pb-1" {...props} />
                                                    ),
                                                    p: ({ node, ...props }) => (
                                                        <p className="mb-4 font-bold text-zinc-700" {...props} />
                                                    ),
                                                    ul: ({ node, ...props }) => (
                                                        <ul className="space-y-2 mb-6 list-none border-l border-zinc-100 ml-1 pl-4" {...props} />
                                                    ),
                                                    li: ({ node, ...props }) => (
                                                        <li className="relative before:content-['>'] before:absolute before:-left-4 before:text-orange-500 before:font-mono before:text-[10px]" {...props} />
                                                    ),
                                                }}
                                            >
                                                {selectedNode.description}
                                            </ReactMarkdown>
                                        </div>
                                    </div>


                                </section>
                            </div>

                            {/* RIGHT COLUMN: SYSTEM CONTROLS & VERTICAL TIMELINE */}
                            <div className="w-80 flex flex-col divide-y divide-zinc-300 bg-zinc-50/30">
                                <div className="px-4 py-4 space-y-4 shrink-0">
                                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">System_Control</span>
                                    <div className="space-y-3">
                                        <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Status_Update</label>
                                        <Select defaultValue={selectedNode.status}>
                                            <SelectTrigger className="w-full h-10 rounded-none border-none outline-none bg-zinc-800 text-white font-mono text-xs font-bold uppercase cursor-pointer"><SelectValue /></SelectTrigger>
                                            <SelectContent position="popper" sideOffset={5} className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                                <SelectItem value="Applied" className='text-xs'>Applied</SelectItem>
                                                <SelectItem value="Interviewing" className='text-xs'>Interviewing</SelectItem>
                                                <SelectItem value="Offer" className='text-xs'>Offer_Received</SelectItem>
                                                <SelectItem value="Rejected" className='text-xs'>Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Clock size={12} className="text-zinc-400" />
                                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Progression_Log</span>
                                    </div>

                                    <div className="relative ml-2 space-y-4">
                                        <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-zinc-200" />
                                        {selectedNode.logs?.map((log: any, idx: number) => (
                                            <div key={idx} className="relative pl-6">
                                                <div className={cn(
                                                    "absolute left-0.5 top-1 w-[12px] h-[12px] bg-white z-10 transition-all",
                                                    log.status === "COMPLETED" ? "bg-zinc-800 " :
                                                        log.status === "ACTIVE" ? "bg-white border-orange-500 animate-pulse" : "bg-white border-zinc-300"
                                                )} />
                                                <div className="flex flex-col">
                                                    <span className={cn(
                                                        "text-[10px] font-black uppercase tracking-tight",
                                                        log.status === "PENDING" ? "text-zinc-400" : "text-zinc-900"
                                                    )}>{log.stage}</span>
                                                    <span className="text-[9px] font-mono text-zinc-500">{log.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="mt-4 w-full py-2 border border-dashed border-zinc-300 text-[10px] font-mono font-black text-zinc-500 uppercase hover:border-zinc-800 hover:text-zinc-800 transition-colors cursor-pointer">
                                        + Insert_Log_Step
                                    </button>
                                </div>

                                <div className="p-4 bg-white space-y-2 shrink-0">
                                    <a href={selectedNode.jobLink} target="_blank" className="w-full h-10 border border-zinc-900 flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors">
                                        <LinkIcon size={12} /> Source_Link
                                    </a>
                                    <button className="w-full h-10 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase hover:bg-black transition-colors cursor-pointer">
                                        Update_Protocol
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
};

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
                    <div className="flex gap-2 pt-4"><button type="button" onClick={onClose} className="flex-1 h-10 border border-zinc-300 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors cursor-pointer">Abort</button><button type="submit" className="flex-[2] h-10 bg-zinc-800 text-white text-[10px] font-mono font-black uppercase hover:bg-zinc-900 transition-colors cursor-pointer">Initialize_Deployment</button></div>
                </form>
            ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300"><CheckCircle2 size={46} className="text-emerald-500 mb-4" /><h3 className="text-sm font-black uppercase tracking-widest mb-1">Node_Deployed</h3><p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Entry added to local schematic</p></div>
            )}
        </DialogContent>
    );
};

function FilterCombobox({ label, options, current, onSelect }: any) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-full w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0">
                    <span className="truncate text-zinc-400">{current !== "All" ? current : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[190px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono bg-white"><CommandGroup>{options.map((opt: any) => (<CommandItem key={opt.value} value={opt.value} className="text-[10px] font-bold uppercase py-2 cursor-pointer" onSelect={(v) => { onSelect(v); setOpen(false); }}>{opt.label}</CommandItem>))}</CommandGroup></Command>
            </PopoverContent>
        </Popover>
    );
}

export default AppTracker;