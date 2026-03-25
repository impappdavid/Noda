import { Volume2, VolumeX, Activity} from "lucide-react"
import { useState } from "react";

const HeroVideo = () => {
    const [isMuted, setIsMuted] = useState(true); // Added mute state
    
    return (
        <>
            {/* --- 1. HERO SECTION --- */}
            <div className="border-b border-zinc-300 bg-zinc-50 relative overflow-hidden flex flex-col items-center justify-start ">

                {/* --- LOOPED VIDEO PREVIEW --- */}
                <div className="w-full  bg-white relative flex flex-col">

                    {/* Video Terminal Bar */}
                    <div className="flex items-center justify-between border-b border-zinc-300 shrink-0">
                        <div className="flex items-center gap-2 p-2">
                            <Activity size={12} className="text-orange-500 animate-pulse" />
                            <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-[0.2em] mt-0.5">
                                intro.mp4
                            </span>
                        </div>
                        <div className="flex gap-1.5 px-2">
                            <div className="w-1.5 h-1.5 bg-orange-400" />
                            <div className="w-1.5 h-1.5 bg-orange-500" />
                            <div className="w-1.5 h-1.5 bg-orange-600" />
                        </div>
                    </div>

                    {/* Video Container */}
                    <div className="relative bg-zinc-800 aspect-video w-full overflow-hidden ">
                        <video
                            autoPlay
                            loop
                            muted={isMuted}
                            onClick={() => setIsMuted(!isMuted)}
                            // Replace src with your actual video path (e.g., "/noda-demo.mp4")
                            src="https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4"
                            className="object-cover w-full h-full cursor-pointer"
                        />


                        {/* Live Recording Badge (Top Left) */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 bg-zinc-900/80 px-2 py-1 border border-zinc-700/50 backdrop-blur-sm pointer-events-none">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[8px] font-mono font-black text-white uppercase tracking-widest mt-0.5">Live_Feed</span>
                        </div>

                        {/* Mute/Unmute Toggle Button (Top Right) */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="absolute top-4 right-4 flex items-center justify-center bg-zinc-900/80 p-1.5 border border-zinc-700/50 backdrop-blur-sm text-zinc-300 hover:text-white transition-colors cursor-pointer z-10 outline-none"
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                    </div>

                </div>
            </div>

        </>
    )
}
export default HeroVideo