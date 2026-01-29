import { Input } from "@/components/ui/input"
import { Bell, MessageSquare, Search } from "lucide-react"

const Navbar = () => {
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-zinc-300 bg-white/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-2 flex items-center justify-between ">

                    {/* Logo */}
                    <div className="text-xl font-bold tracking-tighter font-kodemono shrink-0">/NODA</div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                            placeholder="Search nodes, jobs, or intelligence..."
                            className="w-full bg-zinc-50 border-zinc-200 rounded-xl pl-10 focus-visible:ring-orange-500/20 focus-visible:border-orange-500 transition-all"
                        />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-1 shrink-0">
                        <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors relative cursor-pointer">
                            <MessageSquare className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
                        </button>
                        <button className="p-2 hover:bg-zinc-200/80 rounded-lg text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                            <Bell className="w-4 h-4" />
                        </button>
                        <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 ml-2" />
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navbar