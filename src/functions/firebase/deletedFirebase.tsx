import { app } from "@/firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";

import { toast } from "@/components/ui/use-toast";

export const deletedImg = async (imgUrl: string, listingId?: string) => {
    const storage = getStorage(app);
    // Create a reference to the file to delete
    const storageRef = ref(storage, imgUrl);
    // Delete the file
    await deleteObject(storageRef)
        .then(async () => {
            try {
                if (listingId) {
                    //todo: delete img trong DB để set lại dataListingItem
                    await fetch(`/api/listing/delete-image/${listingId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-cache",
                        body: JSON.stringify({ imgUrl }),
                    });
                }
            } catch (error) {
                return toast({
                    title: "Delete image storage",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Something went wrong!",
                });
            }
            // File deleted successfully
            toast({
                className: "bg-green-600 border-0 text-white rounded-[0.375rem]",
                description: "Delete image storage is successfully.",
            });
        })
        .catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);
        });
};
