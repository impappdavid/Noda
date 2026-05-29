import React, { useState } from "react";
import {
  MoreHorizontal,
  BarChart3,
  Bookmark,
  Share,
  Lightbulb,
  Cpu,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

// --- 1. COMPACT VOTE MODULE ---
const VoteCounter = ({ id }: { id: string }) => {
  const [score, setScore] = useState(Math.floor(Math.random() * 100));
  const [userVote, setUserVote] = useState<number | null>(null); // 1, -1, or null

  const handleVote = (dir: number) => {
    if (userVote === dir) {
      setUserVote(null);
      setScore(score - dir);
    } else {
      setScore(score + dir - (userVote || 0));
      setUserVote(dir);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 min-w-[40px]">
      <button 
        onClick={() => handleVote(1)}
        className={cn("p-1 transition-colors hover:bg-zinc-200 cursor-pointer", userVote === 1 ? "text-blue-600" : "text-zinc-400 hover:text-blue-500")}
      >
        <ChevronUp size={20} strokeWidth={3} />
      </button>
      <span className={cn("text-xs font-mono font-black", userVote === 1 ? "text-blue-600" : userVote === -1 ? "text-red-600" : "text-zinc-900")}>
        {score}
      </span>
      <button 
        onClick={() => handleVote(-1)}
        className={cn("p-1 transition-colors hover:bg-zinc-200 cursor-pointer", userVote === -1 ? "text-red-600" : "text-zinc-400 hover:text-red-500")}
      >
        <ChevronDown size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default function IdeaFeed() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const ideaEntries = [
    {
      id: "IDE-992",
      type: "CONCEPT",
      title: "Self-Healing Fiber Mesh",
      author: { username: "arivers", role: "Materials Lead" },
      postedAgo: "12m",
      content: "Exploring a synthetic polymer that reacts to oxygen exposure by hardening into a crystalline structure—effectively sealing micro-fractures.",
      images: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"],
    },
    {
      id: "IDE-441",
      type: "PROTOTYPE",
      title: "Modular OS Kernel Interface",
      author: { username: "mv_arch", role: "Systems Architect" },
      postedAgo: "2h",
      content: "Direct memory mapping for the new driver abstraction layer. Moving away from monolithic calls toward a message-bus architecture.",
      images: ["https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000"],
    }
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white border-x border-zinc-200 min-h-screen">
      {ideaEntries.map((post) => (
        <div key={post.id} className="flex gap-4 p-3 border-b border-zinc-300 hover:bg-zinc-100/50 transition-all group">
          
          {/* LEFT COLUMN: VOTING */}
          <VoteCounter id={post.id} />

          {/* RIGHT COLUMN: CONTENT */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono font-black text-blue-600 uppercase border border-blue-600 px-1 leading-none py-0.5">
                    {post.type}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 tracking-tight uppercase leading-none">{post.title}</h3>
                </div>
                {/* Tighter User Info */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-zinc-500 font-bold hover:underline cursor-pointer">@{post.author.username}</span>
                  <span className="text-[10px] font-mono text-zinc-300">|</span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">{post.author.role}</span>
                  <span className="text-[10px] font-mono text-zinc-300">•</span>
                  <span className="text-[10px] font-mono text-zinc-500">{post.postedAgo}</span>
                </div>
              </div>
              <button className="text-zinc-300 hover:text-zinc-900"><MoreHorizontal size={16}/></button>
            </div>

            <p className="text-sm text-zinc-700 leading-snug mt-2 ">
              {post.content}
            </p>

            {post.images && (
              <div className="mt-3  aspect-video overflow-hidden relative cursor-pointer group/img" 
                onClick={() => { setSelectedImg(post.images[0]); setSelectedPost(post); setDialogOpen(true); }}>
                <img src={post.images[0]} className="w-full h-full object-cover transition-all duration-500" alt="tech" />
                <div className="absolute inset-0 bg-blue-600/5  transition-opacity" />
              </div>
            )}

            {/* Bottom Utility Bar (No likes/comments) */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-zinc-400 uppercase">
                <span className="flex items-center gap-1"><BarChart3 size={12} /> Analytics_Ready</span>
                <span className="text-zinc-200">/</span>
                <span className="flex items-center gap-1">ID_{post.id}</span>
              </div>
              <div className="flex items-center gap-3">
                <Share size={14} className="text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>
      ))}

      
    </div>
  );
}