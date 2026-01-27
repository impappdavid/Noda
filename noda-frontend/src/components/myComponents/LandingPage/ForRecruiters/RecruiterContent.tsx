import { ShieldCheck, Search, Clock } from "lucide-react"

const RecruiterContent = () => {

    return (
        <main className="flex-1 max-w-xl pb-20">
            {/* 1. The Value Header */}
            <section className="mb-8">
                <span className="text-xs font-mono text-orange-500 font-bold tracking-[0.3em] uppercase">Enterprise Protocol</span>
                <h1 className="text-lg font-bold tracking-tight text-zinc-900 mt-2 mb-2">
                    Stop sorting. Start interviewing.
                </h1>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">
                    <strong className="text-zinc-900 tracking-tighter font-kodemono">NODA</strong> eliminates the "noise" of 1,000+ junk applications. We provide a pre-filtered stream of candidates mathematically aligned to your tech stack.
                </p>
            </section>

            {/* 2. Split-Feature Layout (Alternating) */}
            <section className="space-y-32 mb-32">
                {/* Feature 1 */}
                <div className="flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1">
                        <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 mb-4">Signal over Noise.</h2>
                        <p className="text-zinc-500 leading-relaxed text-xs">
                            Our AI doesn't just scan for keywords. It analyzes candidate "Nodes" against your specific project requirements, delivering only the top 5% of matches directly to your dashboard.
                        </p>
                    </div>
                    <div className="flex-1 w-full aspect-square bg-zinc-50 border border-zinc-200 rounded-[3rem] p-8 flex items-center justify-center relative overflow-hidden">
                        {/* Abstract UI representing a filtered list */}
                        <div className="space-y-4 w-full">
                            {[98, 10].map((score, i) => (
                                <div key={i} className="bg-white border border-zinc-200 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-300" />
                                        <div className="flex flex-col gap-2">
                                            <div className="h-2 w-16 bg-zinc-300 rounded" />
                                            <div className="h-2 w-12 bg-zinc-300 rounded" />
                                        </div>
                                    </div>
                                    
                                    <MatchScore score={score} key={i} />
                                       

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                    <div className="flex-1">
                        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                            <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-zinc-900 mb-4">The 14-Day Pulse.</h2>
                        <p className="text-zinc-500 leading-relaxed text-xs">
                            The Anti-Ghosting Protocol isn't just for candidates. It ensures your listings remain high-authority. By guaranteeing responses, you attract the highest-tier talent who avoid "dead" job boards.
                        </p>
                    </div>
                    <div className="flex-1 w-full aspect-square bg-zinc-900 rounded-[3rem] p-8 flex flex-col justify-center items-center text-center">
                        <div className="text-5xl font-bold text-white mb-2">14:00:00</div>
                        <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase">Response Deadline</p>
                    </div>
                </div>
            </section>

            {/* 3. The Comparison Matrix (Standard vs Noda) */}
            <section className="bg-zinc-50 border border-zinc-200 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-bold text-zinc-900 mb-8">The <strong className="text-zinc-900 tracking-tighter font-kodemono">NODA</strong> Advantage</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Legacy Boards</span>
                        <ul className="space-y-4">
                            {['Mass applications', 'Low-intent candidates', 'Zero accountability', 'Manual screening'].map((text, i) => (
                                <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-zinc-300 rounded-full" /> {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Noda Protocol</span>
                        <ul className="space-y-4">
                            {['Vector matching', 'Verified talent nodes', 'Enforced engagement', 'Automated shortlisting'].map((text, i) => (
                                <li key={i} className="text-sm text-zinc-900 font-medium flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-orange-500" /> {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}

const MatchScore = ({ score = 0 }) => {
  // Calculate the circumference for the progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 group">
      {/* Background Track - Subtle Zinc */}
      <svg className="absolute w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          fill="transparent"
          className="text-zinc-100"
        />
        {/* Progress Ring - Noda Orange */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth="2.5"
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="text-orange-500 transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* The Score Text */}
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-sm font-bold text-zinc-900 leading-none">
          {score}
        </span>
      </div>

      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 rounded-full blur-xl transition-colors duration-500"></div>
    </div>
  );
};

export default RecruiterContent;