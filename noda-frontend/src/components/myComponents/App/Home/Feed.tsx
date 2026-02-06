import React, { useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  BarChart3,
  Bookmark,
  Share,
  Link2,
  EyeOff,
  Flag,
  X as CloseIcon,
  Check
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- UTILITIES ---
const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

// --- DATA SCHEMA ---
const testPosts = [
  {
    id: "p1",
    author: {
      name: "Alex Rivers",
      username: "@arivers",
      role: "Vector Engineer",
      avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=100&auto=format&fit=crop",
    },
    postedAgo: "2h",
    content: "Applying the 14-day anti-ghosting protocol has significantly improved our response velocity. Recruiters are now forced into active engagement or delisting.",
    likes: 24,
    comments: 12,
    views: "1.2k",
    images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"]
  },
  {
    id: "p_poll_1",
    author: {
      name: "Marcus Vane",
      username: "@mv_arch",
      role: "Systems Architect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    postedAgo: "1h",
    content: "Which serialization protocol are you prioritizing for low-latency node clusters in 2026?",
    likes: 89,
    comments: 34,
    views: "5.6k",
    images: [],
    poll: {
      options: [
        { label: "Protocol Buffers", votes: 450 },
        { label: "Cap'n Proto", votes: 120 },
        { label: "FlatBuffers", votes: 310 },
        { label: "MessagePack", votes: 85 }
      ],
      totalVotes: 965,
      hasVoted: false
    }
  },
  {
    id: "p4",
    author: {
      name: "Anonymous Node",
      username: "@encrypted",
      role: "Senior Lead",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=A&backgroundColor=18181b",
    },
    postedAgo: "8h",
    content: "Anonymous Insight: Company X has a 3-stage interview process that focuses heavily on distributed systems. Look at these architecture patterns.",
    likes: 342,
    comments: 45,
    views: "12.1k",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
    ]
  }
];

export default function Feed() {
  const navigate = useNavigate();

  // State for Interactions
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  
  // State for Poll Voting
  const [userVotes, setUserVotes] = useState<Record<string, number | null>>({});

  const handleRedirect = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/app/user/${username}`);
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleVote = (e: React.MouseEvent, postId: string, optionIndex: number) => {
    e.stopPropagation();
    e.preventDefault();
    if (userVotes[postId] !== undefined) return; // Prevent multiple votes
    setUserVotes(prev => ({ ...prev, [postId]: optionIndex }));
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col relative bg-white min-h-screen">
      
      {/* IMAGE LIGHTBOX */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-4 right-4 p-2 hover:bg-zinc-800/80 rounded-full cursor-pointer text-white/50 hover:text-white transition-colors">
            <CloseIcon size={26} />
          </button>
          <img 
            src={selectedImg} 
            className="max-w-full max-h-[90vh] object-contain" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      {/* FEED THREAD */}
      {testPosts.map((post) => (
        <Link 
          to={`/app/post/${post.id}`} 
          key={post.id} 
          className="p-3 border-b border-zinc-300 hover:bg-zinc-200/60 transition-colors group block"
        >
          <div className="flex justify-between items-start mb-1">
            <div className="flex gap-3">
              <div 
                className="w-10 h-10 rounded-full border border-zinc-200 overflow-hidden cursor-pointer active:scale-95 transition-transform"
                onClick={(e) => handleRedirect(e, post.author.name)}
              >
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span 
                    onClick={(e) => handleRedirect(e, post.author.name)}
                    className="text-sm font-black text-zinc-900 hover:underline cursor-pointer"
                  >
                    {post.author.name}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 uppercase">{post.author.username}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                  {post.author.role} • {post.postedAgo}
                </span>
              </div>
            </div>
            <PostOptions />
          </div>

          <div className="pl-13 md:pl-[52px]">
            <p className="text-sm text-zinc-800 leading-relaxed mb-3">
              {post.content}
            </p>

            {/* POLL IMPLEMENTATION */}
            {post.poll && (
                <div className="space-y-2 mb-4 pr-2" onClick={(e) => e.preventDefault()}>
                    {post.poll.options.map((option, idx) => {
                        const isVoted = userVotes[post.id] !== undefined;
                        const userChoice = userVotes[post.id] === idx;
                        const percentage = isVoted 
                            ? Math.round(((option.votes + (userChoice ? 1 : 0)) / (post.poll!.totalVotes + 1)) * 100) 
                            : 0;

                        return (
                            <button
                                key={idx}
                                onClick={(e) => handleVote(e, post.id, idx)}
                                disabled={isVoted}
                                className={cn(
                                    "relative w-full h-9 rounded-lg border text-left px-3 overflow-hidden transition-all group/poll",
                                    isVoted ? "border-zinc-200 cursor-default" : "border-zinc-300 hover:border-zinc-900 cursor-pointer"
                                )}
                            >
                                {/* Percentage Bar */}
                                {isVoted && (
                                    <div 
                                        className={cn(
                                            "absolute inset-y-0 left-0 transition-all duration-1000 ease-out",
                                            userChoice ? "bg-orange-500/10" : "bg-zinc-100"
                                        )}
                                        style={{ width: `${percentage}%` }}
                                    />
                                )}
                                
                                <div className="relative z-10 flex justify-between items-center h-full">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "text-xs font-bold",
                                            userChoice ? "text-orange-600" : "text-zinc-700"
                                        )}>
                                            {option.label}
                                        </span>
                                        {userChoice && <Check size={12} className="text-orange-600" />}
                                    </div>
                                    {isVoted && (
                                        <span className="text-[10px] font-mono font-black text-zinc-500">
                                            {percentage}%
                                        </span>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                    {userVotes[post.id] !== undefined && (
                        <p className="text-[10px] font-mono font-bold text-zinc-400 mt-1 uppercase tracking-widest">
                            {post.poll.totalVotes + 1} Signals_Received • Final_Results
                        </p>
                    )}
                </div>
            )}

            {/* DYNAMIC GRID */}
            {post.images && post.images.length > 0 && (
              <div className={cn(
                "rounded-2xl overflow-hidden border border-zinc-100 grid gap-1 mb-4",
                post.images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                post.images.length >= 3 ? "aspect-square" : "aspect-video"
              )}>
                {post.images.slice(0, 4).map((img, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "relative bg-zinc-100 overflow-hidden cursor-pointer",
                      post.images.length === 3 && idx === 0 ? "row-span-2" : ""
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedImg(img);
                    }}
                  >
                    <img src={img} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                  </div>
                ))}
              </div>
            )}

            {/* ACTION ROW */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button 
                  onClick={(e) => toggleLike(e, post.id)}
                  className={cn(
                    "flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer",
                    likedPosts[post.id] ? "text-orange-600" : "text-zinc-500 hover:text-orange-600"
                  )}
                >
                  <Heart size={16} className={likedPosts[post.id] ? "fill-orange-600" : ""} />
                  {post.likes + (likedPosts[post.id] ? 1 : 0)}
                </button>
                <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                  <MessageSquare size={16} />
                  {post.comments}
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <BarChart3 size={16} />
                  {post.views}
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <button 
                  onClick={(e) => toggleBookmark(e, post.id)}
                  className={bookmarkedPosts[post.id] ? "text-zinc-900 cursor-pointer" : "hover:text-zinc-900 cursor-pointer"}
                >
                  <Bookmark size={16} className={bookmarkedPosts[post.id] ? "fill-zinc-900" : ""} />
                </button>
                <Share size={16} className="hover:text-zinc-900 cursor-pointer" onClick={(e) => e.stopPropagation()} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// --- OPTIONS DROPDOWN COMPONENT ---
function PostOptions() {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button 
          className="text-zinc-500 hover:text-zinc-900 p-1.5 rounded-lg hover:bg-zinc-200 outline-none cursor-pointer transition-colors"
          onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
        >
          <MoreHorizontal size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-24 rounded-xl border-zinc-300 p-1 shadow-2xl bg-white" onClick={(e)=>e.stopPropagation()}>
        <DropdownMenuItem className="gap-1.5 text-xs font-mono cursor-pointer py-2 rounded-lg hover:bg-zinc-200"> <Link2 size={12} /> Copy_URL </DropdownMenuItem>
        <DropdownMenuItem className="gap-1.5 text-xs font-mono cursor-pointer py-2 rounded-lg hover:bg-zinc-200"> <EyeOff size={12} /> Hide_Node </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-1.5 text-xs font-mono text-red-600 rounded-lg hover:bg-zinc-200 focus:text-red-600 cursor-pointer py-2"> <Flag size={12} /> Report </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}