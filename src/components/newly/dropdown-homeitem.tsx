import { HomeType } from "@/types/types"
import { FiHeart } from "react-icons/fi"
import { PiLinkSimpleBreakBold } from "react-icons/pi"
import { toast } from "../ui/use-toast"

interface DropdownHomeItemProps {
    homeData?: HomeType
    savedHomes: () => void
}

const DropdownHomeItem: React.FC<DropdownHomeItemProps> = ({ homeData, savedHomes }) => {
    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/listing/${homeData?.id}`)
        toast({
            className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
            description: "The link is coppied."
        })
    }

    if (!homeData) {
        return null
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-around gap-2 p-2 rounded-[0.2rem] cursor-pointer hover:bg-zinc-200" onClick={savedHomes}>Save <FiHeart /></div>
            <div className="flex items-center justify-around gap-2 p-2 rounded-[0.2rem] cursor-pointer hover:bg-zinc-200" onClick={copyLink}>Link <PiLinkSimpleBreakBold /></div>
        </div>
    )
}

export default DropdownHomeItem
