import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Briefcase, Users, Building2, Hash, ArrowRight, Search as SearchIcon } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_DATA = {
    jobs: ["Frontend Developer", "Product Designer", "React Engineer", "UI Architect"],
    users: ["alex_dev", "sarah_codes", "mike_builds", "tech_lead"],
    companies: ["Google", "Meta", "Stripe", "Vercel", "Apple", "Amazon"],
    communities: ["reactjs", "typescript_help", "rust_lang", "career_growth"]
};

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsPopupOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getResults = (category: keyof typeof MOCK_DATA) => {
        const items = MOCK_DATA[category];
        if (!searchValue) return items.slice(0, 3);
        return items.filter(item => item.toLowerCase().startsWith(searchValue.toLowerCase())).slice(0, 3);
    };

    const handleNavigation = (category: string, value: string, isDirect: boolean) => {
        setIsPopupOpen(false);
        const paths: Record<string, string> = {
            "Jobs": `/app/jobs?role=${value}`,
            "Users": isDirect ? `/app/user/${value.toLowerCase()}` : `/app/user?username=${value}`,
            "Companies": isDirect ? `/app/company/${value.toLowerCase()}` : `/app/company?company=${value}`,
            "Communities": isDirect ? `/app/community/${value.toLowerCase()}` : `/app/community?slug=${value}`
        };
        navigate(paths[category] || `/app/search?q=${value}`);
    };

    const allCategories = [
        { label: "Jobs", icon: <Briefcase size={10} />, data: getResults('jobs') },
        { label: "Users", icon: <Users size={10} />, data: getResults('users') },
        { label: "Companies", icon: <Building2 size={10} />, data: getResults('companies') },
        { label: "Communities", icon: <Hash size={10} />, data: getResults('communities') },
    ];

    const activeCategories = allCategories.filter(cat => cat.data.length > 0);
    const hasAnyResults = activeCategories.length > 0;

    return (
        <div ref={containerRef} className="flex-1 max-w-xl relative z-50">
            {/* Input Bar */}
            <div className={`relative flex items-center bg-zinc-50 border ${isPopupOpen ? 'border-blue-500' : 'border-zinc-300'} transition-all px-2 h-7 gap-1.5`}>
                <Search className={`w-3 h-3 ${isPopupOpen ? 'text-zinc-900' : 'text-zinc-400'}`} />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsPopupOpen(true)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent border-none outline-none text-[10px] font-mono placeholder:text-zinc-400 h-full uppercase font-bold"
                />
                {searchValue && (
                    <button onClick={() => setSearchValue("")} className="hover:text-zinc-900 text-zinc-400 p-0.5 cursor-pointer">
                        <X size={10} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isPopupOpen && searchValue && (
                    <motion.div
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -2 }}
                        className="absolute top-full mt-1 left-0 w-full bg-white border border-blue-500 overflow-hidden"
                    >
                        {!hasAnyResults ? (
                            /* FALLBACK SEARCH OPTIONS */
                            <div className="p-1.5 grid grid-cols-2 gap-1 bg-zinc-50">
                                {allCategories.map(cat => (
                                    <button 
                                        key={cat.label}
                                        onClick={() => handleNavigation(cat.label, searchValue, false)}
                                        className="flex items-center justify-between p-1.5 border border-zinc-200 bg-white hover:border-blue-500 transition-all group"
                                    >
                                        <span className="text-[9px] font-bold font-mono uppercase text-zinc-600">{cat.label}</span>
                                        <span className="text-[6px] font-black bg-zinc-100 px-1 py-0.5 text-zinc-400 group-hover:text-blue-600">SEARCH</span>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            /* 2-COL GRID RESULTS */
                            <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-zinc-200">
                                {activeCategories.map((cat) => (
                                    <div key={cat.label} className={`p-1.5 border-b border-zinc-100 last:border-b-0 ${activeCategories.length === 1 ? 'sm:col-span-2' : ''}`}>
                                        <div className="flex items-center gap-1.5 px-1 mb-1">
                                            <span className="text-[7px] font-black uppercase text-zinc-400 tracking-widest">{cat.label}</span>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            {cat.data.map((item, idx) => {
                                                // Predict direct link for the FIRST result in a category
                                                const isDirectMatch = idx === 0 && cat.label !== "Jobs";
                                                
                                                let tagLabel = "SEARCH";
                                                if (isDirectMatch) {
                                                    if (cat.label === "Users") tagLabel = "USER";
                                                    if (cat.label === "Companies") tagLabel = "COMPANY";
                                                    if (cat.label === "Communities") tagLabel = "COMMUNITY";
                                                }

                                                return (
                                                    <button
                                                        key={item}
                                                        onClick={() => handleNavigation(cat.label, item, isDirectMatch)}
                                                        className={`group w-full flex items-center justify-between p-1.5 cursor-pointer border transition-all
                                                            ${isDirectMatch 
                                                                ? 'bg-blue-600 border-blue-600 text-white' 
                                                                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-blue-300 hover:bg-white'}
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-1.5 min-w-0">
                                                            {isDirectMatch && (
                                                                <div className="w-3.5 h-3.5 bg-white flex items-center justify-center shrink-0 border border-blue-400">
                                                                    <span className="text-[8px] text-blue-600 font-black">{item[0]}</span>
                                                                </div>
                                                            )}
                                                            <span className="text-[10px] font-mono font-bold uppercase truncate">{item}</span>
                                                        </div>

                                                        <span className={`text-[6px] font-black tracking-widest px-1 py-0.5 border shrink-0
                                                            ${isDirectMatch ? 'border-white/40 bg-white/10 text-white' : 'border-zinc-300 bg-zinc-100 text-zinc-400'}
                                                        `}>
                                                            {tagLabel}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;