import React, { useState } from 'react';
import {
    ArrowLeft, MessageSquare, Heart, AlertTriangle, BarChart3,
    Bookmark, X as CloseIcon,
    Copy
} from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { useNavigate } from "react-router-dom";

const cn = (...classes: (string | boolean | undefined | null)[]): string =>
    classes.filter(Boolean).join(' ');

const PostDetail = () => {
    const navigate = useNavigate();

    // Interaction States
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [userVote, setUserVote] = useState<number | null>(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const post = {
        id: "p_poll_1",
        author: {
            id: "u_marcus_v",
            name: "Marcus Vane",
            username: "@mv_arch",
            role: "Systems Architect",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
            reliability: "98.4%"
        },
        content: "Which serialization protocol are you prioritizing for low-latency node clusters in 2026?",
        postedAgo: "1h",
        likes: 89,
        commentsCount: 34,
        views: "12.4k",
        images: [
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800",
            "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800"
        ],
        poll: {
            options: [
                { label: "Protocol Buffers", votes: 450 },
                { label: "Cap'n Proto", votes: 120 }
            ],
            totalVotes: 570
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        // You could trigger a toast here: "Signal URL Copied"
        console.log("Link copied to clipboard");
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
            <Navbar />

            {/* IMAGE LIGHTBOX */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 "
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer">
                        <CloseIcon size={32} />
                    </button>
                    <img
                        src={selectedImg}
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
                <aside className="w-24 flex-none">
                    <div className="sticky top-0 pt-4">
                        <AppSideBar />
                    </div>
                </aside>

                <div className="flex-1 flex gap-3">
                    <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen pt-13">

                        {/* NAVIGATION SUB-HEADER */}
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-[52px] z-20 h-10 divide-x divide-zinc-200">
                            <button onClick={() => navigate(-1)} className="px-3 h-full hover:bg-zinc-50 flex items-center gap-3 cursor-pointer transition-colors">
                                <ArrowLeft size={14} />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-3 flex items-center">
                                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">Signal_Detail</span>
                            </div>
                            <button className="px-3 h-full flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer group">
                                <AlertTriangle size={12} className="group-hover:rotate-12 transition-transform" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest">Report_Node</span>
                            </button>
                        </div>

                        {/* MAIN POST ARTICLE */}
                        <article className="p-3 bg-white">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full border border-zinc-200 overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/app/user/${post.author.id}`)}
                                    >
                                        <img src={post.author.avatar} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span
                                            className="text-sm font-bold text-zinc-900 leading-none hover:underline cursor-pointer"
                                            onClick={() => navigate(`/app/user/${post.author.id}`)}
                                        >
                                            {post.author.name}
                                        </span>
                                        <span className="text-[10px] font-mono font-black text-zinc-400 uppercase mt-1">
                                            {post.author.username} • {post.postedAgo}
                                        </span>
                                    </div>
                                </div>

                                {/* 1-CLICK SHARE REPLACING DROPDOWN */}
                                <button
                                    onClick={handleCopyLink}
                                    className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg cursor-pointer transition-all active:scale-90"
                                    title="Copy Signal Link"
                                >
                                    <Copy size={14} />
                                </button>
                            </div>

                            <div className="pl-0 md:pl-[52px]">
                                <p className="text-sm text-zinc-800 leading-relaxed mb-4">{post.content}</p>

                                {post.poll && (
                                    <div className="space-y-2 mb-6">
                                        {post.poll.options.map((option, idx) => {
                                            const isVoted = userVote !== null;
                                            const percentage = isVoted ? Math.round((option.votes / post.poll.totalVotes) * 100) : 0;
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => !isVoted && setUserVote(idx)}
                                                    className={cn(
                                                        "relative w-full h-10 rounded-xl border text-left px-4 overflow-hidden transition-all",
                                                        isVoted ? "border-zinc-100 cursor-default" : "border-zinc-300 hover:border-zinc-900 cursor-pointer"
                                                    )}
                                                >
                                                    {isVoted && <div className="absolute inset-y-0 left-0 bg-zinc-50" style={{ width: `${percentage}%` }} />}
                                                    <div className="relative z-10 flex justify-between items-center h-full">
                                                        <span className="text-xs font-bold">{option.label}</span>
                                                        {isVoted && <span className="text-[10px] font-mono font-black">{percentage}%</span>}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {post.images.length > 0 && (
                                    <div className="rounded-2xl overflow-hidden border border-zinc-100 grid grid-cols-2 gap-1 mb-4 aspect-video">
                                        {post.images.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                                                onClick={() => setSelectedImg(img)}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* ACTION BAR - RESTORED VIEWS & BOOKMARK */}
                                <div className="flex items-center justify-between border-t border-zinc-100 mt-3">
                                    <div className="flex items-center gap-10">
                                        <button
                                            onClick={() => setLiked(!liked)}
                                            className={cn("flex items-center gap-2 text-xs font-mono cursor-pointer transition-colors", liked ? "text-orange-600 font-bold" : "text-zinc-500 hover:text-orange-600")}
                                        >
                                            <Heart size={16} className={liked ? "fill-orange-600" : ""} /> {post.likes + (liked ? 1 : 0)}
                                        </button>
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                            <MessageSquare size={16} /> {post.commentsCount}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                                            <BarChart3 size={16} /> {post.views}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setBookmarked(!bookmarked)}
                                        className={cn("cursor-pointer transition-colors p-1", bookmarked ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-900")}
                                    >
                                        <Bookmark size={18} className={bookmarked ? "fill-zinc-900" : ""} />
                                    </button>
                                </div>
                            </div>
                        </article>

                        {/* COMMENT INPUT */}
                        <div className="sticky bottom-0 bg-white border-y border-zinc-300 flex h-12 z-10">
                            <input placeholder="TRANSMIT RESPONSE..." className="flex-1 px-3 text-[10px] font-mono font-black uppercase outline-none" />
                            <button className="bg-zinc-800 text-white px-8 text-[10px] font-mono uppercase font-black hover:bg-zinc-900 transition-colors cursor-pointer">Send</button>
                        </div>

                        {/* COMMENTS LIST */}
                        <div className="divide-y divide-zinc-100 pb-20">
                            {[1, 2].map((i) => (
                                <CommentNode key={i} id={`user_${i}`} likes={Math.floor(Math.random() * 40)} onUserClick={(id) => navigate(`/app/user/${id}`)} />
                            ))}
                        </div>
                    </main>

                    {/* RIGHT ASIDE */}
                    <aside className="sticky top-0 h-screen pt-13 w-40 flex flex-col gap-4">
                        <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl">
                            <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 mb-3 tracking-widest">Node_Intelligence</h4>
                            <div className="flex items-center gap-3">
                                <img src={post.author.avatar} className="w-8 h-8 rounded-lg border border-zinc-200 object-cover cursor-pointer" onClick={() => navigate(`/app/user/${post.author.id}`)} />
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold tracking-tighter">{post.author.name}</span>
                                    <span className="text-[9px] font-mono font-black text-emerald-600">RELIABILITY: {post.author.reliability}</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const CommentNode = ({ id, likes, onUserClick }: { id: string, likes: number, onUserClick: (id: string) => void }) => {
    const [cLiked, setCLiked] = useState(false);
    
    // Example avatar - in production, this would come from the comment data
    const userAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`;

    return (
        <div className="p-3 bg-white hover:bg-zinc-50/50 transition-colors relative">
            {/* 1. AVATAR POSITIONED IN THE LEFT GUTTER */}
            <div className="absolute left-4 top-4">
                <div 
                    className="w-8 h-8 rounded-full border border-zinc-200 overflow-hidden cursor-pointer active:scale-90 transition-transform"
                    onClick={() => onUserClick(id)}
                >
                    <img src={userAvatar} alt={id} className="w-full h-full object-cover" />
                </div>
            </div>

            {/* 2. CONTENT INDENTED TO 52PX */}
            <div className="pl-[40px] md:pl-[52px]">
                <div className="flex items-center gap-2 mb-1">
                    <span 
                        className="text-[10px] font-mono font-black text-zinc-900 uppercase cursor-pointer hover:underline" 
                        onClick={() => onUserClick(id)}
                    >
                        @{id}
                    </span>
                    <span className="text-[10px] font-mono font-black text-zinc-500 uppercase">• 1h ago</span>
                </div>
                
                <p className="text-xs text-zinc-900 leading-normal mb-3 pr-4">
                    Signal received. Node verification remains stable under current latency benchmarks.
                </p>
                
                <div className="flex gap-6">
                    <button 
                        onClick={() => setCLiked(!cLiked)} 
                        className={cn(
                            "flex items-center gap-1.5 transition-colors cursor-pointer", 
                            cLiked ? "text-orange-500" : "text-zinc-500 hover:text-orange-500"
                        )}
                    >
                        <Heart size={14} className={cLiked ? "fill-orange-500" : ""} />
                        <span className="text-[10px] font-mono font-black">{likes + (cLiked ? 1 : 0)}</span>
                    </button>
                    
                    <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                        <MessageSquare size={14} />
                        <span className="text-[10px] font-mono font-black">Reply</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;