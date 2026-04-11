import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import type { JobNode } from "@/types/admin/applications";
import { JobCard } from "./RoleCard";
import { Link } from "react-router-dom";

const ManageApplicants = () => {
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
          <div className="flex justify-between w-full border-b border-zinc-300 bg-zinc-100">
            <h1 className="text-xs font-bold uppercase p-2">Jobs</h1>
            <Link to={`/app/admin/jobs/create`} className="text-[11px] flex items-center bg-blue-500 hover:bg-blue-600 transition-colors px-3 text-white font-semibold cursor-pointer">
              Create a New Role
            </Link>
          </div>

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
                placeholder={"Filter Roles..."}
                className="w-full h-10 border-b border-zinc-300 pl-9 pr-4 text-[11px] font-mono font-bold outline-none"
              />
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="divide-x divide-y  divide-zinc-300 grid grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageApplicants;
