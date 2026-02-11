import React from 'react';
import { cn } from "@/lib/utils";
import type { Message } from '@/types/messages';

const MessageBubble: React.FC<Message> = ({ sender, text, time, isMe }) => (
    <div className={cn("flex flex-col max-w-[85%] ", isMe ? "ml-auto items-end" : "items-start")}>
        <div className="flex items-center gap-2 mb-1.5 px-1">
            {!isMe && <span className="text-[11px] font-bold uppercase text-zinc-900">{sender}</span>}
            <span className="text-[9px] font-mono font-bold text-zinc-400">{time}</span>
        </div>
        <div className={cn(
            "px-3 py-3 border rounded-lg text-xs leading-relaxed tracking-tight",
            isMe ? "bg-zinc-800 text-white border-zinc-900" : "bg-white border-zinc-300 text-zinc-600"
        )}>
            {text}
        </div>
    </div>
);

export default React.memo(MessageBubble);