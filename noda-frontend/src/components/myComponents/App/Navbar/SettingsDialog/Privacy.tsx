import { EyeOff } from "lucide-react";
import { useState } from "react";

const Privacy = () => {
  // Granular State Toggles
  const [stealthMode, setStealthMode] = useState(true);
  const [hideVotes, setHideVotes] = useState(false);
  const [maskFootprints, setMaskFootprints] = useState(true);
  const [hideSalary, setHideSalary] = useState(false);
  const [blockAgency, setBlockAgency] = useState(false);
  const [restrictDms, setRestrictDms] = useState(false);

  return (
    <div className=" animate-in fade-in duration-100 font-mono text-[11px] text-zinc-800">
      
      {/* SECTION 1: CRITICAL INTRUSION FILTER (STEALTH) */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Visibility Filter
        </div>
        
        <div className={`p-2.5 flex items-center justify-between rounded-none transition-colors ${
          stealthMode ? " bg-red-50/20" : " bg-white"
        }`}>
          <div className="space-y-0.5 max-w-[80%]">
            <span className={`font-bold uppercase text-[10px] flex items-center gap-1.5 ${stealthMode ? "text-red-950" : "text-zinc-950"}`}>
              <EyeOff size={12} className={stealthMode ? "text-red-600" : "text-zinc-400"} /> 
              Current Employer Stealth Cloak
            </span>
            <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">
              Completely block out your profile metrics, active domain links, and match updates if a viewing node matches your current verified company <span className="text-zinc-700 font-bold">(stripe.com)</span>.
            </p>
          </div>

          {/* Switch Component */}
          <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 rink-0 ml-3">
            <input
              type="checkbox"
              checked={stealthMode}
              onChange={() => setStealthMode(!stealthMode)}
              className="peer sr-only"
            />
            <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
          </label>
        </div>
      </div>

      {/* SECTION 2: GRANULAR NETWORKING & PLACEMENT PARAMETERS */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Profile Activity
        </div>

        <div className="border-b border-zinc-300 divide-y divide-zinc-300 bg-white">
          
          {/* Row 1: Network voting */}
          <div className="p-2.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">Anonymous Community Stance</span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">Hide network identity context and user nodes during public workspace vote operations.</p>
            </div>
            
            <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 shrink-0">
              <input
                type="checkbox"
                checked={hideVotes}
                onChange={() => setHideVotes(!hideVotes)}
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>

          {/* Row 2: Footprints */}
          <div className="p-2.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">Mask Candidate Footprints</span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">Suppress log entries and view metrics when indexing or reading enterprise panel assessments.</p>
            </div>
            
            <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 shrink-0">
              <input
                type="checkbox"
                checked={maskFootprints}
                onChange={() => setMaskFootprints(!maskFootprints)}
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>

          {/* Row 3: Salary Expectation Visibility */}
          <div className="p-2.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">Restrict Floor Compensation Value</span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">Only reveal target compensation numbers to confirmed interview loops. Keep hidden from general search queries.</p>
            </div>
            
            <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 shrink-0">
              <input
                type="checkbox"
                checked={hideSalary}
                onChange={() => setHideSalary(!hideSalary)}
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>

          {/* Row 4: Third-Party Agency Filter */}
          <div className="p-2.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">Filter Out Contingent Recruiters</span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">Limit matchmaking index passes exclusively to direct, in-house corporate engineering talent nodes.</p>
            </div>
            
            <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 shrink-0">
              <input
                type="checkbox"
                checked={blockAgency}
                onChange={() => setBlockAgency(!blockAgency)}
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>

          {/* Row 5: DM Restrictions */}
          <div className="p-2.5 flex items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-[80%]">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">Inbound DM Handshake Guard</span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">Block unsolicited connection message frames unless a viewer node presents a matching node application requirement stack.</p>
            </div>
            
            <label className="relative inline-block h-5 w-7.5 cursor-pointer rounded-full bg-zinc-200 transition [-webkit-tap-highlight-color:transparent] has-checked:bg-blue-500 shrink-0">
              <input
                type="checkbox"
                checked={restrictDms}
                onChange={() => setRestrictDms(!restrictDms)}
                className="peer sr-only"
              />
              <span className="absolute inset-y-0 start-0 m-1 size-3 rounded-full ring-inset ring-white transition-all peer-checked:start-3.5 bg-zinc-500 peer-checked:w-1.5 peer-checked:bg-white peer-checked:ring-transparent"></span>
            </label>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Privacy;