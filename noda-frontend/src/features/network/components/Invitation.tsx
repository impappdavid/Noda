import { X } from "lucide-react";

export const InvitationRow = ({ person }: any) => (
    <div className="flex items-center justify-between p-2 bg-white hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 text-white flex items-center justify-center font-mono font-black text-xs">
                {person.name[0]}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-tight leading-none">{person.name}</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1 tracking-tighter">
                    {person.role} // <span className="text-zinc-900 font-bold">{person.company}</span>
                </span>
            </div>
        </div>

        {/* SQUARED ACTION BLOCK */}
        <div className="flex border border-zinc-300 divide-x divide-zinc-300 h-10">
            <button className="px-4 bg-zinc-800 text-white text-[11px] font-mono font-bold uppercase hover:bg-zinc-900 transition-all flex cursor-pointer items-center gap-2">
                Accept
            </button>
            <button className="px-3 bg-white text-zinc-500 hover:bg-red-500/20 hover:text-red-500 transition-colors cursor-pointer">
                <X size={14} />
            </button>
        </div>
    </div>
);
