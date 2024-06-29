import { formatter } from "@/lib/utils"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { LuTrash } from "react-icons/lu";
import { IoBed } from "react-icons/io5"
import { ManagementFormType } from "./Management"
import { Link, useNavigate } from "react-router-dom"
import { BiSolidBath } from "react-icons/bi"
import { RiBuilding3Fill } from "react-icons/ri"
import { HiDotsHorizontal } from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ListingItemProps {
    maxChar: number
    dataListing: ManagementFormType;
    updateListingUrl: string
    onDelete: () => void
}

// const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, autem deserunt. Dolorem minima dicta deleniti laboriosam facilis commodi, perferendis enim repudiandae animi, sit eligendi ut maiores similique officia mollitia autem."

const ListingItem: React.FC<ListingItemProps> = ({ maxChar, dataListing, updateListingUrl, onDelete }) => {
    const [showReadmore, setShowReadmore] = useState<boolean>(false)
    const navigate = useNavigate()

    //* description < 20 character -> render full description
    //*: description > 20 character -> use readmore button to expand description
    const textShow = !showReadmore ? dataListing.description.substring(0, maxChar) : dataListing.description  //* description hiển thị từ 0-> maxChar, nếu showReadmore=true thì hiển thị toàn bộ description

    const clickListingItem = (id: string | undefined): void => {
        navigate(`/listing/${id}`)
    }

    return (
        <div className="w-[95%] h-full m-auto">
            <div className="flex flex-col items-start gap-2 overflow-hidden">
                <div className="rounded-[0.375rem] w-full h-[180px] md:h-[250px] cursor-pointer overflow-hidden"
                    onClick={() => clickListingItem(dataListing.id)}
                >
                    <img src={dataListing.imgUrl[0]} alt={dataListing.imgUrl[0]} className=" w-full h-full hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="flex flex-row flex-nowrap justify-between items-center">
                        <h3 className="font-semibold text-[1.2rem]">{formatter.format(dataListing.regularPrice as number)}</h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer"><HiDotsHorizontal /></div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-fit bg-white rounded-[0.375rem]">
                                <div className="flex flex-col gap-2">
                                    <Link to={updateListingUrl} className="flex items-center justify-around gap-2 p-2 rounded-[0.2rem] hover:bg-zinc-200">Update<FaRegEdit className="text-lg" /></Link>
                                    <div className=" text-black bg-white flex items-center justify-around gap-2 p-2 rounded-[0.2rem] cursor-pointer hover:bg-zinc-200" onClick={onDelete}>Delete<LuTrash className="text-lg" /></div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2 text-zinc-700">
                        <div className="flex flex-row items-center justify-start gap-0.5"><IoBed className="text-zinc-500" />{dataListing.bedrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><BiSolidBath className="text-zinc-500" />{dataListing.bathrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><RiBuilding3Fill className="text-zinc-500" />{dataListing.squaremetre}</div>
                    </div>
                    <div className="text-sm text-zinc-700">{dataListing.address}</div>
                    {
                        //*description < 20 character -> render full description, nếu description > 20 thì render textShow
                        dataListing.description.length < maxChar ? <p className="inline text-sm text-zinc-600">{dataListing.description}</p> : <div>
                            <p className="inline text-sm text-zinc-600">{textShow}</p>
                            <span className="cursor-pointer font-semibold text-sky-800 hover:text-sky-950 transition" onClick={() => setShowReadmore(!showReadmore)}>{!showReadmore ? "...Read More" : " Read Less"}</span>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default ListingItem
