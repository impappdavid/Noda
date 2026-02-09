import { MessageSquare } from "lucide-react"

const MessagesDropDown = () => {
    return (
        <>
            <button className="p-2 hover:bg-zinc-200/80 text-zinc-500 hover:text-zinc-900 transition-colors relative cursor-pointer">
                <MessageSquare className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>
        </>
    )
}
export default MessagesDropDown