import DashboardLayout from '@/layouts/DashboardLayout';
import PostWorkspace from '@/features/CompanyAdmin/Post/PostWorkspace';

const PostPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <PostWorkspace />
    </DashboardLayout>
  );
};

export default PostPage;