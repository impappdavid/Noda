import { useState } from 'react';
import Navbar from '../navbar';
import AppSideBar from '../Sidebar';
import JobInfo from './JobInfos';
import JobList from './JobList';

const jobData = [
    { 
        id: 43, 
        company: "Taco Bell", 
        role: "Oven installation", 
        location: "Kansas City", 
        experience: "1-3 year",
        status: "Live", 
        match: 96, 
        salary: "$25/hr",
        description: "Looking for a precision-focused specialist to handle industrial oven calibration and thermal deployment."
    },
    { 
        id: 44, 
        company: "Vercel", 
        role: "Frontend Deployment", 
        location: "Remote", 
        experience: "3-5 year",
        status: "Live", 
        match: 92, 
        salary: "$140k - $180k",
        description: "Optimization of edge-side rendering pipelines and global frontend infrastructure."
    },
    { 
        id: 45, 
        company: "OpenAI", 
        role: "GPU Cluster Setup", 
        location: "Remote", 
        experience: "+5 year",
        status: "Closed", 
        match: 88, 
        salary: "$200k - $300k",
        description: "Managing large-scale H100 clusters and high-performance computing interconnects."
    },
    
];

const AppJobs = () => {
    const [selectedJob, setSelectedJob] = useState(jobData[0]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">

            <Navbar />

            {/* Added w-full and consistent max-width to match Home */}
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                
                {/* Fixed width wrapper for sidebar to prevent shifting */}
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                {/* Changed max-w-3xl to flex-1 to occupy the remaining space consistently */}
                <main className="flex flex-1 border-x max-w-4xl border-zinc-300 h-full overflow-hidden bg-white">
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
                </main>
            </div>
        </div>
    );
};

export default AppJobs;