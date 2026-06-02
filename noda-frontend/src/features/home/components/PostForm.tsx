import { useState, useRef, useEffect, type ChangeEvent } from "react";
import {
  EyeOff,
  Image as ImageIcon,
  Plus,
  BarChart2,
  X,
  Trash2,
  Eye,
  Briefcase,
  Layers,
  Link as LinkIcon,
  FolderCode,
  Github,
  Calendar,
  Clock,
  Cpu,
  AlertTriangle,
  Radio,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PostType = "NORMAL" | "PROJECT" | "RECRUITER";

const MOCK_ACTIVE_JOBS = [
  { id: "JOB-01/RUST", title: "Senior Rust Protocol Engineer", department: "Core Infra", location: "Remote" },
  { id: "JOB-02/TS", title: "Staff Frontend Compositor", department: "Product Eng", location: "New York" },
  { id: "JOB-03/DIST", title: "Distributed Systems Architect", department: "Systems Labs", location: "Remote" },
];

export default function PostForm() {
  const [activeType, setActiveType] = useState<PostType>("NORMAL");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  // --- TAB 1: NORMAL FORM STATES ---
  const [images, setImages] = useState<string[]>([]);
  const [showPoll, setShowPoll] = useState<boolean>(false);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);

  // --- TAB 2: PROJECT CASE STATES ---
  const [projTitle, setProjTitle] = useState<string>("");
  const [projYear, setProjYear] = useState<string>("");
  const [projDuration, setProjDuration] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [challenges, setChallenges] = useState<string>("");
  const [projLink, setProjLink] = useState<string>("");
  const [repoLink, setRepoLink] = useState<string>("");

  // --- TAB 3: RECRUITER POST STATES ---
  const [selectedJobId, setSelectedJobId] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text, activeType]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages].slice(0, 4));
  };

  return (
    <div className="bg-white p-4">
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-zinc-400 hover:bg-black hover:border-zinc-600 transition-all text-left cursor-pointer rounded-none">
            <span className="text-[10px] font-mono tracking-[0.15em] uppercase font-bold">
              :: INITIALIZE_BROADCAST_STREAM
            </span>
            <Plus size={12} />
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col rounded-none p-0 overflow-hidden bg-white border border-zinc-300 shadow-none gap-0">
          
          {/* Header Console Banner */}
          <DialogHeader className="bg-zinc-50 border-b border-zinc-200 px-3 py-1.5 text-black flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-2">
              <Radio size={12} className="text-zinc-400" />
              <DialogTitle className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600">
                Uplink Server // client-mode
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <button className="p-0.5 hover:bg-zinc-200 text-zinc-400 hover:text-black transition-colors cursor-pointer rounded-none">
                <X className="w-3 h-3" />
              </button>
            </DialogClose>
          </DialogHeader>

          {/* Optimized Micro-Height Tab System */}
          <div className="grid grid-cols-3 gap-0 bg-zinc-100 border-b border-zinc-200 shrink-0">
            {(["NORMAL", "PROJECT", "RECRUITER"] as PostType[]).map((type, i) => (
              <button
                key={type}
                onClick={() => { setActiveType(type); setText(""); }}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wide transition-all cursor-pointer outline-none border-r border-zinc-200 last:border-r-0",
                  activeType === type 
                    ? "bg-white text-zinc-900 border-b border-b-zinc-950" 
                    : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50"
                )}
              >
                {type === "NORMAL" && <Layers size={10} />}
                {type === "PROJECT" && <FolderCode size={10} />}
                {type === "RECRUITER" && <Briefcase size={10} />}
                <span>0{i + 1}. {type}</span>
              </button>
            ))}
          </div>

          {/* Core Content Deck Workspace - Borders completely stripped down, minimal padding */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3.5 scrollbar-none">
            
            {/* ---------------------------------------------------- */}
            {/* WORKSPACE: TAB 1 (NORMAL VIEWPORT MODE) */}
            {/* ---------------------------------------------------- */}
            {activeType === "NORMAL" && (
              <div className="space-y-3.5 animate-in fade-in-40 duration-100">
                
                {/* Embedded Inline Profile Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-6 h-6 flex items-center justify-center border transition-all shrink-0",
                      isAnonymous ? "bg-zinc-900 border-zinc-900 text-zinc-400" : "bg-zinc-100 border-zinc-200"
                    )}>
                      {isAnonymous ? <EyeOff size={10} /> : <img src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp" alt="Avatar" className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex items-baseline gap-1.5 leading-none">
                      <span className={cn("text-[11px] font-mono font-bold uppercase", isAnonymous ? "text-zinc-500" : "text-zinc-900")}>
                        {isAnonymous ? "ANONYMOUS_NODE" : "Alex Rivers"}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-400">
                        {isAnonymous ? "[SECURE]" : "@alexrivers"}
                      </span>
                    </div>
                  </div>

                  {/* Inline Identity Switcher */}
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider border cursor-pointer transition-all",
                      isAnonymous ? "bg-zinc-900 border-zinc-900 text-white" : "text-zinc-400 border-zinc-200 hover:text-zinc-900"
                    )}
                  >
                    <span>ANON</span>
                    {isAnonymous ? <EyeOff size={8} /> : <Eye size={8} />}
                  </button>
                </div>

                {/* Content Area Input */}
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Broadcast an update or system message down the pipeline..."
                  className="w-full min-h-24 bg-transparent border-none focus:ring-0 outline-none font-mono text-xs text-zinc-900 placeholder:text-zinc-300 resize-none overflow-hidden p-0"
                  rows={2}
                />

                {/* Media Image Field Wrapper */}
                {images.length > 0 && (
                  <div className={cn("grid gap-1 bg-zinc-50 border border-zinc-200 p-1", images.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
                    {images.map((src, idx) => (
                      <div key={idx} className="relative bg-white aspect-video">
                        <img src={src} alt="Matrix asset upload" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1.5 right-1.5 p-0.5 bg-zinc-950 text-white hover:bg-black transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Poll Metric Selection Array Layout */}
                {showPoll && (
                  <div className="border border-zinc-200 bg-white">
                    <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-200 bg-zinc-50">
                      <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                        <div className="w-1 h-1 bg-zinc-400" /> Attached_Poll_Params
                      </span>
                      <button onClick={() => setShowPoll(false)} className="text-zinc-400 hover:text-zinc-900"><X size={10} /></button>
                    </div>
                    <div className="divide-y divide-zinc-100">
                      {pollOptions.map((opt, i) => (
                        <div key={i} className="flex items-stretch h-7">
                          <div className="w-8 flex items-center justify-center bg-zinc-50 border-r border-zinc-100 text-[8px] font-mono text-zinc-400">0{i + 1}</div>
                          <input
                            value={opt}
                            onChange={(e) => {
                              const updated = [...pollOptions]; updated[i] = e.target.value; setPollOptions(updated);
                            }}
                            placeholder="INPUT PARAMETER VALUE..."
                            className="flex-1 px-2 text-[10px] uppercase outline-none bg-white font-mono text-zinc-700 placeholder:text-zinc-200"
                          />
                          {pollOptions.length > 2 && (
                            <button
                              type="button"
                              onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))}
                              className="w-7 border-l border-zinc-100 text-zinc-300 hover:text-red-600 flex items-center justify-center"
                            >
                              <Trash2 size={10} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {pollOptions.length < 4 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions([...pollOptions, ""])}
                        className="w-full h-6 text-[8px] font-mono font-bold uppercase text-zinc-400 border-t border-zinc-100 bg-zinc-50/30 hover:bg-zinc-50 cursor-pointer"
                      >
                        + Add Choice Block
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* WORKSPACE: TAB 2 (PROJECT PORTFOLIO SPECIFICATIONS) */}
            {/* ---------------------------------------------------- */}
            {activeType === "PROJECT" && (
              <div className="space-y-3.5 animate-in fade-in-40 duration-100 text-left">
                
                {/* Clean Embedded Identity String */}
                <div className="flex items-center gap-1.5 pb-1 border-b border-zinc-100">
                  <img src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp" alt="Avatar" className="w-4 h-4 border border-zinc-200" />
                  <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase">Alex Rivers // Project Upload Portfolio</span>
                </div>

                {/* Sub-grid Input Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  <div className="sm:col-span-2 border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                    <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none">Project Name</label>
                    <input
                      type="text"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      placeholder="DISTRIBUTED CORE ENGINE"
                      className="w-full text-xs font-mono font-bold text-zinc-900 bg-transparent outline-none uppercase placeholder:text-zinc-200"
                    />
                  </div>
                  <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                    <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-0.5">
                      <Calendar size={8} /> Year
                    </label>
                    <input
                      type="text"
                      value={projYear}
                      onChange={(e) => setProjYear(e.target.value)}
                      placeholder="2026"
                      className="w-full text-xs font-mono text-zinc-900 bg-transparent outline-none placeholder:text-zinc-200"
                    />
                  </div>
                  <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                    <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-0.5">
                      <Clock size={8} /> Duration
                    </label>
                    <input
                      type="text"
                      value={projDuration}
                      onChange={(e) => setProjDuration(e.target.value)}
                      placeholder="3 MONTHS"
                      className="w-full text-xs font-mono text-zinc-900 bg-transparent outline-none uppercase placeholder:text-zinc-200"
                    />
                  </div>
                </div>

                {/* Description Text Input Area */}
                <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                  <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none">System Architecture Description</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Provide execution details, implementation strategies, and stack design rules..."
                    className="w-full min-h-14 text-xs font-mono text-zinc-900 bg-transparent outline-none resize-none pt-0.5 placeholder:text-zinc-200"
                    rows={2}
                  />
                </div>

                {/* Tech Matrix Configuration Field */}
                <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                  <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-1">
                    <Cpu size={8} /> Technology Matrix Stack (Comma Array Tokens)
                  </label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="RUST, WASM, DOCKER, KUBERNETES, ROCKSDB"
                    className="w-full text-xs font-mono text-zinc-800 font-bold bg-transparent outline-none uppercase placeholder:text-zinc-200 tracking-wide"
                  />
                </div>

                {/* Engineering Roadblocks Case Field */}
                <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                  <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-1">
                    <AlertTriangle size={8} className="text-zinc-400" /> Engineering Roadblocks & Strategic Resolutions
                  </label>
                  <textarea
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    placeholder="Describe memory management scaling anomalies or protocol structural constraints handled..."
                    className="w-full min-h-10 text-xs font-mono text-zinc-900 bg-transparent outline-none resize-none pt-0.5 placeholder:text-zinc-200"
                    rows={1}
                  />
                </div>

                {/* External Hyperlink Deployment Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                    <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-0.5">
                      <LinkIcon size={8} /> Live Target Infrastructure Endpoint URL
                    </label>
                    <input
                      type="url"
                      value={projLink}
                      onChange={(e) => setProjLink(e.target.value)}
                      placeholder="https://runtime.noda.io"
                      className="w-full text-xs font-mono text-zinc-600 bg-transparent outline-none placeholder:text-zinc-200"
                    />
                  </div>
                  <div className="border border-zinc-200 p-1.5 flex flex-col gap-0.5">
                    <label className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-wide leading-none flex items-center gap-0.5">
                      <Github size={8} /> Codebase Version Control Repository Link
                    </label>
                    <input
                      type="url"
                      value={repoLink}
                      onChange={(e) => setRepoLink(e.target.value)}
                      placeholder="https://github.com/repository/engine"
                      className="w-full text-xs font-mono text-zinc-600 bg-transparent outline-none placeholder:text-zinc-200"
                    />
                  </div>
                </div>

                {/* Upload Thumbnail Previews inside Grid layout */}
                {images.length > 0 && (
                  <div className="grid grid-cols-4 gap-1 border border-zinc-200 p-1 bg-zinc-50">
                    {images.map((src, idx) => (
                      <div key={idx} className="relative aspect-video bg-white border border-zinc-100 p-0.5">
                        <img src={src} alt="Preview element" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-zinc-950 text-white"
                        >
                          <X size={6} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* WORKSPACE: TAB 3 (RECRUITER ACTIVE DATA BROKER) */}
            {/* ---------------------------------------------------- */}
            {activeType === "RECRUITER" && (
              <div className="space-y-3.5 animate-in fade-in-40 duration-100 text-left">
                
                {/* Simplified Recruiter Identity Track */}
                <div className="flex items-center gap-1.5 pb-1 border-b border-zinc-100">
                  <img src="https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp" alt="Avatar" className="w-4 h-4 border border-zinc-200" />
                  <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase">Alex Rivers // Pipeline Re-Broadcast Console</span>
                </div>

                <p className="text-[10px] font-mono text-zinc-400 px-0.5 leading-tight">
                  Select an available deployment listing template to fire it onto the active global feed layout layer.
                </p>

                {/* Database Options List Block */}
                <div className="flex flex-col border border-zinc-200 divide-y divide-zinc-200">
                  {MOCK_ACTIVE_JOBS.map((job) => {
                    const isSelected = selectedJobId === job.id;
                    return (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJobId(job.id)}
                        className={cn(
                          "p-2 flex items-center justify-between cursor-pointer transition-all font-mono",
                          isSelected ? "bg-zinc-950 text-white" : "bg-white text-zinc-800 hover:bg-zinc-50"
                        )}
                      >
                        <div className="flex flex-col gap-0.5 text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold uppercase tracking-tight">{job.title}</span>
                            <span className={cn("text-[7px] border px-1 font-bold uppercase tracking-wide", isSelected ? "border-zinc-800 bg-zinc-900 text-zinc-400" : "border-zinc-200 bg-zinc-50 text-zinc-500")}>
                              {job.location}
                            </span>
                          </div>
                          <div className="flex gap-3 text-[8px] opacity-70">
                            <span>DEPT: {job.department}</span>
                            <span>ID: {job.id}</span>
                          </div>
                        </div>

                        <div className={cn(
                          "w-2.5 h-2.5 border flex items-center justify-center shrink-0 ml-4",
                          isSelected ? "border-white bg-white" : "border-zinc-300 bg-zinc-50"
                        )}>
                          {isSelected && <div className="w-1 h-1 bg-zinc-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Unified Tool Operations Footer Tray */}
          <div className="flex items-center gap-1 p-2 bg-zinc-50 border-t border-zinc-200 shrink-0">
            <input
              type="file"
              hidden
              ref={fileInputRef}
              multiple
              onChange={handleImageUpload}
              disabled={images.length >= 4 || activeType === "RECRUITER"}
            />
            
            {/* Low-profile Action Elements */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "px-2 py-1 text-[9px] font-mono font-bold items-center gap-1 transition-colors border rounded-none flex h-7 bg-white",
                activeType !== "RECRUITER" && images.length < 4
                  ? "border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400 cursor-pointer"
                  : "border-zinc-100 text-zinc-300 pointer-events-none bg-zinc-50"
              )}
              disabled={activeType === "RECRUITER" || images.length >= 4}
            >
              <ImageIcon size={10} />
              <span>IMAGE ({images.length}/4)</span>
            </button>

            {activeType === "NORMAL" && (
              <button
                type="button"
                onClick={() => setShowPoll(!showPoll)}
                className={cn(
                  "px-2 py-1 text-[9px] font-mono font-bold items-center gap-1 transition-colors border rounded-none flex h-7 cursor-pointer",
                  showPoll ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 text-zinc-600 hover:text-black hover:border-zinc-400"
                )}
              >
                <BarChart2 size={10} />
                <span>POLL</span>
              </button>
            )}

            {/* Broadcast Action Executer */}
            <div className="ml-auto flex items-center gap-2">
              <button 
                disabled={
                  (activeType === "RECRUITER" && !selectedJobId) || 
                  (activeType === "PROJECT" && (!projTitle || !text)) ||
                  (activeType === "NORMAL" && !text && images.length === 0)
                }
                className="bg-zinc-900 hover:bg-black disabled:bg-zinc-200 disabled:text-zinc-400 disabled:border-zinc-200 text-white text-[9px] rounded-none h-7 px-4 font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:cursor-not-allowed border border-zinc-900"
              >
                Execute_Broadcast
              </button>
            </div>
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
}