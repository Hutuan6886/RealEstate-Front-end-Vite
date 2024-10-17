import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { Link, useParams } from "react-router-dom"

import { RootState } from "@/redux/store"
import { LandlordType, ListingReduxType, RequestInfoFormType } from "@/types/types"

import RequestInfoInput from "./RequestInfoInput"
import RequestInfoTextArea from "./RequestInfoTextArea"
import { Button } from "@/components/ui/button"

import { IoClose } from "react-icons/io5"

interface RequestInfoFormProps {
    label?: string
    dataListing: ListingReduxType
    onClose?: () => void
}

const RequestInfoForm: React.FC<RequestInfoFormProps> = ({ label, dataListing, onClose }) => {
    const checkBoxRef = useRef<HTMLInputElement>(null)
    const { listingId } = useParams()
    const [infoLandlord, setInfoLandlord] = useState<LandlordType>()

    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    const { register, getValues } = useForm<RequestInfoFormType>({
        defaultValues: {
            phone: currentUser ? currentUser.phone : undefined,
            email: currentUser ? currentUser.email : undefined,
            message: `I am interested in ${dataListing.address.number} ${dataListing.address.street}, ${dataListing.address.ward}, ${dataListing.address.district}, ${dataListing.address.city}`
        }
    })

    useEffect(() => {
        const getInfoLandlord = async () => {
            try {
                const resquest = await fetch(`/api/listing/get-listing-landlord/${listingId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    cache: 'no-cache'
                })
                if (resquest.ok) {
                    const dataInfoLandlord = await resquest.json()
                    setInfoLandlord(dataInfoLandlord)
                }
            } catch (error) {
                console.log('getInfoLandlord Error', error);
            }
        }
        getInfoLandlord()
    }, [listingId])

    return (

        <div className={`w-full h-full lg:h-fit
                        ${!label && "border"} border-zinc-300 rounded-[0.375rem] shadow-lg p-5
                        flex flex-col gap-2`}>
            {label && <div className="w-full">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold">{label}</h3>
                    <div className="p-1 border rounded-[25px] cursor-pointer hover:shadow-[0_0_13px_0_rgba(0,0,0,0.3)] transition-shadow" onClick={onClose}><IoClose /></div>
                </div>
            </div>}
            <form action="" className="flex flex-col gap-2"
            >
                <div className="flex flex-col gap-4">
                    <RequestInfoInput register={register} label="Phone" name="phone" type="text" />
                    <RequestInfoInput register={register} label="Email" name="email" type="email" />
                    <RequestInfoTextArea register={register} getValues={getValues} label="Message" name="message" />
                </div>
                <Link to={`mailto:${infoLandlord?.email}?subject=HuuTuan%20Real-estate&body=${getValues('message')}.%0DMy%20phone%20number%3A%20${getValues("phone")}`}><Button type="button" className="w-full border border-white bg-orange-700 hover:bg-white hover:border-orange-700 hover:text-orange-700 transition-colors">Send Email</Button></Link>
            </form>
            <div className="flex flex-col gap-4">
                <div className="w-full flex flex-row items-center justify-start gap-2 cursor-pointer"><input ref={checkBoxRef} type="checkbox" className="size-5 cursor-pointer" /> <p className="text-xs text-zinc-500 " onClick={() => { checkBoxRef.current?.click() }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p></div>
                <p className="text-zinc-500 text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio consequatur nostrum, officia distinctio quaerat sunt esse voluptatum unde rem odit est optio repellat. Architecto sunt, accusantium delectus quam distinctio dolores consequatur laboriosam eveniet quibusdam suscipit perspiciatis cum voluptas inventore dolorem.</p>
            </div>
        </div>
    )
}

export default RequestInfoForm
