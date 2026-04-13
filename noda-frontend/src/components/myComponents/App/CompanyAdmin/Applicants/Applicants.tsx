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

        <main className="flex  ml-4 bg-white overflow-hidden w-full pt-12">
          {/* SHARED SEARCHBAR */}
          <div className="bg-white flex shrink-0 w-56 border-x border-zinc-300">
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

          <div className="w-full border-r border-zinc-300 h-full"></div>

          
        </main>
      </div>
    </div>
  );
};

export default Applicants;
