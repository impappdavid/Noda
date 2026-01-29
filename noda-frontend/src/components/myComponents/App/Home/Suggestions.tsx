import { TrendingUp} from "lucide-react"

const Suggestions = () => {
    return (
        <>
            {/* 4. RIGHT COLUMN */}
            <aside className="hidden xl:block">
                <div className="sticky top-16 space-y-6">
                    {/* Reliability Card */}
                    <div className="bg-zinc-800 rounded-[2rem] p-6 text-white shadow-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Network Status</span>
                        </div>
                        <div className="text-2xl font-bold tracking-tighter">98.2%</div>
                        <p className="text-xs text-zinc-400 mt-1 italic">Global Reliability Index</p>
                        <button className="mt-4 w-full py-2 px-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                            Full Analytics 
                        </button>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white p-4">
                        <h3 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4">Suggested Nodes</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="text-[11px] font-bold group-hover:text-orange-500 transition-colors">Vercel</div>
                                            <div className="text-[9px] text-zinc-400">96% Vector Match</div>
                                        </div>
                                    </div>
                                    <TrendingUp className="w-3 h-3 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default Suggestions