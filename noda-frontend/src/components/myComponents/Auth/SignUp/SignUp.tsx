import React, { useState } from 'react';
import { Terminal, Lock, Fingerprint, X, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Link } from 'react-router-dom';

const SignupPage = () => {
    const [signupData, setSignupData] = useState({
        node_id: "",
        email: "",
        access_key: "",
        confirm_key: "",
        terms: false
    });
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsRegistering(true);
        // Simulate System Registration Handshake
        setTimeout(() => setIsRegistering(false), 2000);
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
                            Noda_Registration
                        </span>
                    </div>
                    <Link to="/" className="text-zinc-500 hover:text-white transition-colors">
                        <X size={16} />
                    </Link>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col">

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
                                    placeholder="SELECT_USERNAME"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setSignupData({ ...signupData, node_id: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* EMAIL SECTION */}
                        <div className="group">
                            <label className="text-[10px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                                Verified_Email
                            </label>
                            <div className="flex p-3 items-center border-b border-zinc-300 transition-colors">
                                <Mail className="w-4 h-4 text-zinc-900 mr-3 shrink-0" />
                                <input
                                    required
                                    type="email"
                                    placeholder="UPLINK_ADDRESS@DOMAIN.COM"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* AccessKey */}
                        <div className="group">
                            <label className="text-[10px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                                Access_Key_Initialization
                            </label>
                            <div className="flex p-3 items-center border-b border-zinc-300 transition-colors">
                                <Lock className="w-4 h-4 text-zinc-900 mr-3 shrink-0" />
                                <input
                                    required
                                    type="password"
                                    placeholder="CREATE_PASSWORD"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setSignupData({ ...signupData, access_key: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Confirm AccessKey */}
                        <div className="group">
                            <label className="text-[10px] p-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                                Verify_Access_Key
                            </label>
                            <div className="flex p-3 items-center border-b border-zinc-900 transition-colors">
                                <Lock className="w-4 h-4 text-zinc-900 mr-3 shrink-0" />
                                <input
                                    required
                                    type="password"
                                    placeholder="REPEAT_PASSWORD"
                                    className="w-full text-xs font-bold uppercase outline-none bg-transparent placeholder:text-zinc-400 tracking-tight"
                                    onChange={(e) => setSignupData({ ...signupData, confirm_key: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* 3. CONSENT CONTROLS */}
                        <div className="flex items-center justify-between p-3 bg-white">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="w-3 h-3 accent-zinc-900 cursor-pointer border-zinc-300 rounded-none"
                                    onChange={(e) => setSignupData({ ...signupData, terms: e.target.checked })}
                                />
                                <label htmlFor="terms" className="text-[9px] font-mono font-black text-zinc-900 uppercase tracking-widest cursor-pointer select-none">
                                    Accept_System_Protocols
                                </label>
                            </div>

                            <Link to="/login" className="text-[9px] font-mono font-black text-zinc-500 hover:text-zinc-900 transition-colors uppercase tracking-widest underline underline-offset-2 cursor-pointer">
                                Existing_Node?
                            </Link>
                        </div>
                    </div>

                    {/* 4. EXECUTION BUTTON */}
                    <button
                        disabled={isRegistering}
                        className={cn(
                            "h-12 flex items-center justify-center gap-4 font-mono font-black text-[11px] uppercase tracking-[0.5em] transition-all cursor-pointer border-t border-zinc-900",
                            isRegistering
                                ? "bg-emerald-600 text-white"
                                : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-100"
                        )}
                    >
                        {isRegistering ? "Registering_Node" : "Initialize_Registration"}
                        {isRegistering ? (
                            <Fingerprint size={20} className="animate-pulse" />
                        ) : (
                            <div className=""></div>
                        )}
                    </button>
                </form>

                {/* 5. LEGAL FOOTER */}
                <div className="h-10 bg-zinc-50 flex justify-between items-center border-t border-zinc-900 px-4">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-tighter">
                        v.2.8_Stable
                    </span>
                    <div className="flex gap-4">
                        <Link to={`/privacy_policy`} className="text-[9px] font-mono font-black text-zinc-500 hover:text-zinc-900 hover:underline uppercase tracking-tighter">Privacy_Policy</Link>
                        <Link to={`/terms_of_service`} className="text-[9px] font-mono font-black text-zinc-500 hover:text-zinc-900 hover:underline uppercase tracking-tighter">Terms_of_Service</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;