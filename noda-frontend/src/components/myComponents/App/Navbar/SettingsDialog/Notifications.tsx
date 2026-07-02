import { AlertTriangle, Mail, Monitor } from "lucide-react";
import { useState } from "react";

const Notifications = () => {
  // Notification routing matrices
  const [notifyMatrix, setNotifyMatrix] = useState<{
    [key: string]: { email: boolean; inapp: boolean };
  }>({
    appUpdates: { email: true, inapp: true },
    directMessages: { email: false, inapp: true },
    socialEngagement: { email: false, inapp: true },
    marketAdjustments: { email: true, inapp: false },
    headhunterPings: { email: false, inapp: true },
    indexPasses: { email: false, inapp: true },
    recruiterDeadlines: { email: true, inapp: true },
  });

  const toggleNotify = (rowKey: string, channel: "email" | "inapp") => {
    setNotifyMatrix((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [channel]: !prev[rowKey][channel],
      },
    }));
  };

  const eventRows = [
    {
      key: "appUpdates",
      title: "Pipeline Progression Updates",
      desc: "Application shifts to reviewed, interviewed, or state-bound offer conditions.",
    },
    {
      key: "directMessages",
      title: "Direct Stream Messaging",
      desc: "Inbound message queries initialized by direct platform communication nodes.",
    },
    {
      key: "socialEngagement",
      title: "Feed Engagement Actions",
      desc: "Mentions, endorsements, or conversation updates on public network indexes.",
    },
    {
      key: "marketAdjustments",
      title: "Upstream Salary Adjustments",
      desc: "Real-time shifts in average market compensation baselines for your saved role tiers.",
    },
    {
      key: "headhunterPings",
      title: "Unsolicited Headhunter Pings",
      desc: "Inbound discovery lookups matching your target floor compensation parameters.",
    },
    {
      key: "indexPasses",
      title: "Profile Index Pass Logs",
      desc: "Telemetry notifications when a verified corporate recruiter runs a search scan over your profile node.",
    },
    {
      key: "recruiterDeadlines",
      title: "Recruiter Service Deadlines",
      desc: "Active structural warnings for critical response rates and interview response boundaries.",
      isAlert: true,
    },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-100 font-mono text-[11px] text-zinc-800">
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Notification Settings
        </div>

        {/* Flat, stacked row system matching the 2-input design parameters */}
        <div className="border border-zinc-200 divide-y divide-zinc-200 bg-white">
          {eventRows.map((row) => (
            <div
              key={row.key}
              className={`p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                row.isAlert ? "bg-amber-50/10" : ""
              }`}
            >
              {/* Left Side: Context labels - Now allows normal line wrapping */}
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  {row.isAlert && (
                    <AlertTriangle size={11} className="text-amber-600 shrink-0" />
                  )}
                  <span className={`font-bold text-[10px] uppercase block ${row.isAlert ? "text-amber-900" : "text-zinc-950"}`}>
                    {row.title}
                  </span>
                </div>
                {/* Replaced truncate with line-clamp-2 to avoid clipping long explanations */}
                <p className="text-[9.5px] text-zinc-400 font-sans leading-tight line-clamp-2 max-w-xl">
                  {row.desc}
                </p>
              </div>

              {/* Right Side: Inline Switch Modules with vertical divider layout */}
              <div className="flex items-center gap-4 sm:border-l sm:border-zinc-100 sm:pl-4 shrink-0 sm:h-7">
                
                {/* Email Option */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-zinc-400 uppercase tracking-tight font-bold flex items-center gap-1 select-none">
                    <Mail size={10} /> Mail
                  </span>
                  <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500">
                    <input
                      type="checkbox"
                      checked={notifyMatrix[row.key].email}
                      onChange={() => toggleNotify(row.key, "email")}
                      className="peer sr-only"
                    />
                    <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
                  </label>
                </div>

                {/* In-App Option */}
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-zinc-400 tracking-tight uppercase font-bold flex items-center gap-1 select-none">
                    <Monitor size={10} /> App
                  </span>
                  <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500">
                    <input
                      type="checkbox"
                      checked={notifyMatrix[row.key].inapp}
                      onChange={() => toggleNotify(row.key, "inapp")}
                      className="peer sr-only"
                    />
                    <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
                  </label>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;