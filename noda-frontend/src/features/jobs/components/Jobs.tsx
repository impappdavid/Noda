import { useState, useMemo } from 'react';
import FilterCombobox from './JobFilters';
import AllFiltersDialog, {type AllFiltersState, defaultAllFiltersState } from './AllFilter';
import JobList from './JobList';
import JobInfo from './JobInfos';
import { initialJobData } from '../data'; // Loaded with your new postedAt string formats

const AppJobs = () => {
    const [jobs, setJobs] = useState(initialJobData);
    const [selectedJobId, setSelectedJobId] = useState(initialJobData[0]?.id || 0);

    // 1. FILTERING STATES
    const [sourceFilter, setSourceFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('any'); // "any", "month", "week", "day"
    const [experienceFilter, setExperienceFilter] = useState('all');
    const [remoteFilter, setRemoteFilter] = useState('all');
    const [advancedFilters, setAdvancedFilters] = useState<AllFiltersState>(defaultAllFiltersState);

    // 2. DYNAMIC FILTRATION PIPELINE WITH LIVE DATE EVALUATION
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            // Source Filter
            const matchesSource = 
                sourceFilter === 'all' || 
                job.company.toLowerCase() === sourceFilter.toLowerCase() ||
                job.authorName?.toLowerCase() === sourceFilter.toLowerCase();

            // Experience Filter
            let matchesExperience = true;
            if (experienceFilter !== 'all') {
                if (experienceFilter === '1-3') matchesExperience = job.experience.includes('1-3');
                else if (experienceFilter === '3-5') matchesExperience = job.experience.includes('3-5');
                else if (experienceFilter === '5+') matchesExperience = job.experience.includes('+5');
                else if (experienceFilter === '0') matchesExperience = job.experience.includes('0');
            }

            // Remote Filter
            let matchesRemote = true;
            if (remoteFilter !== 'all') {
                if (remoteFilter === 'yes') matchesRemote = job.workMode.toLowerCase() === 'remote';
                if (remoteFilter === 'no') matchesRemote = job.workMode.toLowerCase().replace('-', '') === 'onsite';
                if (remoteFilter === 'hybrid') matchesRemote = job.workMode.toLowerCase() === 'hybrid';
            }

            // --- FIXED: DATE POSTED REAL-TIME ENGINE ---
            let matchesDate = true;
            if (dateFilter !== 'any' && job.postedAt) {
                const now = new Date().getTime();
                const postedTime = new Date(job.postedAt).getTime();
                const diffInMs = now - postedTime;
                const diffInHours = diffInMs / (1000 * 60 * 60);

                if (dateFilter === 'day') {
                    // Past 24 hours
                    matchesDate = diffInHours <= 24;
                } else if (dateFilter === 'week') {
                    // Past 7 days (24 * 7 = 168 hours)
                    matchesDate = diffInHours <= 168;
                } else if (dateFilter === 'month') {
                    // Past 30 days (24 * 30 = 720 hours)
                    matchesDate = diffInHours <= 720;
                }
            }

            // Advanced Dialog Filters
            const matchesType = advancedFilters.selectedTypes.length === 0 || 
                advancedFilters.selectedTypes.map(t => t.toLowerCase()).includes(job.type?.toLowerCase());

            let matchesSalary = true;
            if (advancedFilters.salary.min || advancedFilters.salary.max) {
                const numbers = job.salary?.match(/\d+/g)?.map(Number) || [0];
                const jobMaxSalary = Math.max(...numbers);
                if (advancedFilters.salary.min && jobMaxSalary < Number(advancedFilters.salary.min)) matchesSalary = false;
                if (advancedFilters.salary.max && jobMaxSalary > Number(advancedFilters.salary.max)) matchesSalary = false;
            }

            const matchesSkills = advancedFilters.skills.length === 0 || 
                advancedFilters.skills.some(skill => 
                    job.role?.toLowerCase().includes(skill.toLowerCase()) || 
                    job.description?.toLowerCase().includes(skill.toLowerCase())
                );

            return matchesSource && matchesExperience && matchesRemote && matchesDate && matchesType && matchesSalary && matchesSkills;
        });
    }, [jobs, sourceFilter, dateFilter, experienceFilter, remoteFilter, advancedFilters]);

    // 3. SORT SYSTEM
    const sortedAndFilteredJobs = useMemo(() => {
        const sortedList = [...filteredJobs];
        if (advancedFilters.sortBy === "recent") {
            // Sort by absolute timestamp age
            return sortedList.sort((a, b) => new Date(b.postedAt || 0).getTime() - new Date(a.postedAt || 0).getTime());
        }
        return sortedList.sort((a, b) => (b.match || 0) - (a.match || 0));
    }, [filteredJobs, advancedFilters.sortBy]);

    // 4. SELECTION FALLBACK
    const selectedJob = useMemo(() => {
        const found = sortedAndFilteredJobs.find(job => job.id === selectedJobId);
        return found || sortedAndFilteredJobs[0] || null;
    }, [sortedAndFilteredJobs, selectedJobId]);

    const handleMarkAsApplied = (jobId: number) => {
        setJobs(prevJobs => 
            prevJobs.map(job => job.id === jobId ? { ...job, applied: true } : job)
        );
    };

    return (
        <div className="w-full bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <div className="mx-auto flex flex-1 w-full gap-4 overflow-hidden">
                <main className="flex flex-1 flex-col border-x border-zinc-300 overflow-hidden bg-white">

                    {/* COMBOBOX FILTER BAR */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30">
                        <div className="flex flex-1 items-center divide-x divide-zinc-300">
                            
                            <div className="flex-1">
                                <FilterCombobox 
                                    label="Source" 
                                    value={sourceFilter}
                                    onChange={setSourceFilter}
                                    options={[
                                        { label: "All", value: "all" },
                                        { label: "Noda", value: "noda" },
                                        { label: "JSearch", value: "jsearch" },
                                        { label: "USAJOBS", value: "usajobs" }
                                    ]} 
                                />
                            </div>

                            {/* HOOKED UP LIVE STATE UPDATES */}
                            <div className="flex-1">
                                <FilterCombobox 
                                    label="Date Posted" 
                                    value={dateFilter}
                                    onChange={setDateFilter}
                                    options={[
                                        { label: "Any Time", value: "any" },
                                        { label: "Past Month", value: "month" },
                                        { label: "Past Week", value: "week" },
                                        { label: "Past 24 Hours", value: "day" }
                                    ]} 
                                />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox 
                                    label="Experience" 
                                    value={experienceFilter}
                                    onChange={setExperienceFilter}
                                    options={[
                                        { label: "All", value: "all" },
                                        { label: "0 Year", value: "0" },
                                        { label: "1-3 Years", value: "1-3" },
                                        { label: "3-5 Years", value: "3-5" },
                                        { label: "5+ Years", value: "5+" }
                                    ]} 
                                />
                            </div>

                            <div className="flex-1">
                                <FilterCombobox 
                                    label="Remote" 
                                    value={remoteFilter}
                                    onChange={setRemoteFilter}
                                    options={[
                                        { label: "All", value: "all" },
                                        { label: "Remote", value: "yes" },
                                        { label: "On-site", value: "no" },
                                        { label: "Hybrid", value: "hybrid" }
                                    ]} 
                                />
                            </div>

                            <AllFiltersDialog state={advancedFilters} onChange={setAdvancedFilters}/>
                        </div>
                    </div>

                    {/* DUAL PANE CONTENT */}
                    <div className="flex flex-1 overflow-hidden">
                        <div className="w-1/2 h-screen overflow-y-auto border-r border-zinc-300 relative">
                            {sortedAndFilteredJobs.length > 0 ? (
                                <JobList
                                    jobs={sortedAndFilteredJobs}
                                    selectedJob={selectedJob}
                                    onSelect={(job) => setSelectedJobId(job.id)}
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center bg-zinc-50/50 p-8 text-center select-none">
                                    <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                                        No matching execution records located.
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden">
                            {selectedJob ? (
                                <JobInfo 
                                    job={selectedJob} 
                                    onApply={() => handleMarkAsApplied(selectedJob.id)} 
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center bg-zinc-50/30 text-zinc-400 font-mono text-xs">
                                    SELECT A TRACKING NODE FOR DETAILS
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppJobs;