import { useState } from 'react';
import { ArrowLeft, Users } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import CommunityHero from './CommunityHero';
import FeedItem from './FeedItem';
import type { CommunityData, Post } from '@/types/community';

const MOCK_COMMUNITY: CommunityData = {
    id: "RUST_PROT_01",
    clusterName: "RUST_PROT_01",
    title: "Rust Protocol Nodes",
    memberCount: "12.4K",
    description: "Primary intelligence cluster for systems architects. Discussing node velocity and kernel optimization.",
    bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    initial: "R"
};

const MOCK_POSTS: Post[] = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    author: "@node_deployer",
    time: "2h ago",
    title: "Optimizing H100 Cluster Interconnects",
    content: "New data suggests that switching to a memory-safe protocol for inter-node communication reduces latency by 14.2% in high-load scenarios."
}));

const CommunityDetail = () => {
    const [activeTab, setActiveTab] = useState('Top');

    // Memoize tab button generation
    const tabs = ['Top', 'Latest', 'Media', 'About'];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col py-4">
                        <AppSideBar />
                    </div>
                </aside>

                <main className="flex-1 flex flex-col border-x border-zinc-300 bg-white min-h-screen">
                    {/* STICKY NAV HEADER */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-[52px] z-40 h-10 divide-x divide-zinc-200">
                        <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2 cursor-pointer border-none bg-transparent">
                            <ArrowLeft size={14} />
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-900">Return</span>
                        </button>
                        <div className="flex-1 px-4 flex items-center justify-between bg-zinc-50/30">
                            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">
                                CLUSTER: {MOCK_COMMUNITY.clusterName}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Users size={12} className="text-zinc-400" />
                                <span className="text-[9px] font-mono font-black text-zinc-900">{MOCK_COMMUNITY.memberCount}</span>
                            </div>
                        </div>
                    </div>

                    <CommunityHero data={MOCK_COMMUNITY} />

                    {/* STICKY TABS */}
                    <div className="flex w-full border-y border-zinc-300 bg-white sticky top-[92px] z-30 divide-x divide-zinc-200 h-10">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all border-none cursor-pointer",
                                    activeTab === tab ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* FEED CONTENT */}
                    <div className="divide-y divide-zinc-300">
                        {activeTab !== 'About' ? (
                            MOCK_POSTS.map(post => (
                                <FeedItem key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="p-10 text-center font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                                Cluster documentation restricted to members.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CommunityDetail;