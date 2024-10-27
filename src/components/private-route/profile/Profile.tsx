import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"

import { deletedImg } from "@/functions/firebase/deletedFirebase";
import { RootState } from "@/redux/store";
import { closeDeleteUserModal, deleteUserFailure, deleteUserLoading, deleteUserSuccess, openDeleteUserModal } from "@/features/user/userSlice";

import { DELETE_USER } from "@/data/apiUrl";
import CredentialsProfile from "./CredentialsProfile";
import OauthProfile from "./OauthProfile";
import ModalDelete from "@/components/modal/ModalDelete"

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

import { BiSolidDashboard } from "react-icons/bi";
import { IoTrash } from "react-icons/io5";
import { uploadImg } from "@/functions/firebase/uploadFirebase";

//todo: UPLOAD IMAGE
//todo: Sử dụng useRef để lấy giá trị của <input type="file" onChange={(e)=>setImageUpload(e....)} ref={fileRef}> thông qua <img onClick={fileRef...}> ---> giá trị onchange của <input type="file"> được save tại imgUpload state là typeof File ---> truyền imgUpload và handleImageUpload(imgUpload:File) function để push img to firebase storage ---> Sau khi POST image request to firebase storage, firebase sẽ trả về response 1 imgUrl typeof string ---> sử dụng imgUrl để hiển thị ---> POST request to DB ---> lưu imgUrl vào user info ở redux

const Profile = () => {
    //todo: Hook
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

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return
        if (currentUser.imgUrl !== "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png") {
            //todo: "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png" là default avatar tạo tại DB schema
            //todo: Nếu currentUserAvatar !== "https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png" => không phải là default avatar => Thực hiện xoá ava cũ tại firebase và DB
            //todo: delete img trong firebase
            deletedImg(currentUser.imgUrl)
        }
        //todo: Sau khi xoá avatar cũ => thực hiện tạo avatar mới
        const newAvatar: File = e.target.files[0]
        await uploadImg(newAvatar).then((imgUrl: string) => {
            setImgFirebaseUrl(imgUrl)
            toast({
                className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                description: "Update Avatar is successfully."
            })
        })
    }

    const deleteUser = async (userId: string) => {
        try {
            dispatch(deleteUserLoading())
            const res = await fetch(`${import.meta.env.VITE_API_ROUTE}${DELETE_USER}/${userId}`, {
                credentials: "include",
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                cache: 'no-cache'
            })
            const { message } = await res.json()
            if (res.ok) {
                //todo: Nếu delete user thành công, delete imgUrl trong firebase
                deletedImg(currentUser.imgUrl)
                dispatch(deleteUserSuccess())
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
                dispatch(deleteUserFailure())
            }
        } catch (error) {
            toast({
                variant: "destructive",
                className: 'bg-red-600 border-0 text-white rounded-[0.375rem]',
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
            dispatch(deleteUserFailure())
        }
    }

    return (
        <div className="w-full h-full">
            {/* //todo: Modal delete*/}
            <ModalDelete title="Delete User" description="For sure you want to delete it?" isLoading={isLoading} isOpen={isOpenModal} onClose={() => dispatch(closeDeleteUserModal())} onConfirm={() => { deleteUser(currentUser.id) }} />

            <div className="w-full h-full md:grid grid-cols-4">
                <div className="col-span-1 mb-3">
                    <div className="w-full md:w-[80%] m-auto flex flex-col gap-3 md:gap-11 items-start">
                        <input
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleImageUpload(e)}
                            hidden accept="image/*" type="file" ref={fileRef} />
                        <img className="rounded-[50px] border-2 size-24 m-auto cursor-pointer" onClick={() => fileRef.current?.click()} src={imgFirebaseUrl ? imgFirebaseUrl as string : currentUser.imgUrl as string} alt="avatar" />
                        <div className="m-auto flex flex-col gap-4">
                            <Link to="/management" className="flex flex-row items-center justify-start gap-4 text-sm lg:text-base"><BiSolidDashboard size={22} /> Product Management</Link>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col items-start gap-11">
                    <div className="w-full flex flex-row justify-between items-center gap-4">
                        <h1 className="font-semibold text-3xl text-teal-700">User Information</h1>
                        <Button type="button" className="bg-transparent text-rose-700 hover:text-rose-600 text-3xl p-0" onClick={() => { dispatch(openDeleteUserModal()) }}><IoTrash />
                        </Button>
                    </div>
                    {/* //todo: Credentials form and Oauth form */}
                    {currentUser.provider === 'credentials' ? <CredentialsProfile imgFirebaseUrl={imgFirebaseUrl} /> : <OauthProfile imgFirebaseUrl={imgFirebaseUrl} />}

                </div>
            </div>
        </div>
    )
}

export default Profile
