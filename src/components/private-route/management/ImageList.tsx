
import ImageItem from "./ImageItem"

interface ImageListProps {
    imageList: string[]
    deleteImgStorage: (imgUrl: string) => void
}

export const ImageList: React.FC<ImageListProps> = ({ imageList, deleteImgStorage }) => {

    return <div className="w-full flex flex-row flex-wrap items-center justify-start gap-4">
        {imageList.map((imgUrl, i) => (
            <ImageItem key={i} imgUrl={imgUrl} onDelete={() => { deleteImgStorage(imgUrl) }} />
        ))}
    </div>
}