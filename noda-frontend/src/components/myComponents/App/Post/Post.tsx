import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Heart, AlertTriangle, BarChart3, Bookmark, X as CloseIcon, Copy, CornerDownRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import CommentNode from './CommentNode';
import { cn } from "@/lib/utils";

interface CommentType {
  id: string;
  username: string;
  likes: number;
  content: string;
  postedAgo: string;
  replies?: CommentType[];
}

interface Post {
  id: string;
  type: "normal" | "poll" | "project_showcase" | "system_milestone" | "job_listing";
  author: {
    id: string;
    name: string;
    username: string;
    role: string;
    avatar: string;
    reliability?: string;
  };
  content: string;
  postedAgo: string;
  likes: number;
  commentsCount: number;
  views: string | number;
  images: string[];
  poll?: {
    options: Array<{ label: string; votes: number }>;
    totalVotes: number;
  };
  project?: any;
  milestone?: any;
  jobListing?: any;
}

const MOCK_POST: Post = {
    id: "p_poll_1",
    type: "poll",
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
        options: [{ label: "Protocol Buffers", votes: 450 }, { label: "Cap'n Proto", votes: 120 }],
        totalVotes: 570
    }
};

// Seed initial system data with a layered response example layout
const INITIAL_COMMENTS: CommentType[] = [
  {
    id: "user_1",
    username: "alpha_node",
    likes: 15,
    postedAgo: "1h ago",
    content: "Signal received. Node verification remains stable under current latency benchmarks.",
    replies: [
      {
        id: "reply_1",
        username: "beta_tester",
        likes: 3,
        postedAgo: "32m ago",
        content: "Are you pushing overhead metrics over gRPC or custom TCP streams here?"
      },
      {
        id: "reply_2",
        username: "Teo",
        likes: 200,
        postedAgo: "1h ago",
        content: "Xddd"
      },
      {
        id: "reply_3",
        username: "test",
        likes: 3,
        postedAgo: "3m ago",
        content: "Are you pushing overhead metrics over gRPC or custom TCP streams here? lalalal"
      },
      {
        id: "reply_4",
        username: "beta_tester",
        likes: 3,
        postedAgo: "32m ago",
        content: "Are you pushing overhead metrics over gRPC or custom TCP streams here?"
      },
    ]
  },
  {
    id: "user_2",
    username: "quantum_dev",
    likes: 8,
    postedAgo: "45m ago",
    content: "Cap'n Proto zero-copy capabilities look highly optimized for local node configurations.",
    replies: []
  }
];

const PostDetail = () => {
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    // Form inputs and dynamic comment state trees
    const [comments, setComments] = useState<CommentType[]>(INITIAL_COMMENTS);
    const [commentText, setCommentText] = useState("");
    const [replyTarget, setReplyTarget] = useState<{ id: string; username: string } | null>(null);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    const handleSendComment = () => {
        if (!commentText.trim()) return;

        const newCommentObj = {
            id: `user_${Date.now()}`,
            username: "current_user",
            likes: 0,
            postedAgo: "Just now",
            content: commentText,
            replies: []
        };

        if (replyTarget) {
            // Append payload to targeted nested sub-tree layer
            setComments(prev => prev.map(c => {
                if (c.id === replyTarget.id) {
                    return { ...c, replies: [...(c.replies || []), newCommentObj] };
                }
                return c;
            }));
            setReplyTarget(null);
        } else {
            // Un-targeted top-level root tree placement
            setComments(prev => [...prev, newCommentObj]);
        }

        setCommentText("");
    };

    const handleInitiateReply = (commentId: string, username: string) => {
        setReplyTarget({ id: commentId, username });
        const inputEl = document.getElementById("signal-input");
        if (inputEl) inputEl.focus();
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
            <Navbar />

            {selectedImg && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedImg(null)}>
                    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors cursor-pointer"><CloseIcon size={32} /></button>
                    <img src={selectedImg} className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-sm" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
                <aside className="w-25 flex-none">
                    <div className="sticky top-0 pt-16"><AppSideBar /></div>
                </aside>

                <div className="flex-1 flex gap-3">
                    <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen pt-12.5">
                        
                        <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-[52px] z-20 h-10 divide-x divide-zinc-200">
                            <button onClick={() => navigate(-1)} className="px-3 h-full hover:bg-zinc-50 flex items-center gap-3 cursor-pointer transition-colors">
                                <ArrowLeft size={14} /><span className="text-[9px] font-mono font-black uppercase tracking-widest">Return</span>
                            </button>
                            <div className="flex-1 px-3 flex items-center"><span className="text-[10px] font-mono font-black text-zinc-500 uppercase">Signal_Detail</span></div>
                            <button className="px-3 h-full flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors cursor-pointer group">
                                <AlertTriangle size={12} className="group-hover:rotate-12 transition-transform" />
                                <span className="text-[9px] font-mono font-black uppercase tracking-widest">Report_Node</span>
                            </button>
                        </div>

                        <article className="p-3 bg-white">
                            <PostHeader author={MOCK_POST.author} postedAgo={MOCK_POST.postedAgo} onCopy={handleCopyLink} onAvatarClick={(id) => navigate(`/app/user/${id}`)} />
                            
                            <div className="pl-0 md:pl-[52px]">
                                <p className="text-sm text-zinc-800 leading-relaxed mb-2">{MOCK_POST.content}</p>

                                {MOCK_POST.images && MOCK_POST.images.length > 0 && MOCK_POST.type !== "poll" && (
                                    <div className="overflow-hidden border border-zinc-100 grid grid-cols-2 gap-1 mb-4 aspect-video">
                                        {MOCK_POST.images.map((img, i) => (
                                            <img key={i} src={img} className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" onClick={() => setSelectedImg(img)} alt="" />
                                        ))}
                                    </div>
                                )}

                                <PostActionBar 
                                    post={MOCK_POST} 
                                    liked={liked} 
                                    bookmarked={bookmarked} 
                                    onLike={() => setLiked(!liked)} 
                                    onBookmark={() => setBookmarked(!bookmarked)} 
                                />
                            </div>
                        </article>

                        {/* Interactive Form Field Unit */}
                        <div className="sticky bottom-0 bg-white border-y border-zinc-300 flex flex-col z-10">
                            {replyTarget && (
                                <div className="bg-zinc-50 px-3 py-1 border-b border-zinc-200 flex items-center justify-between">
                                    <span className="text-[8px] font-mono font-black text-blue-600 uppercase flex items-center gap-1">
                                        <CornerDownRight size={10} /> Replying to @{replyTarget.username}
                                    </span>
                                    <button onClick={() => setReplyTarget(null)} className="text-[8px] font-mono uppercase text-zinc-400 hover:text-zinc-900 cursor-pointer">
                                        [ Cancel ]
                                    </button>
                                </div>
                            )}
                            <div className="flex h-10">
                                <input 
                                    id="signal-input"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                                    placeholder={replyTarget ? `TRANSMIT REPLY TO @${replyTarget.username}...` : "TRANSMIT RESPONSE..."} 
                                    className="flex-1 px-3 text-[10px] font-mono font-black uppercase outline-none placeholder:text-zinc-400" 
                                />
                                <button 
                                    onClick={handleSendComment}
                                    className="bg-blue-500 text-white px-8 text-[10px] font-mono uppercase font-black hover:bg-blue-600 transition-colors cursor-pointer"
                                >
                                    Send
                                </button>
                            </div>
                        </div>

                        {/* Active Generated Comment Tree Output */}
                        <div className="divide-y divide-zinc-300 pb-20">
                            {comments.map((comment) => (
                                <CommentNode 
                                    key={comment.id} 
                                    id={comment.id} 
                                    username={comment.username}
                                    likes={comment.likes} 
                                    content={comment.content}
                                    postedAgo={comment.postedAgo}
                                    replies={comment.replies}
                                    onUserClick={(id) => navigate(`/app/user/${id}`)} 
                                    onReplyClick={(id, name) => handleInitiateReply(id, name)}
                                />
                            ))}
                        </div>
                    </main>

                    <aside className="sticky top-0 h-screen pt-15 w-40 flex flex-col gap-4">
                        <IntelligenceCard author={MOCK_POST.author} onClick={(id) => navigate(`/app/user/${id}`)} />
                    </aside>
                </div>
            </div>
        </div>
    );
};

const PostHeader = ({ author, postedAgo, onCopy, onAvatarClick }: any) => (
    <div className="flex justify-between items-start ">
        <div className="flex gap-3">
            <div className="w-10 h-10 border border-zinc-300 overflow-hidden cursor-pointer" onClick={() => onAvatarClick(author.id)}>
                <img src={author.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 leading-none hover:underline cursor-pointer" onClick={() => onAvatarClick(author.id)}>{author.name}</span>
                <span className="text-[10px] font-mono font-black text-zinc-400 uppercase mt-1">{author.username} • {postedAgo}</span>
            </div>
        </div>
        <button onClick={onCopy} className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 cursor-pointer transition-all active:scale-90"><Copy size={14} /></button>
    </div>
);

const PostActionBar = ({ post, liked, bookmarked, onLike, onBookmark }: any) => (
    <div className="flex items-center justify-between border-t border-zinc-100 mt-3">
        <div className="flex items-center gap-10">
            <button onClick={onLike} className={cn("flex items-center gap-2 text-xs font-mono cursor-pointer transition-colors", liked ? "text-blue-600 font-bold" : "text-zinc-500 hover:text-blue-600")}>
                <Heart size={16} className={liked ? "fill-blue-600" : ""} /> {post.likes + (liked ? 1 : 0)}
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><MessageSquare size={16} /> {post.commentsCount}</div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500"><BarChart3 size={16} /> {post.views}</div>
        </div>
        <button onClick={onBookmark} className={cn("cursor-pointer transition-colors p-1", bookmarked ? "text-zinc-900" : "text-zinc-400 hover:text-zinc-900")}>
            <Bookmark size={18} className={bookmarked ? "fill-zinc-900" : ""} />
        </button>
    </div>
);

const IntelligenceCard = ({ author, onClick }: any) => (
    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl">
        <h4 className="text-[9px] font-mono font-black uppercase text-zinc-400 mb-3 tracking-widest">Node_Intelligence</h4>
        <div className="flex items-center gap-3">
            <img src={author.avatar} className="w-8 h-8 rounded-lg border border-zinc-200 object-cover cursor-pointer" onClick={() => onClick(author.id)} />
            <div className="flex flex-col">
                <span className="text-xs font-bold tracking-tighter">{author.name}</span>
                <span className="text-[9px] font-mono font-black text-emerald-600 uppercase">RELIABILITY: {author.reliability}</span>
            </div>
        </div>
    </div>
);

export default PostDetail;