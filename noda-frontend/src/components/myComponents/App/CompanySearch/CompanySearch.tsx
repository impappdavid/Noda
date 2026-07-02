import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {  Loader2, Users2, Star, Plus } from "lucide-react";
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import Suggestions from '@/features/home/components/Suggestions';

const COMPANY_DATA = [
    { 
        id: "c1", 
        name: "OpenAI", 
        sector: "AI/ML", 
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
        followers: "1.2M",
        teamSize: "500+",
        desc: "Developing safe and beneficial artificial general intelligence."
    },
    { 
        id: "c2", 
        name: "Vercel", 
        sector: "Cloud", 
        logo: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
        followers: "450K",
        teamSize: "250+",
        desc: "The platform for frontend developers, providing speed and reliability."
    },
    { 
        id: "c3", 
        name: "Stripe", 
        sector: "Payments", 
        logo: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
        followers: "800K",
        teamSize: "7000+",
        desc: "Financial infrastructure for the internet."
    }
].map((item, i) => ({ ...item, id: `c${i + 1}` }));

const CompanySearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";

    const [displayLimit, setDisplayLimit] = useState(12);
    const [isSyncing, setIsSyncing] = useState(false);
    const [followedIds, setFollowedIds] = useState<string[]>([]);
    const observerTarget = useRef(null);

    const toggleFollow = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setFollowedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredCompanies = useMemo(() => {
        return COMPANY_DATA.filter(company =>
            company.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    const currentCompanies = filteredCompanies.slice(0, displayLimit);
    const hasMore = displayLimit < filteredCompanies.length;

    const loadMoreNodes = useCallback(() => {
        setIsSyncing(true);
        setTimeout(() => {
            setDisplayLimit(prev => prev + 8);
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
        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [hasMore, isSyncing, loadMoreNodes]);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-x-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4">
                <aside className="w-25 shrink-0 relative">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 gap-2 bg-white relative min-h-screen">
                    <div className="flex-1 flex flex-col pt-12.5 border-x border-zinc-300">

                        <div className="p-2 pt-3 border-b border-zinc-300  backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                            <h1 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                Companies
                            </h1>
                            <div className="text-[9px] font-mono font-bold text-zinc-500">
                                {filteredCompanies.length} FOUND
                            </div>
                        </div>

                        <div className="flex flex-col bg-zinc-200 gap-px">
                            {currentCompanies.map((company) => {
                                const isFollowed = followedIds.includes(company.id);
                                return (
                                    <div
                                        key={company.id}
                                        onClick={() => navigate(`/app/company/${company.name.toLowerCase()}`)}
                                        className="relative bg-white flex group cursor-pointer hover:bg-zinc-50 transition-colors p-2 gap-3 items-center"
                                    >
                                        {/* Logo */}
                                        <div className="w-14 h-14 bg-white  p-2 flex items-center justify-center shrink-0">
                                            <img src={company.logo} alt="" className="w-full h-full object-contain transition-all duration-300" />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 flex flex-col min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-[11px] font-bold tracking-tight text-zinc-900 leading-none group-hover:underline underline-offset-2">
                                                    {company.name}
                                                </h3>
                                                <span className="text-[8px] font-mono bg-zinc-200 px-1.5 py-0.5 border border-zinc-300 text-zinc-700 uppercase tracking-tighter">
                                                    {company.sector}
                                                </span>
                                            </div>
                                            <p className="text-[10px] text-zinc-600 line-clamp-1 mt-1 group-hover:text-zinc-800 transition-colors">
                                                {company.desc}
                                            </p>

                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1.5">
                                                    <Star size={10} className="text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                                    <span className="text-[9px] font-mono font-bold text-zinc-500">{company.followers}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users2 size={10} className="text-zinc-500 group-hover:text-blue-500 transition-colors" />
                                                    <span className="text-[9px] font-mono font-bold text-zinc-500">{company.teamSize}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Squared Follow Button */}
                                        <button
                                            onClick={(e) => toggleFollow(e, company.id)}
                                            className={`
                                                relative flex items-center justify-center gap-2 min-w-22.5 h-7 
                                                transition-all duration-300 ease-out shrink-0 border-0 rounded-none cursor-pointer
                                                active:scale-95
                                                ${isFollowed 
                                                    ? 'bg-zinc-300 text-black hover:bg-zinc-400/60' 
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }
                                            `}
                                        >
                                            <div className={`flex items-center gap-1 ${isFollowed ? 'animate-in fade-in zoom-in-90' : ''}`}>
                                                {isFollowed ? (
                                                    <>
                                                        <span className="text-[9px] font-bold uppercase tracking-tight">Following</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Plus size={12} strokeWidth={3} />
                                                        <span className="text-[9px] font-bold uppercase tracking-tight">Follow</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        <div ref={observerTarget} className="p-10 flex flex-col items-center justify-center bg-white border-t border-zinc-300">
                            {isSyncing ? (
                                <Loader2 size={16} className="animate-spin text-blue-600" />
                            ) : (
                                <span className="text-[8px] font-mono text-zinc-300 uppercase tracking-[0.6em]">End_Of_Transmission</span>
                            )}
                        </div>
                    </div>

                    <Suggestions />
                </main>
            </div>
        </div>
    );
};

export default CompanySearchPage;