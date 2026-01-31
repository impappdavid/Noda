import { Globe, ShieldAlert, Users } from "lucide-react"

const CompanyInfo = ({ selectedCompany }: any) => {
    return (
        <>
            <div className="p-6 overflow-y-auto flex-1 scrollbar-hide">
                <div className="flex items-start justify-between mb-8">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold tracking-tight">{selectedCompany.name}</h2>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1 hover:text-zinc-900 cursor-pointer transition-colors">
                                <Globe size={12} /> Website
                            </span>
                            <span className="flex items-center gap-1">
                                <Users size={12} /> {selectedCompany.employees}
                            </span>
                        </div>
                    </div>

                    {/* Minimalist Velocity Signal */}
                    <div className="flex flex-col items-end shrink-0">
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xl font-mono font-bold text-zinc-900 tracking-tighter">
                                {selectedCompany.responseVelocity}
                            </span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Velocity</span>
                    </div>
                </div>

                {/* Intelligence Nodes */}
                <div className="grid grid-cols-2 gap-2 mb-8">
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1 tracking-tight">Network Rating</span>
                        <div className="flex items-baseline gap-1 font-bold">
                            <span className="text-lg">{selectedCompany.rating}</span>
                            <span className="text-[10px] text-zinc-400">/ 5.0</span>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                        <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase block mb-1 tracking-tight">Total Signals</span>
                        <div className="flex items-baseline gap-1 font-bold">
                            <span className="text-lg">{selectedCompany.reviews}</span>
                            <span className="text-[10px] text-zinc-400">Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2">Recent Intelligence</h4>
                    <div className="p-4 rounded-xl border border-zinc-100 bg-white shadow-sm space-y-2 group">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center">
                                    <ShieldAlert size={10} className="text-white" />
                                </div>
                                <span className="text-[10px] font-bold text-zinc-900">@encrypted</span>
                            </div>
                            <span className="text-[9px] text-zinc-400 font-mono">2h ago</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 leading-relaxed font-medium italic group-hover:text-zinc-900 transition-colors">
                            "Internal promotion velocity is high, but technical debt in the legacy cluster is significant."
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CompanyInfo