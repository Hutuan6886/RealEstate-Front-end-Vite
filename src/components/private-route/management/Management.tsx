import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"

import ListingForm from "./ListingForm"
import ListingList from "./ListingList"

const Management = () => {
    //todo: CURRENTUSER
    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-9">
                <ListingForm currentUser={currentUser} />
                <ListingList
                    title="Listing Product"
                    dataListingList={currentUser.listing}
                />
            </div>
        </div >
    )
}

export default Management
