import { cn } from "@/lib/utils";

const ProfileActivity = () => {
    // 0: Inactive, 1: Low, 2: Mid, 3: High, 4: Peak
    const levels = [4, 1, 0, 2, 3, 0, 1];
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className="w-full bg-white border border-zinc-300 font-mono">
            {/* COMPRESSED HEADER */}
            <div className="flex items-center justify-between px-2 py-1 border-b border-zinc-300 bg-zinc-50">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900">
                    activity
                </span>
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter flex gap-1 items-center">
                    today
                    <div
                        className={cn(
                            "w-3 h-3 aspect-square border transition-all duration-300 bg-zinc-50 border-zinc-200")}
                    />
                </span>
            </div>

            <div className="p-2">
                {/* SQUARED GRID */}
                <div className="flex justify-between items-center gap-1 ">
                    {days.map((day, i) => {
                        const level = levels[i];
                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                                <div
                                    className={cn(
                                        "w-full aspect-square border transition-all duration-300",
                                        level === 0 && "bg-zinc-50 border-zinc-200",
                                        level === 1 && "bg-orange-500/20 border-orange-500/10",
                                        level === 2 && "bg-orange-500/40 border-orange-500/20",
                                        level === 3 && "bg-orange-500/70 border-orange-500/30",
                                        level === 4 && "bg-orange-600 border-orange-700 shadow-[inset_0_0_4px_rgba(0,0,0,0.1)]"
                                    )}
                                />
                                <span className="text-[8px] font-black text-zinc-400 uppercase">
                                    {day}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* MINIMAL FOOTER */}
                <div className="flex justify-between items-center pt-1.5 border-t border-zinc-100">
                    <span className="text-[9px] font-black text-zinc-900 uppercase tracking-tighter">
                        Levels
                    </span>
                    <div className="flex gap-0.5">
                        {[0, 1, 2, 3, 4].map((l) => (
                            <div
                                key={l}
                                className={cn(
                                    "w-2 h-2 border",
                                    l === 0 ? "bg-zinc-50 border-zinc-200" : "bg-orange-500",
                                    l === 1 && "opacity-20",
                                    l === 2 && "opacity-40",
                                    l === 3 && "opacity-70",
                                    l === 4 && "opacity-100"
                                )}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileActivity;