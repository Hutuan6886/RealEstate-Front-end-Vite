import ListingForm from "./ListingForm"
import ListingList from "./ListingList"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

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

    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-9">
                <ListingForm currentUser={currentUser} />
                <ListingList currentUser={currentUser} />
            </div>
        </div >
    )
}

export default Management
