import DashboardLayout from '@/layouts/DashboardLayout';
import NetworkWorkspace from '@/features/network/NetworkWorkspace';

const NetworkPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <NetworkWorkspace />
    </DashboardLayout>
  );
};

export default NetworkPage;