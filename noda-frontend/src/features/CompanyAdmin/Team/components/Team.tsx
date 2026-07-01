import { useState, useMemo } from "react";
import {
  Search,
  Users,
  Inbox,
  Clock,
  Shield,
  Mail,
  BarChart3,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

const TeamManager = () => {
  const [activeTab, setActiveTab] = useState<ManagerTab>("TEAM");
  const [usernameInput, setUsernameInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<TeamNode | null>(null);

  const [activeTeam, setActiveTeam] = useState<TeamNode[]>([
    {
      id: "u1",
      name: "Sam Altman",
      username: "@sam",
      role: "CEO",
      joinedDate: "01_JAN_2026",
      email: "sam@openai.com",
      followers: 2400500,
    },
    {
      id: "u2",
      name: "Mira Murati",
      username: "@mira",
      role: "RECRUITER",
      joinedDate: "12_JAN_2026",
      email: "mira@noda.network",
      followers: 850200,
    },
    {
      id: "u3",
      name: "Alex Rivers",
      username: "@arivers",
      role: "MARKETING",
      joinedDate: "05_FEB_2026",
      email: "rivers.alex@protocol.sh",
      followers: 12400,
    },
  ]);

  const requests: RequestNode[] = [
    {
      id: "r1",
      name: "Jordan Vane",
      username: "@vane_sys",
      note: "Senior Dev node access.",
    },
    {
      id: "r2",
      name: "Encrypted Node",
      username: "@null_ptr",
      note: "Security specialist.",
    },
  ];

  const filteredTeam = useMemo(
    () =>
      activeTeam.filter(
        (n) =>
          n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.username.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [activeTeam, searchQuery],
  );

  const handleUpdateRole = (newRole: string) => {
    if (!selectedNode) return;
    setActiveTeam((prev) =>
      prev.map((n) => (n.id === selectedNode.id ? { ...n, role: newRole } : n)),
    );
    setSelectedNode(null);
  };

  const handleKick = (id: string) => {
    setActiveTeam((prev) => prev.filter((n) => n.id !== id));
    setSelectedNode(null);
  };

  return (
    <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">

      {/* SHADCN DIALOG: REDESIGNED WITH COMPACT PADDING */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none gap-0 rounded-none bg-white">
          <div className="flex flex-col md:flex-row h-full">
            {/* Sidebar Data Strip */}
            <div className="w-full md:w-56 bg-zinc-800 text-white p-2 flex flex-col border-r border-zinc-800">
              <div className="w-14 h-14 bg-blue-500 flex items-center justify-center font-bold text-xl mb-2 ">
                {selectedNode?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <p className="text-md font-bold leading-tight truncate">
                {selectedNode?.name}
              </p>
              <p className="text-xs font-mono text-zinc-500 mb-2">
                {selectedNode?.username}
              </p>

              <div className="space-y-2 mt-auto border-t border-zinc-700 pt-4">
                <div className="flex justify-between text-[9px] font-mono uppercase text-zinc-300">
                  <span>ID</span>{" "}
                  <span className="text-zinc-200">
                    #{selectedNode?.id.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => handleKick(selectedNode!.id)}
                  className="w-full py-2 bg-red-500/10 hover:bg-red-500/30 text-red-500 hover:text-red-400 cursor-pointer border border-red-500/20 text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2"
                >
                  Kick From Team
                </button>
              </div>
            </div>

            {/* Main Config Area */}
            <div className="flex-1 p-2">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 leading-none">
                    Profile Infos
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-zinc-400 hover:text-zinc-700 p-1 hover:bg-zinc-200 cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="p-2 border border-zinc-300 bg-zinc-200">
                  <span className="flex items-center gap-1 text-[8px] font-black text-zinc-500 uppercase mb-1">
                    <Mail size={10} /> Email
                  </span>
                  <p className="text-[11px] font-mono font-bold text-zinc-800 truncate">
                    {selectedNode?.email}
                  </p>
                </div>
                <div className="p-2 border border-zinc-300 bg-zinc-200">
                  <span className="flex items-center gap-1 text-[8px] font-black text-zinc-500 uppercase mb-1">
                    <BarChart3 size={10} /> Followers
                  </span>
                  <p className="text-[11px] font-mono font-bold text-zinc-800">
                    {selectedNode?.followers.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="text-[9px] font-black text-zinc-500 uppercase mb-1.5 block">
                    Position / Role
                  </label>
                  <Select>
                    <SelectTrigger className="w-full bg-zinc-200 border-zinc-300 rounded-none cursor-pointer">
                      <SelectValue placeholder="CEO" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="rounded-none border p-0 border-zinc-300">
                      <SelectGroup className="divide-y divide-zinc-300 p-0">
                        <SelectItem value="ceo" className="px-0 text-xs cursor-pointer">CEO</SelectItem>
                        <SelectItem value="recruiter" className="px-0 text-xs cursor-pointer">Recruiter</SelectItem>
                        <SelectItem value="hr" className="px-0 text-xs cursor-pointer">HR</SelectItem>
                        <SelectItem value="employee" className="px-0 text-xs cursor-pointer">Employee</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <button
                  onClick={() => handleUpdateRole(selectedNode!.role)}
                  className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer border border-blue-500 text-[10px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
        

        <main className="flex flex-1 border-x border-zinc-300  bg-white overflow-hidden flex-col ">
          {/* Node Injection Header */}
          <div className="bg-zinc-200 ">
            <div className="flex items-center bg-zinc-200 h-10">
              <div className="flex-1 h-full relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-zinc-500 text-[11px]">
                  @
                </span>
                <input
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Add members by @username"
                  className="w-full h-full bg-transparent pl-8 pr-4 text-[11px] font-mono font-bold text-black outline-none placeholder:text-zinc-500 transition-all"
                />
              </div>
              <button className="h-full px-4 bg-blue-500 text-white font-mono font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 active:bg-blue-500 transition-all cursor-pointer">
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
              <Search
                className="absolute left-3 top-3 text-zinc-400"
                size={14}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeTab === "TEAM"
                    ? "SEARCH FOR MEMBERS..."
                    : "FILTER REQUESTS..."
                }
                className="w-full h-10 bg-zinc-50 border-b border-zinc-300 pl-10 pr-4 text-[11px] font-mono font-bold outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {activeTab === "TEAM" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredTeam.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className="group border-r border-b border-zinc-300 bg-white hover:bg-zinc-200 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="p-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-bold text-white text-[10px] border border-zinc-900 shrink-0">
                          {node.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-black uppercase tracking-tight text-zinc-900 truncate">
                            {node.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500 truncate">
                            {node.username}
                          </span>
                        </div>
                      </div>
                      <Shield
                        size={14}
                        className="text-zinc-300 group-hover:text-zinc-500 transition-colors mr-1"
                      />
                    </div>

                    <div className="flex border-t border-zinc-300 divide-x divide-zinc-300 bg-zinc-50">
                      <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">
                          Position
                        </span>
                        <span className="text-[10px] font-black uppercase text-blue-600 tracking-tighter">
                          {node.role}
                        </span>
                      </div>
                      <div className="flex-1 px-2 py-1.5 flex flex-col justify-center">
                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase leading-none mb-0.5">
                          Joined at
                        </span>
                        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-zinc-700 uppercase">
                          <Clock size={10} className="text-zinc-400" />{" "}
                          {node.joinedDate || "14_FEB_2026"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2">
                {requests.map((node) => (
                  <div
                    key={node.id}
                    className="group border-r border-b border-zinc-300 bg-white hover:bg-zinc-200 transition-all flex flex-col overflow-hidden"
                  >
                    <div className="p-1.5 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center font-bold text-white text-[10px] border border-zinc-900 shrink-0">
                          {node.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 truncate">
                            {node.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500 truncate">
                            {node.username}
                          </span>
                        </div>
                      </div>
                      <div className="bg-zinc-100/50 p-1.5 border-l-2 border-blue-500 italic text-[10px] font-mono text-zinc-700 line-clamp-2">
                        "{node.note}"
                      </div>
                    </div>
                    <div className="flex border-t border-zinc-300 divide-x divide-zinc-300 bg-white h-10">
                      <div className="flex-[1.5] px-2 flex flex-col justify-center bg-zinc-50">
                        <span className="text-[9px] font-mono font-black text-zinc-400 uppercase leading-none mb-1">
                          Status
                        </span>
                        <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-tighter truncate">
                          PENDING_APPROVAL
                        </span>
                      </div>
                      <button className="flex-1 text-[9px] font-black uppercase text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all">
                        Accept
                      </button>
                      <button className="flex-1 text-[9px] font-black uppercase text-zinc-400 hover:bg-red-500 hover:text-white transition-all">
                        Ignore
                      </button>
                    </div>
                  </div>
                ))}
                {requests.length === 0 && (
                  <div className="col-span-full p-12 text-center border border-dashed border-zinc-300 bg-zinc-50/30">
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
  <button
    onClick={onClick}
    className={cn(
      "flex-1 h-10 flex items-center justify-center gap-2 text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all relative cursor-pointer border-none",
      active
        ? isOrange
          ? "text-blue-500 bg-zinc-50"
          : "text-zinc-900 bg-zinc-50"
        : "text-zinc-500 hover:text-zinc-600 bg-white",
    )}
  >
    {icon} {label} ({count})
    {active && (
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          isOrange ? "bg-blue-600" : "bg-zinc-900",
        )}
      />
    )}
  </button>
);

export default TeamManager;
