import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { IoTrash } from "react-icons/io5"
import { ManagementFormType } from "./Management"
import { Link } from "react-router-dom"

interface ListingItemProps {
    maxChar: number
    dataListing: ManagementFormType;
    updateListingUrl: string
    onDelete: () => void
}

// const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, autem deserunt. Dolorem minima dicta deleniti laboriosam facilis commodi, perferendis enim repudiandae animi, sit eligendi ut maiores similique officia mollitia autem."

const ListingItem: React.FC<ListingItemProps> = ({ maxChar, dataListing, updateListingUrl, onDelete }) => {
    const [showReadmore, setShowReadmore] = useState<boolean>(false)

    //* description < 20 character -> render full description
    //*: description > 20 character -> use readmore button to expand description
    const textShow = !showReadmore ? dataListing.description.substring(0, maxChar) : dataListing.description  //* description hiển thị từ 0-> maxChar, nếu showReadmore=true thì hiển thị toàn bộ description

    return (
        <div className="w-[95%] h-full m-auto rounded-[0.375rem] shadow-lg p-3">
            <div className="flex flex-col items-start gap-2">
                <img src={dataListing.imgUrl[0]} alt={dataListing.imgUrl[0]} className=" w-full h-[250px] rounded-[0.375rem]" />
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold">{dataListing.name}</h3>
                    {
                        //*description < 20 character -> render full description, nếu description > 20 thì render textShow
                        dataListing.description.length < maxChar ? <p className="inline text-sm text-zinc-600">{dataListing.description}</p> : <div>
                            <p className="inline text-sm text-zinc-600">{textShow}</p>
                            <span className="cursor-pointer font-semibold text-sky-800 hover:text-sky-950 transition" onClick={() => setShowReadmore(!showReadmore)}>{!showReadmore ? "...Read More" : " Read Less"}</span>
                        </div>
                    }
                </div>
                <div className="w-full flex flex-row items-center justify-center gap-3">
                    <Link to={updateListingUrl}><Button variant="ghost" className="text-lg"><FaRegEdit /></Button></Link>
                    <Button className="text-white bg-rose-800 hover:bg-rose-900 transition text-lg" onClick={onDelete}><IoTrash /></Button>
                </div>
            </div>
        </div>
    )
}

export default ListingItem
