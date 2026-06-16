import CompaniesWorkspace from '@/features/companies/CompaniesWorkspace';
import DashboardLayout from '@/layouts/DashboardLayout';

const CompaniesPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <CompaniesWorkspace />
    </DashboardLayout>
  );
};

export default CompaniesPage;