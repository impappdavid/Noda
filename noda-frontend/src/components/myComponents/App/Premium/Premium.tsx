import { useState } from "react";
import {
  Check,
  ChevronRight,
  Zap,
  Target,
  Radio,
  Minus,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AppSideBar from "../Sidebar";
import { Button } from "@/components/ui/button";
import Navbar from "../AppNavbar";

const tablePlans = [
  {
    id: "free",
    name: "Basic",
    prices: { monthly: 0, yearly: 0, save: 0 },
    features: ["Standard AI Match %", "Limited Tracker Logs", "Verified Anonymity"],
  },
  {
    id: "premium",
    name: "Premium",
    prices: { monthly: 9.99, yearly: 99.99, save: 20 },
    popular: true,
    features: [
      "Full AI Match %",
      "Verified Anonymity",
      "Priority Status",
      "Advanced Job Tracker Logs",
      "Unlimited Matching",
    ],
  },
  {
    id: "recruiter",
    name: "Recruiter",
    prices: { monthly: 79.99, yearly: 599.99, save: 359 },
    features: [
      "Ghost-Buster Badge",
      "Unlimited Matching",
      "Smart Filtering",
      "Direct Integration",
      "14-Day Protection",
      "Priority Support",
      "Full AI Match %",
    ],
  },
  {
    id: "business",
    name: "Business",
    prices: { monthly: 199.99, yearly: 1499.99, save: 889 },
    features: [
      "CEO Analytics",
      "Ghost-Buster Badge",
      "All Team Seats",
      "Reputation Score",
      "Bulk Delisting",
      "Full AI Match %",
      "Unlimited Matching",
      "Priority Support",
    ],
  },
];

const cardPlans = tablePlans.filter((p) => p.id !== "free");

const allFeatures = [
  { label: "Standard AI Match %", key: "Standard AI Match %" },
  { label: "Full AI Match Percentage", key: "Full AI Match %" },
  { label: "Verified Anonymity Mode", key: "Verified Anonymity" },
  { label: "Priority Application Status", key: "Priority Status" },
  { label: "Limited Tracker Logs", key: "Limited Tracker Logs" },
  { label: "Advanced Job Tracker Logs", key: "Advanced Job Tracker Logs" },
  { label: "Ghost-Buster Trust Badge", key: "Ghost-Buster Badge" },
  { label: "Unlimited AI Matching", key: "Unlimited Matching" },
  { label: "Smart Filtering & Search", key: "Smart Filtering" },
  { label: "Direct Calendar Integration", key: "Direct Integration" },
  { label: "CEO Analytics Dashboard", key: "CEO Analytics" },
];

const PremiumPage = () => {
  const [selected, setSelected] = useState("premium");
  const [billing, setBilling] = useState("monthly");

  // Helper to get active price for the button
  const activePlan = tablePlans.find((p) => p.id === selected);
  const activePrice = billing === "monthly" ? activePlan?.prices.monthly : activePlan?.prices.yearly;

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 relative">
        <aside className="w-25 shrink-0 relative">
          <div className="sticky top-12 h-fit py-4">
            <AppSideBar />
          </div>
        </aside>

        <main className="flex flex-1 border-x mt-12 border-zinc-300 bg-white overflow-y-auto scrollbar-hide font-mono flex flex-col">
          {/* SLIM TERMINAL HEADER */}
          <div className="border-b border-zinc-300 px-2 py-2 flex justify-between items-center bg-zinc-50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest">
                Pricing
              </span>
            </div>

            <div className="flex bg-zinc-200 p-0.5 border border-zinc-300">
              {["monthly", "yearly"].map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={cn(
                    "px-4 py-1 text-[9px] font-bold uppercase cursor-pointer transition-none rounded-none",
                    billing === type
                      ? "bg-blue-500 text-white"
                      : "text-zinc-500 hover:text-zinc-900",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="">
            {/* COMPACT SELECTION RACK */}
            <div className="grid grid-cols-3 divide-x divide-zinc-300">
              {cardPlans.map((plan) => {
                const isActive = selected === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelected(plan.id)}
                    className={cn(
                      "p-3 transition-all cursor-pointer relative rounded-none flex flex-col items-center justify-center text-center",
                      isActive
                        ? "border-zinc-900 bg-zinc-800 text-white"
                        : "border-zinc-200 hover:border-zinc-400",
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-blue-500 text-white text-[9px] font-bold uppercase flex items-center gap-1">
                        <Star size={12} fill="white" /> Popular
                      </div>
                    )}
                    <span className="text-[10px] font-black uppercase tracking-tight ">
                      {plan.name}
                    </span>
                    
                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline gap-1">
                        {billing === "yearly" && (
                          <span className="text-[10px] line-through opacity-50 font-bold">
                            ${(plan.prices.monthly * 12).toFixed(2)}
                          </span>
                        )}
                        <span className="text-lg font-bold">
                          ${billing === "monthly"
                            ? plan.prices.monthly
                            : plan.prices.yearly}
                        </span>
                        <span className="text-[10px] opacity-100">
                          /{billing === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      
                      {billing === "yearly" && (
                        <span className="text-[9px] font-black text-orange-500 uppercase mt-0.5">
                          Save ${plan.prices.save}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* HIGH-DENSITY COMPARISON MATRIX */}
            <div className="border-y border-zinc-300">
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="border-b border-zinc-300 bg-zinc-50">
                    <th className="p-2 text-[10px] font-bold uppercase border-r border-zinc-300 w-1/3">
                      Features
                    </th>
                    {tablePlans.map((plan) => (
                      <th
                        key={plan.id}
                        onClick={() => setSelected(plan.id)}
                        className={cn(
                          "p-2 text-[10px] font-bold uppercase text-center border-r border-zinc-300 cursor-pointer",
                          selected === plan.id
                            ? "bg-blue-500 text-white"
                            : "text-zinc-500 hover:bg-zinc-100",
                        )}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-300">
                  {allFeatures.map((feature, idx) => (
                    <tr key={idx} className="group">
                      <td className="p-2 text-[10px] font-bold text-zinc-500 uppercase border-r border-zinc-300 bg-zinc-50/20 group-hover:bg-zinc-200">
                        {feature.label}
                      </td>
                      {tablePlans.map((plan) => {
                        const hasFeature = plan.features.includes(feature.key);
                        return (
                          <td
                            key={plan.id}
                            className={cn(
                              "p-2 text-center border-r border-zinc-300",
                              selected === plan.id && "bg-blue-50/30",
                            )}
                          >
                            {hasFeature ? (
                              <Check
                                size={12}
                                className={cn(
                                  "mx-auto",
                                  selected === plan.id
                                    ? "text-blue-600"
                                    : "text-zinc-900",
                                )}
                                strokeWidth={4}
                              />
                            ) : (
                              <Minus
                                size={10}
                                className="mx-auto text-zinc-400"
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MINIMALIST ACTION BAR */}
          <div className="mt-auto border-t border-zinc-300 flex items-center justify-between bg-white sticky bottom-0">
            <div className="flex items-center gap-3 p-1">
              <ShieldCheck className="w-5 h-5 text-zinc-900" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-zinc-900 uppercase">
                  Status: Ready
                </span>
                <span className="text-[10px] text-zinc-700 font-semibold uppercase">
                  {selected} Plan Selected
                </span>
              </div>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-none h-10 px-8 text-[12px] font-bold flex items-center uppercase tracking-[0.1em] border-none transition-all">
              ${activePrice?.toFixed(2)} PAY 
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PremiumPage;