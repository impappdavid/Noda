import { Search } from "lucide-react"

const SearchCompany = ({ searchQuery, setSearchQuery }: any) => {
    return (
        <>
            <div className="border-b border-zinc-300 bg-white sticky top-0 z-10">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full rounded-none bg-zinc-100 h-12 py-2 pl-9 pr-4 text-xs outline-none"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
            </div>
        </>
    )
}
export default SearchCompany