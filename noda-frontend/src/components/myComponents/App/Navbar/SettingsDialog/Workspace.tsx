import {
  DollarSign,
  CheckSquare,
  Square,
  ChevronUp,
  ChevronDown,
  Building2,
} from "lucide-react";
import { useState } from "react";

const Workspace = () => {
  // Core operational variables
  const [minSalary, setMinSalary] = useState(185000);
  const [workModels, setWorkModels] = useState<{ [key: string]: boolean }>({
    REMOTE: true,
    HYBRID: false,
    ONSITE: false,
  });

  const toggleModel = (model: string) => {
    setWorkModels((prev) => ({
      ...prev,
      [model]: !prev[model],
    }));
  };

  const adjustSalary = (amount: number) => {
    setMinSalary((prev) => Math.max(0, prev + amount));
  };

  return (
    <div className=" animate-in fade-in duration-100 font-mono text-[11px] text-zinc-800">
      {/* MATRIX SEGMENT 1: IDENTITY HANDSHAKE LOG */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Current Company
        </div>

        {/* Company Node flattened row: matches the 2-input section structural layout exactly */}
        <div className="border border-zinc-200 bg-white p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Front-aligned identity stack */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Front Company Logo: Flat, clean, non-bulky box */}
            <div className="w-8 h-8 bg-zinc-950 text-white font-black flex items-center justify-center text-[13px] tracking-tighter shrink-0 select-none border border-zinc-800">
              S
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-zinc-950 text-[10px] uppercase block truncate">
                  Stripe Inc.
                </span>
                <span className="text-[9px] text-zinc-400 font-normal uppercase tracking-tight">
                  (Joined Q3 2024)
                </span>
                <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold px-1 text-[7px] tracking-tight">
                  VERIFIED_NODE
                </span>
              </div>
              <span className="text-[9.5px] text-zinc-500 block uppercase tracking-tight truncate">
                L6 Staff Systems Architect{" "}
                <span className="text-zinc-200 mx-0.5">•</span>{" "}
                internal.stripe.routing
              </span>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-end shrink-0">
            <button
              type="button"
              className="h-7 px-2.5 border border-zinc-200 hover:border-red-200 text-red-600 hover:bg-red-500/20 text-[9px] font-bold uppercase tracking-tight transition-colors rounded-none cursor-pointer select-none"
            >
              Leave 
            </button>
          </div>
        </div>
      </div>

      {/* MATRIX SEGMENT 2: FIELD CONSTRAINTS ARRAY */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Matching Informations
        </div>

        <div className="border-b border-zinc-200 divide-y divide-zinc-200 bg-white">
          {/* Row 1: Compensation Input */}
          <div className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">
                Target Compensation Floor
              </span>
              <span className="text-[9px] text-zinc-400 block uppercase tracking-tight">
                Minimum entry requirement baseline value (USD)
              </span>
            </div>

            {/* Flat Inline Numeric Container */}
            <div className="relative flex items-center w-full sm:w-48 h-7 border border-zinc-200 focus-within:border-zinc-400 transition-colors bg-zinc-50/30">
              <DollarSign
                size={11}
                className="text-zinc-400 ml-2 mr-0.5 shrink-0"
              />
              <input
                type="text"
                value={minSalary.toLocaleString()}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/,/g, "")) || 0;
                  setMinSalary(val);
                }}
                className="w-full text-[11px] font-bold outline-none bg-transparent text-zinc-900 tracking-tight pr-8"
              />

              {/* Stepper Adjust Layer */}
              <div className="absolute right-0 top-0 bottom-0 flex border-l border-zinc-200 bg-zinc-50 divide-x divide-zinc-200 shrink-0">
                <button
                  type="button"
                  onClick={() => adjustSalary(-5000)}
                  className="px-1.5 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors"
                >
                  <ChevronDown size={10} strokeWidth={3} />
                </button>
                <button
                  type="button"
                  onClick={() => adjustSalary(5000)}
                  className="px-1.5 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors"
                >
                  <ChevronUp size={10} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Structural Models Checkbox Array */}
          <div className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-950 text-[10px] uppercase block">
                Preferred Structural Models
              </span>
              <span className="text-[9px] text-zinc-400 block uppercase tracking-tight">
                Permitted employment architecture configurations
              </span>
            </div>

            {/* Matrix Layout Filter Row */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {Object.keys(workModels).map((model) => {
                const isActive = workModels[model];
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => toggleModel(model)}
                    className={`h-7 px-2.5 border text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer rounded-none flex items-center gap-1.5 ${
                      isActive
                        ? "border-zinc-950 bg-zinc-950 text-white font-black"
                        : "border-zinc-200 hover:border-zinc-300 bg-white text-zinc-500"
                    }`}
                  >
                    <div className="shrink-0">
                      {isActive ? (
                        <CheckSquare size={10} className="stroke-[3]" />
                      ) : (
                        <Square
                          size={10}
                          className="text-zinc-300 stroke-[2]"
                        />
                      )}
                    </div>
                    <span>{model}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
