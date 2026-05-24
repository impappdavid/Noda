import { useState, useRef, useEffect } from 'react';
import { MessageSquare, ChevronUp, ChevronDown, Radio, Send, Smile, Paperclip, X, Search, FileText, Download } from 'lucide-react';
import { cn } from "@/lib/utils";

// Mock Data Types
interface UserNode {
  id: number;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
}

interface MiniMessage {
  id: string;
  sender: string;
  isMe: boolean;
  time: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file';
  text?: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
}

const MOCK_USERS: UserNode[] = [
  { id: 1, name: 'Marcus Vane', role: 'Principal Architect', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80', online: true },
  { id: 2, name: 'Sarah Chen', role: 'Lead Dev @ Vercel', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80', online: true },
  { id: 3, name: 'Alex Wright', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80', online: false },
];

const PRESET_EMOJIS = ["🔥", "🚀", "💯", "💻", "✨", "👍", "👀", "🎉", "✅", "❌"];

export default function GlobalMessagingDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChats, setActiveChats] = useState<UserNode[]>([]);
  
  const [chatHistories, setChatHistories] = useState<Record<number, MiniMessage[]>>({
    1: [
      { id: 'm1', sender: 'Marcus Vane', isMe: false, time: '12:00', timestamp: new Date(Date.now() - 600000), type: 'text', text: 'Hey, are the production nodes fully balanced?' },
      { id: 'm2', sender: 'Marcus Vane', isMe: false, time: '12:01', timestamp: new Date(Date.now() - 550000), type: 'text', text: 'Let me know when you check the telemetry.' }
    ]
  });

  const filteredUsers = MOCK_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChat = (user: UserNode) => {
    if (!activeChats.find(c => c.id === user.id)) {
      if (activeChats.length >= 2) {
        setActiveChats(prev => [prev[1], user]);
      } else {
        setActiveChats(prev => [...prev, user]);
      }
    }
    setIsOpen(true);
  };

  const handleCloseChat = (userId: number) => {
    setActiveChats(prev => prev.filter(c => c.id !== userId));
  };

  return (
    <div className="fixed bottom-0 right-4 z-50 flex items-end gap-2 select-none pointer-events-none">
      
      {/* 1. DYNAMIC INDIVIDUAL CHAT POPUPS (Changes width when minimized) */}
      {activeChats.map((user) => (
        <MiniChatWindow 
          key={user.id} 
          user={user} 
          messages={chatHistories[user.id] || []}
          onClose={() => handleCloseChat(user.id)}
          onSendMessage={(msg) => {
            setChatHistories(prev => ({
              ...prev,
              [user.id]: [...(prev[user.id] || []), msg]
            }));
          }}
        />
      ))}

      {/* 2. MASTER USER CONNECTOR DIRECTORY (Fixed standard width) */}
      <div className="w-64 flex flex-col bg-white shadow-2xl pointer-events-auto ">
        
        {/* MASTER HEADER TRACK */}
        <header 
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 bg-blue-600 text-white px-4 flex items-center justify-between cursor-pointer border-b border-blue-700 hover:bg-blue-700 transition-colors shrink-0"
        >
          <div className="flex items-center gap-2.5">
            <MessageSquare size={16} className="text-white" />
            <span className="text-[12px] font-mono font-black uppercase tracking-wider">Messaging</span>
          </div>
          <div className="text-white/85 transition-colors">
            {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </div>
        </header>

        {/* EXPANDABLE USER LIST HOUSING */}
        <div className={cn(
          "bg-white flex flex-col overflow-hidden transition-all duration-200 ease-in-out",
          isOpen ? "h-[540px] w-full" : "h-0"
        )}>
          
          {/* Internal Filtering Row */}
          <div className="p-1 border-b border-zinc-200 bg-zinc-50 flex items-center gap-2 shrink-0">
            <div className="relative flex items-center bg-white border border-zinc-300 px-2 h-8 w-full">
              <Search size={13} className="text-zinc-400 mr-1.5 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter connections..."
                className="w-full bg-transparent text-[11px] font-mono text-zinc-900 outline-none placeholder:text-zinc-400"
              />
              {searchQuery && <X size={11} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" onClick={() => setSearchQuery("")} />}
            </div>
          </div>

          {/* Connected User Directory Stream */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-300">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div 
                  key={user.id}
                  onClick={() => handleOpenChat(user)}
                  className="p-2 flex items-center gap-2 hover:bg-zinc-200 last:border-b border-zinc-300 cursor-pointer transition-colors"
                >
                  <div className="relative shrink-0">
                    <img src={user.avatar} alt="" className="w-9 h-9 object-cover border border-zinc-200" />
                    {user.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-mono font-black text-zinc-900 uppercase tracking-tight truncate">{user.name}</span>
                    <span className="text-[10px] font-sans text-zinc-400 truncate leading-none mt-1">{user.role}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center p-4 text-center text-zinc-400 font-mono text-[10px] uppercase">
                No matching nodes detected
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// 3. SEPARATE CHAT WINDOW WITH CONDITIONAL MINIMIZED WIDTH
interface MiniChatProps {
  user: UserNode;
  messages: MiniMessage[];
  onClose: () => void;
  onSendMessage: (msg: MiniMessage) => void;
}

function MiniChatWindow({ user, messages, onClose, onSendMessage }: MiniChatProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputText, setInputText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  
  const streamEndRef = useRef<HTMLDivElement>(null);
  const miniFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isMinimized) {
      streamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    onSendMessage({
      id: Date.now().toString(),
      sender: 'Me',
      isMe: true,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: now,
      type: 'text',
      text: inputText
    });
    setInputText("");
  };

  const handleMiniUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isImage) {
      onSendMessage({
        id: Date.now().toString(),
        sender: 'Me',
        isMe: true,
        time: timeString,
        timestamp: now,
        type: 'image',
        mediaUrl: URL.createObjectURL(file)
      });
    } else {
      onSendMessage({
        id: Date.now().toString(),
        sender: 'Me',
        isMe: true,
        time: timeString,
        timestamp: now,
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / 1024).toFixed(0)} KB`
      });
    }
    e.target.value = '';
  };

  return (
    <div className={cn(
      "flex flex-col bg-white shadow-2xl pointer-events-auto transition-all duration-300 ease-in-out",
      isMinimized ? "w-40" : "w-72" // Shifting width: w-72 (288px) when open, w-40 (160px) when minimized
    )}>
      
      {/* HEADER BAR */}
      <header 
        className="h-10 bg-zinc-800 text-white px-3 flex items-center justify-between cursor-pointer border-b border-zinc-800 shrink-0"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative shrink-0">
            <img src={user.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
            {user.online && <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-zinc-900" />}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-mono font-black text-zinc-100 uppercase tracking-tight truncate">{user.name}</span>
            {!isMinimized && <span className="text-[8.5px] font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none mt-0.5">Connected</span>}
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          
          <button onClick={onClose} className="text-zinc-400 hover:text-white hover:bg-zinc-200/20 cursor-pointer p-1 transition-colors">
            <X size={15} />
          </button>
        </div>
      </header>

      {/* CONTENT FLUID WORKSPACE */}
      <div className={cn(
        "flex flex-col bg-white transition-all duration-150 relative",
        isMinimized ? "h-0 overflow-hidden" : "h-[360px]"
      )}>
        
        <input type="file" ref={miniFileRef} onChange={handleMiniUpload} className="hidden" accept="image/*,.pdf" />

        {/* EMOJI BOX ATTACH OVERLAY */}
        {showEmoji && (
          <div className="absolute bottom-20 left-2 right-2 bg-white border border-zinc-300 p-2 shadow-xl z-50 flex flex-wrap gap-1.5 justify-start">
            {PRESET_EMOJIS.map(emo => (
              <button 
                key={emo} 
                onClick={() => { setInputText(p => p + emo); setShowEmoji(false); }}
                className="text-base hover:bg-zinc-100 w-7 h-7 flex items-center justify-center transition-colors"
              >
                {emo}
              </button>
            ))}
          </div>
        )}

        {/* MESSAGING AREA SCROLL LOG */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2 scrollbar-hide bg-zinc-50/50">
          {messages.map((msg, idx) => {
            const prevMsg = idx > 0 ? messages[idx - 1] : null;
            const isSameSender = prevMsg && prevMsg.sender === msg.sender;
            const timeDiffMinutes = prevMsg ? (msg.timestamp.getTime() - prevMsg.timestamp.getTime()) / 1000 / 60 : Infinity;
            const hideHeader = isSameSender && timeDiffMinutes < 2;

            return (
              <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                {!hideHeader && (
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tight mb-1 mt-1.5">
                    {msg.sender} • {msg.time}
                  </span>
                )}
                
                <div className={cn(
                  "border text-[11.5px] font-sans leading-relaxed transition-all shadow-none",
                  msg.type === 'image' ? "p-1 bg-white border-zinc-200" : "p-1.5",
                  msg.type !== 'image' && (msg.isMe ? "bg-blue-500 text-white border-blue-600" : "bg-zinc-200 text-zinc-900 border-zinc-200")
                )}>
                  {msg.type === 'text' && <p>{msg.text}</p>}
                  
                  {msg.type === 'image' && (
                    <img src={msg.mediaUrl} alt="" className="w-full max-w-[200px] h-auto object-cover border border-zinc-100" />
                  )}

                  {msg.type === 'file' && (
                    <div className="flex items-center gap-2 w-48">
                      <FileText size={15} className={msg.isMe ? "text-blue-100" : "text-zinc-500"} />
                      <span className="font-mono text-[9.5px] truncate flex-1 tracking-tight">{msg.fileName}</span>
                      <Download size={13} className="cursor-pointer hover:opacity-80 shrink-0" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={streamEndRef} />
        </div>

        {/* INTERACTIVE COMPACT CHAT FOOTER INPUT */}
        <footer className="p-1 border-t border-zinc-200 bg-white flex flex-col gap-1.5 shrink-0">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Type a message..."
              className="w-full bg-zinc-100 text-[11px] font-mono px-2.5 pr-8 h-8 border border-zinc-200 focus:border-zinc-500 outline-none"
            />
            <button onClick={handleSend} className="absolute right-2 text-zinc-400 hover:text-blue-500 transition-colors">
              <Send size={14} />
            </button>
          </div>

          {/* ACTION BUTTON TOOL TRACK */}
          <div className="flex items-center justify-between px-1 h-6">
            <div className="flex items-center gap-2">
              <button onClick={() => setShowEmoji(!showEmoji)} className="text-zinc-500 hover:text-zinc-800 transition-colors p-0.5">
                <Smile size={16} />
              </button>
              <button onClick={() => miniFileRef.current?.click()} className="text-zinc-500 hover:text-zinc-800 transition-colors p-0.5">
                <Paperclip size={16} />
              </button>
            </div>
            <span className="text-[8px] font-mono text-zinc-500">ENTER TO SEND</span>
          </div>
        </footer>

      </div>
    </div>
  );
}