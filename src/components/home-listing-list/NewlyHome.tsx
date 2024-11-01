import { useSelector } from "react-redux"

import { ListingReduxType } from "@/types/types"
import { RootState } from "@/redux/store"

import ClickSlipList from "@/components/ui/click-slip-list"
import HomeItem from "./HomeItem"

const HomeListingList = () => {
    const newlyListing = useSelector((state: RootState) => state.listing.newlyListingList)
    const hcmListing = useSelector((state: RootState) => state.listing.hcmListingList)

    return (
        <div>
            {
                newlyListing.length > 0
                    ? <ClickSlipList title="Newly listed homes">
                        {newlyListing.map((listing: ListingReduxType) => (
                            <div key={listing.id}>
                                <HomeItem homeItemData={listing} />
                            </div>
                        ))}
                    </ClickSlipList>
                    : null
            }
            {
                hcmListing.length > 0
                    ? <ClickSlipList title="Interesting finds for you in Hồ Chí Minh">
                        {hcmListing.map((listing: ListingReduxType) => (
                            <div key={listing.id}>
                                <HomeItem homeItemData={listing} />
                            </div>
                        ))}
                    </ClickSlipList>
                    : null
            }
        </div>
    )
}

export default HomeListingList
