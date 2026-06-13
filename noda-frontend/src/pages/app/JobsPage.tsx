import DashboardLayout from '@/layouts/DashboardLayout';
import JobsWorkspace from '@/features/jobs/JobsWorkspace';

const JobsPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <JobsWorkspace />
    </DashboardLayout>
  );
};

export default JobsPage;