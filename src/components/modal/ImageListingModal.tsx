import { Button } from "@/components/ui/button"
import { CgClose } from "react-icons/cg";
import { FiHeart } from "react-icons/fi";
import { ListingType } from "@/types/types";
import { formatter } from "@/lib/utils";
import { PiLinkSimpleBreakBold } from "react-icons/pi";
import RequestInfoForm from "../listing-content/RequestInfoForm";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface ImageListingModalProps {
    dataListing?: ListingType
    onClose: () => void
}

const ImageListingModal: React.FC<ImageListingModalProps> = ({ dataListing, onClose }) => {
    const [openImageModal, setOpenImageModal] = useState<boolean>()
    const [imgIndex, setImgIndex] = useState<number>()

    return (
        <>
            {openImageModal && dataListing && imgIndex && <ImageModal imgList={dataListing?.imgUrl} index={imgIndex} onClose={() => setOpenImageModal(false)} />}
            <div className="fixed z-20 top-0 left-0
                            hidden md:block md:w-full md:h-full 
                            bg-black opacity-80" onClick={onClose}></div>
            <div className="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-full h-full md:w-[90%] md:h-[85%] 
                            bg-white 
                            rounded-[0.65rem] 
                            p-1
                            flex flex-col gap-1">
                <div className="flex flex-row items-center justify-between p-3">
                    <div className="text-teal-800 font-semibold">Media</div>
                    <div className="flex flex-row items-center justify-end gap-3">
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem]"><PiLinkSimpleBreakBold />Link</Button>
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem]"><FiHeart />Save</Button>
                        <CgClose className="cursor-pointer text-2xl hover:text-teal-700 transition-colors" onClick={onClose} />
                    </div>
                </div>
                <hr />
                <p className="text-sm font-semibold">{dataListing?.address} | {formatter.format(dataListing?.regularPrice as number)} | {dataListing?.bedrooms} Beds {dataListing?.bathrooms} Baths</p>
                <div className="grid grid-cols-4 gap-1 overflow-hidden">
                    <div className="col-span-4 md:col-span-3 overflow-y-scroll">
                        <h3 className="text-xl font-semibold py-4">Listing Photos <span className="text-zinc-600 font-normal">({dataListing?.imgUrl.length})</span></h3>
                        <div className="grid grid-cols-3 gap-2">
                            {
                                dataListing?.imgUrl.map((imgUrl, i) => (
                                    <img key={i} src={imgUrl} alt={imgUrl} className="col-span-3 md:col-span-1 w-full h-[200px] rounded-[0.375rem] cursor-pointer" onClick={() => {
                                        setOpenImageModal(true);
                                        setImgIndex(i + 1)
                                    }} />

                                ))}
                        </div>
                    </div>
                    <div className="overflow-y-scroll">
                        <RequestInfoForm />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageListingModal
