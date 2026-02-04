import { useState } from 'react';
import { SlidersHorizontal, Check, ChevronsUpDown } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import JobInfo from './JobInfos';
import JobList from './JobList';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const jobData = [
    { id: 43, workMode:"Remote", company: "Taco Bell", role: "Oven installation", location: "Kansas City", experience: "1-3 year", status: "Live", match: 96, salary: "$25/hr", description: "Looking for a precision-focused specialist to handle industrial oven calibration and thermal deployment." },
    { id: 44, workMode:"Hybrid", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 45, workMode:"Remote", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
];

const AppJobs = () => {
    const [selectedJob, setSelectedJob] = useState(jobData[0]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-4xl border-x border-zinc-300 h-full overflow-hidden bg-white pt-13">

                    {/* 1. COMBOBOX FILTER BAR: Using flex w-full to fill space */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300">
                            <div className="flex-1">
                                <FilterCombobox label="Source" options={[
                                    { label: "All", value: "all" },
                                    { label: "Direct", value: "direct" },
                                    { label: "Vector", value: "vector" },
                                    { label: "External", value: "external" }
                                ]} />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox label="Experience" options={[
                                    { label: "All", value: "all" },
                                    { label: "0 Year", value: "0" },
                                    { label: "1-3 Years", value: "1-3" },
                                    { label: "3-5 Years", value: "3-5" },
                                    { label: "5+ Years", value: "5+" }
                                ]} />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox label="Remote" options={[
                                    { label: "All", value: "all" },
                                    { label: "Remote", value: "yes" },
                                    { label: "On-site", value: "no" },
                                    { label: "Hybrid", value: "hybrid" }
                                ]} />
                            </div>
                            
                            {/* All Filters Button: Fixed width at the end */}
                            <button className="flex items-center justify-center gap-1.5 px-4 h-10 bg-zinc-50 hover:bg-zinc-100 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-all shrink-0">
                                <SlidersHorizontal size={12} />
                                <span className="hidden sm:inline">All Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. DUAL PANE CONTENT */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/2 h-full overflow-y-auto border-r border-zinc-300 scrollbar-hide">
                            <JobList
                                jobs={jobData}
                                selectedJob={selectedJob}
                                onSelect={setSelectedJob}
                            />
                            <div className="h-20" />
                        </div>

                        <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden">
                            <JobInfo job={selectedJob} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// 3. REUSABLE MINIMALIST COMBOBOX
function FilterCombobox({ label, options }: { label: string, options: { label: string, value: string }[] }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    // h-10 to match height of the bar, rounded-none to avoid gaps
                    className="h-10 w-full rounded-none gap-1 text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between"
                >
                    <span className="truncate">
                        {value ? options.find((opt) => opt.value === value)?.label : label}
                    </span>
                    <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            {/* PopoverContent width matches trigger for a clean look */}
            <PopoverContent className="p-0 z-[100] w-[212px] rounded-none border-zinc-300" align="start">
                <Command className="font-mono">
                    <CommandGroup>
                        {options.map((opt) => (
                            <CommandItem
                                key={opt.value}
                                value={opt.value}
                                className="text-xs uppercase cursor-pointer py-1.5 "
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        " h-3 w-3",
                                        value === opt.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default AppJobs;