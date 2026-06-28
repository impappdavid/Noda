import DashboardLayout from '@/layouts/DashboardLayout';
import UserWorkspace from '@/features/user/UserWorkspace';

const UserPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <UserWorkspace />
    </DashboardLayout>
  );
};

export default UserPage;