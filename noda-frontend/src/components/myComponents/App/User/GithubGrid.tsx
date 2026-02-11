import React, { useMemo } from 'react';
import { Github } from 'lucide-react';
import { cn } from "@/lib/utils";

const GithubGrid: React.FC = () => {
    // We memoize the grid data so random colors don't change on every re-render
    const columns = useMemo(() => 
        Array.from({ length: 48 }).map(() => 
            Array.from({ length: 7 }).map(() => Math.random())
        ), []);

    return (
        <div className="p-3 border-b border-zinc-300 w-full bg-white shrink-0">
            <h3 className="text-[8px] font-mono font-black text-zinc-900 uppercase tracking-[0.3em] flex items-center gap-2 mb-3">
                <Github size={12} /> Github.Activity_Grid
            </h3>
            <div className="flex gap-[2px] overflow-hidden justify-between bg-zinc-50/50 p-3 border border-zinc-100">
                {columns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-[2px]">
                        {col.map((intensity, rowIdx) => (
                            <div 
                                key={rowIdx} 
                                className={cn(
                                    "w-[7px] h-[7px] shrink-0", 
                                    intensity > 0.85 ? "bg-emerald-600" : 
                                    intensity > 0.6 ? "bg-emerald-400" : 
                                    intensity > 0.3 ? "bg-emerald-200" : "bg-zinc-100"
                                )} 
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(GithubGrid);