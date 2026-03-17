import { useState } from 'react';
import {
    Building2, Globe, Mail, CheckCircle2, Send,
    XOctagon, ExternalLink, Activity, Terminal, Filter, User, Briefcase
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

// --- TYPES & MOCK DATA ---
type VerificationStatus = 'PENDING' | 'SENT' | 'ACCEPTED';

interface CompanyNode {
    id: string;
    name: string;
    domain: string;
    type: string;
    email: string;
    logoUrl: string;
    status: VerificationStatus;
    submittedAt: string;
    submitter: {
        name: string;
        role: string;
        email: string;
    };
}

const INITIAL_QUEUE: CompanyNode[] = [
    {
        id: "NODE_092A",
        name: "Vercel",
        domain: "vercel.com",
        type: "Cloud Infrastructure",
        email: "admin@vercel.com",
        logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=VE&backgroundColor=18181b",
        status: 'PENDING',
        submittedAt: "10 MIN AGO",
        submitter: {
            name: "Alex Rivers",
            role: "Head of Talent",
            email: "arivers@vercel.com"
        }
    },
    {
        id: "NODE_092B",
        name: "Anthropic",
        domain: "anthropic.com",
        type: "Artificial Intelligence",
        email: "security@anthropic.com",
        logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=AN&backgroundColor=18181b",
        status: 'SENT',
        submittedAt: "2 HOURS AGO",
        submitter: {
            name: "Sarah Chen",
            role: "Security Engineer",
            email: "schen@anthropic.com"
        }
    },
    {
        id: "NODE_092C",
        name: "Supabase",
        domain: "supabase.com",
        type: "Database / Backend",
        email: "founders@supabase.com",
        logoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=SU&backgroundColor=18181b",
        status: 'ACCEPTED',
        submittedAt: "1 DAY AGO",
        submitter: {
            name: "Marcus Vane",
            role: "Co-Founder",
            email: "marcus@supabase.com"
        }
    }
];

const VerificationTerminal = () => {
    const [queue, setQueue] = useState<CompanyNode[]>(INITIAL_QUEUE);
    const [selectedId, setSelectedId] = useState<string | null>("NODE_092A");
    const [filterStatus, setFilterStatus] = useState<string>("ALL");

    // Filter logic
    const filteredQueue = queue.filter(node =>
        filterStatus === "ALL" ? true : node.status === filterStatus
    );

    const activeNode = queue.find(q => q.id === selectedId);

    // --- ACTIONS ---
    const updateStatus = (id: string, newStatus: VerificationStatus) => {
        setQueue(prev => prev.map(node => node.id === id ? { ...node, status: newStatus } : node));
    };

    const handleSendVerification = () => {
        if (activeNode) updateStatus(activeNode.id, 'SENT');
    };

    const handleSimulateUserClick = () => {
        if (activeNode) updateStatus(activeNode.id, 'ACCEPTED');
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative overflow-hidden">
            <Navbar />

            {/* ENFORCED MAX-W-4XL CONTAINER */}
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">

                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative hidden sm:block">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-[calc(100vh-3.5rem)] mt-12 shadow-sm flex-row relative">

                    {/* CENTER: INSPECTION DECK */}
                    <div className="flex-1 flex flex-col relative border-r border-zinc-300">

                        {/* CONTENT AREA */}
                        {activeNode ? (
                            <div className="flex-1 flex flex-col gap-[1px] overflow-y-auto scrollbar-hide pb-24">

                                {/* Status Banner */}
                                <div className={cn(
                                    "p-2 flex items-center justify-between sticky top-0 z-10",
                                    activeNode.status === 'PENDING' ? "bg-orange-500 text-white" :
                                        activeNode.status === 'SENT' ? "bg-blue-500 text-white" : "bg-emerald-500 text-white"
                                )}>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] mt-0.5">
                                            Status: {activeNode.status}
                                        </span>
                                    </div>
                                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                                        ID: {activeNode.id}
                                    </span>
                                </div>

                                {/* Primary Identifier Block */}
                                <div className="bg-white p-2 flex items-center gap-5 border-b border-zinc-300">
                                    <div className="w-14">
                                        <img src={activeNode.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <h2 className="text-xl font-black uppercase tracking-tight text-zinc-900 leading-none">
                                            {activeNode.name}
                                        </h2>
                                    </div>
                                </div>

                                {/* SECTION: COMPANY DATA */}
                                <div className=" p-2 border-b border-zinc-300 flex items-center">
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Company Data</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors group">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                            Sector Tag
                                        </label>
                                        <span className="text-xs font-bold text-zinc-900 uppercase">{activeNode.type}</span>
                                    </div>

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors group">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                            Domain Registry
                                        </label>
                                        <a href={`https://${activeNode.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase hover:text-orange-600 transition-colors outline-none w-fit">
                                            {activeNode.domain} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors group md:col-span-2">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                             Email
                                        </label>
                                        <a href={`mailto:${activeNode.email}`} className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase hover:text-orange-600 transition-colors outline-none w-fit truncate">
                                            {activeNode.email} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        </a>
                                    </div>
                                </div>

                                {/* SECTION: SUBMITTER DATA */}
                                <div className=" p-2 border-b border-zinc-300 flex items-center">
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">Creator Infos</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                            Full Name
                                        </label>
                                        <span className="text-xs font-bold text-zinc-900 uppercase">{activeNode.submitter.name}</span>
                                    </div>

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                            Role
                                        </label>
                                        <span className="text-xs font-bold text-zinc-900 uppercase">{activeNode.submitter.role}</span>
                                    </div>

                                    <div className="bg-white p-2 flex flex-col gap-2 hover:bg-zinc-50 transition-colors group md:col-span-2">
                                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                                            Personal Email
                                        </label>
                                        <a href={`mailto:${activeNode.submitter.email}`} className="flex items-center gap-1.5 text-xs font-bold text-zinc-900 uppercase hover:text-orange-600 transition-colors outline-none w-fit truncate">
                                            {activeNode.submitter.email} <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-zinc-400 gap-4 bg-white">
                                <Terminal size={24} className="opacity-20" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest text-center">
                                    NO_NODE_SELECTED <br /> Select a company from the queue
                                </span>
                            </div>
                        )}

                        {/* STICKY ACTION FOOTER */}
                        {activeNode && (
                            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-300 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between ">

                                {activeNode.status === 'PENDING' && (
                                    <>
                                        <Button variant="outline" className="w-full sm:w-auto h-10 bg-red-500 text-white rounded-none border-none hover:bg-red-600 hover:text-white font-mono text-[9px] font-black uppercase tracking-widest shadow-none px-12">
                                            <XOctagon size={12} className="mr-1" /> Reject
                                        </Button>
                                        <Button onClick={handleSendVerification} className="w-full sm:flex-1 h-10 rounded-none bg-zinc-800 text-white hover:bg-orange-500 transition-colors font-mono text-[9px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0px_0px_rgba(24,24,27,0.2)] active:shadow-none active:translate-y-[3px] active:translate-x-[3px]">
                                            <Send size={12} className="mr-2" /> Email Sent
                                        </Button>
                                    </>
                                )}

                                {activeNode.status === 'SENT' && (
                                    <>
                                        <div className="w-full sm:flex-1 flex items-center gap-2 text-[9px] font-mono font-black text-blue-600 uppercase tracking-widest px-2">
                                            <Activity size={12} className="animate-pulse" /> Awaiting Confirmation
                                        </div>
                                        <Button onClick={handleSimulateUserClick} variant="outline" className="w-full sm:w-auto h-10 rounded-none border-zinc-400 text-zinc-900 hover:text-emerald-700 font-mono text-[9px] font-black uppercase tracking-widest shadow-none">
                                            [DEV] Simulate Link Open
                                        </Button>
                                    </>
                                )}

                                {activeNode.status === 'ACCEPTED' && (
                                    <div className="w-full flex items-center justify-center gap-2 h-10 bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-black uppercase tracking-widest">
                                        <CheckCircle2 size={14} /> Node_Created
                                    </div>
                                )}

                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDEBAR: QUEUE & FILTER (w-56 to fit max-w-4xl comfortably) */}
                    <aside className="w-39 shrink-0 bg-zinc-50 relative hidden md:flex flex-col">

                        

                        {/* Dropdown Filter */}
                        <div className="p-0.5 border-b border-zinc-300 bg-zinc-100 shrink-0">
                            
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-full h-12 rounded-none bg-white text-zinc-900 font-mono text-[10px] font-bold uppercase tracking-widest shadow-none cursor-pointer outline-none">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent position="popper" sideOffset={4} className="rounded-none border-zinc-300 font-mono text-[9px] font-bold uppercase tracking-widest bg-white">
                                    <SelectItem value="ALL" className="text-xs cursor-pointer focus:bg-zinc-100">All_Nodes</SelectItem>
                                    <SelectItem value="PENDING" className="text-xs cursor-pointer focus:bg-zinc-100 text-orange-600 focus:text-orange-700">Pending</SelectItem>
                                    <SelectItem value="SENT" className="text-xs cursor-pointer focus:bg-zinc-100 text-blue-600 focus:text-blue-700">Email_Sent</SelectItem>
                                    <SelectItem value="ACCEPTED" className="text-xs cursor-pointer focus:bg-zinc-100 text-emerald-600 focus:text-emerald-700">Accepted</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Scrollable List */}
                        <div className="flex-1 flex flex-col divide-y divide-zinc-200 overflow-y-auto scrollbar-hide">
                            {filteredQueue.length === 0 ? (
                                <div className="p-2 text-center text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                                    Queue Empty
                                </div>
                            ) : (
                                filteredQueue.map((node) => (
                                    <button
                                        key={node.id}
                                        onClick={() => setSelectedId(node.id)}
                                        className={cn(
                                            "flex flex-col p-2 transition-colors cursor-pointer border-b border-zinc-300 group outline-none text-left relative",
                                            selectedId === node.id
                                                ? "bg-white shadow-[inset_2px_0_0_0_#f97316]"
                                                : "hover:bg-zinc-100"
                                        )}
                                    >
                                        <div className="flex items-start justify-between">
                                            <span className={cn(
                                                "text-[11px] font-bold uppercase tracking-tight truncate pr-2",
                                                selectedId === node.id ? "text-zinc-900" : "text-zinc-600 group-hover:text-zinc-900"
                                            )}>
                                                {node.name}
                                            </span>

                                            {/* Status Indicator Dot */}
                                            <div className={cn(
                                                "w-1.5 h-1.5  mt-1 shrink-0",
                                                node.status === 'PENDING' ? "bg-orange-500" :
                                                    node.status === 'SENT' ? "bg-blue-500" : "bg-emerald-500"
                                            )} />
                                        </div>

                                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest truncate w-full">
                                            {node.domain}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>

                    </aside>

                </main>
            </div>
        </div>
    );
};

export default VerificationTerminal;