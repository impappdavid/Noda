import { useState } from 'react';
import { Send, Zap, Terminal, Globe, Bell, Eye, Link as LinkIcon, Info } from 'lucide-react';
import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import { motion, AnimatePresence } from "framer-motion";

const AdminNotificationsPage = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [targetRoute, setTargetRoute] = useState("");
    const [isTransmitting, setIsTransmitting] = useState(false);

    const [lastBroadcast, setLastBroadcast] = useState({ title: "", message: "" });
    const [showConfirm, setShowConfirm] = useState(false);

    const handleBroadcast = () => {
        if (!title) return;

        setIsTransmitting(true);

        // 2. CAPTURE THE DATA BEFORE CLEARING
        setLastBroadcast({ title, message });

        setTimeout(() => {
            setIsTransmitting(false);
            setShowConfirm(true);

            // 3. NOW CLEAR THE FORM - the Alert will use 'lastBroadcast' instead
            setTitle("");
            setMessage("");
            setTargetRoute("");

            setTimeout(() => setShowConfirm(false), 5000);
        }, 1200);
    };

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden relative">
            <Navbar />

            {/* --- RE-STYLED BRUTALIST ALERT --- */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-6 right-6 z-[100] w-full max-w-xs"
                    >
                        <div className="w-full max-w-xs border border-zinc-300 p-2 flex items-center gap-3 bg-white relative shadow-xl">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500" />
                            <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center shrink-0">
                                <Info size={14} className="text-white" />
                            </div>
                            <div className="flex flex-1 flex-col min-w-0 justify-center">
                                <div className="flex items-center justify-between">
                                    {/* USE THE SNAPSHOTTED STATE HERE */}
                                    <span className="text-[11px] font-bold uppercase truncate leading-none mb-1">
                                        {lastBroadcast.title}
                                    </span>
                                    {targetRoute && <LinkIcon size={10} className="text-orange-500 animate-pulse" />}
                                </div>
                                <p className="text-[11px] font-mono font-bold text-zinc-600 uppercase">
                                    {lastBroadcast.message}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0"><AppSideBar /></aside>

                <main className="flex flex-1 border-x border-zinc-300 ml-4 bg-white overflow-hidden flex-col pt-12.5">
                    <div className="px-4 h-9 border-b border-zinc-900 bg-zinc-800 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-2">
                            <Bell size={12} className="text-white" />
                            <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.3em]">Signal_Broadcaster</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-300 uppercase font-black tracking-tighter italic">Auth: Admin_Verified</span>
                    </div>

                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex flex-col overflow-y-auto scrollbar-hide">
                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Signal_Header</label>
                                <div className="relative flex items-center h-6">
                                    <Terminal className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="BROADCAST_TITLE_CORE" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent placeholder:text-zinc-500" />
                                </div>
                            </div>

                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Redirection_Node</label>
                                <div className="relative flex items-center h-6">
                                    <LinkIcon className="w-3 h-3 text-zinc-500 mr-2 shrink-0" />
                                    <input value={targetRoute} onChange={(e) => setTargetRoute(e.target.value)} placeholder="/APP/NODA/ROADMAP" className="w-full text-[10px] font-bold uppercase outline-none bg-transparent placeholder:text-zinc-500" />
                                </div>
                            </div>

                            <div className="bg-white px-3 py-2 space-y-1 border-b border-zinc-300">
                                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">Transmission_Payload</label>
                                <div className="relative flex items-start pt-1">
                                    <Globe className="w-3 h-3 text-zinc-500 mr-2 mt-0.5 shrink-0" />
                                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="TYPE_GLOBAL_DATA_STREAM..." className="w-full text-[10px] font-bold uppercase outline-none bg-transparent min-h-[80px] resize-none leading-tight placeholder:text-zinc-500" />
                                </div>
                            </div>

                            <div className="p-4 bg-zinc-50/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <Eye size={12} className="text-zinc-500" />
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">End_User_View</span>
                                </div>
                                <div className="w-full max-w-xs border border-zinc-300 p-3 flex items-center gap-3 bg-white relative">
                                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500" />
                                    <div className="w-7 h-7 bg-zinc-800 flex items-center justify-center shrink-0">
                                        <Zap size={12} className="text-white fill-white" />
                                    </div>
                                    <div className="flex flex-1 flex-col min-w-0 justify-center">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold uppercase truncate leading-none mb-1">{title || "VOID_SIGNAL"}</span>
                                            {targetRoute && <LinkIcon size={10} className="text-orange-500 animate-pulse" />}
                                        </div>
                                        <p className="text-[9px] font-mono font-bold text-zinc-500 uppercase truncate">{message || "No data in buffer..."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-zinc-300 bg-white">
                            <button onClick={handleBroadcast} disabled={isTransmitting || !title} className={cn("w-full h-12 flex items-center justify-center gap-3 font-mono font-black text-[10px] uppercase tracking-[0.3em] transition-all", isTransmitting ? "bg-orange-500 text-white" : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-400 disabled:text-zinc-200 cursor-pointer")}>
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