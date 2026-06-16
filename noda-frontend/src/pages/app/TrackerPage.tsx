import DashboardLayout from '@/layouts/DashboardLayout';
import TrackerWorkspace from '@/features/tracker/TrackerWorkspace';

const TrackerPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <TrackerWorkspace />
    </DashboardLayout>
  );
};

export default TrackerPage;