import {
    DollarSign, ShieldCheck, ArrowUpRight, Zap,
    Bookmark, Timer, User2, Briefcase,
    EllipsisVertical, Share, MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

interface JobInfoProps {
    job: {
        id: number;
        company: string;
        role: string;
        location: string;
        status: string;
        match: number;
        salary: string;
        description: string;
        workMode: "Remote" | "Hybrid" | "Onsite";
    } | null;
}

const JobInfo = ({ job }: JobInfoProps) => {
    if (!job) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-12 h-12 bg-zinc-50 border border-zinc-300 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-zinc-300" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Select a node to initialize preview
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden ">
            {/* 1. SQUARED HEADER */}
            <div className="p-5 border-b border-zinc-300 bg-zinc-50/20">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <span className="text-sm font-black text-white font-mono">{job.company[0]}</span>
                    </div>
                    <div className="flex divide-x divide-zinc-200 border border-zinc-200 bg-white h-8">
                        <button className="px-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <Share size={14} />
                        </button>
                        <button className="px-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <Bookmark size={14} />
                        </button>
                        <button className="px-3 text-zinc-400 hover:text-zinc-900 transition-colors">
                            <EllipsisVertical size={14} />
                        </button>
                    </div>
                </div>

                <h2 className="text-xl font-black tracking-tight text-zinc-900 leading-tight uppercase">
                    {job.role}
                </h2>

                <div className="flex items-center gap-2 mt-3 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-400">
                    <span className="text-zinc-900">{job.company}</span>
                    <span className="opacity-30">•</span>
                    <span>{job.location}</span>
                    <span className="text-emerald-500 ml-1">• LIVE NODE</span>
                </div>
            </div>

            {/* 2. FOUR-SECTION INTELLIGENCE BAR */}
            <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 bg-white h-14 shrink-0">
                <IntelligenceNode label="SALARY" value={job.salary} icon={<DollarSign size={10}/>} />
                <IntelligenceNode label="WORK MODE" value={job.workMode} icon={<MapPin size={10}/>} />
                <IntelligenceNode label="JOB TYPE" value="Full-time" icon={<Briefcase size={10}/>} />
                <IntelligenceNode 
                    label="RESPONSE" 
                    value="~24H" 
                    icon={<Timer size={10} className="text-emerald-500"/>} 
                    protocolIcon={<ShieldCheck size={10} className="text-emerald-500 ml-1" />}
                />
            </div>

            {/* 3. MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-6 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-zinc-100 border border-zinc-300 flex items-center justify-center">
                            <User2 size={12} className="text-zinc-500" />
                        </div>
                        <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest">
                            Posted by <span className="text-zinc-900">Marcus Vane</span> • 14 cycles ago
                        </span>
                    </div>

                    <section>
                        <h4 className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                            Role Specification
                            <div className="h-[1px] flex-1 bg-zinc-200"></div>
                        </h4>
                        <p className="text-[11px] text-zinc-500 leading-relaxed font-bold uppercase tracking-tight">
                            {job.description}
                        </p>
                    </section>

                    <div className="flex flex-wrap gap-1">
                        {["React", "TypeScript", "Node.js", "System Design"].map((tag) => (
                            <span key={tag} className="px-2 py-1 bg-zinc-50 border border-zinc-300 text-[8px] font-black text-zinc-400 uppercase tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. SQUARED DEPLOY ACTION */}
            <button className="w-full bg-zinc-900 h-12 border-t border-zinc-800 flex items-center justify-center gap-3 hover:bg-black transition-all group active:scale-[0.99] shrink-0">
                <span className="text-[11px] font-black text-white uppercase tracking-[0.3em]">
                    Deploy Application
                </span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </button>
        </div>
    );
};

const IntelligenceNode = ({ label, value, icon, active, protocolIcon }: any) => (
    <div className="flex flex-col items-center justify-center px-1">
        <div className={cn("flex items-center font-black text-[10px] uppercase tracking-tight")}>
            <span className="mr-1 opacity-50">{icon}</span>
            {value}
            {protocolIcon}
        </div>
        <span className="text-[8px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">{label}</span>
    </div>
);

export default JobInfo;