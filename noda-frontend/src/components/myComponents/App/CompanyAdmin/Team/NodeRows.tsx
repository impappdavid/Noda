import React from 'react';
import { Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { RequestNode, TeamNode } from '@/types/admin/team';

export const ActiveNodeRow = React.memo(({ node, onRemove }: { node: TeamNode, onRemove: (id: string) => void }) => (
    <div className="flex items-center justify-between p-3 hover:bg-zinc-50 transition-all group cursor-pointer bg-white">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center font-black text-white text-xs shrink-0">
                {node.name[0]}
            </div>
            <div>
                <div className="flex items-center gap-2 leading-none">
                    <h5 className="text-sm font-bold uppercase tracking-tight">{node.name}</h5>
                    <span className="text-[10px] font-mono text-zinc-500">{node.username}</span>
                </div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase mt-1 tracking-widest">Role: {node.role}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Select defaultValue={node.role}>
                <SelectTrigger className="h-8 w-28 rounded-none border-zinc-200 bg-white text-[9px] font-mono font-black uppercase focus:ring-0">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" className="rounded-none font-mono text-[10px] max-w-28 uppercase bg-white">
                    <SelectItem value="CEO" className='text-xs cursor-pointer'>CEO_MASTER</SelectItem>
                    <SelectItem value="RECRUITER" className='text-xs cursor-pointer'>RECRUITER</SelectItem>
                    <SelectItem value="MARKETING" className='text-xs cursor-pointer'>MARKETING</SelectItem>
                </SelectContent>
            </Select>
            <button 
                onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} 
                className="p-2 text-zinc-400 hover:text-red-600 transition-colors cursor-pointer group-hover:opacity-100 opacity-0"
            >
                <Trash2 size={14} />
            </button>
        </div>
    </div>
));

export const RequestNodeRow = React.memo(({ node }: { node: RequestNode }) => (
    <div className="flex items-center justify-between p-3 bg-white hover:bg-orange-50/20 transition-all border-l-4 border-l-orange-500">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-100 border border-zinc-200 flex items-center justify-center font-black text-zinc-300 text-xs shrink-0">?</div>
            <div>
                <div className="flex items-center gap-2 leading-none">
                    <h5 className="text-sm font-bold uppercase tracking-tight">{node.name}</h5>
                    <span className="text-[10px] font-mono text-zinc-500">{node.username}</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 italic mt-1 leading-none">"{node.note}"</p>
            </div>
        </div>
        <div className="flex gap-2">
            <button className="h-8 px-4 bg-zinc-900 text-white text-[9px] font-mono font-black uppercase hover:bg-black transition-all cursor-pointer">Accept</button>
            <button className="h-8 px-4 border border-zinc-200 text-zinc-400 text-[9px] font-mono font-black uppercase hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer">Ignore</button>
        </div>
    </div>
));