import { ShieldAlert, Sparkles, Target, Wand2, ShieldCheck, Cpu, Fingerprint } from "lucide-react"

const HowItWorksContent = () => {
    const processSteps = [
        {
            title: "Vectorization",
            description: "Upload your professional history. Our engine converts your skills into a multi-dimensional 'Node'—a mathematical representation of your career potential.",
            icon: <Fingerprint className="w-4 h-4" />,
        },
        {
            title: "Cross-Market Aggregation",
            description: "Noda simultaneously scans elite job clusters across GitHub, LinkedIn, and private boards, filtering for roles that match your vector proximity.",
            icon: <Cpu className="w-4 h-4" />,
        },
        {
            title: "Deterministic Engagement",
            description: "Apply through the Noda tunnel. We track recruiter activity in real-time. If they don't engage, the link is severed and you are notified immediately.",
            icon: <ShieldCheck className="w-4 h-4" />,
        }
    ];

    return (
        <main className="flex-1 max-w-xl pb-20">
            <header className="mb-8">
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 mb-2">The Methodology</h1>
                <p className="text-xs text-zinc-600 leading-relaxed">
                    <strong className="text-zinc-900 tracking-tighter font-kodemono">NODA</strong> is a deterministic hiring protocol. We use <span className="text-zinc-900 font-medium">vector embeddings</span> to ensure every application is a high-probability match.
                </p>
            </header>

            {/* Interactive Demo Area - The "Video" focal point */}
            <section className="mb-16">
                <div className="aspect-video bg-zinc-100 rounded-[2rem] border border-zinc-200 flex items-center justify-center relative overflow-hidden group cursor-pointer shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/5" />
                    <div className="flex flex-col items-center gap-4 z-10">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-zinc-900 border-b-[6px] border-b-transparent ml-1" />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-zinc-400">
                            Watch the Protocol in Action
                        </span>
                    </div>
                </div>
            </section>

            {/* Bento Grid: The Infrastructure */}
            <section className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-20">
                {/* Large Logic Box */}
                <div className="md:col-span-4 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:border-orange-500/30 transition-colors">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-zinc-900" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Core Engine</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">Matching via Proximity</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        Traditional job boards use keyword tagging.  <strong className="text-zinc-900 tracking-tighter font-kodemono">NODA</strong> uses mathematical distance. We measure how close your 'Node' is to the 'Job Node' in a specialized data space.
                    </p>
                </div>

                {/* Accountability Box */}
                <div className="md:col-span-2 bg-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
                    <ShieldAlert className="w-5 h-5 text-orange-500 mb-6" />
                    <div>
                        <h3 className="text-md font-bold text-white mb-2">Automated Purgatory</h3>
                        <p className="text-zinc-400 text-xs leading-relaxed italic">
                            14 days of silence = Automatic Delisting.
                        </p>
                    </div>
                </div>

                {/* Secondary Feature Boxes */}
                <div className="md:col-span-3 bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-sm transition-shadow">
                    <Wand2 className="w-5 h-5 text-zinc-400 mb-4" />
                    <h4 className="font-bold text-zinc-900 text-sm mb-1">Contextual CV Tailoring</h4>
                    <p className="text-zinc-500 text-xs">AI-driven resume optimization that addresses specific skill-gap deltas in real-time.</p>
                </div>

                <div className="md:col-span-3 bg-white border border-zinc-200 rounded-3xl p-6 hover:shadow-sm transition-shadow">
                    <Sparkles className="w-5 h-5 text-zinc-400 mb-4" />
                    <h4 className="font-bold text-zinc-900 text-sm mb-1">Encrypted Truth Layer</h4>
                    <p className="text-zinc-500 text-xs">Anonymized feedback loops allow nodes to report on interview quality without identity exposure.</p>
                </div>
            </section>

            {/* The Process Path */}
            <section className="relative">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-xl font-bold text-zinc-900">The Hiring Path</h2>
                    <div className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full">
                        <span className="text-[10px] font-bold text-zinc-500 tracking-tighter">PHASE: ALPHA-01</span>
                    </div>
                </div>

                {/* Visual Line */}
                <div className="absolute left-[19px] top-20 bottom-0 w-[1px] bg-zinc-200 md:left-1/2 md:-translate-x-1/2"></div>

                <div className="space-y-20">
                    {processSteps.map((step, index) => (
                        <div key={index} className="relative flex items-start md:items-center group">
                            {/* Connector Node */}
                            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 bg-white z-10 group-hover:border-orange-500 transition-all duration-500 group-hover:scale-110">
                                <div className="w-2 h-2 rounded-full bg-zinc-900 group-hover:bg-orange-500 transition-colors"></div>
                            </div>

                            <div className={`pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16 md:text-left'}`}>
                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-50 border border-zinc-100 mb-3 group-hover:bg-orange-50 transition-colors">
                                    <span className="text-[10px] font-mono text-zinc-400 group-hover:text-orange-600 font-bold">NODE 0{index + 1}</span>
                                    <div className="text-zinc-300 group-hover:text-orange-500 transition-colors">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HowItWorksContent;