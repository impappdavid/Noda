import React, { useState, useMemo, useCallback } from 'react';
import {
    Search, Users, Inbox, Trash2, Clock,
    Plus, Send
} from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// --- TYPES ---
type ManagerTab = 'TEAM' | 'REQUESTS';
interface TeamNode { id: string; name: string; username: string; role: string; joinedDate?: string; }
interface RequestNode { id: string; name: string; username: string; note: string; }

// --- REDESIGNED COMPONENT: NODE INJECTION HEADER ---
const NodeInjectionHeader = React.memo(({ value, onChange, onTransmit }: any) => (
    <div className="bg-zinc-800 ">
        <div className="flex items-center bg-zinc-800 h-11">
            
            
            {/* Input Field */}
            <div className="flex-1 h-full relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-zinc-400 text-[11px]">@</span>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Add members by @username"
                    className="w-full h-full bg-transparent pl-8 pr-4 text-[11px] font-mono font-bold text-white outline-none placeholder:text-zinc-400 focus:bg-zinc-900/30 transition-all"
                />
            </div>

            {/* Action Trigger */}
            <button
                onClick={onTransmit}
                className="h-full px-6 bg-orange-500 text-white font-mono font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:bg-orange-600 active:bg-orange-700 transition-all cursor-pointer"
            >
                Transmit_Invite <Send size={12} />
            </button>
        </div>
    </div>
));

// --- COMPONENT: TEAM REGISTRY TABLE (WITH DIVIDE-X) ---
const TeamRegistryTable = ({ nodes, onRemove }: { nodes: TeamNode[], onRemove: (id: string) => void }) => (
    <div className="w-full border-b border-zinc-300 bg-white">
        <Table className="border-collapse">
            <TableHeader className="bg-zinc-50/50 border-b border-zinc-300">
                <TableRow className="hover:bg-transparent border-none h-10 divide-x divide-zinc-200">
                    <TableHead className="w-[200px] text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-4">Full_Name</TableHead>
                    <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-4">@_Email</TableHead>
                    <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-4">Role</TableHead>
                    <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-4">Joined_Date</TableHead>
                    <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest w-[50px] text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {nodes.map((node) => (
                    <TableRow key={node.id} className="group border-b border-zinc-300 hover:bg-zinc-100 transition-colors h-10 divide-x divide-zinc-200 cursor-pointer">
                        <TableCell className="pl-2">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-zinc-800 flex items-center justify-center font-bold text-white text-[10px] shrink-0 border border-zinc-800">
                                    {node.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-xs font-bold tracking-tight text-zinc-900 truncate">{node.name}</span>
                            </div>
                        </TableCell>
                        <TableCell className="pl-4">
                            <span className="text-[11px] font-mono font-bold text-zinc-600">{node.name.toLowerCase().replace(' ', '.')}@noda.network</span>
                        </TableCell>
                        <TableCell className="pl-4">
                            <div className="text-[10px] font-bold uppercase tracking-tighter text-zinc-900 bg-zinc-100 w-fit px-2 py-0.5 border border-zinc-200">
                                {node.role || "CEO"}
                            </div>
                        </TableCell>
                        <TableCell className="pl-4">
                            <div className="flex items-center gap-2 text-[9px] font-mono font-black text-zinc-500 uppercase">
                                <Clock size={12} className="text-zinc-400" /> {node.joinedDate || "14_FEB_2026"}
                            </div>
                        </TableCell>
                        <TableCell className="p-0 text-center hover:bg-red-500/20 transition-colors">
                            <button 
                                onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} 
                                className="w-full h-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors cursor-pointer "
                            >
                                <Trash2 size={14} />
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
);

// --- MAIN MANAGER PAGE ---
const TeamNodesManager = () => {
    const [activeTab, setActiveTab] = useState<ManagerTab>('TEAM');
    const [usernameInput, setUsernameInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [activeTeam, setActiveTeam] = useState<TeamNode[]>([
        { id: "u1", name: "Sam Altman", username: "@sam", role: "CEO", joinedDate: "01_JAN_2026" },
        { id: "u2", name: "Mira Murati", username: "@mira", role: "RECRUITER", joinedDate: "12_JAN_2026" },
        { id: "u3", name: "Alex Rivers", username: "@arivers", role: "MARKETING", joinedDate: "05_FEB_2026" },
    ]);

    const requests: RequestNode[] = [
        { id: "r1", name: "Jordan Vane", username: "@vane_sys", note: "Senior Dev node access." },
        { id: "r2", name: "Encrypted Node", username: "@null_ptr", note: "Security specialist." },
    ];

    const filteredTeam = useMemo(() =>
        activeTeam.filter(n =>
            n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.username.toLowerCase().includes(searchQuery.toLowerCase())
        ), [activeTeam, searchQuery]);

    const handleRemove = useCallback((id: string) => {
        setActiveTeam(prev => prev.filter(node => node.id !== id));
    }, []);

    const handleInvite = useCallback(() => {
        console.log("Transmitting to:", usernameInput);
        setUsernameInput("");
    }, [usernameInput]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12.5">
                    <NodeInjectionHeader value={usernameInput} onChange={setUsernameInput} onTransmit={handleInvite} />

                    <div className="flex border-b border-zinc-300 bg-white shrink-0">
                        <TabButton active={activeTab === 'TEAM'} onClick={() => setActiveTab('TEAM')} label="Team_Nodes" count={activeTeam.length} icon={<Users size={12} />} />
                        <TabButton active={activeTab === 'REQUESTS'} onClick={() => setActiveTab('REQUESTS')} label="Inbound_Requests" count={requests.length} icon={<Inbox size={12} />} isOrange />
                    </div>

                    <div className="bg-white sticky top-0 z-20">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-zinc-400" size={14} />
                            <input
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={activeTab === 'TEAM' ? "FILTER_ACTIVE_NODES..." : "FILTER_REQUESTS..."}
                                className="w-full h-10 bg-zinc-50 border-b border-zinc-300 pl-10 pr-4 text-[10px] font-mono font-bold uppercase outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {activeTab === 'TEAM' ? (
                            <TeamRegistryTable nodes={filteredTeam} onRemove={handleRemove} />
                        ) : (
                            <div className="divide-y divide-zinc-200">
                                {requests.map((node) => (
                                    <div key={node.id} className="flex items-center justify-between p-3 bg-white hover:bg-orange-50/20 transition-all border-l-4 border-l-orange-500">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center font-black text-zinc-300 text-xs shrink-0">?</div>
                                            <div>
                                                <div className="flex items-center gap-2 leading-none">
                                                    <h5 className="text-sm font-bold uppercase tracking-tight">{node.name}</h5>
                                                    <span className="text-[10px] font-mono text-zinc-500">{node.username}</span>
                                                </div>
                                                <p className="text-[10px] font-mono text-zinc-500 italic mt-1 leading-none">"{node.note}"</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="h-8 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase hover:bg-black cursor-pointer border-none">Accept</button>
                                            <button className="h-8 px-4 border border-zinc-200 text-zinc-400 text-[9px] font-mono font-black uppercase hover:bg-red-50 hover:text-red-600 cursor-pointer">Ignore</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, label, count, icon, isOrange }: any) => (
    <button onClick={onClick} className={cn(
        "flex-1 h-10 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer border-none",
        active ? (isOrange ? "text-orange-600 bg-orange-50/30" : "text-zinc-900 bg-zinc-50") : "text-zinc-500 hover:text-zinc-600 bg-white"
    )}>
        {icon} {label} ({count})
        {active && <div className={cn("absolute bottom-0 left-0 right-0 h-1", isOrange ? "bg-orange-600" : "bg-zinc-900")} />}
    </button>
);

export default TeamNodesManager;