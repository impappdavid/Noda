import React, { useState } from "react";
import {
  Globe,
  ShieldAlert,
  Users,
  EyeOff,
  Eye,
  Send,
  UserCheck,
  MessageSquare,
  MessageSquarePlus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import type { Company } from "@/types/companies";
import { Link } from "react-router-dom";


const CompanyInfo = ({ selectedCompany }: { selectedCompany: Company }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleSubmitFeedback = () => {
    setIsFeedbackOpen(false);
    // Reset Logic
    setComment("");
  };



  return (
    <div className="flex flex-col h-full bg-white overflow-hidden border-zinc-300  font-sans">
      {/* 1. Header Protocol */}
      <div className="p-2 border-b border-zinc-300 flex items-center justify-between bg-zinc-50/50 h-13 shrink-0">
        <div className="space-y-0.5">
          <Link
            to={`/app/company/${selectedCompany.name}`}
            className="text-sm font-bold uppercase tracking-tight text-zinc-900 hover:underline"
          >
            {selectedCompany.name}
          </Link>
          <div className="flex items-center gap-3 text-[9px] font-mono font-black uppercase text-zinc-500">
            <Link
              to={`https://${selectedCompany.name.toLowerCase()}.com`}
              target="__blank"
              className="flex items-center gap-1 hover:text-zinc-900 cursor-pointer transition-colors"
            >
              <Globe size={10} /> WEB.NODE
            </Link>
            <span className="flex items-center gap-1 border-l border-zinc-300 pl-3">
              <Users size={10} /> {selectedCompany.employees} EMP
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-base font-mono font-black text-zinc-900 tracking-tighter leading-none uppercase">
              {selectedCompany.responseVelocity}
            </span>
          </div>
          <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest mt-0.5">
            Global Latency
          </span>
        </div>
      </div>

      {/* 2. REGISTRY INFO PANEL - VERTICAL STACK */}
      <div className="flex flex-col divide-y divide-zinc-200 border-b border-zinc-300 shrink-0 bg-white">
        <div className="px-2 py-2 flex items-center justify-between">
          <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">
            Total Comments
          </span>
          <div className="flex items-center gap-1.5">
            <MessageSquare size={10} className="text-zinc-500" />
            <span className="text-[11px] font-black text-zinc-900 font-mono tracking-tighter">
              {selectedCompany.reviews}{" "}
              <span className="text-zinc-500 font-bold uppercase text-[9px]">
                Comment
              </span>
            </span>
          </div>
        </div>

        <div className="px-2 py-3 space-y-2 bg-zinc-50/20">
          <div className="flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
              <UserCheck size={11} className="text-zinc-500" />
              <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-tight">
                Employee Response
              </span>
            </div>
            <span className="text-[10px] font-black text-zinc-900 font-mono">
              {"< 24H"}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Recent Intelligence Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-hide border-b border-zinc-300 bg-white">
        <div className="px-2 py-2 border-b border-zinc-300 bg-white flex items-center justify-between sticky top-0 z-10">
          <h4 className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">
            Comments
          </h4>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">
              Sync_OK
            </span>
          </div>
        </div>
        {/* Feed Item */}
        <div className="p-2 bg-white hover:bg-zinc-50/50 transition-colors cursor-default group border-b border-zinc-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-zinc-900 flex items-center justify-center border border-zinc-800">
                <ShieldAlert size={10} className="text-white" />
              </div>
              <span className="text-[11px] font-medium text-zinc-900 tracking-tighter">
                @anonymus
              </span>
            </div>
            <div className="flex items-center gap-2">
              
              <span className="text-[9px] text-zinc-500 font-mono font-black uppercase tracking-tighter">
                2h ago
              </span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed font-medium tracking-tight group-hover:text-zinc-900 transition-colors text-left">
            Infrastructure response time is stable. No ghosting detected during
            current deployment cycle.
          </p>
        </div>
      </div>

      {/* 4. FEEDBACK DIALOG */}
      <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
        <DialogTrigger asChild>
          <button className="w-full h-12 bg-zinc-900 flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-[0.99] shrink-0 cursor-pointer border-none outline-none group">
            <MessageSquarePlus
              size={14}
              className="text-white transition-all"
            />
            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">
              Comment
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
          <DialogHeader className="bg-zinc-200 p-2 text-black flex flex-row items-center justify-between space-y-0 shrink-0">
            <div className="flex items-center gap-2 ">
              <DialogTitle className="text-[11px] font-mono font-black uppercase tracking-wider">
                {selectedCompany.name} Company Review
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <button className="bg-transparent p-1 hover:bg-zinc-300 cursor-pointer text-zinc-500 hover:text-black transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </DialogClose>
          </DialogHeader>

          <div className="">
            {/* Relationship Selector */}

            

            {/* Log Input */}
            <div className="text-left">
              <label className="text-[10px] p-2 border-b border-zinc-300 font-mono font-black text-zinc-700 block ">
                01 / Detailed Experience (Min. 10character)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your own opinion..."
                className="w-full h-24 p-3 bg-zinc-50 text-xs font-mono outline-none resize-none placeholder:text-zinc-500"
              />
            </div>

            {/* RESTORED ANONYMOUS UPLINK SECTION */}
            <div className="flex items-center justify-between p-2 bg-zinc-50/50 border border-dashed border-zinc-200 px-3 py-3">
              <div className="flex items-center gap-3 text-left">
                {isAnonymous ? (
                  <EyeOff size={16} className="text-blue-600" />
                ) : (
                  <Eye size={16} className="text-zinc-400" />
                )}
                <div>
                  <p className="text-[11px] font-mono font-black text-zinc-900 uppercase leading-none mb-1">
                    Anonymous Comment
                  </p>
                  <p className="text-[10px] font-mono text-zinc-600 uppercase leading-none ">
                    You will be not connected to this comment
                  </p>
                </div>
              </div>
              <Switch
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
                className="scale-75 data-[state=checked]:bg-blue-500 cursor-pointer"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex">
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className=" w-1/2 h-10  text-[11px] font-mono font-black text-zinc-500 hover:text-white uppercase hover:bg-red-500 cursor-pointer bg-zinc-200 transition-colors"
              >
                Abort
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={comment.length < 10}
                className=" w-1/2  h-10 bg-blue-500 text-white text-[11px] font-mono font-black uppercase hover:bg-blue-600 disabled:bg-zinc-200 disabled:text-zinc-500 flex items-center justify-center gap-2 cursor-pointer border-none transition-all"
              >
                <Send size={12} /> Send Comment
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default React.memo(CompanyInfo);
