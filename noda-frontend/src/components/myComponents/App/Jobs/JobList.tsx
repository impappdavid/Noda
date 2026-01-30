import { MoreHorizontal } from "lucide-react";

const MinimalistJobList = ({ jobs, selectedJob, onSelect }: any) => {

    return (
        <div className="flex flex-col border-t border-zinc-100 pt-13">
            {jobs.map((job: any) => {
                const isSelected = selectedJob.id === job.id;

                return (
                    <div
                        key={job.id}
                        onClick={() => onSelect(job)}
                        className={`group p-3 border-b border-zinc-300 transition-all cursor-pointer flex flex-col duration-200 ${
                            isSelected ? "bg-orange-200" : "bg-white hover:bg-zinc-200/60 "
                        }`}
                    >
                        {/* Top Row: Protocol ID & Actions */}
                        <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                                isSelected ? "text-zinc-500" : "text-zinc-400"
                            }`}>
                                JOB-{job.id}
                            </span>
                            <div className="flex items-center gap-2">
                                {/* Match Percentage Pill */}
                                <span className={`text-[10px] font-mono font-bold flex items-center justify-center px-1.5 py-0.5 rounded border ${
                                    isSelected 
                                        ? (job.match > 90 ? 'border-orange-600/80 text-orange-600 ' : 'border-zinc-800 text-zinc-800')
                                        : (job.match > 90 ? 'bg-orange-500/20 border-transparent text-orange-600' : 'bg-zinc-200 border-transparent text-zinc-500')
                                }`}>
                                    {job.match}%
                                </span>
                                <MoreHorizontal className={`w-3.5 h-3.5 transition-colors text-zinc-600`} />
                            </div>
                        </div>

                        {/* Middle Row: Primary Identity */}
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <h3 className={`text-sm font-bold truncate transition-colors ${
                                    isSelected ? "text-black" : "text-zinc-900"
                                }`}>
                                    {job.role}
                                </h3>
                                <div className={`flex items-center gap-2 text-[11px] transition-colors text-zinc-500`}>
                                    <span className="font-medium">{job.company}</span>
                                    <span className={isSelected ? "text-zinc-700" : "text-zinc-400"}>•</span>
                                    <span className="truncate">{job.location}</span>
                                    <span className={isSelected ? "text-zinc-700" : "text-zinc-400"}>•</span>
                                    <span className="truncate">{job.experience}</span>
                                </div>
                            </div>

                           
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MinimalistJobList;