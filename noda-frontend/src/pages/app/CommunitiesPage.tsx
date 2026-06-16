import CommunitiesWorkspace from '@/features/communities/CommunitiesWorkspace';
import DashboardLayout from '@/layouts/DashboardLayout';

const CommunitiesPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <CommunitiesWorkspace />
    </DashboardLayout>
  );
};

export default CommunitiesPage;