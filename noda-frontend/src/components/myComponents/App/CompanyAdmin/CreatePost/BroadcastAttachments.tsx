import React from 'react';
import { X } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Poll } from '@/types/admin/createPost';

export const ImageGrid = React.memo(({ images, onRemove }: { images: string[], onRemove: (i: number) => void }) => (
    <div className={cn(
        "mt-4 border border-zinc-300 grid gap-1 relative group",
        images.length === 1 ? "grid-cols-1" : "grid-cols-2",
        images.length >= 3 ? "aspect-square" : "aspect-video"
    )}>
        {images.map((img, idx) => (
            <div key={idx} className={cn(
                "relative bg-zinc-100 overflow-hidden",
                images.length === 3 && idx === 0 ? "row-span-2" : ""
            )}>
                <img src={img} className="w-full h-full object-cover" alt="Node Visual" />
                <button 
                    onClick={() => onRemove(idx)}
                    className="absolute top-2 right-2 p-1 bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                >
                    <X size={14} />
                </button>
            </div>
        ))}
    </div>
));

export const PollModule = React.memo(({ poll, onToggle, onAddOption }: { poll: Poll, onToggle: () => void, onAddOption: () => void }) => (
    <div className="mt-6 p-4 border border-zinc-300 bg-zinc-50/50 space-y-3 relative animate-in slide-in-from-top-2">
        <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Active_Poll_Protocol</span>
            <button onClick={onToggle} className="text-zinc-400 hover:text-red-600 cursor-pointer "><X size={14}/></button>
        </div>
        {poll.options.map((opt, i) => (
            <div key={i} className="flex gap-2">
                <input 
                    defaultValue={opt}
                    className="flex-1 h-9 bg-white border border-zinc-300 px-3 text-xs font-bold uppercase outline-none "
                />
            </div>
        ))}
        {poll.options.length < 4 && (
            <button 
                onClick={onAddOption}
                className="w-full h-8 border border-dashed border-zinc-300 text-[9px] font-mono font-black text-zinc-500 uppercase hover:border-zinc-900 hover:text-zinc-900 transition-all cursor-pointer"
            >
                + Add_Option
            </button>
        )}
    </div>
));