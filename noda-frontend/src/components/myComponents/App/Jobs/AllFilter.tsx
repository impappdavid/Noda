import { useState, KeyboardEvent } from "react";
import {
  SlidersHorizontal,
  ChevronRight,
  X,
  Layers,
  Clock,
  Briefcase,
  DollarSign,
  Cpu,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

const JOB_TYPES = [
  "Full-time",
  "Freelance",
  "Contract",
  "Internship",
  "Part-time",
];
const RESPOND_TIMES = ["< 24h", "< 3d", "< 1w", "Any"];

const AllFiltersDialog = () => {
  const [sortBy, setSortBy] = useState("relevance");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [respondTime, setRespondTime] = useState("Any");
  const [salary, setSalary] = useState({ min: "", max: "" });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Node.js",
  ]);

  const handleAddSkill = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-1.5 px-4 h-10 bg-white border border-zinc-300 hover:bg-zinc-50 text-[10px] font-mono font-black text-zinc-900 transition-colors cursor-pointer rounded-none">
          <SlidersHorizontal size={12} strokeWidth={2.5} />
          <span className="uppercase tracking-wider">All Filters</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl bg-zinc-100 border-none rounded-none p-0 gap-0 shadow-none font-mono text-left select-none text-zinc-900 overflow-hidden">
        
        {/* MODAL HEADER CONTAINER */}
        <DialogHeader className="border-b border-zinc-300 p-1.5 flex flex-row items-center justify-between space-y-0 bg-blue-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-white flex items-center justify-center ">
              <SlidersHorizontal size={14} strokeWidth={2} />
            </div>
            <DialogTitle className="text-[10px] font-black text-white uppercase tracking-wide">
              All Filter
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <button className="p-1 hover:bg-zinc-800/40 cursor-pointer text-zinc-200 hover:text-zinc-100 transition-colors">
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* COMPACT SCROLLABLE STACK WITH VISUAL SEPARATION */}
        <div className="p-2 space-y-2 max-h-[60vh] overflow-y-auto w-full">
          
          {/* ROW 1: SPLIT COLUMN OPTIONS */}
          <div className="grid grid-cols-2 gap-2 w-full">
            
            {/* 01. SORT METHOD PANEL */}
            <section className="bg-white border border-zinc-300 flex flex-col h-full">
              <div className="px-2.5 py-1.5 border-b border-zinc-300 bg-zinc-200/80 flex items-center gap-1.5 text-[9px] font-black text-zinc-600 tracking-wide uppercase">
                <Layers size={9} />
                <span>01 / SORT METHOD</span>
              </div>
              <div className="grid grid-cols-2 gap-0 flex-1 divide-x divide-zinc-300">
                {["relevance", "recent"].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSortBy(mode)}
                    className={cn(
                      "h-fit py-2 text-[9px] font-black uppercase tracking-wide transition-colors cursor-pointer outline-none border-none",
                      sortBy === mode
                        ? "bg-blue-500 text-white"
                        : "bg-white text-zinc-500 hover:bg-zinc-50"
                    )}
                  >
                    {mode === "relevance" ? "RELEVANCE" : "RECENCY"}
                  </button>
                ))}
              </div>
            </section>

            {/* 02. RESPONSE MATRIX PANEL */}
            <section className="bg-white border border-zinc-300 flex flex-col h-full">
              <div className="px-2.5 py-1.5 border-b border-zinc-300 bg-zinc-200/80 flex items-center gap-1.5 text-[9px] font-black text-zinc-600 tracking-wide uppercase">
                <Clock size={9} />
                <span>02 / AVG RESPONSE</span>
              </div>
              <div className="grid grid-cols-4 gap-0 flex-1 divide-x divide-zinc-200">
                {RESPOND_TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setRespondTime(time)}
                    className={cn(
                      "h-full text-[9px] font-black uppercase transition-colors cursor-pointer outline-none border-none",
                      respondTime === time
                        ? "bg-blue-500 text-white"
                        : "bg-white text-zinc-500 hover:bg-zinc-50"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* 03. COMPENSATION ENTRY PANEL */}
          <section className="w-full bg-white border border-zinc-300 flex flex-col">
            <div className="px-3 py-1.5 border-b border-zinc-300 bg-zinc-200/80 flex items-center gap-1.5 text-[9px] font-black text-zinc-600 tracking-wide uppercase">
              <DollarSign size={9} />
              <span>03 / ANNUAL COMPENSATION RANGE</span>
            </div>
            <div className="grid grid-cols-2 gap-0 items-stretch divide-x divide-zinc-300">
              <div className="relative h-10 flex items-center">
                <span className="absolute left-3 top-1 text-[8px] text-zinc-400 uppercase tracking-widest font-black pointer-events-none">MIN USD</span>
                <input
                  type="number"
                  value={salary.min}
                  onChange={(e) => setSalary({ ...salary, min: e.target.value })}
                  className="w-full h-full pl-3 pr-8 pt-3 text-xs font-black outline-none bg-transparent"
                  placeholder="0"
                />
                <span className="absolute right-3 bottom-1.5 text-[9px] font-black text-zinc-400">K/YR</span>
              </div>
              <div className="relative h-10 flex items-center">
                <span className="absolute left-3 top-1 text-[7px] text-zinc-400 uppercase tracking-widest font-black pointer-events-none">MAX_USD</span>
                <input
                  type="number"
                  value={salary.max}
                  onChange={(e) => setSalary({ ...salary, max: e.target.value })}
                  className="w-full h-full pl-3 pr-8 pt-3 text-xs font-black outline-none bg-transparent"
                  placeholder="250"
                />
                <span className="absolute right-3 bottom-1.5 text-[9px] font-black text-zinc-400">K/YR</span>
              </div>
            </div>
          </section>

          {/* 04. CLASSIFICATION SELECTION PANEL */}
          <section className="w-full bg-white border border-zinc-300 flex flex-col">
            <div className="px-3 py-1.5 border-b border-zinc-300 bg-zinc-200/80 flex items-center gap-1.5 text-[9px] font-black text-zinc-600 tracking-wide uppercase">
              <Briefcase size={9} />
              <span>04 / ASSIGNMENT CLASSIFICATION</span>
            </div>
            <div className="grid grid-cols-5 gap-0 h-9 divide-x divide-zinc-300">
              {JOB_TYPES.map((type) => {
                const isSelected = selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setSelectedTypes((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
                    className={cn(
                      "h-full text-[9px] font-black uppercase tracking-tight transition-colors cursor-pointer outline-none border-none truncate px-1",
                      isSelected ? "bg-blue-500 text-white" : "bg-white text-zinc-600 hover:bg-zinc-200"
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 05. SKILLS TOKEN REGISTRY PANEL */}
          <section className="w-full bg-white border border-zinc-300 flex flex-col">
            <div className="px-3 py-1.5 border-b border-zinc-300 bg-zinc-200/80 flex items-center gap-1.5 text-[9px] font-black text-zinc-600 tracking-wide uppercase">
              <Cpu size={9} />
              <span>05 / CORE STACK</span>
            </div>
            
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder="INPUT TOKEN AND PRESS ENTER..."
              className="w-full h-9 px-3 border-b border-zinc-300 bg-transparent outline-none text-[10px] font-black uppercase placeholder:text-zinc-400"
            />

            <div className="flex flex-wrap gap-1 p-1 bg-zinc-50">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="flex items-center gap-1.5 px-2 py-1 bg-blue-500  hover:border-red-400 hover:bg-red-500 text-white  transition-colors text-[10px] font-bold uppercase outline-none cursor-pointer rounded-none"
                  >
                    <span>{skill}</span>
                  </button>
                ))
              ) : (
                <div className="text-[8px] text-zinc-500 uppercase italic font-bold py-0.5">
                  No Skills Selected
                </div>
              )}
            </div>
          </section>

        </div>

        {/* CONTROL FOOTER BOX */}
        <DialogFooter className="w-full h-11 grid grid-cols-2 gap-0 items-stretch border-t border-zinc-300 bg-white sm:justify-stretch">
          <button
            type="button"
            className="h-full bg-white hover:bg-zinc-50 border-r border-zinc-300 text-[10px] font-black text-zinc-400 hover:text-red-600 uppercase tracking-widest transition-colors cursor-pointer rounded-none outline-none border-none"
          >
            RESET ALL
          </button>
          <button
            type="submit"
            className="h-full bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer rounded-none outline-none flex items-center justify-center gap-1 border-none"
          >
            <span>SEARCH</span>
            <ChevronRight size={12} strokeWidth={3} />
          </button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default AllFiltersDialog;