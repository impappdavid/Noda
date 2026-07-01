import { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, BarChart3, Users, MoreHorizontal, MessageSquare, Bookmark, Share, Heart, X, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import type { Poll } from '@/types/admin/createPost';
import { PollModule } from './Attachments';
import { ToolbarButton } from './Statistics';

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    // 1. POLL STATE MANAGEMENT
    const [poll, setPoll] = useState<Poll | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [content]);

    const author = {
        name: "OpenAI",
        role: "Systems Architect",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=O&backgroundColor=18181b"
    };

    const handleTransmit = useCallback(() => {
        setIsTransmitting(true);
        setTimeout(() => setIsTransmitting(false), 2000);
    }, []);

    const addImage = useCallback(() => {
        const mockImg = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800";
        setImages(prev => [...prev, mockImg]);
    }, []);

    // 2. TOGGLE POLL (Initialize with 2 empty options)
    const togglePoll = useCallback(() => {
        setPoll(prev => prev ? null : { options: ["", ""] });
    }, []);

    // 3. ADD POLL OPTION (Limit to 4)
    const addPollOption = useCallback(() => {
        setPoll(prev => {
            if (prev && prev.options.length < 4) {
                return { ...prev, options: [...prev.options, ""] };
            }
            return prev;
        });
    }, []);

    const removePollOption = useCallback((index: number) => {
        setPoll(prev => {
            if (!prev || prev.options.length <= 2) return prev; // Keep system integrity (min 2)
            const newOptions = prev.options.filter((_, i) => i !== index);
            return { ...prev, options: newOptions };
        });
    }, []);

    // 4. UPDATE SPECIFIC OPTION TEXT
    const updatePollOption = useCallback((index: number, value: string) => {
        setPoll(prev => {
            if (!prev) return null;
            const newOptions = [...prev.options];
            newOptions[index] = value;
            return { ...prev, options: newOptions };
        });
    }, []);

    return (
        <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
                

                <main className="flex flex-1 border-x border-zinc-300  bg-white overflow-hidden flex-row divide-x divide-zinc-300">
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        

                        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                            <div className="p-2 bg-white flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2 shrink-0">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 border border-zinc-300 overflow-hidden shrink-0">
                                            <img src={author.avatar} alt="av" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-zinc-900">{author.name}</span>
                                            <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">{author.role} • JUST_NOW</span>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={16} className="text-zinc-400" />
                                </div>

                                <div className="pl-13 flex-1 flex flex-col">
                                    <textarea
                                        ref={textareaRef}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Type transmission content here..."
                                        className="w-full text-sm text-zinc-800 placeholder:text-zinc-500 resize-none outline-none leading-relaxed bg-transparent overflow-hidden"
                                    />

                                    <div className="mt-4">
                                        {images.length > 0 && (
                                            <div className={cn(
                                                "overflow-hidden border border-zinc-200 grid gap-1 mb-4",
                                                images.length === 1 ? "grid-cols-1" : "grid-cols-2",
                                                images.length >= 3 ? "aspect-square" : "aspect-video"
                                            )}>
                                                {images.slice(0, 4).map((img, idx) => {
                                                    const isFourth = idx === 3;
                                                    const hasMore = images.length > 4;
                                                    return (
                                                        <div key={idx} className={cn("relative bg-zinc-100 overflow-hidden", images.length === 3 && idx === 0 ? "row-span-2" : "")}>
                                                            <img src={img} className="w-full h-full object-cover" alt="preview" />
                                                            {isFourth && hasMore && (
                                                                <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center">
                                                                    <span className="text-white text-lg font-mono font-black tracking-widest">+{images.length - 3}</span>
                                                                </div>
                                                            )}
                                                            <button onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-none hover:bg-red-600 cursor-pointer transition-colors">
                                                                <X size={12} />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* POLL MODULE INTEGRATION */}
                                        {poll && (
                                            <PollModule
                                                poll={poll}
                                                onToggle={togglePoll}
                                                onAddOption={addPollOption}
                                                onUpdateOption={updatePollOption}
                                                onRemoveOption={removePollOption} // New Prop
                                            />
                                        )}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-zinc-300 flex items-center justify-between opacity-50 pointer-events-none pb-4">
                                        <div className="flex items-center gap-8">
                                            <div className="flex items-center gap-2 text-xs font-mono"><Heart size={16} /> 0</div>
                                            <div className="flex items-center gap-2 text-xs font-mono"><MessageSquare size={16} /> 0</div>
                                            <div className="flex items-center gap-2 text-xs font-mono"><BarChart3 size={16} /> 0</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Bookmark size={16} /><Share size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-zinc-300 bg-white flex flex-col gap-4 shrink-0">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase leading-none">Payload_Size</span>
                                        <span className={cn("text-[10px] font-mono font-bold mt-1", content.length > 280 ? "text-red-600" : "text-zinc-900")}>
                                            {content.length.toString().padStart(3, '0')}_CHARS
                                        </span>
                                    </div>
                                    <div className="w-px h-6 bg-zinc-200" />
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-mono font-black text-zinc-400 uppercase leading-none">Attachments</span>
                                        <span className="text-[10px] font-mono font-bold mt-1 text-zinc-900">
                                            {images.length.toString().padStart(2, '0')}_IMG / {poll ? "01" : "00"}_POLL
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-2 py-1 bg-zinc-100 border border-zinc-200">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[8px] font-mono font-black text-zinc-600 uppercase">Uplink_Ready</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex p-1 border border-zinc-300 gap-1">
                                    <ToolbarButton onClick={addImage} icon={<ImageIcon size={14} />} label="IMG" active={images.length > 0} className="hover:bg-white transition-colors" />
                                    <ToolbarButton onClick={togglePoll} icon={<BarChart3 size={14} />} label="POLL" active={!!poll} className="hover:bg-white transition-colors" />
                                </div>

                                <button onClick={handleTransmit} disabled={!content || isTransmitting} className={cn("h-11 px-8 font-mono font-black text-[11px] uppercase tracking-[0.3em] cursor-pointer transition-all flex items-center gap-4 relative overflow-hidden group", isTransmitting ? "bg-emerald-600 text-white" : "bg-zinc-900 text-white hover:bg-orange-600 disabled:bg-zinc-100 disabled:text-zinc-400")}>
                                    <div className="flex items-center gap-3 relative z-10">
                                        {isTransmitting ? "Creating..." : "Create Post"}
                                        {isTransmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                                    </div>
                                    {isTransmitting && (
                                        <div className="absolute bottom-0 left-0 h-1 bg-emerald-400 animate-[progress_2s_ease-in-out]" style={{ width: '100%' }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <aside className="w-38.5 flex flex-col overflow-y-auto scrollbar-hide shrink-0 ">
                        <div className="p-2 border-b border-zinc-300 bg-white relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '10px 10px' }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center">
                                        <span className="text-lg font-black text-white font-mono">O</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h5 className="text-[11px] font-bold uppercase tracking-tight text-zinc-900 leading-none">OpenAI</h5>
                                        <span className="text-[9px] font-mono text-zinc-400 mt-1 uppercase tracking-widest font-bold">AI system</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center bg-zinc-100 p-2 border border-zinc-200">
                                        <Users size={12} className="text-zinc-500" />
                                        <span className="text-[10px] font-mono font-bold text-zinc-900 uppercase">1,204 follower</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 space-y-2">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Reach Predict</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Est. Reach</span>
                                            <span className="text-[10px] font-mono font-bold text-zinc-900">2.4k</span>
                                        </div>
                                        <div className="h-1 bg-zinc-200 w-full overflow-hidden">
                                            <div className="h-full bg-zinc-900 w-[65%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">Signal Str</span>
                                            <span className="text-[10px] font-mono font-bold text-orange-600">98%</span>
                                        </div>
                                        <div className="h-1 bg-zinc-200 w-full overflow-hidden">
                                            <div className="h-full bg-orange-500 w-[98%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-zinc-200">
                                <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block mb-3">Latest Post</span>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono uppercase text-zinc-500">Reach</span>
                                        <span className="text-[9px] font-mono font-bold text-emerald-600">3200</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono uppercase text-zinc-500">Likes</span>
                                        <span className="text-[9px] font-mono font-bold text-zinc-900">239</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono uppercase text-zinc-500">Comments</span>
                                        <span className="text-[9px] font-mono font-bold text-zinc-900">24</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default CreatePost;