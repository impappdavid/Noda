import { useState } from 'react';
import { MoreHorizontal, Send } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import MessageBubble from './MessageBubble';
import NodeDirectory from './NodeDirectory';
import type { ChatNode, Message } from '@/types/messages';

const MOCK_NODES: ChatNode[] = [
    { id: 1, name: 'Marcus Vane', role: 'Principal Architect', lastMsg: 'Signal received...', time: '12:04', unread: true },
    { id: 2, name: 'Sarah Chen', role: 'Lead Dev @ Vercel', lastMsg: 'The latency looks...', time: 'Yesterday', unread: false },
    { id: 3, name: 'Alex Rivers', role: 'Systems Engineer', lastMsg: 'Node cluster sync...', time: 'Mon', unread: false },
];

const MOCK_MESSAGES: Message[] = [
    { id: '1', sender: "Marcus Vane", time: "12:00", text: "Initial signal check. Are the Rust cluster nodes synchronized for the 14:00 benchmark?" },
    { id: '2', sender: "Me", isMe: true, time: "12:02", text: "Negative. We have a slight latency skew on Node_04. Correcting the serialization protocol now." },
    { id: '3', sender: "Marcus Vane", time: "12:04", text: "Signal received. Reviewing the Rust benchmarks now. Update when skew is < 5ms." },
];

const MessagesPage = () => {
    const [activeNodeId, setActiveNodeId] = useState(1);
    const activeNode = MOCK_NODES.find(n => n.id === activeNodeId);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <div className="h-full py-4"><AppSideBar /></div>
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white h-full overflow-hidden pt-13">
                    {/* THREAD VIEW */}
                    <div className="flex-1 flex flex-col bg-white">
                        <header className="border-b border-zinc-300 p-3 flex items-center justify-between bg-white shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                                    <span className="text-white font-mono font-black text-xs uppercase">
                                        {activeNode?.name.substring(0, 2)}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-xs font-bold uppercase tracking-tighter text-zinc-900">{activeNode?.name}</h2>
                                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest">{activeNode?.role}</span>
                                </div>
                            </div>
                            <MoreHorizontal size={16} className="text-zinc-500 cursor-pointer hover:text-zinc-900" />
                        </header>

                        <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide bg-zinc-50/10">
                            {MOCK_MESSAGES.map(msg => <MessageBubble key={msg.id} {...msg} />)}
                        </div>

                        <footer className="border-t border-zinc-300 bg-white p-0">
                            <div className="relative flex items-center">
                                <textarea 
                                    placeholder="TRANSMIT_SIGNAL..." 
                                    className="w-full bg-zinc-50 border-none px-3 py-4 pr-12 text-[10px] font-mono font-black uppercase outline-none focus:bg-white transition-all resize-none h-14"
                                />
                                <button className="absolute right-0 h-full px-4 bg-zinc-800 text-white hover:bg-black transition-colors border-none cursor-pointer">
                                    <Send size={14} />
                                </button>
                            </div>
                        </footer>
                    </div>

                    <NodeDirectory 
                        nodes={MOCK_NODES} 
                        activeNode={activeNodeId} 
                        onNodeSelect={setActiveNodeId} 
                    />
                </main>
            </div>
        </div>
    );
};

export default MessagesPage;