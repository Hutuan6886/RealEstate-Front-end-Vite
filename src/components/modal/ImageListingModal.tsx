import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { formatter } from "@/lib/utils";
import { ListingReduxType } from "@/types/types";

import RequestInfoForm from "@/components/listing-content/RequestInfoForm";
import ImageModal from "./ImageModal";

import { Button } from "@/components/ui/button"

import { CgClose } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { PiLinkSimpleBreakBold } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import ListingMap from "@/components/map/ListingMap";

interface ImageListingModalProps {
    dataListing?: ListingReduxType
    copyLink?: () => void
    saveHomes?: () => void
    onClose: () => void
}

const ImageListingModal: React.FC<ImageListingModalProps> = ({ dataListing, copyLink, saveHomes, onClose }) => {
    const [openRequestInfo, setOpenRequestInfo] = useState<boolean>(false)

    const [openImageModal, setOpenImageModal] = useState<boolean>(false)
    const [imgIndex, setImgIndex] = useState<number>(0)

    const modalNavbar: string[] = ["Media", "Map"]
    const [activeNavbar, setActiveNavbar] = useState<string>(modalNavbar[0])

    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    if (!dataListing) {
        return null
    }

    return (
        <>
            {openImageModal && <div style={{ animation: 'zoomOut .3s linear' }} className="fixed z-30 w-full top-0 left-0">
                <ImageModal dataListing={dataListing} indexClick={imgIndex} copyLink={copyLink} saveHomes={saveHomes} onClose={() => setOpenImageModal(false)} />
            </div>
            }
            <div className="fixed z-20 top-0 left-0
                            hidden md:block md:w-full md:h-full 
                            bg-black opacity-80" onClick={onClose}></div>
            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-full h-full md:w-[90%] md:h-[85%] 
                            bg-white 
                            rounded-[0.65rem] 
                            p-1
                            flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between gap-2 p-3">
                    <div className="flex flex-row justify-start items-center gap-2 ">
                        {modalNavbar.map((itemNav: string, i) => (
                            <Button key={i} type="button" className={`${activeNavbar === itemNav ? "bg-zinc-200" : " bg-white"} text-teal-800  font-semibold hover:bg-zinc-200 transition`}
                                onClick={() => setActiveNavbar(itemNav)}
                            >{itemNav}</Button>
                        ))}
                    </div>
                    <div className="flex flex-row items-center justify-end gap-2 ">
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-1 font-semibold"
                            onClick={copyLink}
                        ><PiLinkSimpleBreakBold />Link</Button>
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-1 font-semibold"
                            onClick={saveHomes}>
                            {
                                currentUser.savedHomes.includes(dataListing.id as string) ? <Fragment><FaHeart className="text-rose-700" />Unsave</Fragment>
                                    : <Fragment><FiHeart />Save</Fragment>
                            }
                        </Button>
                        <CgClose className="cursor-pointer text-2xl hover:text-teal-700 transition-colors" onClick={onClose} />
                    </div>
                </div>
                <hr />
                <p className="hidden md:block text-sm font-semibold"><span>{dataListing.address.number}</span> <span>{dataListing.address.street}</span>, <span>{dataListing.address.ward}</span>, <span>{dataListing.address.district}</span>, <span>{dataListing.address.city}</span> | {formatter.format(dataListing.regularPrice as number)} | {dataListing.bedrooms} Beds {dataListing?.bathrooms} Baths</p>
                <div className="w-full h-full flex flex-col lg:grid grid-cols-4 gap-1 overflow-hidden">
                    {
                        activeNavbar === "Media"
                            ? <div className={`${currentUser.id !== dataListing.userId ? "lg:col-span-3" : "lg:col-span-4"} overflow-y-scroll`}>
                                <h3 className="text-xl font-semibold py-4">Listing Photos <span className="text-zinc-600 font-normal">({dataListing.imgUrl.length})</span></h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {
                                        dataListing.imgUrl.map((imgUrl, i) => (
                                            <img key={i} src={imgUrl} alt={imgUrl} className="col-span-3 md:col-span-1 w-full h-[200px] rounded-[0.375rem] cursor-pointer"
                                                onClick={() => {
                                                    setOpenImageModal(true);
                                                    setImgIndex(i)
                                                }} />
                                        ))}
                                </div>
                            </div>
                            : null
                    }
                    {
                        activeNavbar === "Map"
                            ? <div className={`w-full h-full ${currentUser.id !== dataListing.userId ? "lg:col-span-3" : "lg:col-span-4"}`}>
                                <div className="w-full h-full flex flex-col">
                                    <h3 className="text-xl font-semibold py-4">Location</h3>
                                    <ListingMap dataListing={dataListing} lat={parseFloat(dataListing.location.latitude)} lng={parseFloat(dataListing.location.longitude)} />
                                </div>
                            </div>
                            : null
                    }
                    {currentUser.id !== dataListing?.userId
                        && <>
                            <div className="hidden lg:block overflow-y-scroll">
                                <RequestInfoForm dataListing={dataListing} />
                            </div>
                            <Button className="block lg:hidden col-span-4 border border-orange-700 bg-orange-700 hover:bg-white hover:text-orange-700 transition" onClick={() => { setOpenRequestInfo(true) }}>Request Info</Button>
                            <div>
                                {openRequestInfo &&
                                    <>
                                        <div className="fixed z-30 top-0 left-0
                            hidden md:block md:w-full md:h-full 
                            bg-black opacity-80" onClick={() => setOpenRequestInfo(false)}></div>
                                        <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-full h-full md:w-[90%] md:h-fit
                            bg-white 
                            rounded-[0.65rem] 
                            p-1
                            flex flex-col gap-1">
                                            <RequestInfoForm label="Learn more about this property" dataListing={dataListing} onClose={() => setOpenRequestInfo(false)} />
                                        </div>
                                    </>
                                }
                            </div>
                        </>}

                </div >
            </div >
        </>
    )
}

export default ImageListingModal
