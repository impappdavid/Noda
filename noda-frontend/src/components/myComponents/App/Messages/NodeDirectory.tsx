import React from 'react';
import { Search } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { ChatNode } from '@/types/messages';

interface DirectoryProps {
    nodes: ChatNode[];
    activeNode: number;
    onNodeSelect: (id: number) => void;
}

const NodeDirectory: React.FC<DirectoryProps> = ({ nodes, activeNode, onNodeSelect }) => {
    return (
        <aside className="w-40 flex flex-col bg-zinc-50/30 border-l border-zinc-300">
            <div className="border-b border-zinc-300 bg-white p-2">
                <div className="relative group">
                    <Search className="absolute left-2 top-2.5 text-zinc-300 group-focus-within:text-zinc-900" size={12} />
                    <input 
                        type="text" 
                        placeholder="SEARCH..." 
                        className="w-full bg-zinc-50 h-8 pl-7 pr-2 text-[9px] font-mono font-bold uppercase outline-none focus:border-zinc-900 border border-transparent"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="px-3 py-2 border-b border-zinc-200 bg-zinc-50/50">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Active_Threads</span>
                </div>
                {nodes.map((node) => (
                    <button
                        key={node.id}
                        onClick={() => onNodeSelect(node.id)}
                        className={cn(
                            "w-full p-3 flex flex-col gap-1 border-b border-zinc-200 text-left transition-all",
                            activeNode === node.id ? "bg-white shadow-[inset_3px_0_0_0_#18181b]" : "hover:bg-zinc-100/50"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-tighter truncate">{node.name}</span>
                            <span className="text-[8px] font-mono text-zinc-400">{node.time}</span>
                        </div>
                        <p className={cn(
                            "text-[9px] font-bold uppercase truncate tracking-tight",
                            node.unread ? 'text-black' : 'text-zinc-500'
                        )}>{node.lastMsg}</p>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default React.memo(NodeDirectory);