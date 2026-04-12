import { Check, Clock, FileSearch, Search, Trash2, X } from "lucide-react";
import Navbar from "../../AppNavbar";
import AppSideBar from "../../Sidebar";
import { useState } from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const candidates = [
  {
    name: "Alex Rivera",
    email: "alex.riv@example.com",
    role: "Fullstack Engineer",
    experience: "5",
    match: 92,
    avatar: "https://github.com/shadcn.png"
  },
  {
    name: "Sarah Chen",
    email: "sarah.c@example.com",
    role: "Product Designer",
    experience: "3",
    match: 88,
    avatar: ""
  }
];

const Applicants = () => {
  const [searchQuery, setSearchQuery] = useState();



  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
        <aside className="w-25 shrink-0 ">
          <AppSideBar />
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12">
          {/* SHARED SEARCHBAR */}
          <div className="bg-white flex shrink-0">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-3 text-zinc-400"
                size={14}
              />
              <input
                value={searchQuery}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={"Search for Canidates..."}
                className="w-full h-10 border-b border-zinc-300 pl-9 pr-4 text-[11px] font-mono font-bold outline-none"
              />
            </div>
          </div>

          <Table className="border-collapse">
          <TableHeader className="bg-zinc-200/80">
            <TableRow className="hover:bg-transparent">
              <TableHead className=" border-r border-zinc-300 text-[11px] font-bold w-10">Profile</TableHead>
              <TableHead className="border-r border-zinc-300 font-bold text-zinc-900 text-[11px]">Candidate Info</TableHead>
              <TableHead className="border-r border-zinc-300 font-bold text-zinc-900 text-[11px]">Experience</TableHead>
              <TableHead className="border-r border-zinc-300 w-13 font-bold text-[11px] text-zinc-900">Match</TableHead>
              <TableHead className="border-r border-zinc-300  font-bold text-[11px] text-zinc-900">Details</TableHead>
              <TableHead className=" font-bold text-zinc-900 text-[11px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((person) => (
              <TableRow key={person.email} className="hover:bg-zinc-200/50 transition-colors ">
                {/* Profile Pic Box */}
                <TableCell className="border-r border-border p-0 ">
                  <Avatar className="h-10 w-10 mx-auto rounded-none">
                    <AvatarImage src={person.avatar} className="rounded-none"/>
                    <AvatarFallback className="bg-slate-200 text-xs rounded-none">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>

                {/* Name/Email Box */}
                <TableCell className="border-r border-border p-0 px-2">
                  <div className="font-semibold text-xs text-slate-900">{person.name}</div>
                  <div className="text-[10px] text-slate-500">{person.email}</div>
                </TableCell>

                {/* Role/Experience Box */}
                <TableCell className="border-r border-border p-0 px-2">
                  <div className=" text-xs font-medium">{person.role}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-tight">{person.experience} Years</div>
                </TableCell>

                {/* Match % Box */}
                <TableCell className="border-r border-border text-center p-0 bg-emerald-500/10 text-emerald-700 ">
                  <div className="inline-block   font-bold text-xs">
                    {person.match}%
                  </div>
                </TableCell>

                {/* Review Button Box */}
                <TableCell className="border-r border-border text-center p-0">
                  <Button className="gap-2 w-full text-xs bg-zinc-800 h-10 hover:bg-zinc-600 hover:text-white text-white rounded-none transition-colors">
                    Review
                  </Button>
                </TableCell>

                {/* Accept/Reject Box */}
                <TableCell className="p-0">
                  <div className="flex items-center justify-center">
                    <Button 
                      className="h-10 w-1/2 text-emerald-600 bg-transparent hover:bg-emerald-600 hover:text-white border-r rounded-none text-xs border-zinc-300 shadow-none transition-colors"
                    >
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-10 w-1/2   text-red-500 hover:bg-red-500 hover:text-white rounded-none text-xs border-none shadow-none transition-colors"
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </main>
      </div>
    </div>
  );
};

export default Applicants;
