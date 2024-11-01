import { Fragment, useState } from 'react';

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
    indexClick: number
    copyLink?: () => void
    saveHomes?: () => void
    onClose: () => void
}

const ImageModal: React.FC<ImageModalProps> = ({ dataListing, indexClick, copyLink, saveHomes, onClose }) => {
    console.log("index", indexClick);

    const [indexShow, setIndexShow] = useState<number>(indexClick)

    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const previousImg = () => {
        if (indexShow === 0) {
            setIndexShow(dataListing.imgUrl.length - 1)
        } else {
            setIndexShow(indexShow - 1)
        }
    }
    const nextImg = () => {
        if (indexShow === dataListing.imgUrl.length - 1) {
            setIndexShow(0)
        } else {
            setIndexShow(indexShow + 1)
        }
    }

    return (
        <>
            <div className="fixed z-30 top-0 left-0 w-full h-full bg-black opacity-80" onClick={onClose}></div>
            <div className='fixed z-30 top-0 left-0 w-full'>
                <div className="flex flex-row items-center justify-between p-3">
                    {
                        dataListing &&
                        <div className="text-teal-800 font-semibold">Media</div>
                    }
                    <div className="w-full flex flex-row items-center justify-end gap-3">
                        {
                            copyLink &&
                            <Button type='button' variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem] bg-white "
                                onClick={copyLink}
                            ><PiLinkSimpleBreakBold />Link</Button>
                        }
                        {
                            saveHomes &&
                            <Button type='button' variant="outline" className="flex flex-row items-center justify-center gap-2 font-semibold text-[1rem] bg-white "
                                onClick={saveHomes}
                            >
                                {
                                    currentUser.savedHomes.includes(dataListing?.id as string) ? <Fragment><FaHeart className="text-rose-700" />Unsave</Fragment>
                                        : <Fragment><FiHeart />Save</Fragment>
                                }
                            </Button>
                        }
                        <CgClose className="cursor-pointer text-2xl text-white hover:text-teal-700 transition-colors" onClick={onClose} />
                    </div>
                </div>
            </div>
            <div className="fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                            w-full h-fit md:w-fit md:h-[80%] bg-white rounded-[0.65rem] overflow-hidden">
                {
                    <div className='flex flex-row justify-start overflow-hidden'>
                        {
                            dataListing?.imgUrl.map((imgUrl: string, i: number) => (
                                <img key={i} src={imgUrl} alt={imgUrl} className='relative w-auto h-full duration-300 transition-all' style={{ translate: `${-indexShow * 100}%` }} />
                            ))
                        }
                    </div>
                }
                <button type='button' className='w-[10%] h-full absolute top-0 left-0 cursor-pointer bg-black opacity-30 lg:opacity-0 group hover:opacity-50 transition' onClick={previousImg}><FaCaretLeft size={50} className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white' /></button>
                <button type='button' className='w-[10%] h-full absolute top-0 right-0 cursor-pointer bg-black opacity-30 lg:opacity-0 group hover:opacity-50 transition' onClick={nextImg}><FaCaretRight size={50} className='absolute top-1/2 -translate-y-1/2  right-1/2 translate-x-1/2 text-white' /></button>
            </div>

        </>
    )
}

export default ImageModal
