import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CommentProps {
    id: string;
    username: string;
    likes: number;
    content: string;
    postedAgo: string;
    replies?: any[];
    onUserClick: (id: string) => void;
    onReplyClick?: (id: string, username: string) => void;
    isReply?: boolean;
}

const CommentNode: React.FC<CommentProps> = ({ 
    id, 
    username,
    likes, 
    content,
    postedAgo,
    replies = [],
    onUserClick, 
    onReplyClick,
    isReply = false
}) => {
    const [cLiked, setCLiked] = useState(false);
    const [showAllReplies, setShowAllReplies] = useState(false);
    const userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    // Determine slicing variables for truncated visibility state
    const structuralLimit = 3;
    const hasExcessReplies = replies.length > structuralLimit;
    const visibleReplies = showAllReplies ? replies : replies.slice(0, structuralLimit);
    const hiddenCount = replies.length - structuralLimit;

    return (
        <div className="flex flex-col ">
            {/* Core Node Box Container */}
            <div className={cn(
                "p-2 bg-white transition-colors relative",
                isReply ? "pl-6 border-l border-zinc-200 ml-6 md:ml-6" : ""
            )}>
                <div className="absolute ">
                    <div 
                        className={cn(
                            "border border-zinc-300 overflow-hidden cursor-pointer active:scale-90 transition-transform",
                            isReply ? "w-7 h-7" : "w-8 h-8"
                        )}
                        onClick={() => onUserClick(id)}
                    >
                        <img src={userAvatar} alt={username} className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className={cn(isReply ? "pl-9" : "pl-[40px] md:pl-[40px]")}>
                    <div className="flex items-center gap-2 ">
                        <span 
                            className="text-[10px] font-mono font-black text-zinc-900 uppercase cursor-pointer hover:underline" 
                            onClick={() => onUserClick(id)}
                        >
                            @{username}
                        </span>
                        <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">• {postedAgo}</span>
                    </div>
                    <p className="text-xs text-zinc-900 leading-normal mb-3 pr-4">
                        {content}
                    </p>
                    <div className="flex gap-6">
                        <button 
                            onClick={() => setCLiked(!cLiked)} 
                            className={cn(
                                "flex items-center gap-1.5 transition-colors cursor-pointer", 
                                cLiked ? "text-blue-500" : "text-zinc-500 hover:text-blue-500"
                            )}
                        >
                            <Heart size={14} className={cLiked ? "fill-blue-500" : ""} />
                            <span className="text-[10px] font-mono font-black">{likes + (cLiked ? 1 : 0)}</span>
                        </button>
                        
                        {/* Only expose secondary reply option action targets on base configurations */}
                        {!isReply && onReplyClick && (
                            <button 
                                onClick={() => onReplyClick(id, username)}
                                className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                            >
                                <MessageSquare size={14} />
                                <span className="text-[10px] font-mono font-black">Reply</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Recursively maps child reply assets inside structural list stack */}
            {replies.length > 0 && (
                <div className="bg-zinc-50/30 flex flex-col">
                    {visibleReplies.map((reply) => (
                        <CommentNode
                            key={reply.id}
                            id={reply.id}
                            username={reply.username}
                            likes={reply.likes}
                            content={reply.content}
                            postedAgo={reply.postedAgo}
                            onUserClick={onUserClick}
                            isReply={true}
                        />
                    ))}

                    {/* Interactive Sub-tree expansion button control */}
                    {hasExcessReplies && !showAllReplies && (
                        <div className="pl-12 py-1 bg-white">
                            <button
                                onClick={() => setShowAllReplies(true)}
                                className="text-[9px] font-mono font-black text-zinc-500 hover:text-zinc-950 uppercase cursor-pointer transition-colors"
                            >
                                ↳ Show More ({hiddenCount})
                            </button>
                        </div>
                    )}
                    
                    {/* Optional: Collapse back option handle */}
                    {hasExcessReplies && showAllReplies && (
                        <div className="pl-12 py-1 bg-white">
                            <button
                                onClick={() => setShowAllReplies(false)}
                                className="text-[9px] font-mono font-black text-zinc-400 hover:text-zinc-950 uppercase cursor-pointer transition-colors"
                            >
                                ↳ Collapse Replies
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default React.memo(CommentNode);