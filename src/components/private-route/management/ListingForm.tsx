import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { POST_CREATE_LISTING } from "@/data/apiUrl";
import { uploadImg } from "@/functions/firebase/uploadFirebase";
import { deletedImg } from "@/functions/firebase/deletedFirebase";
import { addListing } from "@/features/user/userSlice";
import { dataFormType, dataHouseType } from "@/data/dataForm";
import { UserReduxType } from "@/types/types";
import { toast } from "@/components/ui/use-toast";
import { ManageListingFormSchema } from "@/form_schema/FormSchema";

import InputLabel from "@/components/ui/input-label";
import InputCurrencyB from "@/components/ui/input-currency-B";
import TextArea from "@/components/ui/text-area";
import Checkbox from "@/components/ui/checkbox";
import SelectForm from "@/components/ui/select-form";
import FilterKeywords from "@/components/ui/filter-keywords";

import { ImageList } from "./ImageList";
import { Button } from "@/components/ui/button";

import { TbMeterSquare } from "react-icons/tb";
import { MdCloudUpload } from "react-icons/md";

interface ListingFormProps {
    title: string
    currentUser: UserReduxType
}

export type ManageListingFormType = z.infer<typeof ManageListingFormSchema>

const ListingForm: React.FC<ListingFormProps> = ({ title, currentUser }) => {
    //todo: STATE
    const [valueOfferField, setValueOfferField] = useState<boolean>(false)
    const [formTypeValue, setFormTypeValue] = useState<string>()

    //todo: IMG UPLOAD STATE
    const [isLoadingUpload, setLoadingUpload] = useState<boolean>(false)
    const [files, setUploadFiles] = useState<FileList | null>()

    const dispatch = useDispatch()

    //todo: FORM
    const {
        register, watch, reset,
        handleSubmit, setValue, formState: { errors, isSubmitting }
    } = useForm<ManageListingFormType>({
        defaultValues: {
            name: '',
            description: '',
            address: {
                number: '',
                street: '',
                ward: '',
                district: '',
                city: '',
            },
            location: {
                latitude: undefined,
                longitude: undefined
            },
            imgUrl: [],
            formType: undefined,
            houseType: undefined,
            furnished: false,
            parking: false,
            offer: false,
            amenities: [],
            squaremetre: undefined,
            bedrooms: undefined,
            bathrooms: undefined,
            regularPrice: '0',
            discountPrice: '0'
        },
        resolver: zodResolver(ManageListingFormSchema)
    })

    //todo: Firebase rule: a img is less than 2 MB
    //todo: Upload cách 1
    const submitUploadImg = async () => {
        //todo: submitUploadImg to update img to storage, then return res which is img array -> use img array to render layout -> submit create listing on DB
        //* Upload từng img trong mảng imgUrl vào storage
        if (files?.length === undefined) return
        if (files?.length > 0 && files?.length < 7) {
            setLoadingUpload(true)
            //* condition: min:1, max:6 img
            //todo: Upload cách 1
            const promises: string[] = []
            for (const img of files) {
                //* Upload từng img trong mảng imgUrl, 
                promises.push(await uploadImg(img)) //* từng img sau khi upload sẽ được uploadImg được trả về sẽ push vào promises array
            }
            await Promise.all(promises)   //* Wait tất cả file mà promise array có được khi promise array được uploadImg function trả về các img, bởi vì uploadImg function là 1 Promise<string>
                .then((imgUrlArray: string[]) => {
                    setValue("imgUrl", [...watch("imgUrl"), ...imgUrlArray]) //* set imgUrlArray trả về vào imgUrls form là img data để hiển thị trên layouts
                    toast({
                        className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                        description: 'Upload image successfully.'
                    });
                }).finally(() => {
                    setLoadingUpload(false)
                })
        }
    }

    // //todo: Upload cách 2
    // const submitUploadImg = async () => {
    //     try {
    //         setLoadingUpload(true)
    //         if (files?.length === undefined || files?.length <= 0) {
    //             return toast({
    //                 title: "Upload image Listing",
    //                 className: "bg-red-600 text-white rounded-[0.375rem]",
    //                 description: "No image updated!"
    //             })
    //         }
    //         if (files?.length > 0 && files?.length < 7) {
    //             for (const img of files) {
    //                 await uploadImg(img)
    //             }
    //             toast({
    //                 className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
    //                 description: "Upload image is successfully."
    //             })
    //         } else {
    //             return toast({
    //                 title: "Upload image Listing",
    //                 className: "bg-red-600 text-white rounded-[0.375rem]",
    //                 description: "Images is invalid!"
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return toast({
    //             title: "Upload image Listing",
    //             className: "bg-red-600 text-white rounded-[0.375rem]",
    //             description: 'Something went wrong!'
    //         })

    //     } finally {
    //         setLoadingUpload(false)
    //     }
    // }
    // const uploadImg = async (file: File): Promise<void> => {
    //     const storage = getStorage(app);
    //     const imgName = new Date().getTime() + file.name;
    //     const storageRef = ref(storage, imgName);
    //     const uploadTask = uploadBytesResumable(storageRef, file)
    //     uploadTask.on("state_changed",
    //         (snapshot) => {
    //             //todo: Nếu k sử dụng function này thì vẫn phải khai báo
    //             const progress = parseInt(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed())
    //             console.log(progress);
    //         },
    //         (error) => {
    //             console.log(error);
    //             return toast({
    //                 title: "Upload image Listing",
    //                 className: "bg-red-600 text-white rounded-[0.375rem]",
    //                 description: "Upload Image failed (2MB max per image)!"
    //             })
    //         },    //* Xử lý nếu có error
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
    //                 setValue("imgUrl", [...watch("imgUrl"), url]) //* set từng img trả về vào imgUrls form là data để hiển thị trên layouts
    //             })
    //         }
    //     )
    // }

    const deleteImgStorage = async (imgUrl: string) => {
        //todo: delete img trong firebase
        deletedImg(imgUrl).then(() => {
            //todo: Delete imgUrl tại form để hiển thị trên layout
            setValue("imgUrl", [...watch("imgUrl").filter((img: string) => img !== imgUrl)])
        })
    }

    const changeCheckedOffer = (e: ChangeEvent<HTMLInputElement>) => {
        setValueOfferField(e.target.checked)
        if (!e.target.checked) {
            setValue("discountPrice", "0")
        }
    }

    const submitManagementForm = async (data: ManageListingFormType) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_ROUTE}${POST_CREATE_LISTING}`, {
                credentials: "include",
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                cache: 'no-cache',
                body: JSON.stringify({ ...data, userId: currentUser.id })
            })
            if (res.ok) {
                const newListing = await res.json();
                dispatch(addListing(newListing));
                reset();
            }
            else {
                toast({
                    title: "Create Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Create listing failed!"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-5">
                <h3 className="text-3xl font-semibold text-center">{title}</h3>
                <form className="w-full md:w-[90%] m-auto flex flex-col gap-4" onSubmit={handleSubmit(submitManagementForm)}>
                    <div className="w-full flex flex-row items-center justify-between md:justify-start">
                        <input disabled={isSubmitting || isLoadingUpload} type="file" name="imgUrl" accept="image/*" multiple className="cursor-pointer italic text-sm file:font-semibold file:text-sm file:px-3 file:py-2 file:bg-violet-50 file:rounded-[1rem] file:border-0" onChange={e => {
                            if (e.target.files === null) {
                                return
                            }
                            setUploadFiles(e.target.files)
                        }} />
                        <Button disabled={isSubmitting || isLoadingUpload} type="button" className="bg-sky-700 flex flex-row items-center justify-center gap-1 px-2" onClick={submitUploadImg}><MdCloudUpload className="text-xl" />{!isLoadingUpload ? "Upload Image" : 'Uploading...'}</Button>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <ImageList imageList={watch("imgUrl")} deleteImgStorage={deleteImgStorage} pathName="imgUrl" setValue={setValue} />
                        {errors.imgUrl?.message && watch("imgUrl").length < 3
                            && <p className="text-rose-800 text-xs">{errors.imgUrl?.message}</p>}
                    </div>
                    <div className="w-full md:grid grid-cols-2 gap-4">
                        <div className="w-full col-span-1 flex flex-col gap-3 mb-4 md:m-0">
                            <InputLabel disabled={isSubmitting} register={register} message={errors.name?.message} name="name" label="House Name" placeholder="House name" />
                            <TextArea disabled={isSubmitting} register={register} message={errors.description?.message} name="description" label="Description" placeholder="Describe your house..." />
                        </div>
                        <div className="w-full col-span-1 flex flex-col gap-4">
                            <SelectForm disabled={isSubmitting} register={register} message={errors.formType?.message} name="formType" label="Business Types" data={dataFormType} onChange={(e: ChangeEvent<HTMLSelectElement>) => { setFormTypeValue(e.currentTarget.value) }} />
                            <SelectForm disabled={isSubmitting} register={register} message={errors.houseType?.message} name="houseType" label="House Types" data={dataHouseType} />
                            <div className="flex flex-row flex-nowrap items-center justify-start gap-3">
                                <div className="flex flex-row items-center gap-1 justify-start">
                                    <InputLabel type="number" disabled={isSubmitting} register={register} valueAsNumber={true} message={errors.squaremetre?.message} name="squaremetre" label="Square feet:" width='w-[80px]' className="flex flex-row items-center justify-start" />
                                    <TbMeterSquare className="text-2xl" />
                                </div>
                                <InputLabel type="number" disabled={isSubmitting} register={register} valueAsNumber={true} message={errors.bedrooms?.message} name="bedrooms" label="Bedrooms:" width="w-[35px]" min={1} max={9} maxLength={1} className="flex flex-row items-center justify-start" />
                                <InputLabel type="number" disabled={isSubmitting} register={register} valueAsNumber={true} message={errors.bathrooms?.message} name="bathrooms" label="Bathrooms:" width="w-[35px]" min={1} max={9} maxLength={1} className="flex flex-row items-center justify-start" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="text-sm ">Amenities of House</h3>
                                <div className="flex flex-row items-center justify-start gap-3">
                                    <Checkbox disabled={isSubmitting} register={register} message={errors.furnished?.message} name='furnished' label="Furnished" />
                                    <Checkbox disabled={isSubmitting} register={register} message={errors.parking?.message} name='parking' label="Parking lot" />
                                    <Checkbox disabled={isSubmitting} register={register} message={errors.offer?.message} name='offer' label="Offer" onChange={changeCheckedOffer} />
                                </div>
                                <FilterKeywords nameField="amenities" setValue={setValue} watch={watch} />
                            </div>
                            <InputCurrencyB name="regularPrice" label="Regular Price" register={register} setValue={setValue} message={errors.regularPrice?.message} />
                            {valueOfferField
                                && <InputCurrencyB name="discountPrice" label="Discount Price" register={register} setValue={setValue} message={errors.discountPrice?.message} placeholder={`${formTypeValue === "Rent" ? "VND / month" : "VND"}`} />}
                        </div>
                    </div>
                    <div className="bg-zinc-100 flex flex-col gap-2 p-4 rounded-[0.375rem]">
                        <h3 className="font-semibold">Location</h3>
                        <div className="pl-4 flex flex-col gap-2">
                            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-center gap-5">
                                <InputLabel disabled={isSubmitting} register={register} message={errors.address?.number?.message} name="address.number" label="Number" placeholder="01" />
                                <InputLabel disabled={isSubmitting} register={register} message={errors.address?.street?.message} name="address.street" label="Street" placeholder="Đỗ Xuân Hợp" />
                                <InputLabel disabled={isSubmitting} register={register} message={errors.address?.ward?.message} name="address.ward" label="Ward" placeholder="Phước Long B" />
                                <InputLabel disabled={isSubmitting} register={register} message={errors.address?.district?.message} name="address.district" label="District" placeholder="TP.Thủ Đức" />
                                <InputLabel disabled={isSubmitting} register={register} message={errors.address?.city?.message} name="address.city" label="City" placeholder="Hồ Chí Minh" />
                            </div>
                            <div className=" flex flex-col gap-3">
                                <InputLabel disabled={isSubmitting} register={register} message={errors.location?.latitude?.message} name="location.latitude" label="Latitude" placeholder="10.123456" />
                                <InputLabel disabled={isSubmitting} register={register} message={errors.location?.longitude?.message} name="location.longitude" label="Longitude" placeholder="100.123456" />
                            </div>
                        </div>
                    </div>
                    <Button disabled={isSubmitting} type="submit" className="bg-teal-700 w-full md:w-[50%] m-auto">{!isSubmitting ? "Create" : "Creating..."}</Button>
                </form>
            </div >
        </div >
    )
}

export default ListingForm

