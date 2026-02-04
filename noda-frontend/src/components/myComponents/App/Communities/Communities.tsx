import { useState } from 'react';
import { ArrowUpRight, Plus, Check, ChevronsUpDown } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data with visual assets added
const communityData = [
    { id: 1, name: "Rust Protocol", members: "12.4k", type: "Popular", tag: "Systems", logo: "https://www.rust-lang.org/static/images/rust-logo-blk.svg", cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400" },
    { id: 2, name: "Frontend Ops", members: "8.2k", type: "For You", tag: "Full-Stack", logo: "https://vercel.com/api/www/avatar/vercel?s=48", cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400" },
    { id: 3, name: "AI Alignment", members: "24k", type: "Explore", tag: "Senior", logo: "https://openai.com/favicon.ico", cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400" },
    { id: 4, name: "Fintech Nodes", members: "5.1k", type: "Popular", tag: "Engineering", logo: "https://stripe.com/favicon.ico", cover: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=400" },
    { id: 5, name: "Web3 Ledger", members: "3.2k", type: "Popular", tag: "Crypto", logo: "https://ethereum.org/favicon.ico", cover: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=400" },
];

const AppCommunities = () => {
    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-4xl border-x border-zinc-300 h-full overflow-hidden bg-white pt-13">

                    {/* 1. FILTER BAR (NO GAPS) */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30">
                        <div className="flex flex-1 items-center divide-x divide-zinc-200">
                            <div className="flex-1">
                                <FilterCombobox label="Category" options={[{ label: "Dev", value: "dev" }]} />
                            </div>
                            <div className="flex-1">
                                <FilterCombobox label="Region" options={[{ label: "Global", value: "global" }]} />
                            </div>
                            <button className="px-4 h-10 bg-zinc-50 hover:bg-zinc-100 transition-all border-l border-zinc-200 active:scale-95">
                                <Plus size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">

                        {/* SECTION PROTOCOL */}
                        {["Popular Intelligence", "For You", "Explore"].map((section) => (
                            <div key={section} className="w-full">
                                <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                                    <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-400">
                                        {section}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-3 border-b border-zinc-300 divide-x divide-zinc-300">
                                    {communityData
                                        .filter(c => section.includes(c.type))
                                        .map(c => (
                                            <CompactProtocolCard key={c.id} community={c} />
                                        ))}
                                    {/* Empty cells to maintain 3-column grid structure */}
                                    {Array.from({ length: (3 - (communityData.filter(c => section.includes(c.type)).length % 3)) % 3 }).map((_, i) => (
                                        <div key={i} className="bg-zinc-50/20" />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </main>
            </div>
        </div>
    );
};

// --- COMPACT PROTOCOL CARD WITH ASSETS ---
const CompactProtocolCard = ({ community }) => (
    <div className="group bg-white flex flex-col justify-center  relative hover:bg-zinc-50 transition-all cursor-pointer overflow-hidden">
        
        {/* Subdued Cover Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
                src={community.cover} 
                alt="" 
                className="w-full h-full object-cover opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
            />
        </div>

        <div className="relative z-10 p-4 flex justify-between items-center min-w-0">
            <div className="flex items-center gap-3 min-w-0">
                {/* Square Logo */}
                <div className="w-8 h-8 rounded bg-zinc-100 border border-zinc-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={community.logo} alt="" className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex flex-col min-w-0">
                    <span className="text-[9px] font-mono flex items-center font-black text-zinc-400 uppercase tracking-widest leading-none">
                        {community.tag} <span className="mx-1.5 opacity-30">•</span> {community.members}
                    </span>
                    <h3 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight truncate leading-tight mt-1.5 group-hover:text-black">
                        {community.name}
                    </h3>
                </div>
            </div>

            <div className="flex items-center justify-center pl-2">
                <ArrowUpRight 
                    size={14} 
                    className="text-zinc-200 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" 
                />
            </div>
        </div>
    </div>
);

// --- COMBOBOX FILTER COMPONENT ---
function FilterCombobox({ label, options }: any) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="h-10 w-full rounded-none text-[10px] font-mono font-black uppercase hover:bg-zinc-50 px-4 justify-between border-none ring-0">
                    <span className="truncate text-zinc-400">{value ? options.find((o: any) => o.value === value)?.label : label}</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-40" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 z-[100] w-[--radix-popover-trigger-width] rounded-none border-zinc-200 shadow-xl" align="start">
                <Command className="font-mono text-zinc-900">
                    <CommandGroup>
                        {options.map((opt: any) => (
                            <CommandItem key={opt.value} value={opt.value} className="text-[10px] font-bold uppercase py-2.5 cursor-pointer" onSelect={(v) => { setValue(v); setOpen(false); }}>
                                <Check className={cn("mr-2 h-3 w-3", value === opt.value ? "opacity-100" : "opacity-0")} />
                                {opt.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default AppCommunities;