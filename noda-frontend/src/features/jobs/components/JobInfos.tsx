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
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import remarkGfm from "remark-gfm";
import { QuestionnaireModal } from "./jobInfos/QuestionModal";
import { ReportModal } from "./jobInfos/ReportModal";

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
    applied?: boolean;
  } | null;
  onApply: (id: number) => void;
}

const JobInfo = ({ job, onApply }: JobInfoProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white border border-zinc-300">
        <div className="w-12 h-12 bg-zinc-50 border border-zinc-300 flex items-center justify-center mb-4">
          <Zap className="w-5 h-5 text-zinc-300" />
        </div>
        <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
          Select a job to initialize preview
        </p>
      </div>
    );
  }

  const isApplied = !!job.applied;

  const handleApplyComplete = () => {
    setIsApplyOpen(false);
    onApply(job.id);
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
            <div className="flex border border-zinc-200 divide-x divide-zinc-200 bg-white">
              <button className="px-2 py-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 aspect-square cursor-pointer transition-colors border-none bg-transparent">
                <Share size={14} />
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={cn(
                  "px-2 py-2 cursor-pointer hover:bg-zinc-100 transition-all border-none bg-transparent",
                  isBookmarked ? "text-zinc-900 bg-blue-50/50" : "text-zinc-400 hover:text-zinc-900",
                )}
              >
                <Bookmark
                  size={14}
                  className={cn(isBookmarked && "fill-current")}
                />
              </button>
              <button
                onClick={() => setIsReportOpen(true)}
                className="px-2 py-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors border-none bg-transparent"
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
            Recruiter:{" "}
            <Link
              to={`/app/user/${job.id}`}
              className="text-zinc-900 hover:underline"
            >
              {job.authorName}
            </Link>
          </span>
        </div>

        <div className="flex flex-col border-b border-zinc-300">
          <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-[0.3em] bg-zinc-200/80">
            Needed Skills
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

        <h4 className="text-[9px] px-2 py-2 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-[0.3em] bg-zinc-200/80">
          Role Description
        </h4>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-3 prose-flat">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ ...props }) => (
              <h2 className="text-[12px] font-bold tracking-widest text-zinc-900 pb-1 mt-4 first:mt-0 uppercase font-mono" {...props} />
            ),
            h3: ({ ...props }) => (
              <h3 className="text-[11px] font-bold tracking-wide text-zinc-800 mb-2 mt-4 uppercase font-mono" {...props} />
            ),
            p: ({ ...props }) => (
              <p className="text-[12px] text-zinc-600 leading-relaxed mb-4 whitespace-pre-line" {...props} />
            ),
            ul: ({ ...props }) => (
              <ul className="list-disc list-inside mb-4 space-y-1 pl-1" {...props} />
            ),
            li: ({ ...props }) => (
              <li className="text-[12px] text-zinc-600 marker:text-zinc-400 font-sans" {...props} />
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
          type="button"
          onClick={() => setIsApplyOpen(true)}
          disabled={isApplied}
          className={cn(
            "w-full h-10 flex items-center justify-center gap-3 transition-all uppercase text-[11px] font-bold tracking-[0.1em] cursor-pointer active:scale-[0.98] border-none rounded-none",
            isApplied ? "bg-blue-500/60 text-white cursor-not-allowed" : "bg-zinc-900 text-white hover:bg-blue-600"
          )}
        >
          {isApplied ? (
            <>You Already Applied</>
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

      <QuestionnaireModal 
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onComplete={handleApplyComplete}
        role={job.role}
      />
    </div>
  );
};

// --- INTELLIGENCE NODE ---
interface IntelligenceNodeProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  protocolIcon?: React.ReactNode;
}

const IntelligenceNode = ({ label, value, icon, protocolIcon }: IntelligenceNodeProps) => (
  <div className="flex flex-col items-center justify-center px-1 py-2">
    <div className="flex items-center font-bold text-[10px] uppercase tracking-tight text-zinc-900">
      {icon && <span className="mr-1 opacity-50 flex items-center">{icon}</span>}
      <span>{value}</span>
      {protocolIcon && <span className="ml-1">{protocolIcon}</span>}
    </div>
    <span className="text-[9px] font-mono text-zinc-400 uppercase font-bold tracking-tighter mt-1">
      {label}
    </span>
  </div>
);

export default JobInfo;