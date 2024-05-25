
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
    useEffect,
    useRef,
    useState
} from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "@/firebase";
import { Input } from "@/components/ui/input";
import { ProfileForm } from "@/form_schema/FormSchema";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Link } from "react-router-dom"
import { RiProfileLine } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { toast } from "@/components/ui/use-toast";

//todo: UPLOAD IMAGE
//todo: Sử dụng useRef để lấy giá trị của <input type="file" onChange={(e)=>setImageUpload(e....)} ref={fileRef}> thông qua <img onClick={fileRef...}> ---> giá trị onchange của <input type="file"> được save tại imgUpload state là typeof File ---> truyền imgUpload và handleImageUpload(imgUpload:File) function để push img to firebase storage ---> Sau khi POST image request to firebase storage, firebase sẽ trả về response 1 imgUrl typeof string ---> sử dụng imgUrl để hiển thị ---> POST request to DB ---> lưu imgUrl vào user info ở redux

type ProfileFormType = z.infer<typeof ProfileForm>
const Profile = () => {
    //todo: Hook
    const [imgUpload, setImageUpload] = useState<File>()
    const [imgFirebaseUrl, setImgFirebaseUrl] = useState<string>()
    const fileRef = useRef<HTMLInputElement>(null)
    //todo: Redux
    const { currentUser } = useSelector((state: RootState) => state.user)

    const profileForm = useForm<ProfileFormType>({
        resolver: zodResolver(ProfileForm),
        defaultValues: {
            userName: currentUser.userName || undefined,
            email: currentUser.email || undefined,
            gender: "",
            address: "",
            birthday: "",
            currentPassword: "",
            newPassword: "",
            reNewPassword: "",
            imgUrl: "",
        }
    })
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

    const submitProfileForm = async (data: ProfileFormType) => {
        console.log({ ...data, imgUrl: imgFirebaseUrl });
    }
    return (
        <div className="w-full h-full">
            <div className="w-full h-full grid grid-cols-4">
                <div className="col-span-1">
                    <div className="w-[80%] m-auto flex flex-col gap-11 items-start">
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
                    <h1 className="font-semibold text-3xl text-teal-700">User Information</h1>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(submitProfileForm)} className="w-full flex flex-col items-start gap-4">
                            <div className="w-full grid grid-cols-2 gap-4">
                                <FormField
                                    name="userName"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">User Name</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input type="text" placeholder="Lê Hữu Tuân" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-600" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Email</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input type="email" placeholder="tuan@gmail.com" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-600" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="gender"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Gender</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl className="rounded-[0.375rem]">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="bg-white">
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="birthday"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Birthday date</FormLabel>
                                            <FormControl className="rounded-[0.375rem]">
                                                <Input className="cursor-pointer" type="date" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="address"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Current Address</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input placeholder="1 Street - Ward - District - City" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    name="newPassword"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">New Password</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl >
                                            <FormMessage className="text-sm text-red-600" />
                                            <FormDescription></FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="currentPassword"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Current Password</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-600" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="reNewPassword"
                                    control={profileForm.control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className="font-semibold">Re-New Password</FormLabel>
                                            <FormControl className="rounded-[0.375rem] placeholder:text-zinc-400">
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-600" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full flex flex-row justify-end items-center gap-3">
                                <Button variant="ghost" type="submit">Reset</Button>
                                <Button variant="login" type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default Profile
