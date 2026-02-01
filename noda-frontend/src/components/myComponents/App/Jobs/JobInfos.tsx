import { 
  DollarSign, ShieldCheck, ArrowUpRight, Zap, 
  MapPin, Globe, Clock, Bookmark, Share2, 
  Timer, User2, Users, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
    } | null;
}

const JobInfo = ({ job }: JobInfoProps) => {
    if (!job) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-zinc-300" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                    Select a node to initialize preview
                </p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300 ">
            {/* 1. Minimalist Header */}
            <div className="p-4 pb-4 border-b border-zinc-100">
                <div className="flex justify-between items-start mb-4">
                    {/* Smaller, cleaner logo node */}
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center shadow-sm">
                        <span className="text-sm font-bold text-white font-mono">{job.company[0]}</span>
                    </div>
                    <div className="flex gap-1.5">
                        <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                            <Share2 size={15} />
                        </button>
                        <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                            <Bookmark size={15} />
                        </button>
                    </div>
                </div>

                <h2 className="text-lg font-bold tracking-tight text-zinc-900 leading-tight">
                    {job.role}
                </h2>
                
                <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500 font-medium">
                    <span className="text-zinc-900 font-bold">{job.company}</span>
                    <span className="text-zinc-300">•</span>
                    <span>{job.location}</span>
                    <span className="text-emerald-600 font-bold ml-1">• 2h ago</span>
                </div>
            </div>

            {/* 2. Compact Intelligence Bar */}
            <div className="px-6 py-3 border-b border-zinc-50 bg-zinc-50/30 flex items-center justify-between divide-x divide-zinc-200">
                <div className="flex-1 flex flex-col items-center px-2 first:pl-0">
                    <div className="flex items-center gap-1.5 text-zinc-900 font-bold text-[11px]">
                        <DollarSign size={12} className="text-zinc-400" /> {job.salary}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">Verified</span>
                </div>

                <div className="flex-1 flex flex-col items-center px-2">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[11px]">
                        <Timer size={12} /> ~24h
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">Response</span>
                </div>

                <div className="flex-1 flex flex-col items-center px-2">
                    <div className="flex items-center gap-1.5 text-zinc-700 font-bold text-[11px]">
                        <Globe size={12} className="text-zinc-400" /> EST
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">UTC -5</span>
                </div>

                <div className="flex-1 flex flex-col items-center px-2 last:pr-0">
                    <div className="flex items-center gap-1.5 text-zinc-700 font-bold text-[11px]">
                        <Briefcase size={12} className="text-zinc-400" /> Full-time
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">Type</span>
                </div>
            </div>

            {/* 3. Main Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Recruiter Identity - Compact */}
                <div className="flex items-center gap-2 py-1">
                    <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center">
                        <User2 size={12} className="text-zinc-400" />
                    </div>
                    <span className="text-[10px] text-zinc-500">
                        Posted by <span className="font-bold text-zinc-900 hover:underline cursor-pointer">Marcus Vane</span> • 14 cycles ago
                    </span>
                </div>

                <div>
                    <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        Role Specification
                        <div className="h-[1px] flex-1 bg-zinc-100"></div>
                    </h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                        {job.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {["React", "TypeScript", "Node.js", "System Design"].map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded text-[9px] font-bold text-zinc-500 uppercase tracking-tight">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* 4. Action Layer */}
            <div className="p-6 bg-white border-t border-zinc-100">
                <div className="flex items-center gap-3 mb-4 p-3 bg-zinc-200 rounded-xl shadow-inner relative overflow-hidden group/anti">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-black uppercase tracking-tighter">
                            Anti-Ghosting Protocol Active
                        </span>
                        <span className="text-[9px] text-zinc-500 font-medium">
                            Guaranteed response within 14 cycles.
                        </span>
                    </div>
                </div>

                <Button className="w-full bg-zinc-800 hover:bg-zinc-800 text-white rounded-xl h-11 text-xs font-bold gap-2 transition-all active:scale-[0.98]">
                    Deploy Application
                    <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
            </div>
        </div>
    );
};

export default JobInfo;