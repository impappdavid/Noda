import { Bell } from "lucide-react"


const NotificationsDropDown = () => {
    return (
        <>
            <button className="p-2 hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                <Bell className="w-4 h-4" />
            </button>
        </>
    )
}
export default NotificationsDropDown