import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Waitlist = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 bg-white">
            {/* Relative wrapper to anchor the X button. 
               max-w-md keeps it tight like the rest of your UI.
            */}
            <div className="relative max-w-md w-full space-y-4">
                
                {/* 1. The "Back" Exit Button - Now positioned relative to this div */}
                <button
                    onClick={() => navigate('/')}
                    className="absolute -top-12 right-0 p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 cursor-pointer transition-all group"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* 2. Brand Identity */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-2xl font-semibold tracking-tighter font-kodemono">/NODA</div>
                    <div className="space-y-1">
                        <h1 className="text-lg font-semibold tracking-tight text-zinc-900">Join the Protocol.</h1>
                        <p className="text-xs text-zinc-500">Secure your position in the Noda intelligence layer.</p>
                    </div>
                </div>

                {/* 3. The Form Card */}
                <div className="border border-zinc-100 p-4 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />

                    <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest ml-1">
                                Professional Email
                            </label>
                            <Input
                                type="email"
                                placeholder="your@node.ai"
                                className="rounded-xl border-zinc-200 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all h-12"
                            />
                        </div>

                        <Button className="w-full h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold group">
                            Enter Waitlist
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-4 py-2 border-t border-zinc-50">
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3 h-3 text-orange-500" />
                            <span className="text-[11px] font-medium text-zinc-400">Encrypted</span>
                        </div>
                        <div className="w-1 h-1 bg-zinc-200 rounded-full" />
                        <span className="text-[11px] font-medium text-zinc-400">Zero-Spam Policy</span>
                    </div>
                </div>

                {/* 4. Social Status */}
                <div className="flex flex-col items-center gap-2 pt-2">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-zinc-100 flex items-center justify-center">
                                <div className="w-5 h-5 bg-zinc-300 rounded-full" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-tighter">
                        <span className="text-zinc-900 font-bold">+1,240</span> nodes standing by
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Waitlist;