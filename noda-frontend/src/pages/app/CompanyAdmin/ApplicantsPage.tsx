import JobsWorkspace from '@/features/CompanyAdmin/Jobs/JobsWorkspace';
import DashboardLayout from '@/layouts/DashboardLayout';

const ApplicantsPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <JobsWorkspace />
    </DashboardLayout>
  );
};

export default ApplicantsPage;