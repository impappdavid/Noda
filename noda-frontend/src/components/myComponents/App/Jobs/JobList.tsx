const MinimalistJobList = ({ jobs, selectedJob, onSelect }: any) => {

    return (
        <div className="flex flex-col">
            {jobs.map((job: any) => {
                const isSelected = selectedJob.id === job.id;

                return (
                    <div
                        key={job.id}
                        onClick={() => onSelect(job)}
                        className={`group p-3 border-b border-zinc-300 transition-all cursor-pointer flex flex-col duration-200 ${
                            isSelected ? "bg-zinc-200" : "bg-white hover:bg-zinc-200/60 "
                        }`}
                    >
                        {/* Top Row: Protocol ID & Actions */}
                        <div className="flex justify-between items-center">
                            <span className={`text-[10px] font-mono uppercase tracking-wide font-bold ${
                                isSelected ? "text-zinc-600" : "text-zinc-500"
                            }`}>
                                {job.company}
                            </span>
                            <div className="flex items-center gap-2">
                                {/* Match Percentage Pill */}
                                <span className={`text-[10px] font-mono font-bold flex items-center justify-center px-1.5 py-0.5 rounded border ${
                                    isSelected 
                                        ? (job.match > 90 ? 'bg-sky-500/20 border-sky-500/50 text-sky-600 ' : 'border-zinc-800/50 bg-zinc-500/20 text-zinc-800')
                                        : (job.match > 90 ? 'bg-sky-500/20 border-transparent text-sky-600' : 'bg-zinc-200 border-transparent text-zinc-500')
                                }`}>
                                    {job.match}%
                                </span>
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
                                <div className={`flex items-center gap-2 text-[11px] transition-colors text-zinc-600`}>
                                    <span className="truncate">{job.workMode}</span>
                                    <span className={isSelected ? "text-zinc-700" : "text-zinc-400"}>•</span>
                                    <span className="truncate">{job.experience}</span>
                                    <span className={isSelected ? "text-zinc-700" : "text-zinc-400"}>•</span>
                                    <span className="truncate">{job.type}</span>
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