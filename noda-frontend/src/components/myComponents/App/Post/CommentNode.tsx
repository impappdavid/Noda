import React, { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CommentProps {
    id: string;
    likes: number;
    onUserClick: (id: string) => void;
}

const CommentNode: React.FC<CommentProps> = ({ id, likes, onUserClick }) => {
    const [cLiked, setCLiked] = useState(false);
    const userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

    return (
        <div className="p-3 bg-white hover:bg-zinc-50/50 transition-colors relative">
            <div className="absolute left-4 top-4">
                <div 
                    className="w-8 h-8 rounded-full border border-zinc-200 overflow-hidden cursor-pointer active:scale-90 transition-transform"
                    onClick={() => onUserClick(id)}
                >
                    <img src={userAvatar} alt={id} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="pl-[40px] md:pl-[52px]">
                <div className="flex items-center gap-2 mb-1">
                    <span 
                        className="text-[10px] font-mono font-black text-zinc-900 uppercase cursor-pointer hover:underline" 
                        onClick={() => onUserClick(id)}
                    >
                        @{id}
                    </span>
                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">• 1h ago</span>
                </div>
                <p className="text-xs text-zinc-900 leading-normal mb-3 pr-4">
                    Signal received. Node verification remains stable under current latency benchmarks.
                </p>
                <div className="flex gap-6">
                    <button 
                        onClick={() => setCLiked(!cLiked)} 
                        className={cn(
                            "flex items-center gap-1.5 transition-colors cursor-pointer", 
                            cLiked ? "text-orange-500" : "text-zinc-500 hover:text-orange-500"
                        )}
                    >
                        <Heart size={14} className={cLiked ? "fill-orange-500" : ""} />
                        <span className="text-[10px] font-mono font-black">{likes + (cLiked ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                        <MessageSquare size={14} />
                        <span className="text-[10px] font-mono font-black">Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CommentNode);