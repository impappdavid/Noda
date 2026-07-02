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
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// --- Type Definitions ---

interface Author {
  name: string;
  username: string;
  avatar: string;
  role: string;
}

interface Post {
  id: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  postedAgo: string;
  images?: string[];
  author: Author;
}

interface LikeButtonProps {
  post: Post;
  isLiked: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

interface PostViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedImg: string | null;
  selectedPost: Post | null; // This will now match perfectly
  likedPosts: Record<string, boolean>;
  toggleLike: (e: React.MouseEvent, id: string) => void;
}

// --- Sub-components ---

const LikeButton = ({ post, isLiked, onToggle }: LikeButtonProps) => (
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
          className="absolute left-1 inset-0 z-0 w-4 h-4 border border-pink-500 rounded-full"
        />
      )}
    </AnimatePresence>

    <motion.div
      animate={isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      <Heart
        size={16}
        className={cn(
          "transition-all duration-300",
          isLiked ? "fill-pink-600 stroke-pink-600" : "fill-transparent stroke-current"
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

const PostOptions = () => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <button
        className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 outline-none transition-colors cursor-pointer"
        onClick={(e) => e.preventDefault()}
      >
        <MoreHorizontal size={16} />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      className="w-24 p-1 bg-white border-zinc-300 rounded-none shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <DropdownMenuItem className="py-2 gap-1.5 text-xs font-mono rounded-none hover:bg-zinc-200/80 cursor-pointer">
        <Link2 size={12} /> Copy_URL
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem className="py-2 gap-1.5 text-xs font-mono text-red-600 rounded-none hover:bg-red-50 cursor-pointer">
        <Flag size={12} /> Report
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// --- Main Component ---

export default function PostViewDialog({
  open,
  onOpenChange,
  selectedImg,
  selectedPost,
  likedPosts,
  toggleLike,
}: PostViewDialogProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const initialIndex = selectedPost?.images?.indexOf(selectedImg || "") ?? 0;

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
      <DialogContent className="max-w-none w-full h-screen flex p-0 bg-transparent border-none shadow-none rounded-none">
        
        {/* Close Button Trigger Anchor */}
        <button
          className="absolute top-4 left-4 z-50 p-1.5 bg-zinc-800/70 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-4.5 h-4.5" />
        </button>

        {/* Left Side: Media Asset Stage Canvas */}
        <div className="flex-1 h-screen flex flex-col items-center justify-center relative bg-black/5">
          {selectedPost?.images && selectedPost.images.length > 0 ? (
            <>
              <Carousel
                setApi={setApi}
                className="w-full h-full flex items-center justify-center"
                opts={{ startIndex: initialIndex }}
              >
                <CarouselContent className="w-full h-full items-center">
                  {selectedPost.images.map((img: string, index: number) => (
                    <CarouselItem
                      key={index}
                      className="w-full h-full p-4 md:p-10 flex items-center justify-center"
                    >
                      <img
                        src={img}
                        className="max-w-[90%] max-h-[90vh] object-contain shadow-2xl transition-all"
                        onClick={(e) => e.stopPropagation()}
                        alt={`Sourced asset ${index + 1}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {selectedPost.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-8 text-white bg-zinc-800/50 hover:bg-zinc-800 hover:text-white border-none rounded-none" />
                    <CarouselNext className="right-8 text-white bg-zinc-800/50 hover:bg-zinc-800 hover:text-white border-none rounded-none" />
                  </>
                )}
              </Carousel>

              {/* Dynamic Image Carousel Multi-Counter */}
              {count > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-800/80 text-white font-mono text-[11px] font-bold tracking-widest pointer-events-none">
                  {current} / {count}
                </div>
              )}
            </>
          ) : (
            selectedImg && (
              <img
                src={selectedImg}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
                alt="Enlarged visualization feed item"
              />
            )
          )}
        </div>

        {/* Right Side: Thread Information Side-Panel */}
        <div className="w-80 md:w-96 shrink-0 h-screen bg-white border-l border-zinc-300 flex flex-col">
          {selectedPost && (
            <>
              {/* Context Block Creator Profile Info */}
              <div className="flex justify-between items-start p-3 mb-1">
                <div className="flex gap-3">
                  <div className="w-10 h-10 border border-zinc-200 overflow-hidden shrink-0">
                    <img
                      src={selectedPost.author.avatar}
                      alt="Avatar representation"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900 hover:underline cursor-pointer">
                        {selectedPost.author.name}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        @{selectedPost.author.username}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">
                      {selectedPost.author.role} • {selectedPost.postedAgo}
                    </span>
                  </div>
                </div>

                <PostOptions />
              </div>

              {/* Post Payload Body Segment */}
              <div className="pl-13 md:pl-16 pr-4 pb-4">
                <p className="text-sm text-zinc-800 leading-relaxed mb-3">
                  {selectedPost.content}
                </p>

                {/* Metrics Actions Bar */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-8">
                    <LikeButton
                      post={selectedPost}
                      isLiked={!!likedPosts[selectedPost.id]}
                      onToggle={(e) => toggleLike(e, selectedPost.id)}
                    />

                    <button className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer">
                      <MessageSquare size={16} /> {selectedPost.comments}
                    </button>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                      <BarChart3 size={16} /> {selectedPost.views}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thread Action Submission Dock */}
              <div className="w-full h-10 flex border-y border-zinc-300">
                <div className="flex gap-1 w-full">
                  <img
                    src={selectedPost.author.avatar}
                    alt=""
                    className="w-10 h-10 object-cover"
                  />
                  <input
                    type="text"
                    placeholder="Post your reply"
                    className="w-full px-2 text-xs bg-transparent outline-none rounded-none"
                  />
                </div>

                <button className="px-4 bg-zinc-800 hover:bg-zinc-900 text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer">
                  Post
                </button>
              </div>

              {/* Nested Reply Timeline Feed Stream */}
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-3 border-b border-zinc-300">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 border border-zinc-300 overflow-hidden shrink-0">
                      <img
                        src={selectedPost.author.avatar}
                        className="w-full h-full object-cover"
                        alt="Thread response author node"
                      />
                    </div>

                    <div className="flex flex-col flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-0.5 mb-1">
                          <div className="flex gap-2 items-center">
                            <span className="text-[12px] font-bold text-zinc-900">
                              Béla Iván
                            </span>
                            <span className="text-[12px] text-zinc-500">
                              @belaivan
                            </span>
                          </div>

                          <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                            Vector Engineer
                          </span>
                        </div>

                        <span className="text-[10px] font-mono text-zinc-600">
                          2h
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-600 leading-snug">
                        Signal received. Node verification remains stable under
                        current latency benchmarks.
                      </p>

                      <div className="flex gap-4 mt-2">
                        <button className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-pink-600 transition-colors cursor-pointer">
                          <Heart size={14} /> 320
                        </button>

                        <button className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                          <CornerDownRight size={14} /> REPLY
                        </button>
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