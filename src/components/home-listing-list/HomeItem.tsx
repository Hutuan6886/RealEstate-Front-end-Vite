import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { formatter } from "@/lib/utils"
import { ListingReduxType } from "@/types/types";
import { saveAndUnsaveListing } from "@/features/user/userSlice";
import { SAVED_HOMES } from "@/data/apiUrl";

import DropdownHomeItem from "./dropdown-homeitem";
import SaleTagIcon from "./SaleTagIcon";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { BiSolidBath } from "react-icons/bi"
import { RiBuilding3Fill } from "react-icons/ri"
import { FaCaretLeft, FaCaretRight, FaHeart, FaHouseUser, FaRegHeart } from "react-icons/fa6";
import { IoBed } from "react-icons/io5"
import { HiDotsHorizontal } from "react-icons/hi";

interface HomeItemProps {
    homeItemData: ListingReduxType
    isSearchItem?: boolean
}

const HomeItem: React.FC<HomeItemProps> = ({ homeItemData, isSearchItem }) => {
    const imgRef = useRef<HTMLImageElement>(null)
    const navigate = useNavigate()

    const currentUser = useSelector((state: RootState) => state.user.currentUser)
    const dispatch = useDispatch()

    const [imgIndex, setImgIndex] = useState<number>(0)

    const previousImg = () => {
        if (imgIndex === 0) {
            setImgIndex(homeItemData.imgUrl.length - 1)
        } else {
            setImgIndex(imgIndex - 1)
        }

    }
    const nextImg = () => {
        if (imgIndex === homeItemData.imgUrl.length - 1) {
            setImgIndex(0)
        } else {
            setImgIndex(imgIndex + 1)
        }
    }

    const savedHomes = async (userId: string, homeData?: ListingReduxType) => {
        try {
            if (!userId) {
                navigate("/log-in")
            }
            else {
                //todo: push to db
                const res = await fetch(`${SAVED_HOMES}/${userId}`, {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    cache: 'no-cache',
                    body: JSON.stringify(homeData)
                })
                if (res.ok) {
                    const homeId = await res.json()
                    dispatch(saveAndUnsaveListing(homeId as string))
                }
            }
        } catch (error) {
            console.log("Saved-Homes", error);
        }
    }

    return (
        <div className={`relative ${isSearchItem ? "w-full" : "w-fit"} h-full`}>
            {homeItemData.discountPrice && homeItemData.discountPrice > 0
                && <SaleTagIcon className="absolute z-20 top-0 left-0" />}
            <div className="flex flex-col items-start gap-2 ">
                <div className={`${isSearchItem ? "w-full h-[220px]" : "w-[240px] h-[140px]"}  relative rounded-[0.45rem] overflow-hidden cursor-pointer group`}>
                    <div className="w-full h-full flex flex-row justify-start">
                        {
                            homeItemData.imgUrl.map((imgUrl, i) => (
                                <img key={i} ref={imgRef} src={imgUrl} alt={imgUrl}
                                    style={{
                                        translate: `${-100 * imgIndex}%`,
                                    }}
                                    className={`min-w-full ${imgIndex === i ? "z-10" : null} group-hover:scale-105 transition-all duration-300`}
                                    onClick={() => { navigate(`/listing/${homeItemData.id}`) }} />
                            ))
                        }
                    </div>
                    <button className={` absolute z-10 top-1/2 -translate-y-1/2 left-1 text-white opacity-0 group-hover:opacity-70 transition-all`}
                        onClick={previousImg}><FaCaretLeft size={35} /></button>
                    <button className={`absolute z-10 top-1/2 -translate-y-1/2 right-1 text-white opacity-0 group-hover:opacity-70 transition-all`}
                        onClick={nextImg} ><FaCaretRight size={35} /></button>
                    <div className="absolute z-10 top-2 right-2 ">
                        <div className="flex flex-row items-center justify-center gap-3">
                            {homeItemData.userId === currentUser.id
                                ? <FaHouseUser className="text-yellow-500 hover:scale-110 transition" onClick={() => navigate("/management")} />
                                : null}
                            <p style={{ margin: 0 }} className={`${homeItemData.formType === "Sell" ? "border-2 border-yellow-500 text-yellow-500" : "border-2 border-white text-white"} rounded-[0.375rem] px-2 py-1 text-xs font-bold text-slate-800 hover:opacity-60 transition`}
                                onClick={() => { navigate(`/search?formType=${homeItemData.formType}`) }}>{homeItemData.formType}</p>
                            <div
                                onClick={() => savedHomes(currentUser.id, homeItemData)}
                            >
                                {currentUser.savedHomes.includes(homeItemData.id as string) ? <FaHeart size={30} className="text-rose-600" /> : <FaRegHeart size={30} className="text-white" />}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <div className="flex flex-row justify-between items-center">
                        <h3 className="font-semibold text-[1.2rem]">{homeItemData.regularPrice && formatter.format(homeItemData.regularPrice)}</h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="cursor-pointer text-xl"><HiDotsHorizontal /></div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-fit bg-white rounded-[0.375rem]">
                                <DropdownMenuItem className="w-full p-0">
                                    <DropdownHomeItem homeData={homeItemData} savedHomes={() => savedHomes(currentUser.id, homeItemData)} />
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-2 text-zinc-700">
                        <div className="flex flex-row items-center justify-start gap-0.5"><IoBed className="text-zinc-500" />{homeItemData.bedrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><BiSolidBath className="text-zinc-500" />{homeItemData.bathrooms}</div>
                        <div className="flex flex-row items-center justify-start gap-0.5"><RiBuilding3Fill className="text-zinc-500" />{homeItemData.squaremetre} sqft</div>
                    </div>
                    <p className={`${isSearchItem ? "max-w-[90%]" : "max-w-[240px]"} text-zinc-700`}>{homeItemData.name && <span className="text-zinc-900 font-semibold">{homeItemData.name} -</span>} <span>{homeItemData.address.number}</span> <span>{homeItemData.address.street}</span>, <span>{homeItemData.address.ward}</span>, <span>{homeItemData.address.district}</span>, <span>{homeItemData.address.city}</span></p>
                </div>
            </div>
        </div >
    )
}

export default HomeItem
