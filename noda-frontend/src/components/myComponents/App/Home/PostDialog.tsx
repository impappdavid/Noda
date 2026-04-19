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
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const cn = (...classes: (string | boolean | undefined | null)[]): string =>
  classes.filter(Boolean).join(" ");

// --- Sub-components ---
const LikeButton = ({ post, isLiked, onToggle }: { post: any; isLiked: boolean; onToggle: (e: React.MouseEvent) => void }) => (
  <button
    onClick={onToggle}
    className={cn(
      "flex items-center gap-2 text-[11px] font-mono transition-all px-2 py-1 border border-transparent hover:border-zinc-200 active:scale-95",
      isLiked ? "text-pink-600" : "text-zinc-500 hover:text-zinc-900"
    )}
  >
    <Heart size={15} className={cn("transition-all", isLiked ? "fill-pink-600 stroke-pink-600" : "fill-transparent stroke-current")} />
    <span className="font-bold">{post.likes + (isLiked ? 1 : 0)}</span>
  </button>
);

const PostOptions = () => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger asChild>
      <button className="text-zinc-400 hover:text-zinc-900 p-1 hover:bg-zinc-100 transition-colors border border-transparent hover:border-zinc-200">
        <MoreHorizontal size={18} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-32 rounded-none border-2 border-zinc-900 p-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
      <DropdownMenuItem className="gap-2 text-[10px] font-mono cursor-pointer py-2 rounded-none hover:bg-zinc-900 hover:text-white uppercase font-bold">
        <Link2 size={12} /> Copy_Link
      </DropdownMenuItem>
      <DropdownMenuSeparator className="m-0 bg-zinc-900 h-[1px]" />
      <DropdownMenuItem className="gap-2 text-[10px] font-mono text-red-600 cursor-pointer py-2 rounded-none hover:bg-red-600 hover:text-white uppercase font-bold">
        <Flag size={12} /> Report_Abuse
      </DropdownMenuItem>
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
  toggleLike,
}: PostViewDialogProps) {
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
      <DialogContent className="max-w-[95vw] w-full h-[90vh] flex rounded-none bg-zinc-50 border-2 border-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 overflow-hidden">
        
        {/* Close Button - Floats above image */}
        <button 
          className="absolute top-4 left-4 z-50 bg-white border-2 border-zinc-900 p-1.5 hover:bg-zinc-900 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Image Canvas */}
        <div className="flex-1 h-full bg-zinc-200 relative flex items-center justify-center overflow-hidden border-r-2 border-zinc-900">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          {selectedPost?.images && selectedPost.images.length > 0 ? (
            <>
              <Carousel 
                setApi={setApi} 
                className="w-full h-full"
                opts={{ startIndex: initialIndex }}
              >
                <CarouselContent className="h-full ml-0">
                  {selectedPost.images.map((img: string, index: number) => (
                    <CarouselItem key={index} className="flex items-center justify-center h-[90vh] p-0 pl-0">
                      <img 
                        src={img} 
                        className="max-w-[95%] max-h-[95%] object-contain bg-white p-2 border border-zinc-300 shadow-xl" 
                        alt={`Slide ${index}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {selectedPost.images.length > 1 && (
                  <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 pointer-events-none">
                    <CarouselPrevious className="static pointer-events-auto h-12 w-12 rounded-none border-2 border-zinc-900 bg-white translate-x-0 hover:bg-zinc-900 hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" />
                    <CarouselNext className="static pointer-events-auto h-12 w-12 rounded-none border-2 border-zinc-900 bg-white translate-x-0 hover:bg-zinc-900 hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all" />
                  </div>
                )}
              </Carousel>

              {count > 1 && (
                <div className="absolute top-6 right-6 bg-zinc-900 text-white px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em]">
                  IMAGE_{current}/{count}
                </div>
              )}
            </>
          ) : (
             selectedImg && <img src={selectedImg} className="max-w-[90%] max-h-[90%] object-contain bg-white p-2 shadow-2xl" />
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="w-[380px] h-full flex flex-col bg-white">
          {selectedPost && (
            <>
              {/* Sidebar Header */}
              <div className="p-4 border-b-2 border-zinc-900">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 border-2 border-zinc-900 overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <img src={selectedPost.author.avatar} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-black uppercase tracking-tight text-zinc-900">{selectedPost.author.name}</span>
                        <span className="text-[11px] font-mono text-zinc-500">@{selectedPost.author.username}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                         <span className="bg-zinc-900 text-white text-[9px] px-1.5 py-0.5 font-mono font-bold uppercase">{selectedPost.author.role}</span>
                         <span className="text-[9px] font-mono text-zinc-400 uppercase">{selectedPost.postedAgo}</span>
                      </div>
                    </div>
                  </div>
                  <PostOptions />
                </div>
                <div className="mt-4">
                  <p className="text-[13px] text-zinc-800 leading-relaxed font-medium">
                    {selectedPost.content}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="flex divide-x-2 divide-zinc-900 border-b-2 border-zinc-900">
                <div className="flex-1 py-2 px-4">
                  <LikeButton post={selectedPost} isLiked={!!likedPosts[selectedPost.id]} onToggle={(e) => toggleLike(e, selectedPost.id)} />
                </div>
                <div className="flex-1 py-2 px-4 flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                  <MessageSquare size={14} /> <span className="font-bold">{selectedPost.comments}</span>
                </div>
                <div className="flex-1 py-2 px-4 flex items-center gap-2 text-zinc-500 font-mono text-[11px]">
                  <BarChart3 size={14} /> <span className="font-bold">{selectedPost.views}</span>
                </div>
              </div>

              {/* Comment Feed */}
              <div className="flex-1 overflow-y-auto bg-zinc-50/50">
                <div className="p-4 space-y-4">
                  {/* Sample Comment */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 border border-zinc-900 overflow-hidden shrink-0">
                      <img src={selectedPost.author.avatar} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-black uppercase">Béla Iván</span>
                        <span className="text-[9px] font-mono text-zinc-400">2h_ago</span>
                      </div>
                      <p className="text-[12px] text-zinc-600 mt-0.5 border-l-2 border-zinc-200 pl-2 py-1 italic">
                        "Signal received. Node verification remains stable."
                      </p>
                      <div className="flex gap-3 mt-1.5">
                        <button className="text-[9px] font-mono font-bold text-zinc-400 hover:text-pink-600 uppercase">Like</button>
                        <button className="text-[9px] font-mono font-bold text-zinc-400 hover:text-zinc-900 uppercase">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Input Field */}
              <div className="p-3 bg-white border-t-2 border-zinc-900">
                <div className="flex items-center border-2 border-zinc-900 focus-within:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-shadow">
                  <div className="w-10 h-10 border-r-2 border-zinc-900 overflow-hidden shrink-0 hidden sm:block">
                    <img src={selectedPost.author.avatar} alt="me" className="w-full h-full object-cover grayscale" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="TYPE_YOUR_REPLY..." 
                    className="flex-1 px-3 text-[11px] font-mono outline-none uppercase placeholder:text-zinc-300" 
                  />
                  <button className="h-10 px-4 bg-zinc-900 text-white hover:bg-zinc-700 transition-colors flex items-center justify-center">
                    <Send size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}