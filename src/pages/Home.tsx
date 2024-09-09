import Carousel from "@/components/carousel/Carousel"
import ExploreHome from "@/components/explore/ExploreHome"
import HelpHome from "@/components/help/HelpHome"
import NewlyHome from "@/components/newly/NewlyHome"
import { saveAllListingList } from "@/features/listing/listingSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

function Home() {
  const dispatch = useDispatch()
  //todo: Get All listing and save it into redux
  useEffect(() => {
    async function getAllListing() {
      try {
        const res = await fetch("/api/listing/get-all-listing", {
          method: "GET",
          headers: {
            "Content-Type": "Application/json"
          },
          cache: "no-cache"
        })
        if (res.ok) {
          const allListing = await res.json()
          dispatch(saveAllListingList(allListing))
        }
      } catch (error) {
        console.log("getAllListing", error);

      }
    }
    getAllListing()
  }, [dispatch])
  return (
    <div className='w-full'>
      <Carousel />
      <ExploreHome />
      <NewlyHome />
      <HelpHome />
    </div>
  )
}

export default Home
