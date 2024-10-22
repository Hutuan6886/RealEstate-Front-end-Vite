import { useSelector } from "react-redux"

import { RootState } from "@/redux/store"

import HomeItem from "@/components/home-listing-list/HomeItem"

const SavedHomes = () => {

  //todo: Get all saved data from redux
  const { currentUser } = useSelector((state: RootState) => state.user)

  //todo: Get All listing from redux (sử dụng để hiển thị những saveHomes của User)
  const allListingList = useSelector((state: RootState) => state.listing.allListingList)

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-semibold text-zinc-700">Saved Homes</h3>
          <div className="h-[536px] overflow-y-scroll">
            <div style={{ scrollbarWidth: "none" }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 overflow-y-scroll"
            >
              {allListingList.filter((item) => currentUser.savedHomes.includes(item.id as string)).map((item, i) => (
                <div key={i} className="col-span-2">
                  <HomeItem isSearchItem={true} homeItemData={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SavedHomes
