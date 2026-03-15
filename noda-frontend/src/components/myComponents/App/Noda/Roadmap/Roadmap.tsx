import React, { useState } from 'react';
import {
    FileCode2, MoreHorizontal, MessageSquare, BarChart3,
    Bookmark, Share, Heart, Layers, Globe, Github, Terminal, ChevronRight, CheckCircle2, PlusCircle, Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';

// --- 1. MOCK DATA (CHANGELOG POSTS) ---
const CHANGELOG_POSTS = [
    {
        id: "v2.1.0",
        author: {
            name: "System Admin",
            username: "root_deployer",
            role: "Release Manager",
            avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SA&backgroundColor=18181b",
        },
        version: "v2.1.0",
        postedAgo: "2h",
        content: "Major architecture overhaul and new telemetry features deployed to all edge nodes. The new Dark Mode Matrix is now the default view for terminal operations.",
        changes: [
            { type: "ADDED", text: "Live system diagnostics panel in sidebar." },
            { type: "IMPROVED", text: "Zero-copy serialization latency reduced by 14%." }
        ],
        images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"], // Example with picture
        likes: 342,
        comments: 45,
        views: "12.1k",
    },
    {
        id: "v2.0.5",
        author: {
            name: "System Admin",
            username: "root_deployer",
            role: "Release Manager",
            avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SA&backgroundColor=18181b",
        },
        version: "v2.0.5",
        postedAgo: "3d",
        content: "Routine maintenance and hotfixes for the Settings module. Please refresh your clients to clear the local cache.",
        changes: [
            { type: "FIXED", text: "Resolved memory leak in background polling." },
            { type: "FIXED", text: "Dropdown nodes now properly unmount on click outside." }
        ],
        images: [],
        likes: 124,
        comments: 12,
        views: "4.2k",
    }
];

// --- 2. MAIN COMPONENT ---
const ChangelogProtocol: React.FC = () => {
    const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
    const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});

    const toggleLike = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleBookmark = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const scrollToVersion = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans flex flex-col relative">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">

                {/* LEFT NAVIGATION */}
                <aside className="w-25 shrink-0 relative hidden sm:block">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 border-x border-zinc-300 bg-white min-h-screen shadow-sm flex-row pt-12">

                    {/* CENTER CONTENT */}
                    <div className="flex-1 flex flex-col border-r border-zinc-300 relative">

                        {/* SIMPLIFIED HEADER */}
                        <div className="p-2 bg-zinc-800 bg-white sticky top-12 z-30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileCode2 size={14} className="text-orange-500" />
                                <h1 className="text-xs font-medium uppercase  text-zinc-200 leading-none">Changelog</h1>
                            </div>
                            <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                                System_Updates
                            </span>
                        </div>

                        {/* SOCIAL POST FEED */}
                        <div className="flex flex-col gap-[1px]">
                            {CHANGELOG_POSTS.map((post) => (
                                <div id={post.id} key={post.id} className="p-3 bg-white hover:bg-zinc-50/50 border-b border-zinc-300 transition-colors group block">

                                    {/* Post Header (Author & Version) */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="">
                                            <div className="flex flex-col justify-center">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-md font-bold text-zinc-900 leading-none">Dark Mode</span>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-[9px] font-mono font-black text-white bg-zinc-900 px-1.5 py-0.5 uppercase tracking-widest">
                                                {post.version}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Post Content */}
                                    <div className="">
                                        <p className="text-xs font-medium text-zinc-800 leading-relaxed mb-2">
                                            {post.content}
                                        </p>

                                        {/* Changelog Specific List */}
                                        {post.changes.length > 0 && (
                                            <div className="flex flex-col gap-2 mb-2 bg-zinc-50/80 border border-zinc-200 p-3">
                                                {post.changes.map((change, idx) => (
                                                    <div key={idx} className="flex items-start gap-2">
                                                        <ChangeTag type={change.type} />
                                                        <span className="text-[10px] font-medium text-zinc-700 ">{change.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Post Image */}
                                        {post.images && post.images.length > 0 && (
                                            <div className="mb-2 border border-zinc-300  p-1 shadow-sm">
                                                <img
                                                    src={post.images[0]}
                                                    alt="Release preview"
                                                    className="w-full aspect-video object-cover border border-zinc-300 transition-all duration-500"
                                                />
                                            </div>
                                        )}

                                        {/* Action Bar */}
                                        <div className="flex items-center justify-between pt-2 px-1">
                                            <div className="flex items-center gap-6">
                                                <LikeButton post={post} isLiked={!!likedPosts[post.id]} onToggle={(e) => toggleLike(e, post.id)} />
                                                
                                            </div>
                                            <div className="flex items-center gap-4 text-zinc-400">
                                                
                                                <button className="hover:text-zinc-900 transition-colors">
                                                    <Share size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* REDESIGNED MAX-W-40 SIDEBAR */}
                    <aside className="w-39 shrink-0 bg-white relative hidden md:block">
                        <div className="sticky top-12 flex flex-col h-[calc(100vh-3.5rem)]">

                            {/* SIDEBAR HEADER */}
                            <div className="p-2 bg-zinc-800 text-white shrink-0">
                                <div className="flex items-center gap-1">
                                    <span className="text-[9px] font-semibold text-zinc-300 uppercase">System Status</span>
                                </div>
                            </div>

                            {/* AGGREGATE INFO */}
                            <div className="p-2 border-b border-zinc-300 bg-white space-y-2 shrink-0">
                                <SidebarStat label="Current Build" value={CHANGELOG_POSTS[0].version} />
                                <SidebarStat label="Last Updated" value="TODAY" />
                            </div>

                            {/* NAVIGABLE VERSION INDEX */}
                            <div className="p-2 border-b border-zinc-300 bg-zinc-50 flex-1 overflow-hidden flex flex-col">
                                <div className="flex items-center gap-1.5 pb-2 border-b border-zinc-200 mb-3 shrink-0">
                                    <Layers size={10} className="text-zinc-600" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-500">Version Matrix</span>
                                </div>
                                <div className="flex flex-col gap-1.5 overflow-y-auto scrollbar-hide content-start">
                                    {CHANGELOG_POSTS.map(post => (
                                        <button
                                            key={post.id}
                                            onClick={() => scrollToVersion(post.id)}
                                            className="w-full flex items-center justify-between bg-white border border-zinc-200 px-2 py-1.5 cursor-pointer hover:border-zinc-500 hover:bg-zinc-100 transition-colors group"
                                        >
                                            <span className="text-[9px] font-mono font-black text-zinc-800 uppercase">{post.version}</span>
                                            <ChevronRight size={10} className="text-zinc-300 group-hover:text-zinc-800 transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* NETWORK LINKS */}
                            <div className="bg-white shrink-0">
                                <div className="flex items-center gap-1.5 p-2 border-b border-zinc-300 bg-zinc-800">
                                    <Globe size={10} className="text-zinc-300" />
                                    <span className="text-[8px] font-mono font-black uppercase tracking-[0.2em] text-zinc-300">Resources</span>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                    <SocialLink icon={<Github size={10} />} label="Repository" value="github.com/noda" />
                                    <SocialLink icon={<Terminal size={10} />} label="API Docs" value="docs.noda.dev" />
                                </div>
                            </div>

                        </div>
                    </aside>

                </main>
            </div>
        </div>
    );
};

// --- 3. SUB-COMPONENTS ---

const LikeButton = ({ post, isLiked, onToggle }: { post: any, isLiked: boolean, onToggle: (e: React.MouseEvent) => void }) => (
    <button
        onClick={onToggle}
        className={cn(
            "relative flex items-center gap-1.5 transition-colors cursor-pointer outline-none group",
            isLiked ? "text-orange-600" : "text-zinc-400 hover:text-orange-500"
        )}
    >
        <AnimatePresence>
            {isLiked && (
                <motion.span
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute left-0 inset-0 w-3.5 h-3.5 border border-orange-500 rounded-full z-0"
                />
            )}
        </AnimatePresence>
        <motion.div
            animate={isLiked ? { scale: [1, 1.4, 1], rotate: [0, 15, -15, 0] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
        >
            <Heart size={14} className={cn("transition-all duration-300", isLiked ? "fill-orange-600 stroke-orange-600" : "fill-transparent stroke-current")} />
        </motion.div>
        <div className="overflow-hidden h-4">
            <AnimatePresence mode="wait">
                <motion.span
                    key={isLiked ? "liked" : "unliked"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-[11px] font-mono font-black uppercase tracking-tighter block"
                >
                    {post.likes + (isLiked ? 1 : 0)}
                </motion.span>
            </AnimatePresence>
        </div>
    </button>
);

const ChangeTag = ({ type }: { type: string }) => {
    switch (type) {
        case "ADDED":
            return (
                <div className="flex items-center gap-1 text-emerald-600 shrink-0">
                    <PlusCircle size={10} />
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest">Added</span>
                </div>
            );
        case "IMPROVED":
            return (
                <div className="flex items-center gap-1 text-blue-600 shrink-0">
                    <CheckCircle2 size={10} />
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest">Improved</span>
                </div>
            );
        case "FIXED":
            return (
                <div className="flex items-center gap-1 text-orange-600 shrink-0">
                    <Wrench size={10} />
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest">Fixed</span>
                </div>
            );
        default:
            return null;
    }
};

const SidebarStat = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">{label}</span>
        <span className="text-[9px] font-bold uppercase text-zinc-900">{value}</span>
    </div>
);

const SocialLink = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col group cursor-pointer p-2 hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-1.5 text-zinc-500 mb-0.5 group-hover:text-orange-600 transition-colors">
            {icon}
            <span className="text-[8px] font-mono font-black uppercase tracking-widest">{label}</span>
        </div>
        <span className="text-[9px] font-bold text-zinc-900 truncate w-full pl-4">{value}</span>
    </div>
);

export default ChangelogProtocol;