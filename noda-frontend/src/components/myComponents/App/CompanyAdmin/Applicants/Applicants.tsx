import { CalendarPlus, Search } from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const candidates = [
  {
    name: "Alex Rivera",
    email: "alex.riv@example.com",
    role: "Fullstack Engineer",
    experience: "5 years",
    match: 92,
    avatar: "https://github.com/shadcn.png",
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Product Designer",
    experience: "3 years",
    match: 88,
    avatar: "",
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Product Designer",
    experience: "3 years",
    match: 75,
    avatar: "",
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Product Designer",
    experience: "3 years",
    match: 12,
    avatar: "",
  },
];

const Applicants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Track which candidate is currently selected
  const [selectedCandidate, setSelectedCandidate] = useState(candidates[0]);

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0 ">
          <AppSideBar />
        </aside>

        <main className="flex ml-4 bg-white overflow-hidden w-full pt-12 border-t border-zinc-200">
          {/* LEFT COLUMN: SEARCH & LIST */}
          <div className="bg-white flex flex-col shrink-0 w-64 border-x border-zinc-300">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-zinc-400"
                size={14}
              />
              <input
                value={searchQuery}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Search for Candidates..."}
                className="w-full h-10 border-b border-zinc-300 pl-9 pr-4 text-[11px] font-mono font-bold outline-none focus:bg-zinc-50"
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredCandidates.map((candidate, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedCandidate(candidate)}
                  className={`flex items-center  border-b border-zinc-300 cursor-pointer transition-colors hover:bg-zinc-200 ${
                    selectedCandidate?.name === candidate.name
                      ? "bg-zinc-300"
                      : ""
                  }`}
                >
                  {/* Match Percentage Box */}
                  <div
                    className={`w-10 h-10 shrink-0  text-white flex items-center justify-center text-[10px] font-bold ${candidate.match < 50 ? "bg-red-600" : candidate.match < 80 ? "bg-orange-500" : "bg-emerald-600"}`}
                  >
                    {candidate.match}%
                  </div>

                  <div className="flex flex-col pl-1.5 overflow-hidden">
                    <div className="text-xs font-bold font-mono truncate">
                      {candidate.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate">
                      {candidate.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: DETAILS */}
          <div className="flex-1 overflow-y-auto border-r border-zinc-300">
            <div className="border-b border-zinc-300 flex justify-between items-center">
              <div className="text-xs font-bold p-2 ">
                Full-Stack Engineer Role
              </div>
              <button className="text-xs h-full px-2.5 py-2.5 bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer aspe">
                <CalendarPlus className="w-3.5 h-3.5" />
              </button>
            </div>

            {selectedCandidate ? (
              <>
                <div className="flex items-center ">
                  <Avatar className="h-12 w-12 border-b border-zinc-300 rounded-none">
                    <AvatarImage src={selectedCandidate.avatar} />
                    <AvatarFallback>
                      {selectedCandidate.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full justify-between items-center">
                    <div className="px-2 flex flex-col w-full">
                      <h2 className="text-sm font-bold font-mono">
                        {selectedCandidate.name}
                      </h2>
                      <p className="text-xs text-zinc-500">
                        {selectedCandidate.role}
                      </p>
                    </div>

                    <div className="h-full bg-emerald-600 p-2 flex items-center justify-center text-white font-bold aspect-square border-zinc-300">
                      {selectedCandidate.match}%
                    </div>
                  </div>

                  
                </div>

                <div className="border-t border-zinc-300 grid grid-cols-4">
                    <div className="flex flex-col group cursor-pointer  border-r border-zinc-300 p-1.5 transition-colors">
                      <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="3"><path stroke-linejoin="round" d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0"/><path stroke-linejoin="round" d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"/><path stroke-linecap="round" d="M4.5 31h39m-39-14h39"/></g></svg>
                        <span className="text-[9px] uppercase tracking-widest">
                          Website
                        </span>
                      </div>
                    </div>
                     <div className="flex flex-col group cursor-pointer  border-r border-zinc-300 p-1.5 transition-colors">
                      <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"/><path d="M9 20.027c-3 .973-5.5 0-7-3"/></g></svg>
                        <span className="text-[9px] uppercase tracking-widest">
                          GitHub
                        </span>
                      </div>
                    </div>
                  </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-zinc-200 rounded-md">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                      Experience
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedCandidate.experience}
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-md">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                      Match Score
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      {selectedCandidate.match}%
                    </p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200 rounded-md col-span-2">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">
                      Email
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedCandidate.email}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-400 text-sm italic">
                Select a candidate to view details
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Applicants;
