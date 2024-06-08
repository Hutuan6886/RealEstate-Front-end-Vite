import { ChangeEvent, FormEvent, useState } from "react"

import { Button } from "@/components/ui/button";
import Checkbox from "@/components/ui/checkbox";
import InputLabel from "@/components/ui/input-label";
import SelectForm from "@/components/ui/select-form";
import TextArea from "@/components/ui/text-area";
import { TbMeterSquare } from "react-icons/tb";

const dataFormType = [{ name: 'rent', label: 'Rent' }, { name: 'sell', label: 'Sell' }]
const dataHouseType = [{ name: 'villa', label: 'Villa' }, { name: 'duplex', label: 'Duplex' }, { name: 'penthouse', label: 'Penthouse' }]

const Management = () => {
    const [isCheckedFurnished, setIsCheckedFurnished] = useState(false)
    const [isCheckedParking, setIsCheckedParking] = useState(false)
    const [isCheckedOffer, setIsCheckedOffer] = useState(false)

    const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === "furnished") setIsCheckedFurnished(!isCheckedFurnished)
        if (e.currentTarget.name === "parking") setIsCheckedParking(!isCheckedParking)
        if (e.currentTarget.name === "offer") setIsCheckedOffer(!isCheckedOffer)
    }

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { homeName, description, address, formType, houseType,
            // offer, 
            // furnished,
            // parking, 
            squaremetre, bedrooms, bathrooms, regularPrice, discountPrice, imgUrl } = e.currentTarget      //* thuộc tính name của mỗi field

        console.log('values', {
            name: homeName.value,
            description: description.value,
            address: address.value,
            imgUrl: imgUrl.value,
            formType: formType.value,
            houseType: houseType.value,
            offer: isCheckedOffer,
            furnished: isCheckedFurnished,
            parking: isCheckedParking,
            squaremetre: squaremetre.value,
            bedrooms: bedrooms.value,
            bathrooms: bathrooms.value,
            regularPrice: regularPrice.value,
            discountPrice: discountPrice.value
        });


    }
    return (
        <div className="w-full h-full">
            <div className="flex flex-col gap-5">
                <h3 className="text-3xl font-semibold text-teal-700 text-center">Create Listing</h3>
                <form className="w-full md:w-[90%] m-auto flex flex-col gap-4" onSubmit={e => { onSubmit(e) }}>
                    <div className="w-full flex flex-row items-center justify-start gap-3">
                        <input type="file" name="imgUrl" accept="image/*" multiple className="cursor-pointer italic text-sm file:font-semibold file:text-sm file:px-3 file:py-2 file:bg-violet-50 file:rounded-[1rem] file:border-0" />
                        <Button type="button" className="">Upload Image</Button>
                    </div>
                    <div className="w-full md:grid grid-cols-2 gap-4">
                        <div className="w-full col-span-1 flex flex-col gap-3 mb-4 md:m-0">
                            <InputLabel name="homeName" type="text" label="Home Name" placeholder="House name" />
                            <TextArea name="description" type="text" label="Description" placeholder="Describe your house..." />
                            <InputLabel name="address" type="text" label="Address" placeholder="Your house address" />
                        </div>
                        <div className="w-full col-span-1 flex flex-col gap-4">
                            <SelectForm name="formType" label="Business Types" data={dataFormType} />
                            <div className="flex flex-row items-center justify-start gap-3 flex-wrap">
                                <SelectForm name="houseType" label="House Types" data={dataHouseType} />
                                <div className="flex flex-row items-center gap-1 justify-start">
                                    <InputLabel name="squaremetre" width='w-[80px]' className="flex flex-row items-center justify-start" />
                                    <TbMeterSquare className="text-2xl" />
                                </div>
                                <InputLabel name="bedrooms" label="Bedrooms:" width="w-[35px]" maxLength={1} className="flex flex-row items-center justify-start" />
                                <InputLabel name="bathrooms" label="Bathrooms:" width="w-[35px]" maxLength={1} className="flex flex-row items-center justify-start" />
                            </div>
                            <div className="flex flex-row items-center justify-start gap-3">
                                <Checkbox name='furnished' label="Furnished" checked={isCheckedFurnished} onChange={handleChecked} />
                                <Checkbox name='parking' label="Parking lot" checked={isCheckedParking} onChange={handleChecked} />
                                <Checkbox name='offer' label="Offer" checked={isCheckedOffer} onChange={handleChecked} />
                            </div>
                            <InputLabel name="regularPrice" label="Regular Price" placeholder="VND / month" />
                            <InputLabel name="discountPrice" label="Discount Price" />
                        </div>
                    </div>
                    <Button type="submit" className="bg-teal-700 w-full md:w-[50%] m-auto">Create</Button>
                </form>
            </div>
        </div >
    )
}

export default Management
