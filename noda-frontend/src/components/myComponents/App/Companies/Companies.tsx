import { useState, useMemo } from 'react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import SearchCompany from './SearchForm';
import CompanyList from './CompanyList';
import CompanyInfo from './CompanyInfo';
import type { Company } from '@/types/companies';

const companyData: Company[] = [
    { id: 1, name: "Vercel", industry: "Cloud Infrastructure", employees: "500-1000", rating: 4.8, responseVelocity: "98%", reviews: 124 },
    { id: 2, name: "Linear", industry: "Software", employees: "50-100", rating: 4.9, responseVelocity: "94%", reviews: 82 },
    { id: 3, name: "Stripe", industry: "Fintech", employees: "5000+", rating: 4.7, responseVelocity: "89%", reviews: 342 }
];

const AppCompanies = () => {
    const [selectedCompany, setSelectedCompany] = useState<Company>(companyData[0]);
    const [searchQuery, setSearchQuery] = useState("");

    // Performance: Filter list without re-calculating on every UI jitter
    const filteredCompanies = useMemo(() => {
        return companyData.filter(company => 
            company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            company.industry.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                <aside className="w-25 shrink-0">
                    <AppSideBar />
                </aside>

                <main className="flex flex-1 max-w-3xl border-x border-zinc-300 h-full overflow-hidden bg-white">
                    {/* LEFT PANE */}
                    <div className="w-1/2 h-full flex flex-col border-r border-zinc-300 pt-12.5">
                        <SearchCompany searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                        <CompanyList 
                            companyData={filteredCompanies} 
                            selectedCompany={selectedCompany} 
                            setSelectedCompany={setSelectedCompany} 
                        />
                    </div>

                    {/* RIGHT PANE */}
                    <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden pt-12">
                        <CompanyInfo selectedCompany={selectedCompany}/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppCompanies;