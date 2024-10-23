import { Fragment, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { RootState } from "@/redux/store"

import useGetListing from "@/hooks/useGetListing"
import { formatter } from "@/lib/utils"
import { ListingReduxType } from "@/types/types"
import { saveAndUnsaveListing } from "@/features/user/userSlice"

import HomeHighlights from "./HomeHighlights"
import RequestInfoForm from "./RequestInfoForm"
import ImageListingModal from "@/components/modal/ImageListingModal"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

import { BiSolidBath } from "react-icons/bi"
import { RiBuilding3Fill } from "react-icons/ri"
import { IoBed, IoImagesOutline } from "react-icons/io5"
import { PiLinkSimpleBreakBold } from "react-icons/pi";
import { TbMeterSquare } from "react-icons/tb"
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi"
import { MdDiscount } from "react-icons/md"

const ListingContent = () => {
    const [openImgListingModal, setOpenImgListingModal] = useState<boolean>(false)

    const { currentUser } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const { listingId } = useParams()
    const navigate = useNavigate()

    //todo: GET DATA
    const { dataListing } = useGetListing(`${import.meta.env.VITE_API_ROUTE}${import.meta.env.VITE_GET_LISTING_CONTENT}/${listingId}`)

    const discountTag: string | undefined = dataListing?.discountPrice ? ((dataListing?.discountPrice / dataListing.regularPrice) * 100).toFixed(1) : undefined

    const copyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/listing/${dataListing?.id}`)
        toast({
            className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
            description: "The link is coppied."
        })
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

    if (!dataListing) return null

    return (
        <div className="relative w-full md:w-[75%] m-auto flex flex-col gap-5">
            {dataListing.discountPrice && dataListing.discountPrice > 0
                && <div className="absolute z-10 -top-3 -left-3 w-[150px] h-[150px] bg-fuchsia-900 text-white rounded-[0.3rem] shadow-lg">
                    <div className="flex flex-col gap-3 text-center py-3">
                        <p className="text-sm font-semibold">SPECIAL OFFER</p>
                        <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold">UP TO</p>
                            <p className="text-5xl font-bold">{discountTag}%</p>
                        </div>
                    </div>
                </div>}
            {openImgListingModal
                && <div style={{ animation: 'zoomOut .3s linear' }} className="fixed z-20 w-full top-0 left-0">
                    <ImageListingModal dataListing={dataListing} copyLink={copyLink} saveHomes={() => savedHomes(currentUser.id, dataListing)} onClose={() => setOpenImgListingModal(false)} />
                </div>}
            <div className="w-full h-[350px] rounded-[0.65rem] overflow-hidden">
                <div className="relative">
                    <div className="absolute top-2 right-2 z-10
                                    flex flex-row items-center justify-end gap-2">
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 bg-white font-semibold text-[1rem]"
                            onClick={copyLink}
                        ><PiLinkSimpleBreakBold className="text-teal-800" />Link</Button>
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 bg-white font-semibold text-[1rem]"
                            onClick={() => savedHomes(currentUser.id, dataListing)}
                        >
                            {
                                currentUser.savedHomes.includes(dataListing.id as string)
                                    ? <Fragment><FaHeart className="text-rose-700" />Unsave</Fragment>
                                    : <Fragment><FiHeart />Save</Fragment>
                            }
                        </Button>
                    </div>
                    <div className="absolute right-2 bottom-4 z-10
                                    bg-black opacity-55 rounded-[0.375rem] text-white text-sm font-semibold px-2 py-1 cursor-pointer
                                    flex flex-row items-center justify-center gap-1"><IoImagesOutline className="text-lg" />{dataListing?.imgUrl.length}</div>
                    <div className="grid grid-cols-4 gap-2
                                hover:scale-105 transition-transform duration-500 cursor-pointer"
                        onClick={() => setOpenImgListingModal(true)}
                    >
                        <div className=" col-span-4 lg:col-span-3 ">
                            <img src={dataListing?.imgUrl[0]} alt={dataListing?.imgUrl[0]} className="w-full h-[350px]" />
                        </div>
                        <div className="hidden lg:block md:col-span-1">
                            <div className="grid grid-cols-1 gap-2">
                                <img src={dataListing?.imgUrl[1]} alt={dataListing?.imgUrl[1]} className="w-full h-[175px]" />
                                <img src={dataListing?.imgUrl[2]} alt={dataListing?.imgUrl[2]} className="w-full h-[175px]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-[98%] m-auto grid grid-cols-4 gap-3">
                <div className="col-span-4 md:col-span-3 flex flex-col gap-8">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-3 md:col-span-2 flex flex-col gap-2">
                            <h3 className="font-semibold text-2xl">{dataListing?.name}</h3>
                            <div className="flex flex-row items-center justify-start gap-2"><FaLocationDot />
                                <p className="w-full"><span>{dataListing.address.number}</span> <span>{dataListing.address.street}</span>, <span>{dataListing.address.ward}</span>, <span>{dataListing.address.district}</span>, <span>{dataListing.address.city}</span></p>
                            </div>
                            <div className="md:hidden flex flex-row gap-6">
                                <div className="flex flex-col">
                                    <p className="font-semibold text-2xl">{formatter.format(dataListing?.regularPrice as number)}</p>
                                    {dataListing.discountPrice && dataListing.discountPrice > 0
                                        ? <div className="flex flex-row items-center justify-start gap-1 text-zinc-600"><MdDiscount /> {formatter.format(dataListing?.discountPrice as number)} <span>(~ {discountTag}%)</span></div>
                                        : null}
                                </div>
                                <div className="flex flex-col md:flex-row items-center justify-start gap-3">
                                    <div className="flex flex-row flex-nowrap items-center justify-start gap-1 text-zinc-600"><IoBed />{dataListing?.bedrooms} Beds</div>
                                    <div className="flex flex-row flex-nowrap items-center justify-start gap-1 text-zinc-600"><BiSolidBath />{dataListing?.bathrooms} Baths</div>
                                    <div className="flex flex-row flex-nowrap items-center justify-start gap-1 text-zinc-600"><RiBuilding3Fill />{dataListing?.squaremetre} <TbMeterSquare className="text-xl" /></div>
                                </div>
                            </div>
                            <div className="hidden md:flex flex-row items-center justify-start gap-3">
                                <div className="flex flex-row items-center justify-start gap-1 text-zinc-600"><IoBed />{dataListing?.bedrooms} Beds</div>
                                <div className="flex flex-row items-center justify-start gap-1 text-zinc-600"><BiSolidBath />{dataListing?.bathrooms} Baths</div>
                                <div className="flex flex-row items-center justify-start gap-1 text-zinc-600"><RiBuilding3Fill />{dataListing?.squaremetre} <TbMeterSquare className="text-xl" /></div>
                            </div>
                            <table className="w-full border text-center">
                                <thead className="border">
                                    <tr>
                                        <th className="border py-2">Latitude</th>
                                        <th className="border py-2">Longitude</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm border">
                                    <tr>
                                        <td className="border py-2">{dataListing.location.latitude}</td>
                                        <td className="border py-2">{dataListing.location.longitude}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="hidden md:block md:col-span-1 ">
                            <div className="flex flex-col">
                                <p className="font-semibold text-2xl">{formatter.format(dataListing?.regularPrice as number)}</p>
                                {dataListing.discountPrice && dataListing.discountPrice > 0
                                    ? <div className="flex flex-row items-center justify-start gap-1 text-zinc-600"><MdDiscount />{formatter.format(dataListing?.discountPrice as number)} <span>(~ {discountTag}%)</span> </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="font-semibold text-xl">Description</h3>
                        <p className="text-zinc-600">{dataListing?.description}</p>
                    </div>
                </div>
                <div className="hidden lg:block col-span-1">
                    {currentUser.id !== dataListing?.userId && <RequestInfoForm dataListing={dataListing} />}
                </div>
            </div>
            <HomeHighlights dataListing={dataListing} />
        </div >
    )
}

export default ListingContent
