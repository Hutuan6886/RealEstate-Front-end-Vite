import { Fragment } from "react/jsx-runtime"

import { ListingReduxType } from "@/types/types"

import { toast } from "@/components/ui/use-toast"

import { PiLinkSimpleBreakBold } from "react-icons/pi"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface DropdownHomeItemProps {
    homeData?: ListingReduxType
    savedHomes: () => void
}

const DropdownHomeItem: React.FC<DropdownHomeItemProps> = ({ homeData, savedHomes }) => {
    const { currentUser } = useSelector((state: RootState) => state.user)

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
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-around gap-2 p-2 rounded-[0.2rem] cursor-pointer hover:bg-zinc-200" onClick={savedHomes}>{currentUser.savedHomes.includes(homeData.id as string) ? <Fragment>Unsave <FaHeart className="text-rose-800"/></Fragment> : <Fragment>Save <FaRegHeart /></Fragment>}</div>
            <div className="flex items-center justify-around gap-2 p-2 rounded-[0.2rem] cursor-pointer hover:bg-zinc-200" onClick={copyLink}>Link <PiLinkSimpleBreakBold /></div>
        </div>
    )
}

export default DropdownHomeItem
