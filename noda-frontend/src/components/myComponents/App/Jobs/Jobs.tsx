import { useState } from 'react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import JobInfo from './JobInfos';
import JobList from './JobList';
import FilterCombobox from './JobFilters';
import AllFiltersDialog from './AllFilter';



const jobData = [
    {
        id: 43, type: "Full-time", workMode: "Remote", authorName: "test", company: "Taco Bell", role: "Frontend Developer", location: "Kansas City", experience: "1-3 year", status: "Live", match: 96, salary: "$25/hr", description: `## PHASE_01: SYSTEM_OVERVIEW
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
    { id: 44, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 45, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 46, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 47, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 48, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 49, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 50, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 51, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 52, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 53, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 54, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 55, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 56, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 57, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 58, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 59, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 60, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 61, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 62, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 63, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 64, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 65, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 66, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 67, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 68, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 69, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 70, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 71, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 72, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 73, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 74, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 75, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 76, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 77, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 78, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 79, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 80, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 81, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 82, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 83, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 84, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 85, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 86, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 87, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 88, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 89, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 90, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 91, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 92, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 93, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 94, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 1, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 2, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 3, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 4, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 5, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 6, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 7, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 8, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 9, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 10, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 11, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 12, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 13, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 14, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 15, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 16, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 717, type: "Freelance", workMode: "Hybrid", authorName: "test2", company: "Vercel", role: "Frontend Deployment", location: "Remote", experience: "3-5 year", status: "Live", match: 92, salary: "$140k - $180k", description: "Optimization of edge-side rendering pipelines and global frontend infrastructure." },
    { id: 100, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 1001, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 1002, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    { id: 102, type: "Contract", workMode: "On-site", authorName: "test3", company: "OpenAI", role: "GPU Cluster Setup", location: "Remote", experience: "+5 year", status: "Closed", match: 88, salary: "$200k - $300k", description: "Managing large-scale H100 clusters and high-performance computing interconnects." },
    
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
                            <AllFiltersDialog />
                        </div>
                    </div>

                    {/* 2. DUAL PANE CONTENT */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/2 h-screen overflow-y-auto border-r  border-zinc-300 scrollbar-hide relative">
                            <JobList
                                jobs={jobData}
                                selectedJob={selectedJob}
                                onSelect={setSelectedJob}
                            />
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


export default AppJobs;