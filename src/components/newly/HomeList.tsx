import { HomeType } from "@/types/types"
import HomeItem from "./HomeItem";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import {
    // MouseEvent, 
    useEffect, useRef, useState
} from "react";

interface HomeListProps {
    title: string;
    description?: string
    homeData: HomeType[]
}

const HomeList: React.FC<HomeListProps> = ({ homeData, title, description }) => {
    const [isHiddenLeftButton, setHiddenLeftButton] = useState<boolean>(false)
    const [isHiddenRightButton, setHiddenRightButton] = useState<boolean>(false)


    const swiperRef = useRef<HTMLDivElement>(null)

    const [scrollLeft, setScrollLeft] = useState<number>(0) //* position left của client view trước và sau khi slide
    // const [startX, setStartX] = useState<number>(0)     //* position thực hiện event mouse down
    // const [isMouseDown, setIsMounseDown] = useState<boolean>(false)

    // //todo: Swipe to slide
    // const handleOnMouseDown = (event: MouseEvent): void => {
    //     setStartX(event.clientX)        //* position thực hiện event mouse down
    // }
    // const handleOnMouseMove = (event: MouseEvent) => {
    //     if (!isMouseDown || !swiperRef.current) return
    //     event.preventDefault()
    //     const deltaX: number = (event.clientX - startX) * 0.5   //*event.clientX: position mouse sau thực hiện event mouse move
    //     swiperRef.current.scrollLeft = scrollLeft - deltaX
    // }
    // const handleOnMouseUp = () => {
    //     setIsMounseDown(false)
    // }
    const handleOnScroll = () => {
        if (!swiperRef.current?.scrollLeft) return
        setScrollLeft(swiperRef.current?.scrollLeft)
    }

    //todo: Click swiper button to slide
    const HandleSlidingLeft = () => {
        if (!swiperRef.current) return
        swiperRef.current.scrollLeft -= swiperRef.current.clientWidth

    }
    const HandleSlidingRight = () => {
        if (!swiperRef.current) return
        swiperRef.current.scrollLeft += swiperRef.current.clientWidth
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

    if (!homeData) {
        return null
    }

    return (
        <div className="w-full h-full my-10">
            <div className=" flex flex-col gap-5">
                <div className="w-[90%] md:w-[50%] m-auto flex flex-col gap-3">
                    <h3 className="text-4xl text-center font-semibold">{title}</h3>
                    <p className="text-zinc-600 text-sm text-center">{description}</p>
                </div>
                <div className="relative">
                    <div className="w-full flex flex-row gap-4 flex-nowrap overflow-x-hidden scroll-smooth"
                        ref={swiperRef}
                        // onMouseDown={(event: MouseEvent) => handleOnMouseDown(event)}
                        // onMouseMove={(event: MouseEvent) => handleOnMouseMove(event)}
                        // onMouseUp={handleOnMouseUp}
                        onScroll={handleOnScroll}

                    > {homeData?.map((homeItem: HomeType) => (
                        <div key={homeItem.id}>
                            <HomeItem homeItemData={homeItem} />
                        </div>
                    ))}</div>
                    {!isHiddenLeftButton ? <div className="absolute top-1/2 -translate-y-1/2 left-0 p-3 bg-white text-black border shadow-md cursor-pointer rounded-[25px] active:scale-110 transition" onClick={HandleSlidingLeft}><FaChevronLeft /></div> : null}
                    {!isHiddenRightButton ? <div className="absolute top-1/2 -translate-y-1/2 right-0 p-3 bg-white text-black border shadow-md cursor-pointer rounded-[25px] active:scale-110 transition" onClick={HandleSlidingRight}><FaChevronRight /></div> : null}

                </div>

            </div>
        </div>
    )
}

export default HomeList
