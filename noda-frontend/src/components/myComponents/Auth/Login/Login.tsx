import React, { useState } from 'react';
import { Terminal, Lock, Fingerprint, X, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

const LoginPage = () => {
    const [authData, setAuthData] = useState({ node_id: "", access_key: "", remember: false });
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);
        setTimeout(() => setIsAuthenticating(false), 1500);
    };

    return (
        <div className="h-screen bg-zinc-50 flex items-center justify-center p-6 font-sans text-zinc-900">

            {/* SQUARE TERMINAL CONTAINER */}
            <div className="w-full max-w-[420px] bg-white shadow-lg shadow-zinc-500/50 flex flex-col overflow-hidden ">

                {/* 1. NODA AUTH HEADER */}
                <div className="px-4 h-12 bg-zinc-800 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-2">
                        <img
                            src="/noda.png"
                            alt="NODA"
                            className="w-5 h-5 object-contain grayscale invert"
                        />
                        <span className="text-[11px] font-mono font-black text-white uppercase tracking-[0.3em]">
                            Noda_Auth
                        </span>
                    </div>
                    <a href="/" className="text-zinc-500 hover:text-white transition-colors">
                        <X size={16} />
                    </a>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col">

                    {/* 2. FORM BODY */}
                    <div className="flex flex-col">

                        {/* NODE ID SECTION */}
                        <div className="group">
                            <label className="text-[10px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                                Node_Identifier
                            </label>
                            <div className="flex p-3 items-center border-b border-zinc-300 transition-colors">
                                <Terminal className="w-4 h-4 text-zinc-900 mr-3 shrink-0" />
                                <input
                                    required
                                    type="text"
                                    placeholder="ENTER_USERNAME"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setAuthData({ ...authData, node_id: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* AccessKey */}
                        <div className="group">
                            <label className="text-[10px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                                Access_Key
                            </label>
                            <div className="flex p-3 items-center border-b border-zinc-300 transition-colors">
                                <Lock className="w-4 h-4 text-zinc-900 mr-3 shrink-0" />
                                <input
                                    required
                                    type="password"
                                    placeholder="ENTER_PASSWORD"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setAuthData({ ...authData, access_key: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* 3. CONSOLIDATED CONTROLS (Single Line) */}
                        <div className="flex items-center justify-between p-3 bg-white border-b border-zinc-900">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    id="remember"
                                    className="w-3 h-3 accent-zinc-900 cursor-pointer border-zinc-300 rounded-none"
                                    onChange={(e) => setAuthData({ ...authData, remember: e.target.checked })}
                                />
                                <label htmlFor="remember" className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-widest cursor-pointer select-none">
                                    Remember_Me
                                </label>
                            </div>
                            
                            <button type="button" className="text-[9px] font-mono font-black text-zinc-500 hover:text-red-600 transition-colors uppercase tracking-widest underline underline-offset-2 cursor-pointer">
                                Forgot_Password?
                            </button>
                        </div>
                    </div>

                    {/* 4. EXECUTION BUTTON */}
                    <button
                        disabled={isAuthenticating}
                        className={cn(
                            "h-12 flex items-center justify-center gap-4 font-mono font-black text-[11px] uppercase tracking-[0.5em] transition-all cursor-pointer border-t border-zinc-900",
                            isAuthenticating
                                ? "bg-emerald-600 text-white"
                                : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-100"
                        )}
                    >
                        {isAuthenticating ? "Synchronizing" : "Initialize_Entry"}
                        {isAuthenticating ? (
                            <Fingerprint size={20} className="animate-pulse" />
                        ) : (
                            <ArrowRight size={18} />
                        )}
                    </button>
                </form>

                {/* 5. LEGAL FOOTER */}
                <div className="h-10 bg-zinc-50 flex justify-between items-center border-t border-zinc-900 px-4">
                    <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-tighter">
                        v.2.8_Stable
                    </span>
                    <div className="flex gap-4">
                        <a href="#" className="text-[8px] font-mono font-black text-zinc-500 hover:text-zinc-900 hover:underline uppercase tracking-tighter">Privacy_Policy</a>
                        <a href="#" className="text-[8px] font-mono font-black text-zinc-500 hover:text-zinc-900 hover:underline uppercase tracking-tighter">Terms_of_Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;