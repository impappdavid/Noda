import React from 'react';
import { cn } from "@/lib/utils";
import type { PollOption } from '@/types/post';

interface PollProps {
    options: PollOption[];
    totalVotes: number;
    userVote: number | null;
    onVote: (idx: number) => void;
}

const PollSection: React.FC<PollProps> = ({ options, totalVotes, userVote, onVote }) => {
    const isVoted = userVote !== null;

    return (
        <div className="space-y-2 mb-6">
            {options.map((option, idx) => {
                const percentage = isVoted ? Math.round((option.votes / totalVotes) * 100) : 0;
                return (
                    <button
                        key={idx}
                        onClick={() => !isVoted && onVote(idx)}
                        className={cn(
                            "relative w-full h-9 rounded-none border text-left text-xs px-4 overflow-hidden transition-all",
                            isVoted ? "border-zinc-300 cursor-default" : "border-zinc-300 hover:border-orange-500 hover:bg-orange-500/20 cursor-pointer"
                        )}
                    >
                        {isVoted && (
                            <div className="absolute inset-y-0 left-0 bg-zinc-200 transition-all duration-500" style={{ width: `${percentage}%` }} />
                        )}
                        <div className="relative z-10 flex justify-between items-center h-full">
                            <span className="text-xs font-bold">{option.label}</span>
                            {isVoted && <span className="text-[10px] font-mono font-black">{percentage}%</span>}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default PollSection;