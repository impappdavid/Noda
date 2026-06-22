import DashboardLayout from '@/layouts/DashboardLayout';
import TeamWorkspace from '@/features/CompanyAdmin/Team/TeamWorkspace';

const TeamPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <TeamWorkspace />
    </DashboardLayout>
  );
};

export default TeamPage;