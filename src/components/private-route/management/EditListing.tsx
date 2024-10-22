import { ChangeEvent, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useGetListing from "@/hooks/useGetListing";
import { uploadImg } from "@/functions/firebase/uploadFirebase";
import { deletedImg } from "@/functions/firebase/deletedFirebase";
import { ManageListingFormSchema } from "@/form_schema/FormSchema";
import { updateListing } from "@/features/user/userSlice";

import InputLabel from "@/components/ui/input-label"
import InputCurrencyB from "@/components/ui/input-currency-B";
import TextArea from "@/components/ui/text-area"
import SelectForm from "@/components/ui/select-form"
import Checkbox from "@/components/ui/checkbox"
import FilterKeywords from "@/components/ui/filter-keywords";

import { Button } from "@/components/ui/button"
import { ImageList } from "./ImageList"
import { ManageListingFormType } from "./ListingForm";
import { toast } from "@/components/ui/use-toast"

import { MdCloudUpload } from "react-icons/md"
import { TbMeterSquare } from "react-icons/tb"

const dataFormType = [{ value: 'Rent', label: 'Rent' }, { value: 'Sell', label: 'Sell' }]
const dataHouseType = [{ value: 'Villa', label: 'Villa' }, { value: 'Duplex', label: 'Duplex' }, { value: 'Penthouse', label: 'Penthouse' }, { value: 'DetachedHouse', label: 'Detached House' }, { value: 'SemiDetachedHouse', label: 'Semi-detached House' }, { value: 'Apartment', label: 'Apartment' }, { value: 'Studio', label: 'Studio' }]


const EditListing = () => {
    //todo: STATE
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [valueOfferField, setValueOfferField] = useState<boolean>(false)
    const [formTypeValue, setFormTypeValue] = useState<string>()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { listingId } = useParams()

    //todo: IMG UPLOAD STATE
    const [isLoadingUpload, setLoadingUpload] = useState<boolean>(false)
    const [files, setUploadFiles] = useState<FileList | null>()


    //todo: FORM
    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting },
        reset } = useForm<ManageListingFormType>({
            defaultValues: {
                id: '',
                name: '',
                description: '',
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
                regularPrice: "",
                discountPrice: "",
                address: {
                    number: "",
                    street: "",
                    ward: "",
                    district: "",
                    city: ""
                },
                location: {
                    latitude: "0",
                    longitude: "0"
                }
            },
            resolver: zodResolver(ManageListingFormSchema)
        })

    const changeCheckedOffer = (e: ChangeEvent<HTMLInputElement>) => {
        setValueOfferField(e.target.checked)
        if (!e.target.checked) {
            setValue("discountPrice", "0")
        }
    }

    //todo: GET DATA LISTING
    const { dataListing } = useGetListing(`/api/listing/get-listing-item/${listingId}`)

    useEffect(() => {
        //todo: DECLARE DATA LISTING TO FORM
        if (dataListing) {
            reset({
                id: dataListing.id,
                name: dataListing.name,
                description: dataListing.description,
                imgUrl: [...dataListing.imgUrl],
                formType: dataListing.formType as ManageListingFormType["formType"],
                houseType: dataListing.houseType as ManageListingFormType["houseType"],
                furnished: dataListing.furnished,
                parking: dataListing.parking,
                offer: dataListing.offer,
                amenities: dataListing.amenities,
                squaremetre: dataListing.squaremetre,
                bedrooms: dataListing.bedrooms,
                bathrooms: dataListing.bathrooms,
                regularPrice: Intl.NumberFormat("vi-VN").format(dataListing.regularPrice),     //* Convert number to value of number with comma
                discountPrice: Intl.NumberFormat("vi-VN").format(dataListing.discountPrice as number) || "",
                address: {
                    number: dataListing.address.number,
                    street: dataListing.address.street,
                    ward: dataListing.address.ward,
                    district: dataListing.address.district,
                    city: dataListing.address.city,
                },
                location: {
                    latitude: dataListing.location.latitude,
                    longitude: dataListing.location.longitude
                },
            });
            setValueOfferField(dataListing.offer)
        }
    }, [dataListing, reset, setValueOfferField])


    //todo: Firebase rule: a img is less than 2 MB
    // //todo: Upload cách 1
    const submitUploadImg = async () => {
        //todo: submitUploadImg to update img to storage, then return res which is img array -> use img array to render layout -> submit create listing on DB
        //* Upload từng img trong mảng imgUrl vào storage
        if (files?.length === undefined) return
        if (files?.length > 0 && files?.length < 7) {
            setLoadingUpload(true)
            //* condition: min:1, max:6 img
            const promises: string[] = []
            for (const img of files) {
                //* Upload từng img trong mảng imgUrl, 
                promises.push(await uploadImg(img)) //* tuwfngF img sau khi upload sẽ được uploadImg được trả về sẽ push vào promises array
            }
            await Promise.all(promises)   //* Wait tất cả file mà promise array có được khi promise array được uploadImg function trả về các img, bởi vì uploadImg function là 1 Promise<string>
                .then((imgUrlArray: string[]) => {
                    setValue("imgUrl", [...watch("imgUrl"), ...imgUrlArray])
                }).finally(() => {
                    setLoadingUpload(false)
                })
        }
    }

    const deleteImgStorage = (imgUrl: string) => {
        // //todo: delete img trong firebase và database
        deletedImg(imgUrl, listingId).then(() => {
            //todo: Delete imgUrl trong form, bởi vì imgUrl là image data trên layout
            setValue("imgUrl", [
                ...watch("imgUrl").filter((img: string) => img !== imgUrl),
            ]);
        })

    }

    const submitUpdateListing = async (data: ManageListingFormType): Promise<void> => {
        setIsLoading(true)
        try {
            const res = await fetch(`/api/listing/update-listing-item/${listingId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                }, cache: "no-cache",
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const listing = await res.json();
                dispatch(updateListing(listing));
                navigate('/management')
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: 'Update listing successfully.'
                })
            }
            else {
                toast({
                    title: "Update Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Update listing failed!"
                })
            }
        } catch (error) {
            toast({
                title: "Update Listing",
                className: "bg-red-600 text-white rounded-[0.375rem]",
                description: "Something went wrong!"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-5">
                <h3 className="text-3xl font-semibold text-teal-700 text-center">Create Listing</h3>
                <form className="w-full md:w-[90%] m-auto flex flex-col gap-4" onSubmit={handleSubmit(submitUpdateListing)}>
                    <div className="w-full flex flex-row items-center justify-between md:justify-start">
                        <input disabled={isLoading || isLoadingUpload} type="file" name="imgUrl" accept="image/*" multiple className="cursor-pointer italic text-sm file:font-semibold file:text-sm file:px-3 file:py-2 file:bg-violet-50 file:rounded-[1rem] file:border-0" onChange={e => {
                            if (e.target.files === null) {
                                return
                            }
                            setUploadFiles(e.target.files)
                        }} />
                        <Button disabled={isLoading || isLoadingUpload} type="button" className="bg-sky-700 flex flex-row items-center justify-center gap-1 px-2" onClick={submitUploadImg}><MdCloudUpload className="text-xl" />{!isLoadingUpload ? "Upload Image" : 'Uploading...'}</Button>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <div className="border rounded-[0.45rem] p-2">
                            <ImageList imageList={watch("imgUrl")} deleteImgStorage={deleteImgStorage} pathName="imgUrl" setValue={setValue} />
                        </div>
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

                            <InputCurrencyB register={register} setValue={setValue} message={errors.regularPrice?.message} name="regularPrice" label="Regular Price" placeholder={`${formTypeValue === "Rent" ? "VND / month" : "VND"}`} />
                            {valueOfferField
                                && <InputCurrencyB register={register} setValue={setValue} message={errors.discountPrice?.message} name="discountPrice" label="Discount Price" placeholder={`${formTypeValue === "Rent" ? "VND / month" : "VND"}`} />}
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
                    <Button disabled={isSubmitting} type="submit" className="bg-teal-700 w-full md:w-[50%] m-auto">{!isSubmitting ? "Update" : "Updating..."}</Button>
                </form>
            </div >
        </div >
    )
}

export default EditListing
