import React, { useState } from "react";
import { ChevronUp, ChevronDown, MessageSquare, Eye, ShieldCheck } from "lucide-react";

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default function IdeaGridFeed() {
  const ideas = [
    {
      id: "IDEA-4061",
      title: "OpenAI Begins Hyper-realistic Voice Rollout",
      summary: "OpenAI has begun rolling out its highly anticipated Advanced Voice Mode for ChatGPT, offering select Plus subscribers access to hyper-realistic audio interactions powered by the GPT-4o model.",
      classification: "A.I. ENGINE",
      metrics: {
        views: "47,770",
        replies: "4,061",
        timeAgo: "13 days ago",
        readTime: "2 min read"
      },
      curator: {
        name: "TechCrunch",
        handle: "techcrunch",
        verified: true
      },
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000"
    },
    {
      id: "IDEA-9921",
      title: "Next-Gen Quantum Hardware Layers Abstraction",
      summary: "A fundamental rewrite of structural driver nodes enabling cryo-cooled chip frameworks to interpret direct logical registers without standard middleware instruction pipelines.",
      classification: "HARDWARE",
      metrics: {
        views: "12,430",
        replies: "892",
        timeAgo: "2 days ago",
        readTime: "5 min read"
      },
      curator: {
        name: "arivers",
        handle: "materials_lead",
        verified: true
      },
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"
    }
  ];

  return (
    // Outer grid container without outer padding to ensure full-width grid alignments
    <div className="w-full bg-white border-t border-zinc-300 grid grid-cols-2 gap-0 items-start font-mono text-left select-none">
      {ideas.map((post) => {
        const [votes, setVotes] = useState(Math.floor(Math.random() * 500) + 100);
        const [activeVote, setActiveVote] = useState<number | null>(null);

        const handleVoteSubmit = (direction: number) => {
          if (activeVote === direction) {
            setActiveVote(null);
            setVotes(votes - direction);
          } else {
            setVotes(votes + direction - (activeVote || 0));
            setActiveVote(direction);
          }
        };

        return (
          <div 
            key={post.id} 
            className="w-full bg-white border-r border-b border-zinc-300 last:border-r-0 flex flex-col justify-between"
          >
            <div>
              {/* CELL SECTION 01: CLASSIFICATION BANNER */}
              <div className="w-full border-b border-zinc-300 px-3 py-1.5 flex items-center justify-between bg-white">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black tracking-wider text-blue-600 uppercase">
                    {post.classification}
                  </span>
                  <span className="text-[9px] text-zinc-300 font-normal">//</span>
                  <span className="text-[9px] text-zinc-400 font-bold">{post.id}</span>
                </div>
                <span className="text-[8px] font-black text-zinc-400">
                  {post.metrics.timeAgo.toUpperCase()}
                </span>
              </div>

              {/* CELL SECTION 02: IMAGE CANVAS (Changed to a wider 21:9 ratio to save vertical space) */}
              <div className="w-full aspect-[21/9] overflow-hidden relative border-b border-zinc-300 bg-zinc-100">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover pointer-events-none" 
                  alt="" 
                />
              </div>

              {/* CELL SECTION 03: SPEC SPLIT LAYOUT */}
              <div className="w-full grid grid-cols-2 gap-0 border-b border-zinc-300 items-stretch bg-white">
                {/* SUBCELL LEFT: TITLE */}
                <div className="border-r border-zinc-300 p-2.5 flex flex-col justify-start">
                  <span className="text-[7px] font-black text-zinc-400 tracking-widest uppercase block mb-0.5">
                    DESIGNATION_TITLE
                  </span>
                  <h3 className="text-[11px] font-black text-zinc-900 uppercase tracking-tight leading-tight">
                    {post.title}
                  </h3>
                </div>

                {/* SUBCELL RIGHT: AUTHOR INFO */}
                <div className="p-2.5 flex flex-col justify-start bg-zinc-50/20">
                  <span className="text-[7px] font-black text-zinc-400 tracking-widest uppercase block mb-0.5">
                    SOURCE_METADATA
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-black text-zinc-800 uppercase tracking-tight truncate">
                      @{post.curator.handle}
                    </span>
                    {post.curator.verified && (
                      <ShieldCheck size={10} className="text-blue-500 shrink-0" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-[8px] font-bold text-zinc-400 uppercase">
                    via {post.curator.name}
                  </span>
                </div>
              </div>

              {/* CELL SECTION 04: CONTENT ACCORDION FRAME */}
              <div className="w-full p-3 bg-white border-b border-zinc-300">
                <p className="text-[11px] text-zinc-600 font-sans leading-normal tracking-normal select-text line-clamp-3">
                  {post.summary}
                </p>
              </div>

              {/* CELL SECTION 05: METRICS CONTROL GRID */}
              <div className="w-full grid grid-cols-3 gap-0 border-b border-zinc-300 text-[8px] font-black text-zinc-400 uppercase tracking-widest h-7 bg-white items-stretch">
                <div className="border-r border-zinc-300 px-2 flex items-center gap-1">
                  <Eye size={10} className="text-zinc-400" />
                  <span>{post.metrics.views}</span>
                </div>
                <div className="border-r border-zinc-300 px-2 flex items-center gap-1">
                  <MessageSquare size={10} className="text-zinc-400" />
                  <span>{post.metrics.replies}</span>
                </div>
                <div className="px-2 flex items-center justify-center text-zinc-500">
                  <span>{post.metrics.readTime}</span>
                </div>
              </div>
            </div>

            {/* CELL SECTION 06: ATTACHED BOTTOM VOTING TRAY */}
            <div className="w-full bg-blue-500 grid grid-cols-[36px_1fr_36px] gap-0 h-9 items-stretch text-white text-[9px] font-black uppercase tracking-wider">
              {/* DECREMENT BUTTON */}
              <button
                type="button"
                onClick={() => handleVoteSubmit(-1)}
                className={cn(
                  "h-full flex items-center justify-center border-r border-blue-600/60 transition-colors outline-none cursor-pointer rounded-none",
                  activeVote === -1 ? "bg-red-500 text-white" : "hover:bg-blue-600 text-blue-100"
                )}
              >
                <ChevronDown size={14} strokeWidth={3} />
              </button>

              {/* INTERACTIVE VALUE COUNTER DISPLAY */}
              <div className="h-full flex flex-col items-center justify-center border-r border-blue-600/60 bg-blue-500 select-none">
                <span className="text-[6px] tracking-widest opacity-70 leading-none">VOTE_MATRIX</span>
                <span className="text-[10px] font-black mt-0.5 leading-none tracking-tight">{votes}</span>
              </div>

              {/* INCREMENT BUTTON */}
              <button
                type="button"
                onClick={() => handleVoteSubmit(1)}
                className={cn(
                  "h-full flex items-center justify-center transition-colors outline-none cursor-pointer rounded-none",
                  activeVote === 1 ? "bg-blue-700 text-white" : "hover:bg-blue-600 text-blue-100"
                )}
              >
                <ChevronUp size={14} strokeWidth={3} />
              </button>
            </div>

          </div>
        );
      })}
    </div>
  );
}