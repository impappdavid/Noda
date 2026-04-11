import React, { useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

const TwoFactorDialog = ({ isOpen, onVerify }: { isOpen: boolean, onVerify: (code: string) => void }) => {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();

    // Extracted verification logic so it can be called manually or automatically
    const executeVerification = (verificationCode: string) => {
        setIsVerifying(true);
        
        // Simulate Auth Handshake
        setTimeout(() => {
            setIsVerifying(false);
            onVerify(verificationCode);
            // Redirect to /app upon successful verification simulation
            navigate('/app');
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6 || isVerifying) return;
        executeVerification(code);
    };

    return (
        <Dialog open={isOpen}>
            <DialogContent
                // Extremely compact max-width to fix the "too much width" issue
                className="sm:max-w-[320px] w-fit p-0 rounded-none border-none bg-transparent shadow-none overflow-hidden"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <div className="w-full flex flex-col font-sans bg-white ">
                    
                    {/* Header */}
                    <div className="p-2 border-b border-zinc-300 bg-white flex flex-row items-center justify-between shrink-0 m-0">
                        <div className="flex items-center gap-2">
                            <img src="/noda.png" alt="logo.png" className="w-4 h-4" />
                            <DialogTitle className="text-[10px] font-mono font-black text-zinc-900 uppercase leading-none mt-0.5">
                                2FA_Verify
                            </DialogTitle>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-blue-400" />
                            <div className="w-1.5 h-1.5 bg-blue-500" />
                            <div className="w-1.5 h-1.5 bg-blue-600 animate-pulse" />
                        </div>
                    </div>

                    {/* Continuous Data Grid Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-[1px]"
                    >
                        {/* Cell 1: Instruction Label */}
                        <div className="bg-white p-2 focus-within:bg-zinc-50 transition-colors flex flex-col gap-1">
                            <label className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest block leading-none">
                                Identity_Token
                            </label>
                            <span className="text-[10px] font-bold text-zinc-900 uppercase">
                                Check Authenticator App
                            </span>
                        </div>

                        {/* Cell 2: Tighter OTP Inputs */}
                        <div className="bg-white flex px-2 flex-col items-center">
                            <InputOTP
                                maxLength={6}
                                value={code}
                                onChange={(val) => {
                                    setCode(val);
                                    // AUTOMATIC SUBMIT TRIGGER
                                    if (val.length === 6 && !isVerifying) {
                                        executeVerification(val);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-1.5">
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                        <InputOTPSlot index={1} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                        <InputOTPSlot index={2} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                    </InputOTPGroup>

                                    <InputOTPSeparator className="text-zinc-300 font-bold px-0.5" />

                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                        <InputOTPSlot index={4} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                        <InputOTPSlot index={5} className="w-10 h-10 text-lg font-mono font-black rounded-none border-zinc-300 bg-zinc-50 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-none" />
                                    </InputOTPGroup>
                                </div>
                            </InputOTP>

                            
                        </div>

                        {/* Cell 3: Execution Button */}
                        <div className="bg-white">
                            <button
                                type="submit"
                                disabled={isVerifying || code.length < 6}
                                className={cn(
                                    "w-full h-10 flex items-center justify-center gap-2 text-white transition-colors font-mono text-[9px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer",
                                    isVerifying ? "bg-blue-500 text-white" : "bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed"
                                )}
                            >
                                {isVerifying ? "Verifying..." : "Check"}
                                {isVerifying ? <RefreshCw size={12} className="animate-spin" /> : <ArrowRight size={12} />}
                            </button>
                        </div>
                    </form>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorDialog;