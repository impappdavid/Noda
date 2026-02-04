import {
    ArrowLeft, MessageSquare, Heart, Eye, Send,
    MoreHorizontal, Bookmark, Share2, AlertTriangle
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';

const PostDetail = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">

                    {/* 1. NAVIGATION HEADER */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10 divide-x divide-zinc-200">
                        <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2 group">
                            <ArrowLeft size={14} />
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest">Return to Feed</span>
                        </button>
                        <div className="flex-1 px-4 flex items-center">
                            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Node ID: 0xFF2A4</span>
                        </div>
                        {/* Integrated Report Button */}
                        <button className="px-4 h-full flex items-center gap-2 text-zinc-400 hover:text-red-600 transition-colors group">
                            <AlertTriangle size={12} className="group-hover:animate-pulse" />
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest">Report Node</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">

                        {/* 2. ROOT POST NODE */}
                        <article className="p-4 border-b border-zinc-300 bg-white">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                                        <span className="text-white font-mono font-black text-sm">N</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-[11px] font-black uppercase tracking-tight">Noda HQ</h3>
                                        <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">System Protocol • 2h ago</span>
                                    </div>
                                </div>
                                <button className="p-2 text-zinc-400 hover:text-zinc-900"><MoreHorizontal size={14} /></button>
                            </div>

                            <h1 className="text-xl font-bold  tracking-tight leading-tight mb-2">
                                Implementing Anti-Ghosting Protocols in Decentralized Recruitment
                            </h1>
                            <p className="text-xs text-zinc-500 leading-relaxed font-semibold tracking-tight mb-8">
                                Current intelligence suggests that feedback loops are failing. Our newest node update
                                enforces a 14-cycle response guarantee to maintain network velocity.
                            </p>

                            {/* INTEGRATED SIGNAL ACTIONS */}
                            <div className="flex items-center justify-between border-t border-zinc-300 pt-2 px-1">
                                <div className="flex items-center gap-6">
                                    <button className="flex items-center gap-1.5 text-zinc-900 font-black transition-transform active:scale-90">
                                        <Heart size={14} className="fill-current" /> <span className="text-[10px] font-mono">842</span>
                                    </button>
                                    <div className="flex items-center gap-1.5 text-zinc-500">
                                        <MessageSquare size={14} /> <span className="text-[10px] font-mono">124</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-500">
                                        <Eye size={14} /> <span className="text-[10px] font-mono tracking-tighter">12.4k</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 h-8">
                                    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-all">
                                        <Bookmark size={14} />
                                    </div>
                                    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-all">
                                        <Share2 size={14} />
                                    </div>
                                </div>
                            </div>
                        </article>

                        {/* 3. SQUARED COMMENT INPUT */}
                        <div className="flex h-12 w-full border-b border-zinc-300 bg-zinc-50/50">
                            <input
                                type="text"
                                placeholder="SUBMIT COMMENT SIGNAL..."
                                className="flex-1 px-4 text-xs font-mono font-black uppercase outline-none bg-transparent placeholder:text-zinc-500"
                            />
                            <button className=" h-full bg-zinc-800 font-mono uppercase text-xs flex items-center text-white px-6 justify-center hover:bg-black transition-all border-l border-zinc-300">
                                Send
                            </button>
                        </div>

                        {/* 4. COMMENT SIGNALS */}
                        <div className="divide-y divide-zinc-200">
                            {[1, 2, 3].map((i) => (
                                <CommentNode key={i} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- COMPACT COMMENT NODE ---
const CommentNode = () => (
    <div className="p-4 bg-white hover:bg-zinc-50 transition-colors group">
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-zinc-800 border border-zinc-800 flex items-center justify-center">
                    <span className="text-[10px] font-black text-white font-mono">U</span>
                </div>
                <span className="text-xs font-mono font-black text-zinc-900 uppercase">@user_node</span>
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">1h ago</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-500">
                <div className="flex items-center gap-1">
                    <Eye size={14} /> <span className="text-[10px] font-mono font-black tracking-tighter">42</span>
                </div>
            </div>
        </div>
        <p className="text-xs text-zinc-500 leading-normal font-semibold uppercase tracking-tight mb-4 pr-12">
            The cluster verification for this protocol seems robust, but how does it handle high-latency nodes?
        </p>

        <div className="flex gap-4">
            <button className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-500 transition-colors group/heart">
                <Heart size={14} className="group-hover/heart:fill-current" />
                <span className="text-[11px] font-mono font-black uppercase">Like</span>
            </button>
            <button className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-900 transition-colors">
                <MessageSquare size={14} />
                <span className="text-[11px] font-mono font-black uppercase">Reply</span>
            </button>
        </div>
    </div>
);

export default PostDetail;