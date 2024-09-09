import { HomeType } from "@/types/types"
import HomeItem from "../newly/HomeItem"

interface MapPopUpProps {
  homeItem: HomeType
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
