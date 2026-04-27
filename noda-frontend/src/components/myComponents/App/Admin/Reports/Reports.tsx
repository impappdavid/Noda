import { useState } from "react";
import {
  FileText,
  Briefcase,
  ChevronRight,
  Activity,
  User,
  ShieldAlert,
  Clock,
  Info,
  Terminal,
  AlertTriangle,
  ExternalLink,
  EyeOff,
  Trash2,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";

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
        desc: "WE REQUIRE IMMEDIATE ACCESS TO YOUR COLD STORAGE TO VERIFY YOUR CRYPTO KNOWLEDGE. CLICK THE LINK TO SYNC WALLET.",
      },
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
        content:
          "JUNIOR DEVELOPERS ARE THE WEAKEST LINK IN THE CHAIN. THEY SHOULD NOT BE ALLOWED TO PUSH TO PROD WITHOUT PAYING A FEE.",
        likes: 12,
        comments: 45,
      },
    },
    {
      id: "905",
      type: "JOB",
      reason: "SPAM",
      reporter: "@bot_hunter",
      date: "2026.02.13",
      severity: "LOW",
      target: {
        title: "EASY $5000/DAY",
        company: "WEB3_DREAMS",
        desc: "Click link now to start earning without work.",
      },
    },
    {
      id: "906",
      type: "POST",
      reason: "NSFW_CONTENT",
      reporter: "@mod_prime",
      date: "2026.02.13",
      severity: "HIGH",
      target: {
        author: "@user_99",
        content: "Invalid media detected in the main thread gallery.",
      },
    },
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
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                Safety_Log
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono font-black bg-zinc-800 text-white px-1.5 py-0.5">
                TOTAL:{reports.length}
              </span>
            </div>
          </div>

          {/* MINI-CARD GRID WITH BORDER DIVIDE */}
          <div className="flex-1 overflow-y-auto  gap-px grid grid-cols-3 divide-x divide-y divide-zinc-300 content-start border-b border-zinc-300 scrollbar-hide">
            {reports.map((report) => (
              <Dialog key={report.id}>
                <DialogTrigger asChild>
                  <div className="p-2 bg-white flex flex-col h-fit cursor-pointer hover:bg-zinc-200/80 transition-colors group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase">
                        <span className="text-zinc-900 bg-zinc-100 px-1 border border-zinc-200 shadow-sm">
                          #{report.id}
                        </span>
                        <span
                          className={
                            report.severity === "HIGH"
                              ? "text-red-500"
                              : "text-zinc-400"
                          }
                        >
                          {report.severity}
                        </span>
                      </div>
                      <div className="text-zinc-500 group-hover:text-zinc-900 text-[9px] uppercase transition-colors">
                        {report.type === "JOB" ? "Job" : "Post"}
                      </div>
                    </div>

                    <h3 className="text-[10px] font-black uppercase tracking-tight text-zinc-900 transition-transform truncate mb-2">
                      {report.reason.replace("_", " ")}
                    </h3>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-[8px] font-mono font-bold text-zinc-400 uppercase">
                        <User size={8} /> {report.reporter}
                      </div>
                      <ChevronRight
                        size={12}
                        className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </div>
                </DialogTrigger>

                {/* ENHANCED MODAL CONTENT */}
                <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
                  <DialogHeader className="bg-zinc-800 p-1.5 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
                    <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
                      <AlertTriangle
                        size={16}
                        className="text-white shrink-0"
                      />
                      Report
                    </DialogTitle>
                    <button
                      className="hover:bg-black/40 cursor-pointer p-1 transition-colors outline-none"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </DialogHeader>

                  <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                    {/* SECTION 1: TARGET DATA */}
                    <div className="">
                      <div className="flex items-center justify-between p-2  pb-1 cursor-pointer hover:bg-zinc-200 transition-colors">
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                          {report.type} ID: {report.id}
                        </span>
                        <ExternalLink size={12} className="text-zinc-500" />
                      </div>

                      <div className="bg-zinc-50 border border-zinc-300 ">
                        {report.type === "JOB" ? (
                          <>
                            <div className="grid grid-cols-2 border-b border-zinc-300  divide-x divide-zinc-300">
                              <span className="text-[10px] font-bold p-2 flex flex-col gap-1 uppercase tracking-tighter text-zinc-900 leading-none">
                                <div className="font-normal text-zinc-500">Title</div>
                                {report.target.title}
                              </span>
                              <span className="text-[10px] font-bold flex flex-col gap-1 font-mono p-2  text-zinc-800 leading-none">
                                <div className="font-normal text-zinc-500">Company</div>
                                {report.target.company}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold flex flex-col gap-1 font-mono p-2  text-zinc-800 leading-none">
                                <div className="font-normal text-zinc-500">Description</div>
                                {report.target.desc}
                                
                              </span>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-zinc-900 flex items-center justify-center text-white text-[8px] font-black uppercase tracking-tighter">
                                {report.target.author.charAt(1)}
                              </div>
                              <span className="text-[10px] font-black uppercase">
                                {report.target.author}
                              </span>
                            </div>
                            <p className="text-[10px] font-mono text-zinc-700 leading-relaxed uppercase bg-white p-2 border border-zinc-100 italic">
                              "{report.target.content}"
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* SECTION 2: MODERATION INTEL */}
                    <div className="grid grid-cols-2 divide-x divide-zinc-300">
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Reporter
                        </span>
                        <div className="text-[10px] font-mono font-bold bg-zinc-100 flex items-center gap-1.5">
                          <User size={10} /> {report.reporter}
                        </div>
                      </div>
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-black text-zinc-400 uppercase tracking-wide">
                          Violation
                        </span>
                        <div className="text-[10px] font-mono font-bold text-red-600 bg-red-50 border border-red-100">
                          {report.reason}
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-2  ">
                      <button className="h-9 border-t border-zinc-300 bg-white hover:bg-zinc-200 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2">
                         Reject
                      </button>
                      <button className="h-9 bg-red-600 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center gap-2 border-t border-red-600">
                        Terminate {report.type}
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
