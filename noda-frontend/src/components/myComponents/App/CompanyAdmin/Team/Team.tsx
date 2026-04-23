import React, { useState, useMemo, useCallback } from "react";
import { Search, Users, Inbox, Trash2, Clock, X, Shield, Mail, BarChart3, Fingerprint, ExternalLink } from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import { cn } from "@/lib/utils";

// --- TYPES ---
type ManagerTab = "TEAM" | "REQUESTS";
interface TeamNode {
  id: string;
  name: string;
  username: string;
  role: string;
  joinedDate?: string;
  email: string;
  followers: number;
}
interface RequestNode {
  id: string;
  name: string;
  username: string;
  note: string;
  role?: string;
}

// --- MODAL COMPONENT: REDESIGNED ---
const UserEditModal = ({ node, onClose, onSave, onKick }: any) => {
  const [role, setRole] = useState(node.role);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-zinc-50 border border-zinc-300 shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Left Sidebar: ID Card Style */}
        <div className="w-full md:w-64 bg-zinc-900 text-white p-6 flex flex-col items-center border-r border-zinc-800">
          <div className="w-24 h-24 bg-blue-600 flex items-center justify-center font-black text-3xl mb-4 border-4 border-zinc-800 shadow-xl">
            {node.name.split(" ").map((n: string) => n[0]).join("")}
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-center mb-1">{node.name}</h3>
          <span className="text-[10px] font-mono text-zinc-400 mb-6">{node.username}</span>
          
          <div className="w-full space-y-3 border-t border-zinc-800 pt-6">
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Status</span>
                <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-400 px-2 py-0.5 border border-emerald-500/20 uppercase">Active</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Node_ID</span>
                <span className="text-[9px] font-mono text-zinc-400">#{node.id.toUpperCase()}</span>
             </div>
          </div>

          <button 
            onClick={() => onKick(node.id)}
            className="mt-auto w-full py-2 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/50 text-red-500 text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2"
          >
            <Trash2 size={12} /> Terminate Access
          </button>
        </div>

        {/* Right Content: Configuration */}
        <div className="flex-1 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tighter">Profile Configuration</h2>
              <p className="text-[10px] font-mono text-zinc-500">MANAGE PERMISSIONS AND SYSTEM ACCESS</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-900 transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Data Row */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-400 uppercase flex items-center gap-2"><Mail size={12}/> Email_Registry</label>
                  <div className="p-2 bg-white border border-zinc-200 font-mono text-[11px] font-bold truncate">{node.email}</div>
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-zinc-400 uppercase flex items-center gap-2"><BarChart3 size={12}/> Social_Reach</label>
                  <div className="p-2 bg-white border border-zinc-200 font-mono text-[11px] font-bold">{node.followers.toLocaleString()} Followers</div>
               </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-1">
               <label className="text-[10px] font-black text-zinc-400 uppercase flex items-center gap-2"><Shield size={12}/> Access_Authorization</label>
               <select 
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 className="w-full p-2.5 bg-white border-2 border-zinc-900 text-[11px] font-black uppercase tracking-tight focus:ring-0 outline-none"
               >
                 <option value="CEO">CEO / FOUNDER</option>
                 <option value="RECRUITER">RECRUITER</option>
                 <option value="MARKETING">MARKETING OPS</option>
                 <option value="DEVELOPER">CORE DEVELOPER</option>
               </select>
            </div>
          </div>

          <button 
            onClick={() => onSave(node.id, role)}
            className="w-full py-4 bg-zinc-900 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-lg"
          >
            Deploy Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN MANAGER PAGE ---
const TeamNodesManager = () => {
  const [activeTab, setActiveTab] = useState<ManagerTab>("TEAM");
  const [usernameInput, setUsernameInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<TeamNode | null>(null);

  const [activeTeam, setActiveTeam] = useState<TeamNode[]>([
    { id: "u1", name: "Sam Altman", username: "@sam", role: "CEO", joinedDate: "01_JAN_2026", email: "sam@openai.com", followers: 2400500 },
    { id: "u2", name: "Mira Murati", username: "@mira", role: "RECRUITER", joinedDate: "12_JAN_2026", email: "mira@noda.network", followers: 850200 },
    { id: "u3", name: "Alex Rivers", username: "@arivers", role: "MARKETING", joinedDate: "05_FEB_2026", email: "rivers.alex@protocol.sh", followers: 12400 },
  ]);

  const [requests] = useState<RequestNode[]>([
    { id: "r1", name: "Jordan Vane", username: "@vane_sys", note: "Senior Dev node access.", role: "Developer" },
    { id: "r2", name: "Encrypted Node", username: "@null_ptr", note: "Security specialist.", role: "Security" },
  ]);

  const filteredTeam = useMemo(() => 
    activeTeam.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.username.toLowerCase().includes(searchQuery.toLowerCase())),
    [activeTeam, searchQuery]
  );

  const handleUpdateRole = useCallback((id: string, newRole: string) => {
    setActiveTeam(prev => prev.map(node => node.id === id ? { ...node, role: newRole } : node));
    setSelectedNode(null);
  }, []);

  const handleKick = useCallback((id: string) => {
    setActiveTeam(prev => prev.filter(node => node.id !== id));
    setSelectedNode(null);
  }, []);

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      
      {selectedNode && (
        <UserEditModal 
          node={selectedNode} 
          onClose={() => setSelectedNode(null)} 
          onSave={handleUpdateRole}
          onKick={handleKick}
        />
      )}

      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0 border-r border-zinc-100">
          <AppSideBar />
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12">
          {/* Node Injection Header */}
          <div className="bg-zinc-200">
            <div className="flex items-center h-10">
              <div className="flex-1 h-full relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-[11px]">@</span>
                <input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Add members by @username"
                  className="w-full h-full bg-transparent pl-8 pr-4 text-[11px] font-mono font-bold text-black outline-none"
                />
              </div>
              <button className="h-full px-4 bg-blue-500 text-white font-mono font-bold text-[10px] uppercase tracking-[0.1em] hover:bg-blue-600 transition-all cursor-pointer">
                Send Invite
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-zinc-300 bg-white shrink-0">
            <TabButton
              active={activeTab === "TEAM"}
              onClick={() => setActiveTab("TEAM")}
              label="Team_Nodes"
              count={activeTeam.length}
              icon={<Users size={12} />}
            />
            <TabButton
              active={activeTab === "REQUESTS"}
              onClick={() => setActiveTab("REQUESTS")}
              label="Inbound_Requests"
              count={requests.length}
              icon={<Inbox size={12} />}
              isOrange
            />
          </div>

          {/* Search */}
          <div className="bg-white sticky top-0 z-20">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-zinc-400" size={14} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={activeTab === "TEAM" ? "SEARCH FOR MEMBERS..." : "FILTER REQUESTS..."}
                className="w-full h-10 bg-zinc-50 border-b border-zinc-300 pl-10 pr-4 text-[11px] font-mono font-bold outline-none"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {activeTab === "TEAM" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredTeam.map((node) => (
                  <TeamMemberCard key={node.id} node={node} onEdit={() => setSelectedNode(node)} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2">
                {requests.map((node) => (
                  <RequestCard key={node.id} node={node} />
                ))}
                {requests.length === 0 && (
                  <div className="col-span-full p-12 text-center border border-dashed border-zinc-300 bg-zinc-50/30">
                    <span className="text-[10px] font-mono font-black text-zinc-300 uppercase tracking-[0.4em]">No_Pending_Uplinks</span>
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

// --- SUB-COMPONENTS ---
const TeamMemberCard = ({ node, onEdit }: any) => (
  <div onClick={onEdit} className="group border-r border-b border-zinc-300 bg-white hover:bg-zinc-200 transition-all cursor-pointer flex flex-col">
    <div className="p-1.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-bold text-white text-[10px] border border-zinc-900 shrink-0">
          {node.name.split(" ").map((n: any) => n[0]).join("")}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900 truncate">{node.name}</span>
          <span className="text-[10px] font-mono font-bold text-zinc-500 truncate">{node.username}</span>
        </div>
      </div>
      <div className="p-1.5 text-zinc-300 group-hover:text-zinc-600 transition-colors"><Fingerprint size={14} /></div>
    </div>
    <div className="flex border-t border-zinc-300 divide-x divide-zinc-300 bg-zinc-50">
      <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">Position</span>
        <span className="text-[10px] font-black uppercase text-blue-600 tracking-tighter truncate">{node.role}</span>
      </div>
      <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">Joined</span>
        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-700">
          <Clock size={10} className="text-zinc-400" /> {node.joinedDate}
        </div>
      </div>
    </div>
  </div>
);

const RequestCard = ({ node }: any) => (
  <div className="group border-r border-b border-zinc-300 bg-white hover:bg-zinc-200 transition-all flex flex-col overflow-hidden">
    <div className="p-1.5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-bold text-white text-[10px] border border-zinc-900">
          {node.name.split(" ").map((n: any) => n[0]).join("")}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-[11px] font-bold uppercase text-zinc-900 truncate">{node.name}</span>
          <span className="text-[10px] font-mono text-zinc-500 truncate">{node.username}</span>
        </div>
      </div>
      <div className="bg-zinc-100/50 p-1.5 border-l-2 border-blue-500 italic text-[10px] font-mono text-zinc-700 line-clamp-2">"{node.note}"</div>
    </div>
    <div className="flex border-t border-zinc-300 divide-x divide-zinc-300 bg-white h-10">
      <div className="flex-[1.5] px-2 flex flex-col justify-center bg-zinc-50">
        <span className="text-[9px] font-mono text-zinc-400 uppercase leading-none mb-1">Position</span>
        <span className="text-[9px] font-bold uppercase text-zinc-600 truncate">{node.role}</span>
      </div>
      <button className="flex-1 text-[9px] font-black uppercase text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">Accept</button>
      <button className="flex-1 text-[9px] font-black uppercase text-zinc-400 hover:bg-red-500 hover:text-white transition-all">Ignore</button>
    </div>
  </div>
);

const TabButton = ({ active, onClick, label, count, icon, isOrange }: any) => (
  <button
    onClick={onClick}
    className={cn(
      "flex-1 h-10 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer border-none",
      active ? (isOrange ? "text-blue-500 bg-zinc-50" : "text-zinc-900 bg-zinc-50") : "text-zinc-500 bg-white"
    )}
  >
    {icon} {label} ({count})
    {active && <div className={cn("absolute bottom-0 left-0 right-0 h-0.5", isOrange ? "bg-blue-600" : "bg-zinc-900")} />}
  </button>
);

export default TeamNodesManager;