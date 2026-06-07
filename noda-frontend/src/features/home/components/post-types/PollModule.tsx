import { useState } from "react";
import { motion } from "framer-motion";

export const PollModule = ({ poll }: { poll: any }) => {
  const [voted, setVoted] = useState<number | null>(null);

  return (
    <div
      className="mt-2 border border-zinc-300 bg-white overflow-hidden"
      onClick={(e) => e.preventDefault()}
    >
      <div className="flex justify-between items-center px-2 py-1 h-8 border-b border-zinc-300 bg-zinc-200">
        <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase tracking-wider">
          Question
        </span>
      </div>
      <div className="divide-y divide-zinc-300">
        {poll.options.map((opt: any, i: number) => {
          const percent = poll.totalVotes
            ? Math.round((opt.votes / poll.totalVotes) * 100)
            : 33;
          const isYourVote = voted === i;

          return (
            <button
              key={i}
              onClick={() => voted === null && setVoted(i)}
              className="w-full relative flex items-center h-9 bg-white hover:bg-blue-500/10 transition-colors cursor-pointer text-left"
            >
              {voted !== null && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  className={`absolute inset-y-0 left-0 border-r border-zinc-200 ${
                    isYourVote ? "bg-blue-500/20" : "bg-zinc-500/10"
                  }`}
                />
              )}

              <div className="relative z-10 flex w-full justify-between px-2 items-center">
                <span
                  className={`text-xs font-mono font-bold uppercase ${isYourVote ? "text-blue-600" : "text-zinc-800"}`}
                >
                  {typeof opt === "string" ? opt : opt.label}
                </span>
                {voted !== null && (
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    {percent}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
