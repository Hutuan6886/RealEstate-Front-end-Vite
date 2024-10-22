import { ListingReduxType } from "@/types/types"
import { useEffect, useState } from "react"

const useGetListingList = (url: string) => {
    const [dataListingList, setDataListingList] = useState<ListingReduxType[]>()
    const [error, setError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const res = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    cache: "no-cache"
                })
                if (res.ok) {
                    const allListing = await res.json()
                    setDataListingList(allListing)
                }
            } catch (error: unknown) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [url])

    const sortListingFunction = (field: string, sort: string) => {
        if (field === 'regularPrice') {
            if (sort === "asc") {
                setDataListingList((existing) => existing && [...existing.sort((previousItem: ListingReduxType, nextItem: ListingReduxType) => (previousItem.regularPrice as number) - (nextItem.regularPrice as number))])
            } else if (sort === "desc") {
                setDataListingList((existing) => existing && [...existing.sort((previousItem: ListingReduxType, nextItem: ListingReduxType) => (nextItem.regularPrice as number) - (previousItem.regularPrice as number))])
            }
        }
        else if (field === 'createAt') {
            if (sort === "asc") {
                setDataListingList((existing) => existing && [...existing.sort((previousItem: ListingReduxType, nextItem: ListingReduxType) => new Date(previousItem.createAt).valueOf() - new Date(nextItem.createAt).valueOf())])
            } else if (sort === "desc") {
                setDataListingList((existing) => existing && [...existing.sort((previousItem: ListingReduxType, nextItem: ListingReduxType) => new Date(nextItem.createAt).valueOf() - new Date(previousItem.createAt).valueOf())])
            }
        }
    }
    return { isLoading, error, dataListingList, setDataListingList, sortListingFunction }
}

export default useGetListingList