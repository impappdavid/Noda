import { TrendingUp } from "lucide-react"

const Suggestions = () => {
    return (
        <>
            {/* 4. RIGHT COLUMN */}
            <aside className="hidden xl:block">
                <div className="sticky top-16 space-y-4">
                    <div className="w-[145px] bg-zinc-800 rounded-[1.5rem] p-4 text-white shadow-xl border border-white/5 flex flex-col gap-4">
                        {/* Compact Header */}
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                Intelligence
                            </span>
                            <div className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
                        </div>

                        {/* Vertical Stat Stack */}
                        <div className="space-y-4">
                            {/* Applied */}
                            <div className="flex flex-col gap-0.5">
                                <div className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">Applied</div>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xl font-bold tracking-tighter leading-none">14</span>
                                    <span className="text-[10px] text-orange-500 font-bold bg-orange-500/10 px-1 py-0.5 rounded">
                                        +2
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-[1px] w-full bg-white/5" />
                            <div className="flex justify-between pr-1">
                                {/* Posts */}
                                <div className="flex flex-col gap-0.5">
                                    <div className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">Posts</div>
                                    <span className="text-lg font-bold tracking-tighter text-zinc-100 leading-none">42</span>
                                </div>

                                {/* Views */}
                                <div className="flex flex-col gap-0.5">
                                    <div className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">Views</div>
                                    <span className="text-lg font-bold tracking-tighter text-zinc-100 leading-none">8.4k</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white p-2">
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