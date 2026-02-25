import React, { useState } from "react";
import {
  MoreHorizontal,
  Heart,
  MessageSquare,
  BarChart3,
  Bookmark,
  Share,
  Link2,
  Flag,
  X as CloseIcon,
  X,
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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

// --- 1. DATA SCHEMA ---
const testPosts = [
  {
    id: "p1",
    author: {
      name: "Alex Rivers",
      username: "arivers",
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
      username: "mv_arch",
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
      username: "encrypted",
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

// --- 2. UTILITIES ---
const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

// --- 3. SUB-COMPONENTS ---
const LikeButton = ({ post, isLiked, onToggle }: { post: any, isLiked: boolean, onToggle: (e: React.MouseEvent) => void }) => (
  <button
    onClick={onToggle}
    className={cn(
      "relative flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer outline-none group",
      isLiked ? "text-pink-600" : "text-zinc-500 hover:text-pink-600"
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
      animate={isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <Heart size={16} className={cn("transition-all duration-300", isLiked ? "fill-pink-600 stroke-pink-600" : "fill-transparent stroke-current")} />
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

const PostOptions = () => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <button className="text-zinc-500 hover:text-zinc-900 p-1.5 hover:bg-zinc-200 outline-none cursor-pointer transition-colors" onClick={(e) => e.preventDefault()}>
        <MoreHorizontal size={16} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-24 rounded-none border-zinc-300 p-1 shadow-2xl bg-white" onClick={(e) => e.stopPropagation()}>
      <DropdownMenuItem className="gap-1.5 text-xs font-mono cursor-pointer py-2 rounded-none hover:bg-zinc-200/80"><Link2 size={12} /> Copy_URL</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-1.5 text-xs font-mono text-red-600 cursor-pointer py-2 hover:bg-red-50"><Flag size={12} /> Report</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// --- 4. MAIN COMPONENT ---
export default function Feed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  // Track the whole post object for the dialog info
  const [selectedPost, setSelectedPost] = useState<any>(null); 
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col relative bg-white min-h-screen">

      {testPosts.map((post) => (
        <Link to={`/app/post/${post.id}`} key={post.id} className="p-3 border-b border-zinc-300 hover:bg-zinc-200/60 transition-colors group block">
          <div className="flex justify-between items-start mb-1">
            <div className="flex gap-3">
              <div className="w-10 h-10 border border-zinc-200 overflow-hidden shrink-0"><img src={post.author.avatar} alt="av" className="w-full h-full object-cover" /></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900 hover:underline" onClick={(e) => { e.preventDefault(); navigate(`/app/user/${post.author.username}`) }}>{post.author.name}</span>
                  <span className="text-xs font-mono text-zinc-500">@{post.author.username}</span>
                </div>
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{post.author.role} • {post.postedAgo}</span>
              </div>
            </div>
            <PostOptions />
          </div>

          <div className="pl-13 md:pl-[52px]">
            <p className="text-sm text-zinc-800 leading-relaxed mb-3">{post.content}</p>

            {post.images && post.images.length > 0 && (
              <div className={cn("overflow-hidden border border-zinc-100 grid gap-1 mb-4", post.images.length === 1 ? "grid-cols-1" : "grid-cols-2", post.images.length >= 3 ? "aspect-square" : "aspect-video")}>
                {post.images.slice(0, 4).map((img, idx) => (
                  <div 
                    key={idx} 
                    className={cn("relative bg-zinc-100 overflow-hidden cursor-pointer", post.images.length === 3 && idx === 0 ? "row-span-2" : "")} 
                    onClick={(e) => { 
                        e.stopPropagation(); 
                        e.preventDefault(); 
                        setSelectedImg(img); 
                        setSelectedPost(post); // Set the current post context
                        setDialogOpen(true); 
                    }}
                  >
                    <img src={img} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <LikeButton post={post} isLiked={!!likedPosts[post.id]} onToggle={(e) => toggleLike(e, post.id)} />
                <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer" onClick={(e) => e.stopPropagation()}><MessageSquare size={16} /> {post.comments}</button>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><BarChart3 size={16} /> {post.views}</div>
              </div>
              <div className="flex items-center gap-4 text-zinc-500">
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); setBookmarkedPosts(p => ({ ...p, [post.id]: !p[post.id] })); }}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full flex rounded-none bg-transparent border-none shadow-none p-0 max-w-none h-screen">
          <div className="absolute top-4 left-4 text-white bg-zinc-800/70 p-1.5 cursor-pointer hover:bg-zinc-800 transition-colors z-50" onClick={() => setDialogOpen(false)}><X className="w-4.5 h-4.5" /></div>
          
          <div className="w-3/4 h-screen flex items-center justify-center">
            {selectedImg && (
              <img src={selectedImg} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
            )}
          </div>

          <div className="w-1/4 bg-white h-screen border-l border-zinc-300 p-3 flex flex-col ">
            {selectedPost && (
              <>
                <div className="flex justify-between items-start mb-1 ">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 border border-zinc-200 overflow-hidden shrink-0">
                        <img src={selectedPost.author.avatar} alt="av" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-zinc-900 hover:underline">{selectedPost.author.name}</span>
                        <span className="text-xs font-mono text-zinc-500">@{selectedPost.author.username}</span>
                      </div>
                      <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{selectedPost.author.role} • {selectedPost.postedAgo}</span>
                    </div>
                  </div>
                  <PostOptions />
                </div>

                <div className="pl-13 md:pl-[52px] border-b border-zinc-300 pb-4">
                  <p className="text-sm text-zinc-800 leading-relaxed mb-3">{selectedPost.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      <LikeButton post={selectedPost} isLiked={!!likedPosts[selectedPost.id]} onToggle={(e) => toggleLike(e, selectedPost.id)} />
                      <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer"><MessageSquare size={16} /> {selectedPost.comments}</button>
                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><BarChart3 size={16} /> {selectedPost.views}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}