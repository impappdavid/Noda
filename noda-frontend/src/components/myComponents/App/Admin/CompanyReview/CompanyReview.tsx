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
  ShieldCheck,
  Flag,
  BadgeQuestionMark,
  Search,
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
import { DialogClose } from "@radix-ui/react-dialog";
import { FilterCombobox } from "./CompanyReviewFilter";

const CompanyVerification = () => {
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

   const [filter, setFilter] = useState("All");

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0">
          <AppSideBar />
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
          {/* INDUSTRIAL LIGHT HEADER */}
          <div className="px-2 h-8 border-b border-zinc-300 bg-zinc-200 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Flag size={14} className="text-black" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
                Company Review
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase font-black">
              Pending Requests: {reports.length}
            </span>
          </div>

          <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-300">
            <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
              <Search size={14} className="text-zinc-400 mr-2" />
              <input
                placeholder="SEARCH COMPANIES..."
                className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
              />
            </div>
            <div className="flex-1 h-full">
              <FilterCombobox
                label="STATUS"
                current={filter}
                options={["All", "Waiting", "Pending", "Approved"].map(
                  (s) => ({ label: s, value: s }),
                )}
                onSelect={setFilter}
              />
            </div>
            
          </div>

          {/* MINI-CARD GRID WITH BORDER DIVIDE */}
          <div className="flex-1 overflow-y-auto gap-px grid grid-cols-4  content-start border-b border-zinc-300 scrollbar-hide">
            {reports.map((report) => (
              <Dialog key={report.id}>
                <DialogTrigger asChild>
                  <div className="p-2 bg-white flex border-b border-zinc-300 [&:not(:nth-child(4n))]:border-r h-fit gap-2 items-center cursor-pointer hover:bg-zinc-200/80 transition-colors group">
                    <div className="border border-zinc-300 p-1">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
                        alt=""
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold">Google</div>
                      <div className="text-[10px] font-semibold">AI/ML</div>
                    </div>
                  </div>
                </DialogTrigger>

                {/* ENHANCED MODAL CONTENT */}
                <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
                  <DialogHeader className="bg-blue-500 p-1.5 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
                    <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
                      <BadgeQuestionMark
                        size={16}
                        className="text-white shrink-0"
                      />
                      Verify
                    </DialogTitle>
                    <DialogClose>
                      <button className="hover:bg-black/40 cursor-pointer p-1 transition-colors outline-none">
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </DialogClose>
                  </DialogHeader>

                  <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">
                    {/* SECTION 1: TARGET DATA */}
                    <div className="">
                      <div className="  ">
                        {report.type === "JOB" ? (
                          <>
                            <div className="flex border-b border-zinc-300  divide-x divide-zinc-300">
                              <div className="p-1 ">
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJg75LWB1zIJt1VTZO7O68yKciaDSkk3KMdw&s"
                                  alt=""
                                  className="w-10 h-10"
                                />
                              </div>
                              <div className="w-full flex justify-between pr-1 ">
                                <span className="text-[10px] font-bold flex flex-col gap-1 font-mono p-2  text-zinc-800 leading-none">
                                  <div className="font-normal text-zinc-500">
                                    Company Name
                                  </div>

                                  <div className="text-sm">Google</div>
                                </span>

                                <div className="p-1 px-3 text-[10px] bg-orange-500 h-fit text-white font-semibold">
                                  Waiting
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 p-2">
                              <div className="w-5 h-5 bg-zinc-900 flex items-center justify-center text-white text-[8px] font-black uppercase tracking-tighter">
                                {report.target.author.charAt(1)}
                              </div>
                              <span className="text-[10px] font-black uppercase ">
                                {report.target.author}
                              </span>
                            </div>
                            <p className="text-[11px] font-mono pl-9 text-zinc-900 leading-relaxed uppercase bg-white pb-2 border border-zinc-100">
                              {report.target.content}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* SECTION 2: MODERATION INTEL */}
                    <div className="grid grid-cols-2 divide-x  divide-zinc-300">
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Domain
                        </span>
                        <div className="text-[11px] font-mono font-bold bg-zinc-100 flex items-center gap-1.5 hover:underline cursor-pointer">
                          www.google.com
                        </div>
                      </div>
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Email
                        </span>
                        <div className="text-[11px] font-mono font-bold text-black cursor-pointer hover:underline ">
                          info@google.com
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: */}
                    <div className="grid grid-cols-2 divide-x border-t border-zinc-300 divide-zinc-300">
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Type
                        </span>
                        <div className="text-[11px] font-mono font-bold bg-zinc-100 text-blue-600 flex items-center gap-1.5 ">
                          AI/ML
                        </div>
                      </div>
                      <div className=" px-2 pb-1">
                        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wide">
                          Submitted
                        </span>
                        <div className="text-[11px] flex items-center gap-1 font-mono font-bold text-black cursor-pointer hover:underline ">
                          <User className="w-3 h-3" />
                          <span className="hover:underline cursor-pointer">
                            @alexriver
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="grid grid-cols-2  ">
                      <button className="h-9 border-t border-zinc-300 bg-white hover:bg-zinc-200 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2">
                        Reject
                      </button>
                      <button className="h-9 bg-blue-500 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        Email Sent
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

export default CompanyVerification;
