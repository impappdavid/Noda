import React, { useState } from 'react';
import { ChevronDown, CircleCheck, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

const setupSteps = [
    { id: 1, label: "Initialization_Complete", status: "finished" },
    { id: 2, label: "Identity_Verification", status: "finished" },
    { id: 3, label: "Skill_Registry_Sync", status: "finished" },
    { id: 4, label: "Thermal_Protocol_Set", status: "finished" },
    { id: 5, label: "Operational_Portfolio", status: "pending" },
    { id: 6, label: "System_Finalization", status: "pending" },
];

const ProfileSetup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-full max-w-sm">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                {/* YOUR ORIGINAL TRIGGER DESIGN */}
                <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-2 bg-gradient-to-br from-orange-600 to-orange-800 cursor-pointer">
                        <div className="flex gap-1 items-center">
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown className="w-3.5 h-3.5 text-white" />
                            </motion.div>
                            <div className="text-[10px] text-white uppercase tracking-wider font-bold">Profile</div>
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="flex gap-0.5 items-center">
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-orange-400"></div>
                                <div className="h-[13px] w-[2px] bg-zinc-300 opacity-30"></div>
                                <div className="h-[13px] w-[2px] bg-zinc-300 opacity-30"></div>
                            </div>
                            <div className="text-[10px] text-zinc-200 font-mono">4/6</div>
                        </div>
                    </div>
                </CollapsibleTrigger>

                {/* ANIMATED CONTENT AREA */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <CollapsibleContent asChild forceMount>
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden bg-zinc-900 border-x border-b border-zinc-800"
                            >
                                <div className="p-2">
                                    {/* STEP LIST */}
                                    <div className="space-y-2 mb-2">
                                        {setupSteps.map((step) => (
                                            <div 
                                                key={step.id} 
                                                className="flex items-center gap-1.5 group"
                                            >
                                                {step.status === "finished" ? (
                                                    <CircleCheck className="w-3 h-3 text-orange-500" />
                                                ) : (
                                                    <Circle className="w-3 h-3 text-zinc-700" />
                                                )}
                                                <span className={cn(
                                                    "text-[9px] font-mono uppercase tracking-tight",
                                                    step.status === "finished" ? "text-zinc-300 font-bold" : "text-zinc-600"
                                                )}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* INSTRUCTION TEXT AT THE BOTTOM */}
                                    <div className="pt-2 border-t border-zinc-800/50">
                                        <p className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-tighter">
                                            Complete your profile to proceed
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </CollapsibleContent>
                    )}
                </AnimatePresence>
            </Collapsible>
        </div>
    );
};

export default ProfileSetup;