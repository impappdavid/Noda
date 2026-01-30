import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

const jobData = [
    { id: 43, company: "Taco Bell", role: "Oven installation", location: "Kansas City, 88943", status: "Live", match: 96 },
    { id: 44, company: "Vercel", role: "Frontend Deployment", location: "Remote", status: "Live", match: 92 },
    { id: 45, company: "OpenAI", role: "GPU Cluster Setup", location: "SF / Remote", status: "Closed", match: 88 }
];

const MinimalistJobList = () => {
    const [selectedJob, setSelectedJob] = useState(jobData[0]);

    return (
        <div className="flex flex-col border-t border-zinc-100">
            {jobData.map((job) => {
                const isSelected = selectedJob.id === job.id;

                return (
                    <div
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className={`group p-3 border-b border-zinc-300 transition-all cursor-pointer flex flex-col gap-1.5 duration-200 ${
                            isSelected ? "bg-zinc-800" : "bg-white hover:bg-zinc-50"
                        }`}
                    >
                        {/* Top Row: Protocol ID & Actions */}
                        <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                                isSelected ? "text-zinc-400" : "text-zinc-400"
                            }`}>
                                JOB-{job.id}
                            </span>
                            <div className="flex items-center gap-2">
                                {/* Match Percentage Pill */}
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                    isSelected 
                                        ? (job.match > 90 ? 'border-orange-500/50 text-orange-400' : 'border-zinc-700 text-zinc-400')
                                        : (job.match > 90 ? 'bg-orange-500/10 border-transparent text-orange-600' : 'bg-zinc-100 border-transparent text-zinc-500')
                                }`}>
                                    {job.match}%
                                </span>
                                <MoreHorizontal className={`w-3.5 h-3.5 transition-colors ${
                                    isSelected ? "text-zinc-500 hover:text-white" : "text-zinc-300 hover:text-zinc-600"
                                }`} />
                            </div>
                        </div>

                        {/* Middle Row: Primary Identity */}
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <h3 className={`text-sm font-bold truncate transition-colors ${
                                    isSelected ? "text-white" : "text-zinc-900"
                                }`}>
                                    {job.role}
                                </h3>
                                <div className={`flex items-center gap-2 text-[11px] transition-colors ${
                                    isSelected ? "text-zinc-400" : "text-zinc-500"
                                }`}>
                                    <span className="font-medium">{job.company}</span>
                                    <span className={isSelected ? "text-zinc-700" : "text-zinc-300"}>•</span>
                                    <span className="truncate">{job.location}</span>
                                </div>
                            </div>

                            {/* Status Signal */}
                            {job.status === "Live" && (
                                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-colors ${
                                    isSelected 
                                        ? "bg-emerald-500/10 border-emerald-500/20" 
                                        : "bg-emerald-50 border-emerald-100"
                                }`}>
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${
                                        isSelected ? "text-emerald-400" : "text-emerald-600"
                                    }`}>
                                        Live
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MinimalistJobList;