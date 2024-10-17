import { Fragment, useEffect, useState } from 'react';

import { ListingReduxType } from '@/types/types';

import { Button } from '@/components/ui/button'

import { CgClose } from 'react-icons/cg'
import { PiLinkSimpleBreakBold } from 'react-icons/pi'
import { FiHeart } from 'react-icons/fi'
import { FaCaretLeft, FaCaretRight, FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ImageModalProps {
    dataListing: ListingReduxType
    index: number
    copyLink: () => void
    saveHomes: () => void
    onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ dataListing, index, copyLink, saveHomes, onClose }) => {
    const [imgShow, setImgShow] = useState<string>()
    const [indexShow, setIndexShow] = useState<number>()

    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const previousImg = () => {
        let previousIndex: number
        if (indexShow || indexShow === 0 && indexShow > 0 && indexShow < dataListing.imgUrl.length) {
            previousIndex = indexShow - 1
            setIndexShow(previousIndex)
            setImgShow(dataListing.imgUrl[previousIndex])
        }
    }
    const nextImg = () => {
        let nextIndex: number
        if (indexShow || indexShow === 0 && indexShow >= 0 && indexShow < dataListing.imgUrl.length) {
            nextIndex = indexShow + 1
            setIndexShow(nextIndex)
            setImgShow(dataListing.imgUrl[nextIndex])
        }
    }

    useEffect(() => {
        setIndexShow(index - 1)
        setImgShow(dataListing.imgUrl[index - 1])

    }, [dataListing.imgUrl, index])



    return (
        <>
            <div className="fixed z-30 top-0 left-0 w-full h-full bg-black opacity-80" onClick={onClose}></div>
            <div className='fixed z-30 top-0 left-0 w-full'>
                <div className="flex flex-row items-center justify-between p-3">
                    <div className="text-teal-800 font-semibold">Media</div>
                    <div className="flex flex-row items-center justify-end gap-3">
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem] bg-white "
                            onClick={copyLink}
                        ><PiLinkSimpleBreakBold />Link</Button>
                        <Button variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem] bg-white "
                            onClick={saveHomes}
                        >
                            {
                                currentUser.savedHomes.includes(dataListing.id as string) ? <Fragment><FaHeart className="text-rose-700" />Unsave</Fragment>
                                    : <Fragment><FiHeart />Save</Fragment>
                            }
                        </Button>
                        <CgClose className="cursor-pointer text-2xl text-white hover:text-teal-700 transition-colors" onClick={onClose} />
                    </div>
                </div>
            </div>
            <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-full md:w-[70%] h-[50%] md:h-[70%] bg-white rounded-[0.65rem] overflow-hidden">
                <img src={imgShow} alt={imgShow} className='relative w-full h-full' />
                <button disabled={indexShow === 0} className='w-[10%] h-full absolute top-0 left-0 cursor-pointer bg-black opacity-30 lg:opacity-0 group hover:opacity-50 transition' onClick={previousImg}><FaCaretLeft size={50} className='absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 text-white' /></button>
                <button disabled={indexShow === dataListing.imgUrl.length - 1} className='w-[10%] h-full absolute top-0 right-0 cursor-pointer bg-black opacity-30 lg:opacity-0 group hover:opacity-50 transition' onClick={nextImg}><FaCaretRight size={50} className='absolute top-1/2 -translate-y-1/2  right-1/2 translate-x-1/2 text-white' /></button>
            </div>

        </>
    )
}

export default ImageModal
