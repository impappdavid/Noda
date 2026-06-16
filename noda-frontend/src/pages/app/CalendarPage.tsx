import CalendarWorkspace from '@/features/calendar/CalendarWorkspace';
import DashboardLayout from '@/layouts/DashboardLayout';

const CalendarPage = () => {
  return (
    <DashboardLayout>
      {/* The layout automatically injects the Navbar and left Sidebar */}
      <CalendarWorkspace />
    </DashboardLayout>
  );
};

export default CalendarPage;