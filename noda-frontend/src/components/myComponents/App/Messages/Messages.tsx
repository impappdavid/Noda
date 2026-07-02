import { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Send, Smile, Image as ImageIcon, Paperclip, Mic, Radio, FileText, Download, Play, Square, X, Search } from 'lucide-react';
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
  timestamp: Date; // Added real JS date instances for granular duration math tracking
  type: 'text' | 'image' | 'file' | 'gif' | 'voice';
  text?: string;
  mediaUrl?: string;
  fileName?: string;
  fileSize?: string;
  duration?: string;
  isMe?: boolean;
  avatar?: string;
}

const MOCK_NODES: ChatNode[] = [
  { id: 1, name: 'Marcus Vane', role: 'Principal Architect', lastMsg: 'Voice transcript attached', time: '12:04', unread: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 2, name: 'Sarah Chen', role: 'Lead Dev @ Vercel', lastMsg: 'The latency looks...', time: 'Yesterday', unread: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80' },
];

const PRESET_EMOJIS = [
  "🔥", "🚀", "💯", "💻", "✨", "🐛", "🛠️", "🧠", "👍", "👀", "🍺", "🎉",
  "✅", "❌", "🚨", "⚠️", "🔒", "🌐", "⚡", "📊", "📈", "🎨", "👑", "🎯",
  "🤔", "😎", "🙌", "👏", "🤝", "💪", "🎈", "🌟", "🍕", "☕", "🔊", "💬"
];

const PRESET_GIFS = [
  { tags: "success ship prod gold", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5bmd4bW81ZndpeXp5NXg5ZndnYm9yZ3p5YW83Ym95bm94enF4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xAFtXshk8Kl74A/giphy.gif" },
  { tags: "cat typist hack fast", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmsyd3Y1cXp0ZXBwZ3Z0M2o1ajU0Y2szbWF4dHd0M3R0N3p2ZmN4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Ai5dIk8xv5v2/giphy.gif" },
  { tags: "matrix custom load binary", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmsxbmtkcTF4Nnd0cnE5amg5enptNXB4cHh0cnA5amg5enptNXB4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dhg6E39ZosR68/giphy.gif" },
  { tags: "fix code run magic", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnd4eHd4Nnd0cnE5amg5enptNXB4cHh0cnA5amg5enptNXB4YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/hrRJ41JB2zlgZi07Sk/giphy.gif" },
  { tags: "mind blown computer crash", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzh0NThxMnAwbTRuM3VxbXU3czR4YTg0NXRvMXdtbXJydzRwbmMxdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33FNHQ9B96wCI/giphy.gif" },
  { tags: "celebrate space happy win", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW01ZndpeXp5NXg5ZndnYm9yZ3p5YW83Ym95bm94enF4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy.gif" }
];

const MessagesPage = () => {
  const [activeNodeId, setActiveNodeId] = useState(1);
  const [inputText, setInputText] = useState("");
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', nodeId: 1, sender: "Marcus Vane", time: "12:00", timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 10)), type: 'text', text: "Initial signal check. Are the Rust cluster nodes synchronized for the 14:00 benchmark?", avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
    { id: '2', nodeId: 1, sender: "Me", isMe: true, time: "12:01", timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 9)), type: 'image', mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&h=250&q=80', text: "Reviewing metrics. Here is the active dashboard visualization for Node_04.", avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },
    { id: '3', nodeId: 1, sender: "Marcus Vane", time: "12:02", timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 5)), type: 'file', fileName: 'rust_benchmark_report_v2.pdf', fileSize: '4.2 MB', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80' },
    { id: '4', nodeId: 1, sender: "Me", isMe: true, time: "12:04", timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 2)), type: 'voice', duration: '0:12', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80' },
  ]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const maxLength = 1000;

  const activeNode = MOCK_NODES.find(n => n.id === activeNodeId);
  const currentMessages = messages.filter(msg => msg.nodeId === activeNodeId);

  const filteredGifs = PRESET_GIFS.filter(gif => 
    gif.tags.toLowerCase().includes(gifSearchQuery.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const newMsg: Message = {
      id: Date.now().toString(),
      nodeId: activeNodeId,
      sender: "Me",
      isMe: true,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: now,
      type: 'text',
      text: inputText,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText("");
  };

  const handleSelectEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
  };

  const handleSelectGif = (url: string) => {
    const now = new Date();
    const newMsg: Message = {
      id: Date.now().toString(),
      nodeId: activeNodeId,
      sender: "Me",
      isMe: true,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: now,
      type: 'gif',
      mediaUrl: url,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
    };
    setMessages(prev => [...prev, newMsg]);
    setShowGifPicker(false);
    setGifSearchQuery("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isImage) {
      const blobUrl = URL.createObjectURL(file);
      const newMsg: Message = {
        id: Date.now().toString(),
        nodeId: activeNodeId,
        sender: "Me",
        isMe: true,
        time: timeString,
        timestamp: now,
        type: 'image',
        mediaUrl: blobUrl,
        text: file.name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
      };
      setMessages(prev => [...prev, newMsg]);
    } else {
      const newMsg: Message = {
        id: Date.now().toString(),
        nodeId: activeNodeId,
        sender: "Me",
        isMe: true,
        time: timeString,
        timestamp: now,
        type: 'file',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
      };
      setMessages(prev => [...prev, newMsg]);
    }
    e.target.value = '';
  };

  const toggleRecording = () => {
    if (isRecording) {
      const mins = Math.floor(recordingSeconds / 60);
      const secs = recordingSeconds % 60;
      const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      const now = new Date();
      
      const newMsg: Message = {
        id: Date.now().toString(),
        nodeId: activeNodeId,
        sender: "Me",
        isMe: true,
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: now,
        type: 'voice',
        duration: recordingSeconds === 0 ? '0:03' : formattedDuration,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80'
      };
      setMessages(prev => [...prev, newMsg]);
      setIsRecording(false);
    } else {
      setShowEmojiPicker(false);
      setShowGifPicker(false);
      setIsRecording(true);
    }
  };

  const toggleAudioPlayback = (msgId: string) => {
    if (playingAudioId === msgId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(msgId);
      setTimeout(() => {
        setPlayingAudioId(current => current === msgId ? null : current);
      }, 5000);
    }
  };

  return (
    <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        className="hidden" 
        accept="image/*,.pdf,.doc,.docx" 
      />

      <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
        <aside className="w-25 shrink-0 select-none">
          <div className="h-full py-4">
            <AppSideBar />
          </div>
        </aside>

        <main className="flex flex-1 border-x border-zinc-300 bg-white h-full overflow-hidden pt-13 flex-row relative">
          
          {/* THREAD STREAM SECTION */}
          <div className="flex-1 flex flex-col bg-white min-w-0 border-r border-zinc-200 relative">
            
            {/* ACTIVE THREAD HEADER */}
            <header className="border-b border-zinc-300 p-1.5 flex items-center justify-between bg-zinc-50/40 select-none shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <img src={activeNode?.avatar} alt="" className="w-8 h-8 object-cover shrink-0" />
                <div className="flex flex-col min-w-0">
                  <h2 className="text-[10px] font-mono font-black uppercase tracking-tight text-zinc-950 truncate">{activeNode?.name}</h2>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1 truncate">{activeNode?.role}</span>
                </div>
              </div>
              <button type="button" className="text-zinc-400 hover:text-zinc-900 transition-colors p-1 cursor-pointer">
                <MoreHorizontal size={14} />
              </button>
            </header>

            {/* DYNAMIC MESSAGE STREAM BUBBLES */}
            <div className="flex-1 overflow-y-auto p-3.5 space-y-1 scrollbar-hide bg-linear-to-b from-zinc-50/30 to-transparent">
              {currentMessages.map((msg, idx) => {
                const isPlaying = playingAudioId === msg.id;
                
                // Compare with previous message to determine group bundling
                const prevMsg = idx > 0 ? currentMessages[idx - 1] : null;
                const isSameSender = prevMsg && prevMsg.sender === msg.sender;
                
                // Calculate delta duration value in minutes
                const timeDiffMinutes = prevMsg 
                  ? (msg.timestamp.getTime() - prevMsg.timestamp.getTime()) / 1000 / 60 
                  : Infinity;

                // Condition logic flag to bundle blocks within 2 minutes max
                const shouldHideHeader = isSameSender && timeDiffMinutes < 2;

                return (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "flex flex-col max-w-[85%] animate-in fade-in duration-700", 
                      msg.isMe ? "ml-auto items-end" : "mr-auto items-start",
                      shouldHideHeader ? "mt-0.5" : "mt-4" // Tighter spacing for grouped messages
                    )}
                  >
                    
                    {/* Render User Info block ONLY if threshold parameter conditions break */}
                    {!shouldHideHeader && (
                      <div className={cn("flex items-center gap-1.5 mb-1 select-none", msg.isMe ? "flex-row-reverse" : "flex-row")}>
                        <img src={msg.avatar} alt="" className="w-5 h-5 object-cover border border-zinc-200" />
                        <span className="text-[9px] font-mono font-black text-zinc-600 uppercase tracking-tight">
                          {msg.sender} <span className="font-normal font-sans text-zinc-400 ml-0.5">({msg.time})</span>
                        </span>
                      </div>
                    )}

                    {/* Dynamic Message Content Box */}
                    <div className={cn(
                      "border text-[10.5px] font-sans leading-relaxed tracking-normal transition-all",
                      msg.type === 'image' || msg.type === 'gif' ? "p-1 bg-white border-zinc-200 shadow-sm" : "p-2",
                      msg.type !== 'image' && msg.type !== 'gif' && (msg.isMe ? "bg-blue-500 text-white border-blue-600 shadow-sm" : "bg-zinc-200 text-zinc-900 border-zinc-200")
                    )}>
                      
                      {msg.type === 'text' && <p>{msg.text}</p>}

                      {msg.type === 'image' && (
                        <div className="flex flex-col gap-1.5 max-w-xs">
                          <img src={msg.mediaUrl} alt="" className="w-full h-auto max-h-64 object-cover border border-zinc-100" />
                          {msg.text && <p className="px-1 py-0.5 text-zinc-500 text-[8.5px] font-mono tracking-tight uppercase truncate">{msg.text}</p>}
                        </div>
                      )}

                      {msg.type === 'file' && (
                        <div className="flex items-center gap-3 w-56">
                          <div className={cn("p-1.5 shrink-0 border", msg.isMe ? "bg-blue-600 border-blue-700 text-white" : "bg-zinc-300 border-zinc-400 text-zinc-700")}>
                            <FileText size={18} />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col">
                            <span className="font-mono font-bold text-[10px] truncate uppercase tracking-tight">{msg.fileName}</span>
                            <span className={cn("text-[8.5px] font-mono", msg.isMe ? "text-blue-200" : "text-zinc-500")}>{msg.fileSize}</span>
                          </div>
                          <a href="#download" onClick={(e) => e.preventDefault()} className={cn("p-1 transition-colors", msg.isMe ? "hover:text-blue-200" : "hover:text-zinc-900")}>
                            <Download size={13} />
                          </a>
                        </div>
                      )}

                      {msg.type === 'gif' && (
                        <div className="max-w-xs relative">
                          <img src={msg.mediaUrl} alt="Reaction GIF" className="w-full h-auto max-h-64 object-cover" />
                          <span className="absolute bottom-1 right-1 bg-zinc-950/70 text-zinc-300 text-[7.5px] font-mono font-black uppercase px-1 tracking-widest">GIF</span>
                        </div>
                      )}

                      {msg.type === 'voice' && (
                        <div className="flex items-center gap-2.5 w-48">
                          <button 
                            onClick={() => toggleAudioPlayback(msg.id)}
                            className={cn(
                              "w-5 h-5 flex items-center justify-center rounded-full transition-colors cursor-pointer border shadow-sm shrink-0", 
                              msg.isMe ? "bg-white text-blue-600 border-blue-600 hover:bg-zinc-50" : "bg-zinc-900 text-white border-zinc-950 hover:bg-zinc-800"
                            )}
                          >
                            {isPlaying ? <Square size={7} fill="currentColor" /> : <Play size={8} fill="currentColor" className="ml-0.5" />}
                          </button>
                          
                          <div className="flex-1 flex items-end gap-0.5 h-4 px-1">
                            {[35, 60, 20, 75, 40, 90, 55, 30, 85, 45, 70, 25, 50, 15].map((val, idx) => (
                              <span 
                                key={idx} 
                                className={cn(
                                  "w-0.5 rounded-full transition-all duration-300", 
                                  isPlaying ? "animate-pulse bg-emerald-400" : (msg.isMe ? "bg-blue-200" : "bg-zinc-400")
                                )} 
                                style={{ 
                                  height: `${val}%`,
                                  animationDelay: isPlaying ? `${idx * 80}ms` : undefined 
                                }} 
                              />
                            ))}
                          </div>
                          <span className={cn("text-[8.5px] font-mono shrink-0 font-bold", isPlaying ? "text-emerald-500 animate-pulse" : (msg.isMe ? "text-blue-100" : "text-zinc-500"))}>
                            {isPlaying ? "PLAYING" : msg.duration}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* LIGHT MODED COMPACT FOOTER INPUT WITH INPUT-WIDTH OVERLAY POPUPS */}
            <footer className="border-t border-zinc-300 bg-white shrink-0 select-none p-2 relative">
              
              {/* FULL INPUT-WIDTH EMOJI EXPANSION ROW */}
              {showEmojiPicker && (
                <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-zinc-300 p-2.5 shadow-xl z-50 animate-in slide-in-from-bottom-2 duration-100">
                  <div className="flex justify-between items-center mb-2 pb-1 border-b border-zinc-200">
                    <span className="text-[8.5px] font-mono font-black uppercase text-zinc-400 tracking-wider">Select Preset Signal Emoji</span>
                    <X size={11} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" onClick={() => setShowEmojiPicker(false)} />
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto justify-start">
                    {PRESET_EMOJIS.map(emoji => (
                      <button key={emoji} onClick={() => handleSelectEmoji(emoji)} className="text-base w-7 h-7 flex items-center justify-center hover:bg-zinc-100 transition-colors cursor-pointer">{emoji}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* ENHANCED GRID COL-2 VERTICAL GIF EXTENSION WITH SEARCH BAR */}
              {showGifPicker && (
                <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-zinc-300 p-3 shadow-xl z-50 animate-in slide-in-from-bottom-2 duration-100 flex flex-col gap-2 w-[calc(100%-16px)]">
                  <div className="flex justify-between items-center pb-1 border-b border-zinc-200">
                    <span className="text-[8.5px] font-mono font-black uppercase text-zinc-400 tracking-wider">GIF Repository Matrix</span>
                    <X size={11} className="text-zinc-400 hover:text-zinc-900 cursor-pointer" onClick={() => { setShowGifPicker(false); setGifSearchQuery(""); }} />
                  </div>
                  
                  <div className="relative flex items-center bg-zinc-100 border border-zinc-200 px-2 h-7 focus-within:border-zinc-900 transition-colors">
                    <Search size={11} className="text-zinc-400 shrink-0 mr-1.5" />
                    <input 
                      type="text" 
                      value={gifSearchQuery} 
                      onChange={(e) => setGifSearchQuery(e.target.value)} 
                      placeholder="Filter by keyword (e.g., ship, code, crash)..." 
                      className="w-full bg-transparent text-[10px] font-mono font-bold text-zinc-900 outline-none placeholder:text-zinc-400"
                    />
                    {gifSearchQuery && (
                      <X size={10} className="text-zinc-400 hover:text-zinc-900 cursor-pointer ml-1" onClick={() => setGifSearchQuery("")} />
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto scrollbar-hide pt-1">
                    {filteredGifs.length > 0 ? (
                      filteredGifs.map((gif, index) => (
                        <div 
                          key={index} 
                          onClick={() => handleSelectGif(gif.url)}
                          className="relative aspect-video bg-zinc-50 border border-zinc-200 hover:border-zinc-900 transition-all cursor-pointer overflow-hidden group shadow-none hover:shadow-sm"
                        >
                          <img src={gif.url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 py-4 text-center text-zinc-400 font-mono text-[9px] uppercase tracking-tight">No matching indicators located</div>
                    )}
                  </div>
                </div>
              )}

              <div className="border border-zinc-300 bg-white flex flex-col focus-within:border-zinc-900 transition-colors">
                
                <div className="relative flex items-start min-h-12 pt-2.5 px-3">
                  {isRecording ? (
                    <div className="w-full flex items-center justify-between bg-red-50/60 border border-red-200/60 p-2 text-red-600 font-mono text-[10px] font-bold animate-pulse">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>RECORDING AUDIO CAPTURE SYSTEM SYNC...</span>
                      </div>
                      <span>
                        {Math.floor(recordingSeconds / 60)}:{(recordingSeconds % 60) < 10 ? '0' : ''}{recordingSeconds % 60}
                      </span>
                    </div>
                  ) : (
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value.substring(0, maxLength))}
                      onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                      placeholder="Write your message..." 
                      rows={1}
                      className="w-full bg-transparent text-[11px] text-zinc-900 font-mono font-bold outline-none placeholder:text-zinc-400 resize-none h-auto min-h-6 pr-8 leading-tight"
                    />
                  )}
                  
                  <button 
                    type="button"
                    onClick={handleSendMessage}
                    disabled={isRecording}
                    className="absolute right-2 top-2 h-7 w-7 flex items-center justify-center bg-transparent text-zinc-500 hover:text-blue-500 disabled:opacity-30 transition-colors cursor-pointer active:scale-[0.95]"
                  >
                    <Send size={13} />
                  </button>
                </div>

                {/* ATTACHMENT ACTION TOOLBAR TRACK */}
                <div className="border-t border-zinc-300 bg-zinc-50/70 h-8 px-2 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => { setShowGifPicker(false); setShowEmojiPicker(!showEmojiPicker); }}
                      className={cn("h-6 px-2 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none", showEmojiPicker && "bg-zinc-200 text-zinc-900")}
                    >
                      <Smile size={11} />
                      <span>Emoji</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setShowEmojiPicker(false); setShowGifPicker(!showGifPicker); }}
                      className={cn("h-6 px-2 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none", showGifPicker && "bg-zinc-200 text-zinc-900")}
                    >
                      <ImageIcon size={11} />
                      <span>Gif</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-6 px-2 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer rounded-none"
                    >
                      <Paperclip size={11} />
                      <span>Attach</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={cn("h-6 px-2 font-mono font-bold text-[9px] uppercase tracking-tight flex items-center gap-1 transition-all cursor-pointer rounded-none", isRecording ? "bg-red-500 text-white hover:bg-red-600" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200")}
                    >
                      <Mic size={11} className={cn(isRecording && "animate-bounce")} />
                      <span>{isRecording ? "Stop & Save" : "Voice Message"}</span>
                    </button>
                  </div>

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
                      isSelected ? "bg-zinc-50 border-l-2 border-zinc-950 pl-2" : "hover:bg-zinc-50/50 border-l-2 border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={cn("text-[9.5px] font-mono font-black truncate uppercase tracking-tight", node.unread ? "text-blue-600" : "text-zinc-900")}>
                        {node.name}
                      </span>
                      <span className="text-[7.5px] font-mono font-bold text-zinc-400 shrink-0">{node.time}</span>
                    </div>
                    <p className="text-[8.5px] font-mono font-bold text-zinc-400 truncate uppercase tracking-tight">{node.role}</p>
                    <p className="text-[9px] text-zinc-500 font-sans truncate normal-case pt-0.5 leading-none">
                      {node.id === activeNodeId ? (messages[messages.length - 1]?.text || `[${messages[messages.length - 1]?.type.toUpperCase()}] Asset Stream`) : node.lastMsg}
                    </p>
                    {node.unread && node.id !== activeNodeId && <div className="absolute top-3 right-2.5 w-1 h-1 bg-blue-600" />}
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