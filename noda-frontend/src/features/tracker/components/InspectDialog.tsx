import React from 'react';
import { Activity, Star, Users, Link as LinkIcon, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { NodeEntry } from '@/types/tracker';

interface InspectorProps {
    selectedNode: NodeEntry | null;
    onClose: () => void;
}

const InspectorDialog: React.FC<InspectorProps> = ({ selectedNode, onClose }) => {
    if (!selectedNode) return null;

    return (
        <Dialog open={!!selectedNode} onOpenChange={onClose}>
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
                    {/* LEFT COLUMN: SPECS & MARKDOWN */}
                    <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                        <header className="mb-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center font-mono font-black text-white text-xs">
                                    {selectedNode.company[0]}
                                </div>
                                <span className="text-sm font-mono font-black text-zinc-900 uppercase tracking-widest">
                                    {selectedNode.company}
                                </span>
                                <div className="flex items-center gap-1 ml-2 text-[10px] text-zinc-500 font-black">
                                    <Star size={10} className="text-orange-500 fill-orange-500" />
                                    {selectedNode.companyRating}
                                    <span className="mx-2">•</span>
                                    <Users size={10} />{selectedNode.memberCount} NODES
                                </div>
                            </div>
                            <h2 className="text-lg font-bold uppercase tracking-tighter mb-6">{selectedNode.role}</h2>

                            <div className="grid grid-cols-4 gap-px bg-zinc-300 border border-zinc-300">
                                <SpecBox label="PAY_RANGE" value={selectedNode.salary} />
                                <SpecBox label="NODE_MODE" value={selectedNode.workMode} />
                                <SpecBox label="CONTRACT" value={selectedNode.jobType || 'Full-time'} />
                                <SpecBox label="LOCATION" value={selectedNode.location} />
                            </div>
                        </header>

                        <div className="text-[12px] leading-relaxed text-zinc-900 mt-10">
                            <ReactMarkdown
                                components={{
                                    h3: ({ ...props }) => <h3 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400 mt-6 mb-2 border-b border-zinc-50 pb-1" {...props} />,
                                    p: ({ ...props }) => <p className="mb-4 font-bold text-zinc-700" {...props} />,
                                    li: ({ ...props }) => <li className="relative before:content-['>'] before:absolute before:-left-4 before:text-orange-500 before:font-mono before:text-[10px]" {...props} />,
                                }}
                            >
                                {selectedNode.description}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: TIMELINE & CONTROLS */}
                    <div className="w-80 flex flex-col divide-y divide-zinc-300 bg-zinc-50/30">
                        <div className="px-4 py-4 space-y-4 shrink-0">
                            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">System_Control</span>
                            <Select defaultValue={selectedNode.status}>
                                <SelectTrigger className="w-full h-10 rounded-none border-none bg-zinc-800 text-white font-mono text-xs font-bold uppercase cursor-pointer">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white">
                                    <SelectItem value="Applied">Applied</SelectItem>
                                    <SelectItem value="Interviewing">Interviewing</SelectItem>
                                    <SelectItem value="Offer">Offer_Received</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto scrollbar-hide">
                            <div className="flex items-center gap-2 mb-6">
                                <Clock size={12} className="text-zinc-400" />
                                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">Progression_Log</span>
                            </div>
                            <div className="relative ml-2 space-y-4">
                                <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-200" />
                                {selectedNode.logs?.map((log, idx) => (
                                    <LogStep key={idx} log={log} />
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-white space-y-2 shrink-0">
                            <a href={selectedNode.jobLink} target="_blank" rel="noreferrer" className="w-full h-10 border border-zinc-900 flex items-center justify-center gap-2 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 transition-colors">
                                <LinkIcon size={12} /> Source_Link
                            </a>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

// Internal Helper Components
const SpecBox = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-white p-2">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">{label}</span>
        <span className="text-[11px] font-bold text-zinc-900 uppercase">{value}</span>
    </div>
);

const LogStep = ({ log }: { log: any }) => (
    <div className="relative pl-6">
        <div className={cn(
            "absolute left-0.5 top-1 w-3 h-3 bg-white z-10 border transition-all",
            log.status === "COMPLETED" ? "bg-zinc-800 border-zinc-800" :
            log.status === "ACTIVE" ? "bg-white border-orange-500 animate-pulse" : "bg-white border-zinc-300"
        )} />
        <div className="flex flex-col">
            <span className={cn("text-[10px] font-black uppercase tracking-tight", log.status === "PENDING" ? "text-zinc-400" : "text-zinc-900")}>
                {log.stage}
            </span>
            <span className="text-[9px] font-mono text-zinc-500">{log.date}</span>
        </div>
    </div>
);

export default InspectorDialog;