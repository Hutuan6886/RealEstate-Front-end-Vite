import { deleteObject, getStorage, ref } from "firebase/storage";
import ImageItem from "./ImageItem"
import { toast } from "@/components/ui/use-toast";
import { app } from "@/firebase";

interface ImageListProps {
    imageList: string[]
}

export const ImageList: React.FC<ImageListProps> = ({ imageList }) => {

    const deleteImgStorage = async (imgUrl: string) => {
        const storage = getStorage(app);
        // Create a reference to the file to delete
        const storageRef = ref(storage, imgUrl);
        // Delete the file
        deleteObject(storageRef).then(() => {
            // File deleted successfully
            toast({
                className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                description: 'Delete image storage is successfully.'
            })
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);

        });
    }

    return <div className="w-full flex flex-row items-center justify-start gap-4">
        {imageList.map((imgUrl, i) => (
            <ImageItem key={i} imgUrl={imgUrl} onDelete={() => { deleteImgStorage(imgUrl) }} />
        ))}
    </div>
}