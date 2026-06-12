import React, { useState, useEffect } from "react";
import { ArrowRight, RefreshCw, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TwoFactorInlineProps {
  credentials: any;
  onVerify: (code: string) => void;
  onBackToLogin: () => void;
}

const TwoFactorDialog = ({
  credentials,
  onVerify,
  onBackToLogin,
}: TwoFactorInlineProps) => {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // Automatic error suppression timer configuration
  useEffect(() => {
    if (!isError) return;

    const timeoutHandle = setTimeout(() => {
      setIsError(false);
    }, 3000);

    return () => clearTimeout(timeoutHandle);
  }, [isError]);

  const executeVerification = (verificationCode: string) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onVerify(verificationCode);
      if (verificationCode === "000000") {
        navigate("/app");
      }else{
        setIsError(true)
        setCode("")
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6 || isVerifying) return;
    executeVerification(code);
  };

  return (
    <Dialog open={true}>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-[320px] max-h-[85vh] flex flex-col rounded-none p-0 overflow-hidden bg-white border-none shadow-none gap-0"
      >
        {/* High-Contrast solid blue-500 Header Banner */}
        <DialogHeader className="bg-blue-500  p-2 text-white flex flex-row items-center justify-between space-y-0 shrink-0">
          <div className="flex items-center gap-1.5">
            <img
              src="/noda.png"
              alt=""
              className="w-4.5 h-4.5 shadow-xl shadow-black "
            />
            <DialogTitle className="text-[12px] font-mono font-black uppercase tracking-wider text-white">
              2FA
            </DialogTitle>
          </div>
          {/* Mock Console Windows Elements */}
          <div className="flex gap-1 select-none">
            <div className="w-1.5 h-1.5 bg-white opacity-60 rounded-none" />
            <div className="w-1.5 h-1.5 bg-white opacity-80 rounded-none" />
            <div className="w-1.5 h-1.5 bg-white opacity-100 rounded-none" />
          </div>
        </DialogHeader>

        {/* Hyper-Compact Grid Input Stream */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-mono bg-white text-left w-full"
        >
          {/* Compressed Notification Strip */}
          <div className="bg-white p-1.5 border-b border-zinc-300 flex flex-col gap-0.5">
            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block leading-none">
              Security_03
            </label>
            <span className="text-[10px] font-bold text-zinc-800 uppercase leading-tight">
              Enter Authenticator Token
            </span>
          </div>

          {/* System Error Message Banner Strip */}
          {isError && (
            <div className="bg-red-50 p-1.5 border-b border-red-200 flex flex-col gap-0.5 animate-in fade-in duration-100">
              <label className="text-[9px] font-black text-red-600 uppercase tracking-widest block leading-none">
                Error_Log_03
              </label>
              <span className="text-[10px] font-bold text-red-800 uppercase leading-tight">
                Invalid verification token sequence
              </span>
            </div>
          )}

          {/* Ultra-Low Padding OTP Matrix Container */}
          <div className="flex flex-col items-center justify-center p-3 border-b border-zinc-300 bg-white">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(val) => {
                setCode(val);
                if (isError) setIsError(false); // Clear notification strip on immediate mechanical input alteration
                if (val.length === 6 && !isVerifying) {
                  executeVerification(val);
                }
              }}
            >
              <div className="flex items-center gap-1">
                <InputOTPGroup className="gap-1 ">
                  <InputOTPSlot
                    index={0}
                    className={`w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500  text-zinc-900 transition-colors shadow-none
                    `}
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500 focus:ring-0 text-zinc-900 transition-colors shadow-none"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500 focus:ring-0 text-zinc-900 transition-colors shadow-none"
                  />
                </InputOTPGroup>

                <InputOTPSeparator className="text-zinc-300 font-bold px-0.5 text-[10px]" />

                <InputOTPGroup className="gap-1">
                  <InputOTPSlot
                    index={3}
                    className="w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500 focus:ring-0 text-zinc-900 transition-colors shadow-none"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500 focus:ring-0 text-zinc-900 transition-colors shadow-none"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-9 h-9 text-xs font-mono font-bold rounded-none  bg-white focus:bg-white focus:border-blue-500 focus:ring-0 text-zinc-900 transition-colors shadow-none"
                  />
                </InputOTPGroup>
              </div>
            </InputOTP>
          </div>

          {/* Precision Action Footer Splitter */}
          <div className="grid grid-cols-3 gap-0 w-full h-10">
            <button
              type="button"
              onClick={onBackToLogin}
              className="h-full bg-white hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 border-r border-zinc-300 text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-0.5 cursor-pointer outline-none rounded-none"
            >
              <ChevronLeft size={12} strokeWidth={2.5} />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={isVerifying || code.length < 6}
              className={cn(
                "col-span-2 h-full flex items-center justify-center gap-1.5 text-white font-black text-[10px] uppercase tracking-[0.15em] outline-none cursor-pointer border-none rounded-none transition-all",
                isVerifying
                  ? "bg-blue-500"
                  : "bg-blue-500 hover:bg-blue-600 disabled:bg-zinc-100 disabled:text-zinc-300 disabled:cursor-not-allowed",
              )}
            >
              <span>{isVerifying ? "VERIFYING" : "LOGIN"}</span>
              {isVerifying ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : (
                <ArrowRight size={12} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorDialog;