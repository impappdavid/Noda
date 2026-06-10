import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal, Link2, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PollModule } from "./PollModule";
import { ProjectShowcaseModule } from "./ProjectShowcaseModule";
import { ActionTray } from "./InteractionButtons";
import { SystemMilestoneModule } from "./SystemMilestoneModule";
import { JobListingModule } from "./JobListingModule";
import type { Post } from "./types";
import ReportModal from "../system/Report";

interface PostCardProps {
  post: Post;
  isLiked: boolean;
  isBookmarked: boolean;
  onToggleLike: (e: React.MouseEvent) => void;
  onToggleBookmark: (e: React.MouseEvent) => void;
  onUserClick: (e: React.MouseEvent, username: string) => void;
  onImagePreview: (img: string, post: Post) => void;
}

export const PostCard = ({
  post,
  isLiked,
  isBookmarked,
  onToggleLike,
  onToggleBookmark,
  onUserClick,
  onImagePreview,
}: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Link
        to={`/app/post/${post.id}`}
        className="p-3 border-b border-zinc-300 hover:bg-zinc-50 block group transition-colors"
      >
        {/* HEADER SECTION */}
        <div className="flex justify-between items-start mb-1.5">
          <div className="flex gap-2.5 min-w-0">
            <div
              className="w-8 h-8 border border-zinc-300 overflow-hidden shrink-0 cursor-pointer bg-zinc-50"
              onClick={(e) => onUserClick(e, post.author.username)}
            >
              <img
                src={post.author.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-xs font-bold text-zinc-900 hover:underline cursor-pointer truncate"
                  onClick={(e) => onUserClick(e, post.author.username)}
                >
                  {post.author.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 truncate">
                  @{post.author.username}
                </span>
              </div>
              <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wide">
                {post.author.role} • {post.postedAgo}
              </div>
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button
                className="text-zinc-400 hover:text-zinc-900 p-1 hover:bg-zinc-100 cursor-pointer transition-colors border-none outline-none"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-32 rounded-none border-zinc-300 p-0 bg-white shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem className="gap-1.5 border-b border-zinc-200 text-[10px] font-mono cursor-pointer py-1.5 rounded-none hover:bg-zinc-50">
                <Link2 size={12} /> COPY_URL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen(true);
                }}
                className="gap-1.5 text-[10px] font-mono text-red-600 cursor-pointer py-1.5 rounded-none hover:bg-red-50/10 focus:bg-red-50/10 focus:text-red-600"
              >
                <Flag size={12} /> REPORT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* BODY INLINE WRAPPERS */}
        <div className="pl-10">
          {post.content && (
            <p className="text-xs text-zinc-800 leading-relaxed font-medium mb-2">
              {post.content}
            </p>
          )}

          {/* COMPONENT MODULE LOGIC SEPARATIONS */}
          {post.poll && (
            <PollModule poll={post.poll} questionText={post.poll.question} />
          )}

          {post.type === "project_showcase" && post.project && (
            <ProjectShowcaseModule project={post.project} />
          )}

          {post.type === "system_milestone" && post.milestone && (
            <SystemMilestoneModule milestone={post.milestone} />
          )}

          {post.type === "job_listing" && post.jobListing && (
            <JobListingModule job={post.jobListing} />
          )}

          {/* FLAT GRID SYSTEM GENERATOR */}
          {post.images && post.images.length > 0 && (
            <div
              className={`overflow-hidden grid gap-0.5 mt-2 ${post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
            >
              {post.images.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="relative bg-zinc-100 overflow-hidden cursor-pointer group/img"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onImagePreview(img, post);
                  }}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Media content"
                  />
                  {idx === 3 && post.images!.length > 4 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-colors group-hover/img:bg-black/70">
                      <span className="text-white text-[10px] font-mono font-black tracking-widest uppercase">
                        +{post.images!.length - 3} MORE
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <ActionTray
            post={post}
            isLiked={isLiked}
            toggleLike={onToggleLike}
            isBookmarked={isBookmarked}
            toggleBookmark={onToggleBookmark}
          />
        </div>
      </Link>

      {/* RENDERED SYSTEM REPORT OVERLAY MODAL */}
      <ReportModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        nodeTitle={post.id} 
      />
    </>
  );
};