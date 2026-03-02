import { Plus, Search, X, ArrowUpRight, } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import { Link } from 'react-router-dom';

const networkData = [
    { id: 1, name: "Marcus Vane", role: "Principal Engineer", company: "OpenAI", type: "Hiring", match: 98 },
    { id: 2, name: "Elena Rossi", role: "Talent Lead", company: "Vercel", type: "Invitations", match: 94 },
    { id: 3, name: "Sarah Chen", role: "Staff Frontend", company: "Linear", type: "Activity", match: 91 },
    { id: 4, name: "David Miller", role: "Systems Architect", company: "Rust Foundation", type: "Popular", match: 89 },
    { id: 5, name: "Alex Rivera", role: "DevOps Lead", company: "Stripe", type: "Activity", match: 87 },
    { id: 6, name: "Jordan Smith", role: "Product Designer", company: "Figma", type: "Popular", match: 92 },
];

const AppNetwork = () => {
    const invitations = networkData.filter(p => p.type === "Invitations");

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 border-r border-zinc-100">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col border-x border-zinc-300 ml-4 h-full bg-white overflow-hidden pt-12.5">

                    {/* 1. MINIMAL SEARCH & ACTION */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white h-10 sticky top-0 z-30 shrink-0">
                        <div className="flex flex-1 items-center h-full px-4 gap-3">
                            <Search size={12} className="text-zinc-500" />
                            <input
                                placeholder="FILTER_NETWORK_STREAM..."
                                className="w-full text-[9px] font-mono font-black uppercase outline-none bg-transparent placeholder:text-zinc-500 tracking-widest"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide">

                        {/* 2. REDESIGNED INBOUND NODES (SQUARED ACTIONS) */}
                        {invitations.length > 0 && (
                            <section className="w-full border-b border-zinc-300">
                                <div className="px-4 py-2 flex items-center justify-between bg-zinc-50/50 border-b border-zinc-300">
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                                        [Inbound_Protocols]
                                    </span>
                                    <span className="text-[9px] font-mono font-black text-orange-600 uppercase tracking-tighter animate-pulse">Action_Required</span>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                    {invitations.map(person => (
                                        <InvitationRow key={person.id} person={person} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. NETWORK CLUSTERS */}
                        <MinimalSection title="Hiring_Nodes" data={networkData.filter(p => p.type === "Hiring")} />
                        <MinimalSection title="Recent_Pulse" data={networkData.filter(p => p.type === "Activity")} />
                        <MinimalSection title="Global_Directory" data={networkData.filter(p => p.type === "Popular")} />

                    </div>
                </main>
            </div>
        </div>
    );
};

// --- REDESIGNED INVITATION ROW ---
const InvitationRow = ({ person }: any) => (
    <div className="flex items-center justify-between p-2 bg-white hover:bg-zinc-50 transition-colors">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-zinc-800 text-white flex items-center justify-center font-mono font-black text-xs">
                {person.name[0]}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-tight leading-none">{person.name}</span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase mt-1 tracking-tighter">
                    {person.role} // <span className="text-zinc-900 font-bold">{person.company}</span>
                </span>
            </div>
        </div>

        {/* SQUARED ACTION BLOCK */}
        <div className="flex border border-zinc-300 divide-x divide-zinc-300 h-10">
            <button className="px-4 bg-zinc-800 text-white text-[11px] font-mono font-bold uppercase hover:bg-zinc-900 transition-all flex cursor-pointer items-center gap-2">
                Accept
            </button>
            <button className="px-3 bg-white text-zinc-500 hover:bg-red-500/20 hover:text-red-500 transition-colors cursor-pointer">
                <X size={14} />
            </button>
        </div>
    </div>
);

// --- MINIMAL GRID SECTION ---
const MinimalSection = ({ title, data }: any) => (
    <section className="w-full">
        <div className="px-4 py-2 border-b flex items-center border-zinc-300 bg-zinc-50/40">
            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">[{title}]</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-300">
            {data.map((person: any) => (
                <MinimalNodeCard key={person.id} person={person} />
            ))}
        </div>
    </section>
);

const MinimalNodeCard = ({ person }: any) => (
    <Link to={`/app/user/${person.name}`} className="p-1.5 bg-white flex flex-col border-r border-zinc-300 justify-between  group hover:bg-zinc-50 transition-all relative cursor-pointer">
        <div className="flex justify-between items-start">
            {/* Left: Avatar Box */}
            <img src='https://marszalstudio.pl/wp-content/uploads/2024/01/fajne-zdjecia-profilowe-19.webp' className=" flex items-center justify-center font-mono font-black text-xs group-hover:bg-zinc-800 group-hover:text-white transition-all" />
        </div>

        <div className="mt-2 w-full flex justify-between">
            <div className="space-y-1">
                <div className="flex items-center gap-1">
                    <h3 className="text-[11px] font-bold uppercase tracking-tight leading-none">{person.name}</h3>
                    <div className=" opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                        <ArrowUpRight size={12} className="text-zinc-800" />
                    </div>
                </div>
                <p className="text-[10px] font-mono text-zinc-800 uppercase leading-tight tracking-wider">
                    {person.role} <br />
                    <span className="text-zinc-900 font-black">@{person.company}</span>
                </p>
            </div>
            <button onClick={(e) => e.preventDefault()} className="w-6 h-6 bg-orange-500 flex justify-center items-center text-white cursor-pointer hover:bg-orange-600 transition-colors">
                <Plus className='w-3.5 h-3.5'/>
            </button>
        </div>


    </Link>
);



export default AppNetwork;