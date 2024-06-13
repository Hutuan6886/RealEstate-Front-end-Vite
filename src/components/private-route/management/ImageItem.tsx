import { IoClose } from "react-icons/io5"

interface ImageItemProps {
    imgUrl?: string
    onDelete: () => void
}

const ImageItem: React.FC<ImageItemProps> = ({ imgUrl, onDelete }) => {
    return (
        <div className="w-fit rounded-[0.375rem] relative shadow-md">
            <IoClose className="absolute top-1 right-1 text-xl cursor-pointer" onClick={onDelete} />
            <img src={imgUrl} alt={imgUrl} className="size-40 rounded-[0.375rem]" />
        </div>
    )
}

export default ImageItem
