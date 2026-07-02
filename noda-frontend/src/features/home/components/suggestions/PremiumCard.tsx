import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const PremiumCard = () => {
    return (
        <>
            <Link
                to={`/app/premium`}
                className="w-37 bg-zinc-100 border border-zinc-300 p-2 block transition-all duration-300 cursor-pointer group  relative overflow-hidden no-underline"
            >
                {/* HOVER GLOW EFFECT */}
                <div className="absolute inset-0 bg-linear-to-tr from-orange-500/0 via-blue-500/0 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* TOP BAND */}
                <div className="flex justify-between items-center mb-2 relative z-10">
                    <span className="text-[12px] font-black tracking-tighter flex gap-0.5 items-end text-black group-hover:text-black transition-colors">
                        NODA<span className="text-blue-500 group-hover:animate-pulse uppercase text-[10px]">premium</span>
                    </span>

                    {/* ENERGIZED INDICATOR */}
                    <div className="relative">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(249,115,22,0.5)]" />
                        <div className="absolute inset-0 w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping opacity-0 group-hover:opacity-40" />
                    </div>
                </div>

                {/* CTA SECTION */}
                <div className="flex flex-col gap-1.5 relative z-10">
                    {/* EXPANDING DIVIDER */}
                    <div className="relative h-px w-full bg-zinc-100 overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-tighter group-hover:text-zinc-900 transition-colors">
                            Try now
                        </span>

                        {/* MECHANICAL CHEVRON ANIMATION */}
                        <div className="transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
                            <ChevronRight size={12} className="text-blue-500" />
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
export default PremiumCard