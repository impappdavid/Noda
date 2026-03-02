import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, Target, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import PremiumCard from "./Suggestions/PremiumCard";
import ProfileSetup from "./Suggestions/ProfileSetup";

const Suggestions = () => {

    return (
        <>
            {/* 4. RIGHT COLUMN */}
            <aside className="hidden xl:block">
                <div className="sticky top-16 space-y-3 w-37">
                    <PremiumCard />

                    <ProfileSetup />

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