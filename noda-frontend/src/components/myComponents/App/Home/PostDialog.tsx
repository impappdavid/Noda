import React, { useState, useEffect } from "react";
import {
  X,
  MessageSquare,
  BarChart3,
  CornerDownRight,
  Heart,
  MoreHorizontal,
  Link2,
  Flag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- SHADCN CAROUSEL ---
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Added type for API
} from "@/components/ui/carousel";

const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

// --- Sub-components ---
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

interface PostViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImg: string | null;
  selectedPost: any;
  likedPosts: Record<string, boolean>;
  toggleLike: (e: React.MouseEvent, id: string) => void;
}

export default function PostViewDialog({
  open,
  onOpenChange,
  selectedImg,
  selectedPost,
  likedPosts,
  toggleLike
}: PostViewDialogProps) {
  
  // Carousel State Logic
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const initialIndex = selectedPost?.images?.indexOf(selectedImg) ?? 0;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full flex rounded-none bg-transparent border-none shadow-none p-0 max-w-none h-screen">
        <div 
          className="absolute top-4 left-4 text-white bg-zinc-800/70 p-1.5 cursor-pointer hover:bg-zinc-800 transition-colors z-50" 
          onClick={() => onOpenChange(false)}
        >
          <X className="w-4.5 h-4.5" />
        </div>

        <div className="w-3/4 h-screen flex flex-col items-center justify-center relative bg-black/5">
          {selectedPost?.images && selectedPost.images.length > 0 ? (
            <>
              <Carousel 
                setApi={setApi} // Set the API to track index
                className="w-full h-full flex items-center justify-center"
                opts={{
                  startIndex: initialIndex,
                }}
              >
                <CarouselContent className="h-full items-center">
                  {selectedPost.images.map((img: string, index: number) => (
                    <CarouselItem key={index} className="flex items-center justify-center h-full">
                      <img 
                        src={img} 
                        className="max-w-full max-h-full object-contain" 
                        onClick={(e) => e.stopPropagation()} 
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {selectedPost.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-8 bg-zinc-800/50 border-none text-white hover:bg-zinc-800 hover:text-white rounded-none" />
                    <CarouselNext className="right-8 bg-zinc-800/50 border-none text-white hover:bg-zinc-800 hover:text-white rounded-none" />
                  </>
                )}
              </Carousel>

              {/* IMAGE COUNTER */}
              {count > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800/80 px-3 py-1.5 text-white font-mono text-[11px] font-bold tracking-widest pointer-events-none">
                  {current} / {count}
                </div>
              )}
            </>
          ) : (
            selectedImg && (
              <img src={selectedImg} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
            )
          )}
        </div>

        <div className="w-1/4 bg-white h-screen border-l border-zinc-300 flex flex-col ">
          {selectedPost && (
            <>
              <div className="flex justify-between items-start mb-1 p-3">
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

              <div className="pl-13 md:pl-[52px] pb-4">
                <p className="text-sm text-zinc-800 leading-relaxed mb-3">{selectedPost.content}</p>

                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-8">
                    <LikeButton post={selectedPost} isLiked={!!likedPosts[selectedPost.id]} onToggle={(e) => toggleLike(e, selectedPost.id)} />
                    <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer"><MessageSquare size={16} /> {selectedPost.comments}</button>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><BarChart3 size={16} /> {selectedPost.views}</div>
                  </div>
                </div>
              </div>

              <div className="w-full h-10 flex border-y border-zinc-300">
                <div className="flex gap-1 w-full">
                  <img src={selectedPost.author.avatar} alt="" className="w-10 h-10 object-cover" />
                  <input type="text" placeholder="Post your reply" className="rounded-none outline-none w-full px-2 text-xs" />
                </div>
                <button className="bg-zinc-800 hover:bg-zinc-900 transition-colors px-3 pl-4 text-white text-xs cursor-pointer uppercase font-mono">Post</button>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div key={12} className="py-4 border-b border-zinc-300 px-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 border border-zinc-300 overflow-hidden shrink-0"><img src={selectedPost.author.avatar} className="w-full h-full object-cover" /></div>
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between ">
                        <div className="flex flex-col gap-0.5 mb-1">
                          <div className="flex gap-2 items-center">
                            <span className="text-[12px] font-bold text-zinc-900">Béla Iván</span>
                            <span className="text-[12px] text-zinc-500">@belaivan</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Vector Engineer</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">2h</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-snug">Signal received. Node verification remains stable under current latency benchmarks.</p>
                      <div className="flex gap-4 mt-2">
                        <button className="text-[11px] font-mono text-zinc-500 hover:text-pink-600 cursor-pointer transition-colors flex items-center gap-1"><Heart size={14} /> 320</button>
                        <button className="text-[11px] font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors flex items-center gap-1"><CornerDownRight size={14} /> REPLY</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}