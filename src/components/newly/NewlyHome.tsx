import { HomeType } from "@/types/types"
import { useEffect, useState } from "react"
import HomeList from "./HomeList"

const NewlyHome = () => {
    const [homeData, setHomeData] = useState<HomeType[]>()
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
                    setHomeData(allListing)
                }
            } catch (error) {
                console.log("getAllListing", error);

            }
        }
        getAllListing()
    }, [])

    if (!homeData) {
        return null
    }

    return (
        <div>
            <HomeList title="Newly listed homes" homeData={homeData} />
        </div>
    )
}

export default NewlyHome
