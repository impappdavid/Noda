import { useState } from 'react';
import { 
    FileText, Briefcase, ChevronRight, Activity, User, 
    ShieldAlert, Clock, Info, Terminal, AlertTriangle, ExternalLink,
    EyeOff,
    Trash2
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const AdminReportsPage = () => {
    const [reports] = useState([
        {
            id: "901",
            type: "JOB",
            reason: "SCAM_INJECTION",
            reporter: "@user_04",
            date: "2026.02.13",
            severity: "HIGH",
            target: { 
                title: "SR_BLOCKCHAIN_DEV", 
                company: "NEURAL_NET_INC",
                salary: "$180K - $240K",
                desc: "WE REQUIRE IMMEDIATE ACCESS TO YOUR COLD STORAGE TO VERIFY YOUR CRYPTO KNOWLEDGE. CLICK THE LINK TO SYNC WALLET." 
            }
        },
        {
            id: "904",
            type: "POST",
            reason: "HARASSMENT",
            reporter: "@dev_alpha",
            date: "2026.02.13",
            severity: "MED",
            target: { 
                author: "@troll_node", 
                content: "JUNIOR DEVELOPERS ARE THE WEAKEST LINK IN THE CHAIN. THEY SHOULD NOT BE ALLOWED TO PUSH TO PROD WITHOUT PAYING A FEE.",
                likes: 12,
                comments: 45
            }
        },
        { id: "905", type: "JOB", reason: "SPAM", reporter: "@bot_hunter", date: "2026.02.13", severity: "LOW", target: { title: "EASY $5000/DAY", company: "WEB3_DREAMS", desc: "Click link now to start earning without work." } },
        { id: "906", type: "POST", reason: "NSFW_CONTENT", reporter: "@mod_prime", date: "2026.02.13", severity: "HIGH", target: { author: "@user_99", content: "Invalid media detected in the main thread gallery." } },
    ]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12">
                    
                    {/* INDUSTRIAL LIGHT HEADER */}
                    <div className="px-3 py-2 bg-zinc-200 flex justify-between items-center shrink-0 border-b border-zinc-300">
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-zinc-600" />
                            <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">Safety_Log</span>
                        </div>
                        <div className="flex items-center gap-3">
                            
                            <span className="text-[9px] font-mono font-black bg-zinc-800 text-white px-1.5 py-0.5">TOTAL:{reports.length}</span>
                        </div>
                    </div>

                    {/* MINI-CARD GRID WITH BORDER DIVIDE */}
                    <div className="flex-1 overflow-y-auto  gap-px grid grid-cols-3 divide-x divide-y divide-zinc-300 content-start border-b border-zinc-300 scrollbar-hide">
                        {reports.map((report) => (
                            <Dialog key={report.id}>
                                <DialogTrigger asChild>
                                    <div className="p-2 bg-white flex flex-col h-fit cursor-pointer hover:bg-zinc-50/80 transition-colors group">
                                        
                                        <div className="flex items-center justify-between mb-1.5">
                                            <div className="flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase">
                                                <span className="text-zinc-900 bg-zinc-100 px-1 border border-zinc-200 shadow-sm">#{report.id}</span>
                                                <span className={report.severity === 'HIGH' ? 'text-red-500' : 'text-zinc-400'}>
                                                    {report.severity}
                                                </span>
                                            </div>
                                            <div className="text-zinc-300 group-hover:text-zinc-900 transition-colors">
                                                {report.type === "JOB" ? <Briefcase size={10} /> : <FileText size={10} />}
                                            </div>
                                        </div>

                                        <h3 className="text-[10px] font-black uppercase tracking-tight text-zinc-900 group-hover:translate-x-0.5 transition-transform truncate mb-2">
                                            {report.reason.replace('_', ' ')}
                                        </h3>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center gap-1 text-[8px] font-mono font-bold text-zinc-400 uppercase">
                                                <User size={8} /> {report.reporter}
                                            </div>
                                            <ChevronRight size={12} className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all" />
                                        </div>
                                    </div>
                                </DialogTrigger>

                                {/* ENHANCED MODAL CONTENT */}
                                <DialogContent className="sm:max-w-[450px] p-0 rounded-none border border-zinc-900 shadow-none overflow-hidden bg-white gap-0">
                                    <DialogHeader className="p-3 bg-zinc-900 text-white flex-row items-center justify-between space-y-0">
                                        <div className="flex items-center gap-2">
                                            <ShieldAlert size={14} className="text-red-500" />
                                            <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-widest">
                                                {report.type}_Audit_#{report.id}
                                            </DialogTitle>
                                        </div>
                                        <div className="text-[8px] font-mono text-zinc-400 mr-8 uppercase">{report.date}</div>
                                    </DialogHeader>

                                    <div className="max-h-[70vh] overflow-y-auto p-4 space-y-4 scrollbar-hide">
                                        {/* SECTION 1: TARGET DATA */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between border-b border-zinc-100 pb-1">
                                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                                                    <Activity size={8} /> Content_Snapshot
                                                </span>
                                                <ExternalLink size={10} className="text-zinc-400" />
                                            </div>
                                            
                                            <div className="bg-zinc-50 border border-zinc-200 p-3 space-y-3">
                                                {report.type === "JOB" ? (
                                                    <>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-[11px] font-black uppercase tracking-tighter text-zinc-900 leading-none">{report.target.title}</span>
                                                            <span className="text-[9px] font-mono font-bold text-red-600">{report.target.company}</span>
                                                        </div>
                                                        <p className="text-[10px] font-mono text-zinc-700 leading-relaxed uppercase bg-white p-2 border border-zinc-100 italic">
                                                            "{report.target.desc}"
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-5 h-5 bg-zinc-900 flex items-center justify-center text-white text-[8px] font-black uppercase tracking-tighter">
                                                                {report.target.author.charAt(1)}
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase">{report.target.author}</span>
                                                        </div>
                                                        <p className="text-[10px] font-mono text-zinc-700 leading-relaxed uppercase bg-white p-2 border border-zinc-100 italic">
                                                            "{report.target.content}"
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* SECTION 2: MODERATION INTEL */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Reporter</span>
                                                <div className="text-[9px] font-mono font-bold bg-zinc-100 p-1.5 flex items-center gap-1.5">
                                                    <User size={10} /> {report.reporter}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[7px] font-black text-zinc-400 uppercase tracking-widest">Violation</span>
                                                <div className="text-[9px] font-mono font-black text-red-600 bg-red-50 border border-red-100 p-1.5">
                                                    {report.reason}
                                                </div>
                                            </div>
                                        </div>

                                        {/* ACTIONS */}
                                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                                            <button className="h-9 border-2 border-zinc-900 bg-white hover:bg-zinc-100 font-mono font-black text-[9px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2">
                                                <EyeOff size={14} /> Dismiss
                                            </button>
                                            <button className="h-9 bg-red-600 text-white font-mono font-black text-[9px] uppercase cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center gap-2 border-2 border-red-600">
                                                <Trash2 size={14} /> Purge_Node
                                            </button>
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