import PremiumCard from "./suggestions/PremiumCard";
import ProfileActivity from "./suggestions/ProfileActivity";
import ProfileSetup from "./suggestions/ProfileSetup";

const Suggestions = () => {
  return (
    <>
      {/* 4. RIGHT COLUMN */}
      <aside className="hidden xl:block">
        <div className="sticky top-16 space-y-3 w-37">
          <PremiumCard />

          <ProfileSetup />

        </div>
      </aside>
    </>
  );
};
export default Suggestions;
