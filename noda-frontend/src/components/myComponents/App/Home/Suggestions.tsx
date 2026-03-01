import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Target, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const Suggestions = () => {

    return (
        <>
            {/* 4. RIGHT COLUMN */}
            <aside className="hidden xl:block">
                <div className="sticky top-16 space-y-3 w-37">
                    <Link
                        to={`/app/premium`}
                        className="w-37 bg-zinc-800 p-2 block transition-all duration-300 cursor-pointer group shadow-2xl relative overflow-hidden no-underline"
                    >
                        {/* HOVER GLOW EFFECT */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* TOP BAND */}
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <span className="text-[12px] font-black tracking-tighter flex gap-0.5 items-end text-white group-hover:text-orange-50 transition-colors">
                                NODA<span className="text-orange-500 group-hover:animate-pulse uppercase text-[10px]">premium</span>
                            </span>

                            {/* ENERGIZED INDICATOR */}
                            <div className="relative">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                                <div className="absolute inset-0 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping opacity-0 group-hover:opacity-40" />
                            </div>
                        </div>

                        {/* CTA SECTION */}
                        <div className="flex flex-col gap-1.5 relative z-10">
                            {/* EXPANDING DIVIDER */}
                            <div className="relative h-[1px] w-full bg-zinc-700 overflow-hidden">
                                <div className="absolute inset-0 bg-orange-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-tighter group-hover:text-zinc-200 transition-colors">
                                    Try now
                                </span>

                                {/* MECHANICAL CHEVRON ANIMATION */}
                                <div className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
                                    <ChevronRight size={12} className="text-orange-500" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* --- 1. SETUP_PROGRESS (Mechanical Initialization) --- */}
                    <div className=" flex items-center justify-between p-2 bg-gradient-to-br from-orange-600 to-orange-800 cursor-pointer">
                        <div className="flex gap-1 items-center">
                            <ChevronDown className="w-3.5 h-3.5 text-white"/>
                            <div className="text-[10px] text-white uppercase">Profile</div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="flex gap-0.5 items-center">
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-zinc-300"></div>
                                <div className="h-[13px] w-[2px] bg-zinc-300"></div>
                            </div>
                            <div className="text-[10px] text-zinc-200">4/6</div>
                        </div>
                    </div>

                    <div className="space-y-2 p-2 border border-zinc-300">
                        <div className="flex items-center justify-between border-b border-zinc-300 pb-2">
                            <h3 className="text-[10px] font-mono font-black text-zinc-500 uppercase tracking-widest">
                                ACtivity
                            </h3>
                            <Target size={14} className="text-zinc-500" />
                        </div>

                        <div className="space-y-2">
                            {/* 7 Individual Squares for the Week */}
                            <div className="grid grid-cols-7 gap-1">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                                    // Mock activity levels for the current week
                                    const levels = [3, 2, 0, 1, 3, 0, 0];
                                    const level = levels[i];

                                    return (
                                        <div key={i} className="flex flex-col gap-1.5 items-center">
                                            <div
                                                className={cn(
                                                    "aspect-square w-full transition-colors duration-500",
                                                    level === 0 && "bg-zinc-50 border border-zinc-100",
                                                    level === 1 && "bg-orange-500/20",
                                                    level === 2 && "bg-orange-500/40",
                                                    level === 3 && "bg-orange-500 "
                                                )}
                                                title={`${day}: Level ${level}`}
                                            />
                                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase">
                                                {day}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-between items-center pt-1 border-t border-zinc-50">
                                <span className="text-[10px] text-zinc-500 uppercase tracking-tighter">Today</span>
                                <div className="flex gap-1 items-center opacity-60">
                                    <div className="w-1 h-1 bg-orange-800 rounded-full" />
                                    <div className="w-1 h-1 bg-orange-800 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
export default Suggestions