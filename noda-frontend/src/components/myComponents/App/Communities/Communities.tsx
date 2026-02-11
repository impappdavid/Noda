import React, { useMemo, useState } from 'react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import CompactProtocolCard from './CompactProtocolCard';
import type { Community } from '@/types/communities';
import { communityData } from '@/types/communities';
import CommunitiesFilter from './CommunitiesFilter';

const AppCommunities: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Performance: Filter the list based on the search query
    const filteredSections = useMemo(() => {
        const sections = ["Popular Intelligence", "For You", "Explore"];

        return sections.map(sectionName => {
            const items = communityData.filter(c => {
                const matchesSection = sectionName.includes(c.type);
                const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.tag.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesSection && matchesSearch;
            });

            return { title: sectionName, items };
        });
    }, [searchQuery]); // Only re-run when searchQuery changes

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 flex-col max-w-4xl border-x border-zinc-300 h-full overflow-hidden bg-white pt-13">
                    {/* FILTER BAR */}
                    <div className="flex w-full items-center border-b border-zinc-300 bg-white sticky top-0 z-30">
                        <CommunitiesFilter
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                    </div>

                    {/* SCROLLABLE CONTENT */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
                        {filteredSections.map(section => (
                            section.items.length > 0 && (
                                <CommunitySection
                                    key={section.title}
                                    title={section.title}
                                    communities={section.items}
                                />
                            )
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

// Helper component for Section Grid logic
const CommunitySection = ({ title, communities }: { title: string, communities: Community[] }) => {
    // Calculate how many empty slots are needed to keep the 3-column look
    const emptySlots = (3 - (communities.length % 3)) % 3;

    return (
        <div className="w-full">
            <div className="px-3 py-2 border-b border-zinc-300 flex items-center bg-zinc-50/50">
                <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-zinc-600">
                    {title}
                </h2>
            </div>
            <div className="grid grid-cols-3 border-b border-zinc-300 divide-x divide-zinc-300">
                {communities.map(c => (
                    <CompactProtocolCard key={c.id} community={c} />
                ))}

                {/* Empty cells to maintain 3-column grid structure */}
                {Array.from({ length: emptySlots }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-zinc-50/20" />
                ))}
            </div>
        </div>
    );
};

export default AppCommunities;