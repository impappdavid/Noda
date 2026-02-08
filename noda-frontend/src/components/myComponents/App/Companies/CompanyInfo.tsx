import { useState } from "react"
import { Globe, ShieldAlert, Users, Plus, Star, X, EyeOff, Eye, Send } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

const cn = (...classes: (string | boolean | undefined | null)[]): string =>
    classes.filter(Boolean).join(" ");

const CompanyInfo = ({ selectedCompany }: any) => {
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(true);

    const handleSubmitFeedback = () => {
        // Logic to transmit signal
        console.log({ rating, comment, isAnonymous });
        setIsFeedbackOpen(false);
        setRating(0);
        setComment("");
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-zinc-300 pt-1">
            {/* 1. Header Protocol */}
            <div className="p-3 border-b border-zinc-300 flex items-center justify-between bg-zinc-50/50 h-14 shrink-0">
                <div className="space-y-0.5">
                    <h2 className="text-sm font-bold uppercase tracking-tight text-zinc-900">
                        {selectedCompany.name}
                    </h2>
                    <div className="flex items-center gap-3 text-[9px] font-mono font-black uppercase text-zinc-500">
                        <span className="flex items-center gap-1 hover:text-zinc-900 cursor-pointer transition-colors">
                            <Globe size={10} /> WEB.NODE
                        </span>
                        <span className="flex items-center gap-1">
                            <Users size={10} /> {selectedCompany.employees}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-emerald-600 animate-pulse" />
                        <span className="text-base font-mono font-black text-zinc-900 tracking-tighter leading-none">
                            {selectedCompany.responseVelocity}
                        </span>
                    </div>
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest mt-0.5">Velocity</span>
                </div>
            </div>

            {/* 2. Intelligence Schematic Grid */}
            <div className="grid grid-cols-2 divide-x divide-zinc-300 border-b border-zinc-300 shrink-0">
                <div className="p-4 bg-white">
                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase block mb-1 tracking-widest">Network Rating</span>
                    <div className="flex items-baseline gap-1 font-black">
                        <span className="text-xl text-zinc-900">{selectedCompany.rating}</span>
                        <span className="text-[9px] text-zinc-400">/ 5.0</span>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <span className="text-[8px] font-mono font-black text-zinc-500 uppercase block mb-1 tracking-widest">Total Signals</span>
                    <div className="flex items-baseline gap-1 font-black">
                        <span className="text-xl text-zinc-900">{selectedCompany.reviews}</span>
                        <span className="text-[9px] text-zinc-400 font-mono uppercase">Reviews</span>
                    </div>
                </div>
            </div>

            {/* 3. Recent Intelligence Feed */}
            <div className="flex-1 overflow-y-auto scrollbar-hide border-b border-zinc-300">
                <div className="px-4 py-2 border-b border-zinc-300 bg-zinc-50/50 flex items-center justify-between">
                    <h4 className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">Recent Intelligence</h4>
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-tighter">Live Feed</span>
                </div>
                
                <div className="divide-y divide-zinc-300">
                    <div className="p-3 bg-white hover:bg-zinc-50 transition-colors cursor-default group border-b border-zinc-300">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-sm bg-zinc-900 flex items-center justify-center">
                                    <ShieldAlert size={10} className="text-white" />
                                </div>
                                <span className="text-[10px] font-mono font-black text-zinc-900 uppercase">@encrypted</span>
                            </div>
                            <span className="text-[8px] text-zinc-500 font-mono font-black uppercase">2h ago</span>
                        </div>
                        <p className="text-[10px] text-zinc-600 leading-normal font-bold tracking-tight group-hover:text-zinc-900 transition-colors">
                            "Internal promotion velocity is high, but technical debt in the legacy cluster is significant."
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. FEEDBACK DIALOG INTEGRATION */}
            <Dialog open={isFeedbackOpen} onOpenChange={setIsFeedbackOpen}>
                <DialogTrigger asChild>
                    <button className="w-full h-12 bg-zinc-800 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.99] shrink-0 cursor-pointer">
                        <Plus size={16} className="text-white" />
                        <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">
                            Submit Intel Signal
                        </span>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white border border-none rounded-none p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="p-4 bg-zinc-800 text-white flex flex-row items-center justify-between space-y-0">
                        <DialogTitle className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                            Initialize_Feedback_Protocol
                        </DialogTitle>
                    </DialogHeader>

                    <div className="p-4 space-y-4">
                        {/* Rating Logic */}
                        <div>
                            <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 mb-3 block">Signal_Strength (Rating)</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="transition-transform active:scale-90 cursor-pointer"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <Star
                                            size={24}
                                            className={cn(
                                                "transition-colors",
                                                (hover || rating) >= star 
                                                    ? "fill-orange-500 text-orange-500" 
                                                    : "text-zinc-500"
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Comment Input */}
                        <div>
                            <label className="text-[10px] font-mono font-black uppercase text-zinc-500 mb-2 block">Intelligence_Report (Comment)</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe internal node conditions..."
                                className="w-full h-24 p-3 bg-zinc-50 border border-zinc-300 text-xs font-mono outline-none resize-none placeholder:text-zinc-400"
                            />
                        </div>

                        {/* Privacy Protocol */}
                        <div className="flex items-center justify-between p-2">
                            <div className="flex items-center gap-3">
                                {isAnonymous ? <EyeOff size={18} className="text-orange-600" /> : <Eye size={18} className="text-zinc-500" />}
                                <div>
                                    <p className="text-[11px] font-mono font-black uppercase text-zinc-900">Anonymous_Protocol</p>
                                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Hide source node identity</p>
                                </div>
                            </div>
                            <Switch 
                                checked={isAnonymous} 
                                onCheckedChange={setIsAnonymous} 
                                className="scale-75"
                            />
                        </div>

                        {/* Submission */}
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setIsFeedbackOpen(false)}
                                className="flex-1 h-10 border border-zinc-300 text-[11px] font-mono font-black uppercase hover:bg-zinc-300/80 transition-colors cursor-pointer"
                            >
                                Abort
                            </button>
                            <button 
                                onClick={handleSubmitFeedback}
                                disabled={!rating || comment.length < 5}
                                className="flex-[2] h-10 bg-zinc-800 text-white text-[11px] font-mono font-black uppercase hover:bg-zinc-900 disabled:bg-zinc-200 disabled:text-zinc-500 transition-all flex items-center cursor-pointer justify-center gap-2"
                            >
                                <Send size={12} />
                                Transmit_Signal
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CompanyInfo;