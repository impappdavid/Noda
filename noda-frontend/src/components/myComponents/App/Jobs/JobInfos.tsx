import { useState, useEffect } from "react";
import {
  DollarSign,
  ArrowUpRight,
  Zap,
  Bookmark,
  User2,
  Briefcase,
  Share,
  MapPin,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  X,
  ClipboardList,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- QUESTIONNAIRE MODAL (NEW COMPONENT) ---
const QuestionnaireModal = ({
  isOpen,
  onClose,
  onComplete,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  role: string;
}) => {
  const [answers, setAnswers] = useState({ years: "", reason: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
        <DialogHeader className="bg-zinc-300 p-2 flex justify-between w-full items-center space-y-0">
          <DialogTitle className="text-[10px] font-bold tracking-[0.2em] uppercase text-black flex gap-2 items-center">
            <ClipboardList size={14} className="text-blue-500" />
            Application Questions
          </DialogTitle>
          <DialogClose>
            <button className="hover:bg-zinc-500/20 cursor-pointer p-1 transition-colors outline-none">
              <X className="w-4 h-4 text-zinc-600" />
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="flex flex-col">
          {/* HEADER DATA */}
          <div className="border-b border-zinc-300  flex divide-x divide-zinc-300">
            <div className="p-2 flex-1">
              <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Role</div>
              <div className="text-[10px] font-bold uppercase truncate">{role}</div>
            </div>
            <div className="p-2 w-24">
              <div className="text-[9px] font-mono text-zinc-400 uppercase font-bold">Priority</div>
              <div className="text-[10px] font-black uppercase text-blue-600">Level_01</div>
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="divide-y divide-zinc-300">
            <div className="p-2 flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-tight flex justify-between">
                01. Years of relevant experience?
                <span className="text-zinc-500 font-mono">[INT]</span>
              </label>
              <input 
                type="number"
                value={answers.years}
                onChange={(e) => setAnswers({...answers, years: e.target.value})}
                placeholder="0"
                className="w-full bg-zinc-50 border border-zinc-300 p-2 text-[11px] font-mono outline-none focus:bg-white transition-colors"
              />
            </div>

            <div className="p-2 flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-tight flex justify-between">
                02. Why this node? 
                <span className="text-zinc-500 font-mono">[STR]</span>
              </label>
              <textarea 
                value={answers.reason}
                onChange={(e) => setAnswers({...answers, reason: e.target.value})}
                placeholder="MOTIVATION Letter..."
                className="w-full h-24 bg-zinc-50 border border-zinc-300 p-2 text-[11px] font-mono outline-none resize-none focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* ACTION */}
          <button
            onClick={handleFinish}
            disabled={!answers.years || answers.reason.length < 10 || isSubmitting}
            className="w-full h-10 bg-zinc-900 text-white font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-blue-600 disabled:bg-zinc-500 disabled:text-zinc-400 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <>Submit_Final_Data <ArrowUpRight size={14} /></>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
          <Loader2 size={10} className="animate-spin text-blue-500" />
        ) : (
          <span className="text-blue-600 flex items-center gap-0.5">
            <Zap size={10} className="fill-current" />
            <motion.span>{rounded}</motion.span>%
          </span>
        )}
      </div>
      <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">
        MATCH_SCORE
      </span>
    </div>
  );
};

// --- VIOLATION CONSTANTS ---
const VIOLATION_CATEGORIES = [
  { id: "spam", label: "Spam or Misleading" },
  { id: "abuse", label: "Harassment or Abuse" },
  { id: "malicious", label: "Malicious Intelligence" },
  { id: "copyright", label: "Intellectual Property" },
  { id: "network", label: "Network Instability" },
];

const ReportModal = ({
  isOpen,
  onClose,
  nodeTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  nodeTitle: string;
}) => {
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
      <DialogContent className="sm:max-w-[450px] p-0 rounded-none border-none shadow-none overflow-hidden bg-white gap-0">
        <DialogHeader className="bg-zinc-800 p-1 px-2 border-b border-zinc-300 flex justify-between w-full items-center space-y-0">
          <DialogTitle className="text-[12px] tracking-wide uppercase text-white flex gap-1 items-center">
            <AlertTriangle size={16} className="text-white shrink-0" />
            Report
          </DialogTitle>
          <DialogClose>
            <button className="hover:bg-black/40 cursor-pointer p-1 mt-0.5 transition-colors outline-none">
              <X className="w-4 h-4 text-white" />
            </button>
          </DialogClose>
        </DialogHeader>

        {!submitted ? (
          <div className="flex flex-col">
            <div className="">
              <div className="border-b border-zinc-300 grid grid-cols-2 divide-x divide-zinc-300">
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Target</div>
                  {nodeTitle}
                </span>
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Company</div>
                  Google
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold p-2 flex flex-col gap-1 border-b border-zinc-300 uppercase tracking-tighter text-zinc-900 leading-none">
                  <div className="font-normal text-zinc-500">Category</div>

                  <Select onValueChange={setCategory} value={category}>
                    <SelectTrigger className="w-full h-9 rounded-none outline-none border-zinc-300 bg-zinc-50 font-mono text-[10px] cursor-pointer font-bold uppercase">
                      <SelectValue placeholder="INITIALIZE_SELECTION..." />
                    </SelectTrigger>
                    <SelectContent
                      position="popper"
                      className="rounded-none border-zinc-300 font-mono text-[10px] bg-white shadow-none"
                    >
                      {VIOLATION_CATEGORIES.map((item) => (
                        <SelectItem
                          key={item.id}
                          value={item.label}
                          className="cursor-pointer rounded-none focus:bg-blue-500 text-xs focus:text-white"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </div>

            <span className="text-[10px] font-bold p-2 flex flex-col gap-1 border-b border-zinc-300 uppercase tracking-tighter text-zinc-900 leading-none">
              <div className="font-normal text-zinc-500">About</div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="PROMPT: Describe the nature of this violation..."
                className="w-full h-28 p-2 bg-zinc-50 border border-zinc-300 text-[11px] font-mono outline-none resize-none placeholder:text-zinc-500 focus:border-zinc-900 transition-colors"
              />
            </span>

            <div className="grid grid-cols-2">
              <button
                onClick={onClose}
                className="h-10 bg-white hover:bg-zinc-100 font-mono font-black text-[10px] uppercase cursor-pointer transition-colors flex items-center justify-center gap-2 border-r border-zinc-300"
              >
                Abort
              </button>
              <button
                onClick={handleSubmit}
                disabled={!category || description.length < 5}
                className="h-10 bg-red-600 text-white font-mono font-black text-[10px] uppercase cursor-pointer hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:bg-zinc-100 disabled:text-zinc-300"
              >
                Send Report
              </button>
            </div>
          </div>
        ) : (
          <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 bg-white">
            <div className="w-16 h-16 border-2 border-emerald-500 flex items-center justify-center mb-4">
              <CheckCircle2
                size={32}
                className="text-emerald-500 animate-in zoom-in duration-300"
              />
            </div>
            <h3 className="text-[12px] font-black uppercase tracking-[0.2em] mb-2 text-zinc-900">
              Signal_Processed
            </h3>
            <div className="py-1 px-3 bg-zinc-100 border border-zinc-300 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Review_In_Progress
            </div>
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
  const [isApplyOpen, setIsApplyOpen] = useState(false); // Added for Apply Dialog
  const [isApplied, setIsApplied] = useState(false);

  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-12 h-12 bg-zinc-50 border border-zinc-300 flex items-center justify-center mb-4">
          <Zap className="w-5 h-5 text-zinc-300" />
        </div>
        <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          Select a job to initialize preview
        </p>
      </div>
    );
  }

  const handleApplyComplete = () => {
    setIsApplyOpen(false);
    setIsApplied(true);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden ">
      <div className="shrink-0">
        <div className="p-2 border-b border-zinc-300 bg-zinc-50/20">
          <div className="flex justify-between items-start mb-2">
            <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center border border-zinc-800">
              <span className="text-sm font-black text-white font-mono">
                {job.company[0]}
              </span>
            </div>
            <div className="flex">
              <button className="px-2 py-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-300/60 aspect-square cursor-pointer transition-colors">
                <Share size={14} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "px-2 py-2 cursor-pointer hover:bg-zinc-300/60 transition-all",
                  isBookmarked
                    ? "text-zinc-900 bg-blue-50/50"
                    : "text-zinc-400 hover:text-zinc-900",
                )}
              >
                <Bookmark
                  size={14}
                  className={cn(isBookmarked && "fill-current")}
                />
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
            <Link
              to={`/app/company/${job.id}`}
              className="text-zinc-900 hover:underline"
            >
              {job.company}
            </Link>
            <span>|</span>
            <span className="text-emerald-600">~24H</span>
            <span>|</span>
            <span className="text-zinc-600">posted 12days ago</span>
          </div>
        </div>

        <div className="grid grid-cols-4 border-b border-zinc-300 divide-x divide-zinc-300 bg-white">
          <IntelligenceNode
            label="SALARY"
            value={job.salary}
            icon={<DollarSign size={10} />}
          />
          <IntelligenceNode
            label="LOC"
            value={job.workMode}
            icon={<MapPin size={10} />}
          />
          <IntelligenceNode
            label="TYPE"
            value="Full-time"
            icon={<Briefcase size={10} />}
          />
          <MatchNode targetValue={job.match || 0} />
        </div>

        <div className="flex items-center gap-3 p-2 border-b border-zinc-300">
          <div className="w-7 h-7 bg-zinc-100 border border-zinc-300 flex items-center justify-center shrink-0">
            <User2 size={12} className="text-zinc-500" />
          </div>
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
            Node_Owner:{" "}
            <Link
              to={`/app/user/${job.id}`}
              className="text-zinc-900 hover:underline"
            >
              {job.authorName}
            </Link>
          </span>
        </div>

        <div className="flex flex-col border-b border-zinc-300">
          <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-400 uppercase tracking-[0.3em] bg-zinc-50/10">
            Skill_Registry
          </h4>
          <section className="py-2 px-2 flex flex-wrap gap-1">
            {["React", "TypeScript", "TailwindCSS", "Node.js"].map((skill) => (
              <div
                key={skill}
                className="border border-zinc-200 px-1.5 py-1 text-[9px] font-bold uppercase text-zinc-600 bg-zinc-50"
              >
                {skill}
              </div>
            ))}
          </section>
        </div>

        <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-400 uppercase tracking-[0.3em] bg-white">
          Operational_Parameters
        </h4>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide bg-white p-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ ...props }) => (
              <h2 className="text-[12px] font-bold tracking-widest text-zinc-900 pb-1 mt-4 first:mt-0" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-[11px] font-bold tracking-wide text-zinc-800 mb-2 mt-4" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="text-[12px] text-zinc-600 leading-relaxed mb-4 whitespace-pre-line" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="text-[12px] text-zinc-600 marker:text-zinc-500" {...props} />
            ),
            strong: ({ ...props }) => (
              <strong className="font-bold text-zinc-900" {...props} />
            ),
            hr: () => <hr className="my-4 border-zinc-300" />,
          }}
        >
          {job.description}
        </ReactMarkdown>
      </div>

      <div className="shrink-0 border-t border-zinc-300 bg-white">
        <button 
          onClick={() => setIsApplyOpen(true)}
          disabled={isApplied}
          className={cn(
            "w-full h-12 flex items-center justify-center gap-3 transition-all uppercase text-[11px] font-bold tracking-[0.3em] cursor-pointer active:scale-[0.98]",
            isApplied ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white hover:bg-blue-600"
          )}
        >
          {isApplied ? (
            <>Application_Sent <CheckCircle2 size={14} /></>
          ) : (
            <>Apply NOW <ArrowUpRight size={14} /></>
          )}
        </button>
      </div>

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        nodeTitle={job.role}
      />

      {/* TRIGGERED DIALOG */}
      <QuestionnaireModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onComplete={handleApplyComplete}
        role={job.role}
      />
    </div>
  );
};

const IntelligenceNode = ({ label, value, icon, protocolIcon }: any) => (
  <div className="flex flex-col items-center justify-center px-1 py-2">
    <div className="flex items-center font-bold text-[10px] uppercase tracking-tight text-zinc-900">
      <span className="mr-1 opacity-50">{icon}</span> {value} {protocolIcon}
    </div>
    <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">
      {label}
    </span>
  </div>
);

export default JobInfo;