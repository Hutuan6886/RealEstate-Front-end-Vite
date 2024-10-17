import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { saveAllListingList, saveHcmListingList, saveNewlyListingList } from "@/features/listing/listingSlice"

import Carousel from "@/components/carousel/Carousel"
import ExploreHome from "@/components/explore/ExploreHome"
import HelpHome from "@/components/help/HelpHome"
import HomeListingList from "@/components/home-listing-list/NewlyHome"

function Home() {
  const dispatch = useDispatch()
  //todo: Get All listing and save it into redux
  // useEffect(() => {
  //   async function getDataHome() {
  //     try {
  //       const res = await fetch("/api/listing/get-newly-listing", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "Application/json"
  //         },
  //         cache: "no-cache"
  //       })
  //       if (res.ok) {
  //         const allListing = await res.json()
  //         dispatch(saveNewlyListingList(allListing))
  //       }
  //     } catch (error) {
  //       console.log("getDataHome", error);
  //     }
  //   }
  //   getDataHome()
  // }, [dispatch])
  useEffect(() => {
    //todo: fetch mutiple api sử dụng Promise bởi vì data không phụ thuộc nhau
    async function getDataHome() {
      Promise.all([
        fetch("/api/listing/get-newly-listing", {
          method: "GET",
          headers: {
            "Content-Type": "Application/json"
          },
          cache: "no-cache"
        }),
        fetch("/api/listing/get-hcm-listing", {
          method: "GET",
          headers: {
            "Content-Type": "Application/json"
          },
          cache: "no-cache"
        }),
        fetch("/api/listing/get-all-listing", {
          method: "GET",
          headers: {
            "Content-Type": "Application/json"
          },
          cache: "no-cache"
        }),
      ])
        .then((res) => Promise.all(res.map((res) => res.json())))
        .then(function (data) {
          dispatch(saveNewlyListingList(data[0]))
          dispatch(saveHcmListingList(data[1]))
          dispatch(saveAllListingList(data[2]))
        })
        .catch(function (error) { console.log("Error", error) })
    }
    getDataHome()
  }, [dispatch])

  return (
    <div className='w-full h-full'>
      <Carousel />
      <ExploreHome />
      <HomeListingList />
      <HelpHome />
    </div>
  )
}

export default Home
