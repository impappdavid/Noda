import DashboardLayout from '@/layouts/DashboardLayout';
import { CoBuildWorkspace } from '@/features/co-build';

const CoBuildPage = () => {
  return (
    <DashboardLayout>
      {/* Everything inside here represents the "children" prop */}
      <main className="flex-1 border-x border-zinc-300 min-h-screen pt-13 bg-white flex flex-col">
        <CoBuildWorkspace />
      </main>
    </DashboardLayout>
  );
};

export default CoBuildPage;