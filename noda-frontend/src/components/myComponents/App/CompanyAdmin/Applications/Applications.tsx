import { useState, useMemo } from "react";
import { Search, ArrowLeft, Filter } from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import { JobCard, ApplicantCard } from "./ApplicantComponents";
import type { ApplicantNode, JobNode } from "@/types/admin/applications";

const ManageApplicants = () => {
  const [view, setView] = useState<"LIST" | "DRILLDOWN">("LIST");
  const [selectedJob, setSelectedJob] = useState<JobNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeJobs: JobNode[] = [
    {
      id: "NODE_J1",
      role: "Full-Stack Developer",
      applicants: 124,
      new: 12,
      deadline: "4 days",
    },
    {
      id: "NODE_J2",
      role: "UI Designer",
      applicants: 89,
      new: 3,
      deadline: "11 days",
    },
    {
      id: "NODE_J3",
      role: "Project Manager",
      applicants: 500,
      new: 3,
      deadline: "11 days",
    },
  ];

  const applicants: ApplicantNode[] = [
    {
      id: "a1",
      name: "Marcus Vane",
      match: "98%",
      status: "Pending",
      applied: "2h ago",
      deadline: "13d 22h",
    },
    {
      id: "a2",
      name: "Elena Kovic",
      match: "91%",
      status: "Reviewed",
      applied: "5h ago",
      deadline: "13d 19h",
    },
    {
      id: "a3",
      name: "Cipher Node",
      match: "84%",
      status: "Pending",
      applied: "1d ago",
      deadline: "12d 04h",
    },
  ];

  // Performance: Filter once and memoize
  const filteredJobs = useMemo(
    () =>
      activeJobs.filter((j) =>
        j.role.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0 ">
          <AppSideBar />
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12">
          {/* DYNAMIC HEADER */}
          {view === "DRILLDOWN" && selectedJob ? (
            <div className="h-14 bg-zinc-800 text-white flex items-center justify-between px-4 shrink-0 animate-in fade-in slide-in-from-top-1 duration-300">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setView("LIST")}
                  className="h-8 w-8 border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="h-6 w-[1px] bg-zinc-700" />
                <div className="flex flex-col justify-center">
                  <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] leading-none">
                    {selectedJob.role}
                  </h2>
                  <span className="text-[8px] font-mono text-zinc-300 uppercase mt-1">
                    ID: {selectedJob.id}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-mono font-black text-orange-500 uppercase leading-none">
                    Response_Protocol
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase mt-1">
                    Max_Window: 14D
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-zinc-700" />
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-mono font-black text-zinc-400 uppercase leading-none">
                    Applies
                  </span>
                  <span className="text-xs font-black font-mono">
                    {selectedJob.applicants}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-full border-b border-zinc-300 bg-zinc-100">
              <h1 className="text-xs font-bold uppercase p-2">
                Jobs
              </h1>
              <button className="text-[11px] bg-blue-500 hover:bg-blue-600 transition-colors px-3 text-white font-semibold cursor-pointer">Create a New Role</button>
            </div>
          )}

          {/* SHARED SEARCHBAR */}
          <div className="bg-white flex shrink-0">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-3 text-zinc-400"
                size={14}
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  view === "LIST" ? "Filter Roles..." : "SEARCH_APPLICANTS..."
                }
                className="w-full h-10 border-b border-zinc-300 pl-10 pr-4 text-[11px] font-mono font-bold outline-none"
              />
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {view === "LIST" ? (
              <div className="divide-x divide-y  divide-zinc-300 grid grid-cols-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onSelect={(j) => {
                      setSelectedJob(j);
                      setView("DRILLDOWN");
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="divide-y divide-zinc-200">
                {applicants.map((app) => (
                  <ApplicantCard key={app.id} app={app} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageApplicants;
