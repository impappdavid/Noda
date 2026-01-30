import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Bell, MessageSquare, Search, User,
    Settings,
    LogOut,
    ShieldCheck,
    CreditCard, Clock, X
} from "lucide-react"
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-zinc-300 bg-white/80  backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-2 flex items-center justify-between ">

                    {/* Logo */}
                    <div className="text-xl font-bold tracking-tighter font-kodemono shrink-0">/NODA</div>

                    {/* Search Bar */}
                    <SearchBar />

                    {/* Icons */}
                    <div className="flex items-center gap-1 shrink-0 ">
                        <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors relative cursor-pointer">
                            <MessageSquare className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                        </button>
                        <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                            <Bell className="w-4 h-4" />
                        </button>

                        <UserDropDown />

                    </div>
                </div>
            </header>
        </>
    )
}

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
                className="w-full bg-zinc-50 border-zinc-200 rounded-xl pl-10 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all relative z-10"
            />

            {/* 3. History Dropdown */}
            {isVisible && history.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2">
                        <div className="px-3 py-2 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                            Recent Protocols
                        </div>
                        <div className="flex flex-col gap-1">
                            {history.map((item, i) => (
                                <div
                                    key={i}
                                    className="group/item flex items-center justify-between px-3 py-2 rounded-xl hover:bg-zinc-50 cursor-pointer transition-colors"
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
                                        className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-zinc-200 rounded-md transition-all"
                                    >
                                        <X className="w-3 h-3 text-zinc-400" />
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


const UserDropDown = () => {
    return (
        <>
            <DropdownMenu>
                {/* 1. Trigger using your custom SVG styled container */}
                <DropdownMenuTrigger asChild>
                    <div className="w-8 h-8 rounded-lg bg-zinc-50 flex justify-center items-center border border-zinc-200 ml-2 cursor-pointer hover:bg-zinc-100 hover:border-zinc-300 transition-all shadow-sm group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-zinc-400 group-hover:fill-zinc-900 transition-colors">
                            <circle cx="12" cy="6" r="4" />
                            <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
                        </svg>
                    </div>
                </DropdownMenuTrigger>

                {/* 2. Menu Content styled for Noda */}
                <DropdownMenuContent className="w-42 mt-2 rounded-2xl border-zinc-200 p-2 " align="end" forceMount>
                    <DropdownMenuLabel className="font-normal px-2 py-2">
                        <div className="flex flex-col ">
                            <p className="text-xs font-bold leading-none text-zinc-900">Alex Rivers</p>
                            <p className="text-xs font-mono leading-none text-zinc-400 uppercase tracking-tighter mt-1">
                                Node: 0x82f...a1c
                            </p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator className="bg-zinc-200" />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-100 focus:text-zinc-900 cursor-pointer">
                            <User className=" h-4 w-4 text-zinc-400" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                            <Settings className=" h-4 w-4 text-zinc-400" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                            <CreditCard className=" h-4 w-4 text-zinc-400" />
                            <span>Billing Tiers</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-zinc-50" />

                    <DropdownMenuGroup className="space-y-1 py-1">
                        <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                            <ShieldCheck className=" h-4 w-4 text-orange-500" />
                            <span>Verification</span>
                            <DropdownMenuShortcut className="text-[9px] font-mono">BETA</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-zinc-50" />

                    <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer mt-1">
                        <LogOut className=" h-4 w-4" />
                        <span>Logout</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default Navbar