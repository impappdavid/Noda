import React, { useState, useMemo, useCallback } from 'react';
import {
    Search, Users, Inbox, Trash2, Clock, Send
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
    <div className="bg-zinc-200 ">
        <div className="flex items-center bg-zinc-200 h-10">


            {/* Input Field */}
            <div className="flex-1 h-full relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-[11px]">@</span>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Add members by @username"
                    className="w-full h-full bg-transparent pl-8 pr-4 text-[11px] font-mono font-bold text-black outline-none placeholder:text-zinc-500  transition-all"
                />
            </div>

            {/* Action Trigger */}
            <button
                onClick={onTransmit}
                className="h-full px-4 bg-blue-500 text-white font-mono font-bold text-[10px] uppercase tracking-[0.1em] flex items-center gap-2 hover:bg-blue-600 active:bg-blue-500 transition-all cursor-pointer"
            >
                Send Invite 
            </button>
        </div>
    </div>
));

// --- COMPONENT: TEAM REGISTRY TABLE (WITH DIVIDE-X) ---
const TeamRegistryTable = ({ nodes, onRemove, onEdit }: { nodes: TeamNode[], onRemove: (id: string) => void, onEdit: (node: TeamNode) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    {nodes.map((node) => (
      <div 
        key={node.id} 
        onClick={() => onEdit(node)}
        className="group border-r border-b border-zinc-300 bg-white hover:bg-zinc-200 transition-all cursor-pointer flex flex-col"
      >
        {/* Top Section: Identity */}
        <div className="p-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-bold text-white text-[10px] border border-zinc-900 shrink-0">
               {node.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900 truncate">
                {node.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-zinc-500 truncate">
                {node.name.toLowerCase().replace(' ', '.')}@noda.network
              </span>
            </div>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onRemove(node.id); }}
            className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors cursor-pointer hover:bg-red-500/20"
          >
            <Trash2 size={14} />
          </button>
        </div>

        {/* Bottom Section: High-Visibility Data Strip */}
        <div className="flex border-t border-zinc-300 divide-x divide-zinc-300 bg-zinc-50">
          {/* Role Block */}
          <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">
              Position
            </span>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">
              {node.role || "CEO"}
            </span>
          </div>

          {/* Date Block */}
          <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">
              Joined at
            </span>
            <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-700 uppercase">
              <Clock size={10} className="text-zinc-400" />
              {node.joinedDate || "14_FEB_2026"}
            </div>
          </div>
        </div>
      </div>
    ))}
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

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12">
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
                                placeholder={activeTab === 'TEAM' ? "SEARCH FOR MEMBERS..." : "FILTER_REQUESTS..."}
                                className="w-full h-10 bg-zinc-50 border-b border-zinc-300 pl-10 pr-4 text-[11px] font-mono font-bold outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">
                        {activeTab === 'TEAM' ? (
                            <TeamRegistryTable nodes={filteredTeam} onRemove={handleRemove} />
                        ) : (
                            <div className="w-full border-b border-zinc-300 bg-white">
                                <Table className="border-collapse">
                                    <TableHeader className="bg-zinc-50/50 border-b border-zinc-300">
                                        <TableRow className="border-none divide-x divide-zinc-300 bg-zinc-200">
                                            <TableHead className="w-[200px] text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-2">Full_Name</TableHead>
                                            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-2">Email</TableHead>
                                            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest pl-2">Role</TableHead>
                                            <TableHead className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest w-[120px] text-center">Protocol_Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {requests.map((node) => (
                                            <TableRow key={node.id} className="group border-b border-zinc-300 hover:bg-orange-50/30 transition-colors h-10 divide-x divide-zinc-300 cursor-pointer">
                                                {/* 1. NAME & AVATAR */}
                                                <TableCell className="pl-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-zinc-800 border border-zinc-300 flex items-center justify-center font-black text-zinc-400 text-[10px] shrink-0">
                                                            ?
                                                        </div>
                                                        <span className="text-xs font-semibold tracking-tight text-zinc-900 truncate">{node.name}</span>
                                                    </div>
                                                </TableCell>

                                                {/* 2. USERNAME/EMAIL */}
                                                <TableCell className="pl-2">
                                                    <span className="text-[11px] font-mono font-bold text-zinc-500">{node.username}</span>
                                                </TableCell>

                                                {/* 3. NOTE */}
                                                <TableCell className="pl-2">
                                                    <span className="text-[10px] font-mono text-zinc-600 truncate block max-w-[250px]">
                                                        {node.note}
                                                    </span>
                                                </TableCell>

                                                {/* 4. ACTIONS */}
                                                <TableCell className="p-0">
                                                    <div className="flex h-full divide-x divide-zinc-300">
                                                        <button
                                                            className="flex-1 h-10 text-[10px] border-none font-mono font-black uppercase text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer outline-none"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="flex-1 h-10 text-[10px] font-mono font-black uppercase text-zinc-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer border-none outline-none"
                                                        >
                                                            Ignore
                                                        </button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                {/* EMPTY STATE PROTOCOL */}
                                {requests.length === 0 && (
                                    <div className="p-12 text-center border-b border-zinc-200 bg-white">
                                        <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-[0.4em]">
                                            No_Pending_Uplinks
                                        </span>
                                    </div>
                                )}
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
        {active && <div className={cn("absolute bottom-0 left-0 right-0 h-0.5", isOrange ? "bg-orange-600" : "bg-zinc-900")} />}
    </button>
);

export default TeamNodesManager;