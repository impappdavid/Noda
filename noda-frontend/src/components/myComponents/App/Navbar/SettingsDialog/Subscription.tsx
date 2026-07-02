import {
  CreditCard,
  ShieldCheck,
  Download,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

const Billing = () => {
  const [hasSubscription, setHasSubscription] = useState(true);

  const invoices = [
    {
      id: "INV-9082",
      date: "2026-05-01",
      amount: "$24.00",
      channel: "STRIPE_CRD",
      tier: "PRO",
      status: "PAID",
    },
    {
      id: "INV-8421",
      date: "2026-04-01",
      amount: "$24.00",
      channel: "STRIPE_CRD",
      tier: "PRO",
      status: "PAID",
    },
    {
      id: "INV-7904",
      date: "2026-03-01",
      amount: "$24.00",
      channel: "STRIPE_CRD",
      tier: "PRO",
      status: "PAID",
    },
  ];

  const handleCancelSubscription = () => {
    const confirmCancel = window.confirm(
      "// WARNING: TERMINATE STEALTH METRICS LOOP PROVISIONING?",
    );
    if (confirmCancel) {
      setHasSubscription(false);
    }
  };

  return (
    <div className=" animate-in fade-in duration-100 font-mono text-[11px] text-zinc-800">
      {/* SECTION 1: ACCOUNT METRICS & SUBSECTION VIEW PROMOTIONS */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Active Subscription
        </div>

        <div className="border border-zinc-200 divide-y divide-zinc-200 bg-white">
          {/* Active Metadata Strip */}
          <div className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold uppercase text-[10px] flex items-center gap-1.5 text-zinc-950">
                <ShieldCheck
                  size={12}
                  className={
                    hasSubscription ? "text-blue-600" : "text-zinc-400"
                  }
                />
                Current Tier:{" "}
                {hasSubscription
                  ? "Market Pro Node Access"
                  : "Anonymous Sandbox"}
              </span>
              <p className="text-[9.5px] text-zinc-500 font-sans leading-tight">
                {hasSubscription ? (
                  <>
                    Cycle renews on{" "}
                    <span className="text-zinc-700 font-bold">
                      June 01, 2026
                    </span>{" "}
                    via Stripe terminal pipeline. Total value:{" "}
                    <span className="text-zinc-700 font-bold">$24.00/mo</span>.
                  </>
                ) : (
                  <>
                    No commercial agreements found. Active profiles operating
                    under base baseline query throttling rules.
                  </>
                )}
              </p>
            </div>

            {hasSubscription && (
              <div className="flex items-center gap-1.5 shrink-0 select-none">
                <div className="border border-zinc-100 px-2 py-1 bg-zinc-50 flex items-center gap-1 text-zinc-600 text-[9.5px]">
                  <CreditCard size={11} className="text-zinc-400" />
                  <span className="font-bold">•••• 4242</span>
                </div>
                <button
                  type="button"
                  className="h-6 px-2 border border-zinc-200 hover:border-zinc-300 font-bold uppercase text-[9px] cursor-pointer bg-white text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  Update
                </button>
              </div>
            )}
          </div>

          {/* SECTION 3: SYSTEM CONTEXT DISCOVERY & ISOLATED CANCEL BUTTON */}
          {hasSubscription && (
            <div className="flex justify-end ">
              <button
                type="button"
                onClick={handleCancelSubscription}
                className="h-6 px-2.5 w-full  justify-center  hover:border-red-200 bg-white text-zinc-400 hover:text-red-600 font-bold uppercase text-[9px] tracking-tight transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <AlertTriangle size={10} className="shrink-0" />
                <span>Cancel Subscription</span>
              </button>
            </div>
          )}

          {/* Integrated Blue Upgrade Banner Location */}
          <div className="bg-blue-500 p-2.5 flex items-center justify-between transition-colors hover:bg-blue-600/90">
            <div className="space-y-0.5 text-white">
              <span className="font-bold text-[9.5px] uppercase block tracking-wide">
                Examine Platform Capabilities & Tier Matrices
              </span>
              <p className="text-[9px] text-blue-50 font-sans leading-tight">
                Review comparative tier statistics, enterprise deployment loops,
                and high-frequency index matching pricing structures.
              </p>
            </div>

            <button
              type="button"
              className="h-5.5 px-2 bg-white hover:bg-zinc-50 text-blue-900 text-[8.5px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 shrink-0 ml-3"
            >
              <span>View Plans</span>
              <ArrowUpRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: INVOICE TRANSACTION EXTENDED ARRAYS */}
      <div className="">
        <div className="py-1 px-2 text-zinc-500 uppercase bg-zinc-200">
          Billing history
        </div>

        <div className="border border-zinc-200 bg-white divide-y divide-zinc-200 overflow-x-auto">
          <table className="w-full border-collapse text-left font-mono text-[9px] min-w-127.5">
            <thead>
              <tr className="bg-zinc-50/70 border-b border-zinc-200 text-zinc-400 font-bold select-none">
                <th className="p-2 uppercase tracking-tight">ID</th>
                <th className="p-2 uppercase tracking-tight">Timestamp</th>
                <th className="p-2 uppercase tracking-tight">Plan</th>
                <th className="p-2 uppercase tracking-tight text-right">
                  Amount
                </th>
                <th className="p-2 uppercase tracking-tight text-center w-24">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700 text-[10px]">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-zinc-50/40 transition-colors font-bold"
                >
                  <td className="p-2 font-mono text-zinc-950">{inv.id}</td>
                  <td className="p-2 font-mono text-zinc-400 font-normal">
                    {inv.date}
                  </td>
                  <td className="p-2">
                    <span className="border border-zinc-100 bg-blue-500 px-1 py-0.5 text-[8.5px] text-white font-bold uppercase">
                      {inv.tier}
                    </span>
                  </td>

                  <td className="p-2 text-right text-zinc-950 font-black">
                    {inv.amount}
                  </td>
                  <td className="p-2 text-center align-middle">
                    <div className="flex items-center justify-center gap-2 select-none">
                      <span className="text-[8px] border border-emerald-200 bg-emerald-50/40 text-emerald-800 font-bold px-1.5 py-0.5 tracking-tight uppercase">
                        {inv.status}
                      </span>
                      <button
                        type="button"
                        className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                      >
                        <Download size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;
