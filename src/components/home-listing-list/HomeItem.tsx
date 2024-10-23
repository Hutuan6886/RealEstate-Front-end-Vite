import { MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { formatter } from "@/lib/utils"
import { ListingReduxType } from "@/types/types";
import { saveAndUnsaveListing } from "@/features/user/userSlice";

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

    const [isHoverImg, setIsHoverImg] = useState<boolean>(false)
    const [imgIndex, setImgIndex] = useState<number>(0)

    const previousImg = () => {
        const imgNumber: number = imgIndex - 1
        if (imgNumber < 0) {
            setImgIndex(homeItemData.imgUrl.length - 1)
        } else {
            setImgIndex(imgNumber)
        }

    }
    const nextImg = () => {
        const imgNumber: number = imgIndex + 1
        if (imgNumber === homeItemData.imgUrl.length) {
            setImgIndex(0)
        } else {
            setImgIndex(imgNumber)
        }
    }

    const savedHomes = async (userId: string, homeData?: ListingReduxType) => {
        try {
            if (!userId) {
                navigate("/log-in")
            }
            else {
                //todo: push to db
                const res = await fetch(`${import.meta.env.VITE_API_ROUTE}${import.meta.env.VITE_SAVED_HOMES}/${userId}`, {
                    method: "put",
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
                && <SaleTagIcon className="absolute z-10 top-0 left-0" />}
            <div className="flex flex-col items-start gap-2 overflow-hidden">
                <div className={`${isSearchItem ? "w-full h-[240px]" : "w-[240px] h-[150px]"}  relative rounded-[0.45rem] cursor-pointer overflow-hidden`}
                    onMouseMove={(e: MouseEvent) => {
                        if (e.target === imgRef.current) {
                            setIsHoverImg(true)
                        }
                    }}
                    onMouseLeave={() => {
                        setIsHoverImg(false)
                    }}
                >
                    <img ref={imgRef} src={homeItemData.imgUrl[imgIndex]} alt={homeItemData.imgUrl[imgIndex]} className={`w-full h-full ${isHoverImg ? "scale-105" : null} transition-transform duration-500`}
                        onClick={() => { navigate(`/listing/${homeItemData.id}`) }} />
                    {isSearchItem ?
                        <>
                            <div className={`${isHoverImg ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 left-1 text-white`}
                                onClick={previousImg}><FaCaretLeft size={35} /></div>
                            <div className={`${isHoverImg ? "block" : "hidden"} absolute top-1/2 -translate-y-1/2 right-1 text-white`}
                                onClick={nextImg} ><FaCaretRight size={35} /></div>
                        </> : null}
                    <div className="absolute top-2 right-2 ">
                        <div className="flex flex-row items-center justify-center gap-3">
                            {homeItemData.userId === currentUser.id ? <FaHouseUser className="text-yellow-500" /> : null}
                            <p style={{ margin: 0 }} className="bg-white opacity-80 rounded-[0.375rem] px-2 py-1 text-xs font-bold text-slate-800" onClick={() => { navigate(`/search?formType=${homeItemData.formType}`) }}>{homeItemData.formType}</p>
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
