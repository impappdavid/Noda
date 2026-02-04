import { useState } from 'react';
import { Search, Globe, Users, Star, MessageSquare, ShieldAlert } from 'lucide-react';
import Navbar from '../AppNavbar';
import AppSideBar from '../Sidebar';
import SearchCompany from './SearchForm';
import CompanyList from './CompanyList';
import CompanyInfo from './CompanyInfo';

const companyData = [
    { id: 1, name: "Vercel", industry: "Cloud Infrastructure", employees: "500-1000", rating: 4.8, responseVelocity: "98%", reviews: 124 },
    { id: 2, name: "Linear", industry: "Software", employees: "50-100", rating: 4.9, responseVelocity: "94%", reviews: 82 },
    { id: 3, name: "Stripe", industry: "Fintech", employees: "5000+", rating: 4.7, responseVelocity: "89%", reviews: 342 }
];

const AppCompanies = () => {
    const [selectedCompany, setSelectedCompany] = useState(companyData[0]);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="h-screen bg-white text-zinc-900 font-sans flex flex-col overflow-hidden">
            <Navbar />

            {/* Main Wrapper: Locked width to prevent sidebar shifting */}
            <div className="max-w-4xl mx-auto px-6 flex flex-1 w-full gap-4 overflow-hidden">
                
                {/* 1. FIXED SIDEBAR */}
                <aside className="w-24 shrink-0">
                    <AppSideBar />
                </aside>

                {/* 2. CENTER FEED: Unified 734px container (367px + 367px) */}
                <main className="flex flex-1 max-w-3xl border-x border-zinc-300 h-full overflow-hidden bg-white">

                    {/* LEFT PANE: Search & List */}
                    <div className="w-1/2 h-full flex flex-col border-r border-zinc-300 pt-13">
                        <SearchCompany searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                        <CompanyList companyData={companyData} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
                    </div>

                    {/* RIGHT PANE: Intelligence Preview */}
                    <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden pt-12">
                        <CompanyInfo selectedCompany={selectedCompany}/>

                        
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AppCompanies;