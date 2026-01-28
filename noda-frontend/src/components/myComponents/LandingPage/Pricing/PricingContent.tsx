import { Check, X } from 'lucide-react';

const PricingProtocol = () => {
  const plans = [
    { name: "Seeker", price: "Free", desc: "For individual talent.", cta: "Join Waitlist", color: "bg-white" },
    { name: "Pro", price: "$12", desc: "For power seekers.", cta: "Reserve Pro", color: "bg-zinc-900", text: "text-white" },
    { name: "Recruiter", price: "$49", desc: "For hiring teams.", cta: "Contact Sales", color: "bg-white" }
  ];

  const features = [
    { name: "Vector Matching", seeker: true, pro: true, recruiter: true },
    { name: "Anti-Ghosting Protocol", seeker: true, pro: true, recruiter: true },
    { name: "CV AI-Tailoring", seeker: false, pro: true, recruiter: true },
    { name: "Anonymous Review Access", seeker: true, pro: true, recruiter: true },
    { name: "Priority Node Status", seeker: false, pro: true, recruiter: true },
    { name: "Unlimited Job Postings", seeker: false, pro: false, recruiter: true },
  ];

  return (
    <main className="flex-1 max-w-xl pb-20">
      {/* Page Title & Introduction */}
      <header className="mb-8">
        <h1 className="text-lg font-bold tracking-tight text-zinc-900 mb-2">Pricing Protocol</h1>
        <p className="text-xs text-zinc-500">Simple capacity tiers for every professional trajectory.</p>
      </header>

      {/* 1. Plan Cards */}
      <div className="grid grid-cols-3 gap-2 mb-10">
        {plans.map((plan, i) => (
          <div key={i} className={`${plan.color} ${plan.text || 'text-zinc-900'} border border-zinc-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm`}>
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider mb-1 opacity-70">{plan.name}</h3>
              <div className="text-xl font-bold tracking-tighter ">{plan.price}</div>
              <p className="text-xs leading-tight opacity-60 mb-4">{plan.desc}</p>
            </div>
            <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${plan.name === 'Pro' ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* 2. Feature Specification Table */}
      <div className="mb-4">
        <h3 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest mb-4">Feature Specification</h3>
        <section className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="p-4 text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">Protocol</th>
                <th className="p-4 text-center text-xs font-bold text-zinc-400">Seeker</th>
                <th className="p-4 text-center text-xs font-bold text-zinc-900">Pro</th>
                <th className="p-4 text-center text-xs font-bold text-zinc-400">Recruiter</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 text-[11px] font-medium text-zinc-600">{feature.name}</td>
                  <td className="p-4 text-center">{renderStatus(feature.seeker)}</td>
                  <td className="p-4 text-center bg-zinc-50/30 font-bold">{renderStatus(feature.pro, true)}</td>
                  <td className="p-4 text-center">{renderStatus(feature.recruiter)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <p className="mt-8 text-center text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
        [ Protocol version 1.0.0-beta ]
      </p>
    </main>
  );
};

// Logic for icons
const renderStatus = (status, isPro = false) => {
  if (status) return <Check className={`w-3.5 h-3.5 mx-auto ${isPro ? 'text-zinc-900' : 'text-zinc-400'}`} />;
  return <X className="w-3.5 h-3.5 text-zinc-100 mx-auto" />;
};

export default PricingProtocol;