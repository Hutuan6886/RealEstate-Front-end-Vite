import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeDeleteListingModal, listingCreate, listingDelete, openDeleteListingModal } from "@/features/listing/listingSlice";
import { RootState } from "@/redux/store";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { app } from "@/firebase";

import { toast } from "@/components/ui/use-toast"
import { UserReduxType } from "@/features/user/userSlice";
import ListingItem from "./ListingItem";
import ModalDelete from "@/components/modal/ModalDelete";
import { ManagementFormType } from "./Management";


interface ListingItemProps {
  currentUser: UserReduxType
}

const ListingList: React.FC<ListingItemProps> = ({ currentUser }) => {
  //todo: STATE
  const dataListingList = useSelector((state: RootState) => state.listing.currentListingList)
  const isOpenDeleteModal = useSelector((state: RootState) => state.listing.isOpenDeleteModal)

  const dispatch = useDispatch()
  const [listingClicked, setListingClicked] = useState<ManagementFormType>()

  useEffect(() => {
    async function getListingList() {
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
          toast({
            className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
            description: 'Update listing is successfully.'
          })
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
      }
    }
    getListingList()
  }, [currentUser, dispatch])

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

  return (
    <div className="w-full h-full">
      <h3 className="text-3xl text-teal-700 text-center font-semibold mb-5">Listing</h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {dataListingList?.map((dataListing: ManagementFormType) => (
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
  )
}

export default ListingList
