import { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, BarChart3, CheckCircle2, Terminal, Users, Zap, MoreHorizontal, MessageSquare, Bookmark, Share, Heart, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import { ImageGrid, PollModule } from './BroadcastAttachments';
import { StatItem, ToolbarButton } from './BroadcastStats';
import type { Poll } from '@/types/admin/createPost';

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [poll, setPoll] = useState<Poll | null>(null);
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 1. AUTO-EXPANDING TEXTAREA LOGIC
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "0px"; // Reset
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
        // Allow unlimited uploads now
        setImages(prev => [...prev, mockImg]);
    }, []);

    const togglePoll = useCallback(() => {
        setPoll(prev => prev ? null : { options: ["Option_01", "Option_02"] });
    }, []);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-12.5 divide-x divide-zinc-300">
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        {/* System Header */}
                        <div className="p-2 bg-zinc-800 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-orange-500" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-200">Protocol: Live_Broadcast_Preview</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>

                        {/* SCROLLABLE CONTAINER (TextArea + Preview grow here) */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
                            
                            <div className="p-2 bg-white flex-1 flex flex-col">
                                {/* Author Info */}
                                <div className="flex justify-between items-start mb-3 shrink-0">
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

                                {/* Content Input Area */}
                                <div className="pl-[52px] flex-1 flex flex-col">
                                    <textarea 
                                        ref={textareaRef}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Type transmission content here..."
                                        className="w-full text-sm text-zinc-800 placeholder:text-zinc-300 resize-none outline-none leading-relaxed bg-transparent overflow-hidden"
                                    />

                                    {/* ATTACHMENTS (Images / Poll) */}
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
                                                            
                                                            {/* Blur Overlay for 4th Image */}
                                                            {isFourth && hasMore && (
                                                                <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[4px] flex items-center justify-center">
                                                                    <span className="text-white text-lg font-mono font-black tracking-widest">
                                                                        +{images.length - 3}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            
                                                            {/* Remove button for individual images (optional but helpful) */}
                                                            <button 
                                                                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-none hover:bg-red-600 transition-colors"
                                                            >
                                                                <X size={10} />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        
                                        {poll && <PollModule poll={poll} onToggle={togglePoll} />}
                                    </div>

                                    {/* Mock Post Interaction Bar (Ghost State) */}
                                    <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between opacity-30 pointer-events-none grayscale pb-4">
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

                        {/* FOOTER TOOLBAR (Fixed) */}
                        <div className="p-4 border-t border-zinc-300 bg-white flex items-center justify-between shrink-0">
                            <div className="flex divide-x divide-zinc-200 border border-zinc-200">
                                <ToolbarButton onClick={addImage} icon={<ImageIcon size={16} />} label="IMG" active={images.length > 0} />
                                <ToolbarButton onClick={togglePoll} icon={<BarChart3 size={16} />} label="POLL" active={!!poll} />
                            </div>

                            <button 
                                onClick={handleTransmit}
                                disabled={!content || isTransmitting}
                                className={cn(
                                    "h-10 px-6 font-mono font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all flex items-center gap-3",
                                    isTransmitting ? "bg-emerald-600 text-white" : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-100"
                                )}
                            >
                                {isTransmitting ? "SIGNAL_SENT" : "Transmit_Signal"}
                                {isTransmitting ? <CheckCircle2 size={14} /> : <Send size={14} />}
                            </button>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <aside className="w-40 flex flex-col overflow-y-auto scrollbar-hide shrink-0">
                        <div className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex flex-col items-center text-center shrink-0">
                            <div className="w-12 h-12 bg-white flex items-center justify-center mb-3">
                                <span className="text-xl font-black text-zinc-900 font-mono">O</span>
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">OpenAI_Nodes</h5>
                            <div className="flex items-center gap-1 text-zinc-300">
                                <Users size={12} />
                                <span className="text-[9px] font-mono font-bold uppercase tracking-tighter">1,204_ACTIVE</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Zap size={14} className="text-orange-600" /><span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Predict</span></div>
                            <StatItem label="Reach" value="~2.4k" />
                            <StatItem label="Signal" value="98%" />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default CreatePost;