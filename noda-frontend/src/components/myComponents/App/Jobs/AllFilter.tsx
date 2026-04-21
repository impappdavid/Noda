import { useState, KeyboardEvent } from "react";
import {
  SlidersHorizontal,
  Check,
  Target,
  ChevronRight,
  X,
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
import { cn } from "@/lib/utils";

const JOB_TYPES = [
  "Full-time",
  "Freelance",
  "Contract",
  "Internship",
  "Part-time",
];
const RESPOND_TIMES = ["< 24 Hours", "< 3 Days", "< 1 Week", "Any"];

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
        <button className="flex items-center justify-center gap-1.5 px-4 h-10 bg-zinc-50 hover:bg-zinc-100 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-all shrink-0  cursor-pointer">
          <SlidersHorizontal size={12} />
          <span className="hidden sm:inline uppercase tracking-tighter">
            All Filters
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl bg-white border-none rounded-none p-0 gap-0 shadow-2xl overflow-hidden font-sans">
        <DialogHeader className="bg-zinc-200 p-2 text-black flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-2 ">
            <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-wider">
              All Filter
            </DialogTitle>
          </div>
          <DialogClose asChild>
            <button className="bg-transparent p-1 hover:bg-zinc-300 cursor-pointer text-zinc-500 hover:text-black transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </DialogClose>
        </DialogHeader>

        {/* SINGLE COLUMN GRID (STACKED) */}
        <div className="grid grid-cols-1 max-h-[75vh] overflow-y-auto scrollbar-hide">
          {/* 01. SORTING PROTOCOL */}
          <section className="space-y-0 w-full">
            <h4 className="text-[10px] p-2 w-full border-b border-zinc-300 font-mono font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2 pb-2">
              01 // Sort By
            </h4>
            <div className="flex   border-b border-zinc-300 divide-x divide-zinc-300 w-full">
              {["recent", "relevance"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSortBy(mode)}
                  className={cn(
                    "flex-1 py-2 text-[9px] font-bold uppercase transition-all cursor-pointer",
                    sortBy === mode
                      ? "bg-blue-500 text-white shadow-sm "
                      : "text-zinc-500 hover:text-zinc-700",
                  )}
                >
                  {mode === "relevance" ? "Most Relevant" : "Most Recent"}
                </button>
              ))}
            </div>
          </section>

          {/* 02. RESPOND TIME */}
          <section className="space-y-0">
            <h4 className="text-[10px] p-2 border-b border-zinc-300 font-mono font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2 ">
              02 // AVG response time
            </h4>
            <div className="grid grid-cols-4 w-full divide-x divide-zinc-300 border-b border-zinc-300">
              {RESPOND_TIMES.map((time) => (
                <button
                  key={time}
                  onClick={() => setRespondTime(time)}
                  className={cn(
                    "px-2 py-2 text-[9px] font-bold uppercase  transition-all cursor-pointer",
                    respondTime === time
                      ? "bg-blue-500 text-white "
                      : "bg-white text-zinc-500 ",
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          {/* 03. JOB TYPE */}
          <section className="space-y-0 ">
            <h4 className="text-[10px] font-mono p-2 border-b border-zinc-300 font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2">
              03 // Contract Type
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 border border-zinc-300 divide-x divide-zinc-300 w-fit overflow-hidden">
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
                          : [...prev, type],
                      )
                    }
                    className={cn(
                      "px-3 py-2 text-[9px] font-bold uppercase transition-all cursor-pointer outline-none",
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-white text-zinc-500 hover:bg-zinc-50",
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 04. SALARY */}
          <section className="space-y-0 ">
            <h4 className="text-[10px] p-2 border-b border-zinc-300 font-mono font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2">
              04 // Annual Salary Range
            </h4>
            <div className="flex items-center gap-4 w-full bg-blue-500">
              <div className="relative flex-1">
                <span className="absolute left-2 top-1 text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                  Minimum USD
                </span>
                <input
                  type="number"
                  value={salary.min}
                  onChange={(e) =>
                    setSalary({ ...salary, min: e.target.value })
                  }
                  className="w-full pl-2 pr-6 pt-4 pb-1 border border-zinc-300 text-[12px] font-mono font-bold outline-none focus:border-blue-500 bg-white"
                  placeholder="0"
                />
                <span className="absolute right-2 bottom-1.5 text-[11px] font-mono font-black text-zinc-900">
                  k
                </span>
              </div>
              <ChevronRight size={14} className="text-white shrink-0" />
              <div className="relative flex-1">
                <span className="absolute left-2 top-1 text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                  Maximum USD
                </span>
                <input
                  type="number"
                  value={salary.max}
                  onChange={(e) =>
                    setSalary({ ...salary, max: e.target.value })
                  }
                  className="w-full pl-2 pr-6 pt-4 pb-1 border border-zinc-300 text-[12px] font-mono font-bold outline-none focus:border-blue-500 bg-white"
                  placeholder="250"
                />
                <span className="absolute right-2 bottom-1.5 text-[11px] font-mono font-black text-zinc-900">
                  k
                </span>
              </div>
            </div>
          </section>

          {/* 05. SKILL REGISTRY */}
          <section className="space-y-0 ">
            <h4 className="text-[10px] p-2 border-b border-zinc-300 font-mono font-black text-zinc-700 uppercase tracking-widest flex items-center gap-2">
              05 // Skills
            </h4>

            <div className="relative w-full">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Press enter to add skills..."
                className="w-full px-3 py-2 border-b border-zinc-300 bg-white outline-none text-[10px] font-mono font-bold uppercase placeholder:text-zinc-500"
              />
            </div>

            <div className="flex flex-wrap divide-x divide-zinc-300 pt-2  ">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => removeSkill(skill)}
                    className="flex items-center cursor-pointer gap-2 px-2 py-1 bg-blue-500 text-white text-[9px] font-semibold uppercase tracking-widest transition-colors hover:bg-blue-600"
                  >
                    {skill}
                  </div>
                ))
              ) : (
                <span className="text-[9px] pl-2 py-1.5 font-mono text-zinc-600 uppercase italic">
                  No Skills Selected...
                </span>
              )}
            </div>
          </section>
        </div>

        {/* CONTROL FOOTER */}
        <DialogFooter className="border-t mt-2 border-zinc-300 gap-0 flex items-center justify-between sm:justify-between w-full">
          <button className="text-[11px] w-1/2 bg-zinc-200/80 h-full  font-mono font-black text-zinc-500 uppercase hover:text-red-600 transition-colors cursor-pointer">
            REset filter
          </button>
          <button className="rounded-none w-1/2 bg-blue-500 hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest h-10 px-12 transition-all shadow-lg cursor-pointer active:scale-95">
            Search
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AllFiltersDialog;
