import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { toast } from "@/components/ui/use-toast"
import { app } from "@/firebase";
import { RootState } from "@/redux/store"
import { ChangeEvent, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

// import { ImageList } from "./ImageList"
import InputLabel from "@/components/ui/input-label"
import TextArea from "@/components/ui/text-area"
import SelectForm from "@/components/ui/select-form"
import { TbMeterSquare } from "react-icons/tb"
import Checkbox from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { MdCloudUpload } from "react-icons/md"
import { ImageList } from "./ImageList"
import { ListingType } from "@/types/types";


const dataFormType = [{ value: 'Rent', label: 'Rent' }, { value: 'Sell', label: 'Sell' }]
const dataHouseType = [{ value: 'Villa', label: 'Villa' }, { value: 'Duplex', label: 'Duplex' }, { value: 'Penthouse', label: 'Penthouse' }, { value: 'DetachedHouse', label: 'Detached House' }, { value: 'SemiDetachedHouse', label: 'Semi-detached House' }, { value: 'Apartment', label: 'Apartment' }, { value: 'Studio', label: 'Studio' }]


const ManagementListingId = () => {
    //todo: STATE
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // const [dataListingItem, setDataListingItem] = useState<ManagementFormType>()
    const [valueOfferField, setValueOfferField] = useState<boolean>(false)
    const [formTypeValue, setFormTypeValue] = useState<string>()

    const navigate = useNavigate()

    //todo: IMG UPLOAD STATE
    const [isLoadingUpload, setLoadingUpload] = useState<boolean>(false)
    const [files, setUploadFiles] = useState<FileList | null>()
    const [imgUploaded, setImgUploaded] = useState<string[]>([])    //* state img is uploaded
    // const [imgListingItem, setImgListingItem] = useState<string[]>([])

    //todo: HOOK
    const { listingId } = useParams()
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    //todo: FORM
    const { register, handleSubmit, getValues,
        reset } = useForm<ListingType>({
            defaultValues: {
                name: '',
                description: '',
                address: '',
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
            },
        })

    useEffect(() => {
        //todo: GET data listing item from db
        const getDataListingByListingId = async () => {
            try {
                const res = await fetch(`/api/listing/get-listing-item/${listingId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "Application/json",
                    }, cache: 'no-cache'
                })
                if (res.ok) {
                    const data = await res.json()
                    reset({
                        id: data.id,
                        name: data.name,
                        description: data.description,
                        address: data.address,
                        imgUrl: [...data.imgUrl.concat(imgUploaded)],
                        formType: data.formType,
                        houseType: data.houseType,
                        furnished: data.furnished,
                        parking: data.parking,
                        squaremetre: data.squaremetre,
                        bedrooms: data.bedrooms,
                        bathrooms: data.bathrooms,
                        offer: data.offer,
                        regularPrice: data.regularPrice,
                        discountPrice: data.discountPrice
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        getDataListingByListingId()
    }, [currentUser, listingId, reset, imgUploaded])

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
                    setImgUploaded([...imgUploaded.concat(imgUrlArray)])     //* imgUrlArray là img array vừa được upload, imgUrls là img array vừa được upload trước đó
                }).finally(() => {
                    setLoadingUpload(false)
                })
        }
    }

    const uploadImg = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const imgName = new Date().getTime() + file.name;
            const storageRef = ref(storage, imgName);
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed",
                (snapshot) => {
                    //todo: Nếu k sử dụng function này thì vẫn phải khai báo
                    console.log(snapshot);
                },
                (error) => {
                    reject(error)
                },    //* Xử lý nếu có error
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((imgUrl: string) => {
                        resolve(imgUrl)
                    })
                }   //* Trả về 1 imgUrl, xử lý để lấy từng img trả về
            )
        })
    }

    const deleteImgStorage = async (imgUrl: string) => {
        //todo: delete img trong firebase
        const storage = getStorage(app);
        // Create a reference to the file to delete
        const storageRef = ref(storage, imgUrl);
        // Delete the file
        await deleteObject(storageRef).then(async () => {
            try {
                //todo: delete img trong DB để set lại dataListingItem
                await fetch(`/api/listing/delete-image/${listingId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, cache: "no-cache",
                    body: JSON.stringify({ imgUrl })
                })
            } catch (error) {
                return toast({
                    title: "Delete image storage",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: 'Something went wrong!'
                })
            }
            // File deleted successfully
            toast({
                className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                description: 'Delete image storage is successfully.'
            })
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);

        }).finally(() => {
            //todo: Delete img trên layout
            setImgUploaded([...imgUploaded.filter((img) => img !== imgUrl)])
            reset({
                id: getValues('id'),
                name: getValues('name'),
                description: getValues('description'),
                address: getValues('address'),
                imgUrl: [...getValues('imgUrl').filter((img) => img !== imgUrl)],
                formType: getValues('formType'),
                houseType: getValues('houseType'),
                furnished: getValues('furnished'),
                parking: getValues('parking'),
                squaremetre: getValues('squaremetre'),
                bedrooms: getValues('bedrooms'),
                bathrooms: getValues('bathrooms'),
                offer: getValues('offer'),
                regularPrice: getValues('regularPrice'),
                discountPrice: getValues('discountPrice'),
            })
        })
    }

    const submitUpdateListing: SubmitHandler<ListingType> = async (data): Promise<void> => {
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
                navigate('/management')
                toast({
                    className: 'bg-green-600 border-0 text-white rounded-[0.375rem]',
                    description: 'Update listing is successfully.'
                })
            }
            else {
                toast({
                    title: "Update Listing",
                    className: "bg-red-600 text-white rounded-[0.375rem]",
                    description: "Update listing is failed!"
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
                    <div className="w-full">
                        <ImageList imageList={getValues('imgUrl')} deleteImgStorage={deleteImgStorage} />
                    </div>
                    <div className="w-full md:grid grid-cols-2 gap-4">
                        <div className="w-full col-span-1 flex flex-col gap-3 mb-4 md:m-0">
                            <InputLabel disabled={isLoading} register={register} name="name" label="House Name" placeholder="House name" />
                            <TextArea disabled={isLoading} register={register} name="description" label="Description" placeholder="Describe your house..." />
                            <InputLabel disabled={isLoading} register={register} name="address" label="Address" placeholder="Your house address" />

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
                    <Button disabled={isLoading} type="submit" className="bg-teal-700 w-full md:w-[50%] m-auto">{!isLoading ? "Update" : "Updating..."}</Button>
                </form>
            </div >
        </div >
    )
}

export default ManagementListingId
