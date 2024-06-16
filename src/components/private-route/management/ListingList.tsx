import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast"
import { UserReduxType } from "@/features/user/userSlice";
import ListingItem from "./ListingItem";
import ModalDelete from "@/components/modal/ModalDelete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { listingCreate, listingDelete } from "@/features/listing/listingSlice";
import { ManagementFormType } from "./Management";

interface ListingItemProps {
  currentUser: UserReduxType
}

const ListingList: React.FC<ListingItemProps> = ({ currentUser }) => {
  //todo: STATE
  const dataListingList = useSelector((state: RootState) => state.listing.currentListingList)
  const dispatch = useDispatch()

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  useEffect(() => {
    async function getListingList() {
      try {
        const res = await fetch(`/api/listing/get-listing/${currentUser.id}`, {
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

  const deleteListingItem = async (listingId: string | undefined) => {
    try {
      const res = await fetch(`/api/listing/delete-listing/${listingId}`, {
        method: 'Delete',
        headers: {
          "Content-Type": "Application/json"
        },
        cache: 'no-cache'
      })
      if (res.ok) {
        const listingDeleted = await res.json()
        dispatch(listingDelete(listingDeleted))
        toast({
          className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
          description: 'Delete listing is successfully.'
        })
        // setDataListingList((prev) => prev?.filter(listing => listing.id !== listingDeleted.id))
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
      setOpenModalDelete(false)
    }
  }
  return (
    <div className="w-[90%] m-auto h-full">
      <h3 className="text-3xl text-teal-700 text-center font-semibold mb-5">Listing</h3>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {dataListingList?.map((dataListing: ManagementFormType, i) => (
          <div key={i}>
            <ListingItem maxChar={50} dataListing={dataListing} onDelete={() => { setOpenModalDelete(true) }} onUpdate={() => { console.log(dataListing.id) }} />
            <ModalDelete title={`Delete ${dataListing.name} Listing Item`} description="For sure you want to delete it?" isOpen={openModalDelete} onClose={() => { setOpenModalDelete(false) }} onConfirm={() => { deleteListingItem(dataListing.id) }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListingList
