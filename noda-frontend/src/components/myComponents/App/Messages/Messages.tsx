import { useState } from 'react';
import { 
  Search, MoreHorizontal, Send, 
} from 'lucide-react';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import Navbar from '../AppNavbar';

const MessagesPage = () => {
    const [activeNode, setActiveNode] = useState(1);

    const nodes = [
        { id: 1, name: 'Marcus Vane', role: 'Principal Architect', lastMsg: 'Signal received. Reviewing the Rust benchmarks now.', time: '12:04', unread: true },
        { id: 2, name: 'Sarah Chen', role: 'Lead Dev @ Vercel', lastMsg: 'The latency looks within acceptable parameters.', time: 'Yesterday', unread: false },
        { id: 3, name: 'Alex Rivers', role: 'Systems Engineer', lastMsg: 'Node cluster sync complete.', time: 'Mon', unread: false },
    ];

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                {/* LEFT: NAV (w-24) */}
                <aside className="w-24 shrink-0 border-r border-zinc-100">
                    <div className="h-full py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white h-full flex overflow-hidden pt-13">
                    
                    {/* 1. CENTER: SIGNAL THREAD (Chat) */}
                    <div className="flex-1 flex flex-col bg-white border-r border-zinc-300">
                        {/* Thread Header */}
                        <div className="h-14 border-b border-zinc-300 px-6 flex items-center justify-between shrink-0 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center shrink-0">
                                    <span className="text-white font-mono font-black text-xs uppercase">MV</span>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-[11px] font-black uppercase tracking-tighter text-zinc-900">Marcus Vane</h2>
                                    <span className="text-[8px] font-mono font-black text-emerald-600 uppercase tracking-widest">Active_Node</span>
                                </div>
                            </div>
                            <MoreHorizontal size={16} className="text-zinc-300 cursor-pointer hover:text-zinc-900" />
                        </div>

                        {/* Message Feed */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            <MessageBubble 
                                sender="Marcus Vane" 
                                time="12:00" 
                                text="Initial signal check. Are the Rust cluster nodes synchronized for the 14:00 benchmark?" 
                            />
                            <MessageBubble 
                                sender="Me" 
                                isMe 
                                time="12:02" 
                                text="Negative. We have a slight latency skew on Node_04. Correcting the serialization protocol now." 
                            />
                            <MessageBubble 
                                sender="Marcus Vane" 
                                time="12:04" 
                                text="Signal received. Reviewing the Rust benchmarks now. Update when skew is < 5ms." 
                            />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-zinc-300 bg-white">
                            <div className="relative flex items-center">
                                <textarea 
                                    placeholder="TRANSMIT_SIGNAL..." 
                                    className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 pr-14 text-[11px] font-mono font-bold uppercase outline-none focus:border-zinc-900 transition-all resize-none h-12 scrollbar-hide"
                                />
                                <button className="absolute right-2 p-2 bg-zinc-900 text-white hover:bg-black transition-colors">
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. RIGHT: NODE DIRECTORY (User List) */}
                    <aside className="w-64 flex flex-col bg-zinc-50/30">
                        <div className="p-4 border-b border-zinc-300 bg-white">
                            <div className="relative group">
                                <Search className="absolute left-2.5 top-2.5 text-zinc-300 group-focus-within:text-zinc-900 transition-colors" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="SEARCH_NODES..." 
                                    className="w-full bg-zinc-50 border border-zinc-200 pl-9 pr-3 py-2 text-[10px] font-mono font-bold uppercase outline-none focus:border-zinc-900 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            <div className="px-4 py-3 border-b border-zinc-200 bg-zinc-50/50">
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Active_Threads</span>
                            </div>
                            {nodes.map((node) => (
                                <button
                                    key={node.id}
                                    onClick={() => setActiveNode(node.id)}
                                    className={cn(
                                        "w-full p-4 flex flex-col gap-1.5 border-b border-zinc-200 text-left transition-all",
                                        activeNode === node.id ? "bg-white shadow-[inset_-4px_0_0_0_#18181b]" : "hover:bg-zinc-100/50"
                                    )}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-[11px] font-black uppercase tracking-tighter">{node.name}</span>
                                        <span className="text-[8px] font-mono font-bold text-zinc-300">{node.time}</span>
                                    </div>
                                    <p className="text-[9px] font-bold text-zinc-500 uppercase truncate tracking-tight">{node.lastMsg}</p>
                                    {node.unread && (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                            <span className="text-[7px] font-mono font-black text-blue-600 uppercase tracking-widest">Signal_Unread</span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

// --- HELPER COMPONENTS ---

const MessageBubble = ({ sender, text, time, isMe }: any) => (
    <div className={cn("flex flex-col max-w-[85%]", isMe ? "ml-auto items-end" : "items-start")}>
        <div className="flex items-center gap-2 mb-1.5 px-1">
            {!isMe && <span className="text-[9px] font-black uppercase text-zinc-900">{sender}</span>}
            <span className="text-[8px] font-mono font-bold text-zinc-300">{time}</span>
        </div>
        <div className={cn(
            "px-4 py-3 border text-[11px] font-bold uppercase leading-relaxed tracking-tight",
            isMe ? "bg-zinc-900 text-white border-zinc-900" : "bg-white border-zinc-200 text-zinc-600"
        )}>
            {text}
        </div>
    </div>
);

export default MessagesPage;