import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { formatter } from "@/lib/utils"

import { BiSolidBath } from "react-icons/bi"
import { RiBuilding3Fill } from "react-icons/ri"
import { IoBed, IoImagesOutline } from "react-icons/io5"
import { PiLinkSimpleBreakBold } from "react-icons/pi";
import HomeHighlights from "./HomeHighlights"
import { TbMeterSquare } from "react-icons/tb"
import { ListingType } from "@/types/types"
import { FaLocationDot } from "react-icons/fa6";
import ImageListingModal from "@/components/modal/ImageListingModal"
import { Button } from "@/components/ui/button"
import { FiHeart } from "react-icons/fi"
import RequestInfoForm from "./RequestInfoForm"

const ListingContent = () => {
    const [dataListing, setDataListing] = useState<ListingType>()
    const { listingId } = useParams()

    const [openImgListingModal, setOpenImgListingModal] = useState<boolean>(false)
    const [isLoading, setIsloading] = useState<boolean>(false)

    useEffect(() => {
        const getDataListing = async (): Promise<void> => {
            setIsloading(true)
            try {
                const res = await fetch(`/api/listing/get-listing-content/${listingId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'Application/json'
                    },
                    cache: 'no-cache'
                })
                if (res.ok) {
                    const dataListing = await res.json()
                    setDataListing(dataListing)
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsloading(false)
            }
        }
        getDataListing()
    }, [listingId])

    if (isLoading) {
        return null
    }

    return (
        <div className="w-full md:w-[75%] m-auto flex flex-col gap-5">
            {openImgListingModal && <div style={{ animation: 'zoomOut .3s linear' }} className="fixed z-20 w-full top-0 left-0">
                <ImageListingModal dataListing={dataListing} onClose={() => setOpenImgListingModal(false)} />
            </div>}
            <div className="w-full h-[350px] rounded-[0.65rem] overflow-hidden" onClick={() => setOpenImgListingModal(true)}>
                <div className="relative">
                    <div className="absolute top-2 right-2 z-10
                                    flex flex-row items-center justify-end gap-2">
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 bg-white font-semibold text-[1rem]"><PiLinkSimpleBreakBold className="text-teal-800" />Link</Button>
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 bg-white font-semibold text-[1rem]"><FiHeart className="text-teal-800" />Save</Button>
                    </div>
                    <div className="absolute right-2 bottom-4 z-10
                                    bg-black opacity-55 rounded-[0.375rem] text-white text-sm font-semibold px-2 py-1 cursor-pointer
                                    flex flex-row items-center justify-center gap-1"><IoImagesOutline className="text-lg" />{dataListing?.imgUrl.length}</div>
                    <div className="grid grid-cols-4 gap-2
                                hover:scale-105 transition-transform duration-500 cursor-pointer">
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
                            <div className="text-zinc-600">
                                <p className="flex flex-row items-center justify-start gap-2"><FaLocationDot />{dataListing?.address}</p>
                                <span className="text-zinc-600">30308</span></div>
                            <div className="md:hidden flex flex-row gap-6">
                                <div className="flex flex-col">
                                    <h3 className="font-semibold text-2xl">{formatter.format(dataListing?.regularPrice as number)}</h3>
                                    <p className="text-zinc-600">discount</p>
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
                        </div>
                        <div className="hidden md:block md:col-span-1 ">
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-2xl">{formatter.format(dataListing?.regularPrice as number)}</h3>
                                <p className="text-zinc-600">discount</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h3 className="font-semibold text-xl">Description</h3>
                        <p className="text-zinc-600">{dataListing?.description}</p>
                    </div>
                </div>
                <div className="hidden lg:block col-span-1">
                    <RequestInfoForm address={dataListing?.address} />
                </div>
            </div>
            <HomeHighlights parking={dataListing?.parking} price={dataListing?.regularPrice} sqft={dataListing?.squaremetre} createAt={dataListing?.createAt} />
        </div>
    )
}

export default ListingContent
