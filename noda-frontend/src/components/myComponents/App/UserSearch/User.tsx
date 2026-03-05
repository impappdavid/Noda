import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, User, ArrowUpRight, Plus, Loader2 } from "lucide-react";
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import Suggestions from '../Home/Suggestions';

// --- MOCK_DATA_RESOURCES ---
const USER_DATA = Array.from({ length: 51 }, (_, i) => ({
    id: `u${i + 1}`,
    name: `Node Specialist ${i + 1}`,
    username: `user_${i + 1}`,
    role: i % 3 === 0 ? "Systems Architect" : "Frontend Lead",
    company: i % 2 === 0 ? "OpenAI" : "Vercel",
    level: `L${(i % 7) + 1}`
}));

const UserSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const usernameQuery = searchParams.get("username") || "";

    const [displayLimit, setDisplayLimit] = useState(15);
    const [isSyncing, setIsSyncing] = useState(false);
    const observerTarget = useRef(null);

    const filteredUsers = useMemo(() => {
        return USER_DATA.filter(user =>
            user.username.toLowerCase().includes(usernameQuery.toLowerCase()) ||
            user.name.toLowerCase().includes(usernameQuery.toLowerCase())
        );
    }, [usernameQuery]);

    const currentUsers = filteredUsers.slice(0, displayLimit);
    const hasMore = displayLimit < filteredUsers.length;

    const loadMoreNodes = useCallback(() => {
        setIsSyncing(true);
        setTimeout(() => {
            setDisplayLimit(prev => prev + 15);
            setIsSyncing(false);
        }, 600);
    }, []);

    useEffect(() => {
        // threshold 0.1 means trigger when 10% of the target is visible
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isSyncing) {
                    loadMoreNodes();
                }
            },
            { threshold: 0.1 }
        );

        const currentTarget = observerTarget.current;
        if (currentTarget) observer.observe(currentTarget);
        return () => { if (currentTarget) observer.unobserve(currentTarget); };
    }, [hasMore, isSyncing, loadMoreNodes]);

    return (
        /* Removed h-screen and overflow-hidden to allow global body scroll */
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                {/* Sidebar remains sticky so it stays visible while you scroll the page */}
                <aside className="w-25 flex-none">
                    <AppSideBar />
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex flex-1 gap-2 border-l border-zinc-300 bg-white relative min-h-screen">

                    <div className="flex-1 flex flex-col pt-12.5 border-r border-zinc-300">

                        {/* SEARCH HEADER - Sticky at the top of the main area */}
                        <div className="px-2 py-2 border-b border-zinc-300 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                            <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em]">{filteredUsers.length} result</span>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-zinc-800 text-white text-[10px] font-mono uppercase">
                                    @{usernameQuery || "ALL_users"}
                                </div>
                                {usernameQuery && <X size={14} className="cursor-pointer" onClick={() => setSearchParams({})} />}
                            </div>
                        </div>

                        {/* GRID LAYOUT (Col-3) */}
                        <div className="grid grid-cols-1 bg-zinc-300 gap-[1px] border-b border-zinc-300">
                            {currentUsers.map((person) => (
                                <Link
                                    key={person.id}
                                    to={`/app/user/${person.name}`}
                                    className="p-1.5 bg-white flex gap-2 justify-between items-center group hover:bg-zinc-50 transition-all relative cursor-pointer"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 bg-zinc-100 overflow-hidden border border-zinc-300">
                                            <img
                                                src='https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp'
                                                className="w-full h-full object-cover transition-all"
                                                alt="avatar"
                                            />
                                        </div>
                                    </div>

                                    <div className=" w-full  relative">
                                        <button
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                            className="w-7 px-2 h-7 absolute top-0 right-0 bg-orange-500 flex justify-center items-center text-white  uppercase cursor-pointer hover:bg-orange-600 transition-colors"
                                        >
                                            <Plus className='w-5 h-5' />
                                        </button>
                                        <div className="">
                                            <div className="flex w-full">
                                                <div className="flex items-center gap-1">
                                                    <h3 className="text-[11px] font-bold uppercase tracking-tight leading-none">{person.name}</h3>
                                                    <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                        <ArrowUpRight size={12} className="text-zinc-800" />
                                                    </div>
                                                </div>

                                            </div>
                                            <p className="text-[10px] font-mono text-zinc-500 uppercase leading-tight tracking-wider">
                                                {person.role} <br />
                                                <span className="text-zinc-900 font-black">@{person.company}</span>
                                            </p>
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* INFINITE SCROLL TARGET */}
                        <div ref={observerTarget} className="p-10 flex flex-col items-center justify-center bg-white">
                            {isSyncing ? (
                                <Loader2 size={20} className="animate-spin text-orange-500" />
                            ) : hasMore ? (
                                <span className="text-[8px] font-mono text-zinc-300 uppercase tracking-widest">Scanning_More_Nodes...</span>
                            ) : (
                                <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">End_Of_Directory</span>
                            )}
                        </div>
                    </div>

                    {/* SUGGESTION SIDEBAR - Sticky so it stays in view during long scrolls */}

                    <Suggestions />
                </main>
            </div>
        </div>
    );
};

export default UserSearchPage;