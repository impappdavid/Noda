import DashboardLayout from '@/layouts/DashboardLayout';
import BookmarksWorkspace from '@/features/bookmarks/BookmarksWorkspace';

const BookmarksPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <BookmarksWorkspace />
    </DashboardLayout>
  );
};

export default BookmarksPage;