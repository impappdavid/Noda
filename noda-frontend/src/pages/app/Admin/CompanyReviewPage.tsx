import DashboardLayout from '@/layouts/DashboardLayout';
import CompanyReviewWorkspace from '@/features/Admin/CompanyReview/CompanyReviewWorkspace';

const CompanyReviewPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <CompanyReviewWorkspace />
    </DashboardLayout>
  );
};

export default CompanyReviewPage;