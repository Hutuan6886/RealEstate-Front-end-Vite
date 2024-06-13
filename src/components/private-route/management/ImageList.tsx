import ImageItem from "./ImageItem"

interface ImageListProps {
    imageList: string[]
}

export const ImageList: React.FC<ImageListProps> = ({ imageList }) => {
    return <div className="w-full flex flex-row items-center justify-start gap-4">
        {imageList.map((imgUrl, i) => (
            <ImageItem key={i} imgUrl={imgUrl} onDelete={() => { }} />
        ))}
    </div>
}