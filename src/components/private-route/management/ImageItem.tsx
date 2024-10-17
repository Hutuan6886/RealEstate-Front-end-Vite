import { cn } from "@/lib/utils"

import { IoClose } from "react-icons/io5"

interface ImageItemProps {
    index: number
    imgUrl: string
    onDelete: () => void
    className?: string
    handleDragStart: (index: number) => void
    handleDragEnd: () => void
}

const ImageItem: React.FC<ImageItemProps> = ({ index, imgUrl, onDelete, className, handleDragStart, handleDragEnd }) => {
    return (
        <div className={cn("w-fit rounded-[0.375rem] relative shadow-md", className)} draggable={true} >
            <IoClose className="absolute top-1 right-1 text-xl cursor-pointer" onClick={onDelete} />
            <img draggable src={imgUrl} alt={imgUrl} className="size-40 rounded-[0.375rem]"
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd} />
        </div>
    )
}

export default ImageItem



// interface ImageItemProps {
//     index: number
//     imgUrl: string
//     onDelete: () => void
//     className?: string
//     itemRef?: Ref<HTMLDivElement>
//     handleDragStart: (e: DragEvent<HTMLImageElement>, index: number) => void
//     handleDragEnter: (e: DragEvent<HTMLImageElement>, index: number) => void
//     handleDragEnd: (e: DragEvent<HTMLImageElement>, index: number) => void
// }

// const ImageItem: React.FC<ImageItemProps> = ({ index, imgUrl, onDelete, itemRef, className, handleDragStart, handleDragEnter, handleDragEnd }) => {
//     return (
//         <div ref={itemRef} className={cn("w-fit rounded-[0.375rem] relative shadow-md", className)} draggable={true} >
//             <IoClose className="absolute top-1 right-1 text-xl cursor-pointer" onClick={onDelete} />
//             <img draggable src={imgUrl} alt={imgUrl} className="size-40 rounded-[0.375rem]"
//                 onDragStart={(e: DragEvent<HTMLImageElement>) => handleDragStart(e, index)}
//                 onDragEnter={(e: DragEvent<HTMLImageElement>) => handleDragEnter(e, index)}
//                 onDragEnd={(e: DragEvent<HTMLImageElement>) => handleDragEnd(e, index)} />
//         </div>
//     )
// }