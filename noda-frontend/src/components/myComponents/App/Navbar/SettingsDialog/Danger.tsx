import { AlertTriangle, ShieldAlert } from "lucide-react";

const DangerZone = () => {
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "// CRITICAL WARNING: DESTROY ALL PROFILE INDEX NODES AND LOG RECORDS PERMANENTLY? THIS TRANSACTION IS IRREVERSIBLE."
    );
    if (confirmDelete) {
      console.log("Identity purged.");
    }
  };

  return (
    <div className=" font-mono text-[11px] text-zinc-800 animate-in fade-in duration-100">
      <div className="py-1 px-2 text-red-500 uppercase bg-red-500/10">
          Delete Account
        </div>

      {/* Upgraded layout with a clean inner alert track and subtle warning tones */}
      <div className="border-b border-red-200/60 bg-linear-to-br from-red-50/10 to-transparent p-3 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        
        {/* Subtle geometric structural side-mark */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/2 rotate-45 pointer-events-none translate-x-12 -translate-y-12" />

        <div className="flex items-start gap-3 max-w-xl">
          <div className="p-1 bg-red-50 border border-red-100 text-red-600 mt-0.5 shrink-0 select-none">
            <ShieldAlert size={12} />
          </div>
          
          {/* Destructive Context Info */}
          <div className="space-y-0.5">
            <span className="font-bold text-[10px] uppercase block text-red-950 tracking-tight">
              De-register Identity Profile Node
            </span>
            <p className="text-[9.5px] text-zinc-400 font-sans leading-tight normal-case">
              Instantly purge your credential logs, active career telemetry pipelines, historical registry data, and system tracking indexing maps. <span className="text-red-700/80 font-medium font-mono text-[9px] block pt-0.5 uppercase tracking-wide">// This operation is irreversible.</span>
            </p>
          </div>
        </div>

        {/* High-contrast contextual trigger layout */}
        <div className="shrink-0 self-start md:self-center z-10">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="h-6.5 px-3 border border-red-200 bg-white hover:bg-red-600 text-red-600 hover:text-white font-bold uppercase text-[9px] tracking-wider transition-all duration-100 cursor-pointer flex items-center gap-1.5 rounded-none active:scale-[0.98]"
          >
            <AlertTriangle size={10} className="shrink-0" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;