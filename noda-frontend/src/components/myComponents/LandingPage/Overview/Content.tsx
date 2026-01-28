import { Globe, ShieldAlert, Sparkles, Target, UserPlus, Wand2, ShieldCheck } from "lucide-react"

const Content = () => {
    const steps = [
        {
            title: "Register your Node",
            description: "Upload your history to generate your unique career vector.",
            icon: <UserPlus className="w-5 h-5" />,
            tag: "STEP 01"
        },
        {
            title: "Analyze Listings",
            description: "Use the One-Click Tailor to bridge the gap between your skills.",
            icon: <Wand2 className="w-5 h-5" />,
            tag: "STEP 02"
        },
        {
            title: "Engage with Confidence",
            description: "Apply to roles protected under the Anti-Ghosting Protocol.",
            icon: <ShieldCheck className="w-5 h-5" />,
            tag: "STEP 03"
        }
    ];

    return (
        <>
            <main className="flex-1 max-w-xl">
                <header className="mb-8">
                    <h1 className="text-xl font-semibold tracking-tight mb-1">Overview</h1>
                    <p className="text-md text-zinc-800 mb-1">
                        Precision hiring through the intelligence layer.
                    </p>

                    <p className="text-xs text-zinc-500">
                        <strong className="text-zinc-900 tracking-tighter font-kodemono">NODA</strong> is a dev-tool designed to bridge the gap between talent and opportunity.
                        By removing the noise and bias of modern job markets, we facilitate successful hires through
                        <span className="text-zinc-900 font-semibold"> mathematical precision.</span>
                    </p>
                </header>

                {/* Featured Video/Image Section */}
                <section className="mb-12 bg-zinc-50 rounded-3xl border border-zinc-300 shadow-sm overflow-hidden">
                    <div className="aspect-video bg-zinc-200 rounded-2xl flex items-center justify-center relative group">
                        {/* Image of a minimalist web dashboard with bento grid elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent opacity-50" />
                        <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs z-10">
                            Interactive Demo Area
                        </span>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">

                    {/* Box 1: Vector Matching (Large/Wide) */}
                    <div className="md:col-span-2 md:row-span-1 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between hover:border-orange-500/50 transition-colors group">
                        <div className="flex items-center gap-3 mb-1">
                            <div className="p-2 bg-white rounded-lg border border-zinc-200 shadow-sm">
                                <Target className="w-5 h-5 text-zinc-900" />
                            </div>
                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Vector Intelligence</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-zinc-900 mb-2">Mathematical Alignment.</h3>
                            <p className="text-zinc-500 text-xs max-w-md">
                                Your CV is more than a document. Noda transforms your history into a high-dimensional vector to find the exact proximity between your talent and a role.
                            </p>
                        </div>
                    </div>

                    {/* Box 2: Anti-Ghosting (Tall) */}
                    <div className="md:col-span-1 md:row-span-2 bg-zinc-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <ShieldAlert className="w-4 h-4 text-orange-500 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-4">Anti-Ghosting Protocol.</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed">
                                Accountability is hard-coded. If a recruiter doesn't engage with candidates for 14 days, the listing is automatically purged. Silence is no longer an option.
                            </p>
                        </div>
                        <div className="relative z-10 mt-6">
                            <div className="flex items-center gap-2 text-xs font-mono text-orange-500/80">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                                ACTIVE MONITORING
                            </div>
                        </div>
                        {/* Subtle background decoration */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                    </div>

                    {/* Box 3: One-Click Tailor (Square) */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 flex flex-col hover:border-zinc-300 transition-all shadow-sm">
                        <Sparkles className="w-6 h-6 text-zinc-900 mb-auto" />
                        <h4 className="font-bold text-zinc-900 mb-1 text-lg">One-Click Tailor</h4>
                        <p className="text-zinc-500 text-xs">Bridge skill gaps and optimize your CV for every unique application instantly.</p>
                    </div>

                    {/* Box 4: Global Aggregator (Square) */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 flex flex-col hover:border-zinc-300 transition-all shadow-sm">
                        <Globe className="w-6 h-6 text-zinc-900 mb-auto" />
                        <h4 className="font-bold text-zinc-900 mb-1 text-lg">Unified Feed</h4>
                        <p className="text-zinc-500 text-xs">A single source of truth aggregating elite roles from across the global network.</p>
                    </div>

                    <div className="md:col-span-3 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex items-center justify-between hover:border-orange-500/50 transition-colors group">
                        <div className="max-w-[70%]">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-orange-500 transition-colors"></div>
                                <span className="text-xs font-mono text-zinc-400 uppercase tracking-tighter">Verified Intelligence</span>
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-1">Anonymous Insights.</h3>
                            <p className="text-zinc-500 text-sm">
                                Speak freely. Share and read verified, anonymous reviews about interview processes and company culture without risking your professional "Node."
                            </p>
                        </div>

                        {/* Visual element representing 'Anonymous/Hidden' */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/40 rounded-full blur-xl transition-colors"></div>
                            <div className="relative p-4 bg-white border border-zinc-200 rounded-2xl transform group-hover:-rotate-3 transition-transform">
                                <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="relative">
                    <div className="mb-4 text-lg font-semibold">Quick Start</div>
                    {/* The Connector Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-zinc-200 md:left-1/2 md:-translate-x-1/2"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex items-start md:items-center group">

                                {/* The Node Dot */}
                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border border-zinc-200 bg-white z-10 group-hover:border-orange-500 transition-colors duration-500">
                                    <div className="w-2 h-2 rounded-full bg-zinc-900 group-hover:bg-orange-500 transition-colors"></div>
                                </div>

                                {/* Content Logic: Alternate sides on Desktop */}
                                <div className={`pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16 md:text-left'}`}>
                                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-zinc-50 border border-zinc-100 mb-3">
                                        <span className="text-xs font-mono text-zinc-400">0{index + 1}</span>
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2">{step.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed max-w-sm ml-0 md:mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}
export default Content