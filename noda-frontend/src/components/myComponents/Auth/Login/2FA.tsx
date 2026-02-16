import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom'; // For redirection
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

const TwoFactorDialog = ({ isOpen, onVerify }: { isOpen: boolean, onVerify: (code: string) => void }) => {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6) return;
        setIsVerifying(true);

        // Simulate Auth Handshake
        setTimeout(() => {
            setIsVerifying(false);
            onVerify(code);
            // Redirect to /app upon successful verification simulation
            navigate('/app');
        }, 1500);
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent
                className="sm:max-w-[420px] p-0 rounded-none border-none bg-white shadow-none overflow-hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                {/* 1. NODA AUTH HEADER */}
                <DialogHeader className="px-4 h-12 bg-zinc-800 flex flex-row items-center justify-between shrink-0 space-y-0 border-b border-zinc-900">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <DialogTitle className="text-[11px] font-mono font-black text-white uppercase tracking-[0.3em]">
                            Auth_Verification
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col">
                    {/* 2. SQUARED LABEL */}
                    <label className="text-[10px] px-3 pb-3 border-b border-zinc-300 font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none bg-zinc-50/30">
                        Identity_Token_Injection
                    </label>

                    {/* 3. SCALED OTP INPUTS */}
                    <div className="p-8 flex flex-col items-center border-b border-zinc-300 bg-white">
                        <InputOTP 
                            maxLength={6} 
                            value={code} 
                            onChange={(val) => setCode(val)}
                        >
                            <div className="flex items-center gap-4">
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                    <InputOTPSlot index={1} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                    <InputOTPSlot index={2} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                </InputOTPGroup>
                                
                                <InputOTPSeparator className="text-zinc-400 font-bold" />
                                
                                <InputOTPGroup >
                                    <InputOTPSlot index={3} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                    <InputOTPSlot index={4} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                    <InputOTPSlot index={5} className="w-10 h-10 text-xl font-bold rounded-none border-zinc-300 focus:border-zinc-900" />
                                </InputOTPGroup>
                            </div>
                        </InputOTP>
                        
                        <p className="mt-4 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em] text-center">
                            Awaiting_User_Input // 6_Digit_Code
                        </p>
                    </div>

                    {/* 4. EXECUTION BUTTON */}
                    <button
                        type="submit"
                        disabled={isVerifying || code.length < 6}
                        className={cn(
                            "h-12 flex items-center justify-center gap-4 font-mono font-black text-[11px] uppercase tracking-[0.5em] transition-all cursor-pointer",
                            isVerifying ? "bg-emerald-600 text-white" : "bg-zinc-800 text-white hover:bg-zinc-900 disabled:bg-zinc-400 disabled:text-zinc-300"
                        )}
                    >
                        {isVerifying ? "Verifying_Signal" : "Execute_Uplink"}
                        {isVerifying ? <RefreshCw size={18} className="animate-spin" /> : <ArrowRight size={20} />}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorDialog;