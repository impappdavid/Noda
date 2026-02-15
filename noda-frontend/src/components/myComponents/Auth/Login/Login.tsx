import React, { useState } from 'react';
import { Terminal, Lock, Fingerprint, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";

const LoginPage = () => {
    const [authData, setAuthData] = useState({ node_id: "", access_key: "" });
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsAuthenticating(true);
        setTimeout(() => {
            setIsAuthenticating(false);
        }, 1500);
    };

    return (
        <div className="h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 font-sans text-zinc-900">
            
            {/* 1. SCALED SYSTEM IDENTITY */}
            <div className="mb-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center border border-zinc-700">
                    <Zap size={32} className="text-white fill-white" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-black uppercase tracking-[0.6em] leading-none">Noda_System</h1>
                    <p className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-[0.3em] mt-3">
                        Terminal_Uplink_v.2.5.0 // Secure_Node
                    </p>
                </div>
            </div>

            {/* 2. EXPANDED LOGIN TERMINAL */}
            <div className="w-full max-w-[400px] bg-white border border-zinc-300 flex flex-col overflow-hidden">
                
                {/* WINDOW HEADER */}
                <div className="px-4 h-10 border-b border-zinc-300 bg-zinc-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-mono font-black text-white uppercase tracking-widest">Identification_Required</span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                        <div className="w-2 h-2 rounded-full bg-zinc-600" />
                    </div>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col">
                    
                    {/* NODE ID INPUT BLOCK */}
                    <div className="bg-white px-6 py-5 space-y-2 border-b border-zinc-200">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block leading-none">
                            Node_Identifier
                        </label>
                        <div className="relative flex items-center h-10 border-b border-transparent focus-within:border-zinc-900 transition-colors">
                            <Terminal className="w-4 h-4 text-zinc-400 mr-4 shrink-0" />
                            <input 
                                required
                                type="text"
                                placeholder="ENTER_FOUNDER_HANDLE" 
                                className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-200 tracking-tight" 
                                onChange={(e) => setAuthData({...authData, node_id: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* ACCESS KEY INPUT BLOCK */}
                    <div className="bg-white px-6 py-5 space-y-2 border-b border-zinc-200">
                        <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] block leading-none">
                            Access_Key
                        </label>
                        <div className="relative flex items-center h-10 border-b border-transparent focus-within:border-zinc-900 transition-colors">
                            <Lock className="w-4 h-4 text-zinc-400 mr-4 shrink-0" />
                            <input 
                                required
                                type="password"
                                placeholder="••••••••••••" 
                                className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-200 tracking-[0.4em]" 
                                onChange={(e) => setAuthData({...authData, access_key: e.target.value})}
                            />
                        </div>
                    </div>

                    {/* AUTH EXECUTION */}
                    <button 
                        disabled={isAuthenticating}
                        className={cn(
                            "h-14 flex items-center justify-center gap-4 font-mono font-black text-[11px] uppercase tracking-[0.5em] transition-all cursor-pointer",
                            isAuthenticating 
                                ? "bg-emerald-600 text-white" 
                                : "bg-zinc-900 text-white hover:bg-black disabled:bg-zinc-200"
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
            </div>

            {/* 3. SYSTEM FOOTER */}
            <div className="mt-8 flex flex-col items-center gap-2 opacity-50">
                <div className="flex items-center gap-6">
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-400">
                        Handshake: Diffie_Hellman
                    </span>
                    <span className="text-[8px] font-mono font-black uppercase tracking-widest text-zinc-400">
                        Node: {authData.node_id || "Null"}
                    </span>
                </div>
                <button className="text-[9px] font-mono font-black uppercase tracking-tighter text-zinc-400 hover:text-zinc-900 transition-colors mt-3">
                    Manual_Override // Lost_Access
                </button>
            </div>
        </div>
    );
};

export default LoginPage;