import {
    ChangeEvent,
    useEffect,
    useState
} from "react"
import { MdCloudUpload } from "react-icons/md";
import { app } from "@/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "@/components/ui/use-toast";
import {
    SubmitHandler, useForm
} from "react-hook-form";
import { ImageList } from "./ImageList";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/ui/input-label";
import TextArea from "@/components/ui/text-area";
import Checkbox from "@/components/ui/checkbox";
import SelectForm from "@/components/ui/select-form";
import { TbMeterSquare } from "react-icons/tb";
import { UserReduxType } from "@/features/user/userSlice";
import { dataFormType, dataHouseType } from "@/data/dataForm";
import { ListingType } from "@/types/types";

interface ListingFormProps {
    currentUser: UserReduxType
}

const ListingForm: React.FC<ListingFormProps> = ({ currentUser }) => {
    //todo: STATE
    const [valueOfferField, setValueOfferField] = useState<boolean>(false)
    const [formTypeValue, setFormTypeValue] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //todo: IMG UPLOAD STATE
    const [files, setUploadFiles] = useState<FileList | null>()
    const [imgUrls, setImgUrls] = useState<string[]>([])
    const [isLoadingUpload, setLoadingUpload] = useState<boolean>(false)

    //todo: FORM
    const {
        register,
        handleSubmit, setValue
    } = useForm<ListingType>({
        defaultValues: {
            name: '',
            description: '',
            address: '',
            location: {
                latitude: undefined,
                longitude: undefined
            },
            imgUrl: [],
            formType: undefined,
            houseType: undefined,
            furnished: false,
            parking: false,
            squaremetre: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            offer: false,
            regularPrice: undefined,
            discountPrice: undefined
        }
    })

    //todo: Firebase rule: a img is less than 2 MB
    // //todo: Upload cách 1
    // const submitUploadImg = async () => {
    //     //todo: submitUploadImg to update img to storage, then return res which is img array -> use img array to render layout -> submit create listing on DB
    //     //* Upload từng img trong mảng imgUrl vào storage
    //     if (files?.length === undefined) return
    //     if (files?.length > 0 && files?.length < 7) {
    //         //* condition: min:1, max:6 img
    //         //todo: Upload cách 1
    //         const promises: string[] = []
    //         for (const img of files) {
    //             //* Upload từng img trong mảng imgUrl, 
    //             promises.push(await uploadImg(img)) //* tuwfngF img sau khi upload sẽ được uploadImg được trả về sẽ push vào promises array
    //         }
    //         await Promise.all(promises)   //* Wait tất cả file mà promise array có được khi promise array được uploadImg function trả về các img, bởi vì uploadImg function là 1 Promise<string>
    //             .then((imgUrlArray: string[]) => {
    //                 setImgUrls(imgUrlArray)
    //             })
    //     }
    // }
    // const uploadImg = async (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const storage = getStorage(app);
    //         const imgName = new Date().getTime() + file.name;
    //         const storageRef = ref(storage, imgName);
    //         const uploadTask = uploadBytesResumable(storageRef, file)
    //         uploadTask.on("state_changed",
    //             (snapshot) => {
    //                 //todo: Nếu k sử dụng function này thì vẫn phải khai báo
    //                 console.log(snapshot);
    //             },
    //             (error) => {
    //                 reject(error)
    //             },    //* Xử lý nếu có error
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((imgUrl: string) => {
    //                     resolve(imgUrl)
    //                 })
    //             }   //* Trả về 1 imgUrl, xử lý để lấy từng img trả về
    //         )
    //     })
    // }

    //todo: Firebase rule: a img is less than 2MB
    //todo: Upload cách 2
    const submitUploadImg = async () => {
        try {
            setLoadingUpload(true)
            if (files?.length === undefined || files?.length <= 0) {
                return toast({
                    title: "Upload image Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "No image updated!"
                })
            }
            if (files?.length > 0 && files?.length < 7) {
                for (const img of files) {
                    await uploadImg(img)
                }
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: "Upload image is successfully."
                })
            } else {
                return toast({
                    title: "Upload image Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Images is invalid!"
                })
            }
        } catch (error) {
            console.log(error);
            return toast({
                title: "Upload image Listing",
                className: "bg-red-600 text-white rounded-[0.375rem]",
                description: 'Something went wrong!'
            })

        } finally {
            setLoadingUpload(false)
        }

    }
    const uploadImg = async (file: File): Promise<void> => {
        const storage = getStorage(app);
        const imgName = new Date().getTime() + file.name;
        const storageRef = ref(storage, imgName);
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            (snapshot) => {
                //todo: Nếu k sử dụng function này thì vẫn phải khai báo
                const progress = parseInt(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed())
                console.log(progress);
            },
            (error) => {
                console.log(error);
                return toast({
                    title: "Upload image Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Upload Image failed (2MB max per image)!"
                })
            },    //* Xử lý nếu có error
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                    setImgUrls((existing) => [...existing, url])     //* set từng img trả về vào mảng state imgUrls
                })
            }
        )
    }

    useEffect(() => {
        //todo: Update img array
        setValue("imgUrl", imgUrls)
    }, [setValue, imgUrls])

    const submitManagementForm: SubmitHandler<ListingType> = async (data): Promise<void> => {
        console.log("manager form", data);

        try {
            setIsLoading(true)
            await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'no-cache',
                body: JSON.stringify({ ...data, userId: currentUser.id })
            })
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
            window.location.reload()
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-5">
                <h3 className="text-3xl font-semibold text-center">Create Listing</h3>
                <form className="w-full md:w-[90%] m-auto flex flex-col gap-4" onSubmit={handleSubmit(submitManagementForm)}>
                    <div className="w-full flex flex-row items-center justify-between md:justify-start">
                        <input disabled={isLoading || isLoadingUpload} type="file" name="imgUrl" accept="image/*" multiple className="cursor-pointer italic text-sm file:font-semibold file:text-sm file:px-3 file:py-2 file:bg-violet-50 file:rounded-[1rem] file:border-0" onChange={e => {
                            if (e.target.files === null) {
                                return
                            }
                            setUploadFiles(e.target.files)
                        }} />
                        <Button disabled={isLoading || isLoadingUpload} type="button" className="bg-sky-700 flex flex-row items-center justify-center gap-1 px-2" onClick={submitUploadImg}><MdCloudUpload className="text-xl" />{!isLoadingUpload ? "Upload Image" : 'Uploading...'}</Button>
                    </div>
                    <div className="w-full">
                        <ImageList imageList={imgUrls} deleteImgStorage={() => { }} />
                    </div>
                    <div className="w-full md:grid grid-cols-2 gap-4">
                        <div className="w-full col-span-1 flex flex-col gap-3 mb-4 md:m-0">
                            <InputLabel disabled={isLoading} register={register} name="name" label="House Name" placeholder="House name" />
                            <TextArea disabled={isLoading} register={register} name="description" label="Description" placeholder="Describe your house..." />

                            <div className="bg-zinc-100 flex flex-col gap-2 p-4 rounded-[0.375rem]">
                                <h3 className="font-semibold">Location</h3>
                                <div className="pl-4 flex flex-col gap-2">
                                    <InputLabel disabled={isLoading} register={register} name="address" label="Address" placeholder="Address" />
                                    <div className="flex flex-row items-center justify-start gap-3">
                                        <h3 className="text-sm">Latitude</h3>
                                        <input {...register("location.latitude")} type="number" step="any" placeholder="10.123456" className="p-2 border border-black rounded-[0.375rem]" />
                                        <h3 className="text-sm">Longitude</h3>
                                        <input {...register("location.longitude")} type="number" step="any" placeholder="100.123456" className="p-2 border border-black rounded-[0.375rem]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full col-span-1 flex flex-col gap-4">
                            <SelectForm disabled={isLoading} register={register} name="formType" label="Business Types" data={dataFormType} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setFormTypeValue(e.currentTarget.value) }} />
                            <div className="flex flex-row items-center justify-start gap-3 flex-wrap">
                                <SelectForm disabled={isLoading} register={register} name="houseType" label="House Types" data={dataHouseType} />
                                <div className="flex flex-row items-center gap-1 justify-start">
                                    <InputLabel disabled={isLoading} register={register} name="squaremetre" width='w-[80px]' className="flex flex-row items-center justify-start" />
                                    <TbMeterSquare className="text-2xl" />
                                </div>
                                <InputLabel disabled={isLoading} register={register} name="bedrooms" label="Bedrooms:" width="w-[35px]" min={1} max={9} maxLength={1} className="flex flex-row items-center justify-start" />
                                <InputLabel disabled={isLoading} register={register} name="bathrooms" label="Bathrooms:" width="w-[35px]" min={1} max={9} maxLength={1} className="flex flex-row items-center justify-start" />
                            </div>
                            <div className="flex flex-row items-center justify-start gap-3">
                                <Checkbox disabled={isLoading} register={register} name='furnished' label="Furnished" />
                                <Checkbox disabled={isLoading} register={register} name='parking' label="Parking lot" />
                                <Checkbox disabled={isLoading} register={register} name='offer' label="Offer" onChange={() => setValueOfferField(!valueOfferField)} />
                            </div>
                            <InputLabel disabled={isLoading} register={register} name="regularPrice" label="Regular Price" placeholder={`${formTypeValue === "Rent" ? "VND / month" : "VND"}`} />
                            {valueOfferField && <InputLabel disabled={isLoading} register={register} name="discountPrice" label="Discount Price" placeholder={`${formTypeValue === "Rent" ? "VND / month" : "VND"}`} />}
                        </div>
                    </div>
                    <Button disabled={isLoading} type="submit" className="bg-teal-700 w-full md:w-[50%] m-auto">{!isLoading ? "Create" : "Creating..."}</Button>
                </form>
            </div >
        </div >
    )
}

export default ListingForm

