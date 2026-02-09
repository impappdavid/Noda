import { useState, useEffect, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Search, Clock, X } from "lucide-react"

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // 1. Initialize state directly to avoid useEffect cascading renders
    const [history, setHistory] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('noda_search_history');
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const containerRef = useRef<HTMLDivElement>(null);

    // 2. Optimized Effect for Event Listeners only
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Type narrowing for the event target
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 3. Typed Event Handlers
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim() !== "") {
            const searchTerm = query.trim();
            const newHistory = [
                searchTerm,
                ...history.filter(item => item !== searchTerm)
            ].slice(0, 4);

            setHistory(newHistory);
            localStorage.setItem('noda_search_history', JSON.stringify(newHistory));
            setIsVisible(false);
        }
    };

    const removeHistoryItem = (itemToRemove: string) => {
        const updated = history.filter(item => item !== itemToRemove);
        setHistory(updated);
        localStorage.setItem('noda_search_history', JSON.stringify(updated));
    };
    return (
        <div ref={containerRef} className="flex-1 max-w-xl relative group z-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors z-20 pointer-events-none" />

            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsVisible(true)}
                onKeyDown={handleSearch}
                placeholder="Search nodes, jobs, or intelligence..."
                className="w-full bg-zinc-50 border-zinc-200 rounded-none pl-10 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all relative z-10"
            />

            {/* 3. History Dropdown */}
            {isVisible && history.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-none shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2">
                        <div className="px-3 py-2 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                            Recent Protocols
                        </div>
                        <div className="flex flex-col gap-1">
                            {history.map((item, i) => (
                                <div
                                    key={i}
                                    className="group/item flex items-center justify-between px-3 py-2 rounded-none hover:bg-zinc-200/60 cursor-pointer transition-colors"
                                >
                                    <div
                                        className="flex items-center gap-3 flex-1"
                                        onClick={() => {
                                            setQuery(item);
                                            setIsVisible(false);
                                        }}
                                    >
                                        <Clock className="w-3 h-3 text-zinc-400" />
                                        <span className="text-xs text-zinc-600 font-medium">{item}</span>
                                    </div>
                                    <button
                                        onClick={() => removeHistoryItem(item)}
                                        className="opacity-0 group-hover/item:opacity-100 p-1 text-zinc-500 hover:text-red-500 hover:bg-zinc-200 transition-all cursor-pointer"
                                    >
                                        <X className="w-3 h-3 " />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default SearchBar