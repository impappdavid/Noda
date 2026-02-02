import { useState } from 'react';
import { Plus, Search, Check, ChevronsUpDown } from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const trackerData = [
    { id: 43, company: "Taco Bell", role: "Oven installation", status: "Interviewing", applied: "2d ago", match: 96, interviewDate: null },
    { id: 44, company: "Vercel", role: "Frontend Deployment", status: "Applied", applied: "5d ago", match: 92, interviewDate: null },
    { id: 45, company: "OpenAI", role: "GPU Cluster Setup", status: "Interviewing", applied: "1w ago", match: 88, interviewDate: "Feb 12, 14:00" },
    { id: 46, company: "Linear", role: "Systems Designer", status: "Rejected", applied: "1w ago", match: 94, interviewDate: null },
];

const AppTracker = () => {
    const [filter, setFilter] = useState("All");

    const filteredData = trackerData.filter(item =>
        filter === "All" ? true : item.status === filter
    );

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    {/* 1. GAPLESS FILTER & STATUS HUB */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-200 h-full">
                            {/* Search Node */}
                            <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
                                <Search size={14} className="text-zinc-400 mr-2" />
                                <input 
                                    placeholder="SEARCH NODES..." 
                                    className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
                                />
                            </div>
                            
                            {/* Status Filter */}
                            <div className="flex-1 h-full">
                                <FilterCombobox 
                                    label="STATUS" 
                                    current={filter}
                                    options={["All", "Applied", "Interviewing", "Rejected"].map(s => ({ label: s, value: s }))} 
                                    onSelect={setFilter}
                                />
                            </div>

                            {/* Showing Intelligence Section */}
                            <div className="w-24 h-full flex items-center justify-center bg-zinc-50 border-r border-zinc-200">
                                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">
                                    {filteredData.length}/{trackerData.length} NODES
                                </span>
                            </div>

                            {/* Separate Add Action */}
                            <button className="px-4 h-full bg-white hover:bg-zinc-50 transition-all active:scale-95 group">
                                <Plus size={16} className="text-zinc-400 group-hover:text-zinc-900" />
                            </button>
                        </div>
                    </div>

                    {/* 2. SCHEMATIC GRID */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide bg-white border-b border-zinc-300">
                        <div className="grid grid-cols-2">
                            {filteredData.map((item, index) => {
                                const isUnscheduled = item.status === "Interviewing" && !item.interviewDate;
                                const borderClasses = `border-b border-zinc-300 ${index % 2 === 0 ? 'border-r' : ''}`;

                                return (
                                    <div 
                                        key={item.id} 
                                        className={cn(
                                            "p-3 flex flex-col justify-center min-h-[72px] transition-colors cursor-pointer group relative",
                                            borderClasses,
                                            // 3. COLOR-CODED INTERVIEW SELECTION
                                            isUnscheduled ? "bg-zinc-200 hover:bg-zinc-200/80" : "bg-white hover:bg-zinc-200/60"
                                        )}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col min-w-0">
                                                <span className={cn(
                                                    "text-[8px] font-mono font-black uppercase tracking-widest",
                                                    isUnscheduled ? "text-amber-600" : "text-zinc-400"
                                                )}>
                                                    {isUnscheduled ? "INTELLIGENCE REQUIRED" : `APPLIED ${item.applied}`}
                                                    <span className="mx-1 opacity-30">•</span> {item.match}%
                                                </span>
                                                <h3 className="text-[10px] font-black text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5">
                                                    {item.role}
                                                </h3>
                                                <p className="text-[9px] text-zinc-500 font-medium truncate uppercase mt-0.5">{item.company}</p>
                                            </div>

                                            <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                                                {/* Date or Action Label */}
                                                {item.interviewDate ? (
                                                    <span className="text-[8px] font-mono font-black text-blue-600 bg-blue-100 px-1 border border-blue-200 uppercase py-0.5">
                                                        {item.interviewDate}
                                                    </span>
                                                ) : isUnscheduled ? (
                                                    <div className="text-[8px] font-mono font-black text-amber-600 animate-pulse uppercase">
                                                        Pick Date
                                                    </div>
                                                ) : null}
                                                
                                                <div className="flex items-center gap-1.5">
                                                    <div className={cn("w-1 h-1 rounded-full", 
                                                        item.status === 'Offer' ? 'bg-emerald-500' :
                                                        item.status === 'Interviewing' ? 'bg-blue-500' :
                                                        item.status === 'Applied' ? 'bg-orange-500' : 'bg-red-500'
                                                    )} />
                                                    <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-400">
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// COMBOBOX FILTER
function FilterCombobox({ label, options, current, onSelect }: any) {
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-full w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0">
                    <span className="truncate text-zinc-400">{current !== "All" ? current : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[190px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono">
                    <CommandGroup>
                        {options.map((opt: any) => (
                            <CommandItem key={opt.value} value={opt.value} className="text-[10px] font-bold uppercase py-2 cursor-pointer" onSelect={(v) => { onSelect(v); setOpen(false); }}>
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default AppTracker;