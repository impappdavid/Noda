import DashboardLayout from '@/layouts/DashboardLayout';
import { HomeWorkspace } from '@/features/home';

const HomePage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <HomeWorkspace />
    </DashboardLayout>
  );
};

export default HomePage;