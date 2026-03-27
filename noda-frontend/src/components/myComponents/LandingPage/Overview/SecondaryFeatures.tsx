import { cn } from "@/lib/utils"
import { CalendarDays, Database, EyeOff, MessageSquare, PanelRight, Play, PlaySquare } from "lucide-react"

const SecondaryFeatures = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-zinc-300 border-b border-zinc-300">

                {/* Feature 1: Scheduling Sync */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="grid grid-cols-5 gap-1 w-full max-w-[160px] opacity-80 group-hover:scale-105 transition-transform duration-300">
                            {[...Array(15)].map((_, i) => (
                                <div key={i} className={cn("h-4 border border-zinc-400", i === 7 || i === 8 ? "bg-orange-500 border-orange-500" : "bg-white")} />
                            ))}
                        </div>
                        <div className="absolute top-2 right-2 flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-emerald-500" />
                            <span className="text-[8px] font-mono font-black text-zinc-400 uppercase tracking-widest">Synced</span>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Calendar</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Directly align interview timeslots with internal calendar nodes to prevent scheduling latency.</p>
                    </div>
                </div>

                {/* Feature 2: Multi-Source Ingestion */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="flex flex-col gap-2 w-full max-w-[160px] group-hover:scale-105 transition-transform duration-300">
                            <div className="h-5 border border-zinc-300 bg-white flex items-center px-2 "><span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">SRC LINKEDIN</span></div>
                            <div className="h-5 border border-zinc-300 bg-white flex items-center px-2 ml-2"><span className="text-[9px] font-mono font-bold text-zinc-400 uppercase">SRC GREENHOUSE</span></div>
                            <div className="h-5 border border-orange-300 bg-orange-50 flex items-center px-2  ml-4"><span className="text-[9px] font-mono font-bold text-orange-600 uppercase">SYS AGGREGATED</span></div>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <Database size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Data Aggregation</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Automatically ingest and centralize job listings from multiple external ATS and board endpoints.</p>
                    </div>
                </div>

                {/* Feature 3: Node Feedback */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="border border-zinc-300 bg-white p-3 shadow-sm w-full max-w-[150px] flex flex-col gap-2 group-hover:scale-105 transition-transform duration-300">
                            {/* Header: Identity Toggle */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-4 h-4 bg-zinc-900 flex items-center justify-center">
                                        <EyeOff size={10} className="text-white" />
                                    </div>
                                    <span className="text-[8px] font-mono font-black text-zinc-900 uppercase tracking-widest">ANONYMUS</span>
                                </div>
                            </div>
                            {/* Comment Lines */}
                            <div className="space-y-1">
                                <div className="w-full h-1.5 bg-zinc-200" />
                                <div className="w-4/5 h-1.5 bg-zinc-200" />
                            </div>
                            {/* Metric: Response Time */}
                            <div className=" flex items-center justify-between border-t border-zinc-300 pt-2">
                                <span className="text-[8px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Response Time</span>
                                <span className="text-[7px] font-black text-orange-500 uppercase tracking-widest">24 HRS</span>
                            </div>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Company Reviews</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Broadcast public or cloaked feedback on entity operations and optionally log recruiter response latencies.</p>
                    </div>
                </div>

                {/* Feature 4: Anonymous Mode */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="border border-zinc-300 bg-white p-2 shadow-sm w-full max-w-[140px] flex items-center justify-between group-hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-zinc-200 flex items-center justify-center"><EyeOff size={10} className="text-zinc-500" /></div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-zinc-900 uppercase">ANONYMUS</span>
                                    <span className="text-[8px] font-mono text-zinc-600">@anonymus</span>
                                </div>
                            </div>
                            <div className="w-6 h-3 bg-zinc-800 rounded-full relative">
                                <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-orange-500 rounded-full" />
                            </div>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <EyeOff size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Anonymus Mode</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Browse the network and deploy nodes securely without broadcasting your primary identity token.</p>
                    </div>
                </div>

                {/* Feature 5: Quick Sidebar */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="w-full max-w-[160px] h-20 border border-zinc-300 bg-white shadow-sm flex overflow-hidden group-hover:scale-105 transition-transform duration-300">
                            <div className="flex-1 bg-zinc-100 border-r border-zinc-200 p-2 flex flex-col gap-1">
                                <div className="w-full h-1.5 bg-zinc-200" />
                                <div className="w-2/3 h-1.5 bg-zinc-200" />
                            </div>
                            <div className="w-16 bg-white p-2 flex flex-col gap-1 shadow-[-4px_0_12px_rgba(0,0,0,0.05)] z-10">
                                <div className="w-4 h-4 bg-orange-200 border border-orange-300 mb-1" />
                                <div className="w-full h-1 bg-zinc-300" />
                                <div className="w-full h-1 bg-zinc-300" />
                                <div className="w-1/2 h-1 bg-zinc-300" />
                            </div>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <PanelRight size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Quick Inspect</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Rapidly parse candidate telemetry via a sliding overlay terminal without losing your primary context.</p>
                    </div>
                </div>

                {/* Feature 6: Company Intro Video */}
                <div className="bg-white flex flex-col group hover:bg-zinc-50/50 transition-colors">
                    {/* Visual Mock */}
                    <div className="h-32 bg-zinc-50 border-b border-zinc-200 relative overflow-hidden flex items-center justify-center p-4">
                        <div className="w-full max-w-[140px] aspect-video border border-zinc-300 bg-zinc-800 relative flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                            {/* Scanlines */}
                            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #000 1px, #000 2px)' }} />
                            <Play size={16} className="text-orange-500 z-10" />
                            <div className="absolute top-1.5 left-1.5 flex items-center gap-1 z-10">
                                <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
                                <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest">Intro</span>
                            </div>
                        </div>
                    </div>
                    {/* Copy */}
                    <div className="p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <PlaySquare size={14} className="text-zinc-900" />
                            <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-900 mt-0.5">Company Broadcast</h3>
                        </div>
                        <p className="text-[10px] font-medium text-zinc-600 leading-relaxed">Integrate high-fidelity video streams allowing companies to showcase internal culture and tech stacks.</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default SecondaryFeatures