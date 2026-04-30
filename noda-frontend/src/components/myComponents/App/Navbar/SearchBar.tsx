import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Briefcase, Users, Building2, Hash } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'; // Added Framer Motion

const MOCK_DATA = {
    jobs: ["Frontend Developer", "Product Designer", "React Engineer", "UI Architect"],
    users: ["alex_dev", "sarah_codes", "mike_builds", "tech_lead"],
    companies: ["Google", "Meta", "Stripe", "Vercel"],
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
        return items
            .filter(item => item.toLowerCase().includes(searchValue.toLowerCase()))
            .slice(0, 3);
    };

    const handleNavigation = (category: string, value: string) => {
        setIsPopupOpen(false);
        setSearchValue(value);
        const paths: Record<string, string> = {
            "Jobs": `/app/jobs?role=${value}`,
            "Users": `/app/user?username=${value}`,
            "Companies": `/app/company?company=${value}`,
            "Communities": `/app/community?slug=${value}`
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

    return (
        <div ref={containerRef} className="flex-1 max-w-xl relative z-50">
            {/* Input Bar */}
            <div className={`relative flex items-center bg-zinc-50 border ${isPopupOpen ? 'border-blue-500' : 'border-zinc-300'} transition-all px-2 h-8 gap-2`}>
                <Search className={`w-3.5 h-3.5 ${isPopupOpen ? 'text-zinc-900' : 'text-zinc-400'}`} />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsPopupOpen(true)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent border-none outline-none text-[11px] font-mono placeholder:text-zinc-500 h-full"
                />
                {searchValue && (
                    <button onClick={() => setSearchValue("")} className="hover:text-zinc-900 text-zinc-400 p-1 cursor-pointer">
                        <X size={12} />
                    </button>
                )}
            </div>

            {/* Animated Popup */}
            <AnimatePresence>
                {isPopupOpen && activeCategories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full mt-2 left-0 w-full bg-white border border-blue-500 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-zinc-300">
                            {activeCategories.map((cat) => (
                                <div key={cat.label} className="p-2 space-y-1">
                                    <div className="flex items-center gap-2 text-zinc-500">
                                        <span className="text-[8px] font-bold uppercase tracking-widest">
                                            {cat.label}
                                        </span>
                                    </div>

                                    <div className="flex flex-col">
                                        {cat.data.map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => handleNavigation(cat.label, item)}
                                                className="text-left text-[11px] font-mono font-bold text-zinc-600 hover:text-blue-600 p-0.5 hover:bg-blue-500/20 hover:translate-x-1 cursor-pointer transition-all"
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;