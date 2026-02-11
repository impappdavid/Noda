import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface FeedItemProps {
    post: {
        author: string;
        time: string;
        title: string;
        content: string;
    };
}

const FeedItem: React.FC<FeedItemProps> = ({ post }) => {
    return (
        <div className="p-4 hover:bg-zinc-50/50 transition-colors group cursor-pointer">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                        <span className="text-white font-mono text-[10px] uppercase">
                            {post.author.charAt(1)}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-black">{post.author}</span>
                        <span className="text-[9px] font-mono font-black text-zinc-500">{post.time}</span>
                    </div>
                </div>
                <MoreHorizontal size={16} className="text-zinc-200 group-hover:text-zinc-900" />
            </div>
            <h3 className="text-sm font-bold uppercase mb-2">{post.title}</h3>
            <p className="text-[11px] text-zinc-500 leading-normal font-bold tracking-tight">
                {post.content}
            </p>
        </div>
    );
};

// Memoize to prevent re-renders when switching tabs
export default React.memo(FeedItem);