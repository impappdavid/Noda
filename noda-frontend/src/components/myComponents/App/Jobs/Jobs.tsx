import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import JobInfo from './JobInfos';
import JobList from './JobList';
import FilterCombobox from './JobFilters';



const jobData = [
    { id: 43, type:"Full-time", workMode:"Remote", authorName:"test", company: "Taco Bell", role: "Oven installation", location: "Kansas City", experience: "1-3 year", status: "Live", match: 96, salary: "$25/hr", description: `## PHASE_01: SYSTEM_OVERVIEW
Looking for a **Precision-Focused Specialist** to lead industrial oven calibration and thermal deployment protocols. You will be responsible for the structural integrity of thermal cycles and the optimization of heat-distribution vectors.

### CORE_RESPONSIBILITIES:
* **Calibration_Uplink**: Perform sub-millimeter precision calibration on high-capacity industrial ovens (Grade-A to Grade-D).
* **Thermal_Deployment**: Map thermal heat maps using IR-Vector sensors and adjust nozzle velocity to eliminate cold-zone anomalies.
* **Safety_Protocol**: Ensure 100% compliance with ISO-9001 and Thermal-Safety-Standard-40.
* **Telemetry_Logging**: Document all variance data into the Central Intelligence Hub for weekly audit reviews.

---

## PHASE_02: REQUIRED_SPECIFICATIONS
* **Experience**: 5+ years in Thermal Dynamics or Industrial Engineering.
* **Tooling**: Mastery of infrared thermography and PID control loop tuning.
* **Logic**: Ability to solve complex thermodynamic equations under high-pressure deployment windows.
* **Bio-Compliance**: Must be comfortable working in high-heat environments (up to 180°C with protective shielding).

---


## PHASE_03: UPLINK_BENEFITS
* **Tier_01_Access**: Full health, dental, and vision insurance nodes.
* **Equity_Stakes**: 0.05% Vector-Equity per year of deployment.
* **Remote_Sync**: 2 days/week of remote telemetry analysis allowed.` },
    { id: 44, type:"Freelance", workMode:"Hybrid", authorName:"test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 45, type:"Contract", workMode:"On-site", authorName:"test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
];

const AppJobs = () => {
    const [selectedJob, setSelectedJob] = useState(jobData[0]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-4xl border-x border-zinc-300 h-full overflow-hidden bg-white pt-12.5">

                    {/* 1. COMBOBOX FILTER BAR: Using flex w-full to fill space */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300">
                            <div className="flex-1">
                                <FilterCombobox label="Source" options={[
                                    { label: "All", value: "all" },
                                    { label: "Noda", value: "noda" },
                                    { label: "JSearch", value: "jsearch" },
                                    { label: "USAJOBS", value: "usajobs" }
                                ]} />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox label="Date Posted" options={[
                                    { label: "Any Time", value: "any" },
                                    { label: "Past Month", value: "month" },
                                    { label: "Past week", value: "week" },
                                    { label: "Past 24 hours", value: "day" }
                                ]} />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox label="Experience" options={[
                                    { label: "All", value: "all" },
                                    { label: "0 Year", value: "0" },
                                    { label: "1-3 Years", value: "1-3" },
                                    { label: "3-5 Years", value: "3-5" },
                                    { label: "5+ Years", value: "5+" }
                                ]} />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox label="Remote" options={[
                                    { label: "All", value: "all" },
                                    { label: "Remote", value: "yes" },
                                    { label: "On-site", value: "no" },
                                    { label: "Hybrid", value: "hybrid" }
                                ]} />
                            </div>
                            
                            {/* All Filters Button: Fixed width at the end */}
                            <button className="flex items-center justify-center gap-1.5 px-4 h-10 bg-zinc-50 hover:bg-zinc-100 text-[10px] font-bold text-zinc-500 hover:text-zinc-900 transition-all shrink-0">
                                <SlidersHorizontal size={12} />
                                <span className="hidden sm:inline">All Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. DUAL PANE CONTENT */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/2 h-full overflow-y-auto border-r border-zinc-300 scrollbar-hide">
                            <JobList
                                jobs={jobData}
                                selectedJob={selectedJob}
                                onSelect={setSelectedJob}
                            />
                            <div className="h-20" />
                        </div>

                        <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden">
                            <JobInfo job={selectedJob} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

// 3. REUSABLE MINIMALIST COMBOBOX


export default AppJobs;