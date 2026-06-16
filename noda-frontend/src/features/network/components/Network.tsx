import { InvitationRow } from './Invitation';
import { UserCard } from './UserCard';

const networkData = [
    { id: 1, name: "Marcus Vane", role: "Principal Engineer", company: "OpenAI", type: "Hiring", match: 98 },
    { id: 2, name: "Elena Rossi", role: "Talent Lead", company: "Vercel", type: "Invitations", match: 94 },
    { id: 3, name: "Sarah Chen", role: "Staff Frontend", company: "Linear", type: "Activity", match: 91 },
    { id: 4, name: "David Miller", role: "Systems Architect", company: "Rust Foundation", type: "Popular", match: 89 },
    { id: 5, name: "Alex Rivera", role: "DevOps Lead", company: "Stripe", type: "Activity", match: 87 },
    { id: 6, name: "Jordan Smith", role: "Product Designer", company: "Figma", type: "Popular", match: 92 },
];

const Network = () => {
    const invitations = networkData.filter(p => p.type === "Invitations");

    return (
        <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <div className="flex flex-1 w-full max-w-4xl mx-auto  overflow-hidden">
                
                <main className="flex flex-1 flex-col border-x border-zinc-300  h-full bg-white overflow-hidden ">

                    <div className="flex-1 overflow-y-auto scrollbar-hide">

                        {/* 2. REDESIGNED INBOUND NODES (SQUARED ACTIONS) */}
                        {invitations.length > 0 && (
                            <section className="w-full border-b border-zinc-300">
                                <div className="px-4 py-2 flex items-center justify-between bg-zinc-50/50 border-b border-zinc-300">
                                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                                        [Requests]
                                    </span>
                                    <span className="text-[9px] font-mono font-black text-blue-600 uppercase tracking-tighter animate-pulse">Action_Required</span>
                                </div>
                                <div className="divide-y divide-zinc-300">
                                    {invitations.map(person => (
                                        <InvitationRow key={person.id} person={person} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. NETWORK CLUSTERS */}
                        <MinimalSection title="Recruiters" data={networkData.filter(p => p.type === "Hiring")} />
                        <MinimalSection title="Recent Searches" data={networkData.filter(p => p.type === "Activity")} />
                        <MinimalSection title="Explore" data={networkData.filter(p => p.type === "Popular")} />

                    </div>
                </main>
            </div>
        </div>
    );
};

// --- REDESIGNED INVITATION ROW ---


// --- MINIMAL GRID SECTION ---
const MinimalSection = ({ title, data }: any) => (
    <section className="w-full">
        <div className="px-4 py-2 border-b flex items-center border-zinc-300 bg-zinc-50/40 w-full justify-between">
            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">[{title}]</span>
            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500 hover:text-blue-600 hover:underline cursor-pointer">[view all]</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-300">
            {data.map((person: any) => (
                <UserCard key={person.id} person={person} />
            ))}
        </div>
    </section>
);

export default Network;