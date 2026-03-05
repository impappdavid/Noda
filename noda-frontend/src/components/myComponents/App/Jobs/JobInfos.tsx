import { useState, useEffect } from "react";
import {
    DollarSign, ArrowUpRight, Zap,
    Bookmark, User2, Briefcase,
    Share, MapPin, Flag, AlertTriangle, CheckCircle2, Loader2
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import remarkGfm from 'remark-gfm';
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

// --- ANIMATED MATCH NODE ---
const MatchNode = ({ targetValue }: { targetValue: number }) => {
    const [isLoading, setIsLoading] = useState(true);
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            animate(count, targetValue, { duration: 2, ease: "easeOut" });
        }, 1200);
        return () => clearTimeout(timer);
    }, [targetValue, count]);

    return (
        <div className="flex flex-col items-center justify-center px-1 py-2">
            <div className="flex items-center font-bold text-[10px] uppercase tracking-tight h-4">
                {isLoading ? (
                    <Loader2 size={10} className="animate-spin text-orange-500" />
                ) : (
                    <span className="text-orange-600 flex items-center gap-0.5">
                        <Zap size={10} className="fill-current" />
                        <motion.span>{rounded}</motion.span>%
                    </span>
                )}
            </div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">MATCH_SCORE</span>
        </div>
    );
};

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
                <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0 text-left">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-red-500" />
                        <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-widest">
                            Security_Protocol: Report
                        </DialogTitle>
                    </div>
                </DialogHeader>

                {!submitted ? (
                    <div className="px-4 pb-4 space-y-4">
                        <div className="mt-4">
                            <DialogDescription className="text-[11px] font-mono font-bold text-zinc-500 uppercase mb-4 text-left">
                                Target: <span className="text-zinc-900">{nodeTitle}</span>
                            </DialogDescription>

                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 mb-2 block text-left">Violation_Category</label>

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

                        <div className="flex flex-col text-left">
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 mb-2 block">Evidence_Log</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide detailed logs regarding this signal violation..."
                                className="w-full h-24 p-3 bg-zinc-50 border border-zinc-300 text-sm font-mono outline-none resize-none placeholder:text-zinc-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button onClick={onClose} className="flex-1 h-10 border border-zinc-300 text-[11px] font-mono font-black uppercase hover:bg-zinc-200/80 cursor-pointer transition-colors">
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
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1 text-zinc-900">Signal_Processed</h3>
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
        match: number;
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
        <div className="h-full flex flex-col bg-white overflow-hidden ">
            {/* FIXED HEADER SECTION */}
            <div className="shrink-0">
                <div className="p-2 border-b border-zinc-300 bg-zinc-50/20">
                    <div className="flex justify-between items-start mb-2">
                        <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                            <span className="text-sm font-black text-white font-mono">{job.company[0]}</span>
                        </div>
                        <div className="flex">
                            <button className="px-2 py-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-300/60 aspect-square cursor-pointer transition-colors"><Share size={14} /></button>
                            <button
                                onClick={() => setIsBookmarked(!isBookmarked)}
                                className={cn("px-2 py-2 cursor-pointer hover:bg-zinc-300/60 transition-all", isBookmarked ? "text-zinc-900 bg-orange-50/50" : "text-zinc-400 hover:text-zinc-900")}
                            >
                                <Bookmark size={14} className={cn(isBookmarked && "fill-current")} />
                            </button>
                            <button
                                onClick={() => setIsReportOpen(true)}
                                className="px-2 py-2 text-zinc-400 hover:text-red-600 hover:bg-red-500/20 cursor-pointer transition-colors"
                            >
                                <Flag size={14} />
                            </button>
                        </div>
                    </div>

                    <Link to={`/app/jobs/${job.id}`} className="hover:underline block">
                        <h2 className="text-xl font-bold tracking-tighter text-zinc-900 leading-tight">
                            {job.role}
                        </h2>
                    </Link>

                    <div className="flex items-center gap-2 mt-1 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                        <Link to={`/app/company/${job.id}`} className="text-zinc-900 hover:underline">
                            {job.company}
                        </Link>
                        <span>|</span>
                        <span className="text-emerald-600">~24H</span>
                        <span>|</span>
                        <span className="text-zinc-600">posted 12days ago</span>
                    </div>
                </div>

                {/* META NODES */}
                <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 bg-white">
                    <IntelligenceNode label="SALARY" value={job.salary} icon={<DollarSign size={10} />} />
                    <IntelligenceNode label="LOC" value={job.workMode} icon={<MapPin size={10} />} />
                    <IntelligenceNode label="TYPE" value="Full-time" icon={<Briefcase size={10} />} />
                    <MatchNode targetValue={job.match || 0} />
                </div>

                {/* AUTHOR INFO */}
                <div className="flex items-center gap-3 p-2 border-b border-zinc-300">
                    <div className="w-7 h-7 bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
                        <User2 size={12} className="text-zinc-500" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Node_Owner: <Link to={`/app/user/${job.id}`} className="text-zinc-900 hover:underline">{job.authorName}</Link>
                    </span>
                </div>

                {/* SKILL REGISTRY */}
                <div className="flex flex-col border-b border-zinc-300">
                    <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-400 uppercase tracking-[0.3em] bg-zinc-50/10">Skill_Registry</h4>
                    <section className="py-2 px-2 flex flex-wrap gap-1">
                        {["React", "TypeScript", "TailwindCSS", "Node.js"].map(skill => (
                            <div key={skill} className="border border-zinc-200 px-1.5 py-1 text-[9px] font-bold uppercase text-zinc-600 bg-zinc-50">
                                {skill}
                            </div>
                        ))}
                    </section>
                </div>
                
                {/* STICKY DESCRIPTION HEADER */}
                <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-400 uppercase tracking-[0.3em] bg-white">Operational_Parameters</h4>
            </div>

            {/* ISOLATED SCROLLABLE DESCRIPTION AREA */}
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-white p-3">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h2: ({ node, ...props }) => <h2 className="text-[12px] font-bold tracking-widest text-zinc-900 pb-1 mt-4 first:mt-0 " {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-[11px] font-bold tracking-wide text-zinc-800 mb-2 mt-4" {...props} />,
                        p: ({ node, ...props }) => <p className="text-[12px] text-zinc-600 leading-relaxed mb-4 whitespace-pre-line" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="text-[12px] text-zinc-600 marker:text-zinc-500" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold text-zinc-900" {...props} />,
                        hr: () => <hr className="my-4 border-zinc-300" />,
                    }}
                >
                    {job.description}
                </ReactMarkdown>
            </div>

            {/* FIXED FOOTER ACTION */}
            <div className="shrink-0 border-t border-zinc-300 bg-white">
                <button className="w-full bg-zinc-900 h-12 flex items-center justify-center gap-3 hover:bg-orange-600 transition-all text-white uppercase text-[11px] font-bold tracking-[0.3em] cursor-pointer active:scale-[0.98]">
                    Apply NOW <ArrowUpRight size={14} />
                </button>
            </div>

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
        <div className="flex items-center font-bold text-[10px] uppercase tracking-tight text-zinc-900">
            <span className="mr-1 opacity-50">{icon}</span> {value} {protocolIcon}
        </div>
        <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">{label}</span>
    </div>
);

export default JobInfo;