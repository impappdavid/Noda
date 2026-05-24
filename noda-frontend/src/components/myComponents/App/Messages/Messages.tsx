import { useState } from 'react';
import { MoreHorizontal, Send, Smile, Image, Paperclip, Mic, Radio, Activity } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

interface ChatNode {
  id: number;
  name: string;
  role: string;
  lastMsg: string;
  time: string;
  unread: boolean;
  avatar: string;
}

interface Message {
  id: string;
  nodeId: number;
  sender: string;
  time: string;
  text: string;
  isMe?: boolean;
  avatar?: string;
}

const MOCK_NODES: ChatNode[] = [
  { id: 1, name: 'Marcus Vane', role: 'Principal Architect', lastMsg: 'Signal received...', time: '12:04', unread: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 2, name: 'Sarah Chen', role: 'Lead Dev @ Vercel', lastMsg: 'The latency looks...', time: 'Yesterday', unread: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 3, name: 'Alex Rivers', role: 'Systems Engineer', lastMsg: 'Node cluster sync...', time: 'Mon', unread: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
];

const MOCK_MESSAGES: Message[] = [
  // Thread Node 1: Marcus Vane
  { id: '1', nodeId: 1, sender: "Marcus Vane", time: "12:00", text: "Initial signal check. Are the Rust cluster nodes synchronized for the 14:00 benchmark?", avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: '2', nodeId: 1, sender: "Me", isMe: true, time: "12:02", text: "Negative. We have a slight latency skew on Node_04. Correcting the serialization protocol now.", avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: '3', nodeId: 1, sender: "Marcus Vane", time: "12:04", text: "Signal received. Reviewing the Rust benchmarks now. Update when skew is < 5ms.", avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },

  // Thread Node 2: Sarah Chen
  { id: '4', nodeId: 2, sender: "Sarah Chen", time: "Yesterday", text: "The latency looks stable across Europe-West deployments, but Edge caching headers aren't purging instantly on upstream pushes.", avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: '5', nodeId: 2, sender: "Me", isMe: true, time: "Yesterday", text: "Verified. Vercel webhook events might be throttling down under active parallel queue loops. Let me force clean the pipeline cache manually.", avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },

  // Thread Node 3: Alex Rivers
  { id: '6', nodeId: 3, sender: "Me", isMe: true, time: "Mon", text: "Alex, did you complete the snapshot extraction log for the analytical database partition?", avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: '7', nodeId: 3, sender: "Alex Rivers", time: "Mon", text: "Node cluster sync finished around 04:00 UTC. Main volumes are backed up, and file hashes are stored safely in cold storage directories.", avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80' },
];

const MessagesPage = () => {
  const [activeNodeId, setActiveNodeId] = useState(1);
  const [inputText, setInputText] = useState("");
  const maxLength = 1000;

  const activeNode = MOCK_NODES.find(n => n.id === activeNodeId);
  const currentMessages = MOCK_MESSAGES.filter(msg => msg.nodeId === activeNodeId);

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
        <aside className="w-25 shrink-0 select-none">
          <div className="h-full py-4">
            <AppSideBar />
          </div>
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 bg-white h-full overflow-hidden pt-13 flex-row">
          
          {/* THREAD STREAM SECTION */}
          <div className="flex-1 flex flex-col bg-white min-w-0 border-r border-zinc-200">
            
            {/* ACTIVE THREAD HEADER */}
            <header className="border-b border-zinc-300 p-1.5 flex items-center justify-between bg-zinc-50/40 select-none shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={activeNode?.avatar} 
                  alt="" 
                  className="w-8 h-8 object-cover  shrink-0" 
                />
                <div className="flex flex-col min-w-0">
                  <h2 className="text-[10px] font-mono font-black uppercase tracking-tight text-zinc-950 truncate">
                    {activeNode?.name}
                  </h2>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 truncate">
                    {activeNode?.role}
                  </span>
                </div>
              </div>
              <button type="button" className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 cursor-pointer">
                <MoreHorizontal size={14} />
              </button>
            </header>

            {/* DYNAMIC MESSAGE STREAM BUBBLES */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-4 scrollbar-hide bg-gradient-to-b from-zinc-50/30 to-transparent">
              {currentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%] animate-in fade-in duration-100",
                    msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  {/* Sender Metadata Row with Avatar */}
                  <div className={cn(
                    "flex items-center gap-1.5 mb-1 select-none ",
                    msg.isMe ? "flex-row-reverse" : "flex-row"
                  )}>
                    <img 
                      src={msg.avatar} 
                      alt="" 
                      className="w-5 h-5 object-cover border border-zinc-200"
                    />
                    <span className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-tight">
                      {msg.sender} <span className="font-normal font-sans text-zinc-400 ml-0.5">({msg.time})</span>
                    </span>
                  </div>

                  {/* Dynamic Message Bubble Blocks */}
                  <div className={cn(
                    "p-2 text-[10.5px] font-sans leading-relaxed tracking-normal border",
                    msg.isMe 
                      ? "bg-blue-500 text-white border-blue-600 shadow-sm" 
                      : "bg-zinc-200 text-zinc-900 border-zinc-200"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* LIGHT MODED COMPACT FOOTER INPUT */}
            <footer className="border-t border-zinc-300 bg-white shrink-0 select-none p-2">
              <div className="border border-zinc-300 bg-white flex flex-col focus-within:border-zinc-900 transition-colors">
                
                {/* Text Entry Field Area */}
                <div className="relative flex items-start min-h-12 pt-2.5 px-3">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value.substring(0, maxLength))}
                    placeholder="Write your message..." 
                    rows={1}
                    className="w-full bg-transparent text-[11px] text-zinc-900 font-mono font-bold outline-none placeholder:text-zinc-400 resize-none h-auto min-h-6 pr-8 leading-tight"
                  />
                  
                  {/* Background-Free Send Tracker Trigger */}
                  <button 
                    type="button" 
                    className="absolute right-2 top-2 h-7 w-7 flex items-center justify-center bg-transparent text-zinc-500 hover:text-blue-500 transition-colors cursor-pointer active:scale-[0.95]"
                  >
                    <Send size={13} />
                  </button>
                </div>

                {/* SQUARED ATTACHMENT ACTION TOOLBAR */}
                <div className="border-t border-zinc-300 bg-zinc-50/70 h-8 px-2 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      className="h-6 px-2 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                    >
                      <Smile size={11} />
                      <span>Emoji</span>
                    </button>

                    {/* Added GIF Action Feature Block */}
                    <button
                      type="button"
                      className="h-6 px-2 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                    >
                      <Image size={11} />
                      <span>Gif</span>
                    </button>

                    <button
                      type="button"
                      className="h-6 px-2 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                    >
                      <Paperclip size={11} />
                      <span>Attach</span>
                    </button>

                    <button
                      type="button"
                      className="h-6 px-2 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                    >
                      <Mic size={11} />
                      <span>Voice Message</span>
                    </button>
                  </div>

                  {/* Character Counter Display */}
                  <div className="pr-1.5 text-[8.5px] font-mono font-bold text-zinc-400 select-none">
                    {inputText.length}/{maxLength}
                  </div>
                </div>

              </div>
            </footer>
          </div>

          {/* PEER SELECTION SIDE DIRECTORY PANEL */}
          <div className="w-44 bg-white flex flex-col shrink-0 select-none">
            <header className="h-11 border-b border-zinc-300 p-2.5 flex items-center bg-zinc-50/60 shrink-0">
              <span className="text-[8.5px] font-mono font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                <Radio size={10} className="text-zinc-600 animate-pulse" /> Active_Peers_Index
              </span>
            </header>
            
            <div className="flex-1 overflow-y-auto divide-y divide-zinc-100 scrollbar-hide">
              {MOCK_NODES.map((node) => {
                const isSelected = node.id === activeNodeId;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNodeId(node.id)}
                    className={cn(
                      "p-2.5 text-left cursor-pointer transition-all flex flex-col gap-0.5 relative",
                      isSelected 
                        ? "bg-zinc-50 border-l-2 border-zinc-950 pl-2" 
                        : "hover:bg-zinc-50/50 border-l-2 border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={cn(
                        "text-[9.5px] font-mono font-black truncate uppercase tracking-tight",
                        node.unread ? "text-blue-600" : "text-zinc-900"
                      )}>
                        {node.name}
                      </span>
                      <span className="text-[7.5px] font-mono font-bold text-zinc-400 shrink-0">{node.time}</span>
                    </div>
                    
                    <p className="text-[8.5px] font-mono font-bold text-zinc-400 truncate uppercase tracking-tight">
                      {node.role}
                    </p>
                    
                    <p className="text-[9px] text-zinc-500 font-sans truncate normal-case pt-0.5 leading-none">
                      {node.lastMsg}
                    </p>

                    {node.unread && (
                      <div className="absolute top-3 right-2.5 w-1 h-1 bg-blue-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default MessagesPage;