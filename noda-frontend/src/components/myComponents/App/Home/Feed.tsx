import React, { useState } from "react";
import {
  MoreHorizontal,
  MessageSquare,
  BarChart3,
  Bookmark,
  Share,
  Link2,
  Flag,
  Heart,
  Check,
  ChartNoAxesColumn,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PostViewDialog from "./PostDialog";

// --- 1. FUNCTIONAL POLL MODULE (VOTING UI) ---
const PollModule = ({ poll }: { poll: any }) => {
  const [voted, setVoted] = useState<number | null>(null);

  return (
    <div
      className="mt-2 border border-zinc-300 bg-white overflow-hidden"
      onClick={(e) => e.preventDefault()}
    >
      <div className="flex justify-between items-center px-2 py-1 h-8 border-b border-zinc-300 bg-zinc-300/80">
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">
            Active Poll
          </span>
          <span className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.1em]">
            00:24:39
          </span>
        </div>
      </div>
      <div className="divide-y divide-zinc-300">
        {poll.options.map((opt: any, i: number) => {
          const percent = opt.votes
            ? Math.round((opt.votes / poll.totalVotes) * 100)
            : 33;
          
          const isYourVote = voted === i;

          return (
            <button
              key={i}
              onClick={() => voted === null && setVoted(i)}
              className="w-full relative flex items-center h-9 group overflow-hidden bg-white hover:bg-blue-500/20 transition-colors cursor-pointer"
            >
              {/* Result Bar */}
              {voted !== null && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  className={cn(
                    "absolute inset-0 border-r border-zinc-300",
                    isYourVote ? "bg-blue-500/40" : "bg-blue-500/20"
                  )}
                />
              )}
              
              <div className="relative z-10 flex w-full justify-between px-2 items-center">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-[10px] font-bold uppercase transition-colors",
                    isYourVote ? "text-blue-700" : "text-zinc-900"
                  )}>
                    {typeof opt === "string" ? opt : opt.label}
                  </span>
                  
                  {/* Your Vote Badge */}
                  
                </div>

                {voted !== null && (
                  <span className={cn(
                    "text-[10px] font-mono font-black",
                    isYourVote ? "text-blue-700" : "text-zinc-500"
                  )}>
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

// --- 2. UTILITIES & ANIMATED SUB-COMPONENTS ---
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

const LikeButton = ({ post, isLiked, onToggle }: any) => (
  <button
    onClick={onToggle}
    className={cn(
      "relative flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer outline-none group",
      isLiked ? "text-pink-600" : "text-zinc-500 hover:text-pink-600",
    )}
  >
    <AnimatePresence>
      {isLiked && (
        <motion.span
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-1 inset-0 w-4 h-4 border border-pink-500 rounded-full z-0"
        />
      )}
    </AnimatePresence>
    <motion.div
      animate={
        isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }
      }
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <Heart
        size={14}
        className={cn(
          "transition-all duration-300",
          isLiked
            ? "fill-pink-600 stroke-pink-600"
            : "fill-transparent stroke-current",
        )}
      />
    </motion.div>
    <div className="overflow-hidden h-4">
      <AnimatePresence mode="wait">
        <motion.span
          key={isLiked ? "liked" : "unliked"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className="font-black block"
        >
          {post.likes + (isLiked ? 1 : 0)}
        </motion.span>
      </AnimatePresence>
    </div>
  </button>
);

// --- 3. MAIN COMPONENT ---
export default function Feed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<
    Record<string, boolean>
  >({});
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropDownOpen] = useState(true)

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUserClick = (e: React.MouseEvent, username: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/app/user/${username}`);
  };

  const [aspectRatio, setAspectRatio] = React.useState<number | null>(null);



  const testPosts = [
    {
      id: "p_text",
      author: {
        name: "Alex Rivers",
        username: "arivers",
        role: "Vector Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      postedAgo: "2h",
      content:
        "Applying the 14-day anti-ghosting protocol has significantly improved our response velocity. Recruiters are now forced into active engagement.",
      likes: 24,
      comments: 12,
      views: "1.2k",
      images: [],
    },
    {
      id: "p_poll",
      author: {
        name: "Marcus Vane",
        username: "mv_arch",
        role: "Systems Architect",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      },
      postedAgo: "1h",
      content:
        "Which serialization protocol are you prioritizing for low-latency node clusters in 2026?",
      likes: 89,
      comments: 34,
      views: "5.6k",
      poll: {
        options: [
          { label: "Protocol Buffers", votes: 450 },
          { label: "Cap'n Proto", votes: 120 },
          { label: "FlatBuffers", votes: 310 },
        ],
        totalVotes: 880,
      },
    },
    {
      id: "p_multi",
      author: {
        name: "Visual Studio",
        username: "vis_studio",
        role: "UI Lead",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Studio",
      },
      postedAgo: "5h",
      content:
        "Design system dump. All images strict square grid. +5 more overlay applied.",
      likes: 342,
      comments: 45,
      views: "12.1k",
      images: [
        "https://pbs.twimg.com/media/HIkmDcVaYAABtzK?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmEToagAAbd1Y?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmFk-a8AAgtG2?format=jpg&name=4096x4096",
        "https://pbs.twimg.com/media/HIkmGaPacAAjuXo?format=jpg&name=4096x4096"
      ]
    },
    {
      id: "p_image",
      author: {
        name: "Alex Rivers",
        username: "arivers",
        role: "Vector Engineer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      postedAgo: "2h",
      content:
        "",
      likes: 24,
      comments: 12,
      views: "1.2k",
      images: ["https://pbs.twimg.com/media/HIjmQqBXwAAqMvH?format=jpg&name=4096x4096"],
    },
  ];

 

  return (
    <div className="max-w-2xl mx-auto flex flex-col relative bg-white min-h-screen pb-64">
      {testPosts.map((post) => (
        <Link
          to={`/app/post/${post.id}`}
          key={post.id}
          className="p-3 border-b border-zinc-300 hover:bg-zinc-200/40 transition-colors group block"
        >
          {/* HEADER: RESTORED USER LINKS */}
          <div className="flex justify-between items-start mb-1">
            <div className="flex gap-3">
              <div
                className="w-10 h-10 border border-zinc-200 overflow-hidden shrink-0 cursor-pointer"
                onClick={(e) => handleUserClick(e, post.author.username)}
              >
                <img
                  src={post.author.avatar}
                  alt="av"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold text-zinc-900 hover:underline cursor-pointer"
                    onClick={(e) => handleUserClick(e, post.author.username)}
                  >
                    {post.author.name}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    @{post.author.username}
                  </span>
                </div>
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                  {post.author.role} • {post.postedAgo}
                </span>
              </div>
            </div>

            {/* RESTORED DROPDOWN */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button
                  className={`text-zinc-500 hover:text-zinc-900 p-1.5 hover:bg-zinc-200 outline-none cursor-pointer transition-colors `}
                  onClick={(e) => e.preventDefault()}
                >
                  <MoreHorizontal size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-32 rounded-none border-zinc-300 shadow-2xl p-0 bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <DropdownMenuItem className="gap-1.5 border-b border-zinc-300 text-[10px] font-mono cursor-pointer py-2 rounded-none hover:bg-zinc-200">
                  <Link2 size={12} /> COPY_URL
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-1.5 text-[10px] font-mono text-red-600 cursor-pointer py-2 rounded-none hover:bg-red-500/20">
                  <Flag size={12} /> REPORT
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="pl-13 md:pl-[52px]">
            <p className="text-sm text-zinc-800 leading-relaxed mb-3">
              {post.content}
            </p>

            {post.poll && (
              <div className="pb-3">
                <PollModule poll={post.poll} />
              </div>
            )}

            {/* RESTORED SQUARE IMAGE GRID */}
            {post.images && post.images.length > 0 && (
              <div
                className={cn(
                  "overflow-hidden  grid gap-0.5 mb-4 mt-3 ",
                  post.images.length === 1
                    ? "grid-cols-1 aspect-auto"
                    : "grid-cols-2 ",
                )}
              >
                {post.images.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative bg-zinc-100 overflow-hidden cursor-pointer group"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedImg(img);
                      setSelectedPost(post);
                      setDialogOpen(true);
                    }}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-full"
                      alt="media"
                    />
                    {idx === 3 && post.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center transition-colors group-hover:bg-black/70">
                        <span className="text-white text-sm font-mono font-black tracking-widest uppercase">
                          +{post.images.length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* RESTORED INTERACTIONS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <LikeButton
                  post={post}
                  isLiked={!!likedPosts[post.id]}
                  onToggle={(e: any) => toggleLike(e, post.id)}
                />
                <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer">
                  <MessageSquare size={14} /> {post.comments}
                </button>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <ChartNoAxesColumn size={14} /> {post.views}
                </div>
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <Bookmark
                  size={14}
                  className={cn(
                    "cursor-pointer",
                    bookmarkedPosts[post.id]
                      ? "fill-zinc-900 text-zinc-900"
                      : "hover:text-zinc-900",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setBookmarkedPosts((p) => ({
                      ...p,
                      [post.id]: !p[post.id],
                    }));
                  }}
                />
                <Share
                  size={14}
                  className="hover:text-zinc-900 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* RESTORED DIALOG */}
      <PostViewDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        selectedImg={selectedImg}
        selectedPost={selectedPost}
        likedPosts={likedPosts}
        toggleLike={toggleLike}
      />
    </div>
  );
}
