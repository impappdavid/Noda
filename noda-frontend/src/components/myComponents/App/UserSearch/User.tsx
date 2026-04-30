import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, Plus, Check, Loader2, Users2, Shield } from "lucide-react";
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
    level: `L${(i % 7) + 1}`,
    followers: `${(Math.random() * 10).toFixed(1)}K`
}));

const UserSearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const usernameQuery = searchParams.get("username") || "";

    const [displayLimit, setDisplayLimit] = useState(15);
    const [isSyncing, setIsSyncing] = useState(false);
    const [followedIds, setFollowedIds] = useState<string[]>([]);
    const observerTarget = useRef(null);

    const toggleFollow = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setFollowedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

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
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-x-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-25 ">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 gap-2 bg-white relative min-h-screen">
                    <div className="flex-1 flex flex-col pt-12.5 border-x border-zinc-300">

                        {/* SEARCH HEADER */}
                        <div className="p-2 border-b border-zinc-300 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                            <h1 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                Users
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase">
                                    {filteredUsers.length} FOUND
                                </div>
                               
                            </div>
                        </div>

                        {/* USER LIST - COMPACT PADDING 2 */}
                        <div className="flex flex-col bg-zinc-200 gap-[1px]">
                            {currentUsers.map((person) => {
                                const isFollowed = followedIds.includes(person.id);
                                return (
                                    <Link
                                        key={person.id}
                                        to={`/app/user/${person.username}`}
                                        className="relative bg-white flex group cursor-pointer hover:bg-zinc-50 transition-colors p-2 gap-2 items-center"
                                    >
                                        {/* Shrunk Avatar */}
                                        <div className="w-11 h-11 bg-zinc-100 border border-zinc-100 shrink-0 overflow-hidden">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.username}`}
                                                className="w-full h-full object-cover transition-all duration-300"
                                                alt="avatar"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[12px] font-bold  text-zinc-900 leading-none group-hover:underline underline-offset-2">
                                                    {person.name}
                                                </h3>
                                                <span className="text-[9px] font-bold text-zinc-600">
                                                    @{person.username}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <p className="text-[11px] text-zinc-600 uppercase font-mono tracking-tighter">
                                                    {person.role} at <span className='font-bold text-zinc-900 hover:underline'>{person.company}</span>
                                                </p>
                                                
                                            </div>

                                            <div className="flex items-center gap-3 ">
                                                
                                                <div className="flex items-center gap-1">
                                                    <Users2 size={9} className="text-zinc-500 group-hover:text-blue-600" />
                                                    <span className="text-[9px] font-mono font-bold text-zinc-400">{person.followers}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Squared Follow Button */}
                                        <button
                                            onClick={(e) => toggleFollow(e, person.id)}
                                            className={`
                                                relative flex items-center justify-center gap-1.5 min-w-[85px] h-7 
                                                transition-all duration-200 ease-out shrink-0 border-0 rounded-none cursor-pointer
                                                active:scale-95
                                                ${isFollowed 
                                                    ? 'bg-zinc-800 text-white hover:bg-zinc-900' 
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }
                                            `}
                                        >
                                            <div className={`flex items-center gap-1 ${isFollowed ? 'animate-in fade-in zoom-in-95' : ''}`}>
                                                {isFollowed ? (
                                                    <>
                                                        <span className="text-[9px] font-bold uppercase ">Connected</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus size={11} strokeWidth={3} />
                                                        <span className="text-[9px] font-bold uppercase ">Connect</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* INFINITE SCROLL */}
                        <div ref={observerTarget} className="p-8 flex flex-col items-center justify-center bg-white border-t border-zinc-300">
                            {isSyncing ? (
                                <Loader2 size={14} className="animate-spin text-blue-600" />
                            ) : (
                                <span className="text-[8px] font-mono text-zinc-300 uppercase tracking-[0.4em]">End_Of_File</span>
                            )}
                        </div>
                    </div>

                    <Suggestions />
                </main>
            </div>
        </div>
    );
};

export default UserSearchPage;