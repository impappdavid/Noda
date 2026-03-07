import { cn } from "@/lib/utils";
import { Circle, CheckCircle2, Info } from "lucide-react";
import Navbar from '../../AppNavbar';
import AppSideBar from '../../Sidebar';
import Suggestions from '../../Home/Suggestions';

const RoadmapProtocol = () => {
    const timeline = [
        {
            id: "04",
            title: "Upcoming - Dark Mode",
            date: "MAR_26",
            status: "WAIT",
            updates: [
                { date: "05_MAR", log: "UI color palette saturation adjusted." },
                { date: "01_MAR", log: "Initial CSS variable mapping complete." }
            ]
        },
        {
            id: "03",
            title: "Settings_Module_v2",
            date: "FEB_26",
            status: "LIVE",
            updates: [
                { date: "24_FEB", log: "Implemented select in the settings." },
                { date: "20_FEB", log: "Linked user preferences to local storage." }
            ]
        },
        {
            id: "01",
            title: "Core_System_Init",
            date: "JAN_26",
            status: "DONE",
            updates: [
                { date: "15_JAN", log: "Base infrastructure deployed successfully." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans">
            <Navbar />

            <div className="max-w-4xl w-full mx-auto px-6 flex gap-4">
                {/* LEFT SIDEBAR */}
                <aside className="w-25 flex-none">
                    <AppSideBar />
                </aside>

                <div className="flex-1 flex gap-2">
                    {/* MAIN ROADMAP FEED */}
                    <main className="flex flex-col max-w-xl w-full border-x border-zinc-300 min-h-screen pt-12.5 bg-white">

                        {/* TERMINAL HEADER */}
                        <div className="px-2 py-2 border-b border-zinc-300 bg-zinc-800 flex justify-between items-center sticky top-0 z-20">
                            <div className="flex items-center gap-2">
                                <Info size={14} className="text-orange-500" />
                                <span className="text-[10px]  font-semibold uppercase tracking-widest text-white">Evolution_Registry_v4</span>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-tighter">Status: Synchronized</span>
                        </div>

                        {/* TIMELINE CONTENT */}
                        <div className="p-2">
                            <div className="relative border-l border-zinc-300 ml-3 pl-7 space-y-10">
                                {timeline.map((node, idx) => (
                                    <div key={idx} className="relative group">

                                        {/* NODE POINT */}
                                        <div className={cn(
                                            "absolute -left-[41px] top-0 w-6 h-6 bg-white border-2 flex items-center justify-center  z-10",
                                            node.status === "DONE" ? "border-emerald-500 text-emerald-500" :
                                                node.status === "LIVE" ? "border-orange-500 text-orange-500 animate-pulse" :
                                                    "border-zinc-300 text-zinc-300"
                                        )}>
                                            {node.status === "DONE" ? <CheckCircle2 size={12} /> : <Circle size={8} fill="currentColor" />}
                                        </div>

                                        {/* ENTRY CONTENT */}
                                        <div className="flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                                                    {node.title}
                                                </h3>
                                                <span className="text-[9px] font-mono font-black text-zinc-400 italic">[{node.date}]</span>
                                            </div>

                                            {/* UPDATED NOTES BLOCK */}
                                            <div className="mt-2 space-y-1">
                                                {node.updates.map((update, uIdx) => (
                                                    <div key={uIdx} className="flex gap-3 items-start border border-zinc-200 p-2.5 hover:border-zinc-300 transition-all group/note">
                                                        <span className="text-[8px] font-mono font-black text-zinc-500 mt-0.5 shrink-0">
                                                            {update.date} //
                                                        </span>
                                                        <p className="text-[10px] font-mono font-bold text-zinc-600 uppercase leading-relaxed group-hover/note:text-zinc-900">
                                                            {update.log}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                       
                    </main>

                    <Suggestions />
                </div>
            </div>
        </div>
    );
};

export default RoadmapProtocol;