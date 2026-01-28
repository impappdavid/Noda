import { Button } from '@/components/ui/button';
import { Box, Sparkles, ShieldCheck } from 'lucide-react';

const ChangelogContent = () => {
  const updates = [
    {
      version: "v1.0.0-beta",
      date: "Jan 28, 2026",
      title: "Initial Protocol Deployment",
      description: "The core Noda engine is live. Establishing the first set of talent nodes and recruiter tunnels.",
      tags: ["Core", "Major"],
      icon: <Box className="w-4 h-4" />
    },
    {
      version: "v0.9.4",
      date: "Jan 20, 2026",
      title: "Vector Matching Optimization",
      description: "Refined the mathematical proximity algorithm. Matching precision increased by 14% for engineering roles.",
      tags: ["AI", "Optimization"],
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      version: "v0.9.2",
      date: "Jan 12, 2026",
      title: "Anti-Ghosting Enforcement",
      description: "Activated the 14-day automated delisting protocol for inactive recruiter listings.",
      tags: ["Security", "Policy"],
      icon: <ShieldCheck className="w-4 h-4" />
    }
  ];

  return (
    <main className="flex-1 max-w-xl pb-20">
      <header className="mb-12">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 mb-2">Changelog</h1>
        <p className="text-sm text-zinc-600">Documenting the evolution of the Noda intelligence layer.</p>
      </header>

      <div className="relative">
        {/* The Vertical Line */}
        <div className="absolute left-[11px] top-2 bottom-0 w-[1px] bg-zinc-100"></div>

        <div className="space-y-12">
          {updates.map((update, i) => (
            <div key={i} className="relative pl-10 group">
              {/* Timeline Node */}
              <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border border-zinc-200 bg-white flex items-center justify-center z-10 group-hover:border-orange-500 transition-colors">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 group-hover:bg-orange-500 transition-colors"></div>
              </div>

              {/* Update Content */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    {update.date}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-[10px] font-mono text-zinc-600">
                    {update.version}
                  </span>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-100 bg-white hover:border-zinc-200 transition-all shadow-sm">
                  <div className="mt-1 p-2 bg-zinc-50 rounded-lg text-zinc-500 group-hover:text-zinc-900 transition-colors">
                    {update.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 mb-1">{update.title}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                      {update.description}
                    </p>
                    <div className="flex gap-2">
                      {update.tags.map((tag, j) => (
                        <span key={j} className="text-[9px] text-zinc-500 font-medium">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Proof/Action */}
      <div className="mt-20 p-8 rounded-3xl bg-zinc-800 text-center">
        <h4 className="text-white font-bold mb-2">Build in Public</h4>
        <p className="text-zinc-500 text-xs mb-6">Follow the development of Noda on X and Discord.</p>
        <div className="flex justify-center gap-4">
          <Button className="px-4 py-2 bg-white text-zinc-900 rounded-xl text-[10px] font-bold hover:bg-zinc-200 transition-colors cursor-pointer">
            Follow on X
          </Button>
          <Button className="px-4 py-2 bg-[#5865F2] text-zinc-300 rounded-xl text-[10px] font-bold hover:bg-[#5865F8] transition-colors cursor-pointer">
            Discord
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ChangelogContent;