import {
  // useEffect, 
  useState
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ListingReduxType,
  closeDeleteListingModal,
  // listingCreate, 
  listingDelete, openDeleteListingModal
} from "@/features/listing/listingSlice";
import { RootState } from "@/redux/store";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "@/firebase";

import { toast } from "@/components/ui/use-toast"
// import { UserReduxType } from "@/features/user/userSlice";
import ListingItem from "./ListingItem";
import ModalDelete from "@/components/modal/ModalDelete";
import { ListingType } from "@/types/types";


interface ListingListProps {
  title: string;
  description?: string
  dataListingList: ListingReduxType[] | ListingType[]
  isLoading: boolean
}

const ListingList: React.FC<ListingListProps> = ({ title, description, dataListingList, isLoading }) => {
  //todo: STATE

  const isOpenDeleteModal: boolean = useSelector((state: RootState) => state.listing.isOpenDeleteModal)

  const dispatch = useDispatch()
  const [listingClicked, setListingClicked] = useState<ListingReduxType>()

  const deleteListingItem = async (listingId: string | undefined, listingImgUrl: string[] | undefined): Promise<void> => {
    try {
      const res = await fetch(`/api/listing/delete-listing-item/${listingId}`, {
        method: 'Delete',
        headers: {
          "Content-Type": "Application/json"
        },
        cache: 'no-cache'
      })
      if (res.ok) {
        const listingDeleted = await res.json()
        dispatch(listingDelete(listingDeleted))

        if (!listingImgUrl) {
          return
        }
        for (const imgUrl of listingImgUrl) {
          //todo: Delete listing item phải delete những img của nó ở storage
          await deleteImgOfListing(imgUrl)
        }
        toast({
          className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
          description: 'Delete listing is successfully.'
        })
      } else {
        toast({
          title: "Delete Listing",
          className: "bg-red-600 text-white rounded-[0.375rem]",
          description: "Delete listing is failed!"
        })
      }
    } catch (error) {
      console.log("LISTING_LIST", error);
    }
    finally {
      dispatch(closeDeleteListingModal())
    }
  }

  const deleteImgOfListing = async (imgUrl: string): Promise<void> => {
    const storage = getStorage(app);
    // Create a reference to the file to delete
    const storageRef = ref(storage, imgUrl);
    // Delete the file
    await deleteObject(storageRef).then(async () => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    })
  }

  if (isLoading) {
    return null
  }

  return (
    <div className="w-full h-full my-10">
      <div className=" flex flex-col gap-5">
        <div className="w-[90%] md:w-[50%] m-auto flex flex-col gap-3">
          <h3 className="text-3xl text-center font-semibold">{title}</h3>
          <p className="text-zinc-600 text-sm text-center">{description}</p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {dataListingList?.map((dataListing: ListingReduxType) => (
            <div key={dataListing.id}>
              <ListingItem maxChar={50} dataListing={dataListing} onDelete={() => {
                dispatch(openDeleteListingModal())
                setListingClicked(dataListing)
              }} updateListingUrl={`/management/${dataListing.id}`} />
            </div>
          ))}
          <ModalDelete title={`Delete ${listingClicked?.name} Listing Item`} description="For sure you want to delete it?" isOpen={isOpenDeleteModal} onClose={() => { dispatch(closeDeleteListingModal()) }} onConfirm={() => { deleteListingItem(listingClicked?.id, listingClicked?.imgUrl) }} />
        </div>
      </div>
    </div>
  )
}

export default ListingList
