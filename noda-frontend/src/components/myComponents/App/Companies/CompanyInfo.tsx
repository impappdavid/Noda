import { Globe, ShieldAlert, Users, Plus } from "lucide-react"

const CompanyInfo = ({ selectedCompany }: any) => {
    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-zinc-300">
            {/* 1. Header Protocol */}
            <div className="p-4 border-b border-zinc-300 flex items-center justify-between bg-zinc-50/50 h-14 shrink-0">
                <div className="space-y-0.5">
                    <h2 className="text-sm font-black uppercase tracking-tight text-zinc-900">
                        {selectedCompany.name}
                    </h2>
                    <div className="flex items-center gap-3 text-[9px] font-mono font-black uppercase text-zinc-400">
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
                        <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
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
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block mb-1 tracking-widest">Network Rating</span>
                    <div className="flex items-baseline gap-1 font-black">
                        <span className="text-xl text-zinc-900">{selectedCompany.rating}</span>
                        <span className="text-[9px] text-zinc-300">/ 5.0</span>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <span className="text-[8px] font-mono font-black text-zinc-400 uppercase block mb-1 tracking-widest">Total Signals</span>
                    <div className="flex items-baseline gap-1 font-black">
                        <span className="text-xl text-zinc-900">{selectedCompany.reviews}</span>
                        <span className="text-[9px] text-zinc-300 font-mono uppercase">Reviews</span>
                    </div>
                </div>
            </div>

            {/* 3. Recent Intelligence Feed */}
            <div className="flex-1 overflow-y-auto scrollbar-hide border-b border-zinc-300">
                <div className="px-4 py-2 border-b border-zinc-300 bg-zinc-50/50 flex items-center justify-between">
                    <h4 className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-[0.2em]">Recent Intelligence</h4>
                    <span className="text-[8px] font-mono font-black text-zinc-300 uppercase tracking-tighter">Live Feed</span>
                </div>
                
                <div className="divide-y divide-zinc-200">
                    <div className="p-4 bg-white hover:bg-zinc-50 transition-colors cursor-default group">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-zinc-900 flex items-center justify-center">
                                    <ShieldAlert size={8} className="text-white" />
                                </div>
                                <span className="text-[9px] font-mono font-black text-zinc-900 uppercase">@encrypted</span>
                            </div>
                            <span className="text-[8px] text-zinc-300 font-mono font-black uppercase">2h ago</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-normal font-bold uppercase tracking-tight group-hover:text-zinc-900 transition-colors">
                            "Internal promotion velocity is high, but technical debt in the legacy cluster is significant."
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. FULL-WIDTH SQUARED ACTION BUTTON */}
            <button 
                className="w-full h-12 bg-zinc-900 flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-[0.99] shrink-0"
                onClick={() => {/* Trigger Dialog Logic */}}
            >
                <Plus size={16} className="text-white" />
                <span className="text-[10px] font-mono font-black text-white uppercase tracking-[0.2em]">
                    Submit Intel Signal
                </span>
            </button>
        </div>
    )
}

export default CompanyInfo;