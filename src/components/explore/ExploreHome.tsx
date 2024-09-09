import { useEffect, useRef, useState } from "react"
import { exploreProvinceData } from "@/data/location"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import TitleComponent from "../ui/title-component"
import ExploreItem from "./ExploreItem"
import useWindowSize from "@/hooks/useWindowSize"

const ExploreHome = () => {
    const clientScreenSize = useWindowSize()

    const [isHiddenLeftButton, setHiddenLeftButton] = useState<boolean>(false)
    const [isHiddenRightButton, setHiddenRightButton] = useState<boolean>(false)
    const swiperRef = useRef<HTMLDivElement>(null)

    const [scrollLeft, setScrollLeft] = useState<number>(0) //* position left của client view trước và sau khi slide

    const handleOnScroll = () => {
        if (!swiperRef.current?.scrollLeft) return
        setScrollLeft(swiperRef.current?.scrollLeft)
    }
    //todo: Click swiper button to slide
    const HandleSlidingLeft = () => {
        if (!swiperRef.current) return
        swiperRef.current.scrollLeft -= 190
    }
    const HandleSlidingRight = () => {
        if (!swiperRef.current) return
        swiperRef.current.scrollLeft += 190
    }
    useEffect(() => {
        //todo: Ẩn hiện button left và right sau khi swipe 
        //todo: swiperRef.current.scrollLeft: Vị trí của client view sau khi scroll
        //todo: swiperRef.current.scrollWidth: width của scroll view
        //todo: swiperRef.current.clientWidth: width của client view
        if (!swiperRef.current) return
        if (scrollLeft === (swiperRef.current.scrollWidth - swiperRef.current.clientWidth)) {
            setHiddenRightButton(true)
        }
        else if (scrollLeft === 1 || !swiperRef.current.scrollLeft) {
            setHiddenLeftButton(true)
        }
        else {
            setHiddenLeftButton(false)
            setHiddenRightButton(false)
        }
    }, [scrollLeft])

    useEffect(() => {
        if (!swiperRef.current) return
        if (scrollLeft === (swiperRef.current.scrollWidth - swiperRef.current.clientWidth)) {
            setHiddenRightButton(true)
        }
        else if (scrollLeft === 1 || !swiperRef.current.scrollLeft) {
            setHiddenLeftButton(true)
        }
        else {
            setHiddenLeftButton(false)
            setHiddenRightButton(false)
        }
    }, [scrollLeft])

    if (!clientScreenSize) {
        return null
    }

    return (
        <TitleComponent title="Explore Home" description="Take a deep dive and browse homes for sale, original neighborhood photos, resident reviews and local insights to find what is right for you.">
            {
                clientScreenSize > 1300
                    ?
                    <div className="flex flex-row gap-3 "
                    >
                        <div className="grid grid-cols-5 gap-3">
                            {exploreProvinceData.map((province, i) => (
                                <div key={i} className={`col-span-1 ${i % 5 === 0 ? "row-span-2" : " row-span-1"}`}>
                                    {
                                        <ExploreItem data={province} />
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="relative">
                        <div className="w-full flex flex-row gap-3 flex-nowrap overflow-x-hidden scroll-smooth"
                            ref={swiperRef}
                            onScroll={handleOnScroll}
                        >
                            {exploreProvinceData?.map((province, i) => (
                                <div key={i}>
                                    <ExploreItem data={province} width="180px" />
                                </div>
                            ))}
                        </div>
                        {!isHiddenLeftButton ? <div className="absolute z-20 top-1/2 -translate-y-1/2 left-0 p-3 bg-white text-black border shadow-md cursor-pointer rounded-[25px] active:scale-110 transition" onClick={HandleSlidingLeft}><FaChevronLeft /></div> : null}
                        {!isHiddenRightButton ? <div className="absolute z-20 top-1/2 -translate-y-1/2 right-0 p-3 bg-white text-black border shadow-md cursor-pointer rounded-[25px] active:scale-110 transition" onClick={HandleSlidingRight}><FaChevronRight /></div> : null}
                    </div>
            }
        </TitleComponent>
    )
}

export default ExploreHome
