import { 
  MoreHorizontal, 
  Heart, 
  MessageSquare, 
  BarChart3, 
  Bookmark, 
  Share2 
} from "lucide-react"

const Feed = () => {
    return (
        <div className="flex flex-col">
            {[1, 2, 3, 4, 5,6,7,8,9,10].map((i) => (
                <div key={i} className="p-5 border-b border-zinc-300 hover:bg-zinc-50/20 transition-colors group">
                    {/* Top Row: User Info & Actions */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-3">
                            {/* User Picture Node */}
                            <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 shrink-0 overflow-hidden">
                                {/* Placeholder for user image */}
                                <div className="w-full h-full bg-gradient-to-br from-zinc-200 to-zinc-300" />
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-zinc-900 leading-none">Alex Rivers</span>
                                    <span className="text-xs text-zinc-400 font-mono uppercase tracking-tighter">@arivers</span>
                                </div>
                                <span className="text-[11px] text-zinc-500 mt-0.5">Vector Engineer</span>
                                <span className="text-[9px] text-zinc-400 font-mono tracking-tighter uppercase mt-0.5">Protocol Update • 2h ago</span>
                            </div>
                        </div>

                        {/* 3-Point Icon */}
                        <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Post Content */}
                    <div className="pl-13 md:pl-[52px]">
                        <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                            Applying the 14-day anti-ghosting protocol has significantly improved our response velocity.
                            Recruiters are now forced into active engagement or delisting. Transparency is the new standard for modern hiring.
                        </p>

                       

                        {/* Interaction Bar */}
                        <div className="flex items-center justify-between pt-1">
                            {/* Primary Stats */}
                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-orange-500 transition-colors group/stat">
                                    <Heart className="w-4 h-4 group-hover/stat:fill-orange-500" />
                                    <span className="text-[11px] font-mono">24</span>
                                </button>
                                <button className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                    <span className="text-[11px] font-mono">12</span>
                                </button>
                                <div className="flex items-center gap-1.5 text-zinc-500">
                                    <BarChart3 className="w-4 h-4" />
                                    <span className="text-[11px] font-mono">1.2k</span>
                                </div>
                            </div>

                            {/* Secondary Actions */}
                            <div className="flex items-center gap-3">
                                <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                                <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Feed