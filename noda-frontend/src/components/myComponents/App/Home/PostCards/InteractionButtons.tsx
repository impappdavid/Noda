import React from "react";
import { Heart, MessageSquare, ChartNoAxesColumn, Bookmark, Share } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const LikeButton = ({ post, isLiked, onToggle }: any) => (
  <button
    onClick={onToggle}
    className={`relative flex items-center gap-1.5 text-xs font-mono cursor-pointer outline-none select-none group ${
      isLiked ? "text-blue-600" : "text-zinc-500 hover:text-blue-600"
    }`}
  >
    {/* EXPANDING RING BURST EFFECT */}
    <AnimatePresence>
      {isLiked && (
        <motion.span
          initial={{ scale: 0.6, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-0 w-3.5 h-3.5 border border-blue-500 rounded-full z-0 pointer-events-none"
        />
      )}
    </AnimatePresence>

    {/* SPRING BOUNCE ICON */}
    <motion.div 
      animate={isLiked ? { scale: [1, 1.35, 0.95, 1], rotate: [0, -8, 8, 0] } : { scale: 1 }} 
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className="relative z-10 flex items-center justify-center"
    >
      <Heart size={13} className={isLiked ? "fill-blue-600 stroke-blue-600" : "fill-transparent stroke-current"} />
    </motion.div>

    {/* ROLLING TEXT NUMBER COUNTER */}
    <div className="overflow-hidden h-4 font-bold relative z-10">
      <AnimatePresence mode="wait">
        <motion.span
          key={isLiked ? "liked" : "unliked"}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
          className="block font-bold"
        >
          {post.likes + (isLiked ? 1 : 0)}
        </motion.span>
      </AnimatePresence>
    </div>
  </button>
);

export const BookmarkButton = ({ isBookmarked, onToggle }: any) => (
  <button
    onClick={onToggle}
    className={`relative outline-none cursor-pointer p-0.5 flex items-center justify-center ${
      isBookmarked ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-900"
    }`}
  >
    {/* TACTICAL SLIDE AND SNAP SPRING ANCHOR */}
    <motion.div
      animate={isBookmarked ? { y: [0, -3, 1, 0], scale: [1, 1.15, 0.95, 1] } : { y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      <Bookmark
        size={13}
        className={isBookmarked ? "fill-zinc-900 stroke-zinc-900" : "fill-transparent stroke-current"}
      />
    </motion.div>
  </button>
);

export const ActionTray = ({
  post,
  isLiked,
  toggleLike,
  isBookmarked,
  toggleBookmark,
}: any) => (
  <div
    className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100 select-none"
    onClick={(e) => e.preventDefault()}
  >
    <div className="flex items-center gap-4">
      <LikeButton post={post} isLiked={isLiked} onToggle={toggleLike} />
      <button className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-zinc-900 cursor-pointer">
        <MessageSquare size={13} /> <span className="font-bold">{post.comments}</span>
      </button>
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
        <ChartNoAxesColumn size={13} /> <span className="font-bold">{post.views}</span>
      </div>
    </div>
    <div className="flex items-center gap-3 text-zinc-400">
      <BookmarkButton isBookmarked={isBookmarked} onToggle={toggleBookmark} />
      <button className="hover:text-zinc-900 cursor-pointer flex items-center justify-center p-0.5 outline-none">
        <Share size={13} />
      </button>
    </div>
  </div>
);