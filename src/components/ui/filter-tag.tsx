import { useEffect, useRef, useState } from "react"
import { FaAngleDown } from "react-icons/fa6"

interface FilterTagProps {
    children: React.ReactNode
    title: string
}
const FilterTag: React.FC<FilterTagProps> = ({ children, title }) => {
    const [isOpen, setOpen] = useState<boolean>(false)
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const clickOutToCloseFilterTag = (e: MouseEvent) => {
            if (!filterRef.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", (e) => clickOutToCloseFilterTag(e))

        return () => {
            document.removeEventListener("mousedown", (e) => clickOutToCloseFilterTag(e))
        }
    })

    return (
        <div className="relative" ref={filterRef}>
            <div className={`px-3 py-2 font-semibold bg-white rounded-[0.45rem] border  ${isOpen ? "bg-zinc-200 hover:bg-zinc-300 hover:border-zinc-300" : "border-zinc-200 hover:bg-zinc-200"} active:bg-zinc-500 transition cursor-pointer`} onClick={() => { setOpen(!isOpen) }}>
                <div className="flex flex-row items-center justify-center text-zinc-700 gap-2">
                    {title} <FaAngleDown className={`${isOpen ? "rotate-180" : null} transition duration-200`} />
                </div>
            </div>
            {isOpen ? <div className="absolute z-20 top-[42px] left-0 w-fit h-fit bg-white rounded-[0.45rem] shadow-lg p-2">
                {children}
            </div> : null}
        </div>
    )
}

export default FilterTag
