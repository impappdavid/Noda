import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, ArrowUpRight, Loader2 } from "lucide-react";
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import Suggestions from '../Home/Suggestions';

// Mock Data
const COMPANY_DATA = [
    { id: "c1", name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
    { id: "c2", name: "Vercel", logo: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg" },
    { id: "c3", name: "Anthropic", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Anthropic_logo.svg" },
    { id: "c4", name: "Google Cloud", logo: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" },
    { id: "c5", name: "Meta", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-official.svg" },
    { id: "c6", name: "Stripe", logo: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg" },
    { id: "c7", name: "GitHub", logo: "https://www.vectorlogo.zone/logos/github/github-icon.svg" },
    { id: "c8", name: "Tesla", logo: "https://www.vectorlogo.zone/logos/tesla/tesla-icon.svg" },
    { id: "c9", name: "Amazon AWS", logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg" },
    { id: "c10", name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
    { id: "c11", name: "Netflix", logo: "https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg" },
    { id: "c12", name: "Airbnb", logo: "https://www.vectorlogo.zone/logos/airbnb/airbnb-icon.svg" },
    { id: "c13", name: "Slack", logo: "https://www.vectorlogo.zone/logos/slack/slack-icon.svg" },
    { id: "c14", name: "Spotify", logo: "https://www.vectorlogo.zone/logos/spotify/spotify-icon.svg" },
    { id: "c15", name: "Docker", logo: "https://www.vectorlogo.zone/logos/docker/docker-icon.svg" },
    { id: "c16", name: "NVIDIA", logo: "https://www.vectorlogo.zone/logos/nvidia/nvidia-icon.svg" },
    { id: "c17", name: "DigitalOcean", logo: "https://www.vectorlogo.zone/logos/digitalocean/digitalocean-icon.svg" },
    { id: "c18", name: "Cloudflare", logo: "https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg" },
    { id: "c19", name: "Notion", logo: "https://www.vectorlogo.zone/logos/notion/notion-icon.svg" },
    { id: "c20", name: "Discord", logo: "https://www.vectorlogo.zone/logos/discordapp/discordapp-icon.svg" },
    // You can repeat these or add more unique ones to reach 51+
].map((item, i) => ({ ...item, id: `c${i + 1}` })); // Ensures unique IDs if you duplicate the list

const CompanySearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get("q") || "";

    const [displayLimit, setDisplayLimit] = useState(12);
    const [isSyncing, setIsSyncing] = useState(false);
    const observerTarget = useRef(null);

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
            setDisplayLimit(prev => prev + 9);
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
                <aside className="w-25 shrink-0 relative">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 gap-2 bg-white relative min-h-screen">
                    <div className="flex-1 flex flex-col pt-12.5 border-x border-zinc-300">

                        {/* HEADER */}
                        <div className="px-4 py-3 border-b border-zinc-300 bg-white/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
                            <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em]">Entity_Visual_Registry</span>
                            <div className="flex items-center gap-2">
                                <div className="px-2 py-1 bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                                    {query || "ALL_company"}
                                </div>
                                {query && <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => setSearchParams({})} />}
                            </div>
                        </div>

                        {/* GLASS LOGO GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 bg-zinc-100 divide-x divide-zinc-300 divide-y">
                            {currentCompanies.map((company) => (
                                <div
                                    key={company.id}
                                    onClick={() => navigate(`/app/company/${company.id}`)}
                                    className="relative aspect-square bg-white flex items-center justify-center p-8 group overflow-hidden cursor-pointer"
                                >


                                    {/* The Logo (Centered) */}
                                    <img
                                        src={company.logo}
                                        alt={company.name}
                                        className="w-16 h-16 object-contain group-hover:scale-110  transition-all duration-500"
                                    />

                                    {/* GLASS HOVER OVERLAY */}
                                    <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 bg-zinc-800/60 backdrop-blur-sm transition-all duration-300 flex items-center justify-center p-4">
                                        {/* Dark Blurred Glass Background */}

                                        {/* Center Text UI */}
                                        <div className="relative z-20 flex flex-col items-center gap-2 scale-0 group-hover:scale-100 transition-transform duration-300">
                                            <h3 className="text-white text-xs font-bold uppercase tracking-[0.3em] text-center drop-shadow-md">
                                                {company.name}
                                            </h3>
                                            <div className="w-8 h-[1px] bg-white" />
                                            <ArrowUpRight size={14} className="text-white mt-1 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* INFINITE SCROLL LOADER */}
                        <div ref={observerTarget} className="p-16 flex flex-col items-center justify-center bg-white border-t border-zinc-300">
                            {isSyncing ? (
                                <Loader2 size={20} className="animate-spin text-orange-500" />
                            ) : hasMore ? (
                                <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse">Syncing_Nodes...</span>
                            ) : (
                                <span className="text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest">End_Of_Directory</span>
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