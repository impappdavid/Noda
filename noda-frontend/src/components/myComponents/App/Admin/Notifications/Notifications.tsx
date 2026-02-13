import React, { useState } from 'react';
import { Send, Zap, Terminal, Globe, Bell, Eye, Link as LinkIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

const AdminNotificationsPage = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [targetRoute, setTargetRoute] = useState(""); // New state for redirection
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleBroadcast = () => {
        setIsTransmitting(true);
        setTimeout(() => setIsTransmitting(false), 2000);
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-13">
                    
                    {/* 1. SLIM HEADER */}
                    <div className="px-4 h-9 border-b border-zinc-900 bg-zinc-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <Bell size={12} className="text-white" />
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">Signal_Broadcaster</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-300 uppercase font-black tracking-tighter italic">Auth: Admin_Verified</span>
                    </div>

                    <div className="flex-1 flex flex-col overflow-hidden">
                        {/* 2. INPUT AREA - REDUCED SPACING */}
                        <div className="flex-1 flex flex-col p-4 space-y-4 overflow-y-auto scrollbar-hide">
                            
                            {/* Title Input */}
                            <div className="space-y-1">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Terminal size={12} /> Header
                                </label>
                                <input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="BROADCAST_TITLE..." 
                                    className="w-full text-lg font-bold uppercase tracking-tighter border-b border-zinc-300 outline-none pb-1 transition-colors placeholder:text-zinc-500 "
                                />
                            </div>

                            {/* Redirection Link Input */}
                            <div className="space-y-1">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <LinkIcon size={12} /> Redirection_Node
                                </label>
                                <input 
                                    value={targetRoute}
                                    onChange={(e) => setTargetRoute(e.target.value)}
                                    placeholder="/app/noda/roadmap" 
                                    className="w-full text-[11px] font-mono font-bold uppercase tracking-tight border-b border-zinc-300 outline-none pb-1 transition-colors placeholder:text-zinc-500 "
                                />
                            </div>

                            {/* Message Input */}
                            <div className="space-y-1">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                    <Globe size={12} /> Payload
                                </label>
                                <textarea 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="TRANSMISSION_DATA..."
                                    className="w-full h-24 bg-zinc-50/50 border border-zinc-300 p-3 text-[10px] font-mono font-bold uppercase outline-none resize-none leading-relaxed placeholder:text-zinc-500"
                                />
                            </div>

                            {/* 3. MINIMAL PREVIEW */}
                            <div className="pt-4 border-t border-zinc-300">
                                <div className="flex items-center gap-2 mb-3">
                                    <Eye size={12} className="text-zinc-500" />
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                        End_User_View
                                    </span>
                                </div>
                                
                                <div className="w-full max-w-xs border border-zinc-300 p-3 flex items-center gap-3 bg-white relative group cursor-pointer">
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500" />
                                    
                                    <div className="w-7 h-7 bg-zinc-800 flex items-center justify-center shrink-0">
                                        <Zap size={12} className="text-white fill-white" />
                                    </div>
                                    <div className="flex flex-1 flex-col min-w-0 justify-center">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase truncate leading-none mb-1">
                                                {title || "VOID_SIGNAL"}
                                            </span>
                                            {targetRoute && <LinkIcon size={10} className="text-orange-500 animate-pulse" />}
                                        </div>
                                        <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase truncate">
                                            {message || "No data in buffer..."}
                                        </p>
                                    </div>
                                </div>
                                {targetRoute && (
                                    <p className="mt-2 text-[10px] font-mono text-zinc-500 uppercase tracking-tighter italic">
                                        * User_Redirect_Active: {targetRoute}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* 4. BOTTOM ACTION BAR */}
                        <div className="p-3 border-t border-zinc-300 bg-white">
                            <button 
                                onClick={handleBroadcast}
                                disabled={isTransmitting || !title}
                                className={cn(
                                    "w-full h-10 flex items-center justify-center gap-3 font-mono font-black text-[10px] uppercase tracking-[0.3em] transition-all",
                                    isTransmitting 
                                        ? "bg-emerald-500 text-white" 
                                        : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-400 disabled:text-zinc-700 disabled:border-zinc-500 cursor-pointer transition-colors"
                                )}
                            >
                                {isTransmitting ? "TRANSMITTING" : "Push_Signal"}
                                {isTransmitting ? <Zap size={12} fill="currentColor" className="animate-pulse" /> : <Send size={12} />}
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminNotificationsPage;