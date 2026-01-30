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
            {/* 1. Navbar must have a fixed height (e.g., h-16) */}
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                {/* 2. LEFT SIDEBAR */}
                <AppSideBar />

                {/* 3. CENTER FEED: Lock this container to the viewport height */}
                <main className="flex max-w-3xl w-full border-x border-zinc-300 h-full overflow-hidden bg-white">
                    
                    {/* 4. SCROLLABLE JOB LIST (Left Pane) */}
                    <div className="w-1/2 h-full overflow-y-auto border-r border-zinc-300 scrollbar-hide">
                        <JobList 
                            jobs={jobData} 
                            selectedJob={selectedJob} 
                            onSelect={setSelectedJob} 
                        />
                        {/* Buffer to allow scrolling past the last card if needed */}
                        <div className="h-20" /> 
                    </div>

                    {/* 5. FIXED JOB INFO (Right Pane) */}
                    <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden">
                        <JobInfo job={selectedJob} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppJobs;