import { HomeType } from "@/types/types";
import { formatter } from "@/lib/utils"
// import { FaRegEdit } from "react-icons/fa"
// import { LuTrash } from "react-icons/lu";
// import { HiDotsHorizontal } from "react-icons/hi";
import { IoBed } from "react-icons/io5"
import { BiSolidBath } from "react-icons/bi"
import { RiBuilding3Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom";

interface HomeItemProps {
    homeItemData: HomeType
}

const HomeItem: React.FC<HomeItemProps> = ({ homeItemData }) => {
    const navigate = useNavigate()
    return (
        <div className="w-fit h-full">
            <div className="flex flex-col items-start gap-2 overflow-hidden">
                <div className="relative w-[240px] h-[150px] rounded-[0.375rem] cursor-pointer overflow-hidden"
                    onClick={() => { navigate(`/listing/${homeItemData.id}`) }}
                >
                    <img src={homeItemData.imgUrl[0]} alt={homeItemData.imgUrl[0]} className="w-full h-full hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-white opacity-80 rounded-[0.375rem] px-2 py-1">
                        <p className="text-xs font-bold">{homeItemData.formType}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <h3 className="font-semibold text-[1.2rem]">{homeItemData.regularPrice && formatter.format(homeItemData.regularPrice)}</h3>
                    <div className="flex flex-row items-center justify-start gap-2 text-zinc-700">
                        <div className="flex flex-row items-center justify-start gap-0.5"><IoBed className="text-zinc-500" />{homeItemData.bedrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><BiSolidBath className="text-zinc-500" />{homeItemData.bathrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><RiBuilding3Fill className="text-zinc-500" />{homeItemData.squaremetre}</div>
                    </div>
                    <p className="max-w-[240px] text-zinc-700">{homeItemData.name && <span className="text-zinc-900">{homeItemData.name},</span>} {homeItemData.address}</p>
                </div>
            </div>
        </div >
    )
}

export default HomeItem
