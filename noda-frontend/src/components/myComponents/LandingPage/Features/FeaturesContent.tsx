import { Target, ShieldCheck, Share2 } from "lucide-react"

const FeaturesContent = () => {
    return (
        <main className="flex-1 max-w-xl pb-20">
            <header className="mb-8">
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 mb-2">Platform Capabilities</h1>
                <p className="text-xs text-zinc-600 leading-relaxed">
                    A suite of deterministic tools designed to eliminate the friction in modern hiring protocols.
                </p>
            </header>

            <div className="space-y-24">
                {/* Feature 1: The Vector Matcher */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center mb-4">
                            <Target className="w-5 h-5 text-zinc-900" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 mb-3">Vector Proximity Engine</h2>
                        <p className="text-zinc-600 text-xs leading-relaxed mb-4">
                            Traditional boards use string matching. Noda uses high-dimensional vector embeddings to map your career trajectory against specific job requirements.
                        </p>
                        <ul className="space-y-2 text-xs text-zinc-600 font-mono">
                            <li className="flex items-center gap-2"> <div className="w-1 h-1 bg-orange-500 rounded-full" /> Semantic Skill Analysis</li>
                            <li className="flex items-center gap-2"> <div className="w-1 h-1 bg-orange-500 rounded-full" /> Hidden Pattern Detection</li>
                        </ul>
                    </div>
                    {/* Mini Demo: Proximity Visual */}
                    <div className="bg-zinc-50 border border-zinc-300 rounded-[2rem] p-6 h-48 flex flex-col justify-center gap-4 relative overflow-hidden group">
                        <div className="flex justify-between items-center px-4">
                            <div className="w-12 h-1 bg-zinc-300 rounded animate-pulse" />
                            <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center text-[8px] font-bold text-orange-500 bg-white">96%</div>
                        </div>
                        <div className="flex justify-between items-center px-8 opacity-40">
                            <div className="w-16 h-1 bg-zinc-300 rounded" />
                            <div className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-400 bg-white">72%</div>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors" />
                    </div>
                </section>

                {/* Feature 2: Anti-Ghosting Protocol */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="md:order-last">
                        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-zinc-900 mb-3">Response Enforcement</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                            We monitor recruiter activity. If an application is left in limbo for 14 days, the listing is automatically purged from the network.
                        </p>
                    </div>
                    {/* Mini Demo: The Countdown */}
                    <div className="bg-zinc-900 rounded-[2rem] p-8 h-48 flex flex-col items-center justify-center relative group">
                        <div className="text-white font-mono text-3xl font-bold tracking-tighter">13:23:59:04</div>
                        <div className="text-zinc-500 text-[10px] mt-2 uppercase tracking-widest font-bold">Time to Delisting</div>
                        <div className="absolute top-4 left-6 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                             <span className="text-xs text-orange-500 font-bold">LIVE PROTOCOL</span>
                        </div>
                    </div>
                </section>

                {/* Feature 3: Anonymous Review Layer */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center mb-4">
                            <Share2 className="w-5 h-5 text-zinc-900" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 mb-3">Anonymous Truth Layer</h2>
                        <p className="text-zinc-500 text-xs leading-relaxed">
                            A decentralized review system where candidates share interview experiences anonymously. Verified by the Noda Node system for total integrity.
                        </p>
                    </div>
                    {/* Mini Demo: Anonymous Card */}
                    <div className="bg-white border border-zinc-200 rounded-[2rem] p-6 h-48 flex flex-col justify-center gap-3 shadow-sm rotate-1">
                        <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 bg-zinc-300 rounded-full" />
                            <div className="w-20 h-2 bg-zinc-300 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="w-full h-2 bg-zinc-200 rounded" />
                            <div className="w-3/4 h-2 bg-zinc-200 rounded" />
                        </div>
                        <div className="flex gap-2">
                             <div className="px-2 py-1 bg-zinc-100 rounded text-xs text-zinc-400">#InterviewExperience</div>
                             <div className="px-2 py-1 bg-zinc-100 rounded text-xs text-zinc-400">#TechStack</div>
                        </div>
                    </div>
                </section>
            </div>
            
            {/* The Full Feature List (Quick Scan) */}
            <section className="mt-32 pt-16 border-t border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-8">Additional Modules</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">Global Feed Sync</h4>
                        <p className="text-zinc-500 text-xs">Real-time aggregation from LinkedIn, Indeed, and GitHub.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">One-Click Tailor</h4>
                        <p className="text-zinc-500 text-xs">Instant CV optimization based on job-vector requirements.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">Recruiter Dashboard</h4>
                        <p className="text-zinc-500 text-xs">Command center for high-intent candidate matching.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">Reliability Scoring</h4>
                        <p className="text-zinc-500 text-xs">Tracking professional integrity across the network.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">Encrypted Profiles</h4>
                        <p className="text-zinc-500 text-xs">Total data sovereignty for all user Nodes.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-zinc-900 text-sm mb-1">Direct Tunnel</h4>
                        <p className="text-zinc-500 text-xs">Instant communication channel with verified recruiters.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FeaturesContent;