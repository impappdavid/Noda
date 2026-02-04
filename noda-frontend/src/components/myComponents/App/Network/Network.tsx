import { Plus, Search, X, } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { cn } from "@/lib/utils";

const networkData = [
    { id: 1, name: "Marcus Vane", role: "Principal Engineer", company: "OpenAI", type: "Hiring", match: 98, color: "bg-zinc-900" },
    { id: 2, name: "Elena Rossi", role: "Talent Lead", company: "Vercel", type: "Invitations", match: 94, color: "bg-blue-600" },
    { id: 3, name: "Sarah Chen", role: "Staff Frontend", company: "Linear", type: "Activity", match: 91, color: "bg-orange-600" },
    { id: 4, name: "David Miller", role: "Systems Architect", company: "Rust Foundation", type: "Popular", match: 89, color: "bg-zinc-700" },
    { id: 5, name: "Alex Rivera", role: "DevOps Lead", company: "Stripe", type: "Activity", match: 87, color: "bg-emerald-600" },
    { id: 6, name: "Jordan Smith", role: "Product Designer", company: "Figma", type: "Popular", match: 92, color: "bg-rose-600" },
    { id: 7, name: "Hiroshi Tanaka", role: "Security Analyst", company: "Cloudflare", type: "Hiring", match: 96, color: "bg-indigo-600" },
    { id: 8, name: "Clara Ames", role: "Backend Engineer", company: "Supabase", type: "Popular", match: 85, color: "bg-cyan-600" },
];

const AppNetwork = () => {
    const invitations = networkData.filter(p => p.type === "Invitations");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-3xl border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-13">
                    
                    {/* 1. SCHEMATIC FILTER BAR */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30 h-10">
                        <div className="flex flex-1 items-center divide-x divide-zinc-200 h-full">
                            <div className="relative flex-[2] flex items-center bg-white px-3 h-full">
                                <Search size={14} className="text-zinc-400 mr-2" />
                                <input 
                                    placeholder="SEARCH NETWORK NODES..." 
                                    className="w-full text-[10px] font-mono font-black uppercase outline-none bg-transparent"
                                />
                            </div>
                            <button className="px-4 h-full bg-white hover:bg-zinc-50 transition-all border-l border-zinc-200 group">
                                <Plus size={16} className="text-zinc-400 group-hover:text-zinc-900" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                        
                        {/* 2. INVITATIONS - FULL WIDTH */}
                        <section className="w-full">
                            <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-900">
                                    Invitations <span className="ml-2 text-blue-600">[{invitations.length}]</span>
                                </h2>
                            </div>
                            <div className="divide-y divide-zinc-300 border-b border-zinc-300">
                                {invitations.map(person => (
                                    <InvitationRow key={person.id} person={person} />
                                ))}
                            </div>
                        </section>

                        {/* 3. PERSISTENT GRID SECTIONS */}
                        <NetworkSection title="Hiring for your role" data={networkData.filter(p => p.type === "Hiring")} />
                        <NetworkSection title="Recent Activity" data={networkData.filter(p => p.type === "Activity")} />
                        <NetworkSection title="Popular Intelligence" data={networkData.filter(p => p.type === "Popular")} />
                        
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- INVITATION ROW ---
const InvitationRow = ({ person }: any) => (
    <div className="flex items-center justify-between p-3 bg-white hover:bg-zinc-200/80 transition-colors border-x border-transparent">
        <div className="flex items-center gap-4">
            <div className={cn("w-12 h-12 flex items-center justify-center shrink-0", person.color)}>
                <span className="text-sm font-black text-white font-mono">{person.name[0]}</span>
            </div>
            <div className="flex flex-col">
                <h3 className="text-xs font-black text-zinc-900 uppercase leading-tight">{person.name}</h3>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tighter mt-1">
                    {person.role} @ {person.company}
                </span>
            </div>
        </div>
        <div className="flex h-10 border border-zinc-300 divide-x divide-zinc-300">
            <button className="px-4 text-[10px] font-black uppercase bg-zinc-900 text-white hover:bg-black transition-all">Accept</button>
            <button className="px-3 text-zinc-400 hover:text-red-600 transition-colors bg-white"><X size={16} /></button>
        </div>
    </div>
);

// --- GRID SECTION WITH PERSISTENT BORDERS ---
const NetworkSection = ({ title, data }: any) => {
    const gridCols = 4;
    // Ensure we always have at least one row of 4 columns even if data is empty
    const placeholders = Math.max(0, gridCols - (data.length % gridCols || gridCols));
    const totalCells = data.length + (data.length % gridCols === 0 ? 0 : placeholders);

    return (
        <section className="w-full">
            <div className="px-4 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-900">{title}</h2>
            </div>
            <div className="grid grid-cols-4 divide-x divide-zinc-300 border-b border-zinc-300">
                {data.map((person: any) => (
                    <VerticalNodeCard key={person.id} person={person} />
                ))}
                {/* Persistent border blocks for empty grid slots */}
                {Array.from({ length: placeholders }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-zinc-50/10 min-h-[160px]" />
                ))}
            </div>
        </section>
    );
};

const VerticalNodeCard = ({ person }: any) => (
    <div className="p-3 flex flex-col items-center text-center justify-between min-h-[160px] bg-white hover:bg-zinc-200/80 transition-colors group">
        <div className="flex flex-col items-center w-full">
            {/* Larger Squared Identity Node */}
            <div className={cn("w-14 h-14 flex items-center justify-center mb-4 transition-transform group-hover:scale-105", person.color)}>
                <span className="text-lg font-black text-white font-mono">{person.name[0]}</span>
            </div>
            <div className="px-2">
                <h3 className="text-xs font-black text-zinc-900 uppercase tracking-tight leading-tight line-clamp-1">{person.name}</h3>
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-tighter mt-1.5 block leading-relaxed">
                    {person.role} <br/> @{person.company}
                </span>
            </div>
        </div>
        <button className="w-full mt-4 py-2 bg-white border border-zinc-300 text-zinc-900 text-[9px] font-black uppercase tracking-[0.2em] hover:bg-zinc-900 hover:text-white transition-all">
            Connect
        </button>
    </div>
);

export default AppNetwork;