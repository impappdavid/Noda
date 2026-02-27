import { useState } from 'react';
import { Check, ChevronRight, Zap } from 'lucide-react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import AppSideBar from '../Sidebar';
import { Button } from "@/components/ui/button";
import Navbar from '../AppNavbar';
import Suggestions from '../Home/Suggestions';

const plans = [
    { 
        id: 'premium', 
        name: 'Premium User', 
        prices: { monthly: '$9.99', yearly: '$99.99', save: 'Save $20' }, 
        desc: 'Advanced Toolkit for the Modern Pro',
        features: [
            'Full AI Match Percentage',
            'Verified Anonymity Mode',
            'Priority Application Status',
            'Advanced Job Tracker Logs'
        ]
    },
    {
        id: 'recruiter',
        name: 'Solo Recruiter',
        prices: { monthly: '$79.99', yearly: '$599.99', save: 'Save $359' },
        desc: 'High-Integrity Talent Acquisition',
        popular: true,
        features: [
            'Ghost-Buster Trust Badge',
            'Unlimited AI Matching',
            'Smart Filtering & Search',
            'Direct Calendar Integration',
            '14-Day Response Protection',
            'Priority Support'
        ]
    },
    { 
        id: 'business', 
        name: 'Business Hub', 
        prices: { monthly: '$199.99', yearly: '$1499.99', save: 'Save $889' },
        desc: 'The Complete Executive Dashboard',
        features: [
            'CEO Analytics Dashboard',
            'Include All Team Recruiters',
            'Company-Wide Reputation Score',
            'Bulk Job Delisting Control'
        ]
    },
];

const PremiumPage = () => {
    const [selected, setSelected] = useState('business');
    const [billing, setBilling] = useState('monthly');

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="flex flex-1 gap-4 w-full max-w-4xl mx-auto px-6 overflow-hidden">
                <aside className="w-25 shrink-0 pt-8">
                    <AppSideBar />
                </aside>

                <div className="flex-1 flex gap-2 overflow-hidden">
                    <main className="flex flex-col flex-1 border-x border-zinc-300 min-h-screen pt-12.5 bg-white overflow-y-auto scrollbar-hide">

                        {/* REFINED INDUSTRIAL HEADER */}
                        <div className="flex flex-col w-full border-b border-zinc-300 bg-white">
                            <div className="px-3 h-10 flex justify-between items-center bg-white">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-[11px] font-bold text-zinc-900 uppercase tracking-tight">
                                        Select a plan
                                    </h2>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-[8px] font-mono font-black text-orange-500 uppercase tracking-tighter bg-orange-500/10 px-1.5 py-0.5 border border-orange-500/20">
                                        Save ~20%
                                    </span>
                                    
                                    <div className="flex bg-zinc-100 p-0.5 border border-zinc-200">
                                        {['monthly', 'yearly'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setBilling(type)}
                                                className={cn(
                                                    "px-3 py-0.5 text-[9px] font-mono font-black uppercase transition-all duration-200",
                                                    billing === type
                                                        ? "bg-orange-500 text-white shadow-lg"
                                                        : "text-zinc-500 hover:text-zinc-600"
                                                )}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STATIC PLAN LIST */}
                        <div className="p-2 space-y-2">
                            {plans.map((plan) => {
                                const isActive = selected === plan.id;
                                return (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelected(plan.id)}
                                        className={cn(
                                            "border transition-all cursor-pointer bg-white overflow-hidden",
                                            isActive ? "border-orange-500" : "border-zinc-300 hover:border-zinc-400"
                                        )}
                                    >
                                        {/* TOP SECTION: FIXED HEIGHT PREVENTS JUMPING */}
                                        <div className="p-3 flex items-center justify-between h-[54px]">
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "w-3 h-3 rounded-full border flex items-center justify-center shrink-0 mt-1",
                                                    isActive ? "bg-orange-500" : "border-zinc-300"
                                                )}>
                                                    {isActive && <div className="w-1 h-1 bg-white rounded-full" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[12px] font-bold uppercase">{plan.name}</span>
                                                        {plan.popular && <span className="text-[9px] font-mono font-black text-emerald-600 uppercase">Popular</span>}
                                                    </div>
                                                    <span className="text-[9px] text-zinc-400 uppercase font-medium leading-none">{plan.desc}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="text-right flex flex-col justify-center">
                                                <span className="text-sm font-black tracking-tighter leading-none">
                                                    {billing === 'monthly' ? plan.prices.monthly : plan.prices.yearly}
                                                </span>
                                                <span className="text-[9px] font-mono text-zinc-500 block uppercase leading-none mt-1">
                                                    {billing === 'monthly' ? '/MONTH' : '/YEAR'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* FEATURE SECTION: RESERVED SPACE FOR SAVINGS */}
                                        <div className="px-3 pb-3 pt-2 border-t border-zinc-50 bg-zinc-50/30">
                                            {/* Dedicated Status Line */}
                                            <div className="h-4 mb-2 flex items-center">
                                                <AnimatePresence mode="wait">
                                                    {billing === 'yearly' ? (
                                                        <motion.div 
                                                            key="yearly-save"
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            className="flex items-center gap-1.5"
                                                        >
                                                            <Zap size={10} className="text-emerald-500 fill-emerald-500 animate-pulse" />
                                                            <span className="text-[9px] font-mono font-black text-emerald-600 uppercase tracking-tighter">
                                                                Annual_Benefit: {plan.prices.save} Applied
                                                            </span>
                                                        </motion.div>
                                                    ) : (
                                                        <span className="text-[8px] font-mono text-zinc-300 uppercase italic">
                                                            Standard_Protocol_Active
                                                        </span>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                {plan.features.map((f, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <Check className="w-2.5 h-2.5 text-zinc-400" />
                                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tight truncate">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* MINIMAL FOOTER */}
                        <div className="mt-auto p-3 border-t border-zinc-300 flex items-center justify-between bg-white">
                            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-wider">Cancel anytime. No long-term contract.</span>
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none h-9 px-6 text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-colors">
                                Continue <ChevronRight className="ml-1 w-3 h-3" />
                            </Button>
                        </div>
                    </main>

                    <aside className="w-40 shrink-0 pt-16 overflow-y-auto scrollbar-hide">
                        <Suggestions />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default PremiumPage;