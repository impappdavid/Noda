import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";
import BookmarkNodeCard from './BookmarkNodeCard';
import type { BookmarkNode } from '@/types/bookmarks';

const bookmarkData: BookmarkNode[] = [
    { id: 1, type: "Job", title: "Systems Architect", entity: "Rust Foundation", meta: "125k - 180k", status: "Active", match: 94 },
    { id: 2, type: "Post", title: "Memory Safety in GPU Clusters", entity: "@lex_nodes", meta: "1.2k reads", status: "Technical" },
    { id: 3, type: "Job", title: "Frontend Lead", entity: "Vercel", meta: "Equity + Salary", status: "Closing Soon", match: 92 },
    { id: 4, type: "Post", title: "Anti-Ghosting Protocol Analysis", entity: "@noda_hq", meta: "400 reads", status: "Protocol" },
];

const AppBookmarks = () => {
    const [filter, setFilter] = useState<"All" | "Jobs" | "Posts">("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Performance: Memoize filtered results to avoid recalculation on every re-render
    const filteredNodes = useMemo(() => {
        return bookmarkData.filter((node) => {
            const matchesTab = filter === "All" || (filter === "Jobs" ? node.type === "Job" : node.type === "Post");
            const matchesSearch = node.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 node.entity.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [filter, searchQuery]);

    const jobs = filteredNodes.filter(n => n.type === "Job");
    const posts = filteredNodes.filter(n => n.type === "Post");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-12.5">
                    
                    {/* FILTER BAR */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300 h-full">
                            <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
                                <Search size={14} className="text-zinc-500 mr-2" />
                                <input 
                                    placeholder="SEARCH SAVED NODES..." 
                                    className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 flex divide-x divide-zinc-300 h-full">
                                {(["All", "Jobs", "Posts"] as const).map((tab) => (
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
                        {/* SAVED JOBS */}
                        {jobs.length > 0 && (
                            <section className="w-full">
                                <SectionHeader title="Saved Job Nodes" />
                                <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300">
                                    {jobs.map((job) => <BookmarkNodeCard key={job.id} data={job} />)}
                                </div>
                            </section>
                        )}

                        {/* POST INTELLIGENCE */}
                        {posts.length > 0 && (
                            <section className="w-full">
                                <SectionHeader title="Post Intelligence" />
                                <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300">
                                    {posts.map((post) => <BookmarkNodeCard key={post.id} data={post} />)}
                                </div>
                            </section>
                        )}

                        {filteredNodes.length === 0 && (
                            <div className="p-10 text-center font-mono text-[10px] text-zinc-400 uppercase tracking-[0.3em]">
                                No nodes found in current buffer
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
        <h2 className="text-[9px] font-mono font-black uppercase tracking-[0.3em] text-zinc-900">
            {title}
        </h2>
    </div>
);

export default AppBookmarks;