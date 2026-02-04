import { useState } from 'react';
import { Search, Bookmark, ArrowUpRight, Briefcase, FileText, MessageSquare } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const bookmarkData = [
    { id: 1, type: "Job", title: "Systems Architect", entity: "Rust Foundation", meta: "125k - 180k", status: "Active", match: 94 },
    { id: 2, type: "Post", title: "Memory Safety in GPU Clusters", entity: "@lex_nodes", meta: "1.2k reads", status: "Technical" },
    { id: 3, type: "Job", title: "Frontend Lead", entity: "Vercel", meta: "Equity + Salary", status: "Closing Soon", match: 92 },
    { id: 4, type: "Post", title: "Anti-Ghosting Protocol Analysis", entity: "@noda_hq", meta: "400 reads", status: "Protocol" },
];

const AppBookmarks = () => {
    const [filter, setFilter] = useState("All");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    {/* 1. GAPLESS FILTER BAR */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300 h-full">
                            <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
                                <Search size={14} className="text-zinc-500 mr-2" />
                                <input 
                                    placeholder="SEARCH SAVED NODES..." 
                                    className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
                                />
                            </div>
                            <div className="flex-1 flex divide-x divide-zinc-300 h-full">
                                {["All", "Jobs", "Posts"].map((tab) => (
                                    <button 
                                        key={tab}
                                        onClick={() => setFilter(tab)}
                                        className={cn(
                                            "flex-1 text-[10px] font-mono font-bold uppercase tracking-tighter transition-colors cursor-pointer",
                                            filter === tab ? "bg-zinc-800 text-white" : "bg-white text-zinc-500 hover:bg-zinc-50"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                        
                        {/* 2. SAVED JOBS - RETAINS MATCH % */}
                        {(filter === "All" || filter === "Jobs") && (
                            <section className="w-full">
                                <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                                    <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-900">
                                        Saved Job Nodes
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300">
                                    {bookmarkData.filter(d => d.type === "Job").map((job) => (
                                        <BookmarkNodeCard key={job.id} data={job} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. POST INTELLIGENCE - REMOVED MATCH % */}
                        {(filter === "All" || filter === "Posts") && (
                            <section className="w-full">
                                <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                                    <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-900">
                                        Post Intelligence
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300">
                                    {bookmarkData.filter(d => d.type === "Post").map((post) => (
                                        <BookmarkNodeCard key={post.id} data={post} />
                                    ))}
                                </div>
                            </section>
                        )}
                        
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- SQUARED BOOKMARK CARD ---
const BookmarkNodeCard = ({ data }: any) => {
    const isJob = data.type === "Job";

    return (
        <div className="p-3 flex flex-col justify-center min-h-[90px] bg-white hover:bg-zinc-50 transition-colors cursor-pointer group relative">
            <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest leading-none">
                        {data.status} 
                        {/* Match signal only for Job nodes */}
                        {isJob && (
                            <>
                                <span className="mx-1 opacity-50">•</span> 
                                {data.match}% MATCH
                            </>
                        )}
                    </span>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5">
                        {data.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        {isJob ? <Briefcase size={11} className="text-zinc-600"/> : <FileText size={11} className="text-zinc-6500"/>}
                        <span className="text-[11px] font-mono font-bold text-zinc-600 uppercase tracking-tighter">
                            {data.entity}
                        </span>
                    </div>
                </div>
                <button className="text-white group-hover:text-zinc-900 transition-colors">
                    <ArrowUpRight size={16} />
                </button>
            </div>

            <div className="flex items-center justify-between mt-auto ">
                <span className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-tighter">
                    {data.meta}
                </span>
                <div className="flex gap-2">
                    <button className="text-zinc-900">
                        <Bookmark size={12} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppBookmarks;