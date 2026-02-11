import React from 'react';
import { Users, Briefcase, Zap, MessageSquare, MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Notification } from '@/types/notifications';

interface Props {
    signal: Notification;
}

const NotificationItem: React.FC<Props> = ({ signal }) => {
    const Icon = {
        connection: Users,
        job: Briefcase,
        reaction: Zap,
        message: MessageSquare
    }[signal.type];

    return (
        <div className={cn(
            "p-3 flex gap-4 transition-colors cursor-pointer group",
            signal.unread ? "bg-blue-50/20" : "hover:bg-zinc-50/50"
        )}>
            <div className="shrink-0 relative">
                <div className="w-10 h-10 bg-zinc-800 flex items-center justify-center">
                    <Icon size={16} className="text-white" />
                </div>
                {signal.unread && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white" />
                )}
            </div>

            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold tracking-tight text-zinc-900">{signal.actor}</span>
                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">{signal.time}</span>
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight leading-normal">
                    {signal.action}
                </p>
            </div>

            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal size={14} className="text-zinc-400" />
            </div>
        </div>
    );
};

export default React.memo(NotificationItem);