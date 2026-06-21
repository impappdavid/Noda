import DashboardLayout from '@/layouts/DashboardLayout';
import IdeaReviewWorkspace from '@/features/Admin/IdeaReview/IdeaReviewWorkspace';

const IdeaReviewPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <IdeaReviewWorkspace />
    </DashboardLayout>
  );
};

export default IdeaReviewPage;