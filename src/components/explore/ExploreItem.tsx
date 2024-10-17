import { LocationType } from "@/data/location"
import { FaAngleRight } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"

interface ExploreItemProps {
    data: LocationType
    width?: string
}
const ExploreItem = ({ data, width }: ExploreItemProps) => {
    const navigate = useNavigate()

    const submitExplore = () => {
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set("searchTerm", data.name)
        urlParams.set("lat", data.position.latitude.toString())
        urlParams.set("lng", data.position.longitude.toString())
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    return (
        <div className={`relative w-[${width}] h-full rounded-[0.45rem] overflow-hidden cursor-pointer group`} onClick={submitExplore}>
            <h3 style={{ textShadow: "0 0 3px #000" }} className="absolute z-10 top-3 left-5 text-2xl font-semibold text-white text-shadow">{data.name}</h3>
            <div className="absolute z-10 bottom-5 left-5 flex flex-row items-center justify-center gap-1 bg-white opacity-70 rounded-[0.45rem] px-2 py-1"><p>View Homes</p> <FaAngleRight className="text-sm" /></div>
            <div className="absolute z-0 top-0 left-0 w-full h-full bg-black opacity-15"></div>
            <img src={data.img} alt={data.img} className="w-full h-full group-hover:scale-110 transition-all duration-500" />
        </div>
    )
}

export default ExploreItem
