import React, { useState, useMemo, useCallback } from 'react';
import { Search, Users, Inbox } from 'lucide-react';
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import { cn } from "@/lib/utils";
import { ActiveNodeRow, RequestNodeRow } from './NodeRows';
import NodeInjectionHeader from './NodeInjectionHeader';
import type { ManagerTab, RequestNode, TeamNode } from '@/types/admin/team';

const TeamNodesManager = () => {
    const [activeTab, setActiveTab] = useState<ManagerTab>('TEAM');
    const [usernameInput, setUsernameInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [activeTeam, setActiveTeam] = useState<TeamNode[]>([
        { id: "u1", name: "Sam Altman", username: "@sam", role: "CEO" },
        { id: "u2", name: "Mira Murati", username: "@mira", role: "RECRUITER" },
        { id: "u3", name: "Alex Rivers", username: "@arivers", role: "MARKETING" },
    ]);

    const requests: RequestNode[] = [
        { id: "r1", name: "Jordan Vane", username: "@vane_sys", note: "Senior Dev node access." },
        { id: "r2", name: "Encrypted Node", username: "@null_ptr", note: "Security specialist." },
    ];

    // Performance: Memoize filtered data to prevent re-filtering on invite input changes
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
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    <NodeInjectionHeader 
                        value={usernameInput} 
                        onChange={setUsernameInput} 
                        onTransmit={handleInvite} 
                    />

                    {/* TABS */}
                    <div className="flex border-b border-zinc-300 bg-white shrink-0">
                        <TabButton 
                            active={activeTab === 'TEAM'} 
                            onClick={() => setActiveTab('TEAM')} 
                            label="Team_Nodes" 
                            count={activeTeam.length} 
                            icon={<Users size={12} />} 
                        />
                        <TabButton 
                            active={activeTab === 'REQUESTS'} 
                            onClick={() => setActiveTab('REQUESTS')} 
                            label="Inbound_Requests" 
                            count={requests.length} 
                            icon={<Inbox size={12} />} 
                            isOrange
                        />
                    </div>

                    {/* SEARCH */}
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

                    {/* LIST */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-zinc-200">
                        {activeTab === 'TEAM' ? (
                            filteredTeam.map((node) => (
                                <ActiveNodeRow key={node.id} node={node} onRemove={handleRemove} />
                            ))
                        ) : (
                            requests.map((node) => (
                                <RequestNodeRow key={node.id} node={node} />
                            ))
                        )}
                    </div>

                    <footer className="h-8 bg-zinc-800 flex items-center px-4 justify-between shrink-0">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black">
                            {activeTab}_PROTOCOL_ACTIVE
                        </span>
                        <span className="text-[9px] font-mono text-zinc-300 uppercase italic">Auth: Master_Node</span>
                    </footer>
                </main>
            </div>
        </div>
    );
};

// Internal Helper Component
const TabButton = ({ active, onClick, label, count, icon, isOrange }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer border-none",
            active 
                ? (isOrange ? "text-orange-600 bg-orange-50/30" : "text-zinc-900 bg-zinc-50") 
                : "text-zinc-500 hover:text-zinc-600 bg-white"
        )}
    >
        {icon} {label} ({count})
        {active && <div className={cn("absolute bottom-0 left-0 right-0 h-1", isOrange ? "bg-orange-600" : "bg-zinc-900")} />}
    </button>
);

export default TeamNodesManager;