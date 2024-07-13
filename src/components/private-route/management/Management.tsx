import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import ListingForm from "./ListingForm"
import ListingList from "./ListingList"
import { toast } from "@/components/ui/use-toast"
import { listingCreate } from "@/features/listing/listingSlice"


export type ManagementFormType = {
    id?: string,
    name: string,
    description: string,
    address: string,
    imgUrl: string[],
    formType: string,
    houseType: string,
    offer: boolean,
    furnished: boolean,
    parking: boolean,
    squaremetre: number | undefined;
    bedrooms: number | undefined;
    bathrooms: number | undefined;
    regularPrice: number | undefined;
    discountPrice: number | undefined;
}

const Management = () => {
    //todo: CURRENTUSER
    const { currentUser } = useSelector((state: RootState) => state.user)
    const dataListingList = useSelector((state: RootState) => state.listing.currentListingList)
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState<boolean>(false)

    useEffect(() => {
        async function getListingList() {
            setIsloading(true)
            try {
                const res = await fetch(`/api/listing/get-listing-list/${currentUser.id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "Application/json",
                    }
                })
                if (res.ok) {
                    const listingList = await res.json()
                    dispatch(listingCreate(listingList))
                    // toast({
                    //     className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    //     description: 'Update listing is successfully.'
                    // })
                }
                else {
                    toast({
                        title: "Update Listing",
                        className: "bg-red-600 text-white rounded-[0.375rem]",
                        description: "Update listing is failed!"
                    })
                }
            } catch (error) {
                toast({
                    title: "Update Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Something went wrong!"
                })
            } finally {
                setIsloading(false)
            }
        }
        getListingList()
    }, [currentUser, dispatch])

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-9">
                <ListingForm currentUser={currentUser} />
                <ListingList
                    title="Listing Product"
                    dataListingList={dataListingList}
                    isLoading={isLoading}
                />
            </div>
        </div >
    )
}

export default Management
