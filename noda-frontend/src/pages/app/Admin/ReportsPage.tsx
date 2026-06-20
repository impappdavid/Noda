import DashboardLayout from '@/layouts/DashboardLayout';
import ReportsWorkspace from '@/features/Admin/Reports/ReportsWorkspace';

const ReportsPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <ReportsWorkspace />
    </DashboardLayout>
  );
};

export default ReportsPage;