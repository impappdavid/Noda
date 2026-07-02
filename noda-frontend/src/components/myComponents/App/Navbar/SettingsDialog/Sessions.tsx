import {
  Monitor,
  Smartphone,
  Terminal,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const Session = () => {
  const [sessions, setSessions] = useState([
    {
      id: "sess_02",
      device: "Mobile Access Cluster",
      os: "iOS 17.5.1 // Safari WebKit",
      ip: "84.2.114.90",
      location: "London, UK",
      time: "Active 2h past",
      type: "mobile",
      gridX: 45,
      gridY: 35,
    },
    {
      id: "sess_03",
      device: "Backup Core Runtime",
      os: "Linux Kernel 6.1 // Curl",
      ip: "104.22.4.12",
      location: "Frankfurt, DE",
      time: "Active 1d past",
      type: "terminal",
      gridX: 55,
      gridY: 42,
    },
    {
      id: "sess_04",
      device: "iPad Staging Node",
      os: "iPadOS 17.4 // Chrome iOS",
      ip: "185.45.22.81",
      location: "Paris, FR",
      time: "Active 3d past",
      type: "mobile",
      gridX: 49,
      gridY: 48,
    },
    {
      id: "sess_05",
      device: "CI/CD Deployment Runner",
      os: "Ubuntu 22.04 // GitHub Action",
      ip: "52.14.29.110",
      location: "Ashburn, US",
      time: "Active 6d past",
      type: "terminal",
      gridX: 30,
      gridY: 52,
    },
    {
      id: "sess_06",
      device: "Dev Workspace Mirror",
      os: "Windows 11 // WSL2 Ubuntu",
      ip: "192.178.2.44",
      location: "Budapest, HU",
      time: "Active 1w past",
      type: "terminal",
      gridX: 62,
      gridY: 38,
    },
  ]);

  const handleGlobalLogout = () => {
    setSessions([]);
  };

  return (
    <div className="flex flex-col font-mono text-[11px] text-zinc-800 animate-in fade-in duration-100 h-151 justify-between">
      {/* MATRIX WRAPPER WITH FIXED SCROLL WINDOW BOUNDS */}
      <div className="flex-1 overflow-y-auto min-h-0 ">
        {/* CURRENT CLIENT NODE HEADER PANEL */}
        <div className="">
          <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
            Current Device
          </div>
          <div className=" p-2 bg-zinc-50/50 flex items-center justify-between relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
            <div className="flex items-center gap-2.5 pl-1">
              <Monitor size={16} className="text-zinc-700" />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-zinc-950 uppercase text-[10px]">
                    Current Workspace
                  </span>
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                </div>
                <p className="text-[9.5px] text-zinc-500">
                  macOS • Chrome Canary{" "}
                  <span className="text-zinc-300 mx-1">|</span> IP:
                  194.22.102.14 (Budapest, HU)
                </p>
              </div>
            </div>
            <ShieldCheck size={14} className="text-emerald-600/40 mr-1" />
          </div>
        </div>

        {/* SYSTEM REGISTRY DENSE MATRIX ROW ENGINE */}
        <div className="">
          <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
            Logged In devices ({sessions.length})
          </div>

          {sessions.length > 0 ? (
            <div className="border border-zinc-200 divide-y divide-zinc-300 bg-white">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="flex items-center justify-between p-2 hover:bg-zinc-50/60 transition-colors group relative h-14"
                >
                  {/* LEFT DETAILS AREA */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="text-zinc-400 group-hover:text-zinc-700 transition-colors shrink-0">
                      {sess.type === "mobile" ? (
                        <Smartphone size={16} />
                      ) : (
                        <Terminal size={16} />
                      )}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-900 text-[10px] uppercase truncate">
                          {sess.device}
                        </span>
                        <span className="text-[8px] text-zinc-500 uppercase tracking-tighter">
                          ({sess.time})
                        </span>
                      </div>
                      <p className="text-[9.5px] text-zinc-400 font-mono truncate max-w-60">
                        {sess.os}{" "}
                        <span className="text-zinc-200 mx-0.5">•</span>{" "}
                        <span className="text-zinc-500">{sess.ip}</span>
                      </p>
                    </div>
                  </div>

                  {/* RIGHT MAP VISUALIZATION ZONE (STAYS FULLY VISIBLE) */}
                  <div className="relative w-28 h-10 border border-zinc-300 overflow-hidden bg-zinc-200/40 shrink-0 select-none mr-2">
                    {/* Native Static Text View Matrix Coordinates */}
                    <div className="absolute inset-0 flex flex-col justify-between p-1 z-10">
                      <span className="text-[7px] text-zinc-500 uppercase leading-none font-sans font-bold">
                        {sess.location}
                      </span>
                      <span className="text-[6.5px] text-zinc-400 font-mono tracking-tighter leading-none">
                        G: {sess.gridX}N/{sess.gridY}E
                      </span>
                    </div>

                    {/* Highly Magnified Vector Grid Map Tracing Layer */}
                    <div className="absolute inset-0 scale-[3.5] origin-center opacity-[0.06] text-zinc-950 pointer-events-none">
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 100 50"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M10,15 L25,12 L30,22 L20,35 L12,28 Z M45,20 L60,15 L70,25 L55,35 L40,28 Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    {/* Small map anchor location dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
                  </div>

                  {/* ACTION TRIGGER BUTTON: Controlled by `group-hover:opacity-100` */}
                  <div className="w-18 shrink-0 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setSessions((prev) =>
                          prev.filter((s) => s.id !== sess.id),
                        )
                      }
                      className=" transition-all duration-150 border border-zinc-200 hover:border-red-200 hover:text-red-600 bg-white px-2 py-1 text-[8.5px] font-black uppercase tracking-tight rounded-none cursor-pointer flex items-center gap-1 select-none shadow-3xs"
                    >
                      <LogOut size={8} className="stroke-[2.5]" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-zinc-200 border-dashed p-4 text-center text-zinc-400 text-[10px] uppercase font-bold bg-zinc-50/30">
              No alternative active nodes in scope.
            </div>
          )}
        </div>
      </div>

      {/* FIXED BOTTOM CRITICAL ACTIONS AREA */}
      {sessions.length > 0 && (
        <div className="pt-2 bg-white shrink-0">
          <button
            type="button"
            onClick={handleGlobalLogout}
            className="w-full h-7 bg-red-500/20 text-red-700 border border-red-500/50 text-[9px] font-bold uppercase tracking-wide hover:bg-red-500/30 hover:text-red-800 hover:border-red-300 transition-all rounded-none cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Log Out of All Other Sessions ({sessions.length})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Session;
