import { useState } from "react";
import { Check } from "lucide-react";

const Integrations = () => {
  const [googleConnected, setGoogleConnected] = useState(true);
  const [githubConnected, setGithubConnected] = useState(false);

  return (
    <div className=" animate-in fade-in duration-100 font-mono text-[11px]">
      <div className="">
        {/* Section Header Banner */}
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
            Integrations List
          </div>

        {/* 2-Column Squared Card Grid Layout */}
        <div className="grid grid-cols-2 ">
          {/* Card 1: Google */}
          <div className="border-r border-b border-zinc-200 bg-white p-2 flex flex-col justify-between h-fit transition-colors hover:border-zinc-300">
            <div className="space-y-2.5">
              {/* Header inside card matching reference schema */}
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 bg-amber-500/10 border border-amber-500/20 text-amber-600 font-bold flex items-center justify-center text-[11px]">
                  G
                </div>

                {/* Connection Action Button Trigger */}
                <button
                  type="button"
                  onClick={() => setGoogleConnected(!googleConnected)}
                  className={`px-2.5 py-0.5 text-[9px] font-bold uppercase transition-all cursor-pointer rounded-none border ${
                    googleConnected
                      ? "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  {googleConnected ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Text Info Parameter Stack */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900 text-xs uppercase tracking-tight">
                    Google
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans leading-tight">
                  Syncs write-access scopes for workspace pipeline calendar
                  integrations automatically.
                </p>
              </div>
            </div>

            {/* Bottom Panel Status Banner */}
          </div>

          {/* Card 2: GitHub */}
          <div className="border-b border-zinc-200 bg-white p-2 flex flex-col justify-between h-fit transition-colors hover:border-zinc-300">
            <div className="space-y-2.5">
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 bg-zinc-900 text-white font-bold flex items-center justify-center text-[10px]">
                  Git
                </div>

                {/* Connection Action Button Trigger */}
                <button
                  type="button"
                  onClick={() => setGithubConnected(!githubConnected)}
                  className={`px-2.5 py-0.5 text-[9px] font-bold uppercase transition-all cursor-pointer rounded-none border ${
                    githubConnected
                      ? "border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50"
                      : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  {githubConnected ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Text Info Parameter Stack */}
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-zinc-900 text-xs uppercase tracking-tight">
                    GitHub
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 font-sans leading-tight">
                  Inspects repository markers to update algorithmic candidate
                  matching metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
