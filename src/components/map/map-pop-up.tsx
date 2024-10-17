import { ListingReduxType } from "@/types/types"

import HomeItem from "@/components/home-listing-list/HomeItem"

interface MapPopUpProps {
  homeItem: ListingReduxType
}
const MapPopUp: React.FC<MapPopUpProps> = ({ homeItem }) => {
  if (!homeItem) {
    return null
  }

  return (
    <HomeItem homeItemData={homeItem} isSearchItem={true} />
  )
}

export default MapPopUp
