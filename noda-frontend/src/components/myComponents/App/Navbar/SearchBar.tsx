import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Listen to URL changes
    const containerRef = useRef<HTMLDivElement>(null);

    // Input Refs
    const roleInputRef = useRef<HTMLInputElement>(null);
    const locInputRef = useRef<HTMLInputElement>(null);
    const mainInputRef = useRef<HTMLInputElement>(null);

    // Command Logic States
    const [activeCommand, setActiveCommand] = useState<string | null>(null);
    const [roleValue, setRoleValue] = useState("");
    const [locValue, setLocValue] = useState("");
    const [activeParam, setActiveParam] = useState<"role" | "loc">("role");

    // 1. SYNC WITH URL: This shows the search info IN the searchbar when the page loads
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get("role");
        const loc = params.get("location");

        if (location.pathname.includes("/jobs") && (role || loc)) {
            setActiveCommand("/job");
            setRoleValue(role || "");
            setLocValue(loc || "");
            // Keep focus in the last empty box or role by default
            setActiveParam(role && !loc ? "loc" : "role");
        }
    }, [location]);

    // 2. FORCED FOCUS PROTOCOL
    useEffect(() => {
        if (activeCommand) {
            if (activeParam === "role") {
                roleInputRef.current?.focus();
            } else {
                locInputRef.current?.focus();
            }
        }
    }, [activeCommand, activeParam]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (!activeCommand) {
            const cmd = ["/user", "/job", "/company", "/community"].find(c => val.toLowerCase().startsWith(c));
            if (cmd) {
                setActiveCommand(cmd);
                setRoleValue("");
                setActiveParam("role");
            } else {
                setRoleValue(val);
            }
            return;
        }

        if (activeParam === "role") setRoleValue(val);
        else setLocValue(val);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Tab' && activeCommand === "/job") {
            e.preventDefault();
            setActiveParam(prev => prev === "role" ? "loc" : "role");
        }

        if (e.key === 'Backspace') {
            if (activeCommand === "/job" && activeParam === "loc" && !locValue) {
                setActiveParam("role");
                e.preventDefault();
            } else if (!roleValue && activeCommand && activeParam === "role") {
                setActiveCommand(null);
                setRoleValue("");
                e.preventDefault();
                setTimeout(() => mainInputRef.current?.focus(), 0);
            }
        }

        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const executeSearch = () => {
        if (!roleValue && !activeCommand) return;

        let path = "search";
        const params = new URLSearchParams();

        if (activeCommand === "/job") {
            path = "jobs";
            if (roleValue) params.append("role", roleValue);
            if (locValue) params.append("location", locValue);
        } else if (activeCommand === "/user") {
            path = "users";
            params.append("username", roleValue);
        } else if (activeCommand === "/company"){
            path = "companies";
            params.append("company", roleValue);
        }

        navigate(`/app/${path}?${params.toString()}`);

        // We don't reset here anymore because the useEffect handles the state 
        // based on the URL we just navigated to.
    };

    const clearAll = () => {
        setActiveCommand(null);
        setRoleValue("");
        setLocValue("");
        setActiveParam("role");
        navigate(location.pathname); // Clear URL params
    };

    return (
        <div ref={containerRef} className="flex-1 max-w-xl relative group z-50">
            <div className="relative flex items-center bg-zinc-50 border border-zinc-200 focus-within:border-orange-500 transition-all px-2 h-8 gap-2 overflow-hidden shadow-sm">

                {!activeCommand && <Search className="w-3.5 h-3.5 text-zinc-400 ml-1" />}

                {/* STYLED COMMAND NODE */}
                {activeCommand && (

                    <span className="text-xs font-mono font-black text-zinc-900 shrink-0">

                        {activeCommand}

                    </span>

                )}

                {/* DUAL PARAMETER INTERFACE (/job) */}
                {activeCommand === "/job" ? (
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center border border-zinc-400 bg-zinc-200/60 px-1.5 h-[24px] gap-1.5">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter border-r border-zinc-300 pr-1.5 h-full flex items-center">role</span>
                            <input
                                ref={roleInputRef}
                                value={roleValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-[10px] font-mono font-bold uppercase w-fit min-w-[40px]"
                                style={{ width: `${Math.max(roleValue.length * 7, 40)}px` }}
                            />
                        </div>

                        <div className="flex items-center border border-zinc-400 bg-zinc-200/60 px-1.5 h-[24px] gap-1.5">
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter border-r border-zinc-300 pr-1.5 h-full flex items-center">location</span>
                            <input
                                ref={locInputRef}
                                value={locValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                className="bg-transparent border-none outline-none text-[10px] font-mono font-bold uppercase w-fit min-w-[40px]"
                                style={{ width: `${Math.max(locValue.length * 7, 60)}px` }}
                            />
                        </div>
                    </div>
                ) : activeCommand ? (
                    <div className="flex items-center bg-zinc-200/60 border border-zinc-400 px-1.5 h-[24px] gap-1.5">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter border-r border-zinc-300 pr-1.5 h-full flex items-center uppercase">query</span>
                        <input
                            ref={roleInputRef}
                            value={roleValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-[10px] font-mono font-bold uppercase w-fit min-w-[40px]"
                            style={{ width: `${Math.max(roleValue.length * 8, 40)}px` }}
                        />
                    </div>
                ) : (
                    <input
                        ref={mainInputRef}
                        value={roleValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="/user, /job, /company, /community..."
                        className="flex-1 bg-transparent border-none outline-none text-xs font-mono font-bold uppercase placeholder:text-zinc-300 h-full"
                    />
                )}

                {(roleValue || activeCommand) && (
                    <button onClick={clearAll} className="hover:text-red-500 text-zinc-400 ml-auto shrink-0 transition-colors cursor-pointer p-1">
                        <X size={12} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;