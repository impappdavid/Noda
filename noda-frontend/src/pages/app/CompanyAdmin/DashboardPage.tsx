import DashboardLayout from '@/layouts/DashboardLayout';
import DashboardWorkspace from '@/features/CompanyAdmin/Dashboard/DashboardWorkspace';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <DashboardWorkspace />
    </DashboardLayout>
  );
};

export default DashboardPage;