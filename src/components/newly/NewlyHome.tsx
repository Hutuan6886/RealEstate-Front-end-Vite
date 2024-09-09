import HomeList from "./HomeList"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const NewlyHome = () => {
    const allListing = useSelector((state: RootState) => state.listing.allListingList)

    if (!allListing) {
        return null
    }

    return (
        <div>
            <HomeList title="Newly listed homes" homeData={allListing} />
        </div>
    )
}

export default NewlyHome
