import React, { useState } from 'react';
import { 
    Send, Image as ImageIcon, BarChart3, 
    AlertTriangle, CheckCircle2, Zap, 
    Users, Terminal, Smile, X, Plus, Trash2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);
    
    // --- ATTACHMENT STATES ---
    const [images, setImages] = useState<string[]>([]);
    const [poll, setPoll] = useState<{ options: string[] } | null>(null);
    const [showEmoji, setShowEmoji] = useState(false);

    const handleTransmit = () => {
        setIsTransmitting(true);
        setTimeout(() => setIsTransmitting(false), 2000);
    };

    const addImage = () => {
        // Mock adding an image node
        const mockImg = "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800";
        if (images.length < 4) setImages([...images, mockImg]);
    };

    const togglePoll = () => {
        if (poll) setPoll(null);
        else setPoll({ options: ["Option_01", "Option_02"] });
    };

    const addPollOption = () => {
        if (poll && poll.options.length < 4) {
            setPoll({ ...poll, options: [...poll.options, `Option_0${poll.options.length + 1}`] });
        }
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-row pt-13 divide-x divide-zinc-300">
                    
                    {/* LEFT: MAIN BROADCAST SECTION */}
                    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                        {/* Protocol Header */}
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

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col p-6 overflow-y-auto scrollbar-hide">
                            <label className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block mb-4">Transmission_Input</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="INITIALIZE SIGNAL BROADCAST..."
                                className="w-full text-base font-bold text-zinc-800 placeholder:text-zinc-400 resize-none outline-none leading-relaxed min-h-[120px]"
                            />
                            
                            {/* DYNAMIC IMAGE GRID SYSTEM */}
                            {images.length > 0 && (
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
                                                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                                className="absolute top-2 right-2 p-1 bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* POLL PROTOCOL UI */}
                            {poll && (
                                <div className="mt-6 p-4 border border-zinc-300 bg-zinc-50/50 space-y-3 relative animate-in slide-in-from-top-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">Active_Poll_Protocol</span>
                                        <button onClick={togglePoll} className="text-zinc-400 hover:text-red-600 cursor-pointer "><X size={14}/></button>
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
                                            onClick={addPollOption}
                                            className="w-full h-8 border border-dashed border-zinc-300 text-[9px] font-mono font-black text-zinc-500 uppercase hover:border-zinc-900 hover:text-zinc-900 transition-all cursor-pointer"
                                        >
                                            + Add_Option
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Toolbar Protocol */}
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
                                    isTransmitting 
                                        ? "bg-emerald-600 text-white" 
                                        : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-100"
                                )}
                            >
                                {isTransmitting ? "SIGNAL_SENT" : "Transmit_Signal"}
                                {isTransmitting ? <CheckCircle2 size={14} /> : <Send size={14} />}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: PERFORMANCE MONITOR */}
                    <div className="w-40 flex flex-col overflow-y-auto scrollbar-hide shrink-0">
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

                        <div className="p-4 space-y-4 flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={14} className="text-orange-600" />
                                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-900">Global_Stats</span>
                            </div>
                            <div className="space-y-4">
                                <StatItem label="Avg_Reach" value="12.4k" />
                                <StatItem label="Engagement" value="4.2%" />
                                <StatItem label="Peak_Sync" value="14:00" />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- SUB-COMPONENTS ---

const StatItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col">
        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-sm font-bold text-zinc-900 tracking-tighter">{value}</span>
    </div>
);

const ToolbarButton = ({ icon, label, onClick, active }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "h-9 px-3 flex items-center gap-2 transition-colors cursor-pointer group",
            active ? "bg-orange-500/40 text-zinc-900" : "hover:bg-zinc-50 text-zinc-600"
        )}
    >
        <span className={cn(active ? "text-orange-600" : "group-hover:text-zinc-900")}>{icon}</span>
        <span className="text-[10px] font-mono font-black uppercase">{label}</span>
    </button>
);

export default CreatePost;