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
            <div className="border-b border-zinc-300 bg-white">
                <div className="relative group">
                    <Search className="absolute left-2 top-3 text-zinc-500 " size={12} />
                    <input 
                        type="text" 
                        placeholder="SEARCH..." 
                        className="w-full bg-zinc-50 h-9 pl-7 pr-2 text-[10px] font-mono font-bold uppercase outline-none border border-transparent"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-hide">
                
                {nodes.map((node) => (
                    <button
                        key={node.id}
                        onClick={() => onNodeSelect(node.id)}
                        className={cn(
                            "w-full p-2 flex flex-col gap-1 border-b border-zinc-300 text-left transition-all cursor-pointer",
                            activeNode === node.id ? "bg-zinc-300" : "hover:bg-zinc-100/50"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold uppercase tracking-tighter truncate">{node.name}</span>
                            <span className="text-[9px]  text-zinc-500">{node.time}</span>
                        </div>
                        <p className={cn(
                            "text-[9px] font-bold uppercase truncate tracking-tight",
                            node.unread ? 'text-bold' : 'text-zinc-500'
                        )}>{node.lastMsg}</p>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default React.memo(NodeDirectory);