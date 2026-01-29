import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Bell, MessageSquare, Search, User,
    Settings,
    LogOut,
    ShieldCheck,
    CreditCard
} from "lucide-react"

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

                        <DropdownMenu>
                            {/* 1. Trigger using your custom SVG styled container */}
                            <DropdownMenuTrigger asChild>
                                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex justify-center items-center border border-zinc-200 ml-2 cursor-pointer hover:bg-zinc-100 hover:border-zinc-300 transition-all shadow-sm group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-zinc-400 group-hover:fill-zinc-900 transition-colors">
                                        <circle cx="12" cy="6" r="4" />
                                        <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" />
                                    </svg>
                                </div>
                            </DropdownMenuTrigger>

                            {/* 2. Menu Content styled for Noda */}
                            <DropdownMenuContent className="w-42 mt-2 rounded-2xl border-zinc-200 p-2 shadow-xl" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal px-2 py-2">
                                    <div className="flex flex-col ">
                                        <p className="text-xs font-bold leading-none text-zinc-900">Alex Rivers</p>
                                        <p className="text-xs font-mono leading-none text-zinc-400 uppercase tracking-tighter mt-1">
                                            Node: 0x82f...a1c
                                        </p>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator className="bg-zinc-200" />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-100 focus:text-zinc-900 cursor-pointer">
                                        <User className=" h-4 w-4 text-zinc-400" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                                        <Settings className=" h-4 w-4 text-zinc-400" />
                                        <span>Settings</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                                        <CreditCard className=" h-4 w-4 text-zinc-400" />
                                        <span>Billing Tiers</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator className="bg-zinc-50" />

                                <DropdownMenuGroup className="space-y-1 py-1">
                                    <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-zinc-600 focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">
                                        <ShieldCheck className=" h-4 w-4 text-orange-500" />
                                        <span>Verification</span>
                                        <DropdownMenuShortcut className="text-[9px] font-mono">BETA</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator className="bg-zinc-50" />

                                <DropdownMenuItem className="rounded-sm hover:bg-zinc-200/80 px-2 py-2 text-xs text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer mt-1">
                                    <LogOut className=" h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Navbar