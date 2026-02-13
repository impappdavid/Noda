import React, { useState } from 'react';
import { 
    ShieldAlert, Trash2, EyeOff, Terminal, 
    ArrowUpRight, AlertTriangle, FileText, Briefcase,
    MapPin, Clock, DollarSign, User, Globe
} from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const AdminReportsPage = () => {
    const [reports] = useState([
        {
            id: "REP_901",
            type: "JOB",
            reason: "SCAM_INJECTION",
            reporter: "@user_04",
            target: {
                id: "JOB_442",
                title: "SR_BLOCKCHAIN_DEV",
                company: "NEURAL_NET_INC",
                location: "REMOTE // ONSITE",
                salary: "$180K - $240K",
                desc: "WE REQUIRE IMMEDIATE ACCESS TO YOUR COLD STORAGE TO VERIFY YOUR CRYPTO KNOWLEDGE. CLICK THE LINK TO SYNC WALLET.",
                tags: ["BLOCKCHAIN", "RUST", "SOLANA"],
                posted: "2 HRS AGO"
            },
            timestamp: "2026.02.13"
        },
        {
            id: "REP_904",
            type: "POST",
            reason: "HARASSMENT",
            reporter: "@dev_alpha",
            target: {
                id: "POST_112",
                author: "@troll_node",
                content: "JUNIOR DEVELOPERS ARE THE WEAKEST LINK IN THE CHAIN. THEY SHOULD NOT BE ALLOWED TO PUSH TO PROD WITHOUT PAYING A FEE.",
                stats: { likes: 12, comments: 45 },
                posted: "10 MIN AGO"
            },
            timestamp: "2026.02.13"
        }
    ]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12.5">
                    
                    {/* 1. ADMIN HEADER */}
                    <div className="px-4 h-9 bg-zinc-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <ShieldAlert size={14} className="text-red-500 fill-red-500" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-white">Report_Queue</span>
                        </div>
                    </div>

                    {/* 2. COMPACT REPORT LIST */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide gap-px grid grid-cols-2 border-b border-zinc-300 divide-x ">
                        {reports.map((report) => (
                            <Dialog key={report.id}>
                                <DialogTrigger asChild>
                                    <div className="p-2.5 bg-white flex flex-col group h-fit border-b border-zinc-300 cursor-pointer hover:bg-zinc-50 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[10px] font-mono font-black text-white bg-red-600 px-1 py-0.5 tracking-tighter">#{report.id}</span>
                                            <div className="flex items-center gap-1 text-[10px] font-mono font-black text-zinc-400 uppercase">
                                                {report.type === "JOB" ? <Briefcase size={10} /> : <FileText size={10} />}
                                                {report.type}
                                            </div>
                                        </div>
                                        <h3 className="text-xs font-bold uppercase tracking-tight leading-none mb-1 group-hover:text-red-600 transition-colors">{report.reason}</h3>
                                        <div className="flex items-center justify-between pt-1 border-t border-zinc-50 mt-1">
                                            <span className="text-[9px] font-mono font-black uppercase text-zinc-500">By {report.reporter}</span>
                                            <ArrowUpRight size={10} className="text-zinc-200" />
                                        </div>
                                    </div>
                                </DialogTrigger>

                                {/* --- HIGH-FIDELITY MODAL --- */}
                                <DialogContent className="sm:max-w-[600px] p-0 rounded-none border-none overflow-hidden">
                                    <DialogHeader className="p-4 bg-red-600 text-white space-y-0 flex-row items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle size={14} />
                                            <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-widest">In_Review: {report.reason}</DialogTitle>
                                        </div>
                                        <span className="text-[10px] font-mono font-black uppercase mr-10">Ref_ID: {report.id}</span>
                                    </DialogHeader>

                                    <div className="flex flex-col max-h-[80vh] overflow-y-auto scrollbar-hide">
                                        {/* PREVIEW CONTAINER */}
                                        <div className="px-4 pb-3 bg-zinc-50 border-b border-zinc-100">
                                            <span className="text-[8px] font-mono font-black text-zinc-400 uppercase mb-4 block tracking-[0.2em]">Visual_Evidence_Node</span>
                                            
                                            {report.type === "JOB" ? (
                                                /* --- JOB PREVIEW UI --- */
                                                <div className="bg-white border border-zinc-300 p-4 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="space-y-1">
                                                            <h2 className="text-xl font-bold uppercase tracking-tighter leading-none">{report.target.title}</h2>
                                                            <div className="flex items-center gap-1.5 text-[10px] font-mono font-black text-zinc-600 uppercase">
                                                                <Globe size={10} /> {report.target.company}
                                                            </div>
                                                        </div>
                                                        <span className="text-[9px] font-mono font-bold text-zinc-500">{report.target.posted}</span>
                                                    </div>
                                                    <div className="flex gap-4 border-y border-zinc-50 pb-1">
                                                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-500"><MapPin size={10} /> {report.target.location}</div>
                                                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-500"><DollarSign size={10} /> {report.target.salary}</div>
                                                    </div>
                                                    <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase leading-relaxed bg-red-50 p-3 border-l-2 border-red-500 italic">
                                                        "{report.target.desc}"
                                                    </p>
                                                </div>
                                            ) : (
                                                /* --- POST PREVIEW UI --- */
                                                <div className="bg-white border border-zinc-200 p-4 space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center text-white text-[10px] font-black">{report.target.author[1]}</div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] font-black uppercase">{report.target.author}</span>
                                                            <span className="text-[9px] font-mono text-zinc-500 uppercase">{report.target.posted}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-[11px] font-mono font-bold text-zinc-500 uppercase leading-relaxed border-l-2 border-red-500 pl-4 bg-red-50/50 py-2">
                                                        {report.target.content}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* MODERATOR ACTIONS */}
                                        <div className="p-4 bg-white space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                                <Terminal size={12} className="text-zinc-900" /> Action_Required_By: <span className="text-zinc-900">ADMIN_USER_1</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <button className="h-10 border border-zinc-900 flex items-center justify-center gap-2 hover:bg-zinc-900 hover:text-white transition-all font-mono font-black text-[10px] uppercase tracking-widest cursor-pointer">
                                                    <EyeOff size={14} /> Ignore_Report
                                                </button>
                                                <button className="h-10 bg-red-600 text-white flex items-center justify-center gap-2 hover:bg-red-700 transition-all font-mono font-black text-[10px] uppercase tracking-widest cursor-pointer">
                                                    <Trash2 size={14} /> Terminate_Node
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminReportsPage;