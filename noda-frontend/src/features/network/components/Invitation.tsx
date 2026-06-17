import { X } from "lucide-react";
import { Link } from "react-router-dom";

export const InvitationRow = ({ person }: any) => (
  <div className="flex flex-col items-start justify-between bg-white hover:bg-zinc-50 transition-colors">
    <div className="p-1.5 bg-zinc-200/80 w-full flex justify-between items-center">
        <div className="text-[10px] text-zinc-600">
            <span className="font-bold text-zinc-900">12 members</span> on your connections are connected to 
            <span className="font-bold pl-1 text-zinc-900">{person.name}</span>
        </div>
    </div>
    <div className="flex p-1.5 justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-zinc-800 text-white flex items-center justify-center font-mono font-black text-xs">
          {person.name[0]}
        </div>
        <div className="flex flex-col justify-center mt-1">
          <span className="text-sm font-bold uppercase tracking-tight leading-none">
            {person.name}
          </span>
          <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-tighter">
            {person.role} at{" "}
            <Link to={"/app/company/vercel"} className="text-zinc-900 font-bold">{person.company}</Link>
          </span>
        </div>
      </div>

      {/* SQUARED ACTION BLOCK */}
      <div className="flex  h-8 gap-1.5">
        <button className="px-3 bg-transparent text-zinc-600 border border-zinc-300 text-[10px] font-bold uppercase hover:text-red-500 hover:border-red-500 transition-colors flex cursor-pointer items-center gap-2">
          Decline
        </button>
        <button className="px-4 bg-blue-500 text-white text-[10px] font-bold uppercase hover:bg-blue-600 transition-all flex cursor-pointer items-center gap-2">
          Accept
        </button>
      </div>
    </div>
  </div>
);
