import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Search, Clock, X, Briefcase, Building2, Zap, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils";

// --- MOCK DATABASE ---
const SEARCH_DB = {
    users: [
        { id: "u1", name: "John Doe", username: "@jdoe", role: "Systems Architect" },
        { id: "u2", name: "Jane Smith", username: "@jsmith", role: "Frontend Lead" },
    ],
    companies: [
        { id: "c1", name: "OpenAI", location: "San Francisco", nodes: "1,204" },
        { id: "c2", name: "Vercel", location: "Remote", nodes: "450" },
    ],
    jobs: [
        { id: "j1", title: "Frontend Developer", company: "Meta", type: "Full-Time" },
        { id: "j2", title: "Backend Systems", company: "OpenAI", type: "Contract" },
    ]
};

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // RESTORED HISTORY FUNCTION
    const [history, setHistory] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('noda_search_history');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    // FILTERING LOGIC
    const filteredResults = {
        users: SEARCH_DB.users.filter(u => u.name.toLowerCase().includes(query.toLowerCase())),
        companies: SEARCH_DB.companies.filter(c => c.name.toLowerCase().includes(query.toLowerCase())),
        jobs: SEARCH_DB.jobs.filter(j => j.title.toLowerCase().includes(query.toLowerCase()))
    };

    const hasResults = filteredResults.users.length > 0 || filteredResults.companies.length > 0 || filteredResults.jobs.length > 0;

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsVisible(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // REDIRECT & HISTORY LOGIC
    const executeSearch = (term: string) => {
        const cleanTerm = term.trim();
        if (!cleanTerm) return;

        // Save to History
        const newHistory = [cleanTerm, ...history.filter(item => item !== cleanTerm)].slice(0, 4);
        setHistory(newHistory);
        localStorage.setItem('noda_search_history', JSON.stringify(newHistory));

        setIsVisible(false);

        // INTELLIGENT REDIRECT:
        // If it matches a specific company exactly, go to company page.
        // Otherwise, go to jobs page with the query.
        const companyMatch = SEARCH_DB.companies.find(c => c.name.toLowerCase() === cleanTerm.toLowerCase());
        
        if (companyMatch) {
            navigate(`/app/companies/${companyMatch.id}`);
        } else {
            navigate(`/app/jobs?q=${encodeURIComponent(cleanTerm)}`);
        }
    };

    const removeHistoryItem = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        const updated = history.filter(i => i !== item);
        setHistory(updated);
        localStorage.setItem('noda_search_history', JSON.stringify(updated));
    };

    return (
        <div ref={containerRef} className="flex-1 max-w-xl relative group z-50">
            <div className="relative flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-orange-500 transition-all">
                <Search className="absolute left-3 w-4 h-4 text-zinc-500 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsVisible(true)}
                    onKeyDown={(e) => e.key === 'Enter' && executeSearch(query)}
                    placeholder="Search nodes, jobs, or companies..."
                    className="w-full bg-transparent border-none rounded-none pl-10 h-8 focus-visible:ring-0 text-xs"
                />
            </div>

            {/* DROPDOWN INTERFACE */}
            {isVisible && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-300 shadow-xl max-h-[450px] overflow-y-auto scrollbar-hide animate-in fade-in slide-in-from-top-1 duration-200">
                    
                    {/* 1. RECENT HISTORY (Only when not typing) */}
                    {query.length === 0 && history.length > 0 && (
                        <div className="p-2">
                            <div className="px-3 py-1.5 text-[8px] font-mono font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-50 mb-1">
                                Recent_Protocols
                            </div>
                            {history.map((item, i) => (
                                <div key={i} className="group/item flex items-center justify-between px-3 py-2 hover:bg-zinc-50 cursor-pointer" onClick={() => executeSearch(item)}>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-3 h-3 text-zinc-300" />
                                        <span className="text-[11px] text-zinc-600 font-bold uppercase tracking-tight">{item}</span>
                                    </div>
                                    <X size={12} className="opacity-0 group-hover/item:opacity-100 text-zinc-500 hover:text-red-500" onClick={(e) => removeHistoryItem(e, item)} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 2. LIVE RESULTS */}
                    {query.length > 0 && (
                        <div className="flex flex-col">
                            {hasResults ? (
                                <>
                                    {filteredResults.users.length > 0 && (
                                        <SearchSection title="User_Nodes">
                                            {filteredResults.users.map(u => <UserResult key={u.id} {...u} onClick={() => navigate(`/app/profile/${u.id}`)} />)}
                                        </SearchSection>
                                    )}
                                    {filteredResults.companies.length > 0 && (
                                        <SearchSection title="Company_Nodes">
                                            {filteredResults.companies.map(c => <CompanyResult key={c.id} {...c} onClick={() => executeSearch(c.name)} />)}
                                        </SearchSection>
                                    )}
                                    {filteredResults.jobs.length > 0 && (
                                        <SearchSection title="Job_Nodes">
                                            {filteredResults.jobs.map(j => <JobResult key={j.id} {...j} onClick={() => executeSearch(j.title)} />)}
                                        </SearchSection>
                                    )}
                                </>
                            ) : (
                                <div className="p-4 text-center" onClick={() => executeSearch(query)}>
                                    <span className="text-[10px] font-mono font-black text-orange-600 uppercase cursor-pointer hover:underline">
                                        Search Jobs for "{query}" →
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- SUB-COMPONENTS ---
const SearchSection = ({ title, children }: any) => (
    <div className="border-b border-zinc-100 last:border-none">
        <div className="px-4 py-1.5 text-[8px] font-mono font-black text-orange-600 uppercase tracking-widest bg-zinc-50/50">{title}</div>
        <div className="flex flex-col">{children}</div>
    </div>
);

const UserResult = ({ name, username, role, onClick }: any) => (
    <div onClick={onClick} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-900 text-white flex items-center justify-center font-mono font-black text-[10px]">{name[0]}</div>
            <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase leading-none">{name}</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1">{username} // {role}</span>
            </div>
        </div>
        <ArrowUpRight size={12} className="text-zinc-200 group-hover:text-zinc-900" />
    </div>
);

const CompanyResult = ({ name, location, nodes, onClick }: any) => (
    <div onClick={onClick} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-zinc-900 flex items-center justify-center font-mono font-black text-[10px]">{name[0]}</div>
            <div className="flex flex-col">
                <span className="text-[11px] font-black uppercase leading-none">{name}</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1">{location} // {nodes}_Nodes</span>
            </div>
        </div>
        <Building2 size={12} className="text-zinc-200" />
    </div>
);

const JobResult = ({ title, onClick }: any) => (
    <div onClick={onClick} className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 cursor-pointer group">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 flex items-center justify-center"><Briefcase size={14} /></div>
            <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase leading-none">{title}</span>
            </div>
        </div>
        <Zap size={12} className="text-orange-600 opacity-40 group-hover:opacity-100" />
    </div>
);

export default SearchBar;