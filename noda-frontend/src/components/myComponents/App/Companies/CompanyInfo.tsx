import React, { useState } from "react";
import { 
    Globe, ShieldAlert, Users, EyeOff, Eye, 
    Send, UserCheck,  MessageSquare,
    MessageSquarePlus
} from "lucide-react";
import { 
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import type { Company } from "@/types/companies";
import { Link } from "react-router-dom";



const LATENCY_NODES = ["< 24H", "< 3D", "< 1W", "> 1W"];

const CompanyInfo = ({ selectedCompany }: { selectedCompany: Company }) => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [latency, setLatency] = useState("");
    const [comment, setComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleSubmitFeedback = () => {
        setIsFeedbackOpen(false);
        // Reset Logic
        setLatency(""); setComment("");
    };

    const cn = (...classes: (string | boolean | undefined | null)[]): string =>
        classes.filter(Boolean).join(" ");

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-zinc-300  font-sans">
            {/* 1. Header Protocol */}
            <div className="p-2 border-b border-zinc-300 flex items-center justify-between bg-zinc-50/50 h-13 shrink-0">
                <div className="space-y-0.5">
                    <Link to={`/app/company/${selectedCompany.name}`} className="text-sm font-bold uppercase tracking-tight text-zinc-900 hover:underline">{selectedCompany.name}</Link>
                    <div className="flex items-center gap-3 text-[9px] font-mono font-black uppercase text-zinc-500">
                        <Link to={`https://${selectedCompany.name.toLowerCase()}.com`} target="__blank" className="flex items-center gap-1 hover:text-zinc-900 cursor-pointer transition-colors">
                            <Globe size={10} /> WEB.NODE
                        </Link>
                        <span className="flex items-center gap-1 border-l border-zinc-300 pl-3">
                            <Users size={10} /> {selectedCompany.employees} EMP
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-base font-mono font-black text-zinc-900 tracking-tighter leading-none uppercase">
                            {selectedCompany.responseVelocity}
                        </span>
                    </div>
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest mt-0.5">Global Latency</span>
                </div>
            </div>

            {/* 2. REGISTRY INFO PANEL - VERTICAL STACK */}
            <div className="flex flex-col divide-y divide-zinc-200 border-b border-zinc-300 shrink-0 bg-white">
                <div className="px-2 py-2 flex items-center justify-between">
                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">Total Comments</span>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare size={10} className="text-zinc-500" />
                        <span className="text-[11px] font-black text-zinc-900 font-mono tracking-tighter">
                            {selectedCompany.reviews} <span className="text-zinc-500 font-bold uppercase text-[9px]">Comment</span>
                        </span>
                    </div>
                </div>

                <div className="px-2 py-3 space-y-2 bg-zinc-50/20">
                    <div className="flex items-center justify-between text-left">
                        <div className="flex items-center gap-2">
                            <UserCheck size={11} className="text-zinc-500" />
                            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-tight">Employee Response</span>
                        </div>
                        <span className="text-[10px] font-black text-zinc-900 font-mono">{"< 24H"}</span>
                    </div>
                    
                </div>
            </div>

            {/* 3. Recent Intelligence Feed */}
            <div className="flex-1 overflow-y-auto scrollbar-hide border-b border-zinc-300 bg-white">
                <div className="px-2 py-2 border-b border-zinc-300 bg-white flex items-center justify-between sticky top-0 z-10">
                    <h4 className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">Comments</h4>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Sync_OK</span>
                    </div>
                </div>
                {/* Feed Item */}
                <div className="p-2 bg-white hover:bg-zinc-50/50 transition-colors cursor-default group border-b border-zinc-300">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                                <ShieldAlert size={10} className="text-white" />
                            </div>
                            <span className="text-[11px] font-medium text-zinc-900 tracking-tighter">@anonymus</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono font-black text-orange-600 uppercase bg-orange-50 px-1 border border-orange-300">{"< 24H"}</span>
                            <span className="text-[9px] text-zinc-500 font-mono font-black uppercase tracking-tighter">2h ago</span>
                        </div>
                    </div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed font-medium tracking-tight group-hover:text-zinc-900 transition-colors text-left">
                        Infrastructure response time is stable. No ghosting detected during current deployment cycle.
                    </p>
                </div>
            </div>

            {/* 4. FEEDBACK DIALOG */}
            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <DialogTrigger asChild>
                    <button className="w-full h-12 bg-zinc-900 flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-[0.99] shrink-0 cursor-pointer border-none outline-none group">
                        <MessageSquarePlus size={14} className="text-white transition-all" />
                        <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">Comment</span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="p-4 bg-zinc-800  text-white flex flex-row items-center justify-between space-y-0 text-left">
                        <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Share Your Experience</DialogTitle>
                    </DialogHeader>

                    <div className="px-3 pb-3 space-y-3">
                        {/* Relationship Selector */}

                        {/* Response Latency Selector */}
                        <div className={cn("transition-opacity text-left")}>
                            <label className="text-[10px] font-mono font-black text-zinc-600 mb-2 block tracking-[0.1em]">01 // Recruiter Response Time (Optional)</label>
                            <div className="flex w-full divide-x divide-zinc-300 border border-zinc-300 bg-zinc-50">
                                {LATENCY_NODES.map((node) => (
                                    <button key={node} onClick={() => setLatency(node)}
                                        className={cn("flex-1 py-2.5 text-[10px] font-mono font-black transition-all cursor-pointer",
                                            latency === node ? "bg-orange-500 text-white" : "text-zinc-500 hover:bg-zinc-200")}>
                                        {node}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Log Input */}
                        <div className="text-left">
                            <label className="text-[10px] font-mono font-black text-zinc-500 mb-2 block tracking-[0.1em]">02 // Detailed Experience (Min. 10character)</label>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                                placeholder="Write your own opinion..."
                                className="w-full h-24 p-3 bg-zinc-50 border border-zinc-300 text-xs font-mono outline-none resize-none placeholder:text-zinc-500"
                            />
                        </div>

                        {/* RESTORED ANONYMOUS UPLINK SECTION */}
                        <div className="flex items-center justify-between p-2 bg-zinc-50/50 border border-dashed border-zinc-200 px-3 py-3">
                            <div className="flex items-center gap-3 text-left">
                                {isAnonymous ? <EyeOff size={16} className="text-orange-600" /> : <Eye size={16} className="text-zinc-400" />}
                                <div>
                                    <p className="text-[11px] font-mono font-black text-zinc-900 uppercase leading-none mb-1">Anonymous Comment</p>
                                    <p className="text-[10px] font-mono text-zinc-600 uppercase leading-none ">You will be not connected to this comment</p>
                                </div>
                            </div>
                            <Switch 
                                checked={isAnonymous} 
                                onCheckedChange={setIsAnonymous} 
                                className="scale-75 data-[state=checked]:bg-orange-500 cursor-pointer" 
                            />
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-2">
                            <button onClick={() => setIsFeedbackOpen(false)} className="flex-1 h-10 border border-zinc-300 text-[11px] font-mono font-black text-white uppercase hover:bg-red-500 cursor-pointer bg-red-600 transition-colors">Abort</button>
                            <button onClick={handleSubmitFeedback} disabled={ comment.length < 10}
                                className="flex-[2] h-10 bg-zinc-800 text-white text-[11px] font-mono font-black uppercase hover:bg-orange-600 disabled:bg-zinc-200 disabled:text-zinc-500 flex items-center justify-center gap-2 cursor-pointer border-none transition-all">
                                <Send size={12} /> Send Comment
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default React.memo(CompanyInfo);