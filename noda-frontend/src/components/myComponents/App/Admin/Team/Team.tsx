import React, { useState } from 'react';
import {
    Search, UserPlus, Shield, Trash2,
    Check, X, Activity, Fingerprint,
    ArrowRight, ShieldAlert, Globe, Users, Inbox
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const TeamNodesManager = () => {
    const [activeTab, setActiveTab] = useState<'TEAM' | 'REQUESTS'>('TEAM');
    const [usernameInput, setUsernameInput] = useState("");

    // Split Data
    const activeTeam = [
        { id: "u1", name: "Sam Altman", username: "@sam", role: "CEO" },
        { id: "u2", name: "Mira Murati", username: "@mira", role: "RECRUITER" },
        { id: "u3", name: "Alex Rivers", username: "@arivers", role: "MARKETING" },
    ];

    const requests = [
        { id: "r1", name: "Jordan Vane", username: "@vane_sys", note: "Senior Dev node access." },
        { id: "r2", name: "Encrypted Node", username: "@null_ptr", note: "Security specialist." },
    ];

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">

                    {/* 1. PERSISTENT INJECTION HEADER */}
                    <div className="p-4 bg-zinc-800 text-white shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Fingerprint size={16} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest">Manual_Node_Injection</span>
                            </div>
                            <div className="flex-1 max-w-sm relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-zinc-400 text-[10px]">@</span>
                                <input
                                    value={usernameInput}
                                    onChange={(e) => setUsernameInput(e.target.value.toLowerCase())}
                                    placeholder="USERNAME_ID"
                                    className="w-full h-8 bg-zinc-800 border border-zinc-600 pl-8 pr-4 text-[11px] font-mono font-bold uppercase outline-none transition-colors"
                                />
                            </div>
                            <button className="h-8 px-4 bg-orange-600 text-white font-mono font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-orange-700 transition-all shrink-0 cursor-pointer">
                                Transmit_Invite 
                            </button>
                        </div>
                    </div>

                    {/* 2. SUB-PROTOCOL TABS (ZERO GAP) */}
                    <div className="flex border-b border-zinc-300 bg-white shrink-0">
                        <button
                            onClick={() => setActiveTab('TEAM')}
                            className={cn(
                                "flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer",
                                activeTab === 'TEAM' ? "text-zinc-900 bg-zinc-50" : "text-zinc-500 hover:text-zinc-600"
                            )}
                        >
                            <Users size={12} /> Team_Nodes ({activeTeam.length})
                            {activeTab === 'TEAM' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-900" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('REQUESTS')}
                            className={cn(
                                "flex-1 h-12 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer",
                                activeTab === 'REQUESTS' ? "text-orange-600 bg-orange-50/30" : "text-zinc-500 hover:text-orange-600"
                            )}
                        >
                            <Inbox size={12} /> Inbound_Requests ({requests.length})
                            {activeTab === 'REQUESTS' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-600" />}
                        </button>
                    </div>

                    {/* 3. CONTEXTUAL SEARCH */}
                    <div className=" bg-white sticky top-0 z-20">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-zinc-400" size={14} />
                            <input
                                placeholder={activeTab === 'TEAM' ? "FILTER_ACTIVE_NODES..." : "FILTER_REQUESTS..."}
                                className="w-full h-10 bg-zinc-50 border-b border-zinc-300 pl-10 pr-4 text-[10px] font-mono font-bold uppercase outline-none"
                            />
                        </div>
                    </div>

                    {/* 4. LIST CONTENT */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide divide-y divide-zinc-200">
                        {activeTab === 'TEAM' ? (
                            activeTeam.map((node) => (
                                <ActiveNodeRow key={node.id} node={node} />
                            ))
                        ) : (
                            requests.map((node) => (
                                <RequestNodeRow key={node.id} node={node} />
                            ))
                        )}
                    </div>

                    {/* 5. SYSTEM STATUS FOOTER */}
                    <div className="h-8 bg-zinc-800 flex items-center px-4 justify-between shrink-0">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest font-black">
                            {activeTab}_PROTOCOL_ACTIVE
                        </span>
                        <span className="text-[9px] font-mono text-zinc-300 uppercase italic">Auth: CEO_MASTER // Noda_v.5.0</span>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- ROW COMPONENTS ---

const ActiveNodeRow = ({ node }: any) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-50 transition-all group cursor-pointer bg-white">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900  flex items-center justify-center font-black text-white text-xs shrink-0">
                {node.name[0]}
            </div>
            <div>
                <div className="flex items-center gap-2 leading-none">
                    <h5 className="text-sm font-bold uppercase tracking-tight">{node.name}</h5>
                    <span className="text-[10px] font-mono text-zinc-500">{node.username}</span>
                </div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">Role: {node.role}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Select defaultValue={node.role}>
                <SelectTrigger className="h-8 w-28 rounded-none border-zinc-200 bg-white text-[9px] font-mono font-black uppercase focus:ring-0">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="rounded-none font-mono text-[10px] max-w-28 uppercase bg-white">
                    <SelectItem value="CEO" className='text-xs cursor-pointer'>CEO_MASTER</SelectItem>
                    <SelectItem value="RECRUITER" className='text-xs cursor-pointer'>RECRUITER</SelectItem>
                    <SelectItem value="MARKETING" className='text-xs cursor-pointer'>MARKETING</SelectItem>
                </SelectContent>
            </Select>
            <button className="p-2 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer group-hover:opacity-100 opacity-0">
                <Trash2 size={14} />
            </button>
        </div>
    </div>
);

const RequestNodeRow = ({ node }: any) => (
    <div className="flex items-center justify-between p-3 bg-white hover:bg-orange-50/20 transition-all border-l-4 border-l-orange-500">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center font-black text-zinc-300 text-xs shrink-0">
                ?
            </div>
            <div>
                <div className="flex items-center gap-2 leading-none">
                    <h5 className="text-sm font-bold uppercase tracking-tight">{node.name}</h5>
                    <span className="text-[10px] font-mono text-zinc-500">{node.username}</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 italic mt-1 leading-none">"{node.note}"</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="h-8 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase hover:bg-black transition-all cursor-pointer">
                Accept
            </button>
            <button className="h-8 px-4 border border-zinc-200 text-zinc-400 text-[9px] font-mono font-black uppercase hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer">
                Ignore
            </button>
        </div>
    </div>
);

export default TeamNodesManager;