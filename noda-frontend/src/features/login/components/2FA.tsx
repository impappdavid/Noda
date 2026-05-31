import React, { useState } from 'react';
import { ArrowRight, RefreshCw, ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";

interface TwoFactorInlineProps {
    credentials: any;
    onVerify: (code: string) => void;
    onBackToLogin: () => void;
}

const TwoFactorFormInline = ({ credentials, onVerify, onBackToLogin }: TwoFactorInlineProps) => {
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const navigate = useNavigate();

    const executeVerification = (verificationCode: string) => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            onVerify(verificationCode);
            navigate('/app');
        }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6 || isVerifying) return;
        executeVerification(code);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col border-x border-b border-zinc-300 bg-white font-mono"
        >
            {/* Instruction Cell */}
            <div className="bg-white p-3 border-b border-zinc-300 flex flex-col gap-1">
                <label className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-widest block leading-none">
                    Identity_Token
                </label>
                <span className="text-[11px] font-bold text-zinc-900 uppercase mt-1">
                    Check Authenticator App
                </span>
            </div>

            {/* OTP Grid Segment */}
            <div className="flex flex-col items-center justify-center py-6 px-2 border-b border-zinc-300 bg-white">
                <InputOTP
                    maxLength={6}
                    value={code}
                    onChange={(val) => {
                        setCode(val);
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

            {/* Twin Execution Grid */}
            <div className="grid grid-cols-3 gap-0 bg-white">
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="h-12 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 border-r border-zinc-300 text-[9px] font-mono font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer outline-none"
                >
                    <ChevronLeft size={12} />
                    <span>Back</span>
                </button>

                <button
                    type="submit"
                    disabled={isVerifying || code.length < 6}
                    className={cn(
                        "col-span-2 h-12 flex items-center justify-center gap-2 text-white transition-colors font-mono text-[10px] font-black uppercase tracking-[0.2em] outline-none cursor-pointer border-none",
                        isVerifying ? "bg-blue-500" : "bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed"
                    )}
                >
                    <span>{isVerifying ? "Verifying..." : "Check"}</span>
                    {isVerifying ? <RefreshCw size={12} className="animate-spin" /> : <ArrowRight size={12} />}
                </button>
            </div>
        </form>
    );
};

export default TwoFactorFormInline;