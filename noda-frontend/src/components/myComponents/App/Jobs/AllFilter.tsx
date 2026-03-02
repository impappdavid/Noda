import { useState, KeyboardEvent } from 'react';
import { SlidersHorizontal,  Check, Target, ChevronRight } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const JOB_TYPES = ["Full-time", "Freelance", "Contract", "Internship", "Part-time"];
const RESPOND_TIMES = ["< 24 Hours", "< 3 Days", "< 1 Week", "Any"];

const AllFiltersDialog = () => {
    const [sortBy, setSortBy] = useState("relevance");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [respondTime, setRespondTime] = useState("Any");
    const [salary, setSalary] = useState({ min: "", max: "" });
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState<string[]>(["React", "TypeScript", "Node.js"]);

    const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput("");
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-1.5 px-4 h-10 bg-zinc-50 hover:bg-zinc-100 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-all shrink-0  cursor-pointer">
                    <SlidersHorizontal size={12} />
                    <span className="hidden sm:inline uppercase tracking-tighter">All Filters</span>
                </button>
            </DialogTrigger>
            
            <DialogContent className="max-w-xl bg-white border-none rounded-none p-0 gap-0 shadow-2xl overflow-hidden font-sans">
                <DialogHeader className="p-4 bg-zinc-800 flex flex-row items-center justify-between space-y-0 text-left">
                    <div className="flex items-center gap-2 text-white">
                        <Target size={14} />
                        <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-[0.2em]">
                            Linear_Search_Override
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {/* SINGLE COLUMN GRID (STACKED) */}
                <div className="p-4 grid grid-cols-1 gap-y-5 max-h-[75vh] overflow-y-auto scrollbar-hide">
                    
                    {/* 01. SORTING PROTOCOL */}
                    <section className="space-y-0 w-full">
                        <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 pb-2">
                             01 // Sort By
                        </h4>
                        <div className="flex bg-zinc-100 p-0.5 border border-zinc-200 w-full">
                            {["recent", "relevance"].map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setSortBy(mode)}
                                    className={cn(
                                        "flex-1 py-2 text-[9px] font-black uppercase transition-all cursor-pointer",
                                        sortBy === mode ? "bg-orange-500 text-white shadow-sm border border-zinc-300" : "text-zinc-500 hover:text-zinc-700"
                                    )}
                                >
                                    {mode === "relevance" ? "Most Relevant" : "Most Recent"}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 02. RESPOND TIME */}
                    <section className="space-y-0">
                        <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 pb-2">
                             02 // AVG response
                        </h4>
                        <div className="grid grid-cols-4 gap-1 w-full">
                            {RESPOND_TIMES.map(time => (
                                <button 
                                    key={time}
                                    onClick={() => setRespondTime(time)}
                                    className={cn(
                                        "px-2 py-2 border text-[9px] font-bold uppercase transition-all cursor-pointer",
                                        respondTime === time ? "bg-orange-500 text-white border-orange-500" : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
                                    )}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 03. JOB TYPE */}
                    <section className="space-y-0 ">
                        <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 pb-2">
                            03 // Contract_Type_Registry
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                            {JOB_TYPES.map(type => (
                                <div 
                                    key={type} 
                                    onClick={() => setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <div className={cn(
                                        "w-4 h-4 border flex items-center justify-center transition-all",
                                        selectedTypes.includes(type) ? "bg-orange-500 border-orange-600 shadow-[0_0_8px_rgba(249,115,22,0.3)]" : "border-zinc-300 group-hover:border-zinc-500"
                                    )}>
                                        {selectedTypes.includes(type) && <Check size={11} className="text-white" strokeWidth={4} />}
                                    </div>
                                    <span className={cn("text-[10px] uppercase font-bold tracking-tight", selectedTypes.includes(type) ? "text-zinc-900" : "text-zinc-500")}>
                                        {type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 04. SALARY */}
                    <section className="space-y-0 ">
                        <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-100 pb-2">
                             04 // Annual_Salary_Limit
                        </h4>
                        <div className="flex items-center gap-4 w-full">
                            <div className="relative flex-1">
                                <span className="absolute left-2 top-1 text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">Minimum_k</span>
                                <input 
                                    type="number"
                                    value={salary.min}
                                    onChange={(e) => setSalary({...salary, min: e.target.value})}
                                    className="w-full pl-2 pr-6 pt-4 pb-1 border border-zinc-300 text-[12px] font-mono font-bold outline-none focus:border-orange-500 bg-zinc-50/50" 
                                    placeholder="0"
                                />
                                <span className="absolute right-2 bottom-1.5 text-[11px] font-mono font-black text-zinc-900">k</span>
                            </div>
                            <ChevronRight size={14} className="text-zinc-600 shrink-0" />
                            <div className="relative flex-1">
                                <span className="absolute left-2 top-1 text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">Maximum_k</span>
                                <input 
                                    type="number"
                                    value={salary.max}
                                    onChange={(e) => setSalary({...salary, max: e.target.value})}
                                    className="w-full pl-2 pr-6 pt-4 pb-1 border border-zinc-300 text-[12px] font-mono font-bold outline-none focus:border-orange-500 bg-zinc-50/50" 
                                    placeholder="250"
                                />
                                <span className="absolute right-2 bottom-1.5 text-[11px] font-mono font-black text-zinc-900">k</span>
                            </div>
                        </div>
                    </section>

                    {/* 05. SKILL REGISTRY */}
                    <section className="space-y-0 ">
                        <h4 className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-100 pb-2 flex items-center gap-2">
                             05 // Skills
                        </h4>
                        
                        <div className="relative w-full">
                            <input 
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleAddSkill}
                                placeholder="Press enter to add skills..."
                                className="w-full px-3 py-2 border border-zinc-300 bg-white outline-none text-[10px] font-mono font-bold uppercase placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2  ">
                            {skills.length > 0 ? (
                                skills.map(skill => (
                                    <div key={skill} onClick={() => removeSkill(skill)} className="flex items-center cursor-pointer gap-2 px-2 py-1 bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest transition-colors hover:bg-orange-600">
                                        {skill}
                                        
                                    </div>
                                ))
                            ) : (
                                <span className="text-[9px] font-mono text-zinc-300 uppercase italic">Buffer_Empty...</span>
                            )}
                        </div>
                    </section>
                </div>

                {/* CONTROL FOOTER */}
                <DialogFooter className="py-2 px-4 border-t border-zinc-300 flex items-center justify-between sm:justify-between w-full">
                    <button className="text-[11px] font-mono font-black text-zinc-500 uppercase hover:text-red-600 transition-colors cursor-pointer">
                        REset filter
                    </button>
                    <button className="rounded-none bg-zinc-900 hover:bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest h-10 px-12 transition-all shadow-lg cursor-pointer active:scale-95">
                        Search
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AllFiltersDialog