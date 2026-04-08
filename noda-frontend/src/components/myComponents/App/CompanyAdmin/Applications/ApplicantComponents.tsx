import React from "react";
import {
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Mail,
  FileText,
  ExternalLink,
  ArrowRight,
  EllipsisVertical,
  Pencil,
  CalendarPlus,
  Trash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ApplicantNode, JobNode } from "@/types/admin/applications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- DIALOG: REVIEW APPLICANT ---
const ReviewApplicantDialog = ({ app }: { app: ApplicantNode }) => {
  // Requirements for the system to check against
  const requirements = [
    "React_Native",
    "Type_Safety",
    "System_Design",
    "Neural_Link_V1",
    "Encryption_Ops",
  ];

  // Recruiter-critical data (Injected from Profile Components)
  const candidateSkills = [
    "React_Native",
    "Type_Safety",
    "System_Design",
    "Rust",
    "Go",
    "K8s",
    "TS",
    "eBPF",
  ];
  const experience = "6.5 Years";
  const education = "MIT - MS Computer Science";

  return (
    <DialogContent className="sm:max-w-[650px] p-0 rounded-none border-none bg-white shadow-none overflow-hidden font-sans">
      <DialogHeader className="px-4 h-12 bg-zinc-800 flex flex-row items-center justify-between shrink-0 space-y-0">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          <DialogTitle className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">
            Applicant_Intel_Deep_Review
          </DialogTitle>
        </div>
      </DialogHeader>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full h-10 grid grid-cols-2 rounded-none bg-zinc-100 p-0 gap-px border-b border-zinc-300">
          <TabsTrigger
            value="profile"
            className="rounded-none text-[10px] font-mono font-black uppercase data-[state=active]:text-zinc-900 border-r border-zinc-200 cursor-pointer"
          >
            01_Candidate_Profile
          </TabsTrigger>
          <TabsTrigger
            value="cv"
            className="rounded-none text-[10px] font-mono font-black uppercase data-[state=active]:bg-white data-[state=active]:text-zinc-900 cursor-pointer"
          >
            02_Curriculum_Vitae
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="m-0 p-4 space-y-4">
          {/* TOP IDENTITY BLOCK */}
          <div className="flex justify-between items-start border-b border-zinc-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tighter leading-none">
                {app.name}
              </h2>
              <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest flex items-center gap-2">
                <Mail size={12} /> {app.name.toLowerCase().replace(" ", ".")}
                @noda.network
              </span>
            </div>
            <div className="text-right space-y-1">
              <div className="px-3 py-1 bg-emerald-500 text-white text-[11px] font-mono font-black uppercase">
                {app.match}_Match_Rating
              </div>
              <div className="flex items-center justify-end gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase">
                  Avail: Immediate
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* LEFT COLUMN: RECRUITER BRIEF & MATRIX */}
            <div className="space-y-4">
              <div className="p-2 border border-zinc-300 bg-zinc-50/30 space-y-3">
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block">
                  Recruiter_Brief
                </span>
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-zinc-300 pb-1">
                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                      Total_Experience
                    </span>
                    <span className="text-[10px] font-bold text-zinc-900 uppercase">
                      {experience}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                      Education
                    </span>
                    <span className="text-[9px] font-bold text-zinc-900 uppercase text-right leading-tight max-w-[120px]">
                      {education}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 border border-zinc-200 space-y-3">
                <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest block">
                  Core_Matrix
                </span>
                <div className="flex flex-wrap gap-1">
                  {candidateSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 py-0.5 border border-zinc-300 text-zinc-600 text-[9px] font-mono font-black uppercase bg-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: NEURAL MATCHING DATA */}
            <div className="space-y-4">
              <div className="p-3 border border-zinc-900 bg-white space-y-3 h-full">
                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block">
                  Neural_Matching_Data
                </span>
                <div className="flex flex-col gap-2">
                  {requirements.map((req) => {
                    const isMatch = candidateSkills.includes(req);
                    return (
                      <div
                        key={req}
                        className={cn(
                          "flex items-center justify-between text-[9px] font-mono font-black uppercase px-2 py-1.5 border transition-all",
                          isMatch
                            ? "text-emerald-600 border-emerald-500 bg-emerald-500/10"
                            : "text-zinc-500 border-zinc-300 bg-zinc-50/50",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {isMatch ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full border border-zinc-300" />
                          )}
                          {req}
                        </div>
                        {isMatch && (
                          <span className="text-[9px] font-mono font-bold opacity-70">
                            CONFIRMED
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE TIMELINE (Recruiter Verification) */}
          <div className="pt-2 border-t border-zinc-300">
            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-3">
              Verification_Timeline
            </span>
            <div className="grid grid-cols-2 gap-4  scale-95 origin-left">
              <div className="flex gap-3 border-l-2 border-zinc-900 pl-3">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                    2024 - PRES
                  </span>
                  <h4 className="text-[11px] font-bold uppercase">
                    Lead Engineer
                  </h4>
                  <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                    Noda Labs
                  </span>
                </div>
              </div>
              <div className="flex gap-3 border-l-2 border-zinc-300 pl-3">
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                    2021 - 2024
                  </span>
                  <h4 className="text-[11px] font-bold uppercase">
                    Senior Dev
                  </h4>
                  <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                    Vercel
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cv" className="m-0 h-[450px] bg-zinc-200 relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <FileText size={48} className="text-zinc-400" />
            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
              PDF_Uplink_Preview
            </span>
            <button className="h-10 px-6 bg-zinc-900 text-white text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all cursor-pointer">
              <ExternalLink size={14} /> Open_External_PDF
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

// --- DIALOG: ACCEPTANCE FLOW (Stayed the same) ---
const AcceptApplicantDialog = () => (
  <DialogContent className="sm:max-w-[400px] p-0 rounded-none border-none bg-white shadow-none font-sans overflow-hidden">
    <DialogHeader className="px-4 h-12 bg-zinc-800 flex flex-row items-center justify-between shrink-0 space-y-0">
      <div className="flex items-center gap-2">
        <CheckCircle2 size={14} className="text-emerald-500" />
        <DialogTitle className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">
          Uplink_Confirmation
        </DialogTitle>
      </div>
    </DialogHeader>

    <div className="p-4 text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-emerald-500 flex items-center justify-center text-white border border-emerald-600 ">
          <CheckCircle2 size={32} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-black uppercase tracking-tighter italic text-zinc-900">
          Node_Acceptance_Successful
        </h3>
        <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase leading-relaxed">
          Applicant has been pushed to the <br /> [Interview_Ready] buffer.
        </p>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button className="w-full h-12 bg-zinc-800 text-white text-[10px] font-mono font-black uppercase tracking-widest hover:bg-zinc-900 transition-all cursor-pointer flex items-center justify-center gap-2 group">
          Accept_More_Candidates
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>

        <div className="group">
          <button className="w-full h-12 border border-red-300 text-red-600 text-[10px] font-mono font-black uppercase hover:bg-red-50 transition-all cursor-pointer flex flex-col items-center justify-center leading-none">
            <span>Finalize_Hiring</span>
            <span className="text-[9px] opacity-60 mt-1 font-bold tracking-tighter">
              Reject_Remaining_Applicants
            </span>
          </button>
          <div className="hidden group-hover:flex absolute top-12 left-0 right-0 bg-red-600 text-[12px] text-white p-2 font-mono uppercase tracking-tighter items-center gap-2 border border-red-700 shadow-lg animate-in fade-in zoom-in-95 duration-300 z-50">
            <span>
              Warning: Critical action. This will send rejection signals to all
              other nodes in this job queue.
            </span>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>
);

// --- EXPORTED CARDS ---
export const JobCard = React.memo(
  ({ job, onSelect }: { job: JobNode; onSelect: (j: JobNode) => void }) => (
    <div
      className="p-2 bg-white hover:bg-zinc-100 transition-all cursor-pointer group flex items-center justify-between border-b border-zinc-300"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between h-fit">
          <div className="w-8 h-8 bg-zinc-800 text-white flex items-center justify-center border border-zinc-800 shrink-0 uppercase font-bold text-xs">
            {job.role.substring(0, 2)}
          </div>
          <DropdownMenu modal={false}>
            {/* 1. Trigger using your custom SVG styled container */}
            <DropdownMenuTrigger asChild onClick={(e)=> e.preventDefault()}>
              <div className="p-1 hover:bg-zinc-300/80 cursor-pointer text-zinc-500 h-fit aspect-square">
                <EllipsisVertical className="w-3.5 h-3.5" />
              </div>
            </DropdownMenuTrigger>

            {/* 2. Menu Content styled for Noda */}
            <DropdownMenuContent
              className="w-42 mt-2 rounded-none border-zinc-300  "
              align="end"
              forceMount
            >

              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-2 text-[11px] text-zinc-600 focus:bg-zinc-100 focus:text-zinc-900 cursor-pointer">
                  <Pencil className=" h-3.5 w-3.5 text-zinc-400" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-2 text-[11px] text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                  <CalendarPlus className=" h-3.5 w-3.5 text-zinc-400" />
                  <span>Add Interview Dates</span>
                </DropdownMenuItem>
                
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-zinc-50" />

              <DropdownMenuItem className="rounded-none hover:bg-zinc-200/80 px-2 py-2 text-[11px] text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer mt-1">
                <Trash className=" h-3.5 w-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col w-full">
          <h5 className="text-sm font-bold uppercase tracking-tight group-hover:text-blue-500 transition-colors">
            {job.role}
          </h5>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="truncate">Remote</span>
            <span className="opacity-30">•</span>
            <span className="truncate">Full-Time</span>
            <span className="opacity-30">•</span>
            <span className="truncate">0-1 year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
              {job.applicants} Applies
            </span>
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
              {job.deadline}
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
);

export const ApplicantCard = React.memo(({ app }: { app: ApplicantNode }) => (
  <div className="p-2 border-b border-zinc-300 bg-white hover:bg-zinc-50 transition-all group flex items-center justify-between border-b border-zinc-100">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-400 shrink-0">
        {app.name[0]}
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-bold tracking-tight">{app.name}</h5>
          <span className="text-[10px] font-mono font-black text-emerald-600 border border-emerald-200 bg-emerald-50 px-1.5 py-0.5">
            {app.match}_MATCH
          </span>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-mono font-bold text-zinc-500 uppercase">
          <span className="flex items-center gap-1">
            <Clock size={10} /> Applied {app.applied}
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4 ">
      <div className="flex flex-col items-end mr-4">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase mb-1 leading-none tracking-tighter">
          Response_Window
        </span>
        <div
          className={cn(
            "px-2 py-1 border text-[9px] font-mono font-black uppercase",
            app.deadline.includes("13d")
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-orange-200 bg-orange-50 text-orange-600",
          )}
        >
          {app.deadline}
        </div>
      </div>

      <div className="flex items-center gap-1 ">
        <Dialog>
          <DialogTrigger asChild>
            <button className="h-8 px-4 border border-zinc-800 text-[9px] font-mono font-black uppercase hover:bg-zinc-800 hover:text-white transition-all cursor-pointer">
              Review
            </button>
          </DialogTrigger>
          <ReviewApplicantDialog app={app} />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="p-2 text-zinc-400 hover:text-emerald-600 transition-colors cursor-pointer border border-transparent hover:border-emerald-200">
              <CheckCircle2 size={18} />
            </button>
          </DialogTrigger>
          <AcceptApplicantDialog />
        </Dialog>

        <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer border border-transparent hover:border-red-200">
          <XCircle size={18} />
        </button>
      </div>
    </div>
  </div>
));
