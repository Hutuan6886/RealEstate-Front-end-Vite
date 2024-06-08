

import {
    useEffect,
    useRef,
    useState
} from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "@/firebase";
import { Button } from "@/components/ui/button";
import {
    useDispatch,
    useSelector,
    // useDispatch 

} from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom"
import { RiProfileLine } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";

import { IoTrash } from "react-icons/io5";
import CredentialsProfile from "./CredentialsProfile";
import OauthProfile from "./OauthProfile";
import ModalDeleteUser from "@/components/modal/ModalDeleteUser";
import { closeDeleteModal, deleteFailure, deleteLoading, deleteSuccess, openDeleteModal } from "@/features/user/userSlice";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

//todo: UPLOAD IMAGE
//todo: Sử dụng useRef để lấy giá trị của <input type="file" onChange={(e)=>setImageUpload(e....)} ref={fileRef}> thông qua <img onClick={fileRef...}> ---> giá trị onchange của <input type="file"> được save tại imgUpload state là typeof File ---> truyền imgUpload và handleImageUpload(imgUpload:File) function để push img to firebase storage ---> Sau khi POST image request to firebase storage, firebase sẽ trả về response 1 imgUrl typeof string ---> sử dụng imgUrl để hiển thị ---> POST request to DB ---> lưu imgUrl vào user info ở redux


const Profile = () => {
    //todo: Hook
    const [imgUpload, setImageUpload] = useState<File>()
    const [imgFirebaseUrl, setImgFirebaseUrl] = useState<string>()
    const fileRef = useRef<HTMLInputElement>(null)
    //todo: Redux
    const { currentUser, isLoading, isOpenModal } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()


    /* //! FIREBASE RULE (write file < 2MB)
      allow read;
      allow write: if 
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches("image/.*"); */
    useEffect(() => {
        if (imgUpload) {
            handleImageUpload(imgUpload)
        }
    }, [imgUpload])

    const handleImageUpload = (file: File) => {
        const storage = getStorage(app)     //* create storage, {app} from "@/firebase"
        const imgName = new Date().getTime() + file.name    //* create imgName
        const storageRef = ref(storage, imgName) //* tạo nơi để lưu image trên storage theo imgName (Muốn tạo thêm folder: ref(storage, "newFolder/${imgName}"))
        const uploadTask = uploadBytesResumable(storageRef, file)   //* sử dụng upload method to upload img to storage theo tên cỉa img
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = parseInt(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed())       //* progress loading... to update img from 0 to 100%
                console.log(progress);
                toast({
                    title: "Update Avatar",
                    className: `${progress < 100 ? "text-zinc-600" : "text-green-600"}`,
                    description: `${progress < 100 ? `Loading...${progress}%` : "Success."}`
                })
            },
            (error) => {
                toast({
                    title: "Update Avatar",
                    className: "text-red-600",
                    description: error.message
                })
                console.log("Upload Error", error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => { setImgFirebaseUrl(imgUrl) }) //* imgUrl from firebase response back
            }
        )
    }

    const deleteUser = async (userId: string) => {
        try {
            dispatch(deleteLoading())
            const res = await fetch(`/api/user/delete/${userId}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                },
                cache: 'no-cache'
            })
            const { message } = await res.json()
            if (res.ok) {
                dispatch(deleteSuccess())
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: message
                })
            } else {
                toast({
                    variant: 'destructive',
                    className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                    description: message
                })
                dispatch(deleteFailure())
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            dispatch(deleteFailure())
        }
    }

    return (
        <div className="w-full h-full">
            {/* //todo: Modal delete*/}
            <ModalDeleteUser isLoading={isLoading} isOpen={isOpenModal} onClose={() => dispatch(closeDeleteModal())} onConfirm={() => { deleteUser(currentUser.id) }} />

            <div className="w-full h-full md:grid grid-cols-4">
                <div className="col-span-1 mb-3">
                    <div className="w-full md:w-[80%] m-auto flex flex-col gap-3 md:gap-11 items-start">
                        <input onChange={(e) => {
                            if (e.target.files === null) return
                            setImageUpload(e.target.files[0])
                        }} hidden accept="image/*" type="file" ref={fileRef} />
                        <img className="rounded-[50px] border-2 size-24 m-auto cursor-pointer" onClick={() => fileRef.current?.click()} src={imgFirebaseUrl ? imgFirebaseUrl as string : currentUser.imgUrl as string} alt="avatar" />
                        <div className="m-auto flex flex-col gap-4">
                            <Link to="/profile" className="flex flex-row items-center justify-start gap-4"><RiProfileLine size={22} /> User Information </Link>
                            <Link to="/management" className="flex flex-row items-center justify-start gap-4"><BiSolidDashboard size={22} /> Management</Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col items-start gap-11">
                    <div className="w-full flex flex-row justify-between items-center gap-4">
                        <h1 className="font-semibold text-3xl text-teal-700">User Information</h1>
                        <Button type="button" className="bg-transparent text-rose-700 hover:text-rose-600 text-3xl p-0" onClick={() => { dispatch(openDeleteModal()) }}><IoTrash /></Button>
                    </div>
                    {/* //todo: Credentials form and Oauth form */}
                    {currentUser.provider === 'credentials' ? <CredentialsProfile imgFirebaseUrl={imgFirebaseUrl} /> : <OauthProfile imgFirebaseUrl={imgFirebaseUrl} />}

                </div>
            </div>
        </div>
    )
}

export default Profile
