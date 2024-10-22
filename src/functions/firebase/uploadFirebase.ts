import { toast } from "@/components/ui/use-toast";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const uploadImg = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const imgName = new Date().getTime() + file.name;
    const storageRef = ref(storage, imgName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //todo: Nếu k sử dụng function này thì vẫn phải khai báo
        console.log(snapshot);
        const progress = parseInt(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
        );
        console.log(progress);
      },
      (error) => {
        reject(error);
        return toast({
          title: "Upload image Listing",
          className: "bg-red-600 text-white rounded-[0.375rem]",
          description: "Upload Image failed (2MB max per image)!",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((imgUrl: string) => {
          resolve(imgUrl);
        });
      } //* Trả về 1 imgUrl, xử lý để lấy từng img trả về
    );
  });
};
