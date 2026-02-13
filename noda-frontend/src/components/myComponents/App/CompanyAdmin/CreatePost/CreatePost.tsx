import { useState, useCallback } from 'react';
import { Send, Image as ImageIcon, BarChart3, CheckCircle2, Terminal, Users, Zap } from 'lucide-react';
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

    const handleTransmit = useCallback(() => {
        setIsTransmitting(true);
        setTimeout(() => setIsTransmitting(false), 2000);
    }, []);

    const addImage = useCallback(() => {
        const mockImg = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800";
        if (images.length < 4) setImages(prev => [...prev, mockImg]);
    }, [images]);

    const togglePoll = useCallback(() => {
        setPoll(prev => prev ? null : { options: ["Option_01", "Option_02"] });
    }, []);

    const addPollOption = useCallback(() => {
        if (poll && poll.options.length < 4) {
            setPoll({ ...poll, options: [...poll.options, `Option_0${poll.options.length + 1}`] });
        }
    }, [poll]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-13 divide-x divide-zinc-300">
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-300 bg-zinc-50/50 flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-orange-600" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Broadcast_Station_01</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">Uplink: Stable</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                        </div>

                        {/* Text Input */}
                        <div className="flex-1 flex flex-col p-6 overflow-y-auto scrollbar-hide">
                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block mb-4">Transmission_Input</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="INITIALIZE SIGNAL BROADCAST..."
                                className="w-full text-base font-bold text-zinc-800 placeholder:text-zinc-400 resize-none outline-none leading-relaxed min-h-[120px]"
                            />
                            
                            {images.length > 0 && <ImageGrid images={images} onRemove={(idx) => setImages(images.filter((_, i) => i !== idx))} />}
                            {poll && <PollModule poll={poll} onToggle={togglePoll} onAddOption={addPollOption} />}
                        </div>

                        {/* Footer Toolbar */}
                        <div className="px-3 border-t border-zinc-300 bg-white flex items-center justify-between sticky bottom-2 z-20">
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
                        <div className="p-4 border-b border-zinc-300 bg-zinc-800 text-white flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-white flex items-center justify-center mb-3">
                                <span className="text-xl font-black text-zinc-900 font-mono">O</span>
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">OpenAI</h5>
                            <div className="flex items-center gap-1 text-zinc-300">
                                <Users size={12} />
                                <span className="text-[9px] font-mono font-bold uppercase tracking-tighter">1,204_NODES</span>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="flex items-center gap-2 mb-2"><Zap size={14} className="text-orange-600" /><span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Global_Stats</span></div>
                            <StatItem label="Avg_Reach" value="12.4k" />
                            <StatItem label="Engagement" value="4.2%" />
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default CreatePost;