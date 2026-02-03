import { useState } from 'react';
import { 
  ArrowLeft, Users, ShieldCheck, Share2, 
  MoreHorizontal, MessageSquare 
} from 'lucide-react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const CommunityDetail = () => {
    const [activeTab, setActiveTab] = useState('Top');

    return (
        /* Base container remains min-h-screen but allows body scrolling */
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col relative">
            <Navbar />
            
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                
                {/* 1. FIXED SIDEBAR WRAPPER */}
                <aside className="w-24 shrink-0 relative">
                    <div className="sticky top-[52px] h-[calc(100vh-52px)] flex flex-col py-4">
                        <AppSideBar />
                    </div>
                </aside>

                {/* 2. MAIN SCROLLING FEED */}
                <main className="flex-1 flex flex-col border-x border-zinc-300 bg-white min-h-screen">
                    
                    {/* STICKY NAV HEADER (Pins to Navbar) */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-[52px] z-40 h-10 divide-x divide-zinc-200">
                        <button className="px-4 h-full hover:bg-zinc-50 transition-colors flex items-center gap-2">
                            <ArrowLeft size={14} />
                            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-900">Return</span>
                        </button>
                        <div className="flex-1 px-4 flex items-center justify-between bg-zinc-50/30">
                            <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">CLUSTER: RUST_PROT_01</span>
                            <div className="flex items-center gap-1.5">
                                <Users size={12} className="text-zinc-400" />
                                <span className="text-[9px] font-mono font-black text-zinc-900">12.4K</span>
                            </div>
                        </div>
                    </div>

                    {/* HERO SECTION (Will scroll away) */}
                    <div className="relative pt-13">
                        <div className="h-40 bg-zinc-900 overflow-hidden relative border-b border-zinc-300">
                            <img 
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200" 
                                className="w-full h-full object-cover opacity-40 grayscale"
                                alt="Cluster"
                            />
                        </div>
                        <div className="p-4 pb-4 relative">
                            <div className="flex items-end justify-between -mt-14 mb-3">
                                <div className="w-20 h-20 bg-zinc-900 border-2 border-white flex items-center justify-center shrink-0">
                                    <span className="text-white font-mono font-black text-3xl">R</span>
                                </div>
                                <button className="bg-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest px-8 h-8 hover:bg-black transition-all">
                                    Join Cluster
                                </button>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter mb-1">Rust Protocol Nodes</h1>
                            <p className="text-xs text-zinc-500 font-semibold tracking-tight max-w-2xl leading-relaxed">
                                Primary intelligence cluster for systems architects. Discussing node velocity and kernel optimization.
                            </p>
                        </div>
                    </div>

                    {/* STICKY TABS (Pins below the Nav Header) */}
                    <div className="flex w-full border-y border-zinc-300 bg-white sticky top-[92px] z-30 divide-x divide-zinc-200 h-10">
                        {['Top', 'Latest', 'Media', 'About'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "flex-1 text-[10px] font-mono font-black uppercase tracking-[0.2em] transition-all",
                                    activeTab === tab 
                                        ? "bg-zinc-800 text-white" 
                                        : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* FEED CONTENT */}
                    <div className="divide-y divide-zinc-300">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="p-4 hover:bg-zinc-50/50 transition-colors group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-900 flex items-center justify-center">
                                            <span className="text-white font-mono text-[10px]">A</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] font-black ">@node_deployer</span>
                                            <span className="text-[9px] font-mono font-black text-zinc-500 ">2h ago</span>
                                        </div>
                                    </div>
                                    <MoreHorizontal size={16} className="text-zinc-200 group-hover:text-zinc-900" />
                                </div>
                                <h3 className="text-sm font-bold uppercase mb-2">Optimizing H100 Cluster Interconnects</h3>
                                <p className="text-[11px] text-zinc-500 leading-normal font-bold tracking-tight">
                                    New data suggests that switching to a memory-safe protocol for inter-node communication reduces latency by 14.2% in high-load scenarios.
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CommunityDetail;