import React from 'react';
import { Trash2, X } from 'lucide-react';
import { cn } from "@/lib/utils";

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
export const PollModule = React.memo(({ 
    poll, 
    onToggle, 
    onAddOption, 
    onUpdateOption, 
    onRemoveOption 
}: { 
    poll: any, 
    onToggle: () => void, 
    onAddOption: () => void,
    onUpdateOption: (i: number, v: string) => void,
    onRemoveOption: (i: number) => void 
}) => (
    <div className="mt-2 border border-zinc-300 bg-white animate-in slide-in-from-top-2">
        {/* HEADER */}
        <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-300 bg-zinc-50/80">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-none" />
                <span className="text-[10px] font-mono font-black text-zinc-900 uppercase tracking-[0.2em]">Poll Config</span>
            </div>
            <button onClick={onToggle} className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 transition-all cursor-pointer">
                <X size={12}/>
            </button>
        </div>

        {/* OPTIONS GRID */}
        <div className="divide-y divide-zinc-300">
            {poll.options.map((opt: string, i: number) => (
                <div key={i} className="flex items-stretch group">
                    {/* INDEX */}
                    <div className="w-10 flex items-center justify-center bg-zinc-50 border-r border-zinc-300 text-[9px] font-mono text-zinc-500 group-focus-within:text-zinc-900 group-focus-within:font-bold transition-colors">
                        0{i + 1}
                    </div>
                    
                    {/* INPUT */}
                    <input 
                        value={opt}
                        onChange={(e) => onUpdateOption(i, e.target.value)}
                        placeholder={`Option_Entry_${i + 1}`}
                        className="flex-1 h-10 px-4 text-[11px] uppercase outline-none bg-white placeholder:text-zinc-400 transition-colors"
                    />
                    
                    {/* REMOVE OPTION BUTTON */}
                    {poll.options.length > 2 && (
                        <button 
                            onClick={() => onRemoveOption(i)}
                            className="w-10 flex items-center justify-center border-l border-zinc-300 text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                            title="Remove Option"
                        >
                            <Trash2 size={14} />
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* ADD OPTION */}
        {poll.options.length < 4 && (
            <button 
                onClick={onAddOption}
                className="w-full h-10 border-t border-zinc-300 bg-white text-[9px] font-mono font-black text-zinc-500 uppercase flex items-center justify-center gap-2 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
            >
                <span>+</span> Inject_New_Option_Field
            </button>
        )}

        {/* FOOTER */}
        <div className="px-3 py-1.5 border-t border-zinc-300 bg-zinc-50 flex justify-between">
            <span className="text-[8px] font-mono font-black text-zinc-500 uppercase">Min: 02 / Max: 04</span>
            <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest italic">Status: Configuration_Active</span>
        </div>
    </div>
));