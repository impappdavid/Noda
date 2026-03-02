import PremiumCard from "./Suggestions/PremiumCard";
import ProfileSetup from "./Suggestions/ProfileSetup";
import ProfileActivity from "./Suggestions/ProfileActivity";

const Suggestions = () => {

    return (
        <>
            {/* 4. RIGHT COLUMN */}
            <aside className="hidden xl:block">
                <div className="sticky top-16 space-y-3 w-37">
                    <PremiumCard />

                    <ProfileSetup />

                    <ProfileActivity />
                </div>
            </aside>
        </>
    )
}
export default Suggestions