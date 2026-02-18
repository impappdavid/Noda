import { useState } from "react";
import {
    DollarSign, ShieldCheck, ArrowUpRight, Zap,
    Bookmark, Timer, User2, Briefcase,
    Share, MapPin, Flag, AlertTriangle, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// --- VIOLATION CONSTANTS ---
const VIOLATION_CATEGORIES = [
    { id: "spam", label: "Spam_or_Misleading" },
    { id: "abuse", label: "Harassment_or_Abuse" },
    { id: "malicious", label: "Malicious_Intelligence" },
    { id: "copyright", label: "Intellectual_Property" },
    { id: "network", label: "Network_Instability" }
];

// --- REPORT MODAL COMPONENT ---
const ReportModal = ({ isOpen, onClose, nodeTitle }: { isOpen: boolean; onClose: () => void; nodeTitle: string }) => {
    const [category, setCategory] = useState<string>("");
    const [description, setDescription] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setCategory("");
            setDescription("");
            onClose();
        }, 2000);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
                <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500" />
                        <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-widest">
                            Security_Protocol: Report
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {!submitted ? (
                    <div className="px-4 pb-4 space-y-4">
                        <div>
                            <DialogDescription className="text-[11px] font-mono font-bold text-zinc-500 uppercase mb-4">
                                Target: <span className="text-zinc-900">{nodeTitle}</span>
                            </DialogDescription>

                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 mb-2 block">Violation_Category</label>

                            <Select onValueChange={setCategory} value={category}>
                                <SelectTrigger className="w-full h-10 rounded-none border-zinc-300 bg-zinc-50 font-mono text-[10px] cursor-pointer font-bold uppercase focus:ring-0 focus:border-zinc-900">
                                    <SelectValue placeholder="INITIALIZE_SELECTION..." />
                                </SelectTrigger>

                                <SelectContent
                                    position="popper"
                                    sideOffset={4}
                                    className="w-[var(--radix-select-trigger-width)] rounded-none border-zinc-300 font-mono text-[10px] uppercase bg-white z-[110]"
                                >
                                    {VIOLATION_CATEGORIES.map((item) => (
                                        <SelectItem
                                            key={item.id}
                                            value={item.label}
                                            className="cursor-pointer rounded-none text-xs focus:bg-zinc-800 focus:text-white"
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 mb-2 block">Evidence_Log</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide detailed logs regarding this signal violation..."
                                className="w-full h-24 p-3 bg-zinc-50 border border-zinc-300 text-sm font-mono outline-none resize-none placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={onClose} className="flex-1 h-10 border border-zinc-300 text-[11px] font-mono font-black uppercase hover:bg-zinc-200/80 cursor-pointer transition-color">
                                Abort
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!category || description.length < 5}
                                className="flex-[2] h-10 bg-red-600 text-white text-[11px] font-mono font-black uppercase hover:bg-red-700 disabled:bg-zinc-100 disabled:text-zinc-300 cursor-pointer transition-colors"
                            >
                                Transmit_Report
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col items-center justify-center text-center">
                        <CheckCircle2 size={46} className="text-emerald-500 mb-4 animate-in zoom-in duration-300" />
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1">Signal_Processed</h3>
                        <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Review_In_Progress</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

// --- MAIN JOB INFO COMPONENT ---
interface JobInfoProps {
    job: {
        id: number;
        company: string;
        role: string;
        location: string;
        salary: string;
        description: string;
        workMode: string;
        authorName: string;
    } | null;
}

const JobInfo = ({ job }: JobInfoProps) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    if (!job) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                <div className="w-12 h-12 bg-zinc-50 border border-zinc-300 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-zinc-300" />
                </div>
                <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">Select a job to initialize preview</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className="p-3 border-b border-zinc-300 bg-zinc-50/20">
                <div className="flex justify-between items-center mb-3">
                    <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                        <span className="text-sm font-black text-white font-mono">{job.company[0]}</span>
                    </div>
                    <div className="flex bg-white divide-x divide-zinc-200 border border-zinc-200">
                        <button className="px-3 py-2 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors"><Share size={14} /></button>
                        <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className={cn("px-3 py-2 cursor-pointer transition-all", isBookmarked ? "text-zinc-900 bg-orange-50/50" : "text-zinc-400 hover:text-zinc-900")}
                        >
                            <Bookmark size={14} className={cn(isBookmarked && "fill-current")} />
                        </button>
                        <button
                            onClick={() => setIsReportOpen(true)}
                            className="px-3 py-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                        >
                            <Flag size={14} />
                        </button>
                    </div>
                </div>

                {/* ROLE LINK */}
                <Link to={`/app/jobs/${job.id}`} className="hover:underline">
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 leading-tight">
                        {job.role}
                    </h2>
                </Link>

                <div className="flex items-center gap-2 mt-3 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                    {/* COMPANY LINK */}
                    <Link to={`/app/company/${job.id}`} className="text-zinc-900 hover:underline">
                        {job.company}
                    </Link>
                    <span>|</span>
                    <span>{job.location}</span>
                    <span className="text-emerald-600 ml-1">• LIVE</span>
                </div>
            </div>

            <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 bg-white shrink-0">
                <IntelligenceNode label="SALARY" value={job.salary} icon={<DollarSign size={10} />} />
                <IntelligenceNode label="WORK MODE" value={job.workMode} icon={<MapPin size={10} />} />
                <IntelligenceNode label="JOB TYPE" value="Full-time" icon={<Briefcase size={10} />} />
                <IntelligenceNode label="RESPONSE" value="~24H" icon={<Timer size={10} className="text-emerald-500" />} protocolIcon={<ShieldCheck size={10} className="text-emerald-500 ml-1" />} />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="flex items-center gap-3 p-3 border-b border-zinc-300">
                    <div className="w-7 h-7 bg-zinc-100 border border-zinc-300 flex items-center justify-center">
                        <User2 size={12} className="text-zinc-500" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                        Posted by <Link to={`/app/user/${job.id}`} className="text-zinc-900 hover:underline">{job.authorName}</Link> • 14 days ago
                    </span>
                </div>
                <div className="flex flex-col ">
                    <h4 className="text-[9px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-3">Role Specification</h4>
                    <section className="py-2 px-3">
                        <p className="text-[11px] text-zinc-700 leading-relaxed font-bold tracking-tight">{job.description}</p>
                    </section>
                </div>
            </div>

            <button className="w-full bg-zinc-800 h-12 flex items-center justify-center gap-3 hover:bg-zinc-900 transition-all text-white uppercase text-[11px] font-black tracking-[0.3em] cursor-pointer">
                Deploy Application <ArrowUpRight size={14} />
            </button>

            <ReportModal
                isOpen={isReportOpen}
                onClose={() => setIsReportOpen(false)}
                nodeTitle={job.role}
            />
        </div>
    );
};

const IntelligenceNode = ({ label, value, icon, protocolIcon }: any) => (
    <div className="flex flex-col items-center justify-center px-1 py-2">
        <div className="flex items-center font-bold text-[10px] uppercase tracking-tight">
            <span className="mr-1 opacity-50">{icon}</span> {value} {protocolIcon}
        </div>
        <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">{label}</span>
    </div>
);

export default JobInfo;